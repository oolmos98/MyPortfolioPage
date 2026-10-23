---
layout: ../../layouts/WikiLayout.astro
title: Platform engineering
description: AWS, ROSA, Kubernetes, Argo CD GitOps, Aurora PostgreSQL, and operational platform practices.
---

# Platform engineering

Good platform work doesn’t hide Kubernetes or AWS behind leaky wrapper scripts. It gives application teams a paved road—standard networking, identity, GitOps delivery, and observability—so they can ship services without reinventing IAM policies or debugging ingress timeouts from scratch.

For the application-side runtime setup (JVM flags, health probes, and graceful shutdown), see [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## Request flow and GitOps loop

Here is the baseline architecture I work with for services running on Red Hat OpenShift Service on AWS (ROSA):

```text
  [ Developer / CI ]                        [ Internet Client ]
          |                                          |
          v (Git Commit)                             v
+-----------------------+                  +-------------------+
| GitOps Manifest Repo  |                  |  AWS Route 53 /   |
| (Kustomize Overlays)  |                  |  Network Load Bal |
+-----------+-----------+                  +---------+---------+
            |                                        |
            v (Pull / Reconcile)                     v
+-------------------------------------------------------------------+
|  ROSA / OpenShift Cluster (Private Compute)                       |
|                                                                   |
|  +-----------------------+     +-------------------------------+  |
|  | Argo CD / GitOps      | --> | OpenShift Ingress (HAProxy)   |  |
|  | (Self-Heal & Sync)    |     +---------------+---------------+  |
|  +-----------------------+                     |                  |
|                                                v                  |
|  +-------------------------------------------------------------+  |
|  | Kubernetes Service & Pod Network (OVN-Kubernetes)           |  |
|  |  +-------------------------------------------------------+  |  |
|  |  | Spring Boot Pod (Non-Root UID 1001)                   |  |  | <---> Dynatrace OneAgent
|  |  | - Actuator Probes (/health/liveness/ready)            |  |  |       (Metrics/Traces)
|  |  | - HikariCP Connection Pool                            |  |  |
|  |  +---------------------------+---------------------------+  |  |
|  +------------------------------|------------------------------+  |
+---------------------------------|---------------------------------+
                                  |
                    +-------------+-------------+
                    |                           |
                    v                           v
        +-----------------------+   +-----------------------+
        | Amazon Aurora Postgres|   | AWS Secrets Manager & |
        | (Writer & Read-Repl)  |   | IAM OIDC Identity     |
        +-----------------------+   +-----------------------+
```

## How the pieces fit together

### AWS networking and identity

Compute nodes live in private subnets spread across three Availability Zones, while Aurora PostgreSQL clusters sit in isolated data subnets. Outbound internet traffic routes through AWS Transit Gateway and NAT Gateways behind Network Firewall.

Rather than baking static AWS keys into Kubernetes secrets, pods authenticate through IAM Roles for Service Accounts (IRSA) over OIDC. When a pod needs a secret from AWS Secrets Manager or an object in S3, it assumes a short-lived IAM role scoped strictly to that service account.

### ROSA runtime guardrails

OpenShift enforces Security Context Constraints (SCC) out of the box, which catches a lot of bad container habits early—containers cannot run as root or mount arbitrary host paths.

To survive node maintenance or an AZ hiccup, services define `podAntiAffinity` and `topologySpreadConstraints` so replicas don’t pile onto a single worker node. Compute machine pools scale automatically based on resource reservations, and `MachineHealthChecks` replace wedged nodes without manual intervention.

### Pull-based delivery with Argo CD

Instead of giving GitLab CI runners cluster-admin tokens to run `oc apply`, we run Red Hat OpenShift GitOps (Argo CD) inside the cluster. CI builds the image, scans it, and commits the new digest to a GitOps manifest repository. Argo CD pulls that change and reconciles the cluster state.

We keep `selfHeal: true` enabled on production applications. If someone hot-edits a deployment or configmap in the OpenShift console during an incident and forgets to backport it, Argo CD overwrites the manual drift within seconds. Everything has to go through Git.

### Aurora PostgreSQL in practice

Aurora handles storage scaling and read replicas across AZs, exposed via separate writer and reader endpoints. The most common failure mode isn’t database CPU—it’s connection storms when dozens of pods scale up at once. We bound HikariCP pools tightly on the application side (or front the cluster with RDS Proxy) and rely on continuous Point-in-Time Recovery (PITR) backups with cross-region snapshots.

## Where platform ends and app ownership begins

Ambiguous ownership slows teams down. Here is how we draw the line between platform engineering and stream-aligned application teams:

| Area                    | Platform Team Owns                                                       | Application Team Owns                                             |
| :---------------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **Compute & ROSA**      | Control plane, worker node patching, cluster upgrades, capacity          | Container CPU/memory requests and limits based on load testing    |
| **GitOps & Delivery**   | Argo CD operator, RBAC, sync windows, `ApplicationSet` templates         | Kustomize overlays, image digest bumps, environment config in Git |
| **Networking**          | Ingress routers, TLS renewal, DNS, VPC and transit routing               | Path routing rules, client timeouts, circuit breakers             |
| **Security & Identity** | Admission policies, OIDC provider setup, cluster baseline policies       | Fixing Snyk findings, secret rotation, application auth logic     |
| **Database**            | Aurora provisioning, encryption, backups, cross-region replication       | Schema design, Flyway/Liquibase migrations, query indexing        |
| **Observability**       | Dynatrace OneAgent rollout, log forwarding, cluster-level alert defaults | Service SLIs, custom business metrics, and on-call runbooks       |

## Pre-production checklist

Before a new service takes production traffic, I check seven things:

1. **Clear owner**: Is there an owning team, an active Slack alert channel, and an on-call rotation?
2. **Measured resource bounds**: Are CPU and memory requests based on real traffic tests rather than copy-pasted defaults?
3. **Decoupled health probes**: Are liveness and readiness probes separated so a slow downstream dependency doesn't trigger pod restart loops?
4. **GitOps managed**: Is the workload deployed via an Argo CD `Application` with `selfHeal` turned on?
5. **Signed & scanned artifact**: Did the image pass Snyk gates and get signed in CI? (See [Secure delivery](/wiki/secure-delivery/).)
6. **One-commit rollback**: Can the person on call roll the service back with `git revert` on the GitOps repo without needing cluster CLI access?
7. **Trace propagation**: Do incoming and outgoing requests forward W3C trace headers so purepaths show up cleanly in Dynatrace? (See [Observability and collaboration](/wiki/observability-collaboration/).)

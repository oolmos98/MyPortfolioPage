---
layout: ../../layouts/WikiLayout.astro
title: Platform engineering
description: AWS, ROSA, Kubernetes, Argo CD GitOps, Aurora PostgreSQL, and operational platform practices.
---

# Platform engineering

Platform engineering creates reliable, automated, and secure paths for development teams to build, deploy, and operate services. The goal is not to hide infrastructure behind opaque abstractions, but to make sound architectural, security, and operational decisions repeatable across an organization.

For container runtime configurations and probe tuning on OpenShift, see [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## Architectural request and delivery flow

Below is the standard runtime request flow and GitOps delivery loop for cloud-native enterprise services running on Red Hat OpenShift Service on AWS (ROSA):

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
|  |  | Spring Boot Pod (Non-Root UID 1001)                   |  |  |
|  |  | - Actuator Probes (/health/liveness/ready)            |  |  | <---> Dynatrace OneAgent
|  |  | - HikariCP Connection Pool                            |  |  |       (Metrics/Traces)
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

## Core platform pillars

### 1. AWS foundations and secure networking

- **Multi-AZ VPC architecture**: Distribute subnets across at least three Availability Zones (AZs) with dedicated private subnets for compute worker nodes and isolated data subnets for Aurora database clusters.
- **Least-privilege cloud identity**: Use IAM Roles for Service Accounts (IRSA) via OIDC federation. Pods assume temporary IAM roles to access AWS resources (such as S3 or Secrets Manager) without embedding static credentials.
- **Egress filtering and transit routing**: Centralize internet egress through AWS Transit Gateway and managed NAT Gateways, inspecting outbound traffic with AWS Network Firewall.

### 2. Managed OpenShift (ROSA) runtime

- **Workload isolation**: Enforce Security Context Constraints (SCC) preventing containers from running as root or mounting host paths.
- **Scheduling and resiliency**: Configure `podAntiAffinity` and `topologySpreadConstraints` so application replicas are scheduled evenly across multiple availability zones and worker nodes.
- **Cluster autoscaling**: Provision compute machine pools with automatic scaling based on CPU and memory reservations, paired with MachineHealthChecks to replace degraded nodes automatically.

### 3. Declarative GitOps delivery with Argo CD

- **Continuous reconciliation on ROSA**: Deploy the Red Hat OpenShift GitOps operator (Argo CD) to govern all cluster workloads. The cluster continually pulls its desired state from Git rather than accepting imperative push commands from external CI runners.
- **Automated drift correction (`selfHeal`)**: Any unauthorized configuration edits applied directly through the OpenShift console or `oc` CLI are automatically overridden within seconds by Argo CD back to the declared Git state.
- **ApplicationSet and scalable multi-tenancy**: Utilize the Argo CD `ApplicationSet` controller to generate environment-specific applications across clusters from a single Git directory structure.
- **Sync windows**: Define operational maintenance windows in Argo CD to prevent automated synchronization during business-critical traffic peaks or scheduled change freezes.

### 4. Amazon Aurora PostgreSQL operations

- **Storage and compute auto-scaling**: Deploy Aurora PostgreSQL with dedicated read replicas in distinct AZs, routing write traffic to the cluster writer endpoint and analytical/read traffic to the reader endpoint.
- **Connection management**: Mitigate connection spikes using AWS RDS Proxy or tightly bounded application-level HikariCP pools to prevent exhaustion during traffic bursts.
- **Business continuity**: Establish continuous automated backups with Point-in-Time Recovery (PITR) and automate snapshot copies across secondary AWS regions to meet recovery point objectives (RPO < 5 min, RTO < 30 min).

## Shared responsibility model

A successful internal developer platform establishes clear operational boundaries between the platform team and stream-aligned application teams:

| Capability              | Platform Team Responsibility                                                                 | Application Team Responsibility                                                        |
| :---------------------- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **Compute & ROSA**      | ROSA control plane, node patching, cluster upgrades, capacity planning                       | Sizing container resource requests and memory limits based on actual load              |
| **GitOps & Delivery**   | Argo CD operator lifecycle, cluster RBAC, sync window policies, ApplicationSet templates     | Managing Kustomize/Helm overlays, image tags, and configuration changes in Git         |
| **Networking**          | Ingress routing, TLS certificate renewal, DNS infrastructure, VPC routing                    | Defining path-based routing rules and service-to-service timeouts                      |
| **Security & Identity** | Cluster admission controllers, OIDC identity provider integration, baseline policies         | Scanning dependencies with Snyk, rotating secrets, and writing secure application code |
| **Data Layer**          | Aurora cluster provisioning, storage encryption, automated backups, cross-region replication | Schema design, database migration scripts (Flyway/Liquibase), and query optimization   |
| **Observability**       | Dynatrace agent rollout, logging pipeline infrastructure, cluster alert baselines            | Defining service-level indicators (SLIs), custom business metrics, and triage runbooks |

## Platform review checklist

Before promoting a new microservice to production, verify each of the following engineering standards:

1. **Documented ownership**: Does the service have a designated team owner, an active Slack alerts channel, and an emergency escalation rotation?
2. **Validated resource requests**: Are CPU and memory requests based on measured load rather than guesswork?
3. **Segregated health probes**: Are liveness and readiness checks properly decoupled from downstream third-party dependencies?
4. **Declarative GitOps configuration**: Is the application managed via an Argo CD `Application` custom resource with automated synchronization and drift correction enabled?
5. **Auditable release evidence**: Does the CI/CD pipeline generate an immutable release manifest recording Snyk scan results and image signatures? See [Secure delivery](/wiki/secure-delivery/).
6. **Tested rollback procedure**: Can on-call engineers roll back the deployment via `git revert` on the GitOps repository without requiring direct cluster shell access?
7. **End-to-end tracing**: Does the service propagate W3C distributed trace headers to enable full visibility in Dynatrace? See [Observability and collaboration](/wiki/observability-collaboration/).

> A platform should make the safe path the easiest path. If every team needs a platform specialist to deploy or debug a routine service, the platform is unfinished.

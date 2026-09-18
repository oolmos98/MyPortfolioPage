---
layout: ../../layouts/WikiLayout.astro
title: Spring Boot on ROSA
description: A practical service delivery model for Java Spring Boot on ROSA and OpenShift with Argo CD GitOps.
---

# Spring Boot on ROSA

Red Hat OpenShift Service on AWS (ROSA) provides a managed OpenShift platform; Spring Boot provides the application framework. Operating enterprise microservices reliably requires co-designing both layers: the JVM application must expose accurate runtime states, the platform must govern scheduling and networking, and declarative GitOps via Argo CD must synchronize state without manual intervention.

For the underlying cluster architecture and operational boundaries, see [Platform engineering](/wiki/platform-engineering/).

## Service runtime baseline

- **Externalized configuration**: Decouple runtime config from container images via Spring Cloud Kubernetes or mounted OpenShift `ConfigMap` and `Secret` resources.
- **Probe segregation**: Never tie Kubernetes `livenessProbe` directly to downstream database health. Use Spring Boot Actuator's health groups to isolate `/actuator/health/liveness` (JVM responsiveness) from `/actuator/health/readiness` (ability to accept user traffic).
- **Explicit resource bounds**: Always define container CPU/memory requests and limits. Set JVM heap constraints using `-XX:InitialRAMPercentage` and `-XX:MaxRAMPercentage` (typically 70–75%) so the JVM respects cgroup limits and avoids Kubernetes OOMKills.
- **Connection pool limits**: Size HikariCP connection pools deliberately based on database worker capacity rather than arbitrary thread counts.
- **Structured JSON logging**: Emit single-line JSON logs with correlation IDs (`traceId`, `spanId`) mapped through SLF4J MDC to support OpenTelemetry and distributed tracing.
- **Arbitrary UID compliance**: OpenShift runs containers under arbitrary assigned user IDs. Ensure container images do not require root privileges (`USER 1001`) and that write directories grant group ownership (`chmod -R g=u /workdir`).
- **Versioned database migrations**: Decouple schema migration (Flyway/Liquibase) from pod startup in high-concurrency deployments to prevent simultaneous schema locks.

## ROSA probe and resource configuration

When deploying Spring Boot 3.x to ROSA, probe tuning prevents prematurely killing slow-starting JVMs while ensuring traffic is routed only to warm instances:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-processing-service
  namespace: platform-services
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: order-processing-service
    spec:
      containers:
        - name: app
          image: registry.example.com/platform/order-processing-service:v2.4.1@sha256:d8b2...
          resources:
            requests:
              cpu: "500m"
              memory: "1Gi"
            limits:
              cpu: "2000m"
              memory: "2Gi"
          env:
            - name: JAVA_TOOL_OPTIONS
              value: "-XX:InitialRAMPercentage=50.0 -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"
          # startupProbe gives the JVM up to 150s to bootstrap without triggering liveness failures
          startupProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8081
            failureThreshold: 30
            periodSeconds: 5
          # livenessProbe detects deadlocks; failures restart the container
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8081
            periodSeconds: 10
            failureThreshold: 3
          # readinessProbe governs routing; failures remove pod from ROSA Service endpoints
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8081
            periodSeconds: 5
            failureThreshold: 2
          lifecycle:
            preStop:
              exec:
                command: ["sh", "-c", "sleep 10"]
```

> [!TIP]
> Adding a `preStop` hook with a brief sleep (e.g. 10 seconds) allows the OpenShift ingress router to deregister the pod endpoint before the JVM begins graceful shutdown, preventing dropped requests during rolling releases.

## Declarative GitOps deployment with Argo CD

Rather than executing imperative deploy scripts from CI runners, applications on ROSA are managed declaratively using **Argo CD** (Red Hat OpenShift GitOps). The desired state lives in a dedicated GitOps configuration repository, and the in-cluster Argo CD controller reconciles that state continuously.

### Argo CD Application CRD

Below is an enterprise Argo CD `Application` custom resource managing the Spring Boot service on ROSA with automated drift correction and pruning:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-processing-service-prod
  namespace: openshift-gitops
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: platform-services
  source:
    repoURL: https://gitlab.example.com/platform/gitops-manifests.git
    targetRevision: main
    path: environments/prod/services/order-processing-service
  destination:
    server: https://kubernetes.default.svc
    namespace: platform-services
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - PruneLast=true
      - RespectIgnoreDifferences=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
```

### GitOps advantages on ROSA

- **Zero configuration drift (`selfHeal: true`)**: If an operator manually edits a pod, environment variable, or route in the OpenShift web console, Argo CD detects the difference within seconds and reverts the cluster back to the version-controlled Git state.
- **Auditable rollbacks via Git revert**: If a release causes degradation, rolling back does not require cluster access or complex rollback pipelines. Running `git revert <commit-sha>` on the GitOps repository immediately causes Argo CD to synchronize the prior verified container digest.
- **Kustomize overlay structure**: Application base definitions (`base/`) define common Spring Boot manifests, while environment overlays (`overlays/test`, `overlays/prod`) customize replica counts, CPU/memory limits, and Actuator configurations without duplicating YAML.

## Connection pool and resilience tuning

In distributed architectures connecting to Amazon Aurora PostgreSQL, connection exhaustion and downstream latency spikes are primary causes of service degradation.

### HikariCP connection pool sizing

Avoid defaulting HikariCP to arbitrary high values. Over-allocating connections causes thread thrashing and overwhelms database IOPS. A reliable starting sizing rule:

$$\text{Pool Size} = (\text{CPU Cores} \times 2) + \text{Disk Spindle / IO Target}$$

For a container allocated 2 CPUs, a pool of 10–15 connections per pod is typically sufficient when paired with proper read/write connection splitting.

### Circuit breaking and timeouts

Downstream REST or gRPC calls should be wrapped with Resilience4j circuit breakers:

- **Tight socket timeouts**: Set connect timeouts (1–2s) and read timeouts (3–5s) on downstream HTTP clients (`RestClient` / `WebClient`).
- **Circuit breaker trip thresholds**: Open the circuit if error rates exceed 50% over a 20-call sliding window.
- **Degraded fallbacks**: Provide cached or default fallbacks where business logic permits, avoiding unbounded retries.
- **Exponential backoff with jitter**: If retries are necessary, apply full randomized jitter to prevent the "thundering herd" problem against struggling downstream services.

## Deployment baseline

1. **Build one immutable artifact**: Compile once in CI, package into an OCI container image, and sign/scan the image.
2. **Promote via GitOps**: Update the target image digest in the environment's GitOps Kustomize overlay. Argo CD automatically synchronizes the new revision into ROSA.
3. **Validate schema compatibility**: Ensure database schema changes follow the _expand/contract_ pattern so both previous and new application versions function simultaneously during rolling deployments.
4. **Automated smoke verification**: Execute synthetic probes immediately post-rollout before terminating previous replica sets.
5. **Reversible release plans**: Every release manifest must include a verified rollback procedure (Git revert) and database rollback compatibility notes. See [Secure delivery](/wiki/secure-delivery/) for release evidence requirements.

## Failure modes and mitigation playbook

| Failure Mode                                  | Root Cause                                                                    | Engineering Mitigation                                                                                                          |
| :-------------------------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Pod restart loop on startup**               | Heavy Spring context initialization exceeds default liveness timeout.         | Implement a dedicated `startupProbe` with high `failureThreshold` (e.g., 30 checks every 5s).                                   |
| **Cascading database exhaustion**             | Database latency increases; incoming requests block all HikariCP connections. | Separate read/write datasources, enforce pool timeouts (e.g., `connectionTimeout: 3000`), and isolate readiness from DB health. |
| **Dropped connections during rolling update** | Pod receives SIGTERM while ingress still directs active traffic.              | Configure Spring Boot graceful shutdown (`server.shutdown=graceful`) and add a `preStop` hook sleep.                            |
| **Silent configuration drift**                | Manual changes in ROSA web console or CLI bypass version control.             | Enforce Argo CD `selfHeal: true` and RBAC restrictions preventing direct in-cluster edits.                                      |
| **Downstream retry storms**                   | Transient network hiccups cause aggressive client retries that amplify load.  | Enforce exponential backoff with full jitter and circuit breakers across all HTTP/gRPC clients.                                 |

For real-time incident diagnosis and telemetry monitoring of these failure modes, consult [Observability and collaboration](/wiki/observability-collaboration/).

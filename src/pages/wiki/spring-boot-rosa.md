---
layout: ../../layouts/WikiLayout.astro
title: Spring Boot on ROSA
description: Running Java Spring Boot services reliably on Red Hat OpenShift Service on AWS (ROSA) with Argo CD.
---

# Spring Boot on ROSA

Running Spring Boot on Red Hat OpenShift Service on AWS (ROSA) works well once the JVM and Kubernetes stop fighting each other. Most production issues I’ve debugged on OpenShift come down to three things: the JVM ignoring container memory limits, aggressive liveness probes killing slow-starting pods, or rolling updates dropping in-flight requests.

For the surrounding AWS and cluster setup, see [Platform engineering](/wiki/platform-engineering/).

## Runtime baseline

When setting up a Spring Boot service for OpenShift, I stick to a few defaults:

- **Keep config out of the image**: Mount environment-specific settings via OpenShift `ConfigMap` and `Secret` resources so the exact same container digest promotes from test to prod.
- **Never tie liveness to downstream dependencies**: If Aurora or an upstream API has a 10-second hiccup and your `/actuator/health/liveness` endpoint checks database connectivity, Kubernetes will restart all your pods at the worst possible moment. Liveness should only check if the JVM is wedged; readiness checks whether the pod can serve traffic.
- **Size heap by percentage, not hardcoded `-Xmx`**: Use `-XX:InitialRAMPercentage` and `-XX:MaxRAMPercentage` (usually 70–75%) so the JVM scales with the container’s cgroup memory limit and leaves headroom for metaspace, threads, and native buffers.
- **Run as an arbitrary non-root UID**: OpenShift assigns random high UIDs to containers by default. Build images with a non-root user (`USER 1001`) and group-writable working directories (`chmod -R g=u /workdir`).
- **Emit single-line JSON logs with trace IDs**: Map `traceId` and `spanId` into SLF4J MDC so logs correlate directly with traces in Dynatrace.
- **Decouple database migrations from pod startup**: When 10 replicas spin up simultaneously, having every pod race to run Flyway or Liquibase migrations on startup asks for lock contention. Run schema migrations as a pre-sync job or separate pipeline step.

## Deployment and probe configuration

Spring Boot 3.x apps can take 20–60 seconds to initialize context under load. A dedicated `startupProbe` gives the JVM room to boot without forcing you to weaken the `livenessProbe` that catches real deadlocks later:

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
          # Give the JVM up to 150s to finish booting before liveness kicks in
          startupProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8081
            failureThreshold: 30
            periodSeconds: 5
          # Restart the container only if the JVM itself is unresponsive
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8081
            periodSeconds: 10
            failureThreshold: 3
          # Pull the pod out of the Service load balancer when dependencies degrade
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

The `preStop` `sleep 10` hook matters on OpenShift: when a pod terminates, Kubernetes removes its IP from endpoints asynchronously while sending `SIGTERM` to the container at the same time. Sleeping briefly before Spring Boot starts its graceful shutdown (`server.shutdown=graceful`) lets the HAProxy ingress router stop sending new connections first.

## Managing deployments with Argo CD

We don’t deploy from CI runners with `oc` or `kubectl`. Instead, CI updates the Kustomize overlay in our GitOps repository and Argo CD reconciles the cluster:

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

With `selfHeal: true` and Kustomize overlays (`base/` for shared manifests, `overlays/test` and `overlays/prod` for replica counts and limits), rollbacks don’t require a special pipeline job. You run `git revert` on the manifest commit and Argo CD syncs the previous image digest immediately.

## Connection pools and downstream timeouts

### Right-sizing HikariCP

A common mistake is setting `maximumPoolSize: 50` or `100` on every microservice pod. Multiply that by 12 pods across a few services and Aurora spends more time context-switching connections than running queries.

A good starting point from the HikariCP docs is:

$$\text{Pool Size} = (\text{CPU Cores} \times 2) + \text{Effective Spindle / IO Count}$$

In practice, for a 2-vCPU pod talking to Aurora PostgreSQL, **10 to 15 connections per pod** is plenty—especially when paired with a fast `connectionTimeout` (around 3 seconds) so requests fail fast instead of queuing until threads exhaust.

### Timeouts and Resilience4j

Every outbound `RestClient` or `WebClient` call needs explicit connect (1–2s) and read (3–5s) timeouts. Where we use Resilience4j circuit breakers or retries, we always pair retries with full jitter so a brief network blip doesn’t turn into a synchronized retry storm against a recovering service.

## Common failure modes on OpenShift

| Symptom                                       | What Usually Caused It                                                      | Fix                                                                                           |
| :-------------------------------------------- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Pod crash-loops during rollout**            | Spring context initialization takes longer than the liveness probe timeout. | Add a `startupProbe` (e.g., `failureThreshold: 30`, `periodSeconds: 5`).                      |
| **All pods restart when the DB slows down**   | Database health indicator is included in `/actuator/health/liveness`.       | Keep DB checks in `readiness` only; restrict `liveness` to `ping` / internal JVM state.       |
| **502 / 504 errors during rolling deploys**   | Pod stops accepting connections before HAProxy updates its endpoint list.   | Enable `server.shutdown=graceful` in Spring Boot and add a 10s `preStop` sleep hook.          |
| **OOMKilled (Exit Code 137) under load**      | JVM heap + non-heap native memory exceeds the container memory limit.       | Lower `-XX:MaxRAMPercentage` to `70.0` or increase the pod's `resources.limits.memory`.       |
| **Config changes disappear after a few mins** | Someone edited the Deployment directly in the OpenShift console.            | Expected behavior with Argo CD `selfHeal: true`—commit the change to the GitOps repo instead. |

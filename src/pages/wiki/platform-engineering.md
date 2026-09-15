---
layout: ../../layouts/WikiLayout.astro
title: Platform engineering
description: AWS, ROSA, Kubernetes, Aurora PostgreSQL, and operational platform practices.
---

# Platform engineering

Platform engineering is the work of creating reliable, repeatable paths for
teams to build, deploy, and operate services. The goal is not to hide
infrastructure. The goal is to make sound infrastructure decisions reusable.

## My focus

- AWS foundations, networking, identity and access management (IAM), and managed services
- ROSA and OpenShift deployment patterns for containerized workloads
- Kubernetes resource design, health checks, scaling, and rollout behavior
- Amazon Aurora PostgreSQL operations, connection management, backups, and recovery
- Dynatrace observability that explains what changed, who is affected, and what to do next

## Boundaries that should be explicit

Every service should have clear ownership for its application behavior,
configuration, data, deployment, and production support. The platform team
should provide the paved path, guardrails, and shared capabilities; the service
team should remain accountable for the service it runs.

## Platform review checklist

Before calling a service platform-ready, I look for:

1. A documented runtime owner and escalation path.
2. Resource requests and limits based on measured behavior.
3. Readiness and liveness checks that represent real service health.
4. Explicit configuration and secret ownership.
5. A rollback strategy tested against the deployment mechanism.
6. Logs, metrics, and traces tied to a useful service identifier.
7. A recovery target that matches the business requirement.

> A platform should make the safe path the easiest path. If every team needs a
> specialist to deploy or debug a service, the platform is unfinished.

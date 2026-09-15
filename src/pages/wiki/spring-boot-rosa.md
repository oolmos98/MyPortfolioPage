---
layout: ../../layouts/WikiLayout.astro
title: Spring Boot on ROSA
description: A practical service delivery model for Java Spring Boot on ROSA and OpenShift.
---

# Spring Boot on ROSA

Red Hat OpenShift Service on AWS (ROSA) provides the managed OpenShift
platform; Spring Boot provides the application framework. A reliable service
needs both sides to be designed together: the application must expose useful
runtime behavior, and the platform must run that behavior safely.

## Service baseline

- Keep configuration external and environment-specific.
- Expose health endpoints that distinguish startup, readiness, and liveness.
- Set explicit timeouts, connection-pool limits, and retry policies.
- Emit structured logs with correlation and request identifiers.
- Use database migrations as versioned, reviewable application changes.
- Build a small container image and run as a non-root user.

These practices make the service easier to deploy, diagnose, and operate when
it is running in a shared OpenShift environment.

## Deployment baseline

1. Build one immutable artifact.
2. Scan the artifact before promotion.
3. Deploy the same artifact through each environment.
4. Verify rollout health and application behavior.
5. Keep rollback and database compatibility in the same release plan.

## Failure modes to rehearse

- A pod starts but cannot reach Amazon Aurora PostgreSQL.
- A new version is healthy but incompatible with existing data.
- A secret or identity binding is missing in one environment.
- Traffic reaches a pod before it is ready.
- A dependency slows down and retries amplify the incident.

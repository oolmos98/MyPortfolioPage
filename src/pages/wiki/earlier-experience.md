---
layout: ../../layouts/WikiLayout.astro
title: Earlier experience
description: Previous application, cloud, collaboration, and delivery technologies from Omar Olmos's engineering experience.
---

# Earlier experience

My current engineering focus centers on enterprise platform engineering, secure Kubernetes/ROSA delivery, and real-time observability. Earlier in my career, I designed and maintained systems across mobile client development, enterprise web stacks, legacy databases, and declarative cloud automation.

This breadth provides deep empathy for the application teams that platform engineers support. Understanding the constraints of client developers and application engineers ensures platform guardrails accelerate delivery rather than creating bureaucratic friction.

For my current architectural focus, see [Platform engineering](/wiki/platform-engineering/).

## Client platforms and contract-first design

Building client-facing applications across heterogeneous device ecosystems taught me the necessity of deterministic API contracts, bandwidth constraints, and graceful offline degradation:

- **Flutter and SwiftUI**: Developing cross-platform and native mobile applications highlighted the realities of cellular connectivity, intermittent network loss, and strict memory limits. Reliable mobile applications require client-side caching, exponential retry backoff, and defensive schema parsing.
- **WeChat Mini Programs**: Operating within constrained runtime sandboxes reinforced the value of lean bundle sizes, minimal network round-trips, and strict lifecycle management.
- **React and Modern Web**: Front-end state management and component composition underscored the need for declarative UI patterns and predictable API payloads.
- **Contract-first engineering**: Working with mobile clients established an uncompromising commitment to backward-compatible REST and GraphQL schemas. When millions of client binaries are distributed across app stores, breaking changes in backend APIs are catastrophic.

## Enterprise backends and database operations

Operating traditional enterprise software stacks provided direct experience with the operational bottlenecks that modern container platforms were designed to resolve:

- **JavaServer Pages (JSP) and Servlets**: Managing early enterprise Java web applications demonstrated the pain of monolithic deployments, tight coupling between presentation and business logic, and stateful HTTP sessions. These challenges directly inspired the modern migration to stateless microservices on Kubernetes.
- **Microsoft SQL Server**: Designing relational schemas, managing clustered indexes, tuning execution plans, and managing transaction locks established a deep appreciation for relational database internals. Understanding query deadlocks and transaction isolation levels in SQL Server translates directly to managing PostgreSQL and Amazon Aurora workloads today.
- **GraphQL**: Building flexible query interfaces illustrated the delicate balance between client flexibility and backend performance, specifically the necessity of solving N+1 query problems via batch loaders and enforcing query depth limits to protect database clusters.

## Cloud infrastructure and GitOps delivery

Transitioning infrastructure management from manual configurations to automated, code-driven workflows defined my platform engineering philosophy:

- **Terraform**: Codifying infrastructure as code (IaC) eliminated manual configuration drift and enabled predictable, repeatable environment provisioning across cloud providers.
- **Argo CD and GitOps**: First adopting declarative Kubernetes deployments with Argo CD replaced brittle push-based scripts with continuous reconciliation loops. That experience directly laid the groundwork for today's enterprise GitOps architecture on ROSA, providing automated drift detection, auditable rollbacks, and zero-privilege CI pipelines.
- **Azure DevOps, GitLab CI, and GitHub Actions**: Designing CI/CD automation across multiple enterprise platforms reinforced that security and verification gates must be embedded directly into developer pipelines without creating unnecessary build latency.
- **Amazon S3**: Utilizing cloud object storage for immutable asset hosting, pipeline artifacts, and backup retention policies established the foundation for scalable distributed data architectures.

## Tooling and architectural communication

- **API Explorers (Bruno, Insomnia)**: Championing Git-friendly, open-source API clients (such as Bruno) allows teams to store test collections directly alongside service code in source control, avoiding closed-cloud credential sync risks.
- **Visual Architecture (draw.io / diagrams.net)**: Clear architectural diagrams and sequence flows clarify system boundaries, network ingress paths, and failure domains for cross-functional teams.

## How multi-stack breadth shapes platform engineering

Having authored mobile apps, debugged database locks, maintained legacy servlets, and written declarative Terraform manifests, I approach platform engineering with a holistic perspective:

1. **Platforms exist to serve applications**: Infrastructure guardrails must solve tangible developer problems rather than imposing dogmatic complexity.
2. **Operational visibility is non-negotiable**: A service developer cannot diagnose a production issue without accessible logs, metrics, and distributed traces.
3. **Simplicity is reliability**: The most resilient systems feature clear interface boundaries, boring battle-tested technology, and automated rollback paths.

To read how these experiences translate into day-to-day decision making, review my [Working principles](/wiki/principles/).

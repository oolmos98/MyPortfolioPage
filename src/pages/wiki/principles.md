---
layout: ../../layouts/WikiLayout.astro
title: Working principles
description: Engineering principles for technical decisions, operations, and leadership.
---

# Working principles

These standards guide how I make technical decisions, review architectural proposals, mentor engineers, and operate distributed systems in production. Reliable engineering is built on discipline, clarity, and empathy for both users and teammates.

## 1. Find the decision point

Before modifying wiring, wrapping abstractions, or adding retry logic around an issue, locate the exact point where the system decides its behavior.

- **Trace to the root**: When diagnosing unexpected behavior, trace down to the responsible line of code, database query, or network routing rule before applying workarounds.
- **Keep changes minimal**: Intervening at the actual decision point keeps diffs small, limits blast radius, and simplifies peer review.
- **Avoid compensatory layers**: Adding retries around an unindexed query or creating wrappers around leaky abstractions hides systemic flaws and invites catastrophic cascading outages.

## 2. Make operations part of design

An API, microservice, or infrastructure component is incomplete if it cannot be monitored, debugged, and safely recovered in production.

- **Observability is not an afterthought**: Design every service with explicit health probes, structured logging, distributed tracing headers, and service-level indicators (SLIs) from day one. See [Observability and collaboration](/wiki/observability-collaboration/).
- **Plan for failure**: Document expected failure modes, circuit breaker behaviors, and degraded fallback states during the initial design phase.
- **Deterministic rollbacks**: Every deployment plan must include a verified rollback procedure. If a database migration cannot be reversed without downtime, the rollout plan is incomplete. See [Secure delivery](/wiki/secure-delivery/).

## 3. Prefer boring interfaces

Battle-tested protocols, simple data formats, and explicit contracts consistently outperform clever, proprietary abstractions over the lifespan of enterprise software.

- **Standardization over novelty**: Favor standard REST/JSON, well-indexed SQL, and standard Kubernetes primitives over bespoke frameworks or undocumented custom abstractions.
- **Explicit over implicit**: Avoid magical framework reflection and hidden dynamic behaviors. Configuration, dependency injection, and timeouts should be readable and obvious to any engineer inspecting the codebase.
- **Simplicity is a reliability feature**: Complex systems fail in complex ways. Reducing the number of moving parts is the most effective way to eliminate failure domains.

## 4. Optimize for the next engineer

Code is written once but read, debugged, and maintained hundreds of times. High-caliber technical work deliberately leaves behind clarity rather than mystery.

- **Document the _why_, not just the _what_**: Code and configuration describe what the system does. Comments, pull request descriptions, and Architecture Decision Records (ADRs) must explain the context, constraints, and alternatives considered.
- **Predictable project structures**: Follow established ecosystem conventions (such as standard Maven/Gradle project layouts or GitOps folder hierarchies) so new team members can navigate codebases intuitively.
- **Executable tests as specifications**: High-quality unit and integration tests serve as living documentation of system requirements and edge cases. See [AI-assisted engineering](/wiki/ai-assisted-engineering/) for disciplined testing practices.

## 5. Make tradeoffs visible

Every technical decision involves compromise. Strong engineering leadership documents what was sacrificed, why the tradeoff was accepted, and what conditions would justify changing the decision in the future.

- **Acknowledge accepted risks**: Whether accepting eventual consistency, deferring cross-region replication, or choosing a simpler storage engine, explicitly record the decision in an ADR.
- **Identify review triggers**: Define quantitative thresholds that trigger architectural re-evaluations (e.g., "Revisit single-node Aurora writer if transaction volume exceeds 5,000 writes/second").
- **Foster constructive debate**: Ground technical disagreements in verifiable data, latency metrics, and organizational costs rather than personal preference.

## Principles in practice

| Principle                      | When Applied to Architecture                                   | When Applied to Incidents                                               | When Applied to Team Culture                                               |
| :----------------------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **Find the decision point**    | Eliminate unnecessary proxy layers and leaky abstractions.     | Diagnose root cause via distributed tracing before restarting services. | Address underlying team misalignments rather than symptoms.                |
| **Operations as design**       | Size connection pools and configure graceful shutdown hooks.   | Maintain structured communication and assign clear incident roles.      | Celebrate preventative platform investments equally with feature releases. |
| **Boring interfaces**          | Choose stable protocols and declarative GitOps configurations. | Rely on standard runbooks and proven rollback mechanisms.               | Encourage standard conventions that reduce onboarding cognitive load.      |
| **Optimize for next engineer** | Write modular code with explicit types and descriptive names.  | Publish blameless post-mortems with actionable platform tickets.        | Mentor junior engineers by explaining architectural rationale.             |
| **Make tradeoffs visible**     | Author clear Architecture Decision Records (ADRs).             | Communicate transparent customer impact during outages.                 | Encourage honest feedback regarding technical debt.                        |

To see how these principles translate directly into cloud architecture, explore [Platform engineering](/wiki/platform-engineering/) and [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

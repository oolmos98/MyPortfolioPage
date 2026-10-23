---
layout: ../../layouts/WikiLayout.astro
title: Working principles
description: Practical habits for technical decisions, production operations, and working with teams.
---

# Working principles

These are five habits I try to stick to when designing services, reviewing pull requests, debugging production issues, and working with other engineers.

## 1. Fix the problem at the decision point

When a bug shows up in production, the tempting fix is to add a retry loop, a null check, or a wrapper layer at the end of the call chain. Most of the time, that just hides the real problem and makes the system harder to reason about six months later.

Before writing a patch, trace the behavior back to the exact line of code, SQL query, or routing rule where the system took the wrong turn. Fixing it at the source keeps the diff small and prevents cascading workarounds.

## 2. Treat operations as part of the design

A service isn't ready for production just because the happy-path unit tests pass. While designing an API or background worker, we should already know:

- Which health probe tells Kubernetes the pod is ready for traffic vs. deadlocked?
- What happens when the downstream database or third-party API slows down by 10x?
- Which Dynatrace metric or trace will tell the on-call engineer what broke at 3 a.m.?
- How do we roll this release back if the migration goes sideways?

If we can't answer those four questions during design review, the feature isn't ready to ship. (See [Spring Boot on ROSA](/wiki/spring-boot-rosa/) and [Observability and collaboration](/wiki/observability-collaboration/).)

## 3. Prefer boring, explicit interfaces

Clever reflection tricks, custom framework wrappers, and undocumented conventions feel productive for the person who wrote them and painful for everyone who maintains them later.

Standard REST or GraphQL contracts, straightforward SQL, explicit timeouts, and declarative GitOps manifests age much better than bespoke abstractions. Fewer moving parts mean fewer weird failure modes under load.

## 4. Leave context for the next engineer

Code gets written once and read hundreds of times—often by a teammate debugging an incident under time pressure.

- **Explain _why_, not just _what_**: The code shows what is happening. Comments, commit messages, and short Architecture Decision Records (ADRs) should explain the constraint or trade-off that forced that choice.
- **Stick to standard project layouts**: Whether it's a Spring Boot repo or a Kustomize GitOps tree, predictable folder structures mean new engineers don't need a tour guide to find where timeouts are configured.
- **Write tests that document behavior**: Clear integration tests are the most reliable documentation a repo has because they break if they go out of date.

## 5. Name the trade-offs out loud

Every architecture choice trades one problem for another—simpler deployment now vs. harder multi-region scaling later, strict consistency vs. lower latency, building in-house vs. adopting a managed tool.

When making a technical call, I like to write down what we are optimizing for, what risk we are accepting, and what threshold would make us revisit the decision later (for example: _"A single Aurora writer with read replicas handles our current load; revisit sharding or caching if sustained writes pass 3,000/sec"_). Naming trade-offs openly keeps architecture discussions grounded in numbers instead of opinions.

---
layout: ../../layouts/WikiLayout.astro
title: AI-assisted engineering
description: How I use Claude and Codex on production codebases without introducing regressions.
---

# AI-assisted engineering

I use **Claude** and **Codex** daily for backend and platform work—writing boilerplate tests, drafting Kustomize overlays, translating SQL migrations, and exploring unfamiliar call stacks.

Used carelessly, though, LLMs generate plausible-looking code that hides subtle concurrency bugs, swallows exceptions, or pulls in outdated libraries. The workflow that works for me treats the model like a fast pair programmer operating under strict constraints, never as an autopilot.

## How I run AI-assisted tasks

Instead of asking a model to _"build feature X"_ across twenty files at once, I keep the loop tight:

1. **Pin down the boundary first**: Before opening a prompt, I decide where the change belongs and what is off-limits (for example: _"Use our existing Spring Data Redis client; do not add new Maven dependencies or change the public controller signature"_).
2. **Pass only the relevant context**: Dumping an entire repo into context usually degrades output quality. I feed the specific interface, the data model, and an existing test file so the model matches our conventions.
3. **Review the diff like an untrusted PR**: I read every line before running it—checking specifically for swallowed exceptions, missing timeouts, thread-safety issues, and hallucinated config properties.
4. **Verify with deterministic tools**: The code doesn't count until `./mvnw test`, static analysis, and local container builds pass cleanly.

## Example: scoping a task prompt

Vague prompts produce vague code. When I want help implementing a concrete component—like an idempotency filter—I structure the context and constraints explicitly:

```markdown
### Task: Implement Idempotency Filter for Order POST Requests

- **Stack**: Java 21, Spring Boot 3.3, Redis.
- **Files in scope**:
  - `src/main/java/com/example/platform/order/OrderController.java`
  - `src/main/java/com/example/platform/idempotency/IdempotencyFilter.java`
- **Behavior**:
  Check incoming POST requests for header `X-Idempotency-Key`.
  1. Do NOT add new Maven dependencies; use existing `StringRedisTemplate`.
  2. Use atomic `SET NX EX` so concurrent duplicate requests don't race.
  3. If key status is `COMPLETED`, return the cached status and body.
  4. If key status is `IN_PROGRESS`, return HTTP 409 Conflict.
- **Verify with**:
  `./mvnw test -Dtest=IdempotencyFilterIntegrationTest`
```

## What I check when reviewing AI-assisted PRs

When reviewing pull requests (including my own) where AI tools did heavy lifting, I look out for five common failure modes:

- **Invented or bloated dependencies**: Did the model pull in a new library for something the standard JDK or Spring already handles?
- **Happy-path bias**: AI-generated code almost always assumes the network is fast and the database is up. I check that HTTP calls have explicit timeouts, database calls are bounded, and errors log useful context.
- **Resource leaks**: Are input streams, HTTP responses, and database connections closed properly in `try-with-resources` blocks?
- **Subtle contract drift**: Did a refactored DTO accidentally rename a JSON field or change how null values and timestamps serialize?
- **Data boundary safety**: Never paste internal credentials, customer PII, or proprietary security topology into external cloud models.

## Where AI helps most vs. where it hurts

**Where it saves real time:**

- Writing parameterized edge-case unit tests (null inputs, boundary dates, malformed payloads).
- Turning a rough schema change into a clean Flyway migration + rollback script.
- Tracing an unfamiliar legacy class hierarchy to find where a config value is actually read.
- Drafting initial runbook templates and incident timelines.

**Where it causes trouble:**

- Copy-pasting a generated fix during a live outage without understanding the root cause.
- Accepting a 1,500-line multi-file refactor that nobody on the team can explain during code review.
- Trusting generated regular expressions, IAM policies, or auth logic without writing adversarial tests against them.

---
layout: ../../layouts/WikiLayout.astro
title: AI-assisted engineering
description: Practical Claude and Codex workflows for software engineering.
---

# AI-assisted engineering

AI coding assistants such as Anthropic Claude and OpenAI Codex are powerful levers for software engineering productivity, but they must amplify human judgment rather than replace it. In production systems, senior engineering leadership requires establishing clear task boundaries, providing targeted repository context, and demanding rigorous executable verification.

For foundational standards regarding interface design and review rigor, see [Working principles](/wiki/principles/).

## The bounded engineering loop

Unconstrained generation produces subtle architectural drift and hallucinated APIs. A reliable AI-assisted engineering workflow follows an iterative, closed-loop cycle:

1. **Scope and bound**: Define the exact problem, affected components, and strict non-negotiable constraints (e.g., "Do not introduce third-party libraries; retain existing public method signatures").
2. **Curate context**: Provide only the necessary interface definitions, schema contracts, and existing test suites. Avoid dumping entire codebases into prompts.
3. **Hypothesis generation**: Request the minimal viable implementation or test harness to validate the proposed design.
4. **Adversarial code review**: Inspect generated diffs with the same skepticism applied to untrusted external contributions.
5. **Deterministic verification**: Execute unit tests, static type checks, security linters, and integration builds locally before creating pull requests.
6. **Capture institutional learnings**: Document unexpected findings and update architectural documentation in Confluence.

## Bounded task prompt template

When prompting AI assistants for refactoring or feature implementation, use structured prompts that enforce precise constraints and executable verification:

```markdown
### Task: Implement Idempotency Interceptor for Order Processing

- **Context**: Spring Boot 3.3.x service interacting with Amazon Aurora PostgreSQL.
- **Relevant Files**:
  - `src/main/java/com/example/platform/order/OrderController.java`
  - `src/main/java/com/example/platform/idempotency/IdempotencyFilter.java`
- **Objective**:
  Implement a Redis/PostgreSQL-backed idempotency key check on incoming POST requests containing header `X-Idempotency-Key`.
- **Constraints**:
  1. Do NOT add new third-party Maven dependencies; utilize existing Spring Data Redis client.
  2. Maintain thread-safety under concurrent duplicate requests (use distributed locking or atomic inserts).
  3. If key exists with status 'COMPLETED', return cached HTTP response body and status code.
  4. If key exists with status 'PENDING', return HTTP 409 Conflict.
- **Verification Command**:
  `./mvnw test -Dtest=IdempotencyFilterIntegrationTest`
```

## Pull request review checklist for AI-generated code

Before approving or merging code authored or assisted by AI models, verify every item:

| Verification Category       | Risk Factor                                                   | Verification Checklist                                                                                                       |
| :-------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| **Dependency Hygiene**      | Hallucinated or malicious packages (typosquatting).           | Verify every library import against approved internal Maven/NPM registries. Ensure no untrusted packages were added.         |
| **Security & Privacy**      | Accidental credential leakage or insecure defaults.           | Ensure zero hardcoded keys, passwords, or internal URLs. Confirm input sanitization and parameterized SQL queries.           |
| **Concurrency & Resources** | Silent resource leaks and thread deadlocks.                   | Check that all file streams, HTTP connections, and database sessions use `try-with-resources`. Confirm proper thread-safety. |
| **Failure Boundaries**      | Optimistic happy-path generation ignoring network partitions. | Ensure timeout handling, circuit breakers, and explicit fallback catches are implemented.                                    |
| **API Contract Stability**  | Subtle alterations to JSON schema or HTTP status codes.       | Confirm serialized field names, date formats (ISO 8601), and error response bodies match existing public contracts.          |

## High-leverage workflows vs anti-patterns

```text
High-Leverage Workflows:
- Generating exhaustive boundary condition test cases (e.g., negative numbers, empty arrays, null fields)
- Explaining unfamiliar legacy call stacks and proposing initial refactoring abstractions
- Converting manual SQL schema changes into versioned Flyway/Liquibase migration scripts
- Drafting initial API documentation, OpenAPI specs, and incident runbooks from source code

Anti-Patterns:
- Trusting generated regular expressions or cryptography without independent fuzz testing
- Blindly copying AI code to resolve production outages without understanding underlying root causes
- Feeding proprietary enterprise secrets, production tokens, or sensitive customer PII to cloud LLMs
- Accepting complex autonomous architectural rewrites that bypass team review
```

For guidelines on integrating security scanning and automated gates into your delivery pipelines, explore [Secure delivery](/wiki/secure-delivery/).

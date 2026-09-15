---
layout: ../../layouts/WikiLayout.astro
title: AI-assisted engineering
description: Practical Claude and Codex workflows for software engineering.
---

# AI-assisted engineering

I use AI coding tools such as Claude and Codex to increase engineering
leverage, not to outsource judgment. These tools are most useful when the task
is bounded, the repository context is clear, and the result can be verified by
an executable check.

## A reliable loop

1. State the desired behavior, constraints, and acceptance check.
2. Give the tool only the repository context it needs.
3. Ask for the smallest change that can test the hypothesis.
4. Review the diff as if a teammate authored it.
5. Run focused tests, type checks, security scans, and the build.
6. Record decisions and update the project context when the system changes.

## Good uses

- Explore an unfamiliar code path and identify likely ownership.
- Generate test cases from a contract or failure mode.
- Refactor repetitive code while preserving behavior.
- Draft runbooks, migration plans, and review checklists.
- Compare implementation options and surface tradeoffs.

## Guardrails

- Do not paste secrets, credentials, customer data, or private architecture.
- Treat generated code as untrusted until reviewed and tested.
- Keep humans accountable for security, data, and production decisions.
- Prefer small, reversible edits over broad autonomous rewrites.
- Do not accept a generated explanation when the source code or a test can answer
  the question directly.

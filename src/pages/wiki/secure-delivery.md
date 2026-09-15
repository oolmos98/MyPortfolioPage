---
layout: ../../layouts/WikiLayout.astro
title: Secure delivery
description: GitLab CI, Snyk, identity, dependency hygiene, and release evidence.
---

# Secure delivery

Secure delivery means building security checks into the software delivery
process instead of waiting for a final review. My approach combines GitLab CI,
Snyk, least-privilege identity, dependency management, container scanning, and
release evidence.

## A practical pipeline shape

```text
validate -> test -> scan -> package -> deploy -> verify -> promote
```

Each stage should produce useful evidence. A successful pipeline should tell the
team what was tested, what was scanned, which artifact was deployed, and how the
deployment was verified.

## Controls worth standardizing

- Pin or constrain build dependencies and review updates deliberately.
- Scan source code, dependencies, container images, and infrastructure as code.
- Keep secrets in a managed store; do not use CI variables as a general vault.
- Use short-lived credentials and workload identity wherever possible.
- Treat failed security checks as actionable engineering feedback.
- Make artifact provenance and promotion visible to the team.

## Release evidence

For each release, retain the commit, build result, security-scan result,
artifact identifier, deployment environment, and verification outcome. This
turns a pipeline from a sequence of commands into an auditable engineering
record.

## Release questions

Before production, ask: What changed? What could fail? How will we know? Who
can roll it back? What data is affected? What evidence will remain after the
incident is over?

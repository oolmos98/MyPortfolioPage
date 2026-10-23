---
layout: ../../layouts/WikiLayout.astro
title: Engineering Wiki
description: Notes on platform engineering, Spring Boot on OpenShift (ROSA), GitOps delivery, and production operations.
---

# Engineering Wiki

I’m a Lead Software Engineer at State Farm. Most of my work sits across Java and Spring Boot services, GraphQL APIs, AWS, Red Hat OpenShift Service on AWS (ROSA), Argo CD GitOps, and production observability.

I keep these notes as a public reference for how I approach backend and platform engineering—from sizing connection pools and tuning Kubernetes health probes to running pull-based CI/CD pipelines and triaging incidents in Dynatrace. Examples here are sanitized and general so they don’t expose internal employer specifics.

## Notes

- [Platform engineering](/wiki/platform-engineering/) — Structuring AWS networking, ROSA clusters, Argo CD reconciliation, and ownership boundaries between platform and app teams
- [Spring Boot on ROSA](/wiki/spring-boot-rosa/) — JVM memory limits, probe separation, HikariCP sizing, and zero-downtime rolling updates on OpenShift
- [Secure delivery](/wiki/secure-delivery/) — Pull-based GitLab CI pipelines, Snyk scanning, OIDC identity, and release audit trails without cluster admin keys in CI
- [Observability and collaboration](/wiki/observability-collaboration/) — Using Dynatrace traces, Slack war rooms, Jira, and Confluence runbooks during incidents
- [Earlier experience](/wiki/earlier-experience/) — What carried over from building mobile apps (Flutter, SwiftUI, WeChat), SQL Server, and legacy Java stacks
- [AI-assisted engineering](/wiki/ai-assisted-engineering/) — How I use Claude and Codex on real codebases without introducing subtle regressions
- [Working principles](/wiki/principles/) — A few habits I rely on when reviewing code, designing systems, and mentoring engineers

## Definition of done

A service isn’t done when it compiles on a laptop. It’s done when the team can ship it through GitOps without babysitting the pipeline, see what it’s doing in Dynatrace, roll it back in one `git revert`, and hand it off to the next engineer on call without a tribal-knowledge briefing.

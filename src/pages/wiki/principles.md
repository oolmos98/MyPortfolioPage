---
layout: ../../layouts/WikiLayout.astro
title: Working principles
description: Engineering principles for technical decisions, operations, and leadership.
---

# Working principles

These are the standards I use when making technical decisions, reviewing work,
and helping teams operate software in production.

## Find the decision point

Find the component that actually decides the behavior before changing wiring
around it. This keeps fixes small, makes the reasoning easier to review, and
gives the validation step a clear target.

## Make operations part of design

An API, service, or deployment is incomplete without a clear owner,
observability, documented failure behavior, and a recovery path.

## Prefer boring interfaces

Clear contracts, explicit configuration, predictable logs, and documented
tradeoffs age better than clever abstractions. Simplicity is a reliability
feature.

## Optimize for the next engineer

The strongest technical work leaves behind fewer mysteries: useful names,
focused tests, current documentation, and a reason for decisions that are not
obvious from the code.

## Make tradeoffs visible

There is rarely a perfect technical option. I prefer to document the important
constraints, the risks accepted, and the condition that would justify changing
the decision later.

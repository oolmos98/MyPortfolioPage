---
layout: ../../layouts/WikiLayout.astro
title: Observability and collaboration
description: Dynatrace, Slack, Jira, and Confluence workflows for debugging production systems and running incidents.
---

# Observability and collaboration

Dashboards are useless if they just look green until a customer reports an outage. Good observability tells you _what_ broke and _why_ within a couple of clicks; good team habits make sure the fix actually gets documented so the next person on call doesn’t have to rediscover it from scratch.

For container health probes and structured logging setup, see [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## What we watch in Dynatrace

Rather than building walls of twenty CPU graphs, I set up service dashboards around four practical signals:

- **Tail latency (p95 / p99)**: Averages hide slow queries. Looking at p95 and p99 response times alongside Dynatrace PurePath distributed traces shows immediately whether latency is inside our JVM code, waiting on an Aurora query lock, or stuck on an external REST call.
- **Traffic volume**: Request rate and message throughput tell us whether an error spike is caused by a traffic surge or a bad deployment.
- **Error rates**: We separate client errors (`4xx`) from server faults (`5xx`, uncaught exceptions, tripped Resilience4j circuit breakers) so alerts only fire when our side is failing.
- **Resource saturation**: Container CPU throttling, JVM heap pressure, and HikariCP connection pool utilization usually warn us minutes before requests start timing out.

### Cutting down alert noise

Alert fatigue kills on-call effectiveness. We tag every Argo CD rollout in Dynatrace via webhook markers so when an anomaly fires, we can immediately see if a deployment happened five minutes earlier. Every paging alert is required to link directly to the affected service dashboard and a Confluence runbook—if an alert doesn’t have a clear action attached to it, it shouldn’t page anyone.

## Incident flow: from alert to post-mortem

When a production issue hits, we keep communication split by lifespan: Slack for real-time triage, Jira for follow-up engineering work, and Confluence for the permanent record.

```text
  Incident Commander      Dynatrace (Davis AI)       Slack (#war-room)       ROSA / Argo CD        Jira / Confluence
         |                          |                       |                      |                       |
   (1)   |                          +--- Root Cause Alert ->|                      |                       |
         |                          |    (HTTP 504 Spikes)  |                      |                       |
   (2)   |--- Acknowledge Alert & Initiate Triage --------->|                      |                       |
         |                          |                       |                      |                       |
   (3)   |--- Immediate Mitigation (Pod Scale / Git Revert) ---------------------->|                       |
         |                          |                       |                      |                       |
   (4)   |                          +--- Telemetry Normal ->|                      |                       |
         |                          |    (P95 Latency OK)   |                      |                       |
   (5)   |--- Document Post-Mortem & Update Living Runbook ------------------------------------------------>|
         |                          |                       |                      |                       |
```

- **Slack** is strictly for live coordination. One person takes the Incident Commander role so engineers debugging the issue aren’t interrupted every three minutes for status updates.
- **Jira** captures the follow-up engineering tickets (like adding a missing index or tightening a timeout) so remediation work gets scheduled into the next sprint instead of forgotten once the fire is out.
- **Confluence** holds the post-mortem and updated runbook so the next engineer who sees that alert knows what to check first.

## On-call handoff template

Long incidents occasionally cross shift boundaries. Dumping a 200-message Slack thread on the incoming engineer wastes time, so we post a short structured handoff before signing off:

```markdown
### Incident Handoff — [INC-4029: Order API 504 Gateway Timeouts]

- **Status**: MITIGATING
- **Customer Impact**: ~3% of checkout requests failing with HTTP 504 in US-East.
- **Suspected Cause**: Connection pool saturation on `aurora-pg-primary` after deploying `v2.4.1`.
- **What We Did**:
  - Reverted GitOps manifest to `v2.4.0` at 14:15 UTC.
  - Bumped replica count from 3 to 6 pods while the backlog drains.
- **What Needs Watching**:
  - Confirm p95 latency stays below 250ms over the next 30 minutes.
  - Check Aurora reader connection balance.
- **Handoff**: @omar.olmos -> @alex.dev
- **Links**:
  - Slack: `#inc-4029-order-api`
  - Dynatrace: `https://dynatrace.example.com/ui/apps/order-api`
  - Jira: `PLAT-8412`
```

---
layout: ../../layouts/WikiLayout.astro
title: Observability and collaboration
description: Dynatrace, Slack, Jira, and Confluence workflows for reliable engineering teams.
---

# Observability and collaboration

High-reliability engineering requires two complementary signals: telemetry from the runtime system and coordination across the engineering team. Dynatrace provides real-time distributed visibility into software execution; Slack, Jira, and Confluence provide the collaboration framework to triage, remediate, and permanently address systemic issues.

For container health baselines and probe configuration, refer to [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## The Four Golden Signals in Dynatrace

Observability dashboards must drive operational decisions rather than simply displaying raw graphs. We monitor services by mapping Dynatrace metrics directly to the SRE Four Golden Signals:

- **Latency**: Measure response times at the 95th and 99th percentiles (p95/p99) rather than misleading arithmetic averages. Dissect database query latency from external API response times using Dynatrace PurePath distributed tracing.
- **Traffic**: Track inbound HTTP request throughput and Kafka consumer message rates to understand real-time customer demand and detect sudden traffic anomalies.
- **Errors**: Quantify HTTP 5xx responses, unhandled JVM runtime exceptions, and circuit breaker trips. Isolate client-driven errors (4xx) from server-side infrastructure faults.
- **Saturation**: Monitor container cgroup CPU throttling, JVM heap memory fragmentation, and database connection pool (HikariCP) utilization before degradation impacts end users.

## Dynatrace and Davis AI root-cause analysis

Dynatrace’s Davis AI engine evaluates topological dependencies via Smartscape mapping to eliminate alert noise during complex cascading failures:

1. **Automated anomaly detection**: Davis dynamically baselines typical performance (evaluating seasonal trends and diurnal curves) to trigger alerts only on statistically significant deviations.
2. **Topology-aware correlation**: When a downstream database experiences connection saturation, Davis correlates upstream API timeout spikes directly to the root cause rather than alerting on every downstream consumer individually.
3. **Deployment event markers**: Automatically tag releases via CI/CD webhooks so teams can immediately determine whether an anomaly coincided with a specific code or configuration rollout.
4. **Actionable alerts**: Every alert must include:
   - Clear customer impact (e.g., "Checkout error rate elevated to 4.2%").
   - Suspected root cause entity.
   - Deep link directly to the relevant Dynatrace PurePath trace.
   - Runbook link outlining immediate triage steps.

## Cross-functional collaboration matrix

Effective engineering teams clearly separate transient communication from durable institutional knowledge:

| Tool           | Primary Function                                                          | Lifespan                  | Best Practices                                                                                                                              |
| :------------- | :------------------------------------------------------------------------ | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Slack**      | Immediate triage and incident war-room coordination                       | Ephemeral (hours to days) | Designate an Incident Commander. Avoid splitting discussions across multiple channels. Post structured status rollups at regular intervals. |
| **Jira**       | Work tracking, remediation backlog, and platform tasks                    | Medium-term (sprints)     | Write tickets around measurable outcomes. Link every remediation task directly to the incident review ticket.                               |
| **Confluence** | Durable runbooks, architectural decision records (ADRs), and post-mortems | Long-term (living docs)   | Include document owners and last-verified timestamps. Every production alert must link directly to an active Confluence runbook.            |

## Production incident handoff template

During active production incidents, handoffs between on-call engineers must be concise, structured, and factual. Use this standardized markdown template in Slack:

```markdown
### Incident Handoff — [INC-4029: Order API 504 Gateway Timeouts]

- **Current Status**: ACTIVE / MITIGATING
- **Customer Impact**: ~3% of checkout requests failing with HTTP 504 in US-East.
- **Root Cause Candidate**: Connection pool exhaustion on `aurora-pg-primary` following deployment `v2.4.1`.
- **Mitigations Applied**:
  - Rolled back deployment to `v2.4.0` at 14:15 UTC.
  - Scale replica count increased from 3 to 6 pods to absorb traffic backlog.
- **Next Actions**:
  - Monitor Dynatrace p95 response time until it drops below 250ms threshold.
  - Verify Aurora read-replica connection distribution.
- **Current Incident Commander**: @omar.olmos -> Handing off to: @alex.dev
- **Incident Links**:
  - Slack Channel: `#inc-4029-order-api`
  - Dynatrace Dashboard: `https://dynatrace.example.com/ui/apps/order-api`
  - Jira Post-Mortem Ticket: `https://jira.example.com/browse/PLAT-8412`
```

## Post-incident review and learning

The value of an incident lies in the architectural improvements it motivates:

- **Blameless post-mortem**: Focus on systemic vulnerabilities, missing alerts, and unclear runbooks rather than individual human error.
- **Prioritize preventative work**: Schedule corrective platform improvements into upcoming sprint cycles before resuming non-essential feature development.
- **Refine operational documentation**: Update Confluence runbooks with newly discovered remediation techniques and failure signatures.

For broader engineering principles regarding team culture and operational ownership, see [Working principles](/wiki/principles/).

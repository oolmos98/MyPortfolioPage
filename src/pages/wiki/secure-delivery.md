---
layout: ../../layouts/WikiLayout.astro
title: Secure delivery
description: GitLab CI, Snyk, Argo CD GitOps, identity, dependency hygiene, and release evidence.
---

# Secure delivery

Secure delivery integrates continuous verification and compliance directly into software delivery rather than treating security as an out-of-band audit gate. By combining GitLab CI, Snyk security scanning, Argo CD GitOps reconciliation on ROSA, short-lived workload identity, and cryptographically verified release evidence, teams can release rapidly while maintaining verifiable compliance.

For application runtime baselines and container hygiene, see [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## A practical GitOps pipeline shape

```text
validate -> test -> scan -> package & sign -> update gitops -> argo cd reconcile -> verify
```

Every stage produces auditable artifacts. A pull-based GitOps pipeline provides critical engineering and security advantages:

- CI runners require zero cluster administrator credentials; they only push container images to the registry and commit image digests to the GitOps configuration repository.
- What source commit and dependencies were verified?
- What security vulnerabilities were detected, and which were blocked?
- Which exact image digest was built and signed?
- How was deployment verified before traffic promotion?

## Automated scanning with GitLab CI, Snyk, and GitOps

Below is an illustrative enterprise pipeline configuration demonstrating open-source dependency scanning, container vulnerability analysis, Cosign image signing, and GitOps promotion via Argo CD:

```yaml
stages:
  - validate
  - test
  - scan
  - package
  - promote-gitops
  - verify

variables:
  SNYK_SEVERITY_THRESHOLD: "high"
  DOCKER_REGISTRY: "registry.example.com"
  IMAGE_NAME: "${DOCKER_REGISTRY}/platform/order-processing-service"
  GITOPS_REPO: "git@gitlab.example.com:platform/gitops-manifests.git"

# Authenticate via OIDC to avoid long-lived cloud credentials
.assume-role:
  id_tokens:
    AWS_JWT:
      aud: "https://gitlab.example.com"
  before_script:
    - mkdir -p ~/.aws
    - echo "Assuming IAM role via OIDC token..."

snyk-dependency-scan:
  stage: scan
  image: snyk/snyk:maven-3-jdk-21
  script:
    - snyk test --severity-threshold=${SNYK_SEVERITY_THRESHOLD} --json-file-output=snyk-deps.json
  artifacts:
    when: always
    paths:
      - snyk-deps.json
    reports:
      dependency_scanning: snyk-deps.json

snyk-container-scan:
  stage: scan
  image: snyk/snyk:docker
  needs:
    - package-container
  script:
    - snyk container test ${IMAGE_NAME}:${CI_COMMIT_SHORT_SHA} --severity-threshold=critical --fail-on=upgradable

promote-to-test-gitops:
  stage: promote-gitops
  image: alpine/k8s:1.30.2
  script:
    - git config --global user.name "GitLab CI Automation"
    - git config --global user.email "ci-bot@example.com"
    - git clone ${GITOPS_REPO} gitops-repo
    - cd gitops-repo/environments/test/services/order-processing-service
    # Update image tag in Kustomize overlay to new immutable digest
    - kustomize edit set image ${IMAGE_NAME}=${IMAGE_NAME}:${CI_COMMIT_SHORT_SHA}
    - git commit -am "chore(release): promote order-processing-service to ${CI_COMMIT_SHORT_SHA}"
    - git push origin main
    # Argo CD on ROSA automatically detects Git change and reconciles state

verify-argo-sync:
  stage: verify
  image: argoproj/argocd:v2.11.0
  script:
    # Wait for in-cluster Argo CD to report Synced & Healthy on ROSA
    - argocd app wait order-processing-service-test --health --timeout 180
```

## Standardized security controls

- **Pull-based GitOps security**: By using Argo CD on ROSA, CI runners never hold Kubernetes cluster administrator credentials or kubeconfig tokens. CI simply commits desired manifests to Git, eliminating a major vector for cluster privilege escalation.
- **Pin dependencies deliberately**: Constrain dependency versions and automate vulnerability alerting via dependabot or Renovate. Review major dependency updates with dedicated regression tests.
- **Enforce least-privilege identity**: Eliminate static service account keys. Authenticate CI/CD workers using OpenID Connect (OIDC) federated directly into AWS IAM or Azure Entra ID.
- **Centralize secret management**: Secrets must never be stored in Git or passed as generic plain-text CI variables. Mount credentials dynamically using AWS Secrets Manager or external secret operators integrated with Argo CD.
- **Scan across layers**: Apply security gating across source code (SAST), third-party libraries (SCA), container base images, and infrastructure as code (IaC scanning for Terraform/Helm).
- **Cryptographic image signing**: Sign container images post-build with Cosign. Configure admission controllers on ROSA to reject unsigned images.

## Auditable release evidence

Transforming pipeline execution into an immutable audit trail requires structured release manifests. Every production release generates an evidence document captured in git or artifact storage:

```json
{
  "release_id": "rel-2026-09-18-0042",
  "service": "order-processing-service",
  "git_commit": "a4f891b6c071d4e21a37c83f982312b1d30561ea",
  "timestamp_utc": "2026-09-18T18:45:00Z",
  "pipeline_id": "gl-ci-984210",
  "build_artifact": {
    "image": "registry.example.com/platform/order-processing-service@sha256:d8b2e1f4091c...",
    "cosign_signature": "MEQCIF91...sig",
    "base_image": "registry.access.redhat.com/ubi9/openjdk-21-runtime:1.18"
  },
  "security_scans": {
    "snyk_deps": { "critical": 0, "high": 0, "medium": 2, "status": "PASSED" },
    "snyk_container": { "critical": 0, "high": 0, "status": "PASSED" }
  },
  "gitops_sync": {
    "repo": "platform/gitops-manifests",
    "target_revision": "main",
    "reconciliation_engine": "Argo CD / OpenShift GitOps",
    "sync_status": "Synced",
    "health_status": "Healthy"
  },
  "deployment_target": "rosa-prod-us-east-1",
  "approver": "lead-platform-engineer@example.com"
}
```

## Production readiness checklist

Before promoting code to production, verify:

1. **What changed?** Has the commit log been summarized with clear functional tickets and architectural changes?
2. **What could fail?** Have failure modes, database migration impacts, and downstream timeouts been evaluated?
3. **How will we know?** Are Dynatrace service dashboards, synthetic tests, and alert notifications verified for the new release?
4. **Who can roll it back?** Can on-call engineers roll back the release by reverting the GitOps commit in Git without cluster shell access?
5. **What data is affected?** Are database schema changes backward-compatible with the previous revision?

For core architectural standards that guide these release decisions, consult [Working principles](/wiki/principles/) and [Platform engineering](/wiki/platform-engineering/).

---
layout: ../../layouts/WikiLayout.astro
title: Secure delivery
description: GitLab CI, Snyk, Argo CD GitOps, OIDC identity, and release verification.
---

# Secure delivery

Security gates work best when they run automatically inside the normal delivery pipeline rather than as a manual spreadsheet review two days before launch. Using GitLab CI, Snyk, OIDC short-lived tokens, and Argo CD on ROSA lets us verify every commit without slowing down releases.

For how the containers themselves are configured on OpenShift, see [Spring Boot on ROSA](/wiki/spring-boot-rosa/).

## Pull-based pipeline flow

```text
validate -> test -> scan -> package & sign -> update gitops -> argo cd reconcile -> verify
```

The biggest security win in this setup is **pull-based GitOps**: GitLab CI runners never hold OpenShift cluster-admin credentials or long-lived kubeconfigs. The pipeline’s job ends once it pushes a signed container image to the registry and commits the new SHA256 digest to the GitOps manifest repo. Argo CD inside the ROSA cluster pulls that commit and applies it.

If a CI runner is ever compromised, it has no direct network or RBAC path to mutate running workloads in the cluster.

## GitLab CI + Snyk + GitOps promotion

Here is a stripped-down version of the pipeline pattern we use for Java services:

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

# Authenticate via OIDC instead of storing static AWS IAM keys in CI variables
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
    # Pin Kustomize overlay to the exact immutable image tag/digest
    - kustomize edit set image ${IMAGE_NAME}=${IMAGE_NAME}:${CI_COMMIT_SHORT_SHA}
    - git commit -am "chore(release): promote order-processing-service to ${CI_COMMIT_SHORT_SHA}"
    - git push origin main

verify-argo-sync:
  stage: verify
  image: argoproj/argocd:v2.11.0
  script:
    - argocd app wait order-processing-service-test --health --timeout 180
```

## Guardrails that actually matter

Rather than checking fifty compliance boxes that don't catch real bugs, I focus on five controls:

1. **No static cloud keys in CI**: Runners authenticate to AWS and Entra ID using short-lived OIDC JWT tokens scoped to the specific project and branch.
2. **Fail builds on fixable vulnerabilities**: Snyk runs against both the Maven dependency tree (`snyk test`) and the built container image (`snyk container test`). If a critical vulnerability has an upstream fix available (`--fail-on=upgradable`), the pipeline stops before promotion.
3. **Secrets stay out of Git and CI logs**: Application secrets live in AWS Secrets Manager and mount at runtime rather than sitting in repo variables or Kustomize files.
4. **Immutable image digests**: Tagging images `:latest` makes rollbacks and audits impossible. Every deployment references a specific commit SHA and image digest, signed with Cosign.
5. **Automated release receipts**: Each production promotion writes a small JSON receipt capturing the commit SHA, image digest, Cosign signature, Snyk scan summary, and Argo CD sync status so compliance audits don't require digging through old console logs.

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
  "deployment_target": "rosa-prod-us-east-1"
}
```

## Five questions before merging to prod

Before approving a production promotion, I make sure we can answer five basic questions:

1. **What changed?** Is the diff small enough to reason about, and tied to a clear ticket?
2. **What breaks if the dependency is slow?** Are timeouts and circuit breakers configured if a downstream call hangs?
3. **Are the database changes backward-compatible?** Can the old pod version and the new pod version run side-by-side during the rolling update (expand/contract pattern)?
4. **How will we know it’s working?** Which Dynatrace dashboard or synthetic monitor will show if error rates spike?
5. **Can on-call revert it in under two minutes?** Is rolling back just a `git revert` on the GitOps repo?

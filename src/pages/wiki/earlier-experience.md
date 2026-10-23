---
layout: ../../layouts/WikiLayout.astro
title: Earlier experience
description: Mobile development, SQL Server, legacy Java stacks, and cloud infrastructure from earlier in my career.
---

# Earlier experience

Most of my current work revolves around Java microservices, OpenShift (ROSA), and platform engineering. Earlier in my career, though, I spent years building mobile apps, maintaining older enterprise Java stacks, tuning SQL Server databases, and writing Terraform.

Having worked on the client and application side shapes how I build platform tooling today: if a platform guardrail makes life miserable for application developers, teams will eventually find ways around it.

## Mobile and frontend clients (Flutter, SwiftUI, WeChat, React)

Shipping mobile apps across **Flutter**, **SwiftUI**, and **WeChat Mini Programs** (alongside **React** on the web) taught me lessons you don't always learn writing backend code in a datacenter:

- **You can't force-upgrade every client**: When a backend team breaks a REST or GraphQL contract, you can't just redeploy the user's phone. Working on mobile made me strict about backward-compatible schema changes and defensive JSON parsing.
- **Networks are unreliable**: Mobile clients deal with dropped connections, high latency, and tight memory ceilings constantly. Designing offline-friendly caching and idempotent retry logic on the client side directly informed how I design backend APIs today.
- **GraphQL trade-offs**: Giving clients flexible queries is great for reducing mobile payload sizes, but on the backend it requires batch loaders (solving `N+1` queries) and query depth limits so one deeply nested request doesn't pin the database.

## Traditional enterprise Java and SQL Server

Before containers and Kubernetes became standard, I maintained **JavaServer Pages (JSP)** applications and worked heavily with **Microsoft SQL Server**.

Dealing with monolithic deployments, stateful user sessions, and manual server configuration made the value of stateless containers and declarative GitOps obvious. On the data side, spending time in SQL Server—reading execution plans, fixing index fragmentation, and tracking down transaction deadlocks—carried straight over into operating PostgreSQL and Amazon Aurora today. The syntax changes slightly, but lock contention and bad indexing look the same everywhere.

## Infrastructure and tooling (Terraform, S3, Azure DevOps, Bruno)

- **Terraform & AWS S3**: Writing Terraform modules to provision cloud infrastructure and S3 storage pipelines was my first step away from click-ops toward repeatable environments.
- **CI/CD across platforms**: Before standardizing on GitLab CI and Argo CD on ROSA, I built pipelines in **Azure DevOps** and **GitHub Actions**. Different YAML syntax, same core goal: catch broken builds and security issues early without making developers wait 45 minutes for feedback.
- **Git-tracked API collections (Bruno & Insomnia)**: I prefer storing API request collections (using tools like Bruno) right inside the service repository alongside the code, rather than locking them in a separate cloud workspace that drifts out of sync with the actual endpoints.
- **Architecture diagrams (draw.io / ASCII)**: Whether in draw.io or plain-text ASCII inside markdown docs, sketching the actual request path and failure boundaries before writing code saves days of rework later.

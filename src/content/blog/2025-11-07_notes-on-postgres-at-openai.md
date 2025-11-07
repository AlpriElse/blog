---
author: Alpri Else
pubDatetime: 2025-11-07T08:00:00.000Z
title: Notes on "Scaling Postgres to the next level at OpenAI"
slug: notes-on-scaling-postgres-at-openai
featured: false
description: OpenAI has a surprisingly simple Postgres infrastructure that scales to millions of QPS.
tags:
  - micro-blog
---

OpenAI has surprisingly simple Postgres infrastructure that scales to millions of QPS. [Bohan Zhang](https://bohanzhang.me/), an MTS at OpenAI gave a ["Scaling Postgres to the next level at OpenAI"](https://www.meetup.com/seattle-postgres/events/311499828/?eventOrigin=your_events) talk to the Seattle Postgres User Group. Zhang was previously a co-founder of a Postgres startup and coauthor of ["The Part of PostgreSQL We Hate the Most"](https://www.cs.cmu.edu/~pavlo/blog/2023/04/the-part-of-postgresql-we-hate-the-most.html).

In the talk, Zhang shared that Postgres serves most of OpenAI's read-heavy traffic while most write-heavy workloads like Chat have been offloaded to other data-stores like Azure Cosmos DB. The main reason for continuing to rely on Postgres, he noted, is the significant engineering effort required to migrate fully -- combined with the belief that their current, relatively simple Postgres setup still has ample capacity to scale with demand. Remarkably, he stated their entire Postgres infrastructure comprised of a single write primary with many geo-distributed read replicas with streaming replication.

Most of the system's scalability, he noted, comes from executing on database performance basics and vertically scaling before reaching for complex solutions like sharding. Practices like setting sensible application and connection timeouts, exponential backoff on retries, and connection pooling with `pgbouncer` all contribute to smoothing write pressure. The highlighted source of performance problems, interestingly, is the release of new features that unintentionally introduces ORM-generated join queries. But, this too they simply fix by executing the join within the application layer.

The only aspect another attendee questioned as potentially being "complex" is setting up streaming replication as opposed to replication using [Postgres WAL Archives](https://www.postgresql.org/docs/current/continuous-archiving.html). I had no clue what this was until being nerd snipped. But, it seems like unless you have high write volume, your replication lag follows how quickly you fill out a WAL segment of ~16MB which can stretch to minutes.

Honestly, it's just surprising that this simple approach with good database hygiene works for OpenAI's scale.

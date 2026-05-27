## Problem Statement

The problem the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A long, numbered list of user stories. Format:

> As a <actor>, I want <feature>, so that <benefit>.

Each user story includes a **verifiable hint** — a one-sentence description of how completion would be observed in the running system. This hint feeds predicate authorship downstream.

Example:

> 1. As a mobile bank customer, I want to see balances on my accounts, so that I can make better-informed spending decisions.
>    *Verifiable hint: GET /accounts returns a list with `balance` populated for every active account; an integration test asserts this for the demo user.*

The list should be extensive and cover all aspects of the feature.

## Implementation Decisions

A list of decisions. May include:

- Modules built or modified
- Public interfaces
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do not include file paths or code snippets — they go stale.

## Module Map

For each major module:

- **Name**:
- **Responsibility** (one sentence):
- **Public interface** (high level):
- **Test boundary** (what's tested in isolation):
- **Independently deliverable**: yes / no
- **File-set hint** (rough — `prd-to-issues` will refine):

Look actively for opportunities to extract **deep** modules — modules that encapsulate substantial functionality behind a simple, testable interface that rarely changes.

## Parallelism Analysis

For each pair of modules:

- **Independent**: can run in parallel (no shared files, no shared in-flight state).
- **Sequential**: B depends on A.
- **Conflicting**: both touch the same file; merge or sequence.

This section drives wave planning in `prd-to-issues`. Be explicit — implicit dependencies become wave-plan bugs.

## Definition of Done

A flat list of mechanically verifiable predicates. When ALL pass, the PRD is delivered. Each entry is a one-line statement that maps cleanly to an executable check (test, grep, file-exists, type-check, custom script).

Examples:

- All new endpoints reject unauthenticated requests with 401 (verified by integration test).
- No `console.log` calls in production code paths (verified by grep-zero).
- Migration applies cleanly on a fresh database (verified by CI script).
- Test coverage on new modules ≥ 80% (verified by coverage report).
- Login flow completes end-to-end on mobile and desktop viewports (verified by E2E test).

This list becomes the spine of the final-closeout audit. If you cannot write a predicate hint for a criterion, the criterion is underspecified — sharpen it before submitting the PRD.

## Testing Decisions

- What makes a good test (external behavior, not implementation details).
- Which modules will be tested.
- Prior art in the codebase (similar test types, fixtures, harness).

## Out of Scope

Explicit list of things this PRD does not deliver. Each item should be mechanically distinguishable from in-scope work — i.e. an audit-time grep or test could clearly classify a behaviour as in-scope vs out-of-scope.

## Further Notes

Anything else relevant: deployment considerations, migration timing, rollout strategy, known unknowns.

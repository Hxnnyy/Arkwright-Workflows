## Parent PRD

#<PRD-ISSUE-NUMBER>

## What to build

End-to-end behaviour of this vertical slice. Reference parent PRD sections; do not duplicate content.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Acceptance predicate

`scripts/verify-issue-<n>.sh` (committed alongside this issue).

The predicate covers each AC above with a deterministic check:

- AC1 → <predicate type>: <one-line description of the check>
- AC2 → <predicate type>: <one-line description>
- AC3 → <predicate type>: <one-line description>

A child issue does not close unless `bash scripts/verify-issue-<n>.sh` exits 0 on the integration branch. The predicate script is the AC contract — implementers receive it as input and **must not modify it**.

Predicate types: `failing-test-turns-green`, `grep-zero`, `file-exists`, `type-compiles`, `predicate-script`, `diff-invariant`, `endpoint-probe`. See `_shared/acceptance-predicates.md`.

## Files likely touched

The file-ownership contract for parallel dispatch. A subagent assigned this issue may modify only these files unless the orchestrator explicitly expands scope. The predicate script (`scripts/verify-issue-<n>.sh`) is **not** in this list — implementers do not edit it.

- `path/to/file-a.ts`
- `path/to/file-b.ts`

## Delivery standards

- Source: `docs/DeliveryStandards.md` (or repo equivalent)
- Follow existing code style, test conventions, security defaults, doc rules.
- Do not introduce new patterns without citing precedent or recording the decision.

## Risk tags

quality | security | design | performance | docs

## Required reviewers

### Wave gate

- `implementation-quality-reviewer` (always)
- `documentation-reviewer` (default; record reason if skipped)
- Additional reviewers per risk tags.

### Final parent closeout

See parent PRD Delivery Governance.

## Audit rationale

One sentence per reviewer: why required, or why skipped.

## Escalation triggers

Add reviewers if actual diffs touch:

- Auth, authorization, user data, RLS, secrets, dependencies, trust boundaries → `security-reviewer`
- UI, UX, copy, accessibility, responsive behaviour, product workflow → `product-design-reviewer`
- Hot paths, queries, bundle, caching, async, scalability → `performance-reviewer`
- Architecture, decisions, runbooks, agent context, security notes → `documentation-reviewer`

## Blocked by

- #<issue-number>, or "None — can start immediately"

## User stories addressed

Reference by number from parent PRD:

- User story 3
- User story 7

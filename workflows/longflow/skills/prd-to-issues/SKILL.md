---
name: prd-to-issues
description: Slice a parent PRD into parallel-safe child issues with deterministic predicates, routing policy, and wave-gate governance.
---

# PRD to Issues (Arkwright Longflow)

Use this after parent PRD authoring.

Shared references:

- ../_shared/acceptance-predicates.md
- ../_shared/reviewer-protocol.md
- ../_shared/model-routing.md
- ../_shared/templates/child-issue.md
- ../_shared/templates/delivery-governance.md

## Hard Rules

1. Discover or bootstrap standards before slicing.
2. Author predicates before child issue creation.
3. If AC cannot be made deterministic, fix AC first.
4. Parallel groups must have disjoint file ownership.
5. Delivery governance must be recorded on the parent PRD.

## Process

### 1. Ingest Parent PRD

Extract:

- module map
- wave candidates
- definition of done items
- risk tags

### 2. Standards Check

Classify standards state as ESTABLISHED, PARTIAL, or MISSING.

If PARTIAL or MISSING, bootstrap minimal standards first.

### 3. Slice Child Issues

For each slice, set:

- title
- AFK/HITL classification
- blocked-by
- files likely touched
- lead model
- required reviewers

### 4. Author Predicates

Create scripts/verify-issue-<n>.<ext> for each child issue using deterministic checks.

### 5. Build Waves

Create wave plan with:

- parallel groups
- sequential tails
- wave-gate required reviewers

### 6. Record Delivery Governance

Write governance section on parent PRD using template.

### 7. Create Issues

Create child issues in dependency-safe order.

## Output Contract

- child issue list
- predicate script list
- wave plan
- delivery governance block

## Handoff

Next skill: issues-execution

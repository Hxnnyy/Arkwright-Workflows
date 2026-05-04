---
name: issues-execution
description: Execute a parent PRD issue tree end-to-end in continuous mode with deterministic predicates, routing policy, wave gates, and final closeout audits.
---

# Issues Execution (Arkwright Longflow)

Use this for implementation and closure.

Shared references:

- ../_shared/continuous-mode.md
- ../_shared/hard-block-conditions.md
- ../_shared/reviewer-protocol.md
- ../_shared/model-routing.md
- ../_shared/state-files.md
- ../_shared/templates/CONTINUOUS_DIRECTIVE.md
- ../_shared/templates/STATE.json
- ../_shared/templates/execplan.md
- ../_shared/templates/orchestrator-kickoff.md

## Hard Rules

1. Continuous mode is default for end-to-end requests.
2. Stop only for hard-block conditions.
3. Child issue closes only after predicate pass.
4. Implementers do not modify predicate scripts.
5. Delegate implementation by default.
6. Keep orchestrator edits tiny and low-risk.
7. No parent closure without required final audits.

## Environment Guardrails

When enabled in governance config:

- require fresh branch
- require fresh worktree
- do not mutate protected environment surfaces

## Execution Loop

### Phase 0: Prepare State

Write directive, state, and execplan files.

### Phase 1: Ingest

Read parent PRD, child issues, governance, standards, and predicate scripts.

### Phase 2: Implement Waves

For each wave:

1. verify disjoint ownership in parallel groups
2. dispatch lead implementer by issue type routing
3. verify scoped diffs
4. run predicate
5. run required issue reviewers
6. fix BLOCKED findings and re-run checks
7. commit and mark issue predicate-passed

### Phase 3: Wave Gate

Run required wave-gate panel and close wave issues only after gate pass.

### Phase 4: Final Sweep

- resolve wave notes
- run full test and predicate rollup
- ensure docs are current

### Phase 5: Final Closeout Panel

Run required final models x personas and enforce no-blocking rule.

### Phase 6: Parent Closure

Close parent PRD only when all closure rules pass.

## Final Closure Condition

All required final persona-model audits are PASS or NOT_APPLICABLE with blocking_count = 0.

## Handoff

Next skill: stabilisation

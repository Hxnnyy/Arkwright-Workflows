# Execution Policy

This policy governs issues-execution runs.

## Operating Mode

- Default mode: continuous.
- Pause policy: hard-block conditions only.

## Isolation Policy

If enabled in config or governance:

1. Run on a fresh branch.
2. Run in a fresh worktree.
3. Do not mutate protected environment surfaces used for demos.

## Delegation Policy

- Orchestrator controls flow and evidence.
- Implementers perform most code changes.
- Orchestrator direct edits only for tiny low-risk fixes.

## Routing Policy

Use model routing from config for:

- lead by issue type
- reviewer sets by issue type
- wave-gate panel
- final closeout panel

## Issue Closure Policy

An issue can close only when:

1. Predicate script passes.
2. Required issue reviewers are no-blocking.
3. Wave-gate conditions are met.

## Parent Closure Policy

Parent PRD can close only when:

1. All child issues are closed.
2. Predicate rollup passes.
3. Required final persona-model audits are no-blocking.

## State Durability Policy

Required files:

- tasks/CONTINUOUS_DIRECTIVE.md
- tasks/STATE.json
- tasks/<date>-<slug>-execplan.md

These must be updated and re-read according to shared contracts.

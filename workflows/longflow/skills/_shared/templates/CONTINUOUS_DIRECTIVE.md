# Continuous Directive

mode: continuous
parent_prd: <issue-number>
child_range: <start>-<end>
started_at: <iso-8601>

## Contract

1. Continue until parent PRD is closed or a hard block fires.
2. Stop only for enumerated hard-block conditions.
3. Re-read this file at the start of every batch iteration.
4. Keep state in tasks/STATE.json and tasks/<date>-<slug>-execplan.md.
5. Delegate implementation by default.
6. Keep orchestrator edits limited to tiny low-risk fixes.

## Guardrails

- Fresh branch required: <true-or-false>
- Fresh worktree required: <true-or-false>
- Protected environment surfaces: <list>

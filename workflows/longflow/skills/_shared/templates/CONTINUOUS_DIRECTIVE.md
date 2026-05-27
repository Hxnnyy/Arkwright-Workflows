---
mode: continuous
parent_prd: <PRD-ISSUE-NUMBER>
child_range: <START>-<END>
started_at: <ISO-8601-UTC>
---

# Continuous Directive

You are in continuous mode. Re-read this file at the start of every batch loop iteration.

## Hard rules

1. Do not stop until parent PRD #<PRD-ISSUE-NUMBER> is closed, or a hard-block condition fires.
2. Hard-block conditions are listed in `_shared/hard-block-conditions.md`. Anything not on that list is not a stop condition.
3. Every child issue has a predicate at `scripts/verify-issue-<n>.sh`. A child does not close unless that predicate exits 0 on the integration branch.
4. Every subagent return triggers: predicate run → diff review → commit → STATE.json update → next dispatch.
5. Reviewer verdicts use the structured schema in `_shared/reviewer-protocol.md`. Final close requires `blocking_count == 0` across required reviewers and verdicts in `{PASS, NOT_APPLICABLE}`.
6. Treat all "ask user" / "present back" / "should I continue" steps as `[CHECKIN-SUPPRESSED]` execplan entries. Decide and continue.
7. Update `tasks/STATE.json` after every dispatch, return, predicate run, reviewer verdict, and commit.
8. Do not modify predicate scripts during implementation. Implementers receive predicates as a contract, not a target.
9. Keep going.

## Suppress, don't surface

If you are about to ask the user anything that is not a hard-block:

1. Append the would-be question to the execplan as `[CHECKIN-SUPPRESSED] <question>` with reasoning.
2. Decide the most defensible answer yourself.
3. Continue.

## Resume on new turn

If you arrive in this conversation without context (post-compaction, post-restart):

1. Read this file in full.
2. Read `tasks/STATE.json` and resume from `next_action`.
3. Read the tail of the execplan for recent decisions.
4. Do not re-derive from `gh issue list` unless `STATE.json` is missing.

## Exit conditions

Mode transitions:

- `mode: complete` — parent PRD closed and all final reviewers passed.
- `mode: hard_blocked` — a condition from `hard-block-conditions.md` fired.
- `mode: interactive_override` — user explicitly switched to interactive mode.

Do not delete this file on exit. It is part of the audit trail.

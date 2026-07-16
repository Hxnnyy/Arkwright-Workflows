# Execplan: <slug>

- **Parent PRD**: #<PRD-ISSUE-NUMBER>
- **Child range**: #<START>–#<END>
- **Mode**: continuous
- **Started**: <ISO-8601 UTC>
- **State files**: `tasks/CONTINUOUS_DIRECTIVE.md`, `tasks/STATE.json`

## Continuous-mode contract (re-read every batch)

1. Do not stop until parent PRD closed or hard-block fires (see `_shared/hard-block-conditions.md`).
2. Every child requires a passing `scripts/verify-issue-<n>.sh` before close.
3. Reviewer verdicts use `_shared/reviewer-protocol.md` schema. Final close requires `blocking_count == 0` across required final reviewers; `PASS_WITH_NOTES` is not accepted at final.
4. "Ask user" → `[CHECKIN-SUPPRESSED]` entry → decide and continue.
5. Track every spawned agent in `STATE.json`; returned is not closed.
6. Implementers must not modify predicate scripts.
7. Reserve two agent slots, default descendant delegation to zero, and reconcile/reap before every batch and after resume.

## Wave log

### Wave 1

- Started: <ts>
- Issues: #<n>, #<m>
- Parallel group: [#<n>, #<m>]
- Sequential tail: []
- Required reviewers: implementation-quality, documentation, ...

#### Subagent dispatches

- <ts> dispatch agent <id> for #<n> (files: [...], delegation_budget: 0)
- <ts> return agent <id> for #<n>: <one-line summary>
- <ts> predicate `scripts/verify-issue-<n>.sh`: exit 0
- <ts> commit <sha> "<commit message>"
- <ts> close agent <id>: closed | close_failed

#### Reviewer panel

- <ts> dispatch agent <id> as implementation-quality-reviewer (wave 1)
- <ts> verdict: PASS, blocking_count: 0, summary: "..."
- <ts> close reviewer agent <id>: closed | close_failed
- ...

#### Wave 1 close

- <ts> agent-pool reconciliation: <open/closed/close_failed roll-up>
- <ts> all reviewers in {PASS, PASS_WITH_NOTES, NOT_APPLICABLE}
- <ts> closed: #<n>, #<m>

### Wave 2

(repeat structure)

## Suppressed check-ins

- [CHECKIN-SUPPRESSED] <ts> Was about to ask whether to continue after wave 1; continuous mode → continued. Decision: dispatch wave 2 immediately.
- [CHECKIN-SUPPRESSED] <ts> Reviewer note about <X> seemed worth surfacing; non-structural per `_shared/reviewer-protocol.md`. Decision: recorded for final sweep, continued.

## Hard-blocks

(none, or entries with [HARD_BLOCK] prefix citing the numbered condition)

## Final closeout

- <ts> ran full predicate roll-up: N predicates, all exit 0
- <ts> ran full test suite: passed
- <ts> dispatched final reviewer panel: [...]
- <ts> verdicts: implementation-quality PASS, documentation PASS, security NOT_APPLICABLE, ...
- <ts> blocking_count sum: 0
- <ts> final agent-pool reconciliation: <all results consumed; closure roll-up>

## Closure

- <ts> parent PRD #<n> closed
- Total waves: N
- Reviewer iterations: <count>
- Predicate scripts run on close: N (all passed)
- Commits: N
- Mode transitioned to: complete

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
5. Update `STATE.json` after every event.
6. Implementers must not modify predicate scripts.

## Wave log

### Wave 1

- Started: <ts>
- Issues: #<n>, #<m>
- Parallel group: [#<n>, #<m>]
- Sequential tail: []
- Required reviewers: implementation-quality, documentation, ...

#### Subagent dispatches

- <ts> dispatch #<n> (files: [...])
- <ts> return #<n>: <one-line summary>
- <ts> predicate `scripts/verify-issue-<n>.sh`: exit 0
- <ts> commit <sha> "<commit message>"

#### Reviewer panel

- <ts> dispatch implementation-quality-reviewer (wave 1)
- <ts> verdict: PASS, blocking_count: 0, summary: "..."
- ...

#### Wave 1 close

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

## Closure

- <ts> parent PRD #<n> closed
- Total waves: N
- Reviewer iterations: <count>
- Predicate scripts run on close: N (all passed)
- Commits: N
- Mode transitioned to: complete

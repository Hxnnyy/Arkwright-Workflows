# State Files

Longflow durability relies on three files.

## tasks/CONTINUOUS_DIRECTIVE.md

Short contract for current run mode and top-level guardrails.

- Written at run start.
- Re-read every batch.
- Updated on run exit.

## tasks/STATE.json

Machine-readable state snapshot.

Must be updated after:

- subagent dispatch
- subagent return
- predicate run
- reviewer dispatch
- reviewer return
- commit
- wave transition
- hard-block fire

Core keys:

- schema_version
- mode
- status
- parent_prd
- child_issues
- current_wave
- next_action
- waves
- reviewer_verdicts
- commits
- block_reason
- started_at
- updated_at

## tasks/<date>-<slug>-execplan.md

Human-readable append-only log.

Contains:

- run header
- wave logs
- predicate outcomes
- reviewer outcomes
- [CHECKIN-SUPPRESSED] entries
- [HARD_BLOCK] entries
- final closeout evidence

## Recovery Rule

On resume:

1. Read directive.
2. Read state.
3. Read execplan tail.
4. Continue from next_action.

If directive exists but state is missing or corrupted, this is a hard block.

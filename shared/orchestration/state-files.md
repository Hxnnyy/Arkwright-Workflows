# State Files

State files make workflow execution resumable after premature stops, context compaction, harness restarts, or operator handoff.

## Machine State

Use `STATE.json` for generic workflows or a workflow-specific state file such as `MERGE_TRAIN_STATE.json`.

Required fields:

- `workflow`
- `status`
- `phase`
- `next_action`
- `current_item`
- `last_heartbeat_at`
- `block_reason`
- `updated_at`

Workflow-specific files may add fields such as current wave, current child PR, merge count, checkpoint count, reviewer matrix, or predicate rollup.

## Human Trace

Use `EXECPLAN.md` as an append-only trace for decisions, suppressed check-ins, reviewer results, hard blocks, checkpoint outcomes, and closure evidence.

## Heartbeat

Use `HEARTBEAT.md` for a short resumable pointer:

- last heartbeat
- last completed action
- current action
- next action
- stale-resume instructions

## Update Rule

Update state after every meaningful event, not just at the end of a phase. If a model stops mid-run, the next orchestrator should be able to resume from `next_action` without guessing.

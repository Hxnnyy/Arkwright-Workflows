# Continuous Mode

Continuous mode means the orchestrator keeps executing until closure or a hard block. It does not stop for routine status updates, weak uncertainty, or decisions that fall inside the configured autonomy envelope.

## Core Rules

1. Re-read `CONTINUOUS_DIRECTIVE.md`, state, execplan tail, and heartbeat at the start of every batch iteration.
2. Stop only for hard-block conditions.
3. If a non-hard-block question is about to be asked, log `CHECKIN_SUPPRESSED`, make the best defensible decision, and continue.
4. Update durable state after meaningful events: phase changes, child/wave completion, reviewer results, checkpoint results, course corrections, and hard blocks.
5. Do not reconstruct state from memory when state files exist.

## Batch Boundary Re-Read

At every batch boundary, read:

- `CONTINUOUS_DIRECTIVE.md`
- `STATE.json` or workflow-specific state file
- last 50-100 lines of `EXECPLAN.md`
- `HEARTBEAT.md`

Then continue from `next_action` unless the status is hard-blocked.

## Suppress, Decide, Continue

When uncertainty is not a hard block:

1. Add an execplan entry beginning with `CHECKIN_SUPPRESSED`.
2. Record the decision, confidence, alternatives considered, and reversible next step.
3. Update state.
4. Continue execution.

## Closure

Continuous mode ends only when:

- workflow closure criteria are met,
- a red-level hard block is reached,
- the configured retry/cycle cap requires chair or human disposition,
- the operator explicitly stops the run.

# Continuous Mode

Canonical shared guidance now lives at `../../../../shared/orchestration/continuous-mode.md`.

Continuous mode is the default execution style for long, end-to-end delivery.

## Activation

Continuous mode is active when any of the following is true:

1. The user says run to completion, no pause, until done, or equivalent.
2. tasks/CONTINUOUS_DIRECTIVE.md exists and mode is continuous.
3. Prior run state is continuous and no explicit interactive override was given.

If active, the orchestrator must write these files before dispatching subagents:

- tasks/CONTINUOUS_DIRECTIVE.md
- tasks/STATE.json
- tasks/<date>-<slug>-execplan.md

## Behavior Contract

In continuous mode:

- The orchestrator does not stop for routine progress check-ins.
- Phase transitions are logged in the execplan and execution continues.
- Final closure does not accept PASS_WITH_NOTES.
- Out-of-scope findings become follow-up issues unless they are blocking.

## Structural Re-Read Rule

At the start of every batch iteration:

1. Re-read tasks/CONTINUOUS_DIRECTIVE.md.
2. Re-read tasks/STATE.json.
3. Resume from next_action.

This is mandatory every batch, not only after compaction.

## Suppress, Decide, Continue

If the orchestrator is about to ask the user a non-hard-block question:

1. Log a [CHECKIN-SUPPRESSED] entry to the execplan.
2. Make the best defensible decision.
3. Continue execution.

## Resume Protocol

On context loss or conversation resume:

1. Read tasks/CONTINUOUS_DIRECTIVE.md.
2. Read tasks/STATE.json.
3. Read tail of execplan.
4. Continue from next_action.

Do not rebuild state from memory when state files are available.

## Exit Conditions

Continuous mode exits only when:

1. Parent PRD is fully closed under closure rules.
2. A hard-block condition fires.
3. User explicitly switches to interactive mode.

On exit, set mode in CONTINUOUS_DIRECTIVE.md to one of:

- complete
- hard_blocked
- interactive_override

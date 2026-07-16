# Continuous Mode

The canonical contract for long-running, hands-off orchestration. Referenced by all four longflow skills. Do not duplicate this contract elsewhere — link to it.

## Activation

Continuous mode is **active** when any of:

1. The user's invoking message contains an unambiguous continuous directive: "until done", "until parent closed", "no pause", "AFK", "10+ hours", "run to completion", "don't stop", "fully autonomous", "go".
2. A file `tasks/CONTINUOUS_DIRECTIVE.md` exists in the working directory with `mode: continuous`.
3. The orchestrator was previously in continuous mode and has not seen an explicit `interactive mode` instruction since.

Otherwise the skill runs in **interactive mode** with normal phase gates.

When continuous mode activates, the orchestrator MUST write `tasks/CONTINUOUS_DIRECTIVE.md` (template: `_shared/templates/CONTINUOUS_DIRECTIVE.md`) and `tasks/STATE.json` (template: `_shared/templates/STATE.json`) before any other action.

## What changes

| Behaviour | Interactive | Continuous |
|---|---|---|
| Phase gates | Ask user "Continue to Phase N+1?" | Append decision to execplan, proceed |
| Reviewer verdict surfacing | Orchestrator may surface ambiguous findings to user | Mapped to `PASS` / `BLOCKED` / `NOT_APPLICABLE` only |
| Subagent return | Surface a summary | Append to execplan, run predicate, dispatch next |
| `PASS_WITH_NOTES` at final closeout | Allowed with user check | Disallowed; mapped to `BLOCKED` |
| Off-scope work discovered | Surface for user input | Open follow-up issue, continue |
| AC ambiguity | Ask user | Hard-block (see `hard-block-conditions.md`) |
| End-of-turn check-ins | Allowed | Suppressed via execplan |

## Re-read discipline

The orchestrator MUST re-read `tasks/CONTINUOUS_DIRECTIVE.md` at the **start of every wave** and on every resume-without-context. This is a structural beat, not an event-triggered one: an event-triggered re-read assumes the agent remembers to re-read after compaction, which is the same context that just got dropped.

The orchestrator MUST update `tasks/STATE.json` on every child status change, reviewer verdict, wave transition, hard-block fire, and agent-registry transition. Agent lifecycle is durable recovery state; detailed dispatch results, predicate runs, and commits remain in the execplan.

## Suppress, don't surface

Whenever the orchestrator is about to surface a question, summary, or check-in to the user that is not a hard-block:

1. Append the would-be message to the execplan as a `[CHECKIN-SUPPRESSED]` entry with full reasoning.
2. Make the most defensible decision yourself, citing the entry in the execplan.
3. Continue.

The only legitimate path to a user prompt in continuous mode is via a hard-block firing. See `hard-block-conditions.md`.

## Resume on new turn

If the orchestrator arrives in a conversation without context (post-compaction, post-restart, post-handoff):

1. Read `tasks/CONTINUOUS_DIRECTIVE.md` in full.
2. Read `tasks/STATE.json` and resume from `next_action`.
3. Read the tail of the execplan for recent decisions.
4. Reconcile and reap `agent_pool.threads` per `_shared/agent-lifecycle.md`.
5. Resume from `next_action`; do not re-derive state from `gh issue list` or `git log` unless `STATE.json` is missing or malformed.

If `CONTINUOUS_DIRECTIVE.md` is present but `STATE.json` is missing or malformed, treat as state-corruption hard-block (condition matches `_shared/hard-block-conditions.md`).

## Exit

Continuous mode ends only when:

1. **Complete**: parent PRD is closed and all required final reviewers returned `PASS` or `NOT_APPLICABLE` with `blocking_count == 0`.
2. **Hard-block**: a condition from `hard-block-conditions.md` fired.
3. **Explicit override**: user said `interactive mode` or equivalent during the run.

On exit, mark `mode` in `CONTINUOUS_DIRECTIVE.md` as `complete` / `hard_blocked` / `interactive_override` (do not delete — it's part of the audit trail) and update `STATE.json`'s `status` to match. Then report once to the user.

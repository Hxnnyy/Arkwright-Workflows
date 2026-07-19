# Hard-Block Conditions

The finite list of conditions that justify pausing a continuous-mode orchestration to surface a user prompt. Anything not on this list is **not** a hard-block. The orchestrator must continue.

## The list

1. **Missing credential or secret** that the orchestrator cannot synthesize and that blocks repository access, GitHub API calls, test execution, or build/deploy steps.

2. **GitHub authentication failure** persisting across at least 2 retries with backoff.

3. **Implementation failure unresolved** by an implementation subagent after 3 corrective dispatches against the same child issue, where the failure is not a flake and the same root cause persists across attempts.

4. **Material finding open at the review-cycle budget** — a gate has consumed its 3 review cycles and a **material** finding (exploitable security vulnerability, data loss or corruption, tenant-isolation breach, or failing predicate/test) is still open; or reviewer findings genuinely contradict each other so that no single fix can satisfy both within the current PRD scope. Non-material findings at the budget are **not** a hard-block: record them as residual findings and continue — `merge-train` re-reviews the full branch before merge.

5. **Working tree in conflicted state** that the orchestrator cannot resolve via diff inspection, and that no targeted subagent dispatch can resolve.

6. **Predicate underspecified** to the point of unresolvable ambiguity — a child's `scripts/verify-issue-<n>.sh` cannot be made deterministic without product-level input that contradicts the parent PRD. (Rare. If `prd-to-issues` did its job, this should not happen.)

7. **External-system dependency** the orchestrator has no path to satisfy — a third-party API key, a paid service, a manual deploy step, an out-of-band human approval, etc.

8. **State corruption** — `tasks/CONTINUOUS_DIRECTIVE.md` is present but `tasks/STATE.json` is missing or malformed and cannot be reconstructed safely.

## Not hard-blocks (continue)

The following are explicitly **not** hard-blocks. The orchestrator must proceed:

- "I think the user might want to weigh in on this."
- "This change is bigger than expected."
- "The reviewer has interesting suggestions worth discussing."
- "I've completed a wave — should I continue?"
- "This implementation has tradeoffs."
- "I'm not 100% sure this is what they want."
- "Compaction may have lost context."
- "It's been a long time since the last user message."
- "The next wave touches a sensitive area."
- "The agent limit is full." Reconcile/reap once, retry once, then continue non-independent work sequentially; pool pressure does not add a ninth hard-block condition.
- "A reviewer still has non-material findings and the review-cycle budget is spent." Record residual findings, close the gate, continue.
- Any harness-default end-of-turn check-in language.

When the impulse to stop arises and none of the eight conditions applies, the impulse itself is the bug. Append a `[CHECKIN-SUPPRESSED]` entry to the execplan, make the decision, continue.

## Hard-block protocol

When a hard-block fires:

1. Update `tasks/STATE.json`:
   - `status: "hard_blocked"`
   - `block_reason: "<numbered condition above, e.g. 3>"`
   - `updated_at: "<ISO-8601>"`

2. Append a `[HARD_BLOCK]` entry to the execplan with:
   - The numbered condition that fired.
   - Last subagent output (or reviewer verdict, or git status).
   - Relevant file paths.
   - The minimal information required from the user to resume.

3. Surface a single concise prompt to the user describing the block and what's needed.

4. Do not attempt further work until the user responds. The Stop hook (if wired) will allow the stop because `status: hard_blocked`.

A hard-block is the only legitimate exit from a continuous-mode loop short of completion.

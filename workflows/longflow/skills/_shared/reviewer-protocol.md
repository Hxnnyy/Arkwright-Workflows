# Reviewer Protocol

Canonical rules for dispatching reviewers and interpreting verdicts. Reviewers are advisory-only — they inspect and report. They do not edit files.

## Reviewer roster

Canonical reviewers, by domain:

- `implementation-quality-reviewer` — code quality, type weakness, maintainability, test gaps, architecture drift, AI shortcut patterns.
- `security-reviewer` — auth, authorization, user data, APIs, RLS, storage, secrets, dependencies, trust boundaries.
- `product-design-reviewer` — UI, UX, accessibility, copy, responsive behaviour, interaction quality, visual polish.
- `performance-reviewer` — runtime, query, bundle, rendering, caching, async, scalability.
- `documentation-reviewer` — architecture, decisions, security notes, runbooks, agent context, doc drift.
- `architecture-coherence-reviewer` — duplicated abstractions, cross-module consistency, public contract drift, boundary health, structural simplification.
- `runtime-integration-reviewer` — deployment, startup, background jobs, config, runtime wiring, operational integration.
- `regression-test-reviewer` — coverage, deterministic checks, predicate integrity, missing negative paths, test-suite trustworthiness.

If the harness supports named-agent dispatch, use it. If not, load the canonical reviewer prompt from the harness's agent-prompt directory and pass it to a generic subagent task. Both paths are acceptable; the contract is the verdict, not the dispatch mechanism.

## Verdict schema

Every reviewer must return exactly this JSON shape:

```json
{
  "reviewer": "persona-or-model-alias",
  "scope": "child PR | wave gate | parent checkpoint | final closeout",
  "verdict": "PASS | PASS_WITH_NOTES | BLOCKED | NOT_APPLICABLE",
  "blocking_count": 0,
  "findings": [
    {
      "severity": "critical | high | medium | low | note",
      "blocking": true,
      "title": "short finding title",
      "evidence": ["file:line", "command output", "diff hunk", "PR link"],
      "explanation": "why this matters",
      "required_resolution": "what must change before closure"
    }
  ],
  "predicate_adequacy": "adequate | inadequate | not_applicable",
  "test_adequacy": "adequate | inadequate | not_applicable",
  "governance_flags": [],
  "residual_risks": [],
  "recommended_next_action": "continue | remediate | rerun_tests | course_correction | hard_block"
}
```

### Invariants

- `blocking_count` MUST equal the number of `findings` entries with `blocking: true`.
- `verdict == "BLOCKED"` IFF `blocking_count > 0`.
- `verdict == "PASS"` IFF `blocking_count == 0` AND `findings` is empty.
- `verdict == "PASS_WITH_NOTES"` IFF `blocking_count == 0` AND `findings` is non-empty with `blocking: false`.
- `verdict == "NOT_APPLICABLE"` IFF the reviewer's domain is genuinely not touched by the diff under review.
- `predicate_adequacy == "inadequate"` or `test_adequacy == "inadequate"` is blocking unless the scope truly has no predicates/tests to evaluate.

If a reviewer returns malformed JSON, the orchestrator re-dispatches once with an explicit "return only the schema" instruction. A second malformed return is treated as `BLOCKED` with a synthetic finding "reviewer output unparseable".
Use the same reviewer thread for that one correction when possible. Once a valid or final malformed verdict is stored, mark the result consumed and close the reviewer per `_shared/agent-lifecycle.md`.

## Wave-gate closure

A wave closes when, for every required wave reviewer:

```
verdict ∈ {PASS, PASS_WITH_NOTES, NOT_APPLICABLE}
```

`PASS_WITH_NOTES` is allowed at wave gates only for non-structural, low-risk cleanup. The orchestrator records each note in the execplan and resolves them before final closeout (or converts to a follow-up issue if genuinely out-of-scope).

If a `PASS_WITH_NOTES` finding is structural (architecture, type system, security boundary, public-API surface), the orchestrator must escalate it to `BLOCKED` and fix it within the wave.

## Final-closeout closure

The parent PRD closes when, for every required final reviewer:

```
verdict ∈ {PASS, NOT_APPLICABLE} AND blocking_count == 0
```

`PASS_WITH_NOTES` is **not accepted at final closeout**. Notes from waves must be resolved or converted to follow-up issues before the final reviewer panel runs. If a final reviewer returns `PASS_WITH_NOTES`, the orchestrator treats it as `BLOCKED` and fixes the notes.

## Iterate-on-blocked

When any reviewer returns `BLOCKED`:

1. Dispatch a corrective implementation subagent with the structured `findings` as input.
2. The implementer addresses each `severity: "blocking"` finding with a concrete change.
3. Re-run the affected predicate scripts.
4. Commit the fix referencing the originating wave or final-closeout cycle.
5. Re-dispatch the affected reviewer(s).
6. Re-run the **full wave or final panel** if the fix is cross-cutting (touches files outside the original review surface, or changes risk categories).
7. Loop until closure conditions above are met.

### Iteration cap

Cap reviewer iterations at 3 per wave per reviewer (or per final-closeout cycle per reviewer). Failure to converge after 3 iterations on the same finding category is hard-block condition 4 (`reviewer findings contradict each other`).

## No rationalising findings

The orchestrator must not rationalise away reviewer findings. If a finding is genuinely incorrect:

1. Document the rebuttal with file/line code evidence in the execplan.
2. Note the rebuttal in `STATE.json` under `reviewer_verdicts.<wave>.<reviewer>.rebuttals`.
3. Mark the finding resolved with rebuttal-acceptance.

Do not silently drop findings. The audit trail must explain every non-fix.

## Reviewer dispatch payload

Each reviewer dispatch includes:

- The canonical reviewer prompt (or named-agent dispatch).
- Parent PRD body.
- Child issues in scope (wave or final).
- Delivery Governance section.
- Standards source (`docs/DeliveryStandards.md` or equivalent).
- Commit range or file list under review.
- Test commands and results.
- Predicate run summaries (which predicates passed, exit codes).
- Explicit instruction: advisory-only, do not edit files.
- Explicit instruction: `Delegation budget: 0. Do not spawn subagents.`
- Explicit instruction: return only the verdict schema, nothing else.
- For final closeout: explicit instruction to verify the PRD from the codebase, not from implementation reports, and that `PASS_WITH_NOTES` is not accepted (mapped to `BLOCKED`).

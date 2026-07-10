---
name: merge-train
description: Rigorous pre-merge audit/remediation loop for feature branches and large PRs, with child PR slicing, parent checkpoints, and fresh-reviewer closeout.
disable-model-invocation: true
---

# Merge Train

Run Merge Train when the user wants a feature branch or parent PR reviewed before merging to `main`/`master`. The starting point may be no PR, one parent PR, existing child PRs, or a partially completed train.

## Promise

Before a feature branch is ready for human merge, drive a rigorous audit/remediation loop until fresh reviewers find no blocking correctness, structural, security, test, documentation, product, or integration issues.

## Authority

Invocation of this skill authorizes local commits, feature-branch pushes, parent PR creation or updates, child branch/PR creation, labels, comments, state files, ledgers, and risk-register updates needed for the train.

It does **not** authorize direct pushes to `main`/`master`, force-pushes, history rewrites, destructive production actions, or merging the parent PR unless the user explicitly requests that action.

## Hard rules

1. **Detect state before acting.** Inspect branch, PRs, labels, comments, train files, child PRs, checks, and merge base before deciding the next phase.
2. **Strict review is a blocker bar.** Apply `references/strict-review-bar.md` at child audit, parent checkpoints, and final closeout. Passing tests are not enough.
3. **Fresh verification is required.** The verifier must inspect code and evidence after remediation; do not accept the remediator's completion report as signoff.
4. **No child integration without no-blocker signoff.** A child may merge into the parent only after audit, remediation, deterministic checks, and fresh verification pass.
5. **Run parent checkpoints after risk triggers.** Shared abstractions, auth/security/data/schema/public APIs/background jobs/build or test config/architecture boundaries require checkpoint review.
6. **Recover rather than restart.** If train state exists, reconstruct progress and continue from the next unsafe or incomplete step.
7. **Final closeout accepts no structural notes.** Parent readiness requires no blocking findings and no unresolved structural `PASS_WITH_NOTES`.

## Phase 0: Detect start state

Read `references/start-state-detection.md`.

Classify the workspace:

- `NO_PARENT_PR`: current branch has no parent PR.
- `PARENT_ONLY`: parent PR exists but no train state or child PRs.
- `CHILDREN_EXIST`: parent and child PRs exist.
- `PARTIAL_TRAIN`: train state, ledgers, labels, or comments indicate progress.
- `FINAL_READY_CANDIDATE`: children appear merged/deferred and only final closeout remains.

Write or update `MERGE_TRAIN_STATE.json` before starting destructive or remote work.

## Phase 1: Prepare parent and slices

If no parent PR exists:

1. Identify base branch (`main` preferred, otherwise `master`).
2. Inspect diff from merge base.
3. Create or prepare the parent PR from the current feature branch.
4. Decide whether child PRs are needed using `references/child-slicing.md`.

If parent PR exists:

1. Ingest parent intent, branch state, current checks, comments, and labels.
2. Discover existing children by labels, branch names, comments, and parent references.
3. Create missing child slices only when the parent diff is too large or conceptually tangled for reliable review.

## Phase 2: Audit and remediate children

Read `references/audit-remediate-loop.md`.

For each child slice or child PR:

1. Classify risk with `references/risk-classes.md`.
2. Audit the child diff against parent intent and strict review bar.
3. Remediate blocking findings within child scope.
4. Run configured tests and predicates.
5. Dispatch a fresh verifier.
6. Iterate until no blockers remain or a hard block fires.
7. Post/update the child completion comment and child report.
8. Integrate into the parent branch according to repo policy.
9. Update parent ledger, risk register, and state.

## Phase 3: Parent checkpoints

Read `references/parent-checkpoints.md`.

Run checkpoints after configured merge counts, every high-risk child, every wave, and every high-risk surface. Checkpoints look for integration drift that individual child reviews can miss: duplicated abstractions, inconsistent contracts, loose types, global coherence breaks, and composition-level test gaps.

## Phase 4: Final closeout

Read `references/final-closeout.md`.

Run final parent reviewers only after children are merged or explicitly deferred. Required review domains:

- architecture/coherence,
- runtime/integration,
- security/data,
- regression/test,
- product/UX.

Final reviewers inspect code, ledger, risk register, checkpoint reports, deterministic checks, predicate/test rollup, and strict-review disposition. Write `FINAL_PARENT_REVIEW_PACKET.md` only when all blockers are resolved.

## Phase 5: Stabilise and hand off

Confirm ledgers, risk register, PR body, child summaries, final packet, docs, and deferred work are explicit. Report that the parent is ready for human merge; do not merge unless requested.

## Recovery

Read `references/state-recovery.md` when any state file, PR comment, label, or branch convention suggests a train is already underway. Prefer durable state, then PR evidence, then branch diffs. If evidence conflicts, choose the safest incomplete phase and rerun verification rather than assuming completion.

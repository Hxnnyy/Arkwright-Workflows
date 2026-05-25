---
name: final-parent-closeout
description: Run the Merge Train final parent review panel and produce a manual-review packet only when all blockers are resolved.
---

# Final Parent Closeout

Run after all children are merged or explicitly deferred.

## Required Reviewers

- architecture/coherence,
- runtime/integration,
- data/security,
- regression/test,
- product/UX.

## Rules

1. Reviewers inspect and report; they do not edit.
2. Every blocking finding must be remediated or hard-blocked.
3. `PASS_WITH_NOTES` is not sufficient unless config explicitly permits it and residual risk is accepted.
4. Apply `../../docs/STRICT_REVIEW_BAR.md`; obvious maintainability regressions remain blockers even when behavior checks pass.
5. Deterministic checks, tests, and predicate rollup must pass.
6. Write `FINAL_PARENT_REVIEW_PACKET.md`.

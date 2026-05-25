# Final Parent Closeout

Run final closeout after all child PRs are merged or explicitly deferred.

## Review Panel

- architecture/coherence reviewer,
- runtime/integration reviewer,
- data/security reviewer,
- regression/test reviewer,
- product/UX reviewer.

Use multiple model aliases when configured.

## Required Evidence

- current parent integration ledger,
- current risk register,
- child summaries,
- checkpoint reports,
- strict review bar disposition,
- deterministic check output,
- predicate/test rollup,
- residual risk disposition.

## Done

The parent is ready for manual review only when every required reviewer returns no blocking findings and the final manual-review packet is written.

Final closeout must not accept a parent branch that merely works while leaving obvious structural simplification, file-size sprawl, ownership-boundary leakage, ad-hoc branching, or type-contract looseness unresolved. Use `STRICT_REVIEW_BAR.md` as the approval bar.

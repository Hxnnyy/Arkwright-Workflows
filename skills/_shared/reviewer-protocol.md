# Reviewer Protocol

Reviewers are advisory. They inspect and report. They do not edit files.

## Canonical Reviewer Personas

- implementation-quality-reviewer
- documentation-reviewer
- performance-reviewer
- product-design-reviewer
- security-reviewer

## Verdict Schema

Every reviewer must return this JSON shape:

{
  "verdict": "PASS | PASS_WITH_NOTES | BLOCKED | NOT_APPLICABLE",
  "blocking_count": 0,
  "findings": [
    {
      "severity": "blocking | note",
      "category": "string",
      "evidence": "file:line",
      "description": "string",
      "recommendation": "string"
    }
  ],
  "summary": "string"
}

## Invariants

- BLOCKED iff blocking_count > 0.
- PASS iff blocking_count is 0 and findings is empty.
- PASS_WITH_NOTES iff blocking_count is 0 and findings has notes only.
- NOT_APPLICABLE only when reviewer domain is truly untouched.

## Wave Gate Rule

A wave can close when every required wave reviewer verdict is one of:

- PASS
- PASS_WITH_NOTES
- NOT_APPLICABLE

PASS_WITH_NOTES is allowed at wave gates only for non-structural cleanup.

## Final Closeout Rule

Parent PRD closes only when every required final reviewer verdict is one of:

- PASS
- NOT_APPLICABLE

PASS_WITH_NOTES is treated as BLOCKED at final closeout.

## Iterate on BLOCKED

If any reviewer returns BLOCKED:

1. Dispatch corrective implementation.
2. Re-run predicates.
3. Re-run impacted reviewers.
4. Re-run full panel if changes are cross-cutting.

Retry cap defaults to 3 per reviewer per finding category.

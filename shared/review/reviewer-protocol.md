# Reviewer Protocol

Reviewers inspect and report. They do not edit files.

## Duties

Reviewers must:

- inspect the relevant diff, state, acceptance contract, and test evidence,
- return a structured verdict,
- cite evidence for every blocking finding,
- distinguish blocking findings from notes,
- flag predicate adequacy and test adequacy issues,
- flag attempted governance changes by implementers,
- identify missing verification before closure.

## Verdicts

Allowed verdicts:

- `PASS`
- `PASS_WITH_NOTES`
- `BLOCKED`
- `NOT_APPLICABLE`

Final closeout does not accept `PASS_WITH_NOTES` unless the workflow config explicitly permits it. Structural notes at final closeout must be resolved, downgraded with chair concurrence, or recorded as explicitly accepted residual risk.

## Blocking Finding Standard

A finding is blocking when it can plausibly cause:

- unmet acceptance criteria,
- data loss or security exposure,
- broken public contract,
- production regression,
- unreviewed governance change,
- inadequate predicate/test evidence for the claim being closed,
- material incoherence across merged work.

## Freshness

Verification after remediation must be performed by a fresh reviewer or by the configured verifier role. The remediator cannot self-certify closure of blocking findings.

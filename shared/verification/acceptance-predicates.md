# Acceptance Predicates

Deterministic predicates are evidence floors, not quality ceilings. A predicate pass is required for closure, but it is not sufficient by itself.

## Authorship

Predicates should be authored before implementation where possible, normally during issue slicing or workflow setup. Implementers must not modify predicates unilaterally.

If a predicate is inadequate or misaligned, raise an amber-level course correction and strengthen the contract before closure.

## Closure Rule

Closure requires:

- all required predicates pass,
- relevant tests pass,
- predicate adequacy review is acceptable,
- test adequacy review is acceptable,
- configured reviewers report no blocking findings.

## Reward-Hacking Risks

Reviewers must watch for:

- deleting or weakening tests,
- satisfying grep checks without real behavior,
- mock-only correctness,
- broad `try/catch` masking,
- config changes that reduce coverage,
- overfitting to expected output,
- bypassing real integration paths.

## Implementer Guardrail

Predicate scripts are contracts. If an implementer changes one, reject the diff unless an amber-level governance decision explicitly approved the change.

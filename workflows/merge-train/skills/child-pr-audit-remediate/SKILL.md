---
name: child-pr-audit-remediate
description: Audit and remediate a Merge Train child PR against its own diff and the parent intent, then prepare it for fresh verifier signoff.
---

# Child PR Audit Remediate

## Inputs

- parent intent,
- parent branch,
- child PR URL/branch,
- child diff,
- configured test and predicate commands,
- risk class.

## Duties

1. Inspect the child diff and parent intent.
2. Apply `../../docs/STRICT_REVIEW_BAR.md` before accepting the implementation shape.
3. Identify blocking findings with evidence.
4. Remediate findings within child scope.
5. Run relevant tests and predicates.
6. Produce `CHILD_PR_REPORT.md`.
7. Hand off to a fresh verifier.

High-risk children require separate auditor, remediator, and verifier roles. Critical children hard-block unless config permits autonomous handling and required signoff is recorded.

Structural regressions are in scope for child remediation. Do not downgrade them because behavior tests pass when the diff adds avoidable large-file sprawl, ad-hoc branching, loose type boundaries, duplicate helpers, or feature logic in the wrong ownership layer.

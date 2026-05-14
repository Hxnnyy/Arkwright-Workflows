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
2. Identify blocking findings with evidence.
3. Remediate findings within child scope.
4. Run relevant tests and predicates.
5. Produce `CHILD_PR_REPORT.md`.
6. Hand off to a fresh verifier.

High-risk children require separate auditor, remediator, and verifier roles. Critical children hard-block unless config permits autonomous handling and required signoff is recorded.

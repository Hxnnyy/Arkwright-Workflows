---
name: parent-integration-checkpoint
description: Review the parent branch after Merge Train child merges for global coherence, integration drift, accumulated risk, and composition-level test gaps.
---

# Parent Integration Checkpoint

Checkpoint reviewers inspect the parent branch after configured merge triggers. They do not perform a full final rereview of every child.

## Focus Areas

- global coherence,
- duplicated abstractions,
- inconsistent error handling,
- public contract drift,
- child PRs solving the same concept differently,
- schema/API/auth/security integration,
- composition-level test gaps,
- files touched by multiple children,
- accumulated residual risk.

Apply `../../docs/STRICT_REVIEW_BAR.md` to the integrated parent branch. Escalate complexity that emerges across children, including duplicated abstractions, scattered special cases, files pushed past healthy size boundaries, type-boundary churn, and non-atomic orchestration.

## Output

Write `PARENT_CHECKPOINT_REPORT.md` under `CHECKPOINTS/` and update the parent ledger and risk register.

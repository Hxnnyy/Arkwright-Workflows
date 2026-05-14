# Acceptance Predicates

Canonical shared guidance now lives at `../../../../shared/verification/acceptance-predicates.md`.

Each child issue must have a deterministic acceptance predicate script. Predicate pass is an evidence floor, not a quality ceiling; closure also requires test evidence, predicate adequacy review, and no-blocking reviewer judgment.

## Why

Natural-language acceptance criteria are too easy to misinterpret. Predicate scripts make closure verifiable.

## Authorship Rule

Predicates are authored during PRD-to-issues slicing, not by implementation agents.

If acceptance cannot be translated into deterministic checks, the acceptance criteria are underspecified and must be fixed before implementation.

## Script Location

Use one script per issue, for example:

- scripts/verify-issue-<issue-number>.sh
- scripts/verify-issue-<issue-number>.ps1
- scripts/verify-issue-<issue-number>.mjs

Pick one format that matches the target repo execution environment.

## Allowed Check Types

- failing test turns green
- grep zero pattern
- file exists or file content assertion
- type compilation check
- custom domain check script
- invariant diff check
- endpoint probe

## Implementer Guardrail

Implementation agents receive predicate scripts as contracts and must not modify them unilaterally.

If implementer output changes predicate scripts, reject the diff and reroute work.

## Final Rollup

Before parent closeout, run all issue predicates. All must pass.

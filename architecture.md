# Architecture

Arkwright Workflows is organized as a workflow-pack repository.

## Boundaries

- Root docs explain the product identity, workflow choice, migration notes, and validation commands.
- `workflows/<name>/` contains self-contained workflow packs with README, docs, skills, examples, templates, and config.
- `shared/` contains canonical orchestration, review, verification, and template primitives reused across workflows.
- `scripts/` contains workflow-aware utilities that operate on workflow config files and repository docs.

## Current Workflow Packs

- `workflows/longflow/`: planned delivery from rough intent to PRD, child issues, implementation waves, final closeout, and stabilisation.
- `workflows/merge-train/`: large parent PR/branch audit, child PR remediation, parent integration checkpoints, and final manual-review readiness. Merge Train owns a workflow-local strict review bar for structural maintainability checks that are stronger than the shared reviewer baseline.

## Shared Primitives

Shared primitives intentionally stay small and protocol-oriented. Workflow packs reference them rather than duplicating the same rules in full. This keeps continuous mode, hard blocks, heartbeat recovery, reviewer semantics, predicate/test adequacy, autonomy envelope, and course-correction behavior consistent.

## Scripts

`scripts/validate-config.mjs` detects Longflow and Merge Train config shapes. `scripts/generate-kickoff-prompt.mjs` emits workflow-specific kickoff prompts. `scripts/validate-markdown-links.mjs` provides lightweight path/link validation for docs-heavy changes.

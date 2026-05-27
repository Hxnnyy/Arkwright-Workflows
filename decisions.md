# Decisions

## 2026-05-14: Convert to Workflow-Pack Repository

Decision: reposition the repository from Arkwright Longflow to Arkwright Workflows, with Longflow as `workflows/longflow` and Merge Train as `workflows/merge-train`.

Rationale: the repository now contains more than one agentic delivery protocol. A workflow-pack layout lets each workflow be self-contained while sharing governance primitives.

## 2026-05-14: Canonical Shared Primitives Live Under `shared/`

Decision: shared orchestration, review, verification, and template docs live under `shared/`.

Rationale: Longflow and Merge Train both need continuous mode, durable state, heartbeat recovery, reviewer protocols, predicate/test adequacy, and autonomy governance. Centralizing these rules avoids drift.

## 2026-05-14: Keep Longflow Compatibility References

Decision: preserve Longflow's local `skills/_shared` folder while adding references to canonical shared docs.

Rationale: existing harness registrations may expect those local paths. The new canonical location can be adopted without breaking every old reference at once.

## 2026-05-14: Workflow-Aware Scripts Instead of Separate Script Families

Decision: keep script names stable and make them workflow-aware.

Rationale: `npm run validate:config` and `npm run prompt:kickoff` remain simple operator commands while supporting both current workflow packs.

## 2026-05-25: Merge Train Gets a Workflow-Local Strict Review Bar

Decision: add `workflows/merge-train/docs/STRICT_REVIEW_BAR.md` and reference it from child audits, parent checkpoints, final closeout, handover, and report templates.

Rationale: Merge Train handles large parent branches where ordinary correctness review is insufficient. The stricter bar makes maintainability regressions, large-file sprawl, ad-hoc branching, weak type boundaries, misplaced logic, and missed structural simplifications explicit blockers unless accepted as residual risk.

## 2026-05-27: Repository Becomes Canonical Skill Source

Decision: keep Arkwright workflow skills canonical in this repository and export them into `~/.agents/skills/arkwright-workflows` for harness discovery.

Rationale: `.agents` is not a git repository, so direct installed-skill edits drift without review history. Repo-first iteration gives workflow changes normal diff, validation, and rollback behavior while still keeping Codex, Claude Code, and Gemini pointed at the same installed skill group.

## 2026-05-27: Merge Train Uses One Public Skill

Decision: collapse Merge Train helper skills into one public `merge-train` skill with internal references and templates.

Rationale: users invoke Merge Train by intent and may start from no PR, an existing parent PR, existing children, or a partial train. One entry point can detect state and continue correctly; helper skills created unnecessary discovery ambiguity for phases that are rarely invoked directly.

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

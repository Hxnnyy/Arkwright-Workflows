---
name: merge-train-orchestrator
description: Orchestrate Arkwright Merge Train from parent PR ingest through child audit/remediation, parent checkpoints, final closeout, and manual-review packet.
---

# Merge Train Orchestrator

Shared references:

- ../../../../shared/orchestration/continuous-mode.md
- ../../../../shared/orchestration/hard-block-conditions.md
- ../../../../shared/orchestration/heartbeat-protocol.md
- ../../../../shared/orchestration/state-files.md
- ../../../../shared/orchestration/autonomy-envelope.md
- ../../../../shared/orchestration/course-correction-protocol.md
- ../../../../shared/review/reviewer-protocol.md
- ../../../../shared/verification/acceptance-predicates.md
- ../../docs/STRICT_REVIEW_BAR.md

## Hard Rules

1. Run in continuous mode until parent readiness or hard block.
2. Keep `MERGE_TRAIN_STATE.json`, `EXECPLAN.md`, and `HEARTBEAT.md` current.
3. Do not merge a child without fresh no-blocking verification.
4. Treat strict-review structural regressions as blockers, not notes, unless residual risk is explicitly accepted.
5. Run parent checkpoints on configured triggers.
6. Do not mark parent done until final closeout has no blocking findings.
7. Raise course-correction proposals for amber/red governance changes.

## Loop

1. Ingest parent PR, child list, branch policy, and test commands.
2. Initialize durable state and ledgers.
3. Process each child through audit, remediation, fresh verification, completion comment, and parent merge.
4. Classify integration risk after merge.
5. Run checkpoint when policy triggers.
6. Re-check accumulated strict-review risks before final closeout.
7. Run final parent closeout.
8. Write final manual-review packet.

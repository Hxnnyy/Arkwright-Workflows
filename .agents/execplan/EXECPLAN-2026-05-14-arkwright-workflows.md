---
name: execplan
description: Use for long-horizon or multi-hour work that needs durable planning, context tracking, and verification.
---

# Active

Task: Rework Arkwright Longflow into Arkwright Workflows.

Plan:
1. Inspect existing structure and instructions.
2. Rehome current Longflow assets into `workflows/longflow`.
3. Extract shared orchestration, review, verification, and templates.
4. Add self-contained Merge Train workflow pack.
5. Update root docs, package metadata, scripts, examples, and validation.
6. Run available validation and fix coherence issues.

Progress:
- Existing repo was compact and git-clean at start.
- Longflow folders and configs moved under `workflows/longflow`.
- Initial shared primitives copied into `shared`.

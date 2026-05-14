# Arkwright Workflows

Protocolised agentic delivery workflows for implementation, review, remediation, and closure.

Arkwright Workflows is a workflow-pack repository for robust AI-agent software delivery. It contains multiple self-contained workflows that share common orchestration primitives: continuous execution, durable state, reviewer protocols, deterministic predicates, heartbeat recovery, and explicit governance for when agents may decide, propose, or stop.

## Which Workflow Should I Use?

Use **Arkwright Longflow** when you are starting from rough intent or planned feature delivery. Longflow takes an idea through grilling, council convergence, PRD authoring, issue slicing, implementation waves, wave gates, final closeout, and stabilisation.

Use **Arkwright Merge Train** when you are auditing and remediating a monster branch or PR, especially when many child PRs must be signed off and merged into a parent branch with rolling integration checkpoints.

## Workflows

- [Longflow](workflows/longflow/README.md): planned implementation workflow for converting intent into shipped, audited work.
- [Merge Train](workflows/merge-train/README.md): large-PR audit, remediation, child-merge, and parent-closeout workflow.

Each workflow folder is self-contained. It includes its own README, skills, examples, templates, and config example. Workflows may reference shared protocol primitives in `shared/`, but users should not need to reconstruct a workflow from root-level docs.

## Shared Protocol Primitives

- [Continuous mode](shared/orchestration/continuous-mode.md)
- [Hard-block conditions](shared/orchestration/hard-block-conditions.md)
- [Heartbeat protocol](shared/orchestration/heartbeat-protocol.md)
- [State files](shared/orchestration/state-files.md)
- [Autonomy envelope](shared/orchestration/autonomy-envelope.md)
- [Course-correction protocol](shared/orchestration/course-correction-protocol.md)
- [Reviewer protocol](shared/review/reviewer-protocol.md)
- [Reviewer personas](shared/review/reviewer-personas.md)
- [Verdict schema](shared/review/verdict-schema.md)
- [Acceptance predicates](shared/verification/acceptance-predicates.md)
- [Predicate adequacy review](shared/verification/predicate-adequacy-review.md)
- [Test adequacy review](shared/verification/test-adequacy-review.md)

## Quick Start

1. Choose a workflow.
2. Copy that workflow's config example.
3. Edit model aliases, harness settings, branch policy, and test/predicate commands.
4. Install or point your coding harness at the workflow skills.
5. Start from the workflow README and keep the shared continuous directive, state, execplan, and heartbeat files current during execution.

Examples:

```powershell
Copy-Item workflows\longflow\longflow.config.example.json workflows\longflow\longflow.config.json
npm run validate:config -- workflows\longflow\longflow.config.json
npm run prompt:kickoff -- workflows\longflow\longflow.config.json
```

```powershell
Copy-Item workflows\merge-train\merge-train.config.example.json workflows\merge-train\merge-train.config.json
npm run validate:config -- workflows\merge-train\merge-train.config.json
npm run prompt:kickoff -- workflows\merge-train\merge-train.config.json
```

## Repository Layout

- `workflows/longflow/`: Arkwright Longflow workflow pack.
- `workflows/merge-train/`: Arkwright Merge Train workflow pack.
- `shared/`: reusable orchestration, review, verification, and state templates.
- `scripts/`: workflow-aware validation, kickoff prompt generation, and optional heartbeat watching.
- `examples/`: root-level workflow selection examples.

## Migration Notes

This repository was formerly a single-workflow project named **Arkwright Longflow**. It is now **Arkwright Workflows**, a workflow-pack repository. The original Longflow framework remains available as `workflows/longflow/` and keeps the Arkwright Longflow brand inside that workflow folder.

Config paths changed from root-level `longflow.config.json` to workflow-local config files such as `workflows/longflow/longflow.config.json`. Shared contracts formerly under `skills/_shared/` are now canonical under `shared/`; Longflow keeps local compatibility references where useful.

## Validation

```powershell
npm run validate:config -- workflows\longflow\longflow.config.example.json
npm run validate:config -- workflows\merge-train\merge-train.config.example.json
npm run validate:links
```

## License

MIT

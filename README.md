# Arkwright Longflow

Arkwright Longflow is an opinionated, skill-driven delivery framework for non-technical operators who want robust software outcomes from AI coding agents.

It combines:

- Decision stress testing
- Multi-model council convergence
- PRD authoring
- Issue slicing with deterministic predicates
- Continuous execution with hard-stop guardrails
- Structured wave and final audits

Longflow is based on longflow2 patterns, with explicit council stages and model/persona routing from real Phase 7 delivery practice.

## Why This Works

1. Ambiguity is removed early through structured grilling.
2. Plan quality is stress-tested by independent model reviewers before coding starts.
3. Delivery contracts become executable via per-issue predicate scripts.
4. Continuous orchestration preserves momentum while limiting random check-in pauses.
5. Closure is evidence-based, not vibe-based.

## End-to-End Flow

1. Run grill-me to turn rough intent into a proposal.
2. Human review pass: fix intent mismatches before any council run.
3. Run council Stage A until no unresolved Critical, High, or Medium disagreements.
4. Run council Stage B across role personas until no unresolved Critical, High, or Medium disagreements.
5. Run write-a-prd on the converged plan.
6. Run prd-to-issues to produce child issues, wave plan, and predicates.
7. Run issues-execution in continuous mode.
8. Enforce wave-gate reviews after each wave.
9. Enforce final closeout audits across required models and personas.
10. Close parent PRD only when all closure rules pass.

## Opinionated Defaults Included

All routing references **provider aliases**, not pinned versions — when frontier models roll, edit `modelAliases` in one place.

- Orchestrator: `frontier-openai-orchestrator` with high deliberation prompting.
- Council chair: `frontier-oss` — drawn from a lab not represented in the voting set, so tie-breaks and severity-downgrade sign-offs are not subject to intra-lab homogenization. The chair does not vote.
- Council Stage A voting members: `frontier-anthropic-strong`, `frontier-openai`, `frontier-google`, `frontier-xai`.
- Council Stage B voting members: `frontier-anthropic-fast`, `frontier-openai`, `frontier-google`, `frontier-xai`.
- Stage B persona routing: per PRD type (frontend / backend / data / infra / fullstack), not always-all-five. Exclusions require chair sign-off.
- Convergence: explicit per-finding disposition, severity-downgrade sign-off by chair, hard cycle cap (default 5) with chair force-disposition fallback.
- Final closeout reviewer models: `frontier-openai`, `frontier-anthropic-fast`, `frontier-google`. All five personas always run at final closeout.
- Frontend-heavy issue lead routing: `frontier-anthropic-fast`.
- Backend/docs/security-heavy issue lead routing: `frontier-openai-code`.

Everything above is configurable in longflow.config.json.

## Non-Technical Quick Start

1. Copy longflow.config.example.json to longflow.config.json.
2. Edit model names and harness names to match your subscriptions/tools.
3. Install these skills in your coding harness skill directory.
4. Start with grill-me and describe your goal in plain language.
5. Follow the flow in docs/FLOW_STEPS.md.

If your harness supports named agents, keep the default reviewer persona names. If it does not, use prompt templates in examples/prompts and run equivalent generic subagent tasks.

## Repository Layout

- skills/: all longflow skills.
- skills/_shared/: shared contracts used by multiple skills.
- skills/_shared/templates/: reusable file templates.
- docs/: operator documentation and guidelines.
- scripts/: small helper scripts for config and kickoff prompt generation.
- examples/: example config and prompt payloads.

## Configuration

- Main config file: longflow.config.json.
- Validate config: npm run validate:config -- ./longflow.config.json
- Generate kickoff prompt: npm run prompt:kickoff -- ./longflow.config.json

## Guardrails

Longflow assumes these defaults unless you override them:

- Use a fresh branch and fresh worktree for major implementation runs.
- Do not mutate protected environments used for demos while implementation is in flight.
- Do not pause continuous mode except for explicit hard-block conditions.
- Do not close issues without predicate pass.
- Do not close parent PRD without required final audit pass set.

## Provenance

The opinionated council and closeout rules in this repo were extracted from an end-to-end Phase 7 architecture and delivery cycle, including:

- Multi-stage council convergence
- Persona matrix auditing
- Model routing by issue class
- Continuous execution and hard-block-only pauses
- Final 15-pass persona-model closure gate

See docs/PHASE7_PROVENANCE.md for the capture summary.

## License

MIT

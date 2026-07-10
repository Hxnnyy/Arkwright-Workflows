# Model Routing

Model routing is configured in `workflows/longflow/longflow.config.json`.

## Aliases, Not Versions

All routing references **aliases** (e.g. `frontier-anthropic-fast`), not physical model names (e.g. `Claude Sonnet 4.6`). The alias→physical mapping lives in one place: `modelAliases` in the config.

When a frontier model is superseded, update `modelAliases` only — every routing rule resolves to the new version automatically.

Standard aliases:

- `frontier-anthropic-strong` — Anthropic's strongest reasoning model (council Stage A heavyweight).
- `frontier-anthropic-fast` — Anthropic's fast frontier (lead implementer for frontend, reviewer panels).
- `frontier-openai-orchestrator` — OpenAI's orchestrator-grade model (high reasoning).
- `frontier-openai` — OpenAI's general frontier (council, reviewer panels).
- `frontier-openai-code` — OpenAI's implementer-grade frontier (lead implementer for backend/security/docs). The GPT-5.6 line has no code-specialised variant, so this currently resolves to the same model as `frontier-openai`; the alias stays separate so a future code model is a one-line bump.
- `frontier-google` — Google's frontier (council, reviewer panels).
- `frontier-xai` — xAI's frontier (council fourth voice).
- `frontier-oss` — strongest available open-source model (council chair, lab-independent).

## Council Chair

`models.councilChair.alias` resolves to a model from a lab not represented in the voting set. Default: `frontier-oss`. The chair is responsible for tie-breaks, severity-downgrade sign-off, and force-disposition at cycle cap. It does not vote.

## Default Lead Routing

- frontend: `frontier-anthropic-fast`
- backend: `frontier-openai-code`
- security: `frontier-openai-code`
- docs: `frontier-openai-code`

## Default Issue Review Routing

- frontend reviewers: `frontier-google`, `frontier-openai-code`
- backend / security / docs reviewers: `frontier-openai`, `frontier-anthropic-fast`

## Default Wave-Gate Panel

- `frontier-openai`
- `frontier-anthropic-fast`
- `frontier-google`

## Default Final Closeout Set

Models:

- `frontier-openai`
- `frontier-anthropic-fast`
- `frontier-google`

Personas (always all five at final closeout — this is the last gate, not a per-cycle loop):

- implementation-quality-reviewer
- documentation-reviewer
- performance-reviewer
- product-design-reviewer
- security-reviewer

Assignment: each persona runs **exactly once**, distributed round-robin across the closeout models so every lab audits at least one domain. Total default final audits: 5.

Escalation: if a final audit returns `BLOCKED`, re-run that persona on a different closeout model after remediation. Use the full persona x model cross-product (15 audits) only when the PRD carries elevated risk tags (`security`, `data`, migration/irreversible change).

## Persona Routing for Stage B

Stage B persona selection is per PRD type via `routing.personasByPrdType`:

- `frontend` — implementation-quality, product-design, performance
- `backend` — implementation-quality, performance, security, documentation
- `data` — implementation-quality, security, performance
- `infra` — security, performance, documentation
- `fullstack` — all five
- `default` — all five (safety floor for unknown PRD types)

A PRD may explicitly include or exclude personas; exclusions require chair sign-off. Final closeout always uses all five regardless of PRD type.

## Fallback Rules

If a configured alias resolves to an unavailable physical model:

1. Use the designated backup from config if present.
2. If no backup is configured, stop at hard block for model substitution approval.
3. Record substitution rationale in execplan.

## Routing Integrity Rule

Do not silently swap lead or reviewer routing. All substitutions must be explicit, logged, and reviewable. Updating `modelAliases` for a frontier-version bump is not a substitution and does not require approval.

# Reviewer Personas

Workflows may route reviewers by model and persona. These personas are shared defaults.

- `implementation-quality-reviewer`: correctness, maintainability, code structure, error handling, and integration fit.
- `documentation-reviewer`: operator docs, runbooks, setup instructions, and migration notes.
- `performance-reviewer`: latency, resource usage, scaling behavior, and avoidable inefficiency.
- `product-design-reviewer`: user-facing behavior, UX coherence, accessibility, and product semantics.
- `security-reviewer`: auth, data access, secrets, policy boundaries, migration safety, and abuse cases.
- `architecture-coherence-reviewer`: duplicated abstractions, cross-module consistency, public contract drift, and boundary health.
- `runtime-integration-reviewer`: deployment, startup, background jobs, config, and runtime wiring.
- `regression-test-reviewer`: coverage, deterministic checks, test integrity, and missing negative paths.

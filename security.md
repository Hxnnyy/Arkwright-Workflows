# Security

Arkwright Workflows is documentation and orchestration tooling. It does not require secrets by default.

## Repository Rules

- Do not commit `.env*` files or service-role secrets.
- Do not embed provider API keys in workflow configs.
- Keep model aliases and harness names in config; keep credentials in the target harness or environment.
- Treat branch pushes, PR merges, destructive migrations, and production environment changes as governed actions.

## Workflow Security

Shared hard-block rules require owner signoff for security-model changes, irreversible migrations, data-loss risk, missing credentials, and destructive actions.

Merge Train marks auth, security, data/schema, migrations, public APIs, background jobs, shared abstractions, build config, test config, and architecture boundaries as high-risk checkpoint triggers.

Reviewers must flag attempted governance changes, weakened predicates/tests, and security-relevant residual risks.

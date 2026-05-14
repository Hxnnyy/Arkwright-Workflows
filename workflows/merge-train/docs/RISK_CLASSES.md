# Merge Train Risk Classes

## Low

Examples:

- docs-only changes,
- isolated UI copy,
- narrow non-runtime cleanup.

Handling:

- combined audit and remediation is acceptable,
- one fresh verifier is acceptable,
- parent checkpoint usually not required unless batch policy triggers it.

## Medium

Examples:

- normal feature slice,
- localized behavior change,
- bounded frontend or backend change.

Handling:

- audit and remediation may be combined,
- verifier must be separate,
- checkpoint follows normal batch policy.

## High

Examples:

- auth,
- security,
- data/schema,
- public API,
- background jobs,
- shared abstractions,
- build/test config.

Handling:

- separate auditor, remediator, and verifier required,
- parent checkpoint after merge required.

## Critical

Examples:

- potential data loss,
- security model change,
- irreversible migration,
- public contract break.

Handling:

- hard block or human signoff unless config explicitly permits autonomous handling.

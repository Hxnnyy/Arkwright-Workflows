# Parent Integration Checkpoints

Parent checkpoints are rolling integration reviews. They are not full final re-reviews of every child PR.

## Focus

Checkpoint reviewers inspect:

- global coherence,
- duplicated abstractions,
- inconsistent error handling,
- public contract drift,
- child PRs solving the same concept differently,
- schema/API/auth/security integration,
- test coverage gaps introduced by composition,
- files touched by multiple child PRs,
- residual risks accumulating across children.

## Triggers

Run a checkpoint:

- after every configured N child merges,
- after every wave,
- after any high-risk child,
- when shared abstractions are touched,
- when auth, security, database/schema, migrations, public APIs, background jobs, tests/config, or architecture boundaries are touched.

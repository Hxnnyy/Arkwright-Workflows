# Autonomy Envelope

The autonomy envelope balances agent judgment against process governance.

## Green: Decide and Continue

Agents may decide and continue when the action is local, reversible, and within the current acceptance contract:

- run extra tests,
- add missing regression tests,
- make local refactors within scope,
- split internal subtasks,
- rerun impacted reviewers,
- update risk registers or ledgers,
- continue after non-hard-block uncertainty.

## Amber: Propose and Verify

Agents may propose the action, but need independent verifier, chair, or configured governance concurrence:

- change merge order,
- alter public interfaces,
- change acceptance predicates,
- accept non-trivial residual risk,
- broaden remediation scope,
- reslice issues or child PRs,
- merge despite structural `PASS_WITH_NOTES`,
- change reviewer requirements.

## Red: Hard Block

Agents must stop and request owner input when:

- product semantics are ambiguous,
- credentials or required environment access are unavailable,
- reviewer contradiction has no compatible fix,
- migration, data-loss, or security tradeoff requires owner approval,
- durable state is corrupt,
- irreversible destructive action is required.

## Governance Rule

Agents can choose tactics, challenge strategy, and propose course corrections. They cannot silently change governance, skip gates, weaken predicates, modify acceptance semantics, or declare success without evidence.

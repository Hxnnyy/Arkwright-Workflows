# Council Protocol

Council is a two-stage convergence loop with a designated chair model independent of the voting members.

## Roles

- **Voting members**: the models listed in `models.councilStageA` / `models.councilStageB`. Each casts independent findings and dispositions.
- **Chair**: the model listed in `models.councilChair`. The chair is *not* a voting member. It is responsible for:
  - tie-breaks
  - severity-downgrade sign-off
  - force-disposition at cycle cap
  - ballot integrity (catching gaming patterns like quiet downgrades)

The chair is deliberately drawn from a different lab than any voting member to prevent intra-lab homogenization on close calls.

## Stage A: Model-Level Convergence

- Run one review pass per model with no persona split.
- Collect findings; classify each as objective contradiction, tradeoff, or preference.
- Apply per-finding disposition (see Disposition Rules below).
- Repeat Stage A until convergence criteria are met or the cycle cap is hit.

## Stage B: Persona-Level Convergence

- Determine the persona set from `routing.personasByPrdType[prdType]`, defaulting to `routing.personasByPrdType.default` if the type is unknown.
- A PRD may explicitly include or exclude specific personas. Exclusions require chair sign-off with rationale logged in the ballot table.
- For each configured Stage B model, dispatch the selected personas only.
- Build the persona-model matrix and apply dispositions as for Stage A.
- Repeat Stage B until convergence criteria are met or the cycle cap is hit.

## Disposition Rules

Findings do not need to vanish to converge. Each open finding gets exactly one disposition per cycle:

- `accept` — folded into the proposal vNext edit set.
- `reject` — explicitly dismissed; chair rationale required.
- `defer` — out of scope for this PRD; owner and target wave required.
- `accepted-as-residual-risk` — acknowledged and tracked; chair sign-off required, surfaced in residual-risk list.

A finding marked `accepted-as-residual-risk` does not block exit.

## Severity Stability

Each finding's severity is tracked across cycles. Any downgrade between cycles (Critical→High, High→Medium, Medium→Low) requires:

1. Chair sign-off recorded in the ballot table.
2. Logged rationale referencing the new evidence or argument that justifies the change.

This guards against the failure mode where findings get quietly demoted to Low to escape the loop.

## Convergence Exit Criteria

A stage exits a cycle as **converged** when all of the following hold:

1. Open Criticals = `convergence.openCriticalsAllowed` (default 0).
2. Every finding at the severities listed in `convergence.requireDispositionForSeverity` (default High and Medium) has an explicit disposition.
3. New findings of severity ≥ Medium introduced in this cycle ≤ `convergence.maxNewMediumOrAboveFindingsPerCycleToExit` (default 2). This is the "council has stopped finding new things" signal.

## Cycle Caps

Each stage has a hard cap (`convergence.stageAMaxCycles`, `convergence.stageBMaxCycles`, default 5).

If the cap is reached without convergence, the chair executes `convergence.atCapAction` (default `chair-force-disposition-and-escalate`):

1. Chair force-dispositions all remaining open findings with logged rationale.
2. Items the chair cannot confidently resolve are flagged as `escalate` and surfaced to the user before handoff.

The cap is a safety net against runaway token spend, not a normal exit path. If the cap fires routinely, the proposal is too unstable for council and should be returned to grill-me.

## Tie-Break Rule

When voting members split and no hard contradiction exists:

1. Chair applies a deterministic tie-break.
2. Tie-break rationale is logged.
3. Decision is recorded in the ballot table with `chair-tiebreak: true`.

## Required Outputs Per Cycle

- Findings table sorted by severity, with severity-history column showing prior cycles.
- Conflict matrix with category classification.
- Ballot table with disposition for each open finding.
- Severity-downgrade log (empty if no downgrades occurred).
- Minimal accepted edit set for next proposal version.
- Explicit residual-risk list (every `accepted-as-residual-risk` finding).
- Convergence status: `converged` | `not-converged` | `cap-reached-chair-resolved`.

## Deliberation Directive

Each council dispatch should include a high-deliberation instruction:

- take your time
- attempt to falsify your own conclusions
- prefer fewer stronger findings
- avoid speculative architecture replacement unless required

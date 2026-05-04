# Council Runbook

Use this runbook with the council skill.

## Purpose

Run repeatable, adversarial, evidence-based plan reviews that converge before implementation, with a lab-independent chair, per-PRD persona routing, and bounded cycle costs.

## Roles

- **Voting members** — `models.councilStageA` / `models.councilStageB`. Independent reviews, no chair role.
- **Chair** — `models.councilChair` (default `frontier-oss`). Drawn from a lab unrepresented in the voting set. Owns tie-breaks, severity-downgrade sign-off, and force-disposition at cycle cap.

## Completion Rule

Council is complete when both stages report `converged` or `cap-reached-chair-resolved` with no open `escalate` items still pending user input.

A finding does not need to vanish to count as resolved — it needs an explicit disposition (`accept` / `reject` / `defer` / `accepted-as-residual-risk`).

## Stage A Checklist

1. Freeze proposal version.
2. Freeze review packet for the cycle.
3. Dispatch one model-level review per configured Stage A voting member.
4. Build conflict matrix.
5. Run ballot — every open finding gets a disposition.
6. Apply minimal accepted edits.
7. Compare severity per finding against last cycle; chair signs off any downgrades.
8. Re-run Stage A until convergence or cap.

## Stage B Checklist

1. Start only after Stage A convergence (or chair-resolved cap).
2. Resolve persona set from `routing.personasByPrdType[prdType]` (default = all five).
3. PRD-declared persona inclusions/exclusions apply; exclusions need chair sign-off.
4. For each configured Stage B voting member, run the selected personas.
5. Build persona-model matrix.
6. Run ballot; apply dispositions.
7. Severity-downgrade sign-off as in Stage A.
8. Re-run Stage B until convergence or cap.

## Convergence Exit Criteria

A cycle exits as `converged` when all hold:

- Open Criticals = `convergence.openCriticalsAllowed` (default 0).
- Every High and Medium has an explicit disposition.
- New ≥Medium findings introduced this cycle ≤ `convergence.maxNewMediumOrAboveFindingsPerCycleToExit` (default 2).

## Cycle Caps

`convergence.stageAMaxCycles` and `convergence.stageBMaxCycles` (default 5 each) are hard ceilings. Hitting the cap triggers `convergence.atCapAction` (default `chair-force-disposition-and-escalate`):

1. Chair force-dispositions remaining open findings with logged rationale.
2. Items the chair cannot confidently resolve are flagged `escalate` and surfaced to the user.

The cap is a safety net, not the expected exit path. If it fires routinely, return to grill-me.

## Ballot Rules

- Every open finding gets exactly one disposition each cycle: `accept`, `reject`, `defer`, `accepted-as-residual-risk`.
- `reject`, `accepted-as-residual-risk`, and any chair tie-break require logged rationale.
- `defer` requires owner and target wave.
- `accepted-as-residual-risk` items must appear in the residual-risk list.

## Severity Stability Rule

For each finding tracked across cycles, any severity downgrade (Critical→High, High→Medium, Medium→Low) requires:

1. Chair sign-off recorded in the ballot table.
2. Rationale referencing the new evidence or argument that justifies the change.

Each cycle outputs a downgrade log; an empty log is the expected case.

## Output Package

Each cycle should produce:

- findings table (with severity-history column)
- conflict matrix
- ballot table
- severity-downgrade log
- vNext delta list
- residual-risk list
- convergence status

## Transition to PRD

Only after both stages report `converged` or chair-resolved cap with no open escalations:

1. Freeze proposal version.
2. Freeze council packet version.
3. Hand off to write-a-prd.

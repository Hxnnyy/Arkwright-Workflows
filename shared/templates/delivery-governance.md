## Delivery Governance

### Repo standards

- **Status**: ESTABLISHED | PARTIAL | MISSING
- **Source**: `docs/DeliveryStandards.md` (or repo equivalent)
- **Bootstrap commit**: <sha or n/a>

### Continuous-mode default

- **Continuous mode is the default** when this PRD is dispatched via `issues-execution` for full delivery.
- Interactive override: user must say `interactive mode` explicitly at dispatch.
- Contract: `_shared/continuous-mode.md`.
- Stop-hook (recommended): `_shared/hooks/continuous-stop-guard/`.

### Delivery waves

- **Wave 1**:
  - Issues: #...
  - Parallel group: #...
  - Sequential tail: #...
  - Required reviewers: implementation-quality, documentation, ...
  - Predicates: `scripts/verify-issue-<n>.sh` per child (committed before implementation)
  - Rationale: ...
  - Escalation triggers: ...
- **Wave 2**: ...

### Final parent closure reviewers

- `implementation-quality-reviewer` (required)
- `documentation-reviewer` (required)
- `security-reviewer` (required IFF security risk present in delivery)
- `product-design-reviewer` (required IFF design risk present in delivery)
- `performance-reviewer` (required IFF performance risk present in delivery)

### Closure rules

- A child closes IFF its predicate exits 0 AND its wave reviewers return verdicts in `{PASS, PASS_WITH_NOTES, NOT_APPLICABLE}`.
- Wave gates may accept `PASS_WITH_NOTES` for non-structural cleanup. Notes are recorded in the execplan and resolved before final closeout (or converted to follow-up issues).
- Parent PRD closes IFF every required final reviewer returns `PASS` or `NOT_APPLICABLE` with `blocking_count == 0`.
- `PASS_WITH_NOTES` is **not accepted at final closeout** (mapped to `BLOCKED`).

### Hard-block escalation

- Conditions: `_shared/hard-block-conditions.md` (8 enumerated conditions).
- All other "should I check in" impulses are suppressed via `[CHECKIN-SUPPRESSED]` execplan entries.
- A hard-block is the only legitimate exit from continuous mode short of completion.

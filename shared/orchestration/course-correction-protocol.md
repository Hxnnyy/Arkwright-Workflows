# Course-Correction Protocol

Any agent may raise a `COURSE_CORRECTION_PROPOSAL` when evidence suggests the workflow is going down the wrong path.

## Required Schema

```json
{
  "event": "COURSE_CORRECTION_PROPOSAL",
  "severity": "low | medium | high | critical",
  "trigger": "why current path appears wrong",
  "evidence": ["file:line", "test output", "reviewer finding", "diff pattern"],
  "affected_invariants": ["public API", "auth", "migration safety", "architecture coherence", "UX", "test integrity"],
  "recommended_action": "continue_with_note | local_adjustment | parent_checkpoint | reroute | reslice | hard_block",
  "authority_level": "green | amber | red",
  "safe_next_step": "smallest reversible action"
}
```

## Authority Handling

- Green: record the proposal, take the local adjustment, and continue.
- Amber: pause the specific decision until independent verifier or chair concurrence is recorded; continue unrelated safe work if possible.
- Red: hard block.

## Forbidden Silent Changes

Implementers and orchestrators must not silently:

- weaken predicates,
- skip reviewers,
- modify acceptance semantics,
- change governance gates,
- declare success without fresh evidence,
- hide residual risk in summary prose.

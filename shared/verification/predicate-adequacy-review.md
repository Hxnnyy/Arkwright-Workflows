# Predicate Adequacy Review

Predicate adequacy review checks whether deterministic predicates capture the spirit of the acceptance criteria, not just their literal wording.

## Reviewer Questions

- Does the predicate exercise the behavior that matters?
- Can the implementation satisfy the predicate while still failing the user outcome?
- Are negative paths, integration wiring, and public contracts represented?
- Did anyone weaken, delete, bypass, or overfit the predicate?
- Is the predicate running on the correct branch/environment?

## Inadequate Predicate Handling

If inadequate, return a blocking finding and raise an amber-level `COURSE_CORRECTION_PROPOSAL`. Predicate changes require independent verifier or chair concurrence; implementers may not change them unilaterally.

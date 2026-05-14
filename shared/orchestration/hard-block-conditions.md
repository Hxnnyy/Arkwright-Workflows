# Hard-Block Conditions

A hard block is the only normal reason to stop continuous execution.

## Red Conditions

- Product semantics are ambiguous and multiple plausible choices would materially change outcome.
- Required credentials, environment access, or protected services are unavailable.
- Reviewer findings contradict each other and no compatible fix is available.
- Migration, data-loss, security-model, or irreversible destructive action requires owner approval.
- Durable state is corrupt or inconsistent and cannot be safely repaired from logs.
- Configured cycle caps are reached and the chair cannot make a safe disposition.
- Repository policy forbids the next action without human approval.

## Not Hard Blocks

- Desire to share progress.
- Minor implementation uncertainty within scope.
- Need to run extra tests.
- Need to add missing regression tests.
- Need to retry a failed command after a local fix.
- Medium-risk course adjustment that can be proposed and verified under amber governance.

## Hard-Block Record

When blocked, update state with:

- `status: "hard_blocked"`
- `block_reason`
- `blocked_at`
- `safe_next_step`
- evidence and links to relevant files, tests, PRs, or reviewer reports

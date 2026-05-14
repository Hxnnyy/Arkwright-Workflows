# Monster PR Run Example

Use Merge Train when a parent PR contains multiple risky concepts that cannot be reviewed reliably as one diff.

## Setup

1. Identify the parent PR and branch.
2. Create or ingest child PRs.
3. Copy templates into the target delivery workspace.
4. Start `merge-train-orchestrator`.

## Example State

```json
{
  "parent_pr": "https://github.com/example/repo/pull/100",
  "parent_branch": "feature/phase-7",
  "child_prs": [
    {"pr": 101, "risk": "medium", "status": "pending"},
    {"pr": 102, "risk": "high", "status": "pending"}
  ],
  "next_action": "Audit child PR 101."
}
```

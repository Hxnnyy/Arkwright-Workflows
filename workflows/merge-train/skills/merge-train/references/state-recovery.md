# State Recovery

Use this when a Merge Train appears partially complete.

## Priority Order

1. Durable state files.
2. Parent PR body and comments.
3. Child PR status, labels, and comments.
4. Parent integration ledger and risk register.
5. Branch graph and merge commits.
6. Check runs and test artifacts.
7. Local memory or summaries.

## Recovery Steps

1. Read `MERGE_TRAIN_STATE.json` if present.
2. Read parent ledger, risk register, child summaries, and checkpoint reports.
3. Reconcile child PRs:
   - pending,
   - audit in progress,
   - remediated awaiting verifier,
   - verified awaiting integration,
   - integrated awaiting checkpoint,
   - deferred,
   - complete.
4. Re-run verification for any child with stale or missing verifier evidence.
5. Re-run parent checkpoint when integration risk is unclear.
6. Resume from the first unsafe or incomplete step.

## Conflict Policy

If state says complete but PR evidence is missing, treat it as incomplete. If comments say complete but checks are stale, rerun checks. If the branch graph and ledger disagree, trust the branch graph and repair the ledger.

# Hard-Block Conditions

Only these conditions justify stopping continuous mode to request user input.

## Hard-Block List

1. Missing credentials or secrets that cannot be safely synthesized.
2. Persistent repository or API auth failure after retries.
3. Same implementation root-cause failure persists after retry cap.
4. Reviewer contradiction loop where no single fix can satisfy required reviewers.
5. Unresolvable working tree conflict state.
6. Predicate ambiguity that cannot be resolved without product-level input.
7. External dependency step unavailable and no safe fallback path exists.
8. State corruption: directive exists but state file is missing or malformed.

## Not Hard Blocks

These must not stop execution:

- Preference uncertainty
- End-of-wave status updates
- Desire to ask for reassurance
- General tradeoff discomfort
- Context age concerns without a concrete blocker

For these, record [CHECKIN-SUPPRESSED] and continue.

## Hard-Block Protocol

When a hard block fires:

1. Update tasks/STATE.json with status hard_blocked and reason.
2. Append [HARD_BLOCK] entry to execplan with evidence and required user input.
3. Surface one concise unblock prompt.
4. Pause execution until user response.

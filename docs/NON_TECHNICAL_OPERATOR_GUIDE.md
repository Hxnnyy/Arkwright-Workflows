# Non-Technical Operator Guide

This guide is for people who can describe business goals clearly but do not write code.

## Your Job in Longflow

You do not need to code. You do need to:

1. Describe what success looks like in plain language.
2. Answer decision questions during grill and council loops.
3. Confirm when a proposal truly matches your intent.
4. Respond only when a real hard block appears.

## What the Agents Handle

- Technical decomposition
- Risk discovery
- Architecture alternatives
- Issue slicing and dependency planning
- Implementation and testing loops
- Audit evidence and closure checks

## What to Do at Each Stage

### Grill

Give context:

- Who the user is
- What problem is painful
- What outcome should exist at the end
- What constraints are fixed

### Proposal Review

Look for intent drift:

- Missing outcomes
- Wrong assumptions
- Unacceptable tradeoffs

### Council

Watch split decisions. You only need to step in when:

- There is a tie-break choice that is mostly product taste.
- You prefer one tradeoff direction.

### PRD and Issues

Confirm that slices look understandable and complete. Ask for changes if something important is not represented.

### Execution

Let continuous mode run unless the orchestrator reports a hard block.

### Closeout

Read the final closure summary:

- What was shipped
- Which tests/predicates passed
- Which follow-ups were intentionally deferred

## Common Mistakes to Avoid

- Rushing from grill to coding before proposal alignment.
- Ignoring split decisions in council logs.
- Accepting vague acceptance criteria.
- Closing work on "looks good" without predicate evidence.

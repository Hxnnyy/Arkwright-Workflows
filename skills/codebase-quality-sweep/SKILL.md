---
name: codebase-quality-sweep
description: Run a full quality sweep (audit to issue tree to fixes to re-audit) using longflow contracts.
---

# Codebase Quality Sweep (Arkwright Longflow)

Use when the user asks for a broad quality hardening pass before or between feature waves.

## Phases

1. Audit
2. Triage findings
3. Convert findings to issue tree
4. Execute with issues-execution
5. Re-audit for regression or missed gaps

## Hard Rules

1. Findings must be severity-ranked with evidence.
2. Issue slicing must use deterministic predicates.
3. Fix execution must run in continuous mode by default.
4. Final signoff requires no unresolved blocking findings.

## Handoff

For implementation, dispatch issues-execution.

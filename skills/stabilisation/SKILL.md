---
name: stabilisation
description: Run final hardening and handover checks after parent PRD closure to ensure durable quality and clear follow-up ownership.
---

# Stabilisation (Arkwright Longflow)

Use this after issues-execution parent closure.

## Goals

1. Confirm no closure drift.
2. Confirm docs and runbooks match shipped behavior.
3. Convert remaining non-blocking notes into explicit follow-up issues where needed.
4. Produce concise handover report.

## Process

### 1. Closure Integrity Check

Validate:

- parent issue is closed
- child issues are closed
- predicates remain green
- final audit evidence is present

### 2. Documentation Integrity Check

Validate:

- architecture docs updated
- security docs updated
- decision logs updated
- troubleshooting/runbook updates present where needed

### 3. Follow-Up Hygiene

For deferred non-blocking items:

- open follow-up issues
- assign owner and priority
- label as out-of-scope carryover

### 4. Handover Summary

Produce:

- what shipped
- what was deferred
- residual risks
- recommended next wave

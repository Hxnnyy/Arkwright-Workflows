---
name: write-a-prd
description: Convert converged council output into a parent PRD with mechanically verifiable definition of done.
---

# Write a PRD (Arkwright Longflow)

Use this after council convergence.

Shared templates:

- ../_shared/templates/prd.md

## Hard Rules

1. Include user stories with verification hints.
2. Include module map and parallelism analysis.
3. Definition of done must be mechanically verifiable.
4. Out-of-scope must be explicit and testable.
5. Record council decision provenance.

## Process

### 1. Inputs

Read:

- converged proposal
- council cycle artifacts
- unresolved risk register
- repo context and standards

### 2. Structure

Build PRD with:

- intent
- user stories
- scope and non-scope
- module map
- parallelism analysis
- delivery waves
- definition of done
- risks and open questions
- council decision appendix

### 3. Quality Gate

Before handoff:

- every do-done item has a deterministic check hint
- every wave has rationale
- no stale file-path implementation detail in business sections

### 4. Publish

Write parent PRD issue body from template and keep it open.

## Handoff

Next skill: prd-to-issues

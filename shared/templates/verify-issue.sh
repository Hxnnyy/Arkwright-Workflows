#!/usr/bin/env bash
# verify-issue-<NUMBER>.sh
# Predicate for issue #<NUMBER>: <one-line description>
#
# Acceptance criteria covered:
#   AC1: <description> — checked by <predicate type>
#   AC2: <description> — checked by <predicate type>
#   AC3: <description> — checked by <predicate type>
#
# Exit 0 = all criteria met. Exit non-zero = failure (issue cannot close).
# Authored by `prd-to-issues` at issue-creation time.
# Implementers MUST NOT modify this file.

set -euo pipefail

ISSUE="<NUMBER>"
fail() { echo "[verify-issue-${ISSUE}] FAIL: $1" >&2; exit 1; }
pass() { echo "[verify-issue-${ISSUE}] PASS: $1"; }

# --- AC1: <description> ---
# Predicate type: failing-test-turns-green
if ! npm test -- --run path/to/new-feature.test.ts >/dev/null 2>&1; then
  fail "AC1 — feature test did not pass"
fi
pass "AC1 — feature test green"

# --- AC2: <description> ---
# Predicate type: grep-zero
if [ "$(grep -rn 'as any' src/api/ 2>/dev/null | wc -l)" != "0" ]; then
  fail "AC2 — 'as any' present in src/api/"
fi
pass "AC2 — no 'as any' in src/api/"

# --- AC3: <description> ---
# Predicate type: file-exists + content
if [ ! -f docs/decisions/0042-example.md ]; then
  fail "AC3 — required decision doc missing"
fi
if ! grep -q '## Decision' docs/decisions/0042-example.md; then
  fail "AC3 — decision doc missing '## Decision' section"
fi
pass "AC3 — decision doc present and structured"

echo "[verify-issue-${ISSUE}] all predicates passed"
exit 0

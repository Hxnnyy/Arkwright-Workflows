#!/usr/bin/env bash
set -euo pipefail

ISSUE_ID="<issue-number>"

echo "[verify-issue-${ISSUE_ID}] starting"

# AC1 example: targeted test suite
# Replace with project-specific command
# test-command --for-issue "${ISSUE_ID}"

echo "[verify-issue-${ISSUE_ID}] PASS: AC1"

# AC2 example: grep-zero invariant
# count=$(grep -R "forbidden-pattern" src | wc -l | tr -d ' ')
# if [ "${count}" != "0" ]; then
#   echo "[verify-issue-${ISSUE_ID}] FAIL: AC2 forbidden pattern present" >&2
#   exit 1
# fi

echo "[verify-issue-${ISSUE_ID}] PASS: AC2"

echo "[verify-issue-${ISSUE_ID}] all predicates passed"

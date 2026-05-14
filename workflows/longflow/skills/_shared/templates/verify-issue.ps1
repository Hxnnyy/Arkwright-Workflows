$IssueId = "<issue-number>"

Write-Output "[verify-issue-$IssueId] starting"

# AC1 example: targeted test suite
# Replace with project-specific command
# npm run test -- --issue $IssueId

Write-Output "[verify-issue-$IssueId] PASS: AC1"

# AC2 example: pattern invariant
# $matches = Select-String -Path src\**\* -Pattern "forbidden-pattern"
# if ($matches) {
#   Write-Error "[verify-issue-$IssueId] FAIL: AC2 forbidden pattern present"
#   exit 1
# }

Write-Output "[verify-issue-$IssueId] PASS: AC2"
Write-Output "[verify-issue-$IssueId] all predicates passed"

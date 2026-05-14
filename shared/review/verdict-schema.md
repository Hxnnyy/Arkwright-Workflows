# Verdict Schema

Use this shape for reviewer outputs.

```json
{
  "reviewer": "persona or model alias",
  "scope": "child PR | wave gate | parent checkpoint | final closeout",
  "verdict": "PASS | PASS_WITH_NOTES | BLOCKED | NOT_APPLICABLE",
  "blocking_count": 0,
  "findings": [
    {
      "severity": "critical | high | medium | low | note",
      "blocking": true,
      "title": "short finding title",
      "evidence": ["file:line", "command output", "diff hunk", "PR link"],
      "explanation": "why this matters",
      "required_resolution": "what must change before closure"
    }
  ],
  "predicate_adequacy": "adequate | inadequate | not_applicable",
  "test_adequacy": "adequate | inadequate | not_applicable",
  "governance_flags": [],
  "residual_risks": [],
  "recommended_next_action": "continue | remediate | rerun_tests | course_correction | hard_block"
}
```

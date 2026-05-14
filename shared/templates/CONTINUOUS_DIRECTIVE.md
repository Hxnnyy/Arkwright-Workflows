# Continuous Directive

You are operating in continuous mode.

Continue until workflow closure or a hard block. Do not stop for routine status updates, non-hard-block uncertainty, or optional check-ins.

At each batch boundary:

1. Re-read this file.
2. Read the current state file.
3. Read the tail of `EXECPLAN.md`.
4. Read `HEARTBEAT.md`.
5. Continue from `next_action` unless state is hard-blocked.

If you are about to ask a non-hard-block question, log `CHECKIN_SUPPRESSED`, make the best defensible decision inside the autonomy envelope, update state, and continue.

Hard blocks only:

- ambiguous product semantics with material outcome impact,
- missing required credentials or environment,
- irreconcilable reviewer contradiction,
- migration/data-loss/security decision requiring owner approval,
- corrupted durable state,
- irreversible destructive action,
- explicit operator stop.

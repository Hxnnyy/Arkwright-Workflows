# Heartbeat Protocol

Prompts cannot force a stopped model to continue. The workflow therefore uses durable heartbeat files and an optional watcher to reduce premature stops and make recovery reliable.

## Required Files

- `CONTINUOUS_DIRECTIVE.md`: high-salience instruction to continue until closure or hard block.
- `STATE.json` or workflow-specific state: machine-readable phase, status, and `next_action`.
- `EXECPLAN.md`: append-only human trace.
- `HEARTBEAT.md`: compact resume pointer.

## Heartbeat Update Cadence

Update heartbeat after:

- starting a new phase or batch,
- completing a child PR, issue, wave, checkpoint, or reviewer pass,
- suppressing a non-hard-block check-in,
- recording a course correction,
- encountering a hard block.

## Optional Watcher

If the harness supports background shell processes, run:

```powershell
npm run heartbeat:watch -- --state .\STATE.json --interval 60 --stale-after 900
```

When stale, the watcher prints:

`CONTINUOUS MODE STALE: reread CONTINUOUS_DIRECTIVE, STATE, EXECPLAN tail, then continue from next_action unless hard-blocked.`

This is a reminder only. It cannot resume a stopped model by itself.

## Resume Protocol

On every new turn, context compaction, or handoff:

1. Read the continuous directive.
2. Read the state file.
3. Read the execplan tail.
4. Read heartbeat.
5. Continue from `next_action` unless state is hard-blocked.

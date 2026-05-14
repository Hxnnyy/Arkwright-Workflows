# Scripts

These helpers are workflow-aware.

## Validate Config

```powershell
npm run validate:config -- workflows\longflow\longflow.config.example.json
npm run validate:config -- workflows\merge-train\merge-train.config.example.json
```

The validator detects Longflow and Merge Train config shapes from `workflow.name` and `workflow.type`.

## Generate Kickoff Prompt

```powershell
npm run prompt:kickoff -- workflows\longflow\longflow.config.example.json outputs\longflow-kickoff.txt
npm run prompt:kickoff -- workflows\merge-train\merge-train.config.example.json outputs\merge-train-kickoff.txt
```

## Heartbeat Watcher

Optional helper for harnesses that support background shell processes:

```powershell
npm run heartbeat:watch -- --state .\STATE.json --interval 60 --stale-after 900
```

The watcher emits a loud terminal reminder when heartbeat state is stale. It does not resume a stopped model by itself.

## Markdown Link Validation

```powershell
npm run validate:links
```

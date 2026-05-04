# Scripts

These scripts are optional helpers.

## validate-config.mjs

Validates longflow config JSON shape.

Usage:

- node scripts/validate-config.mjs ./longflow.config.json

## generate-kickoff-prompt.mjs

Renders an orchestrator kickoff prompt from config.

Usage:

- node scripts/generate-kickoff-prompt.mjs ./longflow.config.json
- node scripts/generate-kickoff-prompt.mjs ./longflow.config.json ./outputs/kickoff.txt

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function arg(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const statePath = path.resolve(arg("state", "./STATE.json"));
const intervalSeconds = Number.parseInt(arg("interval", "60"), 10);
const staleAfterSeconds = Number.parseInt(arg("stale-after", "900"), 10);

function readState() {
  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch (error) {
    console.error(`HEARTBEAT WATCH: cannot read ${statePath}: ${error.message}`);
    return null;
  }
}

function check() {
  const state = readState();
  if (!state || state.status === "closed" || state.status === "hard_blocked") return;
  const stamp = state.last_heartbeat_at || state.updated_at;
  if (!stamp) return;
  const ageSeconds = (Date.now() - Date.parse(stamp)) / 1000;
  if (Number.isFinite(ageSeconds) && ageSeconds > staleAfterSeconds) {
    console.error("CONTINUOUS MODE STALE: reread CONTINUOUS_DIRECTIVE, STATE, EXECPLAN tail, then continue from next_action unless hard-blocked.");
    console.error(`State: ${statePath}`);
    console.error(`Next action: ${state.next_action || "(missing)"}`);
  }
}

console.log(`HEARTBEAT WATCH: ${statePath}; interval=${intervalSeconds}s; stale-after=${staleAfterSeconds}s`);
check();
setInterval(check, intervalSeconds * 1000);

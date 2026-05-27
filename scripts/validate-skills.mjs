import fs from "node:fs";
import path from "node:path";
import { publicSkills, repoPath, repoRoot, staleSkillNames } from "./workflow-paths.mjs";

const failures = [];
const expectedSkillPaths = new Map(
  publicSkills.map((skill) => [path.normalize(path.join(repoRoot, skill.source, "SKILL.md")), skill.name])
);

function fail(message) {
  failures.push(message);
}

function walk(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, visitor);
    else visitor(full);
  }
}

function parseFrontmatter(text, filePath) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    fail(`${filePath}: missing YAML frontmatter`);
    return {};
  }
  const fields = {};
  const lines = match[1].split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!field) continue;
    if (field[2].trim() === ">" || field[2].trim() === "|") {
      const values = [];
      for (let next = index + 1; next < lines.length; next += 1) {
        if (!/^\s+/.test(lines[next])) break;
        values.push(lines[next].trim());
        index = next;
      }
      fields[field[1]] = values.join(" ").trim();
    } else {
      fields[field[1]] = field[2].trim();
    }
  }
  return fields;
}

for (const skill of publicSkills) {
  const skillDir = repoPath(skill.source);
  const skillMd = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillMd)) {
    fail(`${skill.name}: missing SKILL.md at ${skill.source}`);
    continue;
  }
  const text = fs.readFileSync(skillMd, "utf8");
  const fields = parseFrontmatter(text, skillMd);
  if (fields.name !== skill.name) fail(`${skill.name}: frontmatter name is ${fields.name || "<missing>"}`);
  if (!fields.description || fields.description.length < 40) fail(`${skill.name}: description is missing or too short`);
  if (skill.workflow === "longflow" && text.includes("`_shared/")) {
    fail(`${skill.name}: source SKILL.md should reference ../_shared, not _shared directly`);
  }
}

walk(repoPath("workflows"), (filePath) => {
  if (path.basename(filePath) !== "SKILL.md") return;
  const normalized = path.normalize(filePath);
  if (!expectedSkillPaths.has(normalized)) {
    fail(`unexpected discoverable skill: ${path.relative(repoRoot, filePath)}`);
  }
});

for (const stale of staleSkillNames) {
  const matches = [];
  walk(repoPath("workflows"), (filePath) => {
    if (path.basename(filePath) === "SKILL.md" && filePath.includes(`${path.sep}${stale}${path.sep}`)) {
      matches.push(path.relative(repoRoot, filePath));
    }
  });
  if (matches.length) fail(`stale skill entrypoint still present for ${stale}: ${matches.join(", ")}`);
}

for (const required of [
  "workflows/longflow/skills/_shared/reviewer-protocol.md",
  "workflows/longflow/skills/_shared/council-protocol.md",
  "shared/review/strict-review-bar.md"
]) {
  if (!fs.existsSync(repoPath(required))) fail(`missing required shared file: ${required}`);
}

if (failures.length) {
  console.error("SKILL VALIDATION FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("SKILLS VALID");

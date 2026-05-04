import fs from "node:fs";
import path from "node:path";

const configPath = process.argv[2] || "./longflow.config.json";

function fail(message) {
  console.error(`CONFIG INVALID: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    fail(`Cannot read or parse JSON at ${filePath}: ${error.message}`);
  }
}

function getAt(obj, keyPath) {
  return keyPath.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

function requireString(config, keyPath) {
  const value = getAt(config, keyPath);
  if (typeof value !== "string" || value.trim() === "") {
    fail(`Expected non-empty string at ${keyPath}`);
  }
}

function requireBoolean(config, keyPath) {
  const value = getAt(config, keyPath);
  if (typeof value !== "boolean") {
    fail(`Expected boolean at ${keyPath}`);
  }
}

function requireArray(config, keyPath) {
  const value = getAt(config, keyPath);
  if (!Array.isArray(value) || value.length === 0) {
    fail(`Expected non-empty array at ${keyPath}`);
  }
}

function requireInteger(config, keyPath, min) {
  const value = getAt(config, keyPath);
  if (!Number.isInteger(value) || value < min) {
    fail(`Expected integer >= ${min} at ${keyPath}`);
  }
}

const absolutePath = path.resolve(configPath);
const config = readJson(absolutePath);

requireString(config, "version");
requireString(config, "workflow.name");
requireBoolean(config, "workflow.continuousModeDefault");
requireBoolean(config, "workflow.pauseOnlyOnHardBlocks");

requireString(config, "harness.orchestrator");
requireString(config, "harness.subagentDispatchStyle");
requireBoolean(config, "harness.supportsParallelSubagents");

const aliases = getAt(config, "modelAliases");
if (!aliases || typeof aliases !== "object" || Array.isArray(aliases)) {
  fail("modelAliases must be an object mapping alias name to physical model name");
}
const aliasNames = Object.keys(aliases);
if (aliasNames.length === 0) {
  fail("modelAliases must contain at least one entry");
}
for (const [aliasName, physicalName] of Object.entries(aliases)) {
  if (typeof physicalName !== "string" || physicalName.trim() === "") {
    fail(`modelAliases.${aliasName} must resolve to a non-empty string model name`);
  }
}

function requireAlias(keyPath) {
  const value = getAt(config, keyPath);
  if (typeof value !== "string" || value.trim() === "") {
    fail(`Expected alias string at ${keyPath}`);
  }
  if (!aliasNames.includes(value)) {
    fail(`${keyPath} references unknown alias "${value}". Add it to modelAliases.`);
  }
}

function requireAliasArray(keyPath) {
  const value = getAt(config, keyPath);
  if (!Array.isArray(value) || value.length === 0) {
    fail(`Expected non-empty array at ${keyPath}`);
  }
  for (let i = 0; i < value.length; i += 1) {
    if (!aliasNames.includes(value[i])) {
      fail(`${keyPath}[${i}] references unknown alias "${value[i]}". Add it to modelAliases.`);
    }
  }
}

requireAlias("models.orchestrator.alias");
requireString(config, "models.orchestrator.reasoning");
requireAlias("models.councilChair.alias");
requireString(config, "models.councilChair.reasoning");
requireAliasArray("models.councilStageA");
requireAliasArray("models.councilStageB");

requireAlias("routing.leadByIssueType.frontend");
requireAlias("routing.leadByIssueType.backend");
requireAlias("routing.leadByIssueType.security");
requireAlias("routing.leadByIssueType.docs");

requireAliasArray("routing.reviewersByIssueType.frontend");
requireAliasArray("routing.reviewersByIssueType.backend");
requireAliasArray("routing.reviewersByIssueType.security");
requireAliasArray("routing.reviewersByIssueType.docs");
requireAliasArray("routing.waveGateReviewers");
requireAliasArray("routing.finalCloseoutModels");
requireArray(config, "routing.finalCloseoutPersonas");

const personasByPrdType = getAt(config, "routing.personasByPrdType");
if (!personasByPrdType || typeof personasByPrdType !== "object" || Array.isArray(personasByPrdType)) {
  fail("routing.personasByPrdType must be an object mapping PRD type to persona array");
}
if (!Array.isArray(personasByPrdType.default) || personasByPrdType.default.length === 0) {
  fail("routing.personasByPrdType.default must be a non-empty array (persona safety floor)");
}
for (const [prdType, personas] of Object.entries(personasByPrdType)) {
  if (!Array.isArray(personas) || personas.length === 0) {
    fail(`routing.personasByPrdType.${prdType} must be a non-empty array`);
  }
}

requireInteger(config, "convergence.openCriticalsAllowed", 0);
requireArray(config, "convergence.requireDispositionForSeverity");
requireInteger(config, "convergence.maxNewMediumOrAboveFindingsPerCycleToExit", 0);
requireBoolean(config, "convergence.severityDowngradeRequiresChairSignoff");
requireInteger(config, "convergence.stageAMaxCycles", 1);
requireInteger(config, "convergence.stageBMaxCycles", 1);
requireString(config, "convergence.atCapAction");

requireBoolean(config, "guardrails.requireFreshBranch");
requireBoolean(config, "guardrails.requireFreshWorktree");
requireArray(config, "guardrails.protectedEnvironment");
requireBoolean(config, "guardrails.orchestratorDelegationDefault");
requireInteger(config, "guardrails.maxImplementerRetryPerIssue", 1);
requireInteger(config, "guardrails.maxReviewerRetryPerCategory", 1);

console.log(`CONFIG VALID: ${absolutePath}`);

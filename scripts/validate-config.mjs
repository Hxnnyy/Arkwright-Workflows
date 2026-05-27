import fs from "node:fs";
import path from "node:path";

const configPath = process.argv[2] || "./workflows/longflow/longflow.config.json";

function fail(message) {
  console.error(`CONFIG INVALID: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Cannot read or parse JSON at ${filePath}: ${error.message}`);
  }
}

function getAt(obj, keyPath) {
  return keyPath.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

function requireString(config, keyPath) {
  const value = getAt(config, keyPath);
  if (typeof value !== "string" || value.trim() === "") fail(`Expected non-empty string at ${keyPath}`);
}

function requireBoolean(config, keyPath) {
  if (typeof getAt(config, keyPath) !== "boolean") fail(`Expected boolean at ${keyPath}`);
}

function requireArray(config, keyPath) {
  const value = getAt(config, keyPath);
  if (!Array.isArray(value) || value.length === 0) fail(`Expected non-empty array at ${keyPath}`);
}

function requireInteger(config, keyPath, min) {
  const value = getAt(config, keyPath);
  if (!Number.isInteger(value) || value < min) fail(`Expected integer >= ${min} at ${keyPath}`);
}

function aliasNames(config) {
  const aliases = config.modelAliases;
  if (!aliases || typeof aliases !== "object" || Array.isArray(aliases)) {
    fail("modelAliases must be an object mapping alias name to physical model name");
  }
  const names = Object.keys(aliases);
  if (names.length === 0) fail("modelAliases must contain at least one entry");
  for (const [aliasName, physicalName] of Object.entries(aliases)) {
    if (typeof physicalName !== "string" || physicalName.trim() === "") {
      fail(`modelAliases.${aliasName} must resolve to a non-empty string model name`);
    }
  }
  return names;
}

function requireAlias(config, names, keyPath) {
  const value = getAt(config, keyPath);
  if (typeof value !== "string" || value.trim() === "") fail(`Expected alias string at ${keyPath}`);
  if (!names.includes(value)) fail(`${keyPath} references unknown alias "${value}". Add it to modelAliases.`);
}

function requireAliasArray(config, names, keyPath) {
  const value = getAt(config, keyPath);
  if (!Array.isArray(value) || value.length === 0) fail(`Expected non-empty array at ${keyPath}`);
  value.forEach((alias, index) => {
    if (!names.includes(alias)) fail(`${keyPath}[${index}] references unknown alias "${alias}". Add it to modelAliases.`);
  });
}

function validateCommon(config) {
  requireString(config, "version");
  requireString(config, "workflow.name");
  requireBoolean(config, "workflow.continuousModeDefault");
  requireBoolean(config, "workflow.pauseOnlyOnHardBlocks");
  requireString(config, "harness.orchestrator");
  requireString(config, "harness.subagentDispatchStyle");
  requireBoolean(config, "harness.supportsParallelSubagents");
  return aliasNames(config);
}

function validateLongflow(config, names) {
  requireAlias(config, names, "models.orchestrator.alias");
  requireString(config, "models.orchestrator.reasoning");
  requireAlias(config, names, "models.councilChair.alias");
  requireString(config, "models.councilChair.reasoning");
  requireAliasArray(config, names, "models.councilStageA");
  requireAliasArray(config, names, "models.councilStageB");

  requireAlias(config, names, "routing.leadByIssueType.frontend");
  requireAlias(config, names, "routing.leadByIssueType.backend");
  requireAlias(config, names, "routing.leadByIssueType.security");
  requireAlias(config, names, "routing.leadByIssueType.docs");
  requireAliasArray(config, names, "routing.reviewersByIssueType.frontend");
  requireAliasArray(config, names, "routing.reviewersByIssueType.backend");
  requireAliasArray(config, names, "routing.reviewersByIssueType.security");
  requireAliasArray(config, names, "routing.reviewersByIssueType.docs");
  requireAliasArray(config, names, "routing.waveGateReviewers");
  requireAliasArray(config, names, "routing.finalCloseoutModels");
  requireArray(config, "routing.finalCloseoutPersonas");

  const personasByPrdType = getAt(config, "routing.personasByPrdType");
  if (!personasByPrdType || typeof personasByPrdType !== "object" || Array.isArray(personasByPrdType)) {
    fail("routing.personasByPrdType must be an object mapping PRD type to persona array");
  }
  if (!Array.isArray(personasByPrdType.default) || personasByPrdType.default.length === 0) {
    fail("routing.personasByPrdType.default must be a non-empty array");
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
}

function validateMergeTrain(config, names) {
  requireString(config, "workflow.type");
  for (const key of [
    "models.orchestratorModel",
    "models.childAuditModel",
    "models.childRemediationModel",
    "models.childVerifierModel"
  ]) {
    requireAlias(config, names, key);
  }
  requireAliasArray(config, names, "models.parentCheckpointModels");
  requireAliasArray(config, names, "models.finalReviewerModels");
  requireArray(config, "parentReviewerPersonas");
  requireInteger(config, "checkpointPolicy.everyNChildMerges", 1);
  requireArray(config, "checkpointPolicy.highRiskTriggers");
  requireInteger(config, "retryCaps.childAuditRemediationCycles", 1);
  requireInteger(config, "retryCaps.parentCheckpointRemediationCycles", 1);
  requireInteger(config, "retryCaps.finalCloseoutCycles", 1);
  requireBoolean(config, "hardBlockPolicy.criticalRiskRequiresHumanSignoff");
  requireBoolean(config, "hardBlockPolicy.irreversibleActionsRequireHumanSignoff");
  requireBoolean(config, "hardBlockPolicy.allowPassWithNotesAtFinalCloseout");
  requireString(config, "heartbeatPolicy.stateFile");
  requireInteger(config, "heartbeatPolicy.staleAfterSeconds", 60);
  requireBoolean(config, "heartbeatPolicy.rereadAtBatchBoundaries");
  requireString(config, "branchConventions.parentBranchPattern");
  requireString(config, "branchConventions.childBranchPattern");
  requireString(config, "branchConventions.mergePolicy");
  requireBoolean(config, "branchConventions.allowFeatureBranchPushes");
  requireBoolean(config, "branchConventions.requireProtectedBranchSafety");
  requireString(config, "prConventions.parentPrLabel");
  requireString(config, "prConventions.childPrLabel");
  requireArray(config, "testCommands");
  requireArray(config, "predicateCommands");
}

const absolutePath = path.resolve(configPath);
const config = readJson(absolutePath);
const names = validateCommon(config);
const workflowName = config.workflow.name.toLowerCase();

if (workflowName.includes("merge train") || config.workflow.type === "merge-train") {
  validateMergeTrain(config, names);
} else if (workflowName.includes("longflow")) {
  validateLongflow(config, names);
} else {
  fail(`Unknown workflow type for ${config.workflow.name}`);
}

console.log(`CONFIG VALID: ${absolutePath}`);

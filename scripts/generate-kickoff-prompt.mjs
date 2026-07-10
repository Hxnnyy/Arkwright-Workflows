import fs from "node:fs";
import path from "node:path";

const configPath = process.argv[2] || "./workflows/longflow/longflow.config.json";
const outputPath = process.argv[3] || "";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function list(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function makeResolver(aliases) {
  return function resolve(alias) {
    const physical = aliases[alias];
    return physical ? `${physical} [${alias}]` : `${alias} (UNRESOLVED ALIAS)`;
  };
}

function buildLongflowPrompt(config, resolve) {
  const lead = config.routing.leadByIssueType;
  const issueReview = config.routing.reviewersByIssueType;
  const convergence = config.convergence || {};
  const personaRoutingLines = Object.entries(config.routing.personasByPrdType || {}).map(
    ([prdType, personas]) => `- ${prdType}: ${personas.join(", ")}`
  );

  return [
    `You are the implementation orchestrator for ${config.workflow.name}.`,
    "",
    "Execution constraints:",
    `1. Continuous mode default: ${config.workflow.continuousModeDefault}.`,
    `2. Pause only on hard blocks: ${config.workflow.pauseOnlyOnHardBlocks}.`,
    "3. Predicate pass is an evidence floor, not a quality ceiling.",
    "4. Re-read CONTINUOUS_DIRECTIVE, state, execplan tail, and heartbeat at every batch boundary.",
    "",
    "Council chair:",
    `- ${resolve(config.models.councilChair.alias)} (${config.models.councilChair.reasoning})`,
    "",
    "Council Stage A voting members:",
    list(config.models.councilStageA.map(resolve)),
    "",
    "Council Stage B voting members:",
    list(config.models.councilStageB.map(resolve)),
    "",
    "Lead routing by issue type:",
    `- Frontend: ${resolve(lead.frontend)}`,
    `- Backend: ${resolve(lead.backend)}`,
    `- Security: ${resolve(lead.security)}`,
    `- Docs: ${resolve(lead.docs)}`,
    "",
    "Issue reviewer routing:",
    `- Frontend reviewers: ${issueReview.frontend.map(resolve).join(", ")}`,
    `- Backend reviewers: ${issueReview.backend.map(resolve).join(", ")}`,
    `- Security reviewers: ${issueReview.security.map(resolve).join(", ")}`,
    `- Docs reviewers: ${issueReview.docs.map(resolve).join(", ")}`,
    "",
    "Wave-gate reviewers:",
    list(config.routing.waveGateReviewers.map(resolve)),
    "",
    "Final closeout panel:",
    `Models: ${config.routing.finalCloseoutModels.map(resolve).join(", ")}`,
    `Personas: ${config.routing.finalCloseoutPersonas.join(", ")}`,
    "",
    "Stage B persona routing:",
    ...personaRoutingLines,
    "",
    "Convergence rules:",
    `1. Open Criticals allowed: ${convergence.openCriticalsAllowed ?? 0}.`,
    `2. Require explicit disposition for severities: ${(convergence.requireDispositionForSeverity || []).join(", ")}.`,
    `3. Max new Medium-or-above findings per cycle to exit: ${convergence.maxNewMediumOrAboveFindingsPerCycleToExit ?? 2}.`,
    `4. Severity downgrade requires chair sign-off: ${convergence.severityDowngradeRequiresChairSignoff ?? true}.`,
    `5. Stage A max cycles: ${convergence.stageAMaxCycles ?? 5}. Stage B max cycles: ${convergence.stageBMaxCycles ?? 5}.`,
    `6. At-cap action: ${convergence.atCapAction || "chair-force-disposition-and-escalate"}.`,
    "",
    "Closure rules:",
    "1. Child issue closes only with predicate/test evidence and no-blocking reviewers.",
    "2. Predicate/test adequacy issues are blocking.",
    "3. Final closeout does not accept PASS_WITH_NOTES unless explicitly configured.",
    "4. Do not stop for routine progress updates."
  ].join("\n");
}

function buildMergeTrainPrompt(config, resolve) {
  return [
    `You are the orchestrator for ${config.workflow.name}.`,
    "",
    "Execution constraints:",
    `1. Continuous mode default: ${config.workflow.continuousModeDefault}.`,
    `2. Pause only on hard blocks: ${config.workflow.pauseOnlyOnHardBlocks}.`,
    `3. State file: ${config.heartbeatPolicy.stateFile}.`,
    `4. Heartbeat stale after seconds: ${config.heartbeatPolicy.staleAfterSeconds}.`,
    "5. Re-read directive, state, execplan tail, and heartbeat at every batch boundary.",
    "",
    "Models:",
    `- Child audit: ${resolve(config.models.childAuditModel)}`,
    `- Child remediation: ${resolve(config.models.childRemediationModel)}`,
    `- Child verifier: ${resolve(config.models.childVerifierModel)}`,
    `- Parent checkpoints: ${config.models.parentCheckpointModels.map(resolve).join(", ")}`,
    `- Final reviewers: ${config.models.finalReviewerModels.map(resolve).join(", ")}`,
    "",
    "Parent reviewer personas:",
    list(config.parentReviewerPersonas),
    "",
    "Checkpoint policy:",
    `1. Every ${config.checkpointPolicy.everyNChildMerges} child merges.`,
    `2. High-risk triggers: ${config.checkpointPolicy.highRiskTriggers.join(", ")}.`,
    "",
    "Closure rules:",
    "1. No child merges without fresh no-blocking verification.",
    "2. High-risk children require a parent checkpoint after merge.",
    "3. Parent is not ready until ledger, risk register, checks, predicates, and final reviewers are current.",
    "4. Final closeout does not accept PASS_WITH_NOTES unless explicitly configured.",
    "5. Do not stop for routine progress updates."
  ].join("\n");
}

const absoluteConfigPath = path.resolve(configPath);
const config = readJson(absoluteConfigPath);
const resolve = makeResolver(config.modelAliases || {});
const isMergeTrain = config.workflow.type === "merge-train" || config.workflow.name.toLowerCase().includes("merge train");
const prompt = isMergeTrain ? buildMergeTrainPrompt(config, resolve) : buildLongflowPrompt(config, resolve);

if (outputPath) {
  const absoluteOutputPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, `${prompt}\n`, "utf8");
  console.log(`KICKOFF PROMPT WRITTEN: ${absoluteOutputPath}`);
} else {
  console.log(prompt);
}

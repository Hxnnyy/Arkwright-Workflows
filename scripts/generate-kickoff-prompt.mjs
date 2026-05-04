import fs from "node:fs";
import path from "node:path";

const configPath = process.argv[2] || "./longflow.config.json";
const outputPath = process.argv[3] || "";

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function list(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function makeResolver(aliases) {
  return function resolve(alias) {
    const physical = aliases[alias];
    if (!physical) {
      return `${alias} (UNRESOLVED ALIAS)`;
    }
    return `${physical} [${alias}]`;
  };
}

function buildPrompt(config) {
  const resolve = makeResolver(config.modelAliases || {});
  const lead = config.routing.leadByIssueType;
  const issueReview = config.routing.reviewersByIssueType;
  const convergence = config.convergence || {};
  const personasByPrdType = config.routing.personasByPrdType || {};

  const personaRoutingLines = Object.entries(personasByPrdType).map(
    ([prdType, personas]) => `- ${prdType}: ${personas.join(", ")}`
  );

  return [
    `You are the implementation orchestrator for ${config.workflow.name}.`,
    "",
    "Execution constraints:",
    `1. Continuous mode default: ${config.workflow.continuousModeDefault}.`,
    `2. Pause only on hard blocks: ${config.workflow.pauseOnlyOnHardBlocks}.`,
    `3. Require fresh branch: ${config.guardrails.requireFreshBranch}.`,
    `4. Require fresh worktree: ${config.guardrails.requireFreshWorktree}.`,
    `5. Protected environments: ${config.guardrails.protectedEnvironment.join(", ")}.`,
    "",
    "Orchestrator model:",
    `- ${resolve(config.models.orchestrator.alias)} (${config.models.orchestrator.reasoning})`,
    "",
    "Council chair (does not vote — owns tie-breaks, severity-downgrade sign-off, cycle-cap force-disposition):",
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
    `Personas (always all five at final closeout): ${config.routing.finalCloseoutPersonas.join(", ")}`,
    "",
    "Stage B persona routing (per PRD type, exclusions require chair sign-off):",
    ...personaRoutingLines,
    "",
    "Convergence rules:",
    `1. Open Criticals allowed: ${convergence.openCriticalsAllowed ?? 0}.`,
    `2. Require explicit disposition for severities: ${(convergence.requireDispositionForSeverity || []).join(", ")}.`,
    `3. Max new ≥Medium findings per cycle to exit: ${convergence.maxNewMediumOrAboveFindingsPerCycleToExit ?? 2}.`,
    `4. Severity downgrade between cycles requires chair sign-off: ${convergence.severityDowngradeRequiresChairSignoff ?? true}.`,
    `5. Stage A max cycles: ${convergence.stageAMaxCycles ?? 5}. Stage B max cycles: ${convergence.stageBMaxCycles ?? 5}.`,
    `6. At-cap action: ${convergence.atCapAction || "chair-force-disposition-and-escalate"}.`,
    "",
    "Quality and closure rules:",
    "1. Delegate implementation by default.",
    "2. A child issue closes only when its predicate passes and required reviewers are no-blocking.",
    "3. Each wave requires required wave-gate reviewer approval.",
    "4. Parent closes only after full final persona-model panel is no-blocking.",
    "5. Do not stop for routine progress updates."
  ].join("\n");
}

const absoluteConfigPath = path.resolve(configPath);
const config = readJson(absoluteConfigPath);
const prompt = buildPrompt(config);

if (outputPath) {
  const absoluteOutputPath = path.resolve(outputPath);
  const outputDir = path.dirname(absoluteOutputPath);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(absoluteOutputPath, `${prompt}\n`, "utf8");
  console.log(`KICKOFF PROMPT WRITTEN: ${absoluteOutputPath}`);
} else {
  console.log(prompt);
}

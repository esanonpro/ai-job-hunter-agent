// src/prefilter.js

const aiSignals = [
  "artificial intelligence",
  "intelligence artificielle",
  "generative ai",
  "genai",
  "gen ai",
  "ia générative",
  "llm",
  "large language model",
  "large language models",

  "ai agent",
  "ai agents",
  "agentic ai",
  "agentic",
  "agentique",
  "multi-agent",
  "multi agent",

  "rag",
  "retrieval augmented generation",

  "langgraph",
  "langchain",

  "model context protocol",
  "mcp",

  "prompt engineering",
  "prompt engineer",

  "ai automation",
  "intelligent automation",
  "ai-powered automation",
  "ai powered automation",

  "machine learning",
  "ml engineer",
  "mlops",

  "vertex ai",
  "gemini",
];


const relevantTitleSignals = [
  // AI / ML
  "ai engineer",
  "ia engineer",
  "genai engineer",
  "machine learning",
  "ml engineer",
  "mlops",
  "data scientist",

  // Data
  "data engineer",
  "analytics engineer",

  // Software / Backend
  "software engineer",
  "software developer",
  "backend engineer",
  "backend developer",
  "back-end",
  "développeur",
  "developer",

  // Automation / Integration
  "automation engineer",
  "integration engineer",
  "integration developer",
  "intelligent automation",

  // Solutions / Forward deployed
  "solutions engineer",
  "solution engineer",
  "forward deployed",
  "implementation engineer",
  "technical consultant",
  "consultant technique",

  // Cloud / Platform
  "cloud engineer",
  "platform engineer",
];


const technicalSignals = [
  "python",
  "fastapi",

  "api integration",
  "api integrations",
  "intégration api",
  "rest api",

  "workflow automation",
  "workflow orchestration",
  "automation workflow",
  "automatisation",
  "orchestration",

  "docker",

  "gcp",
  "google cloud",
  "vertex ai",

  "airflow",
  "cloud composer",

  "dbt",

  "etl",
  "elt",

  "bigquery",

  "rag",
  "langgraph",
  "mcp",
];


const compatibleLocations = [
  "france",
  "paris",
  "lyon",
  "rennes",
  "lille",
  "toulouse",
  "bordeaux",
  "nantes",
  "marseille",
  "montpellier",
  "grenoble",
  "nice",
  "sophia antipolis",

  "europe",
  "emea",

  "remote france",
  "remote - france",
  "france - remote",
];


const incompatibleLocations = [
  "united states",
  "usa",
  "u.s.",
  "canada",
  "australia",
  "singapore",
  "india",
  "brazil",
  "mexico",
];


const seniorTitleSignals = [
  "senior ",
  "sr.",
  "sr ",
  "staff ",
  "principal ",
  "lead ",
  "director",
  "head of",
  "vp ",
  "vice president",
  "manager",
];


export function prefilterJob(job) {
  const title = String(job.title ?? "").toLowerCase();
  const description = String(job.description ?? "").toLowerCase();
  const location = String(job.location ?? "").toLowerCase();

  const fullText = `${title} ${description}`;

  // AI signals
  const matchedAiSignals = aiSignals.filter((signal) =>
    fullText.includes(signal)
  );

  // Title signals
  const matchedTitleSignals = relevantTitleSignals.filter((signal) =>
    title.includes(signal)
  );

  // Technical signals
  const matchedTechnicalSignals = technicalSignals.filter((signal) =>
    description.includes(signal)
  );

  // Location
  const matchedCompatibleLocations = compatibleLocations.filter((signal) =>
    location.includes(signal)
  );

  const matchedIncompatibleLocations = incompatibleLocations.filter((signal) =>
    location.includes(signal)
  );

  // Seniority
  const matchedSeniorSignals = seniorTitleSignals.filter((signal) =>
    title.includes(signal)
  );

  const clearlySenior = matchedSeniorSignals.length > 0;

  // Geography
  let locationCompatible = true;

  if (
    matchedIncompatibleLocations.length > 0 &&
    matchedCompatibleLocations.length === 0
  ) {
    locationCompatible = false;
  }

  // Role relevance
  const hasStrongAiSignal = matchedAiSignals.length > 0;
  const hasRelevantTitle = matchedTitleSignals.length > 0;
  const hasTechnicalFit = matchedTechnicalSignals.length >= 2;

  const roleRelevant =
    hasStrongAiSignal ||
    hasRelevantTitle ||
    hasTechnicalFit;

  // Final decision
  const passPreFilter =
    roleRelevant &&
    locationCompatible &&
    !clearlySenior;

  return {
    ...job,

    pre_filter: {
      ai_signals: matchedAiSignals,
      title_signals: matchedTitleSignals,
      technical_signals: matchedTechnicalSignals,

      compatible_location_signals: matchedCompatibleLocations,
      incompatible_location_signals: matchedIncompatibleLocations,

      senior_signals: matchedSeniorSignals,

      has_ai_signal: hasStrongAiSignal,

      potential_hidden_ai:
        !hasStrongAiSignal && hasRelevantTitle,

      location_compatible: locationCompatible,

      clearly_senior: clearlySenior,
    },

    pass_pre_filter: passPreFilter,
  };
}
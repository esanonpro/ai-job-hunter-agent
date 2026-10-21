const ALLOWED_RECOMMENDATIONS = [
  "PRIORITY",
  "APPLY",
  "REVIEW",
  "SKIP"
];

export function validateAnalysis(analysis) {
  const errors = [];

  if (!analysis || typeof analysis !== "object" || Array.isArray(analysis)) {
    return {
      valid: false,
      errors: ["Analysis must be an object"]
    };
  }

  if (
    !ALLOWED_RECOMMENDATIONS.includes(analysis.recommendation)
  ) {
    errors.push("Invalid recommendation");
  }

  const scores = [
    "ai_automation_relevance",
    "junior_compatibility",
    "candidate_fit"
  ];

  for (const score of scores) {
    if (
      typeof analysis[score] !== "number" ||
      !Number.isFinite(analysis[score]) ||
      analysis[score] < 0 ||
      analysis[score] > 100
    ) {
      errors.push(`${score} must be a number between 0 and 100`);
    }
  }

  if (typeof analysis.hidden_ai_automation_role !== "boolean") {
    errors.push("hidden_ai_automation_role must be a boolean");
  }

  if (!Array.isArray(analysis.matched_skills)) {
    errors.push("matched_skills must be an array");
  }

  if (!Array.isArray(analysis.missing_skills)) {
    errors.push("missing_skills must be an array");
  }

  if (
    typeof analysis.experience_required !== "string"
  ) {
    errors.push("experience_required must be a string");
  }

  if (
    typeof analysis.reason !== "string"
  ) {
    errors.push("reason must be a string");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
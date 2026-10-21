export function shouldNotifyJob(analysis) {
  const isRecommended =
    analysis.recommendation === "PRIORITY" ||
    analysis.recommendation === "APPLY" ||
    analysis.hidden_ai_automation_role === true;

  const isJuniorCompatible =
    Number(analysis.junior_compatibility) >= 40;

  return isRecommended && isJuniorCompatible;
}
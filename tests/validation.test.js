import { describe, it, expect } from "vitest";
import { validateAnalysis } from "../src/validation.js";

describe("validateAnalysis", () => {

  it("accepts a valid Gemini analysis", () => {
    const analysis = {
      ai_automation_relevance: 100,
      junior_compatibility: 95,
      candidate_fit: 85,
      hidden_ai_automation_role: false,
      matched_skills: [
        "Python",
        "JavaScript",
        "n8n",
        "MCP"
      ],
      missing_skills: [
        "Dust",
        "Claude API"
      ],
      experience_required:
        "Junior profile accepted",
      reason:
        "Strong alignment with the candidate profile.",
      recommendation: "PRIORITY"
    };

    const result = validateAnalysis(analysis);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects an unknown recommendation", () => {
    const analysis = {
      ai_automation_relevance: 90,
      junior_compatibility: 80,
      candidate_fit: 85,
      hidden_ai_automation_role: false,
      matched_skills: [],
      missing_skills: [],
      experience_required: "Not specified",
      reason: "Relevant role.",
      recommendation: "SUPER_JOB"
    };

    const result = validateAnalysis(analysis);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Invalid recommendation"
    );
  });


  it("rejects scores greater than 100", () => {
    const analysis = {
      ai_automation_relevance: 150,
      junior_compatibility: 80,
      candidate_fit: 85,
      hidden_ai_automation_role: false,
      matched_skills: [],
      missing_skills: [],
      experience_required: "Not specified",
      reason: "Relevant role.",
      recommendation: "APPLY"
    };

    const result = validateAnalysis(analysis);

    expect(result.valid).toBe(false);
  });


  it("rejects a non-boolean hidden AI value", () => {
    const analysis = {
      ai_automation_relevance: 90,
      junior_compatibility: 80,
      candidate_fit: 85,
      hidden_ai_automation_role: "yes",
      matched_skills: [],
      missing_skills: [],
      experience_required: "Not specified",
      reason: "Relevant role.",
      recommendation: "APPLY"
    };

    const result = validateAnalysis(analysis);

    expect(result.valid).toBe(false);
  });


  it("rejects matched_skills when it is not an array", () => {
    const analysis = {
      ai_automation_relevance: 90,
      junior_compatibility: 80,
      candidate_fit: 85,
      hidden_ai_automation_role: false,
      matched_skills: "Python",
      missing_skills: [],
      experience_required: "Not specified",
      reason: "Relevant role.",
      recommendation: "APPLY"
    };

    const result = validateAnalysis(analysis);

    expect(result.valid).toBe(false);
  });


  it("rejects an empty or missing analysis object", () => {
    const result = validateAnalysis(null);

    expect(result.valid).toBe(false);
  });

});
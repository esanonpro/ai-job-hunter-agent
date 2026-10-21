import { describe, it, expect } from "vitest";
import { shouldNotifyJob } from "../src/routing.js";

describe("shouldNotifyJob", () => {

  it("notifies a PRIORITY job with sufficient junior compatibility", () => {
    const analysis = {
      recommendation: "PRIORITY",
      hidden_ai_automation_role: false,
      junior_compatibility: 90
    };

    expect(shouldNotifyJob(analysis)).toBe(true);
  });


  it("notifies an APPLY job with sufficient junior compatibility", () => {
    const analysis = {
      recommendation: "APPLY",
      hidden_ai_automation_role: false,
      junior_compatibility: 70
    };

    expect(shouldNotifyJob(analysis)).toBe(true);
  });


  it("notifies a hidden-AI REVIEW job when junior compatibility is sufficient", () => {
    const analysis = {
      recommendation: "REVIEW",
      hidden_ai_automation_role: true,
      junior_compatibility: 50
    };

    expect(shouldNotifyJob(analysis)).toBe(true);
  });


  it("does not notify a hidden-AI job below the junior compatibility threshold", () => {
    const analysis = {
      recommendation: "REVIEW",
      hidden_ai_automation_role: true,
      junior_compatibility: 39
    };

    expect(shouldNotifyJob(analysis)).toBe(false);
  });


  it("does not notify a SKIP job", () => {
    const analysis = {
      recommendation: "SKIP",
      hidden_ai_automation_role: false,
      junior_compatibility: 90
    };

    expect(shouldNotifyJob(analysis)).toBe(false);
  });


  it("accepts exactly the junior compatibility threshold of 40", () => {
    const analysis = {
      recommendation: "APPLY",
      hidden_ai_automation_role: false,
      junior_compatibility: 40
    };

    expect(shouldNotifyJob(analysis)).toBe(true);
  });

});
import { describe, it, expect } from "vitest";
import { prefilterJob } from "../src/prefilter.js";

describe("prefilterJob", () => {
  it("accepts a junior AI Engineer role in France", () => {
    const job = {
      title: "Junior AI Engineer",
      company: "Test Company",
      location: "Paris, France",
      description:
        "Build AI agents and LLM applications using Python, REST APIs and Docker."
    };

    const result = prefilterJob(job);

    expect(result.pass_pre_filter).toBe(true);
  });
});

it("rejects a senior AI Engineer role", () => {
  const job = {
    title: "Senior AI Engineer",
    company: "Test Company",
    location: "Paris, France",
    description:
      "Build AI agents and LLM applications using Python and Docker."
  };

  const result = prefilterJob(job);

  expect(result.pass_pre_filter).toBe(false);
  expect(result.pre_filter.clearly_senior).toBe(true);
});


it("rejects an AI Engineer role located only in Canada", () => {
  const job = {
    title: "AI Engineer",
    company: "Test Company",
    location: "Toronto, Canada",
    description:
      "Build AI agents and LLM applications using Python."
  };

  const result = prefilterJob(job);

  expect(result.pass_pre_filter).toBe(false);
  expect(result.pre_filter.location_compatible).toBe(false);
});


it("accepts a hidden-AI Solutions Engineer role in France", () => {
  const job = {
    title: "Solutions Engineer",
    company: "Test Company",
    location: "Paris, France",
    description:
      "Integrate customer systems using REST APIs, RAG pipelines and Python."
  };

  const result = prefilterJob(job);

  expect(result.pass_pre_filter).toBe(true);
});


it("rejects a non-technical non-AI role", () => {
  const job = {
    title: "Marketing Coordinator",
    company: "Test Company",
    location: "Paris, France",
    description:
      "Coordinate marketing campaigns, events and communication activities."
  };

  const result = prefilterJob(job);

  expect(result.pass_pre_filter).toBe(false);
});
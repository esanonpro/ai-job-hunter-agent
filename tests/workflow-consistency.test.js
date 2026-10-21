import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";

let workflow;
let nodes;

beforeAll(async () => {
  const raw = await readFile(
    "workflows/ai-job-hunter-production.json",
    "utf8"
  );

  const exported = JSON.parse(raw);

  // L'export actuel peut encapsuler le workflow JSON dans "content".
  workflow =
    typeof exported.content === "string"
      ? JSON.parse(exported.content)
      : exported;

  nodes = workflow.nodes;
});


describe("n8n production workflow consistency", () => {

  it("contains a valid nodes array", () => {
    expect(Array.isArray(nodes)).toBe(true);
    expect(nodes.length).toBeGreaterThan(0);
  });


  it("contains the critical production nodes", () => {
    const nodeNames = nodes.map((node) => node.name);

    const requiredNodes = [
      "Fetch Lever Jobs",
      "Normalize Lever Jobs",
      "Fetch Greenhouse Jobs",
      "Normalize Greenhouse Jobs",
      "Merge Job Sources",
      "Pre-filter Jobs",
      "Filter Relevant Candidates",
      "Check New Job",
      "Limit Gemini Calls",
      "Loop Over Items",
      "Gemini - Analyze Job",
      "Gemini - Fallback",
      "Parse Gemini JSON",
      "Route Job Decision",
      "Insert New Job",
      "Send Job Alert"
    ];

    for (const name of requiredNodes) {
      expect(
        nodeNames,
        `Missing critical n8n node: ${name}`
      ).toContain(name);
    }
  });


  it("keeps the production pre-filter as a JavaScript Code node", () => {
    const node = nodes.find(
      (node) => node.name === "Pre-filter Jobs"
    );

    expect(node).toBeDefined();
    expect(node.type).toBe("n8n-nodes-base.code");
    expect(node.parameters?.jsCode).toBeTypeOf("string");
    expect(node.parameters.jsCode.length).toBeGreaterThan(0);
  });


  it("keeps the Gemini parser as a JavaScript Code node", () => {
    const node = nodes.find(
      (node) => node.name === "Parse Gemini JSON"
    );

    expect(node).toBeDefined();
    expect(node.type).toBe("n8n-nodes-base.code");
    expect(node.parameters?.jsCode).toBeTypeOf("string");
  });


  it("keeps the production routing node", () => {
    const node = nodes.find(
      (node) => node.name === "Route Job Decision"
    );

    expect(node).toBeDefined();
  });

});
import { describe, expect, it } from "vitest";
import { roles } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import type { Tag } from "./types";

const allowed: Tag[] = ["Games", "Web", "Mobile", "AI"];

describe("content integrity", () => {
  it("has at least 3 featured projects with tags", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects.length).toBeLessThanOrEqual(5);
    for (const p of projects) {
      expect(p.tags.length).toBeGreaterThan(0);
      for (const t of p.tags) expect(allowed).toContain(t);
    }
  });

  it("includes major CV roles", () => {
    const companies = roles.map((r) => r.company);
    expect(companies.some((c) => c.includes("Neeuro"))).toBe(true);
    expect(companies.some((c) => c.includes("Sovrun") || c.includes("BreederDAO"))).toBe(true);
    for (const r of roles) {
      expect(r.bullets.length).toBeGreaterThan(0);
      expect(r.tags.length).toBeGreaterThan(0);
    }
  });

  it("groups skills", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3);
  });
});

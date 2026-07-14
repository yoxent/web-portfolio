import { describe, expect, it } from "vitest";
import { roles } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { profile } from "./profile";
import type { Tag } from "./types";

const allowed: Tag[] = ["Games", "Web", "Mobile", "AI"];

describe("content integrity", () => {
  it("has a growing work catalog with valid tags and media paths", () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    for (const p of projects) {
      expect(p.tags.length).toBeGreaterThan(0);
      for (const t of p.tags) expect(allowed).toContain(t);
      if (p.media) {
        expect(p.media.length).toBeGreaterThan(0);
        for (const m of p.media) {
          expect(m.id.length).toBeGreaterThan(0);
          expect(m.label.length).toBeGreaterThan(0);
          expect(m.src.startsWith("/")).toBe(true);
        }
      }
    }
  });

  it("includes Sovrun simulations project linked to the Sovrun role", () => {
    const sovrun = projects.find((p) => p.id === "sovrun-ai-simulations");
    expect(sovrun).toBeTruthy();
    expect(sovrun!.roleId).toBe("sovrun");
    expect(sovrun!.media?.map((m) => m.id).sort()).toEqual(["mma", "sprint"]);
    expect(projects.some((p) => p.id === "virtual-labs-metaverse")).toBe(false);
  });

  it("includes major CV roles and enriched Sovrun bullets", () => {
    const companies = roles.map((r) => r.company);
    expect(companies.some((c) => c.includes("Neeuro"))).toBe(true);
    expect(companies.some((c) => c.includes("Sovrun") || c.includes("BreederDAO"))).toBe(true);
    const sovrun = roles.find((r) => r.id === "sovrun");
    expect(sovrun).toBeTruthy();
    expect(
      sovrun!.bullets.some((b) => b.includes("GOAP") && b.includes("Goal-Oriented Action Planning")),
    ).toBe(true);
    expect(sovrun!.bullets.some((b) => /sprint/i.test(b) && /JSON/i.test(b))).toBe(true);
    expect(sovrun!.bullets.filter((b) => /sprint/i.test(b)).every((b) => !/\bGOAP\b/.test(b))).toBe(
      true,
    );
    for (const r of roles) {
      expect(r.bullets.length).toBeGreaterThan(0);
      expect(r.tags.length).toBeGreaterThan(0);
    }
  });

  it("groups skills", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3);
  });

  it("exposes a portrait path on profile", () => {
    expect(profile.portraitPath).toBe("/portrait.jpg");
  });
});

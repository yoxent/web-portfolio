import { describe, expect, it } from "vitest";
import { roles } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { profile } from "./profile";
import { education } from "./education";
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

  it("links every work project to a resume role for timeline sorting", () => {
    const roleIds = new Set(roles.map((r) => r.id));
    for (const p of projects) {
      expect(p.roleId).toBeTruthy();
      expect(roleIds.has(p.roleId!)).toBe(true);
    }
  });

  it("includes Pasttime live link and hub thumbnail for web games", () => {
    const web = projects.find((p) => p.id === "web-games-platform");
    expect(web).toBeTruthy();
    expect(web!.links?.some((l) => l.href.includes("gamehub.pasttime.xyz"))).toBe(
      true,
    );
    const hub = web!.media?.find((m) => m.id === "hub");
    expect(hub?.kind).toBe("image");
    expect(hub?.src).toBe("/images/pasttime-hub.png");
    expect(hub?.href).toContain("gamehub.pasttime.xyz");
  });

  it("includes SCE hub thumbnail linked to the live demo", () => {
    const sce = projects.find((p) => p.id === "semantic-context-engine");
    expect(sce).toBeTruthy();
    expect(sce!.links).toBeUndefined();
    const hub = sce!.media?.find((m) => m.id === "hub");
    expect(hub?.kind).toBe("image");
    expect(hub?.src).toBe("/images/sce-hub.png");
    expect(hub?.href).toContain("sce-web.pasttime.xyz");
  });

  it("includes Neeuro Cogo, Memorie, and MindViewer store thumbnails", () => {
    const neeuro = projects.find((p) => p.id === "neeuro-eeg-bci");
    expect(neeuro).toBeTruthy();
    expect(neeuro!.links).toBeUndefined();
    expect(neeuro!.media?.map((m) => m.id)).toEqual([
      "cogo-play",
      "cogo-appstore",
      "memorie-play",
      "memorie-appstore",
      "mindviewer-play",
      "mindviewer-appstore",
    ]);
    expect(neeuro!.media?.map((m) => m.label)).toEqual([
      "Cogo - Google Play",
      "Cogo - App Store",
      "Memorie - Google Play",
      "Memorie - App Store",
      "MindViewer - Google Play",
      "MindViewer - App Store",
    ]);
    expect(neeuro!.media?.every((m) => m.kind === "image" && Boolean(m.href))).toBe(true);
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

  it("includes DLSU computer science education from the CV", () => {
    expect(education.length).toBeGreaterThanOrEqual(1);
    const dlsu = education.find((e) => e.id === "dlsu-bscs");
    expect(dlsu).toBeTruthy();
    expect(dlsu!.school).toContain("De La Salle");
    expect(dlsu!.degree).toMatch(/Computer Science/i);
  });
});

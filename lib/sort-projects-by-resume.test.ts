import { describe, expect, it } from "vitest";
import { roles } from "@/content/experience";
import { projects } from "@/content/projects";
import { sortProjectsByResumeTimeline } from "./sort-projects-by-resume";

describe("sortProjectsByResumeTimeline", () => {
  it("orders work by resume role timeline without needing visible dates", () => {
    const ordered = sortProjectsByResumeTimeline(projects, roles);
    expect(ordered.map((p) => p.id)).toEqual([
      "web-games-platform",
      "agentic-orchestration",
      "android-tv-remote",
      "sovrun-ai-simulations",
      "neeuro-eeg-bci",
    ]);
  });

  it("keeps same-role projects in the order they appear in projects content", () => {
    const sameRole = projects.filter((p) => p.roleId === "independent-fullstack-agentic");
    const ordered = sortProjectsByResumeTimeline(sameRole, roles);
    expect(ordered.map((p) => p.id)).toEqual([
      "web-games-platform",
      "agentic-orchestration",
    ]);
  });
});

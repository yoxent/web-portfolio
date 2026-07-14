import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("exposes hiring CTAs from the design spec", () => {
    expect(profile.email).toBe("xent.xent@gmail.com");
    expect(profile.github).toBe("https://github.com/yoxent/");
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/xentveran/");
    expect(profile.cvPath).toBe("/Vincent-Veran-CV.pdf");
    expect(profile.portraitPath).toBe("/portrait.jpg");
    expect(profile.title).toContain("Games");
    expect(profile.title).toContain("Full Stack");
    expect(profile.title).toContain("Agentic");
  });
});

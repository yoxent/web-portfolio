import { describe, expect, it } from "vitest";
import { resolveSkillIcon } from "./skill-icons";

describe("skill-icons", () => {
  it("resolves known tech logos", () => {
    expect(resolveSkillIcon("TypeScript").kind).toBe("simple");
    expect(resolveSkillIcon("Unity").kind).toBe("simple");
    expect(resolveSkillIcon("Unreal Engine").kind).toBe("simple");
  });

  it("falls back to letters when no logo exists", () => {
    const csharp = resolveSkillIcon("C#");
    expect(csharp.kind).toBe("fallback");
    if (csharp.kind === "fallback") expect(csharp.letter.length).toBeGreaterThan(0);
  });
});

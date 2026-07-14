import { describe, expect, it } from "vitest";
import { SHELL_TABS, parseShellTab, toShellHash, type ShellTab } from "./shell-tab";

describe("shell-tab", () => {
  it("lists the four panels in order", () => {
    expect(SHELL_TABS).toEqual(["about", "work", "resume", "contact"]);
  });

  it("parses known hashes and defaults unknowns to about", () => {
    expect(parseShellTab("#work")).toBe("work");
    expect(parseShellTab("resume")).toBe("resume");
    expect(parseShellTab("#nope")).toBe("about");
    expect(parseShellTab("")).toBe("about");
  });

  it("serializes tabs to hashes", () => {
    const tab: ShellTab = "contact";
    expect(toShellHash(tab)).toBe("#contact");
  });
});

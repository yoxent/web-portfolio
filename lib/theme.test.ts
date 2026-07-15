import { describe, expect, it } from "vitest";
import {
  THEME_TOKENS,
  isThemePreference,
  normalizeThemePreference,
  resolveTheme,
} from "./theme";

describe("theme", () => {
  it("validates preferences", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark-brass")).toBe(true);
    expect(isThemePreference("dark-ink")).toBe(true);
    expect(isThemePreference("system")).toBe(true);
    expect(isThemePreference("dark")).toBe(false);
    expect(isThemePreference("nope")).toBe(false);
  });

  it("normalizes legacy dark to brass", () => {
    expect(normalizeThemePreference("dark")).toBe("dark-brass");
    expect(normalizeThemePreference("dark-ink")).toBe("dark-ink");
    expect(normalizeThemePreference(null)).toBe("system");
  });

  it("resolves system from OS preference", () => {
    expect(resolveTheme("system", true)).toBe("dark-brass");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark-ink", false)).toBe("dark-ink");
  });

  it("exposes light and dark token maps", () => {
    expect(THEME_TOKENS.light.accent).toBe("#0f6b5c");
    expect(THEME_TOKENS["dark-brass"].accent).toBe("#d4a843");
    expect(THEME_TOKENS["dark-ink"].accent).toBe("#7aa2d4");
  });
});

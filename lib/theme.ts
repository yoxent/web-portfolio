export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEME_PREFERENCES = ["light", "dark-brass", "dark-ink", "system"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export type ResolvedTheme = "light" | "dark-brass" | "dark-ink";

export type ThemeTokens = {
  ink: string;
  paper: string;
  muted: string;
  accent: string;
  accentFg: string;
  hairline: string;
  bgGlow: string;
  selection: string;
};

/** Semantic tokens applied as inline CSS variables (beats cascade races with Tailwind). */
export const THEME_TOKENS: Record<ResolvedTheme, ThemeTokens> = {
  light: {
    ink: "#141414",
    paper: "#f3f4f6",
    muted: "#5c5f66",
    accent: "#0f6b5c",
    accentFg: "#f7fffc",
    hairline: "color-mix(in oklab, var(--ink) 12%, transparent)",
    bgGlow:
      "radial-gradient(1200px 600px at 10% -10%, #d9e4ef 0%, transparent 55%), radial-gradient(900px 500px at 90% 0%, #ddeae4 0%, transparent 50%), var(--paper)",
    selection: "color-mix(in oklab, var(--accent) 35%, white)",
  },
  "dark-brass": {
    ink: "#f0ebe3",
    paper: "#141210",
    muted: "#a39e94",
    accent: "#d4a843",
    accentFg: "#1a1508",
    hairline: "color-mix(in oklab, var(--ink) 14%, transparent)",
    bgGlow:
      "radial-gradient(1100px 560px at 8% -12%, #2a2318 0%, transparent 55%), radial-gradient(900px 500px at 92% 4%, #1f1a14 0%, transparent 50%), var(--paper)",
    selection: "color-mix(in oklab, var(--accent) 45%, black)",
  },
  "dark-ink": {
    ink: "#e8edf4",
    paper: "#0b0e14",
    muted: "#8f97a6",
    accent: "#7aa2d4",
    accentFg: "#0a1018",
    hairline: "color-mix(in oklab, var(--ink) 15%, transparent)",
    bgGlow:
      "radial-gradient(1100px 560px at 10% -10%, #152033 0%, transparent 55%), radial-gradient(900px 500px at 90% 0%, #121820 0%, transparent 50%), var(--paper)",
    selection: "color-mix(in oklab, var(--accent) 40%, black)",
  },
};

export function isThemePreference(value: string | null | undefined): value is ThemePreference {
  return (THEME_PREFERENCES as readonly string[]).includes(value ?? "");
}

/** Legacy `dark` values map to the brass dark scheme. */
export function normalizeThemePreference(
  value: string | null | undefined,
): ThemePreference {
  if (value === "dark") return "dark-brass";
  if (isThemePreference(value)) return value;
  return "system";
}

export function resolveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") return prefersDark ? "dark-brass" : "light";
  return preference;
}

export function applyTheme(preference: ThemePreference, prefersDark: boolean) {
  const resolved = resolveTheme(preference, prefersDark);
  const tokens = THEME_TOKENS[resolved];
  const root = document.documentElement;

  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved === "light" ? "light" : "dark";

  root.style.setProperty("--ink", tokens.ink);
  root.style.setProperty("--paper", tokens.paper);
  root.style.setProperty("--muted", tokens.muted);
  root.style.setProperty("--accent", tokens.accent);
  root.style.setProperty("--accent-fg", tokens.accentFg);
  root.style.setProperty("--hairline", tokens.hairline);
  root.style.setProperty("--bg-glow", tokens.bgGlow);
  root.style.setProperty("--selection", tokens.selection);
}

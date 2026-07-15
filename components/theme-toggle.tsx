"use client";

import {
  THEME_PREFERENCES,
  normalizeThemePreference,
  type ThemePreference,
} from "@/lib/theme";
import { useThemePreference } from "@/components/theme-preference";

const LABELS: Record<ThemePreference, string> = {
  light: "Light",
  "dark-brass": "Dark · Brass",
  "dark-ink": "Dark · Ink",
  system: "System",
};

type ThemeToggleProps = {
  className?: string;
  /** When true, draw a divider to the left (desktop tab-bar placement). */
  divided?: boolean;
};

export function ThemeToggle({ className = "", divided = false }: ThemeToggleProps) {
  const { preference, setPreference } = useThemePreference();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPreference(normalizeThemePreference(event.target.value));
  }

  return (
    <div
      className={`relative flex shrink-0 items-center ${
        divided ? "border-l border-[color:var(--hairline)] pl-3" : ""
      } ${className}`}
    >
      <select
        aria-label="Color theme"
        value={preference}
        onChange={onChange}
        className="appearance-none rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--paper)_88%,transparent)] py-1 pr-7 pl-2 text-[0.65rem] tracking-[0.12em] text-ink uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {THEME_PREFERENCES.map((id) => (
          <option key={id} value={id}>
            {LABELS[id]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-2 text-[0.6rem] text-muted"
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
}

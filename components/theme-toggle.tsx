"use client";

import { useEffect, useState } from "react";
import {
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
  applyTheme,
  normalizeThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const LABELS: Record<ThemePreference, string> = {
  light: "Light",
  "dark-brass": "Dark · Brass",
  "dark-ink": "Dark · Ink",
  system: "System",
};

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyStored = () => {
      const pref = normalizeThemePreference(
        window.localStorage.getItem(THEME_STORAGE_KEY),
      );
      setPreference(pref);
      applyTheme(pref, media.matches);
    };

    applyStored();
    media.addEventListener("change", applyStored);
    return () => media.removeEventListener("change", applyStored);
  }, []);

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = normalizeThemePreference(event.target.value);
    setPreference(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next, window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  return (
    <div className="relative ml-auto flex shrink-0 items-center border-l border-[color:var(--hairline)] pl-3">
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

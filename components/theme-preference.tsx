"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  normalizeThemePreference,
  type ThemePreference,
} from "@/lib/theme";

type ThemePreferenceContextValue = {
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(
  null,
);

export function ThemePreferenceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyStored = () => {
      const pref = normalizeThemePreference(
        window.localStorage.getItem(THEME_STORAGE_KEY),
      );
      setPreferenceState(pref);
      applyTheme(pref, media.matches);
    };

    applyStored();
    media.addEventListener("change", applyStored);
    return () => media.removeEventListener("change", applyStored);
  }, []);

  function setPreference(next: ThemePreference) {
    setPreferenceState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next, window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  return (
    <ThemePreferenceContext.Provider value={{ preference, setPreference }}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error("useThemePreference must be used within ThemePreferenceProvider");
  }
  return ctx;
}

"use client";

import { useEffect, useState } from "react";
import { ShellSidebar } from "@/components/shell-sidebar";
import { PanelAbout } from "@/components/panel-about";
import { PanelWork } from "@/components/panel-work";
import { PanelResume } from "@/components/panel-resume";
import { PanelContact } from "@/components/panel-contact";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemePreferenceProvider } from "@/components/theme-preference";
import {
  SHELL_TABS,
  parseShellTab,
  toShellHash,
  type ShellTab,
} from "@/lib/shell-tab";

const LABELS: Record<ShellTab, string> = {
  about: "About",
  work: "Work",
  resume: "Resume",
  contact: "Contact",
};

export function PortfolioShell() {
  const [tab, setTab] = useState<ShellTab>("about");

  useEffect(() => {
    setTab(parseShellTab(window.location.hash));
    const onHash = () => setTab(parseShellTab(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function selectTab(next: ShellTab) {
    setTab(next);
    const hash = toShellHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  }

  return (
    <ThemePreferenceProvider>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:h-dvh lg:min-h-0 lg:flex-row lg:gap-10 lg:overflow-hidden lg:py-8">
        <div className="relative shrink-0 lg:w-72 lg:overflow-y-auto">
          <div className="absolute top-0 right-0 z-10 lg:hidden">
            <ThemeToggle />
          </div>
          <ShellSidebar />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="sticky top-0 z-10 -mx-4 flex items-end justify-between gap-3 border-b border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] px-4 backdrop-blur-sm sm:mx-0 sm:px-0">
            <div
              role="tablist"
              aria-label="Portfolio sections"
              className="flex min-w-0 flex-1 gap-4 overflow-x-auto"
            >
              {SHELL_TABS.map((id) => {
                const selected = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    id={`tab-${id}`}
                    aria-controls={`panel-${id}`}
                    onClick={() => selectTab(id)}
                    className={`shrink-0 border-b-2 px-1 py-3 text-sm tracking-[0.12em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      selected
                        ? "border-accent text-ink"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    {LABELS[id]}
                  </button>
                );
              })}
            </div>
            <div className="hidden pb-2 lg:block">
              <ThemeToggle divided />
            </div>
          </div>

          <div
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            className="min-h-0 flex-1 overflow-y-auto py-6 pr-3 lg:pr-10"
          >
            {tab === "about" ? <PanelAbout /> : null}
            {tab === "work" ? <PanelWork /> : null}
            {tab === "resume" ? <PanelResume /> : null}
            {tab === "contact" ? <PanelContact /> : null}
          </div>
        </div>
      </div>
    </ThemePreferenceProvider>
  );
}

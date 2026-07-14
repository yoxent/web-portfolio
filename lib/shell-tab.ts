export const SHELL_TABS = ["about", "work", "resume", "contact"] as const;

export type ShellTab = (typeof SHELL_TABS)[number];

export function parseShellTab(hashOrTab: string): ShellTab {
  const raw = hashOrTab.replace(/^#/, "").trim().toLowerCase();
  return (SHELL_TABS as readonly string[]).includes(raw) ? (raw as ShellTab) : "about";
}

export function toShellHash(tab: ShellTab): string {
  return `#${tab}`;
}

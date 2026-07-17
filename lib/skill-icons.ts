import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

type SkillIconSource =
  | { kind: "simple"; icon: SimpleIcon }
  | { kind: "fallback"; letter: string };

function getSimpleIcon(exportName: string): SimpleIcon | null {
  const icon = (simpleIcons as Record<string, SimpleIcon | unknown>)[exportName];
  if (icon && typeof icon === "object" && "path" in icon && "title" in icon) {
    return icon as SimpleIcon;
  }
  return null;
}

/** Map displayed skill labels → simple-icons export name (or null for monogram fallback). */
const ICON_EXPORT_BY_LABEL: Record<string, string | null> = {
  "C#": null,
  "C++": "siCplusplus",
  Dart: "siDart",
  Java: "siOpenjdk",
  Kotlin: "siKotlin",
  "Next.js": "siNextdotjs",
  React: "siReact",
  "React Native": "siReact",
  TypeScript: "siTypescript",
  Unity: "siUnity",
  "Unreal Engine": "siUnrealengine",
  "Android Studio": "siAndroidstudio",
  "Claude AI / Anthropic SDK": "siAnthropic",
  Cursor: "siCursor",
  "Cloudflare Workers": "siCloudflareworkers",
  Flutter: "siFlutter",
  Git: "siGit",
  "Node.js": "siNodedotjs",
  OpenCode: "siOpencode",
  OpenRouter: "siOpenrouter",
  Perforce: "siPerforce",
  PlasticSCM: null,
  Pi: null,
  "VS/VSCode": null,
  Jira: "siJira",
  Markdown: "siMarkdown",
  Notion: "siNotion",
  Trello: "siTrello",
};

export function resolveSkillIcon(label: string): SkillIconSource {
  const exportName = ICON_EXPORT_BY_LABEL[label];
  if (exportName) {
    const icon = getSimpleIcon(exportName);
    if (icon) return { kind: "simple", icon };
  }
  const letter = label.replace(/[^A-Za-z0-9+#]/g, "").slice(0, 2).toUpperCase() || "?";
  return { kind: "fallback", letter };
}

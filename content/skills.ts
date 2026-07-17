import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      "C#",
      "C++",
      "Dart",
      "Java",
      "Kotlin",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
    ],
    tags: ["Web", "Mobile", "Games"],
  },
  {
    id: "game-engines",
    label: "Game Engines",
    items: ["Unity", "Unreal Engine"],
    tags: ["Games"],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      "Android Studio",
      "Claude AI / Anthropic SDK",
      "Cursor",
      "Cloudflare Workers",
      "Flutter",
      "Git",
      "Node.js",
      "OpenCode",
      "OpenRouter",
      "Perforce",
      "PlasticSCM",
      "Pi",
      "VS/VSCode",
    ],
    tags: ["Web", "Mobile", "AI", "Games"],
  },
  {
    id: "workflow",
    label: "Workflow",
    items: ["Jira", "Markdown", "Notion", "Trello"],
    tags: ["Web", "Mobile", "Games", "AI"],
  },
];

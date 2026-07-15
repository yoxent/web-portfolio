import type { FocusArea, Profile } from "./types";

export const profile: Profile = {
  name: "Vincent Oliver Veran",
  shortName: "Vincent Veran",
  title: "Senior Software Developer: Games · Full Stack · Agentic Systems",
  summary:
    "I build games, web products, and mobile tools, mainly Unity, Unreal, and modern TypeScript stacks. I also apply that same craft to agentic workflows that turn product ideas into working software.",
  aboutMore: [
    "I care about clear product goals, solid fundamentals, and collaborating well with design, research, and other engineers. If that sounds useful for what you’re building, I’m happy to talk.",
  ],
  seeking:
    "Open to senior roles spanning games, full stack product engineering, and agentic systems, remote or hybrid.",
  email: "xent.xent@gmail.com",
  phone: "+639278885000",
  location: "Quezon City, Philippines",
  github: "https://github.com/yoxent/",
  githubOrg: "https://github.com/IndiePH/",
  linkedin: "https://www.linkedin.com/in/xentveran/",
  cvPath: "/Vincent-Veran-CV.pdf",
  portraitPath: "/portrait.jpg",
};

/** About-page focus areas (inspired by a simple “what I work on” layout). */
export const focusAreas: FocusArea[] = [
  {
    id: "games",
    title: "Games",
    description: "Unity and Unreal: prototypes, sims, and shipped interactive experiences.",
    icon: "games",
  },
  {
    id: "full-stack",
    title: "Full stack",
    description: "TypeScript web products from APIs and domain logic through to the UI.",
    icon: "web",
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Practical apps and tools for phones and TV across platforms.",
    icon: "mobile",
  },
  {
    id: "agentic",
    title: "Agentic systems",
    description: "AI-assisted workflows that speed delivery without skipping judgment.",
    icon: "agentic",
  },
];

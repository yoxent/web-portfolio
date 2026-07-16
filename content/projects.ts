import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "semantic-context-engine",
    title: "Semantic Context Engine",
    blurb:
      "A local-first retrieval engine for AI coding agents with keyword, semantic, hybrid, and AST search, exposed as CLI and MCP, with a Cloudflare Workers + D1 demo over Atlassian docs.",
    tags: ["AI", "Web"],
    company: "Independent",
    roleId: "independent-sce",
    media: [
      {
        id: "hub",
        label: "SCE",
        kind: "image",
        src: "/images/sce-hub.png",
        href: "https://sce-web.pasttime.xyz/",
      },
    ],
  },
  {
    id: "web-games-platform",
    title: "Web Games Platform",
    blurb:
      "A full stack web games platform featuring Klondike Solitaire and Word Guess, with daily puzzle scheduling and shared domain logic across a monorepo.",
    tags: ["Web", "Games"],
    company: "Independent",
    roleId: "independent-fullstack-agentic",
    links: [{ label: "Pasttime", href: "https://gamehub.pasttime.xyz/" }],
    media: [
      {
        id: "hub",
        label: "Pasttime",
        kind: "image",
        src: "/images/pasttime-hub.png",
        href: "https://gamehub.pasttime.xyz/",
      },
    ],
  },
  {
    id: "agentic-orchestration",
    title: "Agentic Orchestration System",
    blurb:
      "An agentic orchestration system built with Claude AI and Cursor to automate multi-step development workflows, deployed on Cloudflare Workers.",
    tags: ["AI", "Web"],
    company: "Independent",
    roleId: "independent-fullstack-agentic",
  },
  {
    id: "sovrun-ai-simulations",
    title: "Sovrun AI Simulations",
    blurb:
      "Built striking and race sims in Unreal driven by parsed JSON. For MMA, GOAP (Goal-Oriented Action Planning) produced the fight plan and outcome for predetermined playback; the sprint race similarly played back predetermined results from JSON.",
    tags: ["Games", "AI"],
    company: "Sovrun",
    roleId: "sovrun",
    media: [
      {
        id: "mma",
        label: "MMA",
        src: "/videos/sovrun-mma.mp4",
      },
      {
        id: "sprint",
        label: "Sprint",
        src: "/videos/sovrun-sprint.mp4",
      },
    ],
  },
  {
    id: "neeuro-eeg-bci",
    title: "Neeuro Cognitive Training Apps",
    blurb:
      "Live mobile games and cognitive training apps in Unity integrating EEG/BCI hardware, shipped on Android and iOS.",
    tags: ["Games", "Mobile"],
    company: "Neeuro",
    roleId: "neeuro",
    media: [
      {
        id: "cogo-play",
        label: "Cogo - Google Play",
        kind: "image",
        src: "/images/neeuro-cogo-play.png",
        href: "https://play.google.com/store/apps/details?id=com.neeuro.cogo&hl=en_US",
      },
      {
        id: "cogo-appstore",
        label: "Cogo - App Store",
        kind: "image",
        src: "/images/neeuro-cogo-appstore.png",
        href: "https://apps.apple.com/us/app/cogo-attention-training/id1631065149",
      },
      {
        id: "memorie-play",
        label: "Memorie - Google Play",
        kind: "image",
        src: "/images/neeuro-memorie-play.png",
        href: "https://play.google.com/store/apps/details?id=com.neeuro.memorie",
      },
      {
        id: "memorie-appstore",
        label: "Memorie - App Store",
        kind: "image",
        src: "/images/neeuro-memorie-appstore.png",
        href: "https://apps.apple.com/us/app/memorie-hd/id1041865946",
      },
      {
        id: "mindviewer-play",
        label: "MindViewer - Google Play",
        kind: "image",
        src: "/images/neeuro-mindviewer-play.png",
        href: "https://play.google.com/store/apps/details?id=com.neeuro.mindviewer",
      },
      {
        id: "mindviewer-appstore",
        label: "MindViewer - App Store",
        kind: "image",
        src: "/images/neeuro-mindviewer-appstore.png",
        href: "https://apps.apple.com/us/app/mindviewer/id1436471710",
      },
    ],
  },
];

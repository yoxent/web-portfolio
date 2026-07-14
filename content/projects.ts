import type { Project } from "./types";

export const projects: Project[] = [
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
    id: "web-games-platform",
    title: "Web Games Platform",
    blurb:
      "A full stack web games platform featuring Klondike Solitaire and Word Guess, with daily puzzle scheduling and shared domain logic across a monorepo.",
    tags: ["Web", "Games"],
  },
  {
    id: "agentic-orchestration",
    title: "Agentic Orchestration System",
    blurb:
      "An agentic orchestration system built with Claude AI and Cursor to automate multi-step development workflows, deployed on Cloudflare Workers.",
    tags: ["AI", "Web"],
  },
  {
    id: "android-tv-remote",
    title: "Android TV Remote",
    blurb:
      "An Android app that replaces physical smart TV remotes, with device discovery, remote input mapping, and a one-handed touch UI.",
    tags: ["Mobile"],
  },
  {
    id: "neeuro-eeg-bci",
    title: "Neeuro Cognitive Training Apps",
    blurb:
      "Live mobile games and cognitive training apps in Unity integrating EEG/BCI hardware, shipped on Android and iOS.",
    tags: ["Games", "Mobile"],
  },
];

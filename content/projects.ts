import type { Project } from "./types";

export const projects: Project[] = [
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
  {
    id: "virtual-labs-metaverse",
    title: "Virtual Labs Metaverse",
    blurb:
      "A multiplayer metaverse built in Unreal Engine with realtime interactions, UI, accounts, and Pixel Streaming to the web.",
    tags: ["Games", "Web"],
  },
];

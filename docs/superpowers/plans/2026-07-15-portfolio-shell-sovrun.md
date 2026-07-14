# Portfolio App Shell + Sovrun Simulations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot the long-scroll portfolio into an editorial one-viewport app shell (About · Work · Resume · Contact) with sidebar portrait, and ship the first media-backed Work entry — Sovrun AI Simulations — with self-hosted 720p DemoPlayers.

**Architecture:** Client `PortfolioShell` owns tab state synced to URL hash. Typed `content/*` modules gain `portraitPath`, optional project `media` / `company` / `roleId`. Pure helpers handle tab parsing and single-active media playback; UI panels reuse existing filters/content. Static assets live under `public/`.

**Tech Stack:** Next.js App Router · TypeScript · Tailwind CSS v4 · next/font (Fraunces + Manrope) · Vitest · ffmpeg (asset prep) · Vercel Hobby

**Spec:** `docs/superpowers/specs/2026-07-15-portfolio-shell-sovrun-design.md`

## Global Constraints

- Follow the 2026-07-15 shell + Sovrun spec (layout IA supersedes the long-page IA in the 2026-07-14 design)
- Keep positioning: Games · Full Stack · Agentic Systems
- Contact: mailto `xent.xent@gmail.com`, GitHub `https://github.com/yoxent/`, LinkedIn `https://www.linkedin.com/in/xentveran/`
- Reuse existing editorial tokens (`--ink`, `--paper`, `--accent`, Fraunces/Manrope) — denser shell layout, not a yellow-on-black dashboard clone
- Work catalog is flat and **uncapped**; Sovrun replaces Virtual Labs in `projects.ts`
- MMA copy expands **GOAP (Goal-Oriented Action Planning)**; sprint mentions JSON → Unreal only
- Self-hosted 720p MP4 only (no YouTube embeds this milestone)
- Keep Experience tag filters inside Resume
- Hash deep links: `#about` `#work` `#resume` `#contact`
- Poster strategy: CSS placeholder (no generated stills)
- Commit after each task; `npm test` and `npm run build` must pass before deploy handoff
- Do not commit the ~85–96MB source recordings

---

## File Structure

```
web-portfolio/
├── public/
│   ├── Vincent-Veran-CV.pdf
│   ├── portrait.jpg              # from Xent01.jpg
│   └── videos/
│       ├── sovrun-mma.mp4        # 720p encode
│       └── sovrun-sprint.mp4
├── content/
│   ├── types.ts                  # + ProjectMedia, Project.media/company/roleId, Profile.portraitPath
│   ├── profile.ts
│   ├── projects.ts               # Sovrun replaces Virtual Labs
│   ├── experience.ts             # + Sovrun bullets
│   ├── skills.ts
│   ├── content-integrity.test.ts
│   └── profile.test.ts
├── lib/
│   ├── filter-by-tag.ts          # existing
│   ├── shell-tab.ts              # NEW: parse/serialize hash ↔ tab
│   ├── shell-tab.test.ts
│   ├── media-playback.ts         # NEW: single active media id
│   └── media-playback.test.ts
├── components/
│   ├── portfolio-shell.tsx       # NEW: sidebar + tabs + panel switch
│   ├── shell-sidebar.tsx         # NEW: portrait + identity + CTAs
│   ├── demo-player.tsx           # NEW: client video player
│   ├── panel-about.tsx           # NEW (or adapt about.tsx)
│   ├── panel-work.tsx            # NEW: project list + media grid
│   ├── panel-resume.tsx          # NEW: Experience + Skills
│   ├── panel-contact.tsx         # NEW (or adapt contact.tsx)
│   ├── experience.tsx            # keep filter UI; embed in Resume (drop Section chrome if needed)
│   ├── skills.tsx
│   ├── filter-chips.tsx
│   ├── reveal.tsx                # optional inside panels; keep reduced-motion behavior
│   ├── site-header.tsx           # stop using on `/` (delete or leave unused)
│   └── hero.tsx                  # stop using on `/`
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # render PortfolioShell only
│   └── globals.css               # shell layout helpers if needed
└── docs/superpowers/specs/2026-07-15-portfolio-shell-sovrun-design.md
```

**Locked plan choices (from open spec items):**

| Topic | Choice |
|-------|--------|
| Typefaces / tokens | Reuse Fraunces + Manrope and current CSS variables |
| Experience filters | Keep in Resume |
| Hash routing | On |
| Posters | CSS placeholder (muted block + label); optional `poster` field unused until stills exist |

---

### Task 1: Prepare portrait and 720p video assets

**Files:**
- Create: `public/portrait.jpg`
- Create: `public/videos/sovrun-mma.mp4`
- Create: `public/videos/sovrun-sprint.mp4`

- [ ] **Step 1: Confirm source files exist**

```powershell
Get-Item "E:\Google Drive\Xent01.jpg"
Get-Item "E:\Google Drive\Work\Recording\Sovrun\v1 mma.mp4"
Get-Item "E:\Google Drive\Work\Recording\Sovrun\v1 sprint.mp4"
```

Expected: three files listed with sizes.

- [ ] **Step 2: Ensure ffmpeg is available**

```powershell
ffmpeg -version
```

If missing, install (example via winget) then re-check:

```powershell
winget install --id Gyan.FFmpeg -e
ffmpeg -version
```

Expected: version banner prints.

- [ ] **Step 3: Copy portrait into public**

```powershell
New-Item -ItemType Directory -Force -Path public | Out-Null
Copy-Item "E:\Google Drive\Xent01.jpg" "public\portrait.jpg" -Force
```

- [ ] **Step 4: Encode MMA and sprint to 720p H.264**

```powershell
New-Item -ItemType Directory -Force -Path public\videos | Out-Null

ffmpeg -y -i "E:\Google Drive\Work\Recording\Sovrun\v1 mma.mp4" `
  -vf "scale=-2:720" -c:v libx264 -pix_fmt yuv420p -crf 28 -preset medium `
  -c:a aac -b:a 128k -movflags +faststart `
  "public\videos\sovrun-mma.mp4"

ffmpeg -y -i "E:\Google Drive\Work\Recording\Sovrun\v1 sprint.mp4" `
  -vf "scale=-2:720" -c:v libx264 -pix_fmt yuv420p -crf 28 -preset medium `
  -c:a aac -b:a 128k -movflags +faststart `
  "public\videos\sovrun-sprint.mp4"
```

- [ ] **Step 5: Verify outputs are much smaller than sources**

```powershell
Get-ChildItem public\portrait.jpg, public\videos\sovrun-mma.mp4, public\videos\sovrun-sprint.mp4 |
  Select-Object Name, @{N='MB';E={[math]::Round($_.Length/1MB,1)}}
```

Expected: each video ideally well under the ~85–96MB sources (target ballpark ~10–40MB each; if huge, raise `-crf` to 30 and re-encode).

- [ ] **Step 6: Commit**

```bash
git add public/portrait.jpg public/videos/sovrun-mma.mp4 public/videos/sovrun-sprint.mp4
git commit -m "assets: add portrait and Sovrun 720p demo videos"
```

---

### Task 2: Extend content types and integrity tests (TDD)

**Files:**
- Modify: `content/types.ts`
- Modify: `content/content-integrity.test.ts`
- Modify: `content/profile.test.ts`
- Modify: `content/profile.ts`
- Modify: `content/projects.ts`
- Modify: `content/experience.ts`

- [ ] **Step 1: Rewrite failing integrity expectations**

Replace `content/content-integrity.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { roles } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { profile } from "./profile";
import type { Tag } from "./types";

const allowed: Tag[] = ["Games", "Web", "Mobile", "AI"];

describe("content integrity", () => {
  it("has a growing work catalog with valid tags and media paths", () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    for (const p of projects) {
      expect(p.tags.length).toBeGreaterThan(0);
      for (const t of p.tags) expect(allowed).toContain(t);
      if (p.media) {
        expect(p.media.length).toBeGreaterThan(0);
        for (const m of p.media) {
          expect(m.id.length).toBeGreaterThan(0);
          expect(m.label.length).toBeGreaterThan(0);
          expect(m.src.startsWith("/")).toBe(true);
        }
      }
    }
  });

  it("includes Sovrun simulations project linked to the Sovrun role", () => {
    const sovrun = projects.find((p) => p.id === "sovrun-ai-simulations");
    expect(sovrun).toBeTruthy();
    expect(sovrun!.roleId).toBe("sovrun");
    expect(sovrun!.media?.map((m) => m.id).sort()).toEqual(["mma", "sprint"]);
    expect(projects.some((p) => p.id === "virtual-labs-metaverse")).toBe(false);
  });

  it("includes major CV roles and enriched Sovrun bullets", () => {
    const companies = roles.map((r) => r.company);
    expect(companies.some((c) => c.includes("Neeuro"))).toBe(true);
    expect(companies.some((c) => c.includes("Sovrun") || c.includes("BreederDAO"))).toBe(true);
    const sovrun = roles.find((r) => r.id === "sovrun");
    expect(sovrun).toBeTruthy();
    expect(sovrun!.bullets.some((b) => b.includes("GOAP") && b.includes("Goal-Oriented Action Planning"))).toBe(true);
    expect(sovrun!.bullets.some((b) => /sprint/i.test(b) && /JSON/i.test(b))).toBe(true);
    expect(sovrun!.bullets.filter((b) => /sprint/i.test(b)).every((b) => !/\bGOAP\b/.test(b))).toBe(true);
    for (const r of roles) {
      expect(r.bullets.length).toBeGreaterThan(0);
      expect(r.tags.length).toBeGreaterThan(0);
    }
  });

  it("groups skills", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3);
  });

  it("exposes a portrait path on profile", () => {
    expect(profile.portraitPath).toBe("/portrait.jpg");
  });
});
```

Update `content/profile.test.ts` to also assert portrait:

```ts
import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("exposes hiring CTAs from the design spec", () => {
    expect(profile.email).toBe("xent.xent@gmail.com");
    expect(profile.github).toBe("https://github.com/yoxent/");
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/xentveran/");
    expect(profile.cvPath).toBe("/Vincent-Veran-CV.pdf");
    expect(profile.portraitPath).toBe("/portrait.jpg");
    expect(profile.title).toContain("Games");
    expect(profile.title).toContain("Full Stack");
    expect(profile.title).toContain("Agentic");
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL on missing `portraitPath`, `media`, Sovrun project, etc.

- [ ] **Step 3: Extend types**

Update `content/types.ts` to:

```ts
export type Tag = "Games" | "Web" | "Mobile" | "AI";

export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  shortName: string;
  title: string;
  summary: string;
  seeking?: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  githubOrg?: string;
  linkedin: string;
  cvPath: string;
  portraitPath: string;
};

export type ProjectMedia = {
  id: string;
  label: string;
  src: string;
  poster?: string;
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: Tag[];
  links?: Link[];
  media?: ProjectMedia[];
  company?: string;
  roleId?: string;
};

export type Role = {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  stack: string[];
  tags: Tag[];
  bullets: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
  tags: Tag[];
};
```

- [ ] **Step 4: Update profile, projects, experience content**

Add to `content/profile.ts`:

```ts
  portraitPath: "/portrait.jpg",
```

In `content/projects.ts`, **remove** the `virtual-labs-metaverse` entry and **add**:

```ts
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
```

Keep the other four projects (web games, agentic, android TV, neeuro). Prefer putting Sovrun near the top of the array (first or second).

In `content/experience.ts`, update the `sovrun` role:

```ts
  {
    id: "sovrun",
    company: "Sovrun (formerly BreederDAO)",
    title: "Game Developer",
    start: "Aug 2023",
    end: "Jan 2026",
    location: "Philippines, Hybrid",
    stack: ["Unity", "Unreal"],
    tags: ["Games"],
    bullets: [
      "Contributed to experimental games and simulations R&D spanning blockchain, autonomous worlds, AI simulations, and multiplayer systems.",
      "Collaborated across design, research, blockchain, and AI teams to ship prototypes and live features.",
      "Built a striking-only MMA sim in Unreal: GOAP (Goal-Oriented Action Planning) generated the fight plan and outcome, delivered as JSON and parsed for predetermined playback.",
      "Built a sprint race sim in Unreal driven by parsed JSON with a predetermined race outcome.",
    ],
  },
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add content/types.ts content/profile.ts content/profile.test.ts content/projects.ts content/experience.ts content/content-integrity.test.ts
git commit -m "feat: extend content model for shell portrait and Sovrun media"
```

---

### Task 3: Shell tab hash helpers (TDD)

**Files:**
- Create: `lib/shell-tab.ts`
- Create: `lib/shell-tab.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from "vitest";
import { SHELL_TABS, parseShellTab, toShellHash, type ShellTab } from "./shell-tab";

describe("shell-tab", () => {
  it("lists the four panels in order", () => {
    expect(SHELL_TABS).toEqual(["about", "work", "resume", "contact"]);
  });

  it("parses known hashes and defaults unknowns to about", () => {
    expect(parseShellTab("#work")).toBe("work");
    expect(parseShellTab("resume")).toBe("resume");
    expect(parseShellTab("#nope")).toBe("about");
    expect(parseShellTab("")).toBe("about");
  });

  it("serializes tabs to hashes", () => {
    const tab: ShellTab = "contact";
    expect(toShellHash(tab)).toBe("#contact");
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- lib/shell-tab.test.ts
```

Expected: FAIL (module missing).

- [ ] **Step 3: Implement**

```ts
export const SHELL_TABS = ["about", "work", "resume", "contact"] as const;

export type ShellTab = (typeof SHELL_TABS)[number];

export function parseShellTab(hashOrTab: string): ShellTab {
  const raw = hashOrTab.replace(/^#/, "").trim().toLowerCase();
  return (SHELL_TABS as readonly string[]).includes(raw)
    ? (raw as ShellTab)
    : "about";
}

export function toShellHash(tab: ShellTab): string {
  return `#${tab}`;
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- lib/shell-tab.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/shell-tab.ts lib/shell-tab.test.ts
git commit -m "feat: add shell tab hash helpers"
```

---

### Task 4: Single-active media playback helper (TDD)

**Files:**
- Create: `lib/media-playback.ts`
- Create: `lib/media-playback.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from "vitest";
import { createMediaPlaybackController } from "./media-playback";

describe("media-playback", () => {
  it("tracks a single active media id", () => {
    const c = createMediaPlaybackController();
    expect(c.getActiveId()).toBeNull();
    c.requestPlay("mma");
    expect(c.getActiveId()).toBe("mma");
    c.requestPlay("sprint");
    expect(c.getActiveId()).toBe("sprint");
    c.notifyPaused("sprint");
    expect(c.getActiveId()).toBeNull();
  });

  it("ignores pause notifications for non-active ids", () => {
    const c = createMediaPlaybackController();
    c.requestPlay("mma");
    c.notifyPaused("sprint");
    expect(c.getActiveId()).toBe("mma");
  });

  it("notifies subscribers when the active id changes", () => {
    const c = createMediaPlaybackController();
    const seen: Array<string | null> = [];
    const unsub = c.subscribe((id) => seen.push(id));
    c.requestPlay("mma");
    c.requestPlay("sprint");
    unsub();
    c.requestPlay("mma");
    expect(seen).toEqual(["mma", "sprint"]);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- lib/media-playback.test.ts
```

- [ ] **Step 3: Implement**

```ts
export type MediaPlaybackListener = (activeId: string | null) => void;

export function createMediaPlaybackController() {
  let activeId: string | null = null;
  const listeners = new Set<MediaPlaybackListener>();

  function emit() {
    for (const listener of listeners) listener(activeId);
  }

  return {
    getActiveId() {
      return activeId;
    },
    requestPlay(id: string) {
      if (activeId === id) return;
      activeId = id;
      emit();
    },
    notifyPaused(id: string) {
      if (activeId !== id) return;
      activeId = null;
      emit();
    },
    subscribe(listener: MediaPlaybackListener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export type MediaPlaybackController = ReturnType<typeof createMediaPlaybackController>;

/** Shared singleton for site-wide single playback */
export const mediaPlayback = createMediaPlaybackController();
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- lib/media-playback.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/media-playback.ts lib/media-playback.test.ts
git commit -m "feat: add single-active media playback controller"
```

---

### Task 5: DemoPlayer component

**Files:**
- Create: `components/demo-player.tsx`

- [ ] **Step 1: Implement client DemoPlayer**

```tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { mediaPlayback } from "@/lib/media-playback";

type DemoPlayerProps = {
  mediaId: string;
  label: string;
  src: string;
};

export function DemoPlayer({ mediaId, label, src }: DemoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelId = useId();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return mediaPlayback.subscribe((activeId) => {
      const el = videoRef.current;
      if (!el) return;
      if (activeId !== mediaId && !el.paused) {
        el.pause();
      }
    });
  }, [mediaId]);

  function onPlay() {
    mediaPlayback.requestPlay(mediaId);
    setPlaying(true);
  }

  function onPause() {
    mediaPlayback.notifyPaused(mediaId);
    setPlaying(false);
  }

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  return (
    <figure
      className="min-w-0"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative overflow-hidden rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_6%,transparent)]">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-ink/90 object-contain"
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-labelledby={labelId}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onPause}
        />
        {!playing ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_35%,transparent)] text-sm tracking-[0.15em] text-accent-fg uppercase transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Play {label}
          </button>
        ) : null}
      </div>
      <figcaption id={labelId} className="mt-2 text-xs tracking-[0.15em] text-muted uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Manual smoke later** (after shell exists) — do not block commit if TypeScript clean:

```bash
npx tsc --noEmit
```

Expected: no errors related to `demo-player.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/demo-player.tsx
git commit -m "feat: add DemoPlayer with single-active playback"
```

---

### Task 6: Panel components (About, Work, Resume, Contact)

**Files:**
- Create: `components/panel-about.tsx`
- Create: `components/panel-work.tsx`
- Create: `components/panel-resume.tsx`
- Create: `components/panel-contact.tsx`
- Modify: `components/experience.tsx` (optional compact mode — prefer embedding as-is without outer `Section` if it fights panel padding; simplest path: keep Experience/Skills and wrap them)

- [ ] **Step 1: Create panel-about.tsx**

```tsx
import { profile } from "@/content/profile";

export function PanelAbout() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">About</h2>
      <div className="h-0.5 w-10 bg-accent" aria-hidden />
      <p className="max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{profile.summary}</p>
      {profile.seeking ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{profile.seeking}</p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Create panel-work.tsx**

```tsx
import { projects } from "@/content/projects";
import { DemoPlayer } from "@/components/demo-player";

export function PanelWork() {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Work</h2>
      <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      <div className="mt-6 border-t border-[color:var(--hairline)]">
        {projects.map((project) => (
          <article
            key={project.id}
            className="border-b border-[color:var(--hairline)] py-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div className="sm:max-w-2xl">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  {project.title}
                </h3>
                {project.company ? (
                  <p className="mt-1 text-xs tracking-[0.15em] text-muted uppercase">
                    {project.company}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {project.blurb}
                </p>
                {project.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="shrink-0 text-xs tracking-[0.15em] text-muted uppercase sm:text-right">
                {project.tags.join(" · ")}
              </p>
            </div>
            {project.media?.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.media.map((m) => (
                  <DemoPlayer
                    key={m.id}
                    mediaId={`${project.id}:${m.id}`}
                    label={m.label}
                    src={m.src}
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create panel-resume.tsx**

Reuse existing client components. Strip duplicate page-level `Section` titles by importing Experience/Skills as today **or** inline a thin wrapper. Prefer:

```tsx
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";

export function PanelResume() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Resume</h2>
        <div className="mt-2 h-0.5 w-10 bg-accent" aria-hidden />
      </div>
      <Experience />
      <Skills />
    </div>
  );
}
```

Then update `components/experience.tsx` and `components/skills.tsx` so their `Section` titles become nested headings (`Experience`, `Skills`) **without** conflicting page `id`s — change `id="experience"` → remove outer section id or use `id={undefined}` pattern. Minimal change: keep `Section` but change titles to remain "Experience" / "Skills" and leave ids (`experience`, `skills`) for in-panel anchors (hash remains `#resume` for the shell).

If `Section` forces large vertical padding that breaks the shell, pass denser classes or create a `compact` prop. Target: filters still work.

- [ ] **Step 4: Create panel-contact.tsx**

```tsx
import { profile } from "@/content/profile";

export function PanelContact() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">Contact</h2>
      <div className="h-0.5 w-10 bg-accent" aria-hidden />
      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        {profile.location} — reach out by email, or find me on GitHub and LinkedIn.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          LinkedIn
        </a>
        <a
          href={profile.cvPath}
          download
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/panel-about.tsx components/panel-work.tsx components/panel-resume.tsx components/panel-contact.tsx components/experience.tsx components/skills.tsx
git commit -m "feat: add shell panel views for about work resume contact"
```

---

### Task 7: PortfolioShell + sidebar

**Files:**
- Create: `components/shell-sidebar.tsx`
- Create: `components/portfolio-shell.tsx`
- Modify: `app/globals.css` (shell layout utilities if needed)

- [ ] **Step 1: Implement shell-sidebar.tsx**

```tsx
import Image from "next/image";
import { profile } from "@/content/profile";

export function ShellSidebar() {
  return (
    <aside className="flex flex-col gap-6 border-[color:var(--hairline)] lg:border-r lg:pr-8">
      <div className="relative aspect-square w-28 overflow-hidden rounded-sm sm:w-36 lg:w-40">
        <Image
          src={profile.portraitPath}
          alt={profile.name}
          fill
          sizes="160px"
          className="object-cover"
          priority
        />
      </div>
      <div>
        <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {profile.name}
        </p>
        <p className="mt-2 text-xs tracking-[0.12em] text-muted uppercase sm:text-sm">
          {profile.title}
        </p>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={profile.cvPath}
          download
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Download CV
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Email
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-ink underline decoration-[color:var(--hairline)] underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          LinkedIn
        </a>
      </div>
    </aside>
  );
}
```

If `next/image` requires config for local static files, default App Router allows `/portrait.jpg` from `public/` with no remotePatterns. If build complains about missing size, the `fill` + parent `relative` pattern above is correct.

- [ ] **Step 2: Implement portfolio-shell.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { ShellSidebar } from "@/components/shell-sidebar";
import { PanelAbout } from "@/components/panel-about";
import { PanelWork } from "@/components/panel-work";
import { PanelResume } from "@/components/panel-resume";
import { PanelContact } from "@/components/panel-contact";
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
      window.history.pushState(null, "", hash);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:h-dvh lg:min-h-0 lg:flex-row lg:gap-10 lg:overflow-hidden lg:py-8">
      <div className="shrink-0 lg:w-72 lg:overflow-y-auto">
        <ShellSidebar />
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div
          role="tablist"
          aria-label="Portfolio sections"
          className="sticky top-0 z-10 -mx-4 flex gap-4 overflow-x-auto border-b border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] px-4 backdrop-blur-sm sm:mx-0 sm:px-0"
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

        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className="min-h-0 flex-1 overflow-y-auto py-6"
        >
          {tab === "about" ? <PanelAbout /> : null}
          {tab === "work" ? <PanelWork /> : null}
          {tab === "resume" ? <PanelResume /> : null}
          {tab === "contact" ? <PanelContact /> : null}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/shell-sidebar.tsx components/portfolio-shell.tsx app/globals.css
git commit -m "feat: add editorial portfolio app shell"
```

---

### Task 8: Wire `/` to PortfolioShell and retire long-page chrome

**Files:**
- Modify: `app/page.tsx`
- Optional delete or leave unused: `components/site-header.tsx`, `components/hero.tsx`, `components/about.tsx`, `components/featured-work.tsx`, `components/contact.tsx` (prefer delete only after confirming nothing imports them)

- [ ] **Step 1: Replace page.tsx**

```tsx
import { PortfolioShell } from "@/components/portfolio-shell";

export default function HomePage() {
  return <PortfolioShell />;
}
```

- [ ] **Step 2: Remove unused long-page components**

```bash
git rm components/site-header.tsx components/hero.tsx components/about.tsx components/featured-work.tsx components/contact.tsx
```

Keep `section.tsx` / `reveal.tsx` if Experience/Skills still use them.

- [ ] **Step 3: Run tests and build**

```bash
npm test
npm run build
```

Expected: PASS / build succeeds. Fix any Image or unused-import issues.

- [ ] **Step 4: Manual checklist**

1. Desktop: page fits one viewport; only Work/Resume panel scrolls when overflowing  
2. Tabs update hash (`#work`) and restore on reload  
3. Sidebar shows portrait + name + CTAs  
4. Work: Sovrun row shows two DemoPlayers side-by-side; playing one pauses the other  
5. Right-click on player surface does not show download-centric menu (best-effort)  
6. Resume: Experience filters still work; Sovrun bullets mention GOAP and sprint JSON  
7. Mobile: stacked identity, sticky tabs, usable scroll  

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git add -u components/
git commit -m "feat: ship app shell as home page"
```

---

### Task 9: Polish + deploy readiness

**Files:**
- Modify: `app/globals.css` / panel spacing as needed after manual pass
- Modify: `README.md` only if run instructions change (optional)

- [ ] **Step 1: Fix any visual overflow** (sidebar title wrapping, tab clipping, video controls competing with overlay — remove overlay once playing is fine; if overlay fights native controls, drop the overlay and rely on native controls + figcaption)

- [ ] **Step 2: Final verification**

```bash
npm test
npm run build
```

- [ ] **Step 3: Commit polish if any**

```bash
git add -A
git commit -m "polish: app shell spacing and player affordances"
```

(Skip empty commit if no changes.)

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| App-shell rewrite, editorial tokens | 7–8 |
| Tabs About · Work · Resume · Contact | 3, 6, 7 |
| Sidebar portrait from Xent01 | 1, 2, 7 |
| Mobile stack + sticky tabs | 7 |
| Desktop panel scroll only | 7 |
| Flat Work catalog, no ≤5 cap | 2, 6 |
| Sovrun replaces Virtual Labs | 2 |
| GOAP expansion; sprint JSON-only | 2 |
| Self-hosted 720p videos | 1, 2, 5, 6 |
| Side-by-side DemoPlayers | 5, 6 |
| Single active playback + contextmenu block | 4, 5 |
| Hash deep links | 3, 7 |
| Experience filters in Resume | 6 |
| Growth path (content-only adds) | 2 types + `panel-work` |
| Integrity tests updated | 2 |
| No YouTube / no dark dashboard clone | constraints + Tasks 5–8 |

**Type consistency:** `ShellTab`, `ProjectMedia`, `mediaPlayback`, `portraitPath`, project id `sovrun-ai-simulations`, media ids `mma` / `sprint`, roleId `sovrun` are used consistently across tasks.

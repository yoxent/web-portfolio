# Portfolio App Shell + Sovrun Simulations — Design Spec

**Date:** 2026-07-15  
**Status:** Approved for planning  
**Owner:** Vincent Oliver Veran  
**Scope:** Pivot the existing long-scroll portfolio to an editorial one-viewport app shell, and add the first media-backed Work entry (Sovrun sims), with a content model ready for more projects later.

## Goal

Replace the long multi-section page with a compact **editorial app shell** (inspired by [aakashrajbanshi.com.np](https://aakashrajbanshi.com.np/) structure, not its dark yellow-card look): sidebar identity + tabbed main panels. Populate Work with a growing flat project catalog; ship **Sovrun AI Simulations** first with self-hosted playable demos. Keep CV download and contact links as primary CTAs.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Layout | App-shell rewrite (sidebar + tabs), not CSS-only restack of the long page |
| Visual direction | Editorial / studio shell — not a dark dashboard clone of the reference |
| Panels | About · Work · Resume · Contact |
| Portrait | Sidebar (always visible); source `E:\Google Drive\Xent01.jpg` → `public/portrait.jpg` |
| Mobile | Stacked identity + sticky tabs + scrollable panel (outer page may scroll lightly) |
| Desktop scroll | Outer page ≈ `100dvh` no scroll; **panel body may scroll** |
| Work catalog | Flat list; optional `company` / `roleId`; **no ≤5 project cap** |
| First Sovrun placement | Work entry replacing Virtual Labs highlight + richer Sovrun Experience bullets |
| Video hosting | Self-hosted 720p H.264 MP4 (not YouTube) |
| Video layout | Side-by-side DemoPlayers (stack on small screens) |
| Player | Custom `DemoPlayer` (poster + controls; one playing at a time; contextmenu blocked on surface) |
| MMA copy | Expand GOAP as **Goal-Oriented Action Planning** on first mention in Work and in Experience |
| Sprint copy | JSON → Unreal sim only; do **not** invent GOAP/ROAD/LLM for sprint |
| Filters | Keep Experience tag filters in Resume if they fit the panel; otherwise compact list |
| Reference site | Structure inspiration only |

## Non-goals (this milestone)

- Contact form / email API
- Blog
- Deep case-study routes (`/work/[slug]`)
- YouTube / Drive embeds
- Cloning the reference’s dark + yellow card aesthetic
- Forcing zero scroll on mobile
- Full DRM / truly unbreakable “no download” video
- Populating every past role with projects (future content passes)

## Relationship to prior spec

Supersedes the **layout / IA** of `docs/superpowers/specs/2026-07-14-portfolio-design.md` for the shipped UI. Positioning, contact targets, content-as-TS-modules, Vercel Hobby deploy, and generalist framing **remain**. Content accuracy for Sovrun is defined here.

## Architecture

### Stack (unchanged)

- Next.js App Router · TypeScript · Tailwind · Vitest · Vercel Hobby
- Typed content under `content/`
- Static assets under `public/`

### App shape

- Single route: `/`
- Client `PortfolioShell` owns tab state: `about | work | resume | contact`
- Hash sync for shareable deep links (`#about`, `#work`, `#resume`, `#contact`)
- No long sticky top nav; sidebar carries identity + primary CTAs

### Content model

```ts
// Illustrative — exact shapes locked in implementation plan
Profile {
  name, shortName, title, summary, seeking?,
  email, phone, location, github, linkedin, cvPath,
  portraitPath
}

ProjectMedia { id, label, src, poster? }

Project {
  id, title, blurb, tags: Tag[],
  links?: Link[],
  media?: ProjectMedia[],
  company?: string,
  roleId?: string  // e.g. "sovrun"
}

Role { /* existing */ }
SkillGroup { /* existing */ }
Tag = "Games" | "Web" | "Mobile" | "AI"
```

### Work growth path

Adding a project later should be:

1. Append an object to `content/projects.ts`
2. Optionally add video/poster files under `public/videos/` (and `poster` paths)
3. Optionally set `company` / `roleId` for context under the title

No shell redesign required.

### Integrity tests (updated)

- Projects: at least 1; each has ≥1 valid tag; if `media` is present, `src` paths are non-empty (file existence checks optional / CI-friendly)
- Remove hard upper bound of 5 projects
- Roles still include Neeuro and Sovrun (or BreederDAO)
- New: profile has `portraitPath`

## Shell UI

### Desktop

- Two-pane editorial composition filling ≈ viewport height
- **Sidebar:** portrait, name (brand-level), title line (Games · Full Stack · Agentic Systems), CV / GitHub / LinkedIn / mailto
- **Main:** tab bar + one active panel; only the panel scrolls when content overflows

### Mobile

- Identity block on top (including portrait)
- Sticky tab bar
- Active panel below; page may scroll

### Panels

| Tab | Contents |
|-----|----------|
| About | Profile summary + optional seeking |
| Work | Flat project list/rows; media grid when `media` present |
| Resume | Experience (filters if fit) + Skills groups |
| Contact | Mailto, LinkedIn, GitHub, Download CV |

## Sovrun content (first media project)

### Work entry

- **Title:** Sovrun AI Simulations
- **Replaces:** Virtual Labs Metaverse in the featured/project list
- **Tags:** `Games`, `AI`
- **Company / roleId:** Sovrun / `sovrun`
- **Blurb (intent):** Built striking and race sims in Unreal driven by parsed JSON. For MMA, **GOAP (Goal-Oriented Action Planning)** produced the fight plan and outcome for predetermined playback; the sprint race similarly played back predetermined results from JSON (no sprint planner named).
- **Media:**
  - MMA — `public/videos/sovrun-mma.mp4` (from `v1 mma.mp4`, encoded 720p)
  - Sprint — `public/videos/sovrun-sprint.mp4` (from `v1 sprint.mp4`, encoded 720p)
- YouTube URLs exist but are **not** used in v1 of this milestone (self-host preferred for chrome control)

### Experience bullets (Sovrun role)

Keep existing high-level R&D bullets; add:

1. Built a striking-only MMA sim in Unreal: **GOAP (Goal-Oriented Action Planning)** generated the fight plan and outcome, delivered as JSON and parsed for predetermined playback.
2. Built a sprint race sim in Unreal driven by parsed JSON with a predetermined race outcome.

Stack for the role should clearly include Unreal (Unity may remain if accurate for other work).

### DemoPlayer behavior

- Client component; poster + play affordance; editorial controls over stock chrome where practical
- Side-by-side under the Sovrun Work row; stack on narrow widths
- Only one DemoPlayer playing at a time site-wide
- `contextmenu` prevented on the player wrapper (best-effort; not DRM)
- Keyboard operable; visible focus; respect `prefers-reduced-motion`

### Asset prep

- Copy/encode portrait from `E:\Google Drive\Xent01.jpg`
- Encode sources with ffmpeg to 720p H.264 MP4 (install ffmpeg if missing on the machine)
- Keep file sizes reasonable for Vercel Hobby / git; do not commit the ~85–96MB originals

## Files likely touched

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx` (as needed)
- `components/portfolio-shell.tsx` (new), panel views, `demo-player.tsx` (new)
- Retire or slim long-page-only header/section wiring
- `content/types.ts`, `profile.ts`, `projects.ts`, `experience.ts`
- `content/content-integrity.test.ts`
- `public/portrait.jpg`, `public/videos/sovrun-*.mp4`

## Success criteria

- On a laptop viewport, the shell reads as one composition (sidebar + active panel) without a long marketing scroll
- Hiring manager can open Work, play MMA and sprint demos inline, and understand GOAP vs JSON-only sprint accurately
- Adding a future project is a content (+ optional media) change, not an architecture change
- Mobile remains usable via stack + sticky tabs
- `npm test` and `npm run build` pass; portrait and video assets load in production build

## Open implementation details (plan may choose)

- Exact typefaces / accent within editorial constraints (may reuse current tokens)
- Whether Experience filters stay — preference: keep if panel UX remains clear
- Poster frame strategy — generated still vs CSS placeholder if no stills (plan picks one)

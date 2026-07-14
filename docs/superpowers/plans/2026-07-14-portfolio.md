# Interactive Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a polished single-page editorial portfolio for Vincent Veran on Vercel Hobby, backed by typed content from his CV, with filters, PDF download, and mailto/GitHub/LinkedIn CTAs.

**Architecture:** Next.js App Router single page (`/`) composed of section components fed by `content/*.ts` modules. Client-side tag filtering lives in a pure util + small client components. Static PDF in `public/`. No backend or env vars.

**Tech Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next/font (Google) · Vitest · Vercel Hobby

## Global Constraints

- Follow design spec: `docs/superpowers/specs/2026-07-14-portfolio-design.md`
- Positioning line must be: Games · Full Stack · Agentic Systems
- Contact: mailto `xent.xent@gmail.com`, GitHub `https://github.com/yoxent/`, LinkedIn `https://www.linkedin.com/in/xentveran/`
- Visual: editorial/studio; no purple-gradient theme; no cream+terracotta default; no dark-cyber glow stack
- Brand name is hero-level (not only nav); first viewport = one composition
- Prefer editorial rows over card grids for featured work
- Filters: `All | Games | Web | Mobile | AI`
- No contact form, blog, or case-study routes in v1
- Commit after each task; `npm run build` must pass before deploy handoff

---

## File Structure

```
web-portfolio/
├── public/
│   └── Vincent-Veran-CV.pdf
├── content/
│   ├── types.ts          # shared Tag + content types
│   ├── profile.ts        # name, links, summary, cv path
│   ├── projects.ts       # featured work
│   ├── experience.ts     # roles
│   └── skills.ts         # skill groups
├── lib/
│   └── filter-by-tag.ts  # pure filter helper
├── components/
│   ├── site-header.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── featured-work.tsx
│   ├── experience.tsx    # client: filters roles
│   ├── skills.tsx        # client: filters groups/items
│   ├── contact.tsx
│   ├── filter-chips.tsx  # client
│   ├── section.tsx       # section wrapper + id
│   └── reveal.tsx        # scroll reveal wrapper (client)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── vitest.config.ts
└── lib/filter-by-tag.test.ts
```

Each content file owns data only. Presentational components import content; filter UI owns UI state only.

---

### Task 1: Scaffold Next.js + Vitest

**Files:**
- Create: Next.js app files via `create-next-app` in repo root (keep existing `docs/` and CV)
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts)
- Create: `lib/filter-by-tag.test.ts` (placeholder imported later)

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev`, `npm run build`, `npm test`

- [ ] **Step 1: Scaffold in repo root without clobbering docs**

From `e:\Projects\Web\web-portfolio`, if no `package.json` yet:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --turbopack --yes
```

If the tool refuses a non-empty directory, scaffold into a temp folder and move app files into root (preserve `docs/`, `.git`, CV).

- [ ] **Step 2: Add Vitest**

```bash
npm install -D vitest
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify scaffold**

```bash
npm test
npm run build
```

Expected: Vitest exits 0 (0 tests OK) or reports no tests; `build` succeeds.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json app components public next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts README.md .gitignore
git commit -m "chore: scaffold Next.js portfolio with Vitest"
```

(Only add files that exist; do not add the CV PDF yet.)

---

### Task 2: Content types + profile + PDF asset

**Files:**
- Create: `content/types.ts`
- Create: `content/profile.ts`
- Modify: copy CV → `public/Vincent-Veran-CV.pdf`
- Test: `content/profile.test.ts` (asserts required links)

**Interfaces:**
- Consumes: none
- Produces:
  - `export type Tag = "Games" | "Web" | "Mobile" | "AI"`
  - `export type Link = { label: string; href: string }`
  - `export const profile: Profile` with fields below

- [ ] **Step 1: Write failing profile test**

Create `content/profile.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile", () => {
  it("exposes hiring CTAs from the design spec", () => {
    expect(profile.email).toBe("xent.xent@gmail.com");
    expect(profile.github).toBe("https://github.com/yoxent/");
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/xentveran/");
    expect(profile.cvPath).toBe("/Vincent-Veran-CV.pdf");
    expect(profile.title).toContain("Games");
    expect(profile.title).toContain("Full Stack");
    expect(profile.title).toContain("Agentic");
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test
```

Expected: FAIL — cannot find module `./profile` or similar.

- [ ] **Step 3: Add types + profile + PDF**

`content/types.ts`:

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
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: Tag[];
  links?: Link[];
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

`content/profile.ts`:

```ts
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Vincent Oliver Veran",
  shortName: "Vincent Veran",
  title: "Senior Software Developer — Games · Full Stack · Agentic Systems",
  summary:
    "Senior software developer with 10+ years across game development, full stack web engineering, and cross-platform mobile apps, with hands-on work in Unity3D, Unreal Engine, and TypeScript. Focused on shipping products and building agentic AI systems, including globally used games, cognitive apps, and interactive experiences.",
  seeking:
    "Open to senior roles spanning games, full stack product engineering, and agentic systems — remote or hybrid.",
  email: "xent.xent@gmail.com",
  phone: "+639278885000",
  location: "Quezon City, Philippines",
  github: "https://github.com/yoxent/",
  githubOrg: "https://github.com/IndiePH/",
  linkedin: "https://www.linkedin.com/in/xentveran/",
  cvPath: "/Vincent-Veran-CV.pdf",
};
```

Copy PDF:

```bash
Copy-Item "VincentVeran - CV.pdf" "public/Vincent-Veran-CV.pdf"
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: PASS for profile test.

- [ ] **Step 5: Commit**

```bash
git add content public/Vincent-Veran-CV.pdf
git commit -m "feat: add portfolio profile content and CV asset"
```

---

### Task 3: Experience, projects, skills content

**Files:**
- Create: `content/experience.ts`
- Create: `content/projects.ts`
- Create: `content/skills.ts`
- Test: `content/content-integrity.test.ts`

**Interfaces:**
- Consumes: types from `content/types.ts`
- Produces: `export const roles: Role[]`, `export const projects: Project[]`, `export const skillGroups: SkillGroup[]`

- [ ] **Step 1: Write integrity test**

```ts
import { describe, expect, it } from "vitest";
import { roles } from "./experience";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import type { Tag } from "./types";

const allowed: Tag[] = ["Games", "Web", "Mobile", "AI"];

describe("content integrity", () => {
  it("has at least 3 featured projects with tags", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects.length).toBeLessThanOrEqual(5);
    for (const p of projects) {
      expect(p.tags.length).toBeGreaterThan(0);
      for (const t of p.tags) expect(allowed).toContain(t);
    }
  });

  it("includes major CV roles", () => {
    const companies = roles.map((r) => r.company);
    expect(companies.some((c) => c.includes("Neeuro"))).toBe(true);
    expect(companies.some((c) => c.includes("Sovrun") || c.includes("BreederDAO"))).toBe(true);
    for (const r of roles) {
      expect(r.bullets.length).toBeGreaterThan(0);
      expect(r.tags.length).toBeGreaterThan(0);
    }
  });

  it("groups skills", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test
```

- [ ] **Step 3: Author content from CV**

Use cleaned CV copy. Minimum projects:

1. Web games platform (Klondike / Word Guess) — tags `Web`, `Games`
2. Agentic orchestration system — tags `AI`, `Web`
3. Android TV remote — tags `Mobile`

Optional 4th/5th if shareable: Neeuro EEG/BCI games (`Games`, `Mobile`), Virtual Labs metaverse (`Games`, `Web`).

Roles — include all CV roles with accurate dates/stacks and `tags` chosen so filters work (e.g. Sovrun/Neeuro/Virtual Labs/CrazyShark/Cylindo → Games; Independent full stack → Web + AI; Flutter remote → Mobile).

Skills — groups: Languages, Game Engines, Tools, Workflow — each with `tags` arrays covering the stacks.

- [ ] **Step 4: Run — expect PASS**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add content
git commit -m "feat: add experience, projects, and skills content"
```

---

### Task 4: `filterByTag` util (TDD)

**Files:**
- Create: `lib/filter-by-tag.ts`
- Test: `lib/filter-by-tag.test.ts`

**Interfaces:**
- Consumes: `Tag` from `@/content/types`
- Produces: `export function filterByTag<T extends { tags: Tag[] }>(items: T[], active: Tag | "All"): T[]`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from "vitest";
import { filterByTag } from "./filter-by-tag";
import type { Tag } from "@/content/types";

type Item = { id: string; tags: Tag[] };

const items: Item[] = [
  { id: "a", tags: ["Games"] },
  { id: "b", tags: ["Web", "AI"] },
  { id: "c", tags: ["Mobile"] },
];

describe("filterByTag", () => {
  it("returns all items when active is All", () => {
    expect(filterByTag(items, "All")).toHaveLength(3);
  });

  it("filters to items containing the tag", () => {
    expect(filterByTag(items, "Web").map((i) => i.id)).toEqual(["b"]);
    expect(filterByTag(items, "Games").map((i) => i.id)).toEqual(["a"]);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- lib/filter-by-tag.test.ts
```

- [ ] **Step 3: Implement**

```ts
import type { Tag } from "@/content/types";

export type FilterValue = Tag | "All";

export function filterByTag<T extends { tags: Tag[] }>(
  items: T[],
  active: FilterValue,
): T[] {
  if (active === "All") return items;
  return items.filter((item) => item.tags.includes(active));
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- lib/filter-by-tag.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/filter-by-tag.ts lib/filter-by-tag.test.ts
git commit -m "feat: add tag filter utility"
```

---

### Task 5: Design tokens, fonts, root layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/section.tsx`

**Interfaces:**
- Consumes: `profile.shortName` for default title
- Produces: CSS variables `--ink`, `--paper`, `--muted`, `--accent`, `--accent-fg`; fonts `display` + `sans`

- [ ] **Step 1: Set editorial tokens in `globals.css`**

```css
@import "tailwindcss";

:root {
  --ink: #141414;
  --paper: #f3f4f6;
  --muted: #5c5f66;
  --accent: #0f6b5c;
  --accent-fg: #f7fffc;
  --hairline: color-mix(in oklab, var(--ink) 12%, transparent);
  --bg-glow: radial-gradient(1200px 600px at 10% -10%, #d9e4ef 0%, transparent 55%),
    radial-gradient(900px 500px at 90% 0%, #ddeae4 0%, transparent 50%),
    var(--paper);
}

@theme inline {
  --color-ink: var(--ink);
  --color-paper: var(--paper);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-glow);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  min-height: 100vh;
}

::selection {
  background: color-mix(in oklab, var(--accent) 35%, white);
}
```

- [ ] **Step 2: Wire fonts + metadata in `layout.tsx`**

Use `next/font/google`: **Fraunces** (display) + **Manrope** (body).

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.shortName} — ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: profile.shortName,
    description: profile.title,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Add `components/section.tsx`**

```tsx
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Smoke build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx components/section.tsx
git commit -m "feat: add editorial theme, fonts, and section shell"
```

---

### Task 6: Header + Hero + page shell

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/hero.tsx`
- Modify: `app/page.tsx`
- Create: `components/reveal.tsx` (minimal motion wrapper)

**Interfaces:**
- Consumes: `profile`
- Produces: `/` renders header + hero; CTAs hit cv/mailto/linkedin/github

- [ ] **Step 1: Implement `site-header.tsx`**

Sticky nav: wordmark `profile.shortName`; anchors Work / Experience / Skills / Contact; links Download CV, GitHub, LinkedIn. Use accessible `<nav>` and external `rel="noopener noreferrer"` on external links.

- [ ] **Step 2: Implement `hero.tsx`**

First viewport one composition:

- `h1` = `profile.name` with `font-display` large
- Positioning = `profile.title`
- One sentence = first sentence of `profile.summary` (or full summary if short)
- CTA row: Download CV (`profile.cvPath` download attribute), Get in touch (`mailto:`), LinkedIn, GitHub

No badges/stats.

- [ ] **Step 3: Implement `reveal.tsx`**

Client component: IntersectionObserver adds opacity/translate classes once. Keep subtle (`duration-700`, small translate). Prefer `prefers-reduced-motion: reduce` → show immediately.

- [ ] **Step 4: Wire `app/page.tsx`**

```tsx
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* later sections */}
      </main>
    </>
  );
}
```

- [ ] **Step 5: Manual check + build**

```bash
npm run dev
```

Verify hero brand dominance, CTAs, sticky nav. Then:

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/site-header.tsx components/hero.tsx components/reveal.tsx app/page.tsx
git commit -m "feat: add site header and hero"
```

---

### Task 7: About + Featured Work + Contact (static sections)

**Files:**
- Create: `components/about.tsx`
- Create: `components/featured-work.tsx`
- Create: `components/contact.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `projects`
- Produces: sections `#about`, `#work`, `#contact`

- [ ] **Step 1: About** — `Section` id=`about`, body = `profile.summary` + optional `profile.seeking`.

- [ ] **Step 2: Featured Work** — editorial list/rows (border-hairline dividers), each project title, blurb, tags as text, optional links. Wrap with `Reveal`. No card grid.

- [ ] **Step 3: Contact** — email mailto, GitHub, LinkedIn, location, Download CV again. id=`contact`.

- [ ] **Step 4: Assemble on page** between hero and (placeholder for experience/skills).

- [ ] **Step 5: Build + commit**

```bash
npm run build
git add components/about.tsx components/featured-work.tsx components/contact.tsx app/page.tsx
git commit -m "feat: add about, featured work, and contact sections"
```

---

### Task 8: Filter chips + Experience + Skills

**Files:**
- Create: `components/filter-chips.tsx`
- Create: `components/experience.tsx`
- Create: `components/skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `filterByTag`, `roles`, `skillGroups`, `Tag`
- Produces: `#experience` and `#skills` with client filter state

- [ ] **Step 1: `filter-chips.tsx` (client)**

Props:

```ts
type Props = {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  options?: FilterValue[]; // default ["All","Games","Web","Mobile","AI"]
};
```

Render button chips; `aria-pressed` on active. Style as underline/text controls, not fat pills.

- [ ] **Step 2: `experience.tsx` (client)**

State `active` FilterValue default `"All"`. `const visible = filterByTag(roles, active)`. List roles chronologically (already ordered newest-first in content). Empty state: “No roles for this filter.”

- [ ] **Step 3: `skills.tsx` (client)**

Same chip pattern; filter `skillGroups` via `filterByTag`.

- [ ] **Step 4: Insert both sections on `page.tsx` (Experience before Skills; before Contact).

- [ ] **Step 5: Manual filter check + build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/filter-chips.tsx components/experience.tsx components/skills.tsx app/page.tsx
git commit -m "feat: add filterable experience and skills"
```

---

### Task 9: Polish motion, accessibility, empty-state, footer metadata

**Files:**
- Modify: section components / `reveal.tsx` / `globals.css` as needed
- Modify: `app/page.tsx` (ensure all sections ordered)

**Section order (locked):** Header → Hero → About → Featured Work → Experience → Skills → Contact

- [ ] **Step 1: Apply Reveal to About, Work, Experience, Skills, Contact** (not necessarily every inner item).

- [ ] **Step 2: Keyboard/focus** — chips and links have visible focus rings using accent.

- [ ] **Step 3: Mobile check** — nav can collapse to horizontal scroll or compact link row; CTAs wrap.

- [ ] **Step 4: Full verification**

```bash
npm test
npm run build
```

Expected: all tests pass; build succeeds.

Manual checklist:

- [ ] Anchors scroll correctly
- [ ] Filters Games/Web/Mobile/AI work
- [ ] PDF downloads
- [ ] Mailto / GitHub / LinkedIn open correctly
- [ ] Hero shows name as primary brand

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "polish: motion, a11y, and section composition"
```

---

### Task 10: Deploy to Vercel Hobby

**Files:** none required (docs optional)

- [ ] **Step 1: Ensure GitHub remote**

Push `main` to GitHub (`origin`). If remote missing, create repo under user account and `git push -u origin main`.

Do **not** create an empty Vercel project first.

- [ ] **Step 2: Import in Vercel**

1. vercel.com → Add New → Project → Import Git repo
2. Framework preset: Next.js (auto)
3. Root directory: `.`
4. Env vars: none
5. Deploy

- [ ] **Step 3: Production smoke**

Open `*.vercel.app`:

- Hero loads
- PDF downloads
- LinkedIn `https://www.linkedin.com/in/xentveran/`
- Filters work

- [ ] **Step 4: Record URL**

Add production URL as a short note at bottom of this plan or in README when known.

- [ ] **Step 5: Commit deploy notes only if README updated**

```bash
git add README.md
git commit -m "docs: add portfolio deploy URL and run instructions"
```

---

## Spec coverage self-check

| Spec requirement | Task |
|------------------|------|
| Single-page Next.js + Tailwind | 1, 6–8 |
| Typed content modules | 2–3 |
| Hero brand + positioning + CTAs | 6 |
| About / Work / Experience / Skills / Contact | 7–8 |
| Filters All/Games/Web/Mobile/AI | 4, 8 |
| Mailto + GitHub + LinkedIn + PDF | 2, 6, 7 |
| Editorial look + limited motion | 5, 9 |
| Vercel Hobby deploy; no pre-create project | 10 |
| Backlog multi-page (not built) | documented only |

## Placeholder scan

No TBD implementation steps. Fonts (Fraunces/Manrope) and accent (`#0f6b5c`) locked for v1; may fine-tune visually without changing architecture.

## Type consistency

- `Tag` / `FilterValue` / `filterByTag` used uniformly in Tasks 2–4 and 8
- `profile.cvPath`, `github`, `linkedin`, `email` used by header/hero/contact

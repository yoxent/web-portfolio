# Interactive Portfolio Website — Design Spec

**Date:** 2026-07-14  
**Status:** Approved for planning  
**Owner:** Vincent Oliver Veran  
**Deploy target:** Vercel Hobby tier  

## Goal

Upgrade the PDF CV into a polished, interactive single-page portfolio that hiring managers can skim in one link. Position as a balanced senior generalist across games, full stack, and agentic systems. This site becomes the primary share artifact; the PDF remains a downloadable companion.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Experience style | Polished multi-section (motion + filters; not game-like) |
| Positioning | Balanced generalist (Games · Full Stack · Agentic Systems) |
| Content depth | CV sections + light featured-project highlights |
| Visual tone | Editorial / studio |
| Contact | Mailto + GitHub + LinkedIn + Download CV PDF |
| Architecture | Single-page Next.js App Router (Approach 1) |
| Backlog | Multi-page / role-targeted variants (Approach 2) for games-only or fullstack-only applications |

## Non-goals (v1)

- Contact form / email API
- Blog
- Deep case-study pages (`/work/[slug]`)
- Role-specific sites or routes
- Creating an empty Vercel project before the repo exists
- Custom domain (optional after first deploy)

## Architecture

### Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Static-friendly deploy on **Vercel Hobby** (no required env vars for v1)
- Content as typed TypeScript modules under something like `content/` (edit copy without restructuring JSX)

### App shape

- Single route: `/`
- Section anchors: `#about`, `#work`, `#experience`, `#skills`, `#contact`
- PDF served from `/public` (e.g. `Vincent-Veran-CV.pdf`)
- Sticky editorial top nav with section links + primary actions

### Deploy flow

1. Build and verify locally (`npm run build`)
2. Push to GitHub
3. Vercel → Import Git repository (project created on import; do not pre-create empty project)
4. Ship `*.vercel.app` URL; custom domain later if desired

### Backlog (explicit)

- Multi-page structure (`/work`, `/experience`) and/or role-flavored entry points for targeted job applications (games-only, fullstack-only, etc.)

## Page sections & content

### Nav

- Wordmark: **Vincent Veran** (or full legal name consistent with CV)
- Anchors: Work, Experience, Skills, Contact
- Actions: **Download CV**, **GitHub**, **LinkedIn**

### Hero (first viewport = one composition)

- Brand name as hero-level signal (not only nav text)
- Positioning line: Senior Software Developer — Games · Full Stack · Agentic Systems
- One short supporting sentence drawn from the CV profile
- CTA group: **Download CV**, **Get in touch** (mailto), **LinkedIn**, **GitHub**
- No stat strips, floating badges, or inset hero media cards

### About

- Expanded profile from CV
- Optional short “what I’m looking for” line (editable in content module)

### Featured Work

- 3–5 highlights: title, 1–2 sentence blurb, tags, optional links (live / GitHub)
- Candidate seeds from CV (finalize during implementation content pass):
  - Full stack web games platform (Klondike Solitaire, Word Guess)
  - Agentic orchestration system (Claude / Cursor)
  - Android TV remote app (Flutter)
  - Select Neeuro / Sovrun highlights if sharable
- Prefer editorial list/rows over card grids

### Experience

- Chronological roles from CV (lightly cleaned for web)
- Filter chips: `All` | `Games` | `Web` | `Mobile` | `AI`
- Each role tagged for client-side filtering

### Skills

- Grouped: languages, engines, tools, workflow
- Same tag vocabulary as Experience for consistency
- Filterable

### Contact

- Email: `xent.xent@gmail.com` (mailto)
- GitHub: `https://github.com/yoxent/` (IndiePH org as secondary if useful)
- LinkedIn: profile URL stored in content module (provide URL before ship; placeholder until then)
- Location context: Quezon City, Philippines / open to remote as editorial copy if desired
- Download CV repeated here

## Visual direction & motion

### Look

- Editorial / studio: expressive display type for name and section headlines; readable sans for body
- Strong whitespace; composed sections, not dashboard density
- CSS variables for palette: ink, paper/background atmosphere, one accent for links/CTAs
- Avoid default AI-portfolio clichés (purple gradients, generic cream+terracotta, pure black cyber glow stacks)

### Motion (intentional, limited)

1. Soft hero entrance (name / CTAs)
2. Subtle section reveal on scroll
3. Calm filter transition when Experience/Skills chips change

### Responsive

- Desktop composition first; mobile stacks cleanly with reachable CTAs

## Interactions & data

### Filters

- Client-side only; no page reload
- Shared tag set across Experience, Skills, and Featured Work where applicable
- “All” clears the filter

### Content model (conceptual)

```ts
// Illustrative — exact shapes locked in implementation plan
Profile { name, title, summary, email, github, linkedin, location, cvPath }
Project { id, title, blurb, tags[], links?[] }
Role { id, company, title, dates, location?, stack[], tags[], bullets[] }
SkillGroup { id, label, items[], tags[] }
```

### Quality bar (“done”)

- Semantic HTML, readable contrast
- Mobile + desktop usable
- Content aligned with CV
- PDF download works
- Mailto, GitHub, and LinkedIn links work
- Filters work
- Production build succeeds on Vercel Hobby

## Testing (lightweight for v1)

- Manual pass: nav anchors, filters, external links, PDF download, mobile width
- `npm run build` must pass before deploy
- Optional later: Playwright smoke for anchors/CTAs (backlog)

## Open items for implementation

1. **LinkedIn profile URL** — required before production share; store in `content` (user to provide)
2. **Final 3–5 featured projects** — confirm which CV items are public/shareable and add links where available
3. Exact typeface pair and accent hex — chosen during UI build within editorial constraints above

## Success criteria

A hiring manager can open one URL, understand who Vincent is within seconds, filter by domain (games/web/mobile/AI), open LinkedIn or email, and download the PDF — without backend complexity on Vercel Hobby.

# Vincent Veran — Portfolio Site

Personal portfolio for Vincent Oliver Veran: games, full stack, and agentic systems. Built with [Next.js](https://nextjs.org) (App Router), React, and Tailwind CSS.

**Live site:** [https://yoxent.vercel.app/](https://yoxent.vercel.app/)

| Section | URL |
| --- | --- |
| About | [https://yoxent.vercel.app/#about](https://yoxent.vercel.app/#about) |
| Work | [https://yoxent.vercel.app/#work](https://yoxent.vercel.app/#work) |
| Resume | [https://yoxent.vercel.app/#resume](https://yoxent.vercel.app/#resume) |
| Contact | [https://yoxent.vercel.app/#contact](https://yoxent.vercel.app/#contact) |

The shell is a single page. Tabs update the URL hash (`#about`, `#work`, `#resume`, `#contact`). The header theme control switches between Light, Dark · Brass, Dark · Ink, and System. The choice is stored in `localStorage` under `portfolio-theme`.

## Stack

- Next.js 16 and React 19
- Tailwind CSS 4
- TypeScript
- Vitest
- [Resend](https://resend.com) for the contact form and inbound webhook
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [simple-icons](https://simpleicons.org) for skill marks

## Editing content

Copy lives in `content/` and is typed in `content/types.ts`. Media and the downloadable CV live in `public/`.

| File | What it drives |
| --- | --- |
| `content/profile.ts` | Name, title, summary, focus areas, links, portrait, CV path |
| `content/projects.ts` | Work catalog (tags: Games, Web, Mobile, AI) |
| `content/experience.ts` | Resume roles |
| `content/education.ts` | Education |
| `content/skills.ts` | Skill groups |
| `public/Vincent-Veran-CV.pdf` | CV download |
| `public/portrait.jpg` | Portrait |
| `public/images/`, `public/videos/` | Project stills and demos |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edits under `app/`, `components/`, and `content/` hot-reload.

### Contact form (Resend)

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` from [Resend API keys](https://resend.com/api-keys)
- `CONTACT_FROM_EMAIL=Portfolio <contact@pasttime.xyz>` (after verifying `pasttime.xyz` in Resend)
- `RESEND_WEBHOOK_SECRET` if you use inbound webhooks

Without a verified domain, local sends can use `onboarding@resend.dev` (only delivers to your Resend account email).

Add the same variables in the Vercel project for production. The webhook endpoint is [https://yoxent.vercel.app/api/webhooks/resend](https://yoxent.vercel.app/api/webhooks/resend).

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the codebase
- `npm test` — run the test suite once (Vitest)
- `npm run test:watch` — run tests in watch mode

## Project layout

```
app/          layout, page, contact API, Resend webhook
components/   shell, panels, theme toggle, contact form
content/      portfolio copy and typed content models
lib/          theme, tab hash, project filters, media playback
public/       portrait, CV, images, videos
```

## Deployment

The site is deployed on [Vercel](https://vercel.com) (Hobby plan) from the [yoxent/web-portfolio](https://github.com/yoxent/web-portfolio) GitHub repository. Pushes to the connected branch build with `next build`. Pages are prerendered; `/api/contact` and `/api/webhooks/resend` run as Route Handlers.

**Production:** [https://yoxent.vercel.app/](https://yoxent.vercel.app/)

To deploy manually via the Vercel CLI:

```bash
npx vercel --yes        # preview deployment
npx vercel --prod --yes # promote to production
```

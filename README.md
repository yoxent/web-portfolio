# Vincent Veran — Portfolio Site

A personal portfolio site built with [Next.js](https://nextjs.org) (App Router) and Tailwind CSS.

**Live site:** https://yoxent.vercel.app

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit files under `app/` and `components/`.

### Contact form (Resend)

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` from [Resend API keys](https://resend.com/api-keys)
- `CONTACT_FROM_EMAIL=Portfolio <contact@pasttime.xyz>` (after verifying `pasttime.xyz` in Resend)
- `RESEND_WEBHOOK_SECRET` if you use inbound webhooks

Without a verified domain, local sends can use `onboarding@resend.dev` (only delivers to your Resend account email).

Add the same variables in Vercel for production.

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the codebase
- `npm test` — run the test suite once (Vitest)
- `npm run test:watch` — run tests in watch mode

## Deployment

The site is deployed on [Vercel](https://vercel.com) (Hobby plan) from the `yoxent/web-portfolio` GitHub repository.

- **Production:** https://yoxent.vercel.app
- Deploys are built with `next build` and served as static/prerendered content.

To deploy manually via the Vercel CLI:

```bash
npx vercel --yes        # preview deployment
npx vercel --prod --yes # promote to production
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

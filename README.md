# Cubott website

The official Cubott company website. Cubott builds systems that turn business complexity into clarity — products (Dealer Management), business systems and custom software.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS 3 with brand tokens in `tailwind.config.ts`
- Motion: GSAP + ScrollTrigger for scroll-driven scenes, Framer Motion for reveals and micro-interactions
- No Three.js, no generated imagery: every visual is inline SVG/HTML driven by the Cubott mark

## Run

```bash
npm install
npm run dev:local        # http://localhost:3100 (npm run dev binds 0.0.0.0:5000 for Replit)
npm run build && npm start
```

## Structure

```
app/                      routes (home, products, products/dealer-management, solutions, work, about, contact)
  api/contact/route.ts    contact form delivery
  icon.svg · apple-icon.tsx · opengraph-image.tsx · sitemap.ts · robots.ts
components/
  brand/                  CubottMark (single source of the mark geometry), CubottLogo
  core/                   Core visual language: NodeChip, FlowStepper, MachineGlyph
  home/                   homepage scenes (Opening, WhatWeBuild, ThePoint, HowWeBuild, Engineering, Trust, CustomSoftware, FinalScene …)
  dealer/                 Dealer Management story: MachineJourney, SystemStories, WorkshopStory, WarrantyStory
  layout/ ui/ motion/     header/footer, primitives, motion helpers
content/                  all copy and facts as data (dealer.ts, dealer-modules.ts, company.ts, screens.ts)
lib/                      site config, utils
```

## Facts and screenshots

`content/dealer.ts` and `content/dealer-modules.ts` are written from the Cubott SaaS product documentation and use its exact status terminology. Do not add statuses, features, statistics, customers or certifications that are not documented.

Real product screens live in `public/screens/` and are registered in `content/screens.ts` (static imports, so Next can size and optimise them). Any station or module without a registered screen renders a labelled placeholder frame — nothing is mocked.

## Contact form

`POST /api/contact` validates and delivers the message. Configure one of:

- `RESEND_API_KEY` (+ optional `CONTACT_FROM`) — email via Resend to `siteConfig.contactEmail`
- `CONTACT_WEBHOOK_URL` — JSON POST to any webhook

With neither set, the form offers a prefilled `mailto:` fallback.

## Accessibility and motion

Semantic landmarks, skip link, visible focus states, keyboard-operable tabs and steppers, `aria-current` on navigation and journey stations. All scroll-driven scenes render a static composed layout under `prefers-reduced-motion`.

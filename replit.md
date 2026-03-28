# Cubott Website

## Overview
Cubott is a multi-tenant SaaS platform for dealerships (any sector). This is the marketing/product website.

The platform digitizes end-to-end dealership operations:
- Service request lifecycle management
- Inventory/parts tracking
- Sales pipeline management
- Finance & billing
- Audit logging with full traceability
- Role-based access control

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + custom utilities in globals.css
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Runtime**: Node.js 20
- **Package manager**: npm

## Design System

### Fonts
- **Bagel Fat One** (`font-bagel`, `var(--font-bagel)`) — display/headline font, loaded via next/font/google. Used on all h1/h2 hero headings for distinctive bold personality.
- **Inter** (`font-sans`, `var(--font-inter)`) — body font for all copy.

### Colors
- Background: `#05090F` (very dark near-black, cinematic)
- Secondary bg: `#030710`
- Accent: `#4FB3D9` (cubott-teal)
- Teal light: `#7DD3FC`
- Teal dark: `#38BDF8`

### CSS Utilities (globals.css)
- `.font-bagel` — applies Bagel Fat One display font
- `.glass`, `.glass-card`, `.glass-teal` — glassmorphism variants
- `.gradient-text`, `.gradient-teal` — gradient text treatments
- `.mockup-shadow` — browser frame shadow
- `.bg-grid-pattern` — subtle grid overlay
- `.animate-marquee` — infinite scroll ticker animation
- `.animate-float` — gentle floating animation

## Project Structure
```
app/
  page.tsx              # Home page (Hero + Marquee + Services + WhyCubott + CaseStudies + TechStack + CTA)
  layout.tsx            # Root layout (loads Inter + Bagel Fat One)
  globals.css           # Global styles + utilities
  contact/page.tsx      # Email-only contact page ("Let's Talk Business")
components/
  home/
    Hero.tsx            # Full-screen cinematic hero, video-ready (drop /public/hero.mp4 to activate)
    Marquee.tsx         # Scrolling feature ticker
    Services.tsx        # Bento grid (4 modules, alternating 2/3 + 1/3 widths)
    WhyCubott.tsx       # Two-column editorial (Problem vs Solution)
    CaseStudies.tsx     # Interactive tab switcher with 5 product screenshots
    TechStack.tsx       # Horizontal role rows (Supervisor, Store Team, Finance, Management)
    CTA.tsx             # Full-width cinematic CTA with giant CUBOTT wordmark
  layout/
    Header.tsx          # Fixed nav, "Let's Talk Business" CTA
    Footer.tsx          # Links + social icons
  ui/
    Container.tsx       # Max-width wrapper
  shared/
    AnimatedSection.tsx # Scroll-triggered fade animation
public/
  screenshot-supervisor.png     # Used in hero + Services + TechStack
  screenshot-intelligence.png   # Used in CaseStudies
  screenshot-inventory.png      # Used in Services + TechStack
  screenshot-audit.png          # Used in Services + TechStack
  screenshot-manufacturer.png   # Used in Services + TechStack
  screenshot-login.png          # Available
  cubott-logo.webp              # Brand logo
  # hero.mp4 — NOT YET. Drop here when user provides video to activate video hero
```

## Video Hero
The Hero component has a video background ready to activate. Drop `hero.mp4` into `/public/` and uncomment the `<video>` block in `components/home/Hero.tsx`.

## Running Locally
```bash
npm run dev   # starts on port 5000 at 0.0.0.0
```

## Contact Page
- Email only: contact@cubott.com
- No form, no phone number
- Headline: "Let's Talk Business."

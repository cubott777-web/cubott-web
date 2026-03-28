# Cubott Website

## Overview
Cubott is a multi-tenant SaaS platform for agricultural machinery dealerships. This is the marketing/product website.

The platform digitizes end-to-end service operations including:
- Service request lifecycle management
- Spare parts tracking
- Warranty approvals
- Inventory management
- Billing
- Audit logging

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + custom glass/glow utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Runtime**: Node.js 20

## Project Structure
```
app/           # Next.js App Router pages
  page.tsx     # Home page
  layout.tsx   # Root layout with Header/Footer
  globals.css  # Global styles + Tailwind utilities
components/
  home/        # Home page sections
    Hero.tsx           # Hero with product screenshots
    Services.tsx       # Platform modules (6 modules)
    WhyCubott.tsx      # Problem vs Solution section
    CaseStudies.tsx    # Interactive product screenshot showcase
    TechStack.tsx      # Role-based access cards
    CTA.tsx            # Request demo CTA
  layout/
    Header.tsx         # Dark glassmorphism nav
    Footer.tsx         # Dark footer
  ui/
    Button.tsx
    Container.tsx
  shared/
    AnimatedSection.tsx
lib/
  utils.ts
public/
  screenshot-*.png     # Product screenshots (6 screenshots)
  cubott-logo.webp     # Brand logo
```

## Design System
- **Background**: Deep dark navy `#040D1A` / `#060F1E`
- **Primary**: Cubott teal `#4FB3D9`
- **Glass cards**: `glass-card` utility class (rgba white + backdrop-blur)
- **Gradient text**: `gradient-text` / `gradient-text-teal` utility classes
- **Grid pattern**: `bg-grid-pattern` utility

## Running the Project
```bash
npm run dev   # runs on port 5000
```

## Color Palette
- `cubott-navy.DEFAULT`: #0A2540
- `cubott-navy.light`: #1A365D
- `cubott-teal.DEFAULT`: #4FB3D9
- `cubott-teal.light`: #7DD3FC

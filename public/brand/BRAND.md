# Cubott brand guide

One brand, used the same way on cubott.com and inside every Cubott application. Everything here is served from `https://www.cubott.com/brand/…`, so the applications can link to it directly or copy the files in.

## 1. The name

- Written **Cubott**. Capital C, one word, two t's. Never CuBott, CUBOTT (except inside the all-caps wordmark context), Cubot, or Cubott.com as a brand name.
- The legal entity is **Cubott Technologies**. Use it only in legal text, invoices and contracts. Everywhere else it is Cubott.
- Products are named `Cubott <Product>`: **Cubott Dealer Management**, **Cubott Clinic Management**, **Cubott School Management**. Inside the application itself, after the first mention, the product may drop the prefix.
- Say "Cubott" in prose, not "the Cubott platform" or "Cubott's system". Cubott builds systems; it is not itself one.

## 2. Logo files (`/brand/logo/`)

Every file exists as SVG (use this) and PNG at 1024px (for places that cannot take SVG).

| File | Use |
|---|---|
| `cubott-logo-horizontal` | Default. Website header, app sidebar, documents, email signatures. |
| `cubott-logo-horizontal-white` | Same, on navy or any dark background. |
| `cubott-logo-stacked` / `-white` | Square-ish spaces: app login screen, social avatars with text, print. |
| `cubott-mark` | The cube alone. Favicons, app icons, loading screens, anywhere under 24px tall. |
| `cubott-mark-mono-navy` / `-white` | One-colour mark for engraving, watermarks, embossing, monochrome print. |
| `cubott-wordmark` / `-white` | The name alone, as drawn. Use only where the mark is already present nearby (e.g. mark as app icon, wordmark in the title bar). |
| `cubott-logo-horizontal-mono-*` | One-colour lockup for the same cases as the mono mark. |
| `icon-16/32/48/192/512.png`, `apple-touch-icon.png`, `icon-maskable-512.png` | Favicon and PWA set. Copy into every app as-is. |

Rules:
- **Clear space** around any logo = the height of the cube's front face (roughly 40% of the mark's height). Nothing inside it.
- **Minimum size**: horizontal lockup 110px wide on screen / 25mm in print; mark alone 20px / 6mm.
- The mark is always upright, always these colours, never outlined, never with effects, never rotated, never recoloured to match a theme. On a photograph, put it on a navy or white panel.
- The antenna rises from the centre of the top face. Never move it to the apex.
- Do not set "Cubott" in any other font and call it the wordmark. If you need the name in running text, it is just text.
- The blue **o** is part of the wordmark. In plain text, the name is one colour.

## 3. Colour

Two separate palettes. The **logo colours** live only inside the logo. The **brand palette** is for everything else.

Logo (fixed): Navy `#0A2F47`, Blue `#379ECF`, Blue top `#3AA5D8`, Shade `#0A3F5E`.

Brand palette:

| Token | Hex | Role |
|---|---|---|
| navy-900 | `#071427` | Dark canvas (website background) |
| navy-800 | `#0B1F3B` | Primary navy: headings on light, dark stage cards |
| blue-600 | `#2563EB` | Action: primary buttons, links, focus rings, active states |
| blue-700 | `#1D4ED8` | Action hover |
| blue-400 | `#60A5FA` | Accent text and eyebrows on dark |
| slate-500 | `#64748B` | Secondary text on light |
| slate-200 | `#E2E8F0` | Borders on light |
| surface | `#F8FAFC` | Light page background (applications) |
| white | `#FFFFFF` | Cards on light; text on dark |

Status (applications): success `#16A34A`, warning `#D97706`, danger `#DC2626`, info `#2563EB`.

Rules:
- One accent per screen. Blue means "you can act here". Do not use blue for decoration.
- Applications are **light** by default (surface background, navy text). The website is dark. Both use the same tokens; see `tokens.css` for the light and dark semantic sets.
- Never use pure black `#000`. The darkest value is navy-900.
- Text on navy is white at 100% for headings, 60% for body, 45% for captions. Text on surface is navy-800 for headings, slate-500 for body.

## 4. Type

- **Inter** everywhere. Weights: 400 body, 500 labels, 600 UI headings, 700 display.
- Display headlines: 700, letter-spacing −0.03em, line-height 0.96–1.05.
- UI and body: 400/500, 15–16px, line-height 1.5–1.6.
- Eyebrows / section labels: 12px, 600, uppercase, letter-spacing 0.16em.
- Numbers in tables: `font-variant-numeric: tabular-nums`.
- No other typeface. No italics for emphasis in UI (use weight).

## 5. Shape, motion, voice

- Corners: 8px inputs and small controls, 12px buttons, 16–24px cards, 32px page-level panels, pills for tags.
- Borders on light: slate-200 at 1px. On dark: white at 8% opacity.
- Motion: one curve, `cubic-bezier(0.16, 1, 0.3, 1)`, 0.3–0.8 s. Things settle in; nothing bounces.
- Voice: plain, specific, short. Say what the system does, not how clever it is. "Service request created" not "Awesome, your request is on its way!". One idea per sentence.

## 6. Files

- `tokens.css` — CSS custom properties, light and dark semantic sets. Import into any web app.
- `tokens.json` — the same values as data, for design tools and native apps.
- `tailwind.preset.js` — Tailwind preset mirroring the tokens.
- `cubott-mark.svg` — the vector source of the mark. The kit is regenerated from it with `node scripts/brand-kit.mjs` in the website repo.

Version 1.0 · October 2026

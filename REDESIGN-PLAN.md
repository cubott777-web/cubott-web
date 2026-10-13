# Cubott.com redesign plan — "Bootmine system, Cubott skin"

Reference: https://bootmine.com (audited 2026-10-13). Goal: same calm, premium, card-based system; our navy/blue; half the words we have today; motion that feels expensive, not busy.

## 1. What actually makes Bootmine feel good (and what we steal)

| Bootmine | Why it works | Cubott version |
|---|---|---|
| Near-black canvas `#0d0d0d`, content sits in an **inset rounded stage** (12–24px margin from the viewport edge, 32px radius) | The page reads as one object, not a scroll of bands | Canvas `#071427` (navy-900). Every section is a rounded stage card inset `mx-3 lg:mx-6`, radius 32px |
| **One accent, used ~5 times** on the whole page (yellow) | Accent means something | Blue `#2563EB` only for: primary button, ticker arrow, hover state, one word per page. Nothing else is blue |
| Glass cards: `1px white/8%` border, `white/3%` fill, hover to `white/8%` | Depth without shadows | Same tokens: `--card: rgba(255,255,255,.03)`, `--line: rgba(255,255,255,.08)` |
| Hero asks a **question** ("How can we help you?") + an intent picker ("I'd like to…") + 2 chips | Visitor is in control in 3 seconds | "What are you building?" + picker: *Run my business on one system · Launch a product · Replace software that doesn't fit* → each routes to a section/contact prefill |
| Top **ticker**: "Currently: building X for Y" | Live proof, zero copy | "Currently: shipping Finance & gate-pass for an agri-machinery dealer" (from `content/`; one line, editable) |
| Services = 3 big cards, each with a **pill list of capabilities** + a mockup bleeding out of the card | Scannable, no paragraphs | Systems / Products / Custom software cards; pills = what's inside; product video bleeding out of the card edge |
| One featured case, tags, "show more" | Confidence, not a catalogue | Dealer Management featured; Clinic + School as two smaller cards |
| Numbered "5 promises" | Short, rhythmic, human | "5 things you can hold us to" (reuse `principles`, cut to one line each) |
| Close: "Could you use our help? Get in touch with Ruben. Schedule a call" + rating | Personal, low friction | "Talk to the founder" + phone/WhatsApp/email buttons. We have no rating → omit, do not fake |
| Fonts: Red Hat Display 800 / DM Sans | Display face gives character | Keep **Inter** (brand), weight 800 for display, `-0.03em`. Optional: try `Inter Display` axis. No new font family |

What we do NOT copy: cartoon sticker icons, the "Hire?" team cards (we don't show founders — user decision), the cookie banner tone, Google rating.

## 2. The honest diagnosis of today's site

- **Four pages, all the same component**: eyebrow → display headline → 3–5 text rows with `RowRule`. Products, About and What-we-do are visually identical. Nothing is scannable; every row is a sentence pair the visitor has to read.
- **~1,900 words on the homepage + products** for a company that wants to say three things. Bootmine's homepage is ~450 words.
- **The product videos are hidden** below two text sections. They are the best asset we have.
- **No proof above the fold**, no "currently", no numbers, no logos. The site asserts; it doesn't show.
- Motion vocabulary is good (house curve, text reveals). Keep it; don't add more.

## 3. New information architecture (still 4 routes)

### Home `/`
1. **Ticker bar** (full width, above header): "Currently: …" + "Hyderabad · IST" clock. 36px.
2. **Hero stage** — cube signature stays (off-limits per earlier decision) but is re-framed: inset rounded stage, headline becomes the question *"What are you building?"*, intent picker + 2 chips under it. Headline copy "We're Cubott…" moves to the stage sub-line. **Decision needed from you — see §7.**
3. **What we do** — 3 glass cards side-by-side (stack on mobile): *Business systems · Digital products · Custom software*. Each: title, one sentence, 4–6 pills, a product clip bleeding out of the bottom-right corner (dealer / clinic / school). Hover: card lifts 4px, border brightens, clip scrubs.
4. **Featured work** — Dealer Management as one wide stage: clip left (60%), right: sector, 1-line, 3 tags, "See the system →". Then Clinic + School as two half-width cards.
5. **5 things you can hold us to** — numbered list, big numerals in `white/15%`, one line each.
6. **Talk** — keep the existing `LET'S TALK.` typographic block (it's good) but inside the stage card system; add founder phone + WhatsApp + email buttons beneath.

Target: ≤ 500 words.

### Products `/products` → rename nav label **Work**
- Hero stage: "What we've built." + 3 chips that scroll to each product.
- Per product: one full stage (clip + 4 module pills + 2-line story). Dealer Management keeps its 8 modules as pills, **not** 8 cards with paragraphs.
- Remove the "What we build" row list (duplicate of home) and `CustomSoftware` section (fold one line into the hero).

### About `/about`
- One stage: short manifesto (4 belief lines, no paragraphs), company facts as a 3-column strip (Founded · Based · Working across).
- Remove "How we work" rows (overlaps home card 3).

### Contact `/contact`
- Split stage: left = form (existing `ContactForm`, restyled dark glass), right = 3 contact tiles (Call, WhatsApp, Email) + map tile (static, navy-tinted).
- Intent picker from the hero prefills the "What are you building?" field via `?intent=`.

## 4. Design tokens (edit `globals.css` + `tailwind.config`)

```
--canvas:  #071427   (page)            --stage:  #0B1F3B   (section cards)
--card:    rgba(255,255,255,.03)        --card-hover: rgba(255,255,255,.07)
--line:    rgba(255,255,255,.08)        --line-strong: rgba(255,255,255,.16)
--ink:     #FFFFFF  --ink-2: rgba(255,255,255,.70)  --ink-3: rgba(255,255,255,.45)
--accent:  #2563EB  --accent-ink: #60A5FA (text on dark)
radius: stage 32px · card 24px · pill 999px
```

Light sections are dropped. Whole site is one dark canvas (Bootmine does this; it's what makes it feel like one product). The existing dark→light→dark rule is superseded.

Type scale: `display-2xl` 800 for the hero question only; `display-lg` 800 for section titles; body 16/1.6 at `--ink-2`. Eyebrows stay ≥12px.

## 5. Motion (reuse `components/motion/*`, add nothing new)

- Stage cards: `Reveal` y=24, house curve, 0.9s.
- Pills: `Stagger` 40ms.
- Cards hover: translateY(-4px) + border → `--line-strong`, 500ms house curve.
- Clips: `MediaReveal` (clip-path wipe) then autoplay; hover scrubs 1.03 scale (already in `ProductRows`).
- Ticker: CSS `marquee` only if text overflows; otherwise static.
- Keep `TextReveal` for all headings. No new libraries. GSAP stays only where already used.

## 6. Video (Higgsfield)

The Higgsfield connector is attached (120 credits, basic plan) but exposes only read tools here: balance, model catalog, history, workspace select, import-from-URL. **No generate tool**, so clips must be generated in the Higgsfield app. Recommended model: **Cinema Studio Video 3.0** (`cinematic_studio_3_0`), 16:9, 720p, 8 s, audio off. Once generated, I can read the result URLs via history and wire them in. Prompts below; drop results in `public/video/`. Each: 6–8 s, loop-safe, 16:9, no text baked in, navy-dominant grade.

1. `hero-ambient.mp4` — *"Slow dolly through a dark navy volumetric space, faint isometric grid on the floor, soft blue rim light from the right, dust particles, no objects, cinematic, 24fps, seamless loop"* — plays at 20% opacity behind the hero stage.
2. `systems.mp4` — *"Abstract network of glowing blue nodes connecting one by one on a navy background, thin lines, calm, macro lens, shallow depth of field, loop"* — Business systems card.
3. `custom.mp4` — *"Isometric glass cube assembling itself from thin plates, navy and electric blue, studio lighting, black background, slow, loop"* — Custom software card (echoes the brand mark).

Existing `dealer.mp4`, `clinic.webm`, `School.webm` stay as the product clips. Not spending your Higgsfield credits from here (standing rule).

## 7. Decisions I need from you

1. **Hero**: keep the cube signature untouched and only re-frame the stage around it (my recommendation), or let me redesign the hero fully in the Bootmine format (photo/clip + question)?
2. **All-dark site**: OK to drop the light sections? (Strong yes from me; it's the single biggest "premium" lever.)
3. **Ticker line** copy: give me one true sentence for "Currently: …". If none, I'll omit the ticker rather than invent one.
4. **Founder contact**: show a first name and WhatsApp on the Talk section? (Bootmine's "Get in touch with Ruben" is a big part of its warmth.)

## 8. Build order (each step ships and is verified in the browser)

1. Tokens + stage shell (`Container` gets a `stage` variant; `globals.css` tokens; header goes transparent over canvas). Half a day.
2. Home: cards, featured work, promises, talk. One day.
3. Work page + About + Contact restyle. One day.
4. Copy pass: cut to targets above, update `content/*.ts`. Half a day.
5. Video drop-in + polish + mobile + Lighthouse. Half a day.

Nothing new in `package.json`.

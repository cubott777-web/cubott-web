import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"

export const metadata: Metadata = {
  title: "Brand",
  description: "Cubott logos, colours, type and tokens — the one set used on the website and inside every Cubott application.",
  robots: { index: false, follow: false },
}

const logos = [
  { file: "cubott-logo-horizontal", label: "Horizontal", dark: false },
  { file: "cubott-logo-horizontal-white", label: "Horizontal, on dark", dark: true },
  { file: "cubott-logo-stacked", label: "Stacked", dark: false },
  { file: "cubott-logo-stacked-white", label: "Stacked, on dark", dark: true },
  { file: "cubott-mark", label: "Mark", dark: false },
  { file: "cubott-mark-mono-navy", label: "Mark, one colour", dark: false },
  { file: "cubott-mark-mono-white", label: "Mark, one colour on dark", dark: true },  { file: "cubott-wordmark", label: "Wordmark", dark: false },
  { file: "cubott-wordmark-white", label: "Wordmark, on dark", dark: true },
]

const colours = [
  { name: "Logo navy", hex: "#0A2F47", note: "Logo only" },
  { name: "Logo blue", hex: "#379ECF", note: "Logo only" },
  { name: "navy-900", hex: "#071427", note: "Dark canvas" },
  { name: "navy-800", hex: "#0B1F3B", note: "Primary navy" },
  { name: "blue-600", hex: "#2563EB", note: "Action" },
  { name: "blue-400", hex: "#60A5FA", note: "Accent on dark" },
  { name: "slate-500", hex: "#64748B", note: "Secondary text" },
  { name: "surface", hex: "#F8FAFC", note: "App background" },
]

const files = [
  { href: "/brand/BRAND.md", label: "Brand guide (Markdown)" },
  { href: "/brand/tokens.css", label: "tokens.css" },
  { href: "/brand/tokens.json", label: "tokens.json" },
  { href: "/brand/tailwind.preset.js", label: "tailwind.preset.js" },
  { href: "/brand/cubott-mark.svg", label: "Mark source (SVG)" },
  { href: "/brand/logo/icon-512.png", label: "App icon 512" },
  { href: "/brand/logo/apple-touch-icon.png", label: "Apple touch icon" },
  { href: "/brand/logo/icon-maskable-512.png", label: "Maskable icon" },
]

/** Internal brand page: every asset the applications need, served from one place. Not indexed. */
export default function BrandPage() {
  return (
    <main id="main" className="space-y-3 pt-[calc(var(--header-h)+12px)] lg:space-y-6">
      <section className="stage py-16 md:py-24">
        <Container>
          <Reveal as="p" y={8} className="eyebrow text-blue-400">
            Brand
          </Reveal>
          <TextReveal as="h1" className="display-xl mt-5 max-w-3xl" delay={0.15} immediate>
            One Cubott, everywhere.
          </TextReveal>
          <Reveal as="p" delay={0.5} className="mt-6 max-w-xl text-xl leading-relaxed text-blue-100/80">
            Logos, colours, type and tokens for the website and every application. Use these files as they are.
          </Reveal>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="logos-title">
        <Container>
          <TextReveal as="h2" id="logos-title" className="display-lg max-w-[14ch]">
            Logos.
          </TextReveal>
          <Stagger as="ul" gap={0.06} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {logos.map((l) => (
              <StaggerItem as="li" key={l.file} className="card overflow-hidden">
                <div className={`flex aspect-[4/3] items-center justify-center p-10 ${l.dark ? "bg-navy-900" : "bg-white"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static brand asset */}
                  <img src={`/brand/logo/${l.file}.svg`} alt={l.label} className="max-h-full max-w-full" />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <span className="text-sm font-medium">{l.label}</span>
                  <span className="flex gap-3 text-sm">
                    <a className="text-blue-400 hover:underline" href={`/brand/logo/${l.file}.svg`} download>
                      SVG
                    </a>
                    <a className="text-blue-400 hover:underline" href={`/brand/logo/${l.file}.png`} download>
                      PNG
                    </a>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="colour-title">
        <Container>
          <TextReveal as="h2" id="colour-title" className="display-lg max-w-[14ch]">
            Colour.
          </TextReveal>
          <Stagger as="ul" gap={0.05} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colours.map((c) => (
              <StaggerItem as="li" key={c.hex} className="card overflow-hidden">
                <div className="h-24 border-b border-line" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-white/60">
                    {c.hex} · {c.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="type-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <TextReveal as="h2" id="type-title" className="display-lg max-w-[12ch]">
                Type.
              </TextReveal>
              <Reveal as="p" delay={0.2} className="mt-4 max-w-sm text-white/60">
                Inter, and only Inter. Weight carries the hierarchy, not a second typeface.
              </Reveal>
            </div>
            <Reveal delay={0.2} className="card space-y-6 p-7 lg:col-span-7">
              <p className="display-lg">Display 700</p>
              <p className="text-2xl font-semibold tracking-tight">Heading 600 · tracking −0.02em</p>
              <p className="text-base leading-relaxed text-white/80">Body 400 · 16px · line-height 1.6. Plain, specific, short. Say what the system does.</p>
              <p className="eyebrow text-blue-400">Eyebrow 600 · 12px · 0.16em</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="files-title">
        <Container>
          <TextReveal as="h2" id="files-title" className="display-lg max-w-[14ch]">
            Files.
          </TextReveal>
          <Stagger as="ul" gap={0.04} className="mt-10 flex flex-wrap gap-2">
            {files.map((f) => (
              <StaggerItem as="li" key={f.href}>
                <a href={f.href} className="pill transition-[border-color,background-color,color] duration-300 hover:border-line-strong hover:bg-white/[0.08] hover:text-white">
                  {f.label}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </main>
  )
}

import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import CubottMark from "@/components/brand/CubottMark"
import Ambient from "@/components/ui/Ambient"
import { siteConfig } from "@/lib/site"
import { process } from "@/content/company"

export const metadata: Metadata = {
  title: "About — product engineering company in Hyderabad",
  description:
    "Cubott is a Hyderabad-based product engineering company founded in 2025. We help founders shape their product — building and supporting our own systems, and custom software for businesses across Andhra Pradesh, Telangana and beyond.",
  alternates: { canonical: "/about" },
}

const beliefs = [
  "Complexity is normal. We model it instead of flattening it.",
  "If someone has to ring around to find out what happened, the software has failed.",
  "A screen is the top of a stack. We build the stack.",
  "Launch is the middle. We stay with it.",
]

const stack = ["TypeScript across the stack", "PostgreSQL", "State-driven workflows", "Role-based access", "Audit built in", "Multi-tenant"]

const facts = [
  { k: "Founded", v: siteConfig.foundingDate },
  { k: "Based in", v: `${siteConfig.address.city}, ${siteConfig.address.region}` },
  { k: "Working across", v: "Andhra Pradesh and Telangana today; clients anywhere." },
]

/** About: one manifesto, one stack strip, three facts. Nothing that isn't true. */
export default function AboutPage() {
  return (
    <main id="main" className="space-y-3 pt-[calc(var(--header-h)+12px)] lg:space-y-6">
      <section className="stage py-16 md:py-24">
        <Ambient src="/video/cube.mp4" poster="/video/cube.jpg" className="opacity-90 [mask-image:linear-gradient(to_right,transparent_30%,black_60%)]" />
        <Container>
          <Reveal y={10}>
            <CubottMark tone="reverse" className="h-12 w-12" />
          </Reveal>
          <TextReveal as="h1" className="display-xl mt-8 max-w-4xl" delay={0.15} immediate>
            We build systems that turn complexity into clarity.
          </TextReveal>
          <Reveal as="p" delay={0.6} className="mt-8 max-w-2xl text-xl leading-relaxed text-blue-100/80 md:text-2xl">
            A product engineering company that builds and supports its own systems — and yours.
          </Reveal>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="beliefs-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal as="p" y={8} className="eyebrow text-blue-400">
                What we believe
              </Reveal>
              <TextReveal as="h2" id="beliefs-title" className="display-lg mt-3 max-w-[12ch]" delay={0.1}>
                Four lines we work by.
              </TextReveal>
            </div>
            <Stagger as="ul" gap={0.1} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {beliefs.map((b, i) => (
                <StaggerItem as="li" key={b} className="card card-hover p-6 md:p-7">
                  <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-400">
                    0{i + 1}
                  </span>
                  <p className="mt-3 text-lg font-semibold leading-snug tracking-tight md:text-xl">{b}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section id="process" className="stage scroll-mt-6 py-14 md:py-20" aria-labelledby="process-title">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal as="p" y={8} className="eyebrow text-blue-400">
                How a project runs
              </Reveal>
              <TextReveal as="h2" id="process-title" className="display-lg mt-3 max-w-[14ch]" delay={0.1}>
                Seven steps. Each one leaves evidence.
              </TextReveal>
            </div>
            <Reveal delay={0.35} className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2">
              <p className="max-w-sm text-base leading-relaxed text-white/60 md:text-lg">The examples under each step come from Dealer Management, the system this process produced.</p>
            </Reveal>
          </div>
          <Stagger as="ol" gap={0.07} className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {process.map((p) => (
              <StaggerItem as="li" key={p.key} className="card card-hover flex flex-col p-6 md:p-7">
                <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-400">
                  {p.n}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.text}</p>
                <p className="eyebrow mt-5 text-white/40">{p.evidence.label}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                  {p.evidence.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="company-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal as="p" y={8} className="eyebrow text-blue-400">
                The company
              </Reveal>
              <TextReveal as="h2" id="company-title" className="display-lg mt-3 max-w-[12ch]" delay={0.1}>
                A small team with systems in production.
              </TextReveal>
              <Reveal as="div" delay={0.3} className="mt-6 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </Reveal>
            </div>
            <Stagger as="dl" gap={0.1} className="grid gap-4 lg:col-span-7">
              {facts.map((f) => (
                <StaggerItem key={f.k} className="card grid gap-1 p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                  <dt className="eyebrow text-white/45">{f.k}</dt>
                  <dd className="text-lg font-medium">{f.v}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="stage py-14 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <TextReveal as="p" className="max-w-xl text-xl text-blue-100/85 md:text-2xl">
            Have a complex problem? Tell us how your business works.
          </TextReveal>
          <Reveal delay={0.35} y={10}>
            <Button href="/contact" variant="primary-dark" size="lg" arrow>
              Let&apos;s build
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

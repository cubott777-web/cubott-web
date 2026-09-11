import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import BrowserFrame from "@/components/ui/BrowserFrame"
import FlowStepper from "@/components/core/FlowStepper"
import MachineJourney from "@/components/dealer/MachineJourney"
import SystemStories from "@/components/dealer/SystemStories"
import Engineering from "@/components/home/Engineering"
import Trust from "@/components/home/Trust"
import { dealer, roles, serviceLifecycle } from "@/content/dealer"
import { modules, problem } from "@/content/dealer-modules"
import { screens } from "@/content/screens"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dealer Management",
  description:
    "Dealer Management by Cubott: a multi-tenant service management platform for agricultural machinery dealerships — service requests, job cards, parts, store, warranty, manufacturer warehouse, finance and vehicle release.",
  alternates: { canonical: "/products/dealer-management" },
}

const productLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dealer Management",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: dealer.summary,
  author: { "@type": "Organization", name: "Cubott" },
}

export default function DealerManagementPage() {
  const hero = screens["dashboard"]
  const gallery = Object.entries(screens)

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      {/* Hero */}
      <section data-scene="dark" className="bg-navy-900 pb-20 pt-36 text-white md:pb-28 md:pt-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow text-blue-300">Product</p>
                <h1 className="display-xl mt-5">{dealer.name}</h1>
                <p className="mt-6 max-w-lg text-xl leading-relaxed text-blue-100/80 md:text-2xl">{dealer.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact" variant="primary-dark" arrow>
                    Talk to us about Dealer Management
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <BrowserFrame tone="dark" src={hero?.src} alt={hero?.alt ?? "Dealer Management — dealer overview dashboard"} priority />
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-16">
            <FlowStepper tone="dark" steps={serviceLifecycle.map((s) => s.key)} code />
          </Reveal>
        </Container>
      </section>

      {/* The problem */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="problem-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading eyebrow={problem.title} title={<span id="problem-title">Seven conversations. One machine.</span>} lede={problem.lead} />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2">
                {problem.points.map((p, i) => (
                  <Reveal as="li" key={p} delay={0.06 * i} className="bg-white p-6">
                    <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-[15px] leading-relaxed text-navy/85">{p}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <MachineJourney />

      {/* Modules */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="modules-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="The system" title={<span id="modules-title">Every role gets a working surface. Every action leaves a record.</span>} />
          </Reveal>
          <div className="mt-16 flex flex-col gap-20 md:gap-28">
            {modules.map((m, i) => {
              const shot = screens[m.screen]
              const flip = i % 2 === 1
              return (
                <Reveal key={m.key} as="section" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
                    <p className="eyebrow text-navy/50">{m.who}</p>
                    <h3 className="display-md mt-3 text-navy">{m.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate md:text-base">{m.text}</p>
                    <ul className="mt-6 space-y-2.5">
                      {m.facts.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-navy/85">
                          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                          <span className={/→/.test(f) ? "font-mono text-[12.5px] tracking-tight" : ""}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
                    <BrowserFrame src={shot?.src} alt={shot?.alt ?? `Dealer Management — ${m.title}`} caption={shot?.caption} />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <SystemStories variant="full" />

      {/* Roles */}
      <section className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="roles-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Roles" title={<span id="roles-title">Nine roles. Two levels.</span>} lede="Platform roles work across dealers; tenant roles work inside one." size="md" />
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {roles.map((r) => (
              <li key={r.key} className="flex items-center justify-between rounded-xl border border-navy/10 bg-white px-4 py-3">
                <span className="text-sm font-medium text-navy">{r.label}</span>
                <span className="font-mono text-[11px] text-slate">{r.scope}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Engineering tone="light" />
      <Trust />

      {/* Screens */}
      {gallery.length > 0 && (
        <section className="bg-surface py-20 md:py-28" aria-labelledby="screens-title">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Screens" title={<span id="screens-title">The real application.</span>} size="md" />
            </Reveal>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {gallery.map(([key, s]) => (
                <Reveal as="li" key={key}>
                  <BrowserFrame src={s!.src} alt={s!.alt} caption={s!.caption} sizes="(min-width: 768px) 50vw, 100vw" />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-navy-900 py-20 text-white md:py-28" data-scene="dark">
        <Container className="text-center">
          <Reveal>
            <h2 className="display-lg">Run a dealership? Let&apos;s talk.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-blue-100/75">Tell us how your service operation works today.</p>
            <div className="mt-8">
              <Button href="/contact" variant="primary-dark" size="lg" arrow>
                Talk to Cubott
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

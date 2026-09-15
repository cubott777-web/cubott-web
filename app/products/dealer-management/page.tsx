import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import MediaReveal from "@/components/motion/MediaReveal"
import HeroGlow from "@/components/motion/HeroGlow"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
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
      <section data-scene="dark" className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-28 text-white md:pb-20 md:pt-32">
        <HeroGlow />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal as="p" y={8} className="eyebrow text-blue-300">
                Product
              </Reveal>
              <TextReveal as="h1" className="display-xl mt-5" delay={0.15} immediate>
                {dealer.name}
              </TextReveal>
              <Reveal as="p" delay={0.45} className="mt-6 max-w-lg text-xl leading-relaxed text-blue-100/80 md:text-2xl">
                {dealer.tagline}
              </Reveal>
              <Reveal delay={0.6} y={10} className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary-dark" arrow>
                  Talk to us about Dealer Management
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <MediaReveal delay={0.3}>
                <BrowserFrame tone="dark" src={hero?.src} alt={hero?.alt ?? "Dealer Management — dealer overview dashboard"} priority />
              </MediaReveal>
            </div>
          </div>
          <Reveal className="mt-12" delay={0.2}>
            <FlowStepper tone="dark" steps={serviceLifecycle.map((s) => s.key)} code delay={0.4} />
          </Reveal>
        </Container>
      </section>

      {/* The problem */}
      <section className="bg-white py-14 md:py-20" aria-labelledby="problem-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow={problem.title} id="problem-title" title="Seven conversations. One machine." lede={problem.lead} />
            </div>
            <div className="lg:col-span-7">
              <Stagger as="ul" gap={0.08} className="grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2">
                {problem.points.map((p, i) => (
                  <StaggerItem as="li" key={p} className="group bg-white p-6 transition-colors duration-300 hover:bg-surface">
                    <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-[15px] leading-relaxed text-navy/85">{p}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      <MachineJourney />

      {/* Modules */}
      <section className="bg-white py-14 md:py-20" aria-labelledby="modules-title">
        <Container>
          <SectionHeading eyebrow="The system" id="modules-title" title="Every role gets a working surface. Every action leaves a record." />
          <div className="mt-12 flex flex-col gap-14 md:gap-20">
            {modules.map((m, i) => {
              const shot = screens[m.screen]
              const flip = i % 2 === 1
              return (
                <section key={m.key} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <Stagger as="div" gap={0.07} className={cn("lg:col-span-5", flip && "lg:order-2")}>
                    <StaggerItem>
                      <p className="eyebrow text-navy/50">{m.who}</p>
                    </StaggerItem>
                    <StaggerItem>
                      <h3 className="display-md mt-3 text-navy">{m.title}</h3>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="mt-4 text-[15px] leading-relaxed text-slate md:text-base">{m.text}</p>
                    </StaggerItem>
                    <ul className="mt-6 space-y-2.5">
                      {m.facts.map((f) => (
                        <StaggerItem as="li" key={f} className="flex items-start gap-3 text-sm text-navy/85">
                          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                          <span className={/→/.test(f) ? "font-mono text-[12.5px] tracking-tight" : ""}>{f}</span>
                        </StaggerItem>
                      ))}
                    </ul>
                  </Stagger>
                  <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
                    <MediaReveal delay={0.1}>
                      <BrowserFrame src={shot?.src} alt={shot?.alt ?? `Dealer Management — ${m.title}`} caption={shot?.caption} />
                    </MediaReveal>
                  </div>
                </section>
              )
            })}
          </div>
        </Container>
      </section>

      <SystemStories variant="full" />

      {/* Roles */}
      <section className="border-t border-navy/10 bg-surface py-14 md:py-20" aria-labelledby="roles-title">
        <Container>
          <SectionHeading eyebrow="Roles" id="roles-title" title="Nine roles. Two levels." lede="Platform roles work across dealers; tenant roles work inside one." size="md" />
          <Stagger as="ul" gap={0.05} className="mt-10 grid gap-3 sm:grid-cols-3">
            {roles.map((r) => (
              <StaggerItem
                as="li"
                key={r.key}
                className="flex items-center justify-between rounded-xl border border-navy/10 bg-white px-4 py-3 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-card"
              >
                <span className="text-sm font-medium text-navy">{r.label}</span>
                <span className="font-mono text-xs text-slate">{r.scope}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <Engineering tone="light" />
      <Trust />

      {/* Screens */}
      {gallery.length > 0 && (
        <section className="bg-surface py-14 md:py-20" aria-labelledby="screens-title">
          <Container>
            <SectionHeading eyebrow="Screens" id="screens-title" title="The real application." size="md" />
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {gallery.map(([key, s], i) => (
                <li key={key}>
                  <MediaReveal delay={0.08 * (i % 2)}>
                    <BrowserFrame src={s!.src} alt={s!.alt} caption={s!.caption} sizes="(min-width: 768px) 50vw, 100vw" />
                  </MediaReveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-navy-900 py-14 text-white md:py-20" data-scene="dark">
        <Container className="text-center">
          <TextReveal as="h2" className="display-lg">
            Run a dealership? Let&apos;s talk.
          </TextReveal>
          <Reveal as="p" delay={0.3} className="mx-auto mt-5 max-w-xl text-lg text-blue-100/75">
            Tell us how your service operation works today.
          </Reveal>
          <Reveal delay={0.45} y={10} className="mt-8">
            <Button href="/contact" variant="primary-dark" size="lg" arrow>
              Talk to Cubott
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

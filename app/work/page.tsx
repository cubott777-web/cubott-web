import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import BrowserFrame from "@/components/ui/BrowserFrame"
import FlowStepper from "@/components/core/FlowStepper"
import WorkshopStory from "@/components/dealer/WorkshopStory"
import { serviceLifecycle } from "@/content/dealer"
import { screens } from "@/content/screens"

export const metadata: Metadata = {
  title: "Work",
  description: "Built. Shipped. Used. Case studies of systems Cubott has built — the problem, the system, and what became clearer.",
  alternates: { canonical: "/work" },
}

/**
 * Only work that is built, shipped and in use appears here. No statistics are quoted unless verified;
 * none are currently verified, so none are shown.
 */
const caseStudy = {
  name: "Dealer Management",
  sector: "Agricultural machinery dealerships",
  problem: [
    "Servicing a machine ran across seven parties with no shared record.",
    "Warranty approvals either blocked service or drifted out of sync with it.",
    "Parts were issued, used, returned and claimed with no single trail.",
  ],
  system: [
    "A multi-tenant platform with nine roles, each with its own working surface.",
    "State-driven lifecycles for requests, job cards and parts, enforced in code.",
    "Warranty runs in parallel with service; workshop slots and bays are tracked.",
  ],
  result: [
    "One record per machine visit: where it is, what was done, who did it.",
    "Service no longer waits for the manufacturer; approvals are tracked to receipt.",
    "Billing is classified from what was actually used, approved and returned.",
  ],
}

export default function WorkPage() {
  const hero = screens["dashboard"]
  const store = screens["store"] ?? screens["inventory"]
  return (
    <main id="main">
      <section className="bg-white pb-16 pt-36 md:pb-24 md:pt-44">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Work"
              title="Built. Shipped. Used."
              lede="What was difficult, what we built, and what became clearer. Nothing here is projected or estimated."
            />
          </Reveal>
        </Container>
      </section>

      <article className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="cs-title">
        <Container>
          <Reveal>
            <p className="eyebrow text-blue">Case study · {caseStudy.sector}</p>
            <h2 id="cs-title" className="display-lg mt-4 text-navy">
              {caseStudy.name}
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <BrowserFrame src={hero?.src} alt={hero?.alt ?? "Dealer Management — dealer overview dashboard"} caption={hero?.caption} priority />
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {[
              { title: "The problem", sub: "What was difficult?", items: caseStudy.problem },
              { title: "The system", sub: "What did Cubott build?", items: caseStudy.system },
              { title: "The result", sub: "What became clearer?", items: caseStudy.result },
            ].map((col, i) => (
              <Reveal key={col.title} delay={0.08 * i}>
                <h3 className="display-sm text-navy">{col.title}</h3>
                <p className="mt-1 text-sm text-slate">{col.sub}</p>
                <ul className="mt-5 space-y-4 border-t border-navy/10 pt-5">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-navy/85">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-2xl border border-navy/10 bg-white p-6 md:p-10">
            <FlowStepper label="Service request lifecycle" steps={serviceLifecycle.map((s) => s.key)} code />
            <div className="mt-12">
              <p className="eyebrow mb-6 text-navy/50">Physical and digital, in step</p>
              <WorkshopStory />
            </div>
          </Reveal>

          {store && (
            <Reveal className="mt-12">
              <BrowserFrame src={store.src} alt={store.alt} caption={store.caption} />
            </Reveal>
          )}

          <Reveal className="mt-12 flex flex-wrap gap-3">
            <Button href="/products/dealer-management" arrow>
              Explore the product
            </Button>
            <Button href="/contact" variant="ghost" arrow>
              Build something with us
            </Button>
          </Reveal>
        </Container>
      </article>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              size="md"
              eyebrow="More work"
              title="More case studies as they reach the bar."
              lede="Work appears here once it is built, shipped and in use."
            />
          </Reveal>
          <Reveal className="mt-8">
            <Button href="/contact" variant="secondary" arrow>
              Ask about our work
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

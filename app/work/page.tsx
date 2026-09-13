import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import BrowserFrame from "@/components/ui/BrowserFrame"
import FlowStepper from "@/components/core/FlowStepper"
import CustomSoftware from "@/components/home/CustomSoftware"
import { solutionCategories } from "@/content/company"
import { serviceLifecycle } from "@/content/dealer"
import { screens } from "@/content/screens"

export const metadata: Metadata = {
  title: "Work",
  description:
    "What Cubott builds and what it's built. Custom software and business platforms, shaped around the way businesses actually work — and Dealer Management, the fullest example of that discipline.",
  alternates: { canonical: "/work" },
}

const caseStudy = {
  name: "Dealer Management",
  sector: "Agricultural machinery dealerships",
  line: "Servicing a machine used to run across seven parties with no shared record. Warranty approvals either blocked service or drifted out of sync with it. Parts were issued, used, returned and claimed with no single trail.",
  result:
    "Now it's one record per machine visit — where it is, what was done, who did it. Service no longer waits for the manufacturer, and billing is classified from what was actually used, approved and returned.",
}

/**
 * Work: what Cubott builds (in general) and what it's built (in particular) — one page instead of
 * three, since for a single-product company "Products," "Solutions" and "Work" all answered the
 * same question from slightly different angles.
 */
export default function WorkPage() {
  const hero = screens["dashboard"]

  return (
    <main id="main">
      <section data-scene="dark" className="bg-navy-900 pb-16 pt-28 text-white md:pb-20 md:pt-32">
        <Container>
          <Reveal>
            <p className="eyebrow text-blue-300">Work</p>
            <h1 className="display-xl mt-5 max-w-3xl">Technology for businesses that don&apos;t fit inside a template.</h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-blue-100/80 md:text-2xl">
              What we build, in general — and what we&apos;ve built, in particular.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="what-we-build-title">
        <Container>
          <Reveal>
            <h2 id="what-we-build-title" className="display-lg max-w-2xl text-navy">
              What we build.
            </h2>
          </Reveal>
          <ol className="mt-10 border-t border-navy/10">
            {solutionCategories.map((c, i) => (
              <Reveal
                as="li"
                key={c.key}
                delay={0.06 * i}
                className="group relative grid gap-3 border-b border-navy/10 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span aria-hidden="true" className="absolute -left-4 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 md:-left-6" />
                <h3 className="text-2xl font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-blue md:col-span-4 md:text-[1.75rem] md:leading-tight">{c.title}</h3>
                <p className="max-w-lg text-[15px] leading-relaxed text-slate md:col-span-8 md:pt-1.5 md:text-base">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-14 md:py-20" aria-labelledby="cs-title">
        <Container>
          <Reveal>
            <p className="eyebrow text-blue">Case study · {caseStudy.sector}</p>
            <h2 id="cs-title" className="display-lg mt-4 max-w-2xl text-navy">
              {caseStudy.name}
            </h2>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-lg leading-relaxed text-navy/85">{caseStudy.line}</p>
                <p className="mt-5 text-lg leading-relaxed text-navy/85">{caseStudy.result}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/products/dealer-management" arrow>
                    Explore Dealer Management
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.12}>
                <BrowserFrame src={hero?.src} alt={hero?.alt ?? "Dealer Management — dealer overview dashboard"} caption={hero?.caption} />
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15} className="mt-10">
            <FlowStepper label="Service request lifecycle" steps={serviceLifecycle.map((s) => s.key)} code />
          </Reveal>
        </Container>
      </section>

      <CustomSoftware />
    </main>
  )
}

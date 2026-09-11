import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import BrowserFrame from "@/components/ui/BrowserFrame"
import CubottMark from "@/components/brand/CubottMark"
import { dealer, serviceLifecycle } from "@/content/dealer"
import { screens } from "@/content/screens"
import FlowStepper from "@/components/core/FlowStepper"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products designed around real operational problems. Dealer Management is Cubott's flagship: an operating system for agricultural equipment dealerships.",
  alternates: { canonical: "/products" },
}

const philosophy = [
  {
    title: "Products come from problems, not markets.",
    text: "Dealer Management exists because service, parts, warranty and finance were four disconnected stories. The product is the connection.",
  },
  {
    title: "The workflow is the product.",
    text: "Statuses, gates and permissions are designed before screens.",
  },
  {
    title: "Real-world state matters.",
    text: "A machine is in a bay or a parking slot; a part is in the store or with the manufacturer. The system knows which.",
  },
  {
    title: "Products keep evolving.",
    text: "Finance, workshop tracking and an inventory redesign all arrived after the first release.",
  },
]

export default function ProductsPage() {
  const hero = screens["dashboard"]
  return (
    <main id="main">
      <section className="bg-white pb-16 pt-36 md:pb-24 md:pt-44">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Products"
              title="Software we've built."
              lede="Products designed around real operational problems."
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="dm-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-blue">Flagship product</p>
                <h2 id="dm-title" className="display-lg mt-4 text-navy">{dealer.name}</h2>
                <p className="mt-4 text-xl text-navy/80 md:text-2xl">{dealer.tagline}</p>
                <p className="mt-6 text-[15px] leading-relaxed text-slate md:text-base">{dealer.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/products/dealer-management" arrow>
                    Explore Dealer Management
                  </Button>
                  <Button href="/contact" variant="ghost" arrow>
                    Talk to us
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <BrowserFrame
                  src={hero?.src}
                  alt={hero?.alt ?? "Dealer Management — dealer overview dashboard"}
                  caption={hero?.caption}
                  priority
                />
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-16">
            <FlowStepper label="Service request lifecycle" steps={serviceLifecycle.map((s) => s.key)} code />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="other-apps-title">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Other applications"
              title={<span id="other-apps-title">One flagship. The same discipline everywhere.</span>}
              lede="Only what is built and in use appears here. More will follow as it reaches that bar."
              size="md"
            />
          </Reveal>
          <Reveal className="mt-10">
            <Button href="/solutions" variant="secondary" arrow>
              What we can build for you
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="philosophy-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Product philosophy" title={<span id="philosophy-title">How we think about products.</span>} />
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 md:grid-cols-2">
            {philosophy.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.06 * i} className="bg-white p-7 md:p-9">
                <CubottMark className="h-6 w-6" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-navy-900 py-20 text-white md:py-28" data-scene="dark">
        <Container className="text-center">
          <Reveal>
            <h2 className="display-lg">Have an operational problem that needs a product?</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-blue-100/75">Tell us how the work actually happens.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary-dark" size="lg" arrow>
                Build with Cubott
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

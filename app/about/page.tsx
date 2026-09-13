import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import CubottMark from "@/components/brand/CubottMark"

export const metadata: Metadata = {
  title: "About",
  description:
    "Cubott is a product engineering company. We build systems that turn business complexity into clarity — products, business platforms and custom software built around the way businesses actually work.",
  alternates: { canonical: "/about" },
}

const beliefs = [
  { title: "Complexity is normal.", text: "Real businesses have exceptions and parallel approvals. We model them instead of flattening them." },
  { title: "The system should already know.", text: "If someone has to ring around to find out what happened, the software has failed." },
  { title: "Whole systems, not screens.", text: "A screen is the top of a stack. We build the stack." },
  { title: "Launch is the middle.", text: "Software changes because the business changes. We stay with it." },
]

const approach = [
  { k: "Products", v: "We build our own — starting with Dealer Management — so our judgement stays honest about what works in operation." },
  { k: "Systems for others", v: "The same discipline for businesses that need software shaped around their own workflow." },
  { k: "Engineering", v: "TypeScript across the stack, PostgreSQL, state-driven workflows, role-based access, audit built in." },
  { k: "Relationship", v: "Few clients, close attention, and support after launch." },
]

export default function AboutPage() {
  return (
    <main id="main">
      <section data-scene="dark" className="bg-navy-900 pb-16 pt-28 text-white md:pb-20 md:pt-32">
        <Container>
          <Reveal>
            <CubottMark tone="reverse" className="h-12 w-12" />
            <h1 className="display-xl mt-8 max-w-4xl">We build systems that turn complexity into clarity.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-blue-100/80 md:text-2xl">
              A product engineering company that builds and supports its own systems.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="beliefs-title">
        <Container>
          <Reveal>
            <h2 id="beliefs-title" className="display-lg max-w-2xl text-navy">
              What we believe.
            </h2>
          </Reveal>
          <ol className="mt-10 border-t border-navy/10">
            {beliefs.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={0.06 * i}
                className="group relative grid gap-3 border-b border-navy/10 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span aria-hidden="true" className="absolute -left-4 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 md:-left-6" />
                <h3 className="text-2xl font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-blue md:col-span-4 md:text-[1.75rem] md:leading-tight">{b.title}</h3>
                <p className="max-w-lg text-[15px] leading-relaxed text-slate md:col-span-8 md:pt-1.5 md:text-base">{b.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-14 md:py-20" aria-labelledby="approach-title">
        <Container>
          <Reveal>
            <h2 id="approach-title" className="display-lg max-w-2xl text-navy">
              How we work.
            </h2>
          </Reveal>
          <dl className="mt-10 border-t border-navy/10">
            {approach.map((a, i) => (
              <Reveal
                as="div"
                key={a.k}
                delay={0.06 * i}
                className="group relative grid gap-2 border-b border-navy/10 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span aria-hidden="true" className="absolute -left-4 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 md:-left-6" />
                <dt className="eyebrow text-navy/60 transition-colors duration-300 group-hover:text-blue md:col-span-4 md:pt-1">{a.k}</dt>
                <dd className="max-w-lg text-[15px] leading-relaxed text-navy/85 md:col-span-8 md:text-base">{a.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section data-scene="dark" className="bg-navy-900 py-14 text-white md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-xl text-blue-100/85">Have a complex problem? Tell us how your business works.</p>
          <Button href="/contact" variant="primary-dark" size="lg" arrow>
            Let&apos;s build
          </Button>
        </Container>
      </section>
    </main>
  )
}

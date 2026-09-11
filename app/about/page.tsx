import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import CubottMark from "@/components/brand/CubottMark"
import WhyCubott from "@/components/home/WhyCubott"

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
      <section data-scene="dark" className="bg-navy-900 pb-20 pt-36 text-white md:pb-28 md:pt-44">
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

      <section className="bg-white py-20 md:py-28" aria-labelledby="beliefs-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What we believe" title={<span id="beliefs-title">What we believe.</span>} />
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal as="li" key={b.title} delay={0.06 * i} className="border-t border-navy/10 pt-6">
                <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate md:text-base">{b.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="approach-title">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How we work" title={<span id="approach-title">How we work.</span>} size="md" />
          </Reveal>
          <dl className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
            {approach.map((a) => (
              <Reveal as="div" key={a.k} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <dt className="eyebrow text-navy/60 md:col-span-3 md:pt-1">{a.k}</dt>
                <dd className="text-[15px] leading-relaxed text-navy/85 md:col-span-9 md:text-base">{a.v}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <WhyCubott />

      <section className="bg-white py-20 md:py-28">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-xl text-navy/85">Have a complex problem? Tell us how your business works.</p>
          <Button href="/contact" arrow>
            Let&apos;s build
          </Button>
        </Container>
      </section>
    </main>
  )
}

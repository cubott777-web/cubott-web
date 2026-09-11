import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Reveal from "@/components/motion/Reveal"
import { principles } from "@/content/company"

export default function WhyCubott() {
  return (
    <section className="bg-surface py-24 md:py-32" aria-labelledby="why-title">
      <Container>
        <Reveal>
          <SectionHeading index="10" eyebrow="Why Cubott" title={<span id="why-title">Built for the real world.</span>} />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.08 * i} className="bg-white p-7 md:p-9">
              <h3 className="text-xl font-semibold tracking-tight text-navy md:text-2xl">{p.title}</h3>
              <p className="mt-2 text-base text-slate">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

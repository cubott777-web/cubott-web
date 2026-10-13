import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import { services } from "@/content/company"

/** What we do: three cards you can read in five seconds. Pills say what's inside. Proof comes in the next section. */
export default function Services() {
  return (
    <section className="stage py-14 md:py-20" aria-labelledby="services-title">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal as="p" y={8} className="eyebrow text-blue-400">
              What we do
            </Reveal>
            <TextReveal as="h2" id="services-title" className="display-lg mt-3 max-w-[14ch]" delay={0.1}>
              Complex business, working software.
            </TextReveal>
          </div>
          <Reveal delay={0.35} className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2">
            <p className="max-w-sm text-base leading-relaxed text-white/60 md:text-lg">Three ways we work. Every one of them ends in a system that runs.</p>
          </Reveal>
        </div>

        <Stagger as="ul" gap={0.1} className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem as="li" key={s.key} className="card card-hover group p-7 md:p-8">
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-blue-400">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.pills.map((p) => (
                  <li key={p} className="pill">
                    {p}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

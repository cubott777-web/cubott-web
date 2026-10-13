import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import RowRule from "@/components/motion/RowRule"
import { promises } from "@/content/company"

/** Five things you can hold us to. Big dim numerals, one line each. */
export default function Promises() {
  return (
    <section className="stage py-14 md:py-20" aria-labelledby="promises-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal as="p" y={8} className="eyebrow text-blue-400">
              How we work
            </Reveal>
            <TextReveal as="h2" id="promises-title" className="display-lg mt-3 max-w-[12ch]" delay={0.1}>
              Five things you can hold us to.
            </TextReveal>
            <Reveal delay={0.3} className="mt-6">
              <Link href="/about#process" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-blue-400">
                See how a project runs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <ol className="relative lg:col-span-7">
            <RowRule position="top" tone="dark" />
            {promises.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.06 * i} className="group relative grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6 md:py-7">
                <RowRule delay={0.06 * i + 0.2} tone="dark" />
                <span aria-hidden="true" className="text-4xl font-bold tabular-nums tracking-tightest text-white/15 transition-colors duration-500 group-hover:text-blue-400 md:text-5xl">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/55 md:text-base">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

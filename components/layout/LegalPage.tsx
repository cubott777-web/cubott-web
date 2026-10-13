import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"

interface Section {
  title: string
  body: React.ReactNode
}

/** Quiet, readable layout for the legal pages: one column, real headings, nothing decorative. */
export default function LegalPage({ eyebrow, title, updated, intro, sections }: { eyebrow: string; title: string; updated: string; intro: string; sections: Section[] }) {
  return (
    <main id="main" className="pt-[calc(var(--header-h)+12px)]">
      <section className="stage py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <Reveal as="p" y={8} className="eyebrow text-blue-400">
              {eyebrow}
            </Reveal>
            <TextReveal as="h1" className="display-lg mt-5" delay={0.15} immediate>
              {title}
            </TextReveal>
            <Reveal as="p" delay={0.45} className="mt-4 text-sm text-white/45">
              Last updated {updated}
            </Reveal>
            <Reveal as="p" delay={0.5} className="mt-8 text-lg leading-relaxed text-white/80">
              {intro}
            </Reveal>
            <div className="mt-12 space-y-10">
              {sections.map((s) => (
                <Reveal key={s.title} as="section" className="border-t border-line pt-8">
                  <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/60 md:text-base [&_a]:font-medium [&_a]:text-white [&_a]:underline-offset-4 hover:[&_a]:text-blue-300 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc">
                    {s.body}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

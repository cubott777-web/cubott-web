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
    <main id="main" className="bg-white">
      <section className="pb-16 pt-28 md:pb-20 md:pt-32">
        <Container>
          <div className="max-w-3xl">
            <Reveal as="p" y={8} className="eyebrow text-blue">
              {eyebrow}
            </Reveal>
            <TextReveal as="h1" className="display-lg mt-5 text-navy" delay={0.15} immediate>
              {title}
            </TextReveal>
            <Reveal as="p" delay={0.45} className="mt-4 text-sm text-slate">
              Last updated {updated}
            </Reveal>
            <Reveal as="p" delay={0.5} className="mt-8 text-lg leading-relaxed text-navy/85">
              {intro}
            </Reveal>
            <div className="mt-12 space-y-10">
              {sections.map((s) => (
                <Reveal key={s.title} as="section" className="border-t border-navy/10 pt-8">
                  <h2 className="text-xl font-semibold tracking-tight text-navy md:text-2xl">{s.title}</h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate md:text-base [&_a]:font-medium [&_a]:text-navy [&_a]:underline-offset-4 hover:[&_a]:text-blue hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc">
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

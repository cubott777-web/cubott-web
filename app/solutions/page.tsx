import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import SectionHeading from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import CustomSoftware from "@/components/home/CustomSoftware"
import HowWeBuild from "@/components/home/HowWeBuild"
import { solutionCategories } from "@/content/company"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, business platforms, workflow systems, internal applications and integrations — built around the way your business actually works.",
  alternates: { canonical: "/solutions" },
}

export default function SolutionsPage() {
  return (
    <main id="main">
      <section className="bg-white pb-16 pt-36 md:pb-24 md:pt-44">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Solutions"
              title="Technology for businesses that don't fit inside a template."
              lede="Software built around the way your business actually works."
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-surface py-20 md:py-28" aria-labelledby="categories-title">
        <Container>
          <h2 id="categories-title" className="sr-only">
            What we build
          </h2>
          <ol className="divide-y divide-navy/10 border-y border-navy/10">
            {solutionCategories.map((c, i) => (
              <Reveal as="li" key={c.key} delay={0.04 * i} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="display-sm text-navy">{c.title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-base leading-relaxed text-navy/85">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <HowWeBuild />
      <CustomSoftware />

      <section className="border-t border-navy/10 bg-surface py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-lg text-navy/80">Dealer Management is the fullest example of this discipline.</p>
          <Button href="/products/dealer-management" variant="secondary" arrow>
            Explore Dealer Management
          </Button>
        </Container>
      </section>
    </main>
  )
}

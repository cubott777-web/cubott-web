import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import ProductMedia from "@/components/ui/ProductMedia"
import Ambient from "@/components/ui/Ambient"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import MediaReveal from "@/components/motion/MediaReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import { products } from "@/content/products"
import { modules } from "@/content/dealer-modules"
import { solutionCategories } from "@/content/company"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Work — custom software development in Hyderabad",
  description:
    "Systems Cubott has built: Dealer Management for agricultural machinery dealers, Clinic Management and School Management. A product engineering company in Hyderabad serving Andhra Pradesh, Telangana and clients worldwide.",
  alternates: { canonical: "/products" },
}

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/products#service`,
  name: "Custom software development",
  serviceType: "Custom software development and product engineering",
  provider: { "@id": `${siteConfig.url}/#organization` },
  areaServed: [...siteConfig.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })), { "@type": "Place", name: "Worldwide" }],
  description:
    "Custom software, multi-role business platforms, state-driven workflow systems, internal applications and integrations, built around a business's own roles, rules and exceptions.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "What we build",
    itemListElement: solutionCategories.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c.title, description: c.text },
    })),
  },
  url: `${siteConfig.url}/products`,
}

/** Work: each system gets one stage — clip, one line, and what's inside as pills. No paragraphs. */
export default function ProductsPage() {
  return (
    <main id="main" className="space-y-3 pt-[calc(var(--header-h)+12px)] lg:space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <section className="stage py-16 md:py-24">
        <Ambient src="/video/ambient.mp4" poster="/video/ambient.jpg" className="opacity-70 [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]" />
        <Container>
          <Reveal as="p" y={8} className="eyebrow text-blue-400">
            Work
          </Reveal>
          <TextReveal as="h1" className="display-xl mt-5 max-w-3xl" delay={0.15} immediate>
            Systems that are running today.
          </TextReveal>
          <Reveal as="p" delay={0.4} className="mt-6 max-w-xl text-xl leading-relaxed text-blue-100/80 md:text-2xl">
            Three systems in production. Nine roles on one platform. Every screen below is the real thing.
          </Reveal>
          <Reveal as="div" delay={0.5} className="mt-8 flex flex-wrap gap-2">
            {products.map((p) => (
              <a key={p.key} href={`#${p.key}`} className="pill transition-[border-color,background-color,color] duration-300 hover:border-line-strong hover:bg-white/[0.08] hover:text-white">
                {p.title}
              </a>
            ))}
          </Reveal>
        </Container>
      </section>

      {products.map((p, i) => (
        <section key={p.key} id={p.key} className="stage scroll-mt-6 py-14 md:py-20" aria-labelledby={`${p.key}-title`}>
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className={i % 2 === 1 ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"}>
                <Reveal as="p" y={8} className="text-sm font-medium text-white/50">
                  {p.sector}
                </Reveal>
                <TextReveal as="h2" id={`${p.key}-title`} className="display-md mt-2" delay={0.1}>
                  {p.title}
                </TextReveal>
                <Reveal as="p" delay={0.2} className="mt-4 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                  {p.line}
                </Reveal>
                {p.key === "dealer" && (
                  <Stagger as="ul" gap={0.04} className="mt-6 flex flex-wrap gap-2">
                    {modules.map((m) => (
                      <StaggerItem as="li" key={m.key} className="pill">
                        {m.title}
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
                <Reveal delay={0.3} className="mt-8">
                  <Button href="/contact" variant="primary-dark" arrow>
                    Ask for a demo
                  </Button>
                </Reveal>
              </div>
              <MediaReveal className={i % 2 === 1 ? "lg:col-span-7 lg:order-1" : "lg:col-span-7"}>
                <div className="aspect-video overflow-hidden rounded-2xl border border-line-strong bg-navy-900 shadow-frame-dark">
                  <ProductMedia video={p.video} poster={p.poster} label={p.title} />
                </div>
              </MediaReveal>
            </div>
          </Container>
        </section>
      ))}

      <section className="stage py-14 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <TextReveal as="p" className="max-w-xl text-xl text-blue-100/85 md:text-2xl">
            Something else entirely? That&apos;s usually where we start.
          </TextReveal>
          <Reveal delay={0.35} y={10}>
            <Button href="/contact" variant="primary-dark" size="lg" arrow>
              Start a conversation
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

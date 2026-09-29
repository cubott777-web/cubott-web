import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import RowRule from "@/components/motion/RowRule"
import HeroGlow from "@/components/motion/HeroGlow"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import CustomSoftware from "@/components/home/CustomSoftware"
import { solutionCategories } from "@/content/company"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Custom software development in Hyderabad",
  description:
    "Custom software, business platforms and workflow systems built around the way your business actually works. Cubott is a product engineering company in Hyderabad serving Andhra Pradesh, Telangana and clients worldwide — see Dealer Management, our fullest example.",
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

const caseStudy = {
  name: "Dealer Management",
  sector: "Agricultural machinery dealerships",
  line: "One platform that runs a dealership end to end — from the first service call to the sale, the stock and the payroll.",
}

const modules = [
  { title: "Service management", text: "Service requests, job cards and technicians, tracked from intake to release." },
  { title: "Inventory management", text: "Parts and stock across the store, with every issue and return recorded." },
  { title: "Warranty management", text: "Warranty claims and manufacturer approvals, running alongside service." },
  { title: "Finance", text: "Billing, invoices and payments, with release only once paid." },
  { title: "Warehouse", text: "Manufacturer warehouse issues and dealer receipts, verified end to end." },
  { title: "POS", text: "Counter sales of parts and accessories, billed on the spot." },
  { title: "Sales", text: "Enquiries, quotations and machine sales in one pipeline." },
  { title: "HR", text: "Staff, attendance and roles for everyone in the dealership." },
]

/**
 * Products: what Cubott builds (in general) and what it's built (in particular) — one page instead
 * of three, since for a single-product company "Products," "Solutions" and "Work" all answered the
 * same question from slightly different angles.
 */
export default function ProductsPage() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <section data-scene="dark" className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-28 text-white md:pb-20 md:pt-32">
        <HeroGlow />
        <Container>
          <Reveal as="p" y={8} className="eyebrow text-blue-300">
            Products
          </Reveal>
          <TextReveal as="h1" className="display-xl mt-5 max-w-3xl" delay={0.15} immediate>
            Technology for businesses that don&apos;t fit inside a template.
          </TextReveal>
          <Reveal as="p" delay={0.55} className="mt-6 max-w-xl text-xl leading-relaxed text-blue-100/80 md:text-2xl">
            What we build, in general — and what we&apos;ve built, in particular.
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="what-we-build-title">
        <Container>
          <TextReveal as="h2" id="what-we-build-title" className="display-lg max-w-2xl text-navy">
            What we build.
          </TextReveal>
          <ol className="relative mt-10">
            <RowRule position="top" />
            {solutionCategories.map((c, i) => (
              <Reveal
                as="li"
                key={c.key}
                delay={0.06 * i}
                className="group relative grid gap-3 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1.5 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <RowRule delay={0.06 * i + 0.2} />
                <span aria-hidden="true" className="absolute -left-4 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 md:-left-6" />
                <h3 className="text-2xl font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-blue md:col-span-4 md:text-[1.75rem] md:leading-tight">{c.title}</h3>
                <p className="max-w-lg text-[15px] leading-relaxed text-slate md:col-span-8 md:pt-1.5 md:text-base">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-14 md:py-20" aria-labelledby="cs-title">
        <Container>
          <Reveal as="p" y={8} className="eyebrow text-blue">
            Case study · {caseStudy.sector}
          </Reveal>
          <TextReveal as="h2" id="cs-title" className="display-lg mt-4 max-w-2xl text-navy" delay={0.1}>
            {caseStudy.name}
          </TextReveal>

          <Reveal as="p" delay={0.2} className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/80">
            {caseStudy.line}
          </Reveal>

          <Stagger as="ul" gap={0.05} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <StaggerItem
                as="li"
                key={m.title}
                className="group rounded-2xl border border-navy/10 bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue/30 hover:shadow-card"
              >
                <h3 className="text-xl font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-blue">{m.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{m.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <Button href="/contact" arrow>
              Ask for a demo
            </Button>
          </Reveal>
        </Container>
      </section>

      <CustomSoftware />
    </main>
  )
}

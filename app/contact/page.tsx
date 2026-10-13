import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import ContactForm from "@/components/contact/ContactForm"
import { siteConfig, phoneHref, intents } from "@/lib/site"
import { faq } from "@/content/company"

export const metadata: Metadata = {
  title: "Contact — custom software company in Hyderabad",
  description:
    "Talk to Cubott about custom software for your business. Call +91 99599 12812 or email contact@cubott.com. Based in Miyapur, Hyderabad; working with businesses across Andhra Pradesh, Telangana and worldwide.",
  alternates: { canonical: "/contact" },
}

const tiles = [
  { Icon: Phone, k: "Call", v: siteConfig.contactPhone, href: `tel:${phoneHref}` },
  { Icon: Mail, k: "Email", v: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
  { Icon: MapPin, k: "Visit", v: `${siteConfig.address.street}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`, href: undefined },
]

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent } = await searchParams
  const initialMessage = intents.find((i) => i.key === intent)?.message ?? ""

  return (
    <main id="main" className="space-y-3 pt-[calc(var(--header-h)+12px)] lg:space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="stage py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal as="p" y={8} className="eyebrow text-blue-400">
                Contact
              </Reveal>
              <TextReveal as="h1" className="display-xl mt-5" delay={0.15} immediate>
                Have a complex problem?
              </TextReveal>
              <Reveal as="p" delay={0.5} className="mt-6 max-w-md text-xl leading-relaxed text-white/60">
                Tell us how your business works. We read every message and reply ourselves.
              </Reveal>
              <Stagger as="ul" gap={0.08} className="mt-10 grid gap-3">
                {tiles.map(({ Icon, k, v, href }) => {
                  const inner = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white/[0.04] text-blue-400">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{k}</span>
                        <span className="mt-0.5 block text-base font-medium">{v}</span>
                      </span>
                    </>
                  )
                  return (
                    <StaggerItem as="li" key={k}>
                      {href ? (
                        <a href={href} className="card card-hover flex items-center gap-4 p-4">
                          {inner}
                        </a>
                      ) : (
                        <div className="card flex items-center gap-4 p-4">{inner}</div>
                      )}
                    </StaggerItem>
                  )
                })}
              </Stagger>
            </div>
            <div className="lg:col-span-7">
              <ContactForm key={intent} initialMessage={initialMessage} />
            </div>
          </div>
        </Container>
      </section>

      <section className="stage py-14 md:py-20" aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal as="p" y={8} className="eyebrow text-blue-400">
                Before you write
              </Reveal>
              <TextReveal as="h2" id="faq-title" className="display-lg mt-3 max-w-[12ch]" delay={0.1}>
                The questions we get first.
              </TextReveal>
            </div>
            <Stagger as="dl" gap={0.08} className="grid gap-4 lg:col-span-7">
              {faq.map((f) => (
                <StaggerItem key={f.q} className="card p-6 md:p-7">
                  <dt className="text-lg font-semibold tracking-tight md:text-xl">{f.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-white/60 md:text-base">{f.a}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>
    </main>
  )
}

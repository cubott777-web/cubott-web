import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import ContactForm from "@/components/contact/ContactForm"
import { siteConfig, phoneHref, intents } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact — custom software company in Hyderabad",
  description:
    "Talk to Cubott about custom software for your business. Call +91 99599 12812 or email contact@cubott.com. Based in Miyapur, Hyderabad; working with businesses across Andhra Pradesh, Telangana and worldwide.",
  alternates: { canonical: "/contact" },
}

const tiles = [
  { Icon: Phone, k: "Call", v: siteConfig.contactPhone, href: `tel:${phoneHref}` },
  { Icon: Mail, k: "Email", v: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
  { Icon: MapPin, k: "Visit", v: `${siteConfig.address.city}, ${siteConfig.address.region}`, href: undefined },
]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent } = await searchParams
  const initialMessage = intents.find((i) => i.key === intent)?.message ?? ""

  return (
    <main id="main" className="pt-[calc(var(--header-h)+12px)]">
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
    </main>
  )
}

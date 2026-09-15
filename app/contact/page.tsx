import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
import TextReveal from "@/components/motion/TextReveal"
import Stagger, { StaggerItem } from "@/components/motion/Stagger"
import ContactForm from "@/components/contact/ContactForm"
import CubottMark from "@/components/brand/CubottMark"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a complex problem? Tell us how your business works. Let's see what we can build.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <main id="main" className="bg-white">
      <section className="pb-16 pt-28 md:pb-20 md:pt-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal as="p" y={8} className="eyebrow text-blue">
                Contact
              </Reveal>
              <TextReveal as="h1" className="display-xl mt-5 text-navy" delay={0.15} immediate>
                Have a complex problem?
              </TextReveal>
              <Reveal as="p" delay={0.5} className="mt-6 max-w-md text-xl leading-relaxed text-slate">
                Tell us how your business works. Let&apos;s see what we can build.
              </Reveal>
              <Stagger as="div" gap={0.1} className="mt-10 flex flex-col gap-6 border-t border-navy/10 pt-6 sm:flex-row sm:gap-10">
                <StaggerItem>
                  <p className="eyebrow text-navy/50">Email</p>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 inline-block text-lg font-medium text-navy transition-colors hover:text-blue">
                    {siteConfig.contactEmail}
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <p className="eyebrow text-navy/50">Phone</p>
                  <a
                    href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                    className="mt-2 inline-block text-lg font-medium text-navy transition-colors hover:text-blue"
                  >
                    {siteConfig.contactPhone}
                  </a>
                </StaggerItem>
              </Stagger>
              <Reveal delay={0.2} y={8} className="mt-10 flex items-center gap-3 text-sm text-slate">
                <CubottMark className="h-5 w-5" />
                We read every message and reply personally.
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

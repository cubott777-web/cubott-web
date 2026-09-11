import type { Metadata } from "next"
import Container from "@/components/ui/Container"
import Reveal from "@/components/motion/Reveal"
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
      <section className="pb-20 pt-36 md:pb-28 md:pt-44">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-blue">Contact</p>
                <h1 className="display-xl mt-5 text-navy">Have a complex problem?</h1>
                <p className="mt-6 max-w-md text-xl leading-relaxed text-slate">
                  Tell us how your business works. Let&apos;s see what we can build.
                </p>
                <div className="mt-10 border-t border-navy/10 pt-6">
                  <p className="eyebrow text-navy/50">Email</p>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 inline-block text-lg font-medium text-navy hover:text-blue">
                    {siteConfig.contactEmail}
                  </a>
                </div>
                <div className="mt-10 flex items-center gap-3 text-sm text-slate">
                  <CubottMark className="h-5 w-5" />
                  We read every message and reply personally.
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

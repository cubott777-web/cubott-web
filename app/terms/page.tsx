import type { Metadata } from "next"
import LegalPage from "@/components/layout/LegalPage"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply to using the Cubott website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of use"
      updated="15 September 2026"
      intro="These terms cover your use of this website. Work we do for clients is governed by a separate written agreement."
      sections={[
        {
          title: "Using this site",
          body: <p>You may browse this site and contact us through it for lawful purposes. Please do not attempt to disrupt it, probe it for weaknesses, or use automated tools to submit the contact form.</p>,
        },
        {
          title: "Content",
          body: (
            <p>
              The text, design, brand and product descriptions on this site belong to {siteConfig.legalName} unless stated otherwise. You are welcome to quote or link to it with attribution. Please ask before reproducing substantial parts.
            </p>
          ),
        },
        {
          title: "Product information",
          body: <p>Descriptions of our products reflect documented functionality at the time of writing. Software changes; the current scope of any product is confirmed in writing when we work together.</p>,
        },
        {
          title: "No warranty for the website",
          body: <p>The site is provided as-is. We aim to keep it accurate and available but do not guarantee either, and we are not liable for loss arising from reliance on its content.</p>,
        },
        {
          title: "Governing law",
          body: <p>These terms are governed by the laws of India, and any dispute is subject to the courts of Hyderabad, Telangana.</p>,
        },
        {
          title: "Contact",
          body: (
            <p>
              Questions about these terms: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          ),
        },
      ]}
    />
  )
}

import type { Metadata } from "next"
import LegalPage from "@/components/layout/LegalPage"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Cubott handles the information you share with us through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      updated="15 September 2026"
      intro="This website collects as little as it can. Here is exactly what we collect, why, and what we do with it."
      sections={[
        {
          title: "Who we are",
          body: (
            <p>
              {siteConfig.legalName} (&ldquo;Cubott&rdquo;, &ldquo;we&rdquo;), {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}, India. Questions about this policy go to{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          ),
        },
        {
          title: "What we collect",
          body: (
            <>
              <p>The only personal information this site collects is what you type into the contact form: your name, email address, company (optional) and message.</p>
              <p>We do not use analytics, advertising pixels, tracking cookies or third-party scripts that profile visitors. The site sets no cookies of its own.</p>
            </>
          ),
        },
        {
          title: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiry and, if you ask us to, to scope work with you.</li>
              <li>We do not add you to a mailing list, sell your details, or share them with anyone outside Cubott, except the email or messaging service that delivers your enquiry to our inbox.</li>
            </ul>
          ),
        },
        {
          title: "How long we keep it",
          body: <p>Contact enquiries are kept for as long as the conversation is live and for up to 24 months afterwards for our records, then deleted. Email us at any time to have your details removed sooner.</p>,
        },
        {
          title: "Your rights",
          body: (
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> and we will respond within 30 days.
            </p>
          ),
        },
        {
          title: "Changes",
          body: <p>If we change how this site handles data, we will update this page and the date above.</p>,
        },
      ]}
    />
  )
}

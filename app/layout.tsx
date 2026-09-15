import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import SiteFooter from "@/components/layout/SiteFooter"
import { siteConfig, phoneHref } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Cubott — Custom software & product engineering, Hyderabad`,
    template: "%s — Cubott",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Cubott",
    "custom software development Hyderabad",
    "custom software company Telangana",
    "custom software Andhra Pradesh",
    "product engineering company",
    "business platforms",
    "workflow software",
    "dealer management software",
    "software for agricultural machinery dealers",
  ],
  authors: siteConfig.founders.map((name) => ({ name })),
  creator: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: siteConfig.url,
    title: `Cubott — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Cubott — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F3B" },
  ],
}

/**
 * One entity graph for the whole site: the company (as both an Organization and a local
 * ProfessionalService, so it qualifies for Knowledge Graph and local results), its founders, and
 * the website itself. Every page's own schema points back at these @ids.
 */
const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      alternateName: "Cubott Technologies",
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/cubott-mark.png` },
      image: `${siteConfig.url}/opengraph-image`,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      email: siteConfig.contactEmail,
      telephone: phoneHref,
      foundingDate: siteConfig.foundingDate,
      founder: siteConfig.founders.map((name) => ({ "@type": "Person", name })),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      areaServed: [
        ...siteConfig.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
        { "@type": "Place", name: "Worldwide" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: phoneHref,
        email: siteConfig.contactEmail,
        availableLanguage: ["en", "te", "hi"],
        areaServed: "IN",
      },
      sameAs: [siteConfig.linkedin],
      knowsAbout: [
        "Custom software development",
        "Product engineering",
        "Business platforms",
        "Workflow systems",
        "Dealer management software",
        "Clinic management software",
        "School management software",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}

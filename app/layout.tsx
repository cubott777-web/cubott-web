import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Cubott - Dealership Management Platform",
  description: siteConfig.description,
  keywords: [
    "dealership management",
    "SaaS",
    "service management",
    "inventory management",
    "sales management",
    "finance",
    "multi-tenant",
    "precision intelligence",
  ],
  authors: [{ name: "Cubott" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Cubott - Dealership Management Platform",
    description:
      "Digitize your entire dealership workflow with complete traceability and role-based control.",
    type: "website",
    url: siteConfig.url,
    locale: "en_US",
    siteName: siteConfig.name,
    images: ["/cubott-logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubott - Dealership Management Platform",
    description:
      "Digitize your entire dealership workflow with complete traceability and role-based control.",
    images: ["/cubott-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contactEmail,
      logo: `${siteConfig.url}/cubott-logo.webp`,
    },
  }

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased grain-overlay`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

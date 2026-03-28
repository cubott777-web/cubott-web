import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cubott — Agricultural Dealership Management Platform",
  description: "Cubott is a multi-tenant SaaS platform that digitizes end-to-end service operations for agricultural machinery dealerships. Service requests, spare parts, warranty approvals, inventory, and billing — all in one place.",
  keywords: ["agricultural machinery", "dealership management", "SaaS", "service management", "spare parts tracking", "warranty approvals", "inventory management", "multi-tenant"],
  authors: [{ name: "Cubott" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Cubott — Agricultural Dealership Management Platform",
    description: "Digitize your entire dealership workflow with complete traceability and role-based control.",
    type: "website",
    locale: "en_US",
    siteName: "Cubott",
    images: ['/cubott-logo.webp'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubott — Agricultural Dealership Management Platform",
    description: "Digitize your entire dealership workflow with complete traceability and role-based control.",
    images: ['/cubott-logo.webp'],
  },
  robots: "index, follow",
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
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

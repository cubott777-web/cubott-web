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
  title: "Cubott — Dealership Management Platform",
  description: "Cubott is a multi-tenant SaaS platform that digitizes end-to-end dealership operations. Service, inventory, sales, and finance — all in one place with complete traceability.",
  keywords: ["dealership management", "SaaS", "service management", "inventory management", "sales management", "finance", "multi-tenant", "precision intelligence"],
  authors: [{ name: "Cubott" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Cubott — Dealership Management Platform",
    description: "Digitize your entire dealership workflow with complete traceability and role-based control.",
    type: "website",
    locale: "en_US",
    siteName: "Cubott",
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
      <body className={`${inter.className} antialiased grain-overlay`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

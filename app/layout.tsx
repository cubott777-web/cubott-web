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
  title: "Cubott - Enterprise Technology Solutions",
  description: "Engineering reliable, intelligent, and scalable digital systems. Expert software development, cloud architecture, DevOps, and AI/ML integration for enterprise.",
  keywords: ["software development", "cloud architecture", "DevOps", "AI ML integration", "enterprise consulting", "technology consulting"],
  authors: [{ name: "Cubott" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Cubott - Enterprise Technology Solutions",
    description: "Engineering reliable, intelligent, and scalable digital systems for enterprise.",
    type: "website",
    locale: "en_US",
    siteName: "Cubott",
    images: ['/cubott-logo.webp'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubott - Enterprise Technology Solutions",
    description: "Engineering reliable, intelligent, and scalable digital systems for enterprise.",
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

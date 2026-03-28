"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Container from "../ui/Container"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#platform", label: "Platform" },
    { href: "/#why-cubott", label: "Why Cubott" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#05090F]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="group flex items-center gap-3">
            <img
              src="/cubott-logo.webp"
              alt="Cubott"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-cubott-teal transition-colors">
              Cubott
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5 hover:scale-105 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cubott-teal text-white text-sm font-semibold hover:bg-cubott-teal-dark transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cubott-teal/30"
            >
              Let&apos;s Talk Business
            </Link>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#05090F]/98 backdrop-blur-xl border-t border-white/5"
          >
            <Container>
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Let&apos;s Talk Business
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

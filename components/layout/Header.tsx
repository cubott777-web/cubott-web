"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Container from "../ui/Container"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
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
          ? "bg-[#040D1A]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/cubott-logo.webp"
              alt="Cubott Logo"
              className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-white tracking-tight">Cubott</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cubott-teal text-white text-sm font-semibold hover:bg-cubott-teal-dark transition-all duration-200 shadow-lg shadow-cubott-teal/25 hover:shadow-cubott-teal/40"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-white transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#040D1A]/95 backdrop-blur-xl border-t border-white/5"
          >
            <Container>
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4" />
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

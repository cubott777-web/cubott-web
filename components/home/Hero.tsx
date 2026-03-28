"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function Hero() {
  const badges = [
    "Service Management",
    "Inventory Control",
    "Sales Pipeline",
    "Finance & Billing",
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#040D1A]">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 hero-glow" />

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cubott-teal rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/3 left-1/5 w-[500px] h-[500px] bg-cubott-navy-light rounded-full blur-[120px] pointer-events-none"
      />

      <Container className="relative z-10 pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold tracking-wide mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cubott-teal animate-pulse" />
            Precision Intelligence System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            The Operating System
            <br />
            <span className="gradient-text">for Modern</span>
            <br />
            Dealerships
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Cubott digitizes end-to-end dealership operations — from service and inventory to sales and finance — with complete traceability and role-based control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-cubott-teal text-white font-semibold text-base hover:bg-cubott-teal-dark transition-all duration-200 shadow-2xl shadow-cubott-teal/30 hover:shadow-cubott-teal/50 hover:-translate-y-0.5"
            >
              Request a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/#platform"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass text-white/80 font-semibold text-base hover:text-white hover:bg-white/8 transition-all duration-200"
            >
              See the Platform
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {badges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-sm text-white/45">
                <CheckCircle2 className="w-4 h-4 text-cubott-teal flex-shrink-0" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

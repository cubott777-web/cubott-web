"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const badges = [
    "Service Request Lifecycle",
    "Spare Parts Tracking",
    "Warranty Approvals",
    "Inventory Management",
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
            <span className="gradient-text">for Agricultural</span>
            <br />
            Dealerships
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Cubott digitizes end-to-end service operations for agricultural machinery dealerships — from service requests to warranty approvals, with complete traceability and role-based control.
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl overflow-hidden mockup-shadow">
            <div className="bg-[#0A1628] rounded-t-2xl px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-xs mx-auto h-6 bg-white/5 rounded-md flex items-center justify-center">
                  <span className="text-white/25 text-xs">app.cubott.com/dashboard</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/screenshot-intelligence.png"
                alt="Cubott Intelligence Dashboard"
                width={1024}
                height={576}
                className="w-full object-cover"
                style={{ height: 'auto' }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/40 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -left-8 top-16 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              animate-float={{ y: [0, -8, 0] }}
              className="glass rounded-2xl p-4 shadow-2xl w-52"
            >
              <div className="text-xs text-white/40 mb-1">BAYS IN SERVICE</div>
              <div className="text-3xl font-bold text-white mb-0.5">3/10</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cubott-teal" />
                <span className="text-xs text-cubott-teal">Live Operations</span>
              </div>
            </motion.div>
          </div>

          <div className="absolute -right-8 top-24 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="glass rounded-2xl p-4 shadow-2xl w-52"
            >
              <div className="text-xs text-white/40 mb-1">TOTAL STOCK</div>
              <div className="text-3xl font-bold text-white mb-0.5">2,710</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-green-400">Inventory Healthy</span>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="glass rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-6"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-white">99.9%</div>
                <div className="text-xs text-white/40">Uptime SLA</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-white">500+</div>
                <div className="text-xs text-white/40">Active Users</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-xs text-white/40">Traceability</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

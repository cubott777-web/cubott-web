"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05090F]">
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Video background placeholder — drop hero.mp4 into /public/ to activate */}
      <div className="absolute inset-0 z-0">
        {/* Uncomment when video is ready:
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="/hero.mp4"
        />
        */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05090F] via-[#081420] to-[#05090F]" />
      </div>

      <motion.div
        animate={{ opacity: [0.1, 0.22, 0.1], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-cubott-teal rounded-full blur-[200px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-teal text-cubott-teal text-xs font-semibold tracking-[0.15em] uppercase mb-10 relative"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cubott-teal animate-ping absolute left-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-cubott-teal ml-3" />
          <span className="ml-1">Precision Intelligence System</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(3.5rem,9vw,7.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white mb-8"
        >
          The OS for{" "}
          <span className="gradient-teal">Modern</span>
          <br />
          Dealerships.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          One platform for service, inventory, sales, and finance.
          Complete traceability. Role-based control. Zero compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-cubott-teal/30 text-base"
          >
            Let&apos;s Talk Business
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/#platform"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/10 text-white/70 font-medium hover:text-white hover:border-white/25 transition-all duration-200 text-base"
          >
            <Play className="w-4 h-4 fill-white/50 group-hover:fill-white transition-colors" />
            See the Platform
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {[
            { val: "99.9%", label: "Uptime SLA" },
            { val: "500+", label: "Active Users" },
            { val: "4", label: "Core Modules" },
            { val: "100%", label: "Traceability" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight">{s.val}</div>
              <div className="text-xs text-white/35 uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-[10px] text-white/25 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}

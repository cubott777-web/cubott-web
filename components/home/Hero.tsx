"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

function AweRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cubott-teal/[0.06]"
          style={{
            width: `${i * 220}px`,
            height: `${i * 220}px`,
          }}
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {[1, 2, 3].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border border-cubott-teal/10"
          style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
          animate={{
            scale: [0.85, 1.6],
            opacity: [0.35, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.6,
          }}
        />
      ))}

      <motion.div
        className="absolute w-3 h-3 rounded-full bg-cubott-teal"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
          boxShadow: [
            "0 0 20px 6px rgba(79,179,217,0.3)",
            "0 0 50px 20px rgba(79,179,217,0.5)",
            "0 0 20px 6px rgba(79,179,217,0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 340
        const x = Math.cos(angle) * r
        const y = Math.sin(angle) * r
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-cubott-teal"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        )
      })}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05090F]">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05090F] via-[#081420]/80 to-[#05090F]" />
      </div>

      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] bg-cubott-teal rounded-full blur-[220px] pointer-events-none"
      />

      <AweRings />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.92] tracking-[-0.04em] text-white mb-8"
        >
          The OS for{" "}
          <span className="gradient-teal">Modern</span>
          <br />
          Dealerships.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-14 leading-relaxed font-light"
        >
          Service. Inventory. Sales. Finance.
          <br />
          One platform. Complete control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
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
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/10 text-white/60 font-medium hover:text-white hover:border-white/25 transition-all duration-200 text-base"
          >
            <Play className="w-4 h-4 fill-white/40 group-hover:fill-white transition-colors" />
            See the Platform
          </Link>
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

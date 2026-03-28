"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "500+", label: "Active Users" },
  { value: "4", label: "Core Modules" },
  { value: "100%", label: "Traceability" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#030B15]">
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[30%] w-[700px] h-[700px] bg-cubott-teal rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-cubott-navy-light rounded-full blur-[140px] pointer-events-none"
      />

      <Container className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center min-h-[80vh]">

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-px h-6 bg-cubott-teal" />
              <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">
                Cubott — Precision Intelligence System
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em] mb-8"
            >
              <span className="block text-white">The Operating</span>
              <span className="block text-white">System for</span>
              <span className="block gradient-text">Modern</span>
              <span className="block text-white">Dealerships.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-white/45 max-w-sm mb-10 leading-relaxed font-light"
            >
              Cubott replaces disconnected spreadsheets and manual workflows with one unified platform — service, inventory, sales, and finance with complete traceability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cubott-teal text-white font-semibold text-sm hover:bg-cubott-teal-dark transition-all duration-200 shadow-2xl shadow-cubott-teal/25 hover:shadow-cubott-teal/40 hover:-translate-y-0.5"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/#platform"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-white/60 font-medium text-sm hover:text-white hover:border-white/20 transition-all duration-200"
              >
                See the Platform
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[580px]">
              <div className="relative rounded-2xl overflow-hidden mockup-shadow">
                <div className="bg-[#080f1c] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="max-w-[200px] mx-auto h-5 bg-white/5 rounded flex items-center justify-center">
                      <span className="text-white/20 text-[10px]">app.cubott.com</span>
                    </div>
                  </div>
                </div>
                <Image
                  src="/screenshot-supervisor.png"
                  alt="Cubott Supervisor Dashboard"
                  width={900}
                  height={506}
                  className="w-full object-cover"
                  style={{ height: 'auto' }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#030B15]/60 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="animate-float absolute -bottom-6 -left-8 glass rounded-2xl p-4 shadow-2xl"
              >
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Live Stock</div>
                <div className="text-2xl font-black text-white">2,710</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-emerald-400 font-medium">All healthy</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-2xl"
              >
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Bays In Service</div>
                <div className="text-2xl font-black text-white">3<span className="text-white/30 font-light">/10</span></div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cubott-teal animate-pulse" />
                  <span className="text-[11px] text-cubott-teal font-medium">Live</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 border-t border-white/5 mt-auto"
      >
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 px-8 first:pl-0">
                <div className="text-3xl font-black text-white mb-0.5">{stat.value}</div>
                <div className="text-xs text-white/35 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  )
}

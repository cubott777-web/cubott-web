"use client"

import { motion } from "framer-motion"
import Container from "@/components/ui/Container"
import { Mail, ArrowUpRight } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#05090F] flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cubott-teal rounded-full blur-[200px] pointer-events-none"
      />

      <Container className="relative z-10 flex-1 flex flex-col items-center justify-center py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Contact</span>
            <span className="w-6 h-px bg-cubott-teal" />
          </div>

          <h1 className="font-bagel text-[clamp(3.5rem,9vw,8rem)] text-white leading-[1.05] tracking-wide mb-6">
            Let&apos;s Talk<br />
            <span className="gradient-teal">Business.</span>
          </h1>

          <p className="text-white/40 text-lg max-w-md mx-auto mb-16 leading-relaxed font-light">
            Ready to digitize your dealership operations? Drop us an email and we&apos;ll get back to you within 24 hours.
          </p>

          <motion.a
            href="mailto:contact@cubott.com"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="group inline-flex items-center gap-4 px-10 py-6 rounded-2xl border border-cubott-teal/20 bg-cubott-teal/6 hover:bg-cubott-teal/12 hover:border-cubott-teal/40 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 rounded-xl bg-cubott-teal/15 flex items-center justify-center group-hover:bg-cubott-teal/25 transition-colors">
              <Mail className="w-5 h-5 text-cubott-teal" />
            </div>
            <div className="text-left">
              <div className="text-xs text-white/30 uppercase tracking-widest mb-0.5 font-light">Email us at</div>
              <div className="font-bagel text-2xl text-white tracking-wide group-hover:text-cubott-teal transition-colors">
                contact@cubott.com
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-cubott-teal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-white/20 text-sm font-light"
          >
            We typically respond within 24 business hours.
          </motion.p>
        </motion.div>
      </Container>

      {/* Bottom wordmark */}
      <div className="relative z-10 overflow-hidden">
        <div className="font-bagel text-[clamp(5rem,18vw,14rem)] text-white/[0.025] leading-none select-none tracking-wide text-center pb-0">
          CUBOTT
        </div>
      </div>
    </main>
  )
}

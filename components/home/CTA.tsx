"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#030B15] py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-cubott-teal rounded-full blur-[180px] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-px h-5 bg-cubott-teal" />
                <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Get Started</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] tracking-[-0.03em] text-white mb-6">
                Ready to<br />
                <span className="gradient-text">digitize your</span><br />
                business?
              </h2>
              <p className="text-white/40 text-base leading-relaxed font-light max-w-sm">
                Join businesses already running on Cubott. See the platform in action with a personalized demo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-4 lg:min-w-[260px]"
            >
              <Link
                href="/contact"
                className="group flex items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all duration-200 shadow-2xl shadow-cubott-teal/25 hover:shadow-cubott-teal/40 hover:-translate-y-0.5"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between gap-4 px-6 py-5 rounded-2xl border border-white/8 text-white/60 font-medium hover:text-white hover:border-white/16 transition-all duration-200"
              >
                <span>Talk to Sales</span>
                <ArrowRight className="w-5 h-5 opacity-50" />
              </Link>

              <div className="mt-4 space-y-2.5">
                {["Multi-tenant SaaS", "99.9% Uptime SLA", "Full audit trail", "Role-based access"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-white/25">
                    <span className="w-1 h-1 rounded-full bg-cubott-teal flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-24 pt-10 border-t border-white/5 flex items-center justify-between gap-8"
          >
            <div className="text-[clamp(4rem,10vw,8rem)] font-black tracking-[-0.05em] text-white/4 leading-none select-none">
              CUBOTT
            </div>
            <div className="text-xs text-white/20 text-right font-light">
              Precision Intelligence<br />System — 2026
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

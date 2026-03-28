"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#05090F] py-36">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-cubott-teal rounded-full blur-[200px] pointer-events-none"
      />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Get Started</span>
            <span className="w-6 h-px bg-cubott-teal" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-[0.95] mb-8">
            Ready to run a<br />
            <span className="gradient-teal">smarter dealership?</span>
          </h2>

          <p className="text-white/40 text-lg max-w-lg mx-auto mb-12 leading-relaxed font-light">
            Join businesses already running on Cubott. See the platform in action with a personalized walkthrough.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-cubott-teal text-white font-semibold hover:bg-cubott-teal-dark transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-cubott-teal/30 text-base"
            >
              Let&apos;s Talk Business
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#features"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-white/10 text-white/60 font-medium hover:text-white hover:border-white/20 transition-all duration-200 text-base"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

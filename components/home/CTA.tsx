"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Container from "../ui/Container"
import { ArrowRight, Mail, Phone } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#040D1A]">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cubott-teal rounded-full blur-[140px] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cubott-teal/8 to-cubott-navy-light/8 rounded-3xl" />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-8">
                  Get Started Today
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Ready to digitize
                  <br />
                  <span className="gradient-text">your dealership?</span>
                </h2>

                <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
                  Join dealerships already running on Cubott. See the platform in action with a personalized demo.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-cubott-teal text-white font-semibold text-base hover:bg-cubott-teal-dark transition-all duration-200 shadow-2xl shadow-cubott-teal/30 hover:shadow-cubott-teal/50 hover:-translate-y-0.5"
                  >
                    Request a Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-white/80 font-semibold text-base hover:text-white hover:bg-white/8 transition-all duration-200"
                  >
                    Talk to Sales
                  </Link>
                </div>

                <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/35">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal" />
                    Multi-tenant SaaS
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal" />
                    99.9% Uptime SLA
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal" />
                    Role-based access
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cubott-teal" />
                    Full audit trail
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

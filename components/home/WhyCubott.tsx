"use client"

import { motion } from "framer-motion"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"
import { AlertTriangle, Eye, Clock, UserX } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "Manual Service Tracking",
    description: "Teams rely on phone calls and spreadsheets to track service jobs, causing delays and missed SLAs.",
  },
  {
    icon: Eye,
    title: "Poor Inventory Visibility",
    description: "No real-time view of stock availability leads to shortages, over-ordering, and operational downtime.",
  },
  {
    icon: AlertTriangle,
    title: "Fragmented Sales Process",
    description: "Sales data lives in silos — disconnected from service, inventory, and finance — slowing down deals.",
  },
  {
    icon: UserX,
    title: "Lack of Accountability",
    description: "Without traceability, it's impossible to know who did what, when, and why — leaving gaps in every audit.",
  },
]

const solutions = [
  { stat: "100%", label: "Digital Traceability" },
  { stat: "60%", label: "Faster Operations" },
  { stat: "3x", label: "Inventory Accuracy" },
  { stat: "500+", label: "Active Users" },
]

export default function WhyCubott() {
  return (
    <section id="why-cubott" className="py-28 bg-[#060F1E] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cubott-teal/5 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-6">
              The Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Businesses are drowning
              <br />
              <span className="gradient-text-teal">in manual processes</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Dealerships and distribution businesses manage complex, multi-step workflows across service, inventory, sales, and finance — all without the right tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5 rounded-xl hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center mt-0.5">
                      <p.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">{p.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-6">
              Our Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Cubott digitizes
              <br />
              <span className="gradient-text-teal">the entire workflow</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              One unified platform replaces disconnected tools. Every team — supervisors, store staff, sales, and finance — works from the same system with role-based access and complete traceability.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {solutions.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-6 rounded-2xl text-center hover:border-cubott-teal/20 transition-all"
                >
                  <div className="text-4xl font-bold gradient-text-teal mb-1">{s.stat}</div>
                  <div className="text-white/40 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-cubott-teal/10 flex items-center justify-center mt-0.5">
                  <span className="text-cubott-teal text-lg font-bold">✓</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1">Multi-Tenant Architecture</div>
                  <div className="text-white/40 text-xs leading-relaxed">
                    Fully isolated per business. Each tenant gets their own data, users, and configuration — with cross-tenant visibility for management where needed.
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

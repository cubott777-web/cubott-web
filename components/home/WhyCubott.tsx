"use client"

import { motion } from "framer-motion"
import Container from "../ui/Container"

const problems = [
  {
    num: "01",
    title: "Manual Service Tracking",
    description: "Teams rely on phone calls and spreadsheets to track service jobs, causing delays and missed SLAs.",
  },
  {
    num: "02",
    title: "Poor Inventory Visibility",
    description: "No real-time view of stock leads to shortages, over-ordering, and operational downtime.",
  },
  {
    num: "03",
    title: "Fragmented Sales Process",
    description: "Sales data lives in silos — disconnected from service, inventory, and finance — slowing deals down.",
  },
  {
    num: "04",
    title: "Zero Accountability",
    description: "Without traceability, you can't know who did what or when — leaving every audit full of gaps.",
  },
]

const metrics = [
  { value: "100%", label: "Traceability" },
  { value: "60%", label: "Faster Ops" },
  { value: "3×", label: "Inventory Accuracy" },
  { value: "500+", label: "Active Users" },
]

export default function WhyCubott() {
  return (
    <section id="why-cubott" className="bg-[#020810] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">

          <div className="py-24 pr-0 lg:pr-20 border-b lg:border-b-0 lg:border-r border-white/6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-12">
                <span className="w-px h-5 bg-red-400/60" />
                <span className="text-xs font-semibold tracking-[0.2em] text-red-400/60 uppercase">The Problem</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[1] mb-16">
                Businesses drowning<br />in broken tools.
              </h2>
            </motion.div>

            <div className="space-y-0">
              {problems.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-6 py-8 border-t border-white/6 hover:border-white/12 transition-colors"
                >
                  <span className="text-xs font-bold tracking-widest text-white/15 mt-1 flex-shrink-0 w-6">{p.num}</span>
                  <div>
                    <h4 className="font-bold text-white mb-1.5 group-hover:text-cubott-teal transition-colors text-base">{p.title}</h4>
                    <p className="text-white/35 text-sm leading-relaxed font-light">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="py-24 pl-0 lg:pl-20 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-12">
                <span className="w-px h-5 bg-cubott-teal" />
                <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Our Solution</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[1] mb-6">
                One platform.<br />
                <span className="gradient-text-teal">Total control.</span>
              </h2>
              <p className="text-white/40 text-base leading-relaxed font-light max-w-sm mb-16">
                Every team — supervisors, store staff, sales, and finance — works from the same system with role-based access and complete traceability.
              </p>
            </motion.div>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="border border-white/6 rounded-2xl p-6 hover:border-cubott-teal/20 hover:bg-cubott-teal/3 transition-all duration-300"
                  >
                    <div className="text-4xl font-black gradient-text-teal mb-1">{m.value}</div>
                    <div className="text-xs text-white/35 uppercase tracking-wider">{m.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="border border-cubott-teal/15 rounded-2xl p-5 bg-cubott-teal/4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg border border-cubott-teal/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cubott-teal text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold mb-1">Multi-Tenant Architecture</div>
                    <div className="text-white/35 text-xs leading-relaxed font-light">
                      Fully isolated per business. Each tenant gets their own data, users, and config — with cross-tenant visibility for management where needed.
                    </div>
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

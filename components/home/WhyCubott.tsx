"use client"

import { motion } from "framer-motion"
import Container from "../ui/Container"

const problems = [
  { num: "01", title: "Manual Service Tracking", desc: "Teams rely on phone calls and spreadsheets, causing delays and missed SLAs." },
  { num: "02", title: "Poor Inventory Visibility", desc: "No real-time view of stock leads to shortages, over-ordering, and downtime." },
  { num: "03", title: "Fragmented Sales Process", desc: "Sales data in silos — disconnected from service, inventory, and finance." },
  { num: "04", title: "Zero Accountability", desc: "Without traceability, audits are full of gaps and nobody knows who did what." },
]

const metrics = [
  { value: "100%", label: "Traceability" },
  { value: "60%", label: "Faster Ops" },
  { value: "3×", label: "Accuracy" },
  { value: "500+", label: "Users" },
]

export default function WhyCubott() {
  return (
    <section id="why-cubott" className="bg-[#030710] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="py-16 pr-0 lg:pr-20 border-b lg:border-b-0 lg:border-r border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-10">
                <span className="w-6 h-px bg-red-400/50" />
                <span className="text-xs font-semibold tracking-[0.2em] text-red-400/60 uppercase">The Problem</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[0.95] mb-16">
                Businesses drowning<br />in broken tools.
              </h2>
            </motion.div>

            <div className="space-y-0 divide-y divide-white/5">
              {problems.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-6 py-7"
                >
                  <span className="text-xs font-bold tracking-widest text-white/12 mt-1 flex-shrink-0">{p.num}</span>
                  <div>
                    <h4 className="font-bold text-white/80 mb-1.5 group-hover:text-cubott-teal transition-colors">{p.title}</h4>
                    <p className="text-white/30 text-sm leading-relaxed font-light">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="py-16 pl-0 lg:pl-20 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-10">
                <span className="w-6 h-px bg-cubott-teal" />
                <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Our Solution</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[0.95] mb-6">
                One platform.<br />
                <span className="gradient-teal">Total control.</span>
              </h2>
              <p className="text-white/35 text-base leading-relaxed font-light max-w-sm mb-16">
                Every team works from the same system with role-based access and complete traceability — supervisors, store staff, sales, and finance.
              </p>
            </motion.div>

            <div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="border border-white/6 rounded-2xl p-6 hover:border-cubott-teal/20 hover:bg-cubott-teal/3 transition-all duration-300"
                  >
                    <div className="text-4xl font-black tracking-tight gradient-teal mb-1.5">{m.value}</div>
                    <div className="text-xs text-white/30 uppercase tracking-wider">{m.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-cubott-teal/12 bg-cubott-teal/4 p-5"
              >
                <div className="text-sm font-semibold text-white mb-1">Multi-Tenant Architecture</div>
                <div className="text-xs text-white/30 leading-relaxed font-light">
                  Fully isolated per business. Each tenant gets their own data, users, and configuration — with cross-tenant visibility for management where needed.
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

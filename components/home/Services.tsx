"use client"

import { motion } from "framer-motion"
import { Wrench, Package, TrendingUp, FileText, Check } from "lucide-react"
import Container from "../ui/Container"

const modules = [
  {
    num: "01",
    icon: Wrench,
    title: "Service",
    tagline: "End-to-end job management",
    description: "Digitize the full service lifecycle — from intake to job closure — with technician assignment, bay tracking, and overdue alerts built in.",
    accent: "#4FB3D9",
    accentBg: "rgba(79,179,217,0.06)",
    accentBorder: "rgba(79,179,217,0.15)",
    accentText: "text-cubott-teal",
    features: ["Request intake & assignment", "Bay and slot management", "Job tracking & alerts", "Warranty workflows", "Full audit trail"],
    large: true,
  },
  {
    num: "02",
    icon: Package,
    title: "Inventory",
    tagline: "Real-time parts visibility",
    description: "Track every part across every location. Eliminate shortages, prevent over-ordering, and keep the floor moving.",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.06)",
    accentBorder: "rgba(167,139,250,0.15)",
    accentText: "text-violet-400",
    features: ["Multi-location stock", "Low-stock alerts", "Issuance & returns", "Category management", "Auto replenishment"],
    large: false,
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Sales",
    tagline: "Pipeline to delivery",
    description: "Track every deal from inquiry through delivery. Manage orders, monitor team performance, and never lose a lead.",
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.06)",
    accentBorder: "rgba(52,211,153,0.15)",
    accentText: "text-emerald-400",
    features: ["Quote & order tracking", "Pipeline management", "Dispatch coordination", "Performance analytics", "Customer records"],
    large: false,
  },
  {
    num: "04",
    icon: FileText,
    title: "Finance",
    tagline: "Billing without blind spots",
    description: "Auto-generate invoices across every team, track payments, and maintain a complete financial trail — all synced with operations.",
    accent: "#fbbf24",
    accentBg: "rgba(251,191,36,0.06)",
    accentBorder: "rgba(251,191,36,0.15)",
    accentText: "text-amber-400",
    features: ["Invoice generation", "Payment tracking", "Cross-module billing", "Financial audit logs", "Cost reporting"],
    large: true,
  },
]

export default function Services() {
  return (
    <section id="features" className="py-16 bg-[#05090F] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <Container className="relative z-10">
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Platform Modules</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[0.95]"
          >
            Four modules.{" "}
            <span className="gradient-teal">One platform.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`${mod.large ? "lg:col-span-2" : "lg:col-span-1"} group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5`}
              style={{
                background: mod.accentBg,
                borderColor: mod.accentBorder,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${mod.accent}60, transparent)` }}
              />

              <div className="p-7">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mod.accent}18`, border: `1px solid ${mod.accent}25` }}
                    >
                      <mod.icon size={16} style={{ color: mod.accent }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-40" style={{ color: mod.accent }}>
                        {mod.num}
                      </div>
                      <div className="text-[11px] font-medium opacity-50 text-white">{mod.tagline}</div>
                    </div>
                  </div>
                  <span
                    className="text-[4rem] font-black leading-none select-none opacity-[0.07] -mt-2 -mr-1"
                    style={{ color: mod.accent }}
                  >
                    {mod.num}
                  </span>
                </div>

                <h3
                  className="text-3xl font-black tracking-[-0.02em] mb-3"
                  style={{ color: mod.accent }}
                >
                  {mod.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 font-light max-w-md">
                  {mod.description}
                </p>

                <div className={`grid gap-y-2 gap-x-6 ${mod.large ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
                  {mod.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={11} style={{ color: mod.accent }} className="flex-shrink-0 opacity-70" />
                      <span className="text-xs text-white/40 font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at bottom center, ${mod.accent}08 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

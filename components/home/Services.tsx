"use client"

import { motion } from "framer-motion"
import { Wrench, Package, TrendingUp, FileText } from "lucide-react"
import Container from "../ui/Container"
import Image from "next/image"

const modules = [
  {
    num: "01",
    icon: Wrench,
    title: "Service",
    description: "End-to-end service request lifecycle. Assign technicians, manage bays, close work orders with full accountability.",
    accentColor: "#4FB3D9",
    accentGrad: "from-cubott-teal to-sky-400",
    features: ["Request intake & assignment", "Bay and slot management", "Job progress tracking", "Overdue alerts", "Warranty workflows", "Full audit trail"],
    image: "/screenshot-supervisor.png",
    large: true,
  },
  {
    num: "02",
    icon: Package,
    title: "Inventory",
    description: "Real-time parts visibility across all locations. Eliminate shortages, reduce over-ordering.",
    accentColor: "#a78bfa",
    accentGrad: "from-violet-500 to-purple-400",
    features: ["Parts catalog", "Low stock alerts", "Issuance & returns", "Multi-location", "Category bins", "Replenishment"],
    image: "/screenshot-inventory.png",
    large: false,
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Sales",
    description: "Manage your pipeline from inquiry to delivery. Track orders, monitor performance.",
    accentColor: "#34d399",
    accentGrad: "from-emerald-500 to-teal-400",
    features: ["Pipeline management", "Quote & order tracking", "Performance metrics", "Customer management", "Dispatch tracking", "Analytics"],
    image: "/screenshot-manufacturer.png",
    large: false,
  },
  {
    num: "04",
    icon: FileText,
    title: "Finance",
    description: "Integrated billing across every team. Auto-generate invoices, track payments, maintain a complete financial trail.",
    accentColor: "#fbbf24",
    accentGrad: "from-amber-500 to-orange-400",
    features: ["Invoice generation", "Payment tracking", "Financial audit logs", "Role-based access", "Cross-module billing", "Cost reporting"],
    image: "/screenshot-audit.png",
    large: true,
  },
]

export default function Services() {
  return (
    <section id="features" className="py-28 bg-[#05090F] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <Container className="relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Platform Modules</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bagel text-[clamp(2.5rem,6vw,5rem)] text-white leading-[1.1] tracking-wide"
          >
            Four modules.{" "}
            <span className="gradient-teal">One platform.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${mod.large ? "lg:col-span-2" : "lg:col-span-1"} relative group overflow-hidden rounded-2xl border border-white/6 bg-[#080d18] hover:border-white/12 transition-all duration-400 hover:-translate-y-1 min-h-[300px]`}
            >
              <div className="absolute inset-0">
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d18] via-[#080d18]/85 to-transparent" />
              </div>

              <div
                className="absolute top-6 right-6 font-bagel text-[6rem] leading-none select-none pointer-events-none opacity-[0.07]"
                style={{ color: mod.accentColor }}
              >
                {mod.num}
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.accentGrad} p-px`}>
                    <div className="w-full h-full rounded-xl bg-[#080d18] flex items-center justify-center">
                      <mod.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60" style={{ color: mod.accentColor }}>
                    {mod.num} · {mod.title}
                  </span>
                </div>

                <h3 className="font-bagel text-2xl text-white tracking-wide mb-3">{mod.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">{mod.description}</p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {mod.features.map((f) => (
                    <span key={f} className="text-[11px] px-3 py-1.5 rounded-lg border border-white/7 text-white/30 bg-white/3 hover:text-white/60 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to right, transparent, ${mod.accentColor}50, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

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
    description: "End-to-end service request lifecycle. Assign technicians, track bays, manage work orders, and close jobs with full accountability.",
    accent: "#4FB3D9",
    accentClass: "from-cubott-teal to-sky-400",
    features: ["Request intake & assignment", "Bay and slot management", "Job progress tracking", "Overdue & long-stay alerts", "Warranty workflows", "Full audit trail"],
    image: "/screenshot-supervisor.png",
    span: "lg:col-span-2",
    imagePos: "object-top",
  },
  {
    num: "02",
    icon: Package,
    title: "Inventory",
    description: "Real-time visibility into parts and stock across all locations. Eliminate shortages and reduce over-ordering.",
    accent: "#a78bfa",
    accentClass: "from-violet-500 to-purple-400",
    features: ["Parts catalog", "Low stock alerts", "Issuance & returns", "Multi-location", "Category bins", "Replenishment"],
    image: "/screenshot-inventory.png",
    span: "lg:col-span-1",
    imagePos: "object-top",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Sales",
    description: "Manage your pipeline from inquiry to delivery. Track orders, monitor performance, close deals faster.",
    accent: "#34d399",
    accentClass: "from-emerald-500 to-teal-400",
    features: ["Pipeline management", "Quote & order tracking", "Performance metrics", "Customer management", "Dispatch tracking", "Analytics"],
    image: "/screenshot-manufacturer.png",
    span: "lg:col-span-1",
    imagePos: "object-top",
  },
  {
    num: "04",
    icon: FileText,
    title: "Finance",
    description: "Integrated billing workflows across every team. Auto-generate invoices, track payments, maintain a complete financial audit trail.",
    accent: "#fbbf24",
    accentClass: "from-amber-500 to-orange-400",
    features: ["Invoice generation", "Payment tracking", "Financial audit logs", "Role-based access", "Cross-module billing", "Cost reporting"],
    image: "/screenshot-audit.png",
    span: "lg:col-span-2",
    imagePos: "object-top",
  },
]

export default function Services() {
  return (
    <section id="features" className="py-24 bg-[#030B15] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <Container className="relative z-10">
        <div className="flex items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-px h-5 bg-cubott-teal" />
              <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Platform Modules</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.03em] text-white">
              Four modules.<br />
              <span className="gradient-text-teal">One platform.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="hidden md:block text-white/40 text-sm leading-relaxed max-w-xs text-right font-light"
          >
            Four tightly integrated modules replace disconnected spreadsheets and fragmented tools.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${mod.span} relative group overflow-hidden rounded-2xl border border-white/6 bg-[#060d1a] card-hover min-h-[320px]`}
            >
              <div className="absolute inset-0">
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className={`object-cover ${mod.imagePos} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-[#060d1a]/80 to-transparent" />
              </div>

              <div className="absolute top-6 right-6 text-[5rem] font-black leading-none tracking-tighter select-none pointer-events-none"
                style={{ color: mod.accent, opacity: 0.08 }}>
                {mod.num}
              </div>

              <div className="relative z-10 p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${mod.accentClass} p-px flex-shrink-0`}>
                    <div className="w-full h-full rounded-lg bg-[#060d1a] flex items-center justify-center">
                      <mod.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: mod.accent }}>
                    {mod.num} / {mod.title}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-3">{mod.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6 font-light">{mod.description}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {mod.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2.5 py-1 rounded-md border border-white/8 text-white/35 bg-white/3"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${mod.accent}60, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

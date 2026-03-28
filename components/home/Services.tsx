"use client"

import { motion } from "framer-motion"
import { Wrench, Package, TrendingUp, FileText } from "lucide-react"
import Container from "../ui/Container"

function ServiceViz() {
  const jobs = [
    { id: "WO-2841", tech: "Carlos M.", bay: "Bay 3", status: "Active", pct: 65, color: "#4FB3D9" },
    { id: "WO-2840", tech: "Sara T.", bay: "Bay 1", status: "Done", pct: 100, color: "#34d399" },
    { id: "WO-2839", tech: "Alex R.", bay: "Bay 6", status: "Queue", pct: 0, color: "#ffffff30" },
    { id: "WO-2838", tech: "Maria L.", bay: "Bay 2", status: "Active", pct: 40, color: "#4FB3D9" },
  ]
  return (
    <div className="w-full space-y-2">
      {jobs.map((job, i) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1 }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: job.color }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-white/70">{job.id}</span>
              <span className="text-[10px] text-white/30">{job.tech} · {job.bay}</span>
            </div>
            <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${job.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: job.color }}
              />
            </div>
          </div>
          <span
            className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              color: job.color,
              background: `${job.color}15`,
              border: `1px solid ${job.color}25`,
            }}
          >
            {job.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function InventoryViz() {
  const parts = [
    { name: "Oil Filter", stock: 142, max: 200, status: "ok" },
    { name: "Brake Pads", stock: 8, max: 80, status: "low" },
    { name: "Air Filter", stock: 56, max: 100, status: "ok" },
    { name: "Spark Plug", stock: 3, max: 60, status: "critical" },
    { name: "Coolant", stock: 34, max: 50, status: "ok" },
    { name: "Wiper Blade", stock: 11, max: 40, status: "low" },
  ]
  const colors = { ok: "#34d399", low: "#fbbf24", critical: "#f87171" }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
      {parts.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl p-3 border"
          style={{
            background: `${colors[p.status as keyof typeof colors]}08`,
            borderColor: `${colors[p.status as keyof typeof colors]}20`,
          }}
        >
          <div className="text-[9px] text-white/30 mb-1 truncate">{p.name}</div>
          <div className="text-lg font-black mb-1" style={{ color: colors[p.status as keyof typeof colors] }}>
            {p.stock}
          </div>
          <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(p.stock / p.max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.6 }}
              className="h-full rounded-full"
              style={{ background: colors[p.status as keyof typeof colors] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SalesViz() {
  const stages = [
    { label: "Inquiry", count: 24, color: "#7DD3FC" },
    { label: "Quoted", count: 17, color: "#4FB3D9" },
    { label: "Ordered", count: 11, color: "#38BDF8" },
    { label: "Dispatched", count: 6, color: "#a78bfa" },
    { label: "Delivered", count: 4, color: "#34d399" },
  ]
  const max = 24
  return (
    <div className="flex items-end gap-3 w-full h-28">
      {stages.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-[11px] font-black" style={{ color: s.color }}>{s.count}</span>
          <div className="w-full bg-white/[0.04] rounded-md overflow-hidden flex-1 flex items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(s.count / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              className="w-full rounded-md"
              style={{ background: `linear-gradient(to top, ${s.color}, ${s.color}60)` }}
            />
          </div>
          <span className="text-[9px] text-white/25 text-center leading-tight">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function FinanceViz() {
  const items = [
    { label: "Service — WO-2841", amount: "$1,240.00" },
    { label: "Parts — 3 items", amount: "$384.50" },
    { label: "Bay rental", amount: "$120.00" },
  ]
  return (
    <div className="w-full rounded-xl border border-amber-400/15 bg-amber-400/5 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-amber-400/10 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-wider text-amber-400/70 uppercase">Invoice #INV-0094</span>
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring" }}
          className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 border border-emerald-400/25"
        >
          Paid
        </motion.span>
      </div>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1 }}
          className="flex justify-between items-center px-4 py-2.5 border-b border-white/[0.04] last:border-0"
        >
          <span className="text-[11px] text-white/40">{item.label}</span>
          <span className="text-[11px] font-semibold text-white/70">{item.amount}</span>
        </motion.div>
      ))}
      <div className="flex justify-between items-center px-4 py-3 bg-amber-400/[0.05]">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Total</span>
        <span className="text-base font-black text-amber-400">$1,744.50</span>
      </div>
    </div>
  )
}

const modules = [
  {
    num: "01", icon: Wrench, title: "Service",
    tagline: "End-to-end job management",
    description: "From intake to job closure — assign technicians, track bays, flag overdue work orders, and maintain a complete accountability trail across every job.",
    accent: "#4FB3D9",
    features: ["Bay & slot scheduling", "Technician assignment", "Overdue alerts", "Warranty workflows"],
    viz: ServiceViz, flip: false,
  },
  {
    num: "02", icon: Package, title: "Inventory",
    tagline: "Real-time parts visibility",
    description: "Every part, every location, in real time. Know what's running low before it's a problem. Auto-replenishment, issuance tracking, and category management built in.",
    accent: "#34d399",
    features: ["Multi-location stock", "Low-stock alerts", "Issuance & returns", "Auto replenishment"],
    viz: InventoryViz, flip: true,
  },
  {
    num: "03", icon: TrendingUp, title: "Sales",
    tagline: "Pipeline to delivery",
    description: "Track every deal through every stage. Quotes, orders, dispatch, delivery — with performance analytics and customer records connected to the full operational picture.",
    accent: "#a78bfa",
    features: ["Quote & order tracking", "Pipeline management", "Dispatch coordination", "Performance analytics"],
    viz: SalesViz, flip: false,
  },
  {
    num: "04", icon: FileText, title: "Finance",
    tagline: "Billing without blind spots",
    description: "Invoices auto-generated from operations data. Track payments, reconcile across teams, and maintain a complete financial audit trail — synced with everything.",
    accent: "#fbbf24",
    features: ["Auto invoice generation", "Payment tracking", "Cross-module billing", "Financial audit logs"],
    viz: FinanceViz, flip: true,
  },
]

export default function Services() {
  return (
    <section id="features" className="py-16 bg-[#05090F] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
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

        <div className="space-y-0 divide-y divide-white/[0.05]">
          {modules.map((mod, i) => {
            const Viz = mod.viz
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 items-center ${mod.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${mod.accent}15`, border: `1px solid ${mod.accent}25` }}
                    >
                      <mod.icon size={15} style={{ color: mod.accent }} />
                    </div>
                    <div>
                      <span className="text-[9px] font-black tracking-[0.2em] uppercase opacity-40 block" style={{ color: mod.accent }}>
                        {mod.num} — {mod.tagline}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-none mb-3" style={{ color: mod.accent }}>
                      {mod.title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed font-light max-w-sm">
                      {mod.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1">
                    {mod.features.map((f) => (
                      <span key={f} className="text-[11px] text-white/25 font-light">
                        · {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `${mod.accent}08` }}
                  />
                  <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <div className="text-[9px] font-bold tracking-wider text-white/20 uppercase mb-3">Live Preview</div>
                    <Viz />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

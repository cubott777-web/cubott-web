"use client"

import { motion } from "framer-motion"
import Container from "../ui/Container"
import Image from "next/image"

const roles = [
  {
    num: "01",
    role: "Supervisor",
    color: "text-cubott-teal",
    border: "border-cubott-teal/15",
    bg: "hover:bg-cubott-teal/4",
    capabilities: ["Daily operations overview", "Resource & bay management", "Job scheduling & assignment", "Overdue task alerts"],
    image: "/screenshot-supervisor.png",
  },
  {
    num: "02",
    role: "Store Team",
    color: "text-violet-400",
    border: "border-violet-400/15",
    bg: "hover:bg-violet-400/4",
    capabilities: ["Service request handling", "Parts issuance & returns", "Technician coordination", "Job completion tracking"],
    image: "/screenshot-inventory.png",
  },
  {
    num: "03",
    role: "Finance",
    color: "text-amber-400",
    border: "border-amber-400/15",
    bg: "hover:bg-amber-400/4",
    capabilities: ["Invoice generation", "Payment tracking", "Financial audit trail", "Billing reconciliation"],
    image: "/screenshot-audit.png",
  },
  {
    num: "04",
    role: "Management",
    color: "text-emerald-400",
    border: "border-emerald-400/15",
    bg: "hover:bg-emerald-400/4",
    capabilities: ["Cross-team performance views", "Sales funnel analytics", "Operational KPI dashboards", "Multi-location visibility"],
    image: "/screenshot-manufacturer.png",
  },
]

export default function TechStack() {
  return (
    <section className="py-28 bg-[#030710] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Role-Based Access</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-[-0.03em] text-white leading-[0.95]">
            Built for every{" "}
            <span className="gradient-teal">team.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {roles.map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border ${r.border} ${r.bg} transition-all duration-300`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_220px] items-center">
                <div className="px-8 py-6 md:border-r border-white/5">
                  <div className="text-[10px] text-white/15 tracking-widest font-bold mb-1">{r.num}</div>
                  <div className={`text-xl font-black tracking-tight ${r.color}`}>{r.role}</div>
                </div>

                <div className="px-8 py-5 md:border-r border-white/5">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {r.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm text-white/40">
                        <span className="w-1 h-1 rounded-full flex-shrink-0 bg-white/20" />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-20 md:h-full overflow-hidden rounded-r-2xl">
                  <Image
                    src={r.image}
                    alt={r.role}
                    fill
                    sizes="220px"
                    className="object-cover object-top opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#030710] via-transparent to-transparent md:from-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

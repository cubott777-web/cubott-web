"use client"

import { motion } from "framer-motion"
import Container from "../ui/Container"
import Image from "next/image"

const roleGroups = [
  {
    role: "Supervisor",
    num: "01",
    color: "text-cubott-teal",
    borderColor: "border-cubott-teal/20",
    bgColor: "bg-cubott-teal/4",
    capabilities: [
      "Daily operations overview",
      "Resource & bay management",
      "Job scheduling & assignment",
      "Overdue task alerts",
    ],
    image: "/screenshot-supervisor.png",
  },
  {
    role: "Store Team",
    num: "02",
    color: "text-violet-400",
    borderColor: "border-violet-400/20",
    bgColor: "bg-violet-400/4",
    capabilities: [
      "Service request handling",
      "Parts issuance & returns",
      "Technician coordination",
      "Job completion tracking",
    ],
    image: "/screenshot-inventory.png",
  },
  {
    role: "Finance",
    num: "03",
    color: "text-amber-400",
    borderColor: "border-amber-400/20",
    bgColor: "bg-amber-400/4",
    capabilities: [
      "Invoice generation",
      "Payment tracking",
      "Financial audit trail",
      "Billing reconciliation",
    ],
    image: "/screenshot-audit.png",
  },
  {
    role: "Management",
    num: "04",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/20",
    bgColor: "bg-emerald-400/4",
    capabilities: [
      "Cross-team performance views",
      "Sales funnel analytics",
      "Operational KPI dashboards",
      "Multi-location visibility",
    ],
    image: "/screenshot-manufacturer.png",
  },
]

export default function TechStack() {
  return (
    <section className="py-24 bg-[#030B15] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <div className="flex items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-px h-5 bg-cubott-teal" />
              <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Role-Based Access</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.03em] text-white">
              Built for every<br />
              <span className="gradient-text">team.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="hidden md:block text-white/40 text-sm leading-relaxed max-w-xs text-right font-light"
          >
            Each role gets a purpose-built interface — exactly the data and actions they need.
          </motion.p>
        </div>

        <div className="space-y-3">
          {roleGroups.map((group, i) => (
            <motion.div
              key={group.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border ${group.borderColor} ${group.bgColor} hover:border-opacity-60 transition-all duration-300`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_280px] items-center gap-0">
                <div className="px-8 py-6 md:py-8 border-b md:border-b-0 md:border-r border-white/5 min-w-[180px]">
                  <div className="text-[10px] text-white/20 tracking-widest font-bold mb-1">{group.num}</div>
                  <div className={`text-xl font-black ${group.color}`}>{group.role}</div>
                </div>

                <div className="px-8 py-6 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {group.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-sm text-white/45">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${group.color.replace("text-", "bg-")}`} />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-24 md:h-full md:min-h-[100px] overflow-hidden rounded-r-2xl">
                  <Image
                    src={group.image}
                    alt={`${group.role} view`}
                    fill
                    sizes="280px"
                    className="object-cover object-top opacity-25 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#030B15] md:from-transparent via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

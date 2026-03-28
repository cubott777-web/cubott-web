"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Container from "../ui/Container"
import Image from "next/image"

const screens = [
  {
    id: "supervisor",
    label: "Supervisor Dashboard",
    image: "/screenshot-supervisor.png",
    description: "Daily operational overview with real-time visibility into service calendar, parking slots, service bays, and overdue vehicles.",
    stats: [{ value: "10", label: "Service Bays" }, { value: "8", label: "Parking Slots" }, { value: "100%", label: "Visibility" }],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    image: "/screenshot-intelligence.png",
    description: "Real-time analytics across service performance, capacity utilization, and logistics funnel with date-range filtering.",
    stats: [{ value: "Live", label: "Analytics" }, { value: "3", label: "Request Types" }, { value: "360°", label: "Ops View" }],
  },
  {
    id: "inventory",
    label: "Inventory",
    image: "/screenshot-inventory.png",
    description: "Manage 2,700+ parts with health indicators, location tracking, and low-stock alerts — all searchable and filterable.",
    stats: [{ value: "2,710", label: "Total Parts" }, { value: "786", label: "Low Stock" }, { value: "Live", label: "Updates" }],
  },
  {
    id: "audit",
    label: "Audit Logs",
    image: "/screenshot-audit.png",
    description: "Complete audit trail with every create, update, and delete — timestamped, attributed, and searchable across all entities.",
    stats: [{ value: "124+", label: "Entries" }, { value: "100%", label: "Traceability" }, { value: "All", label: "Entities" }],
  },
  {
    id: "manufacturer",
    label: "Manufacturer View",
    image: "/screenshot-manufacturer.png",
    description: "Warranty funnel stages, dealer performance metrics, and recent activity feed — all visible in real time.",
    stats: [{ value: "5", label: "Funnel Stages" }, { value: "100%", label: "Efficiency" }, { value: "Live", label: "Feed" }],
  },
]

export default function CaseStudies() {
  const [active, setActive] = useState(screens[0].id)
  const current = screens.find((s) => s.id === active)!

  return (
    <section id="platform" className="py-28 bg-[#05090F] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <Container className="relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Platform Screenshots</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-[-0.03em] text-white leading-[0.95]">
            See Cubott{" "}
            <span className="gradient-teal">in action.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActive(screen.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === screen.id
                  ? "bg-cubott-teal text-white shadow-lg shadow-cubott-teal/20"
                  : "glass text-white/50 hover:text-white hover:bg-white/6"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl overflow-hidden mockup-shadow"
              >
                <div className="bg-[#0a1020] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="max-w-xs mx-auto h-5 bg-white/5 rounded flex items-center justify-center">
                      <span className="text-white/20 text-[10px]">app.cubott.com</span>
                    </div>
                  </div>
                </div>
                <Image
                  src={current.image}
                  alt={current.label}
                  width={900}
                  height={506}
                  className="w-full object-cover"
                  style={{ height: 'auto' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 lg:pt-4"
            >
              <div>
                <div className="text-cubott-teal text-xs font-bold mb-2 uppercase tracking-[0.15em]">
                  {current.label}
                </div>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {current.description}
                </p>
              </div>

              <div className="space-y-2.5">
                {current.stats.map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-4 flex items-center justify-between">
                    <span className="text-white/40 text-sm">{stat.label}</span>
                    <span className="font-black text-xl text-white tracking-tight">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

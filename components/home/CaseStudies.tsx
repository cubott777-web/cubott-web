"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"
import Image from "next/image"

const screens = [
  {
    id: "supervisor",
    label: "Supervisor Dashboard",
    image: "/screenshot-supervisor.png",
    description: "Daily operational overview with real-time visibility into service calendar, parking slots, service bays, and overdue vehicles.",
    stats: [
      { value: "10", label: "Service Bays" },
      { value: "8", label: "Parking Slots" },
      { value: "100%", label: "Resource Visibility" },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence Dashboard",
    image: "/screenshot-intelligence.png",
    description: "Real-time analytics across service performance, capacity utilization, and logistics funnel — with date-range filtering.",
    stats: [
      { value: "Live", label: "Analytics" },
      { value: "3", label: "Request Types" },
      { value: "360°", label: "Operations View" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    image: "/screenshot-inventory.png",
    description: "Manage 2,700+ parts with health indicators, location tracking, and low-stock alerts — all searchable and filterable.",
    stats: [
      { value: "2,710", label: "Total Parts" },
      { value: "786", label: "Low Stock Alert" },
      { value: "Real-time", label: "Status Updates" },
    ],
  },
  {
    id: "audit",
    label: "Audit Logs",
    image: "/screenshot-audit.png",
    description: "Complete audit trail with every create, update, and delete — timestamped, attributed, and searchable across all entities.",
    stats: [
      { value: "124+", label: "Log Entries" },
      { value: "100%", label: "Traceability" },
      { value: "All", label: "Entity Types" },
    ],
  },
  {
    id: "manufacturer",
    label: "Manufacturer View",
    image: "/screenshot-manufacturer.png",
    description: "Manufacturer dashboard showing warranty funnel stages, dealer performance metrics, and recent activity in real time.",
    stats: [
      { value: "5", label: "Funnel Stages" },
      { value: "100%", label: "Dealer Efficiency" },
      { value: "Live", label: "Activity Feed" },
    ],
  },
]

export default function CaseStudies() {
  const [active, setActive] = useState(screens[0].id)
  const current = screens.find((s) => s.id === active)!

  return (
    <section id="platform" className="py-28 relative overflow-hidden bg-[#040D1A]">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cubott-teal/3 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-6">
            Platform Screenshots
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            See Cubott in action
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every module is purpose-built for agricultural dealership workflows — not adapted from a generic template.
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActive(screen.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === screen.id
                  ? "bg-cubott-teal text-white shadow-lg shadow-cubott-teal/25"
                  : "glass text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden mockup-shadow"
                >
                  <div className="bg-[#0A1628] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="max-w-xs mx-auto h-5 bg-white/5 rounded flex items-center justify-center">
                        <span className="text-white/20 text-xs">app.cubott.com</span>
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
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="text-cubott-teal text-sm font-semibold mb-2 uppercase tracking-wider">
                    {current.label}
                  </div>
                  <p className="text-white/60 text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {current.stats.map((stat) => (
                    <div key={stat.label} className="glass-card p-4 rounded-xl flex items-center justify-between">
                      <span className="text-white/50 text-sm">{stat.label}</span>
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

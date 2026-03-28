"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Users, DollarSign, BarChart3, Check, Minus, Lock } from "lucide-react"
import Container from "../ui/Container"

const roles = [
  {
    id: "supervisor",
    title: "Supervisor",
    icon: Shield,
    color: "#4FB3D9",
    colorDim: "rgba(79,179,217,0.12)",
    colorBorder: "rgba(79,179,217,0.2)",
    summary: "Full operational control of the floor — jobs, bays, teams, and inventory.",
    permissions: {
      service:   [true, true, true, true, true],
      inventory: [true, true, true, true, false],
      sales:     [true, false, false, false, false],
      finance:   [false, false, false, false, false],
    },
  },
  {
    id: "store",
    title: "Store Team",
    icon: Users,
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.12)",
    colorBorder: "rgba(167,139,250,0.2)",
    summary: "Handles day-to-day service requests and parts issuance on the floor.",
    permissions: {
      service:   [true, true, true, false, false],
      inventory: [true, true, false, false, false],
      sales:     [false, false, false, false, false],
      finance:   [false, false, false, false, false],
    },
  },
  {
    id: "finance",
    title: "Finance",
    icon: DollarSign,
    color: "#fbbf24",
    colorDim: "rgba(251,191,36,0.12)",
    colorBorder: "rgba(251,191,36,0.2)",
    summary: "Manages invoicing, payments, and financial reporting across all teams.",
    permissions: {
      service:   [false, false, false, true, false],
      inventory: [false, false, true, false, false],
      sales:     [false, true, false, false, false],
      finance:   [true, true, true, true, true],
    },
  },
  {
    id: "management",
    title: "Management",
    icon: BarChart3,
    color: "#34d399",
    colorDim: "rgba(52,211,153,0.12)",
    colorBorder: "rgba(52,211,153,0.2)",
    summary: "Cross-team visibility into all operations, KPIs, and financial performance.",
    permissions: {
      service:   [true, true, true, true, true],
      inventory: [true, true, true, true, true],
      sales:     [true, true, true, true, true],
      finance:   [true, true, true, true, false],
    },
  },
]

const modules = [
  {
    key: "service" as const,
    label: "Service",
    color: "#4FB3D9",
    capabilities: ["Create work orders", "Assign technicians", "Close & audit jobs", "View all WOs", "Overdue escalation"],
  },
  {
    key: "inventory" as const,
    label: "Inventory",
    color: "#a78bfa",
    capabilities: ["Issue & return parts", "Add stock", "View cost reports", "Multi-location", "Replenishment"],
  },
  {
    key: "sales" as const,
    label: "Sales",
    color: "#34d399",
    capabilities: ["Create quotes", "Track pipeline", "Manage orders", "Dispatch", "Analytics"],
  },
  {
    key: "finance" as const,
    label: "Finance",
    color: "#fbbf24",
    capabilities: ["Generate invoices", "Track payments", "View financials", "Reconcile", "Audit logs"],
  },
]

function ScanLine({ color }: { color: string }) {
  return (
    <motion.div
      key={color}
      initial={{ top: "-2px", opacity: 0.9 }}
      animate={{ top: "calc(100% + 2px)", opacity: 0 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="absolute left-0 right-0 h-px pointer-events-none z-20"
      style={{
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        boxShadow: `0 0 12px 3px ${color}60`,
      }}
    />
  )
}

export default function TechStack() {
  const [activeId, setActiveId] = useState("supervisor")
  const [scanKey, setScanKey] = useState(0)

  const active = roles.find((r) => r.id === activeId)!

  function handleRoleClick(id: string) {
    if (id === activeId) return
    setActiveId(id)
    setScanKey((k) => k + 1)
  }

  return (
    <section id="roles" className="py-16 bg-[#030710] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      <Container className="relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-cubott-teal" />
            <span className="text-xs font-semibold tracking-[0.2em] text-cubott-teal uppercase">Role-Based Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white leading-[0.95]">
            Every team sees{" "}
            <span className="gradient-teal">exactly what they need.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 items-start">

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {roles.map((role) => {
              const isActive = role.id === activeId
              return (
                <motion.button
                  key={role.id}
                  onClick={() => handleRoleClick(role.id)}
                  className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left w-full transition-all duration-200 overflow-hidden group"
                  style={{
                    background: isActive ? role.colorDim : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isActive ? role.colorBorder : "rgba(255,255,255,0.05)"}`,
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeRoleBar"
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: role.color }}
                    />
                  )}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive ? `${role.color}20` : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <role.icon size={14} style={{ color: isActive ? role.color : "rgba(255,255,255,0.3)" }} />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isActive ? role.color : "rgba(255,255,255,0.4)" }}
                  >
                    {role.title}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: active.colorBorder, background: active.colorDim }}
          >
            <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId + "-header"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <active.icon size={14} style={{ color: active.color }} />
                      <span className="text-xl font-black" style={{ color: active.color }}>{active.title}</span>
                    </div>
                    <p className="text-xs text-white/35 font-light">{active.summary}</p>
                  </div>
                  <div
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${active.color}15`, color: active.color, border: `1px solid ${active.color}25` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
                    Access Active
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative p-4 overflow-hidden">
              <ScanLine key={scanKey} color={active.color} />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {modules.map((mod) => {
                  const perms = active.permissions[mod.key]
                  const accessCount = perms.filter(Boolean).length
                  const total = perms.length
                  const hasAccess = accessCount > 0

                  return (
                    <motion.div
                      key={mod.key + activeId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl p-3.5 border"
                      style={{
                        background: hasAccess ? `${mod.color}06` : "rgba(255,255,255,0.015)",
                        borderColor: hasAccess ? `${mod.color}18` : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: hasAccess ? mod.color : "rgba(255,255,255,0.15)" }}>
                          {mod.label}
                        </span>
                        {hasAccess ? (
                          <span className="text-[9px] font-semibold" style={{ color: mod.color }}>
                            {accessCount}/{total}
                          </span>
                        ) : (
                          <Lock size={10} className="text-white/15" />
                        )}
                      </div>

                      <div className="h-0.5 w-full rounded-full mb-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <motion.div
                          key={activeId + mod.key}
                          initial={{ width: 0 }}
                          animate={{ width: `${(accessCount / total) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: hasAccess ? mod.color : "transparent" }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        {mod.capabilities.map((cap, ci) => {
                          const allowed = perms[ci]
                          return (
                            <motion.div
                              key={cap}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + ci * 0.05 }}
                              className="flex items-center gap-1.5"
                            >
                              {allowed ? (
                                <Check size={9} style={{ color: mod.color }} className="flex-shrink-0" />
                              ) : (
                                <Minus size={9} className="flex-shrink-0 text-white/10" />
                              )}
                              <span
                                className="text-[10px] font-light leading-tight"
                                style={{ color: allowed ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.12)" }}
                              >
                                {cap}
                              </span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

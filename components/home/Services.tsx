"use client"

import { Wrench, Package, TrendingUp, FileText } from "lucide-react"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"

const modules = [
  {
    icon: Wrench,
    title: "Service",
    description: "End-to-end service request lifecycle management. Assign technicians, track job progress, manage service bays, and close work orders with complete accountability and audit history.",
    accent: "from-cubott-teal to-sky-400",
    tag: "Core Module",
    features: [
      "Service request intake & assignment",
      "Bay and slot management",
      "Job progress tracking",
      "Overdue & long-stay alerts",
      "Warranty claim workflows",
      "Full service audit trail",
    ],
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Real-time visibility into parts and stock across all locations. Eliminate shortages, reduce over-ordering, and keep operations running without interruption.",
    accent: "from-violet-500 to-purple-400",
    tag: "Inventory",
    features: [
      "Parts catalog with location tracking",
      "Low stock & out-of-stock alerts",
      "Parts issuance and returns",
      "Category and bin management",
      "Multi-location stock visibility",
      "Replenishment workflows",
    ],
  },
  {
    icon: TrendingUp,
    title: "Sales",
    description: "Manage your sales pipeline from inquiry to delivery. Track orders, monitor dealer performance, and give your sales team the tools to close more deals faster.",
    accent: "from-emerald-500 to-teal-400",
    tag: "Sales",
    features: [
      "Sales pipeline management",
      "Quote and order tracking",
      "Dealer performance metrics",
      "Customer management",
      "Dispatch and delivery tracking",
      "Sales analytics dashboard",
    ],
  },
  {
    icon: FileText,
    title: "Finance",
    description: "Integrated billing and financial workflows across every team. Auto-generate invoices, track payments, reconcile accounts, and maintain a complete financial audit trail.",
    accent: "from-amber-500 to-orange-400",
    tag: "Finance",
    features: [
      "Invoice generation & management",
      "Payment tracking & reconciliation",
      "Financial audit logs",
      "Role-based finance access",
      "Cross-module billing visibility",
      "Expense and cost reporting",
    ],
  },
]

export default function Services() {
  return (
    <section id="features" className="py-28 relative overflow-hidden bg-[#040D1A]">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-cubott-teal/5 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <AnimatedSection className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-6">
            Platform Modules
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Everything your business needs,
            <br />
            <span className="gradient-text-teal">built into one platform</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Four tightly integrated modules that replace disconnected spreadsheets and manual processes with a single source of truth.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, index) => (
            <AnimatedSection key={mod.title} delay={index * 0.1}>
              <div className="group relative h-full p-8 glass-card rounded-2xl hover:border-cubott-teal/25 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
                <div className="flex items-start gap-5 mb-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.accent} p-px`}>
                    <div className="w-full h-full rounded-2xl bg-[#070f1e] flex items-center justify-center">
                      <mod.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r ${mod.accent} text-white text-xs font-semibold mb-2 opacity-90`}>
                      {mod.tag}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cubott-teal transition-colors duration-200">
                      {mod.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {mod.description}
                </p>

                <ul className="grid grid-cols-2 gap-2">
                  {mod.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/40">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${mod.accent}`} style={{ minWidth: '4px', minHeight: '4px' }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${mod.accent} opacity-0 group-hover:opacity-30 transition-opacity rounded-b-2xl`} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

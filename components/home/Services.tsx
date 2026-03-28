"use client"

import { motion } from "framer-motion"
import { Wrench, Package, ShieldCheck, BarChart3, FileText, Users } from "lucide-react"
import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"

const modules = [
  {
    icon: Wrench,
    title: "Service Request Lifecycle",
    description: "End-to-end management of service requests from intake to completion. Assign technicians, track progress, and close jobs with full accountability.",
    accent: "from-cubott-teal to-sky-400",
    tag: "Core Module",
  },
  {
    icon: Package,
    title: "Spare Parts Tracking",
    description: "Real-time visibility into parts availability, movement, and replenishment. Eliminate stockouts and reduce manual errors across all locations.",
    accent: "from-violet-500 to-purple-400",
    tag: "Inventory",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Approvals",
    description: "Streamlined warranty submission and approval workflows between dealerships and manufacturers. No more delays, no more paperwork.",
    accent: "from-amber-500 to-orange-400",
    tag: "Compliance",
  },
  {
    icon: BarChart3,
    title: "Intelligence Dashboards",
    description: "Real-time operational analytics covering service performance, logistics funnels, and resource utilization across all roles.",
    accent: "from-emerald-500 to-teal-400",
    tag: "Analytics",
  },
  {
    icon: FileText,
    title: "Billing & Finance",
    description: "Integrated billing workflows with finance team visibility. Auto-generate invoices, track payments, and maintain financial traceability.",
    accent: "from-pink-500 to-rose-400",
    tag: "Finance",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description: "Purpose-built roles for supervisors, store teams, finance, and manufacturers. Every user sees exactly what they need — nothing more.",
    accent: "from-blue-500 to-indigo-400",
    tag: "Security",
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
            Everything a dealership needs,
            <br />
            <span className="gradient-text-teal">built into one platform</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Six tightly integrated modules that replace disconnected spreadsheets and manual processes with a single source of truth.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, index) => (
            <AnimatedSection key={mod.title} delay={index * 0.07}>
              <div className="group relative h-full p-7 glass-card rounded-2xl hover:border-cubott-teal/30 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r ${mod.accent} text-white text-xs font-semibold mb-5 opacity-90`}>
                  {mod.tag}
                </div>

                <div className={`w-12 h-12 mb-5 rounded-xl bg-gradient-to-br ${mod.accent} p-px`}>
                  <div className="w-full h-full rounded-xl bg-[#070f1e] flex items-center justify-center">
                    <mod.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cubott-teal transition-colors duration-200">
                  {mod.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {mod.description}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${mod.accent} opacity-0 group-hover:opacity-30 transition-opacity rounded-b-2xl`} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

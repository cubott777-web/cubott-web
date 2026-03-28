import Container from "../ui/Container"
import AnimatedSection from "../shared/AnimatedSection"
import Image from "next/image"

const roleGroups = [
  {
    role: "Supervisor",
    color: "from-cubott-teal to-sky-400",
    dot: "bg-cubott-teal",
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
    color: "from-violet-500 to-purple-400",
    dot: "bg-violet-400",
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
    color: "from-amber-500 to-orange-400",
    dot: "bg-amber-400",
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
    color: "from-emerald-500 to-teal-400",
    dot: "bg-emerald-400",
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
    <section className="py-28 bg-[#060F1E] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <Container className="relative z-10">
        <AnimatedSection className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-cubott-teal text-sm font-semibold mb-6">
            Role-Based Access
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Purpose-built for every
            <br />
            <span className="gradient-text-teal">team in your business</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Each role gets a tailored interface showing exactly the data and actions they need — nothing more, nothing less.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roleGroups.map((group, i) => (
            <AnimatedSection key={group.role} delay={i * 0.1}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={group.image}
                    alt={`${group.role} view`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/50 to-transparent" />
                  <div className={`absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${group.color}`}>
                    {group.role}
                  </div>
                </div>

                <div className="p-5">
                  <ul className="space-y-2.5">
                    {group.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2.5 text-sm text-white/55">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${group.dot}`} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

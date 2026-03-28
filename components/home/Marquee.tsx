const items = [
  "Service Management",
  "Inventory Tracking",
  "Sales Pipeline",
  "Finance & Billing",
  "Role-Based Access",
  "Complete Traceability",
  "Multi-Tenant SaaS",
  "Warranty Workflows",
  "Audit Logs",
  "Real-Time Analytics",
  "Work Order Management",
  "Bay Scheduling",
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative bg-[#030710] border-y border-white/5 py-5 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#030710] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#030710] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-8 px-8 flex-shrink-0">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/20">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-cubott-teal/30 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

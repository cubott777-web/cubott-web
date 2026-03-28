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
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative bg-[#020810] border-y border-white/5 py-4 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#020810] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#020810] to-transparent z-10 pointer-events-none" />
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-6 px-6 flex-shrink-0">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/25">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-cubott-teal/40 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

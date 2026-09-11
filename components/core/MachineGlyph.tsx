import { cn } from "@/lib/utils"

/** A restrained side-view machine (tractor) used as the moving subject of the Dealer Management story. */
export default function MachineGlyph({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const body = tone === "dark" ? "#FFFFFF" : "#0B1F3B"
  const accent = tone === "dark" ? "#60A5FA" : "#2563EB"
  return (
    <svg viewBox="0 0 64 40" className={cn("shrink-0", className)} fill="none" aria-hidden="true">
      {/* cab */}
      <path d="M30 6h12a2 2 0 0 1 2 2v12H30z" stroke={body} strokeWidth={2} strokeLinejoin="round" />
      <path d="M33 9h8v7h-8z" fill={accent} fillOpacity={0.25} />
      {/* hood + body */}
      <path d="M8 20h36l3 4H8z" fill={body} />
      <path d="M8 14h20v6H8z" stroke={body} strokeWidth={2} strokeLinejoin="round" />
      {/* exhaust */}
      <path d="M14 14V6" stroke={body} strokeWidth={2} strokeLinecap="round" />
      {/* wheels */}
      <circle cx={46} cy={30} r={8} fill="#fff" stroke={body} strokeWidth={2} />
      <circle cx={46} cy={30} r={3} fill={accent} />
      <circle cx={16} cy={31} r={6} fill="#fff" stroke={body} strokeWidth={2} />
      <circle cx={16} cy={31} r={2} fill={accent} />
    </svg>
  )
}

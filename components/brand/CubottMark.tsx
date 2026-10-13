import { cn } from "@/lib/utils"

interface CubottMarkProps {
  /** `color` is the brand mark. `mono-white` / `mono-navy` are one-colour versions for tight contexts. `reverse` = color (kept for call sites). */
  tone?: "color" | "reverse" | "mono-dark" | "mono-light" | "mono-white" | "mono-navy"
  title?: string
  className?: string
  /** Unused; kept so existing call sites compile. */
  priority?: boolean
}

const NAVY = "#0A2F47"

/**
 * The Cubott mark, inline SVG — the same geometry as public/brand/cubott-mark.svg (the brand kit's
 * single source). Change the kit file first, then mirror it here; `node scripts/brand-kit.mjs` rebuilds
 * every other logo file from it. The antenna is drawn after the faces so it rises from the top face's centre.
 */
export default function CubottMark({ tone = "color", title, className }: CubottMarkProps) {
  const mono = tone === "mono-white" || tone === "mono-light" ? "#FFFFFF" : tone === "mono-navy" || tone === "mono-dark" ? NAVY : null
  const ink = mono ?? NAVY
  return (
    <svg
      viewBox="0 0 400 512"
      className={cn("h-auto w-auto shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g stroke={ink} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round">
        <polygon points="22,193 200,286 200,500 22,407" fill={mono ?? "#0A3F5E"} fillOpacity={mono ? 0.25 : 1} />
        <polygon points="200,286 378,193 378,407 200,500" fill={mono ? "none" : "#379ECF"} />
        <polygon points="200,100 378,193 200,286 22,193" fill={mono ? "none" : "#3AA5D8"} />
        <line x1={200} y1={193} x2={200} y2={56} strokeWidth={26} strokeLinecap="butt" />
        <circle cx={200} cy={40} r={30} fill={ink} />
      </g>
      <g fill={ink} transform="skewY(-27.5)">
        <ellipse cx={246} cy={474} rx={21} ry={31} />
        <ellipse cx={328} cy={474} rx={21} ry={31} />
      </g>
    </svg>
  )
}

import { cn } from "@/lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  tone?: "light" | "dark"
  className?: string
  index?: string
}

/** Small section label: "02 — What we build". */
export default function Eyebrow({ children, tone = "light", className, index }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-blue-300" : "text-blue",
        className
      )}
    >
      {index && <span className="tabular-nums opacity-70">{index}</span>}
      {index && <span className={cn("h-px w-6", tone === "dark" ? "bg-blue-300/50" : "bg-blue/40")} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

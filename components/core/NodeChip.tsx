import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface NodeChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  tone?: "dark" | "light"
  className?: string
  style?: React.CSSProperties
  size?: "sm" | "md"
}

/** A labelled node in a Core diagram. Dot + label, no icon, no card chrome. */
const NodeChip = forwardRef<HTMLDivElement, NodeChipProps>(function NodeChip(
  { label, tone = "dark", className, style, size = "md", ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      {...rest}
      className={cn(
        "inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full border font-semibold uppercase tracking-[0.14em]",
        size === "md" ? "px-3.5 py-1.5 text-[11px] md:text-xs" : "px-2.5 py-1 text-[10px]",
        tone === "dark"
          ? "border-white/15 bg-navy-900/70 text-blue-100 backdrop-blur-[2px]"
          : "border-navy/15 bg-white text-navy shadow-card",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", tone === "dark" ? "bg-blue-400" : "bg-blue")}
      />
      {label}
    </div>
  )
})

export default NodeChip

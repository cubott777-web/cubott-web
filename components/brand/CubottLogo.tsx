import { cn } from "@/lib/utils"
import CubottMark from "./CubottMark"

interface CubottLogoProps {
  variant?: "light" | "dark"
  className?: string
  markClassName?: string
  showWordmark?: boolean
}

/** Horizontal lockup: mark + wordmark. `variant="dark"` is the reverse version for navy backgrounds. */
export default function CubottLogo({
  variant = "light",
  className,
  markClassName,
  showWordmark = true,
}: CubottLogoProps) {
  const onDark = variant === "dark"
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CubottMark
        tone={onDark ? "reverse" : "color"}
        className={cn("h-9 w-auto", markClassName)}
        title="Cubott"
      />
      {showWordmark && (
        <span
          className={cn(
            "text-[1.35rem] font-bold leading-none tracking-tight",
            onDark ? "text-white" : "text-navy"
          )}
          aria-hidden="true"
        >
          Cub<span className={onDark ? "text-blue-400" : "text-blue"}>o</span>tt
        </span>
      )}
    </span>
  )
}

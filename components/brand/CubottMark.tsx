import Image from "next/image"
import { cn } from "@/lib/utils"
import mark from "@/public/brand/cubott-mark.png"

interface CubottMarkProps {
  /** Kept for call-site compatibility; the supplied artwork is used as-is on every background. */
  tone?: "color" | "reverse" | "mono-dark" | "mono-light"
  title?: string
  className?: string
  priority?: boolean
}

/**
 * The Cubott mark — the supplied robot-cube artwork (public/brand/cubott-mark.png).
 * Regenerate sizes with `node scripts/brand-assets.mjs` after replacing the source file.
 */
export default function CubottMark({ title, className, priority }: CubottMarkProps) {
  return (
    <Image
      src={mark}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      priority={priority}
      className={cn("h-auto w-auto shrink-0 object-contain", className)}
      sizes="(min-width: 768px) 240px, 120px"
    />
  )
}

import Image, { type StaticImageData } from "next/image"
import { cn } from "@/lib/utils"

interface BrowserFrameProps {
  src?: string | StaticImageData
  alt: string
  caption?: string
  tone?: "light" | "dark"
  className?: string
  priority?: boolean
  /** Aspect ratio to reserve when no image is present. */
  ratio?: string
  sizes?: string
}

/**
 * Presentation treatment for real product UI: a quiet browser frame, subtle depth, no redesign of the product.
 * Renders a clearly labelled placeholder when a screenshot has not been captured yet.
 */
export default function BrowserFrame({
  src,
  alt,
  caption,
  tone = "light",
  className,
  priority,
  ratio = "16 / 9",
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: BrowserFrameProps) {
  const dark = tone === "dark"
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border",
          dark ? "border-white/10 bg-navy-900 shadow-frame-dark" : "border-navy/10 bg-white shadow-frame"
        )}
      >
        <div className={cn("flex h-8 items-center gap-1.5 border-b px-3", dark ? "border-white/10" : "border-navy/10 bg-surface")} aria-hidden="true">
          <span className={cn("h-2 w-2 rounded-full", dark ? "bg-white/20" : "bg-navy/15")} />
          <span className={cn("h-2 w-2 rounded-full", dark ? "bg-white/20" : "bg-navy/15")} />
          <span className={cn("h-2 w-2 rounded-full", dark ? "bg-white/20" : "bg-navy/15")} />
        </div>
        {src ? (
          <Image src={src} alt={alt} sizes={sizes} priority={priority} className="block h-auto w-full" />
        ) : (
          <div
            role="img"
            aria-label={alt}
            style={{ aspectRatio: ratio }}
            className={cn("grid place-items-center", dark ? "grid-fine text-blue-200/60" : "grid-fine-light text-navy/40")}
          >
            <span className="eyebrow">Product screen</span>
          </div>
        )}
      </div>
      {caption && <figcaption className={cn("mt-3 text-sm", dark ? "text-blue-100/60" : "text-slate")}>{caption}</figcaption>}
    </figure>
  )
}

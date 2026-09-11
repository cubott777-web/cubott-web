import { cn } from "@/lib/utils"
import Eyebrow from "./Eyebrow"

interface SectionHeadingProps {
  eyebrow?: string
  index?: string
  title: React.ReactNode
  lede?: React.ReactNode
  tone?: "light" | "dark"
  align?: "left" | "center"
  size?: "lg" | "md"
  className?: string
  as?: "h1" | "h2" | "h3"
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  tone = "light",
  align = "left",
  size = "lg",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone} index={index} className={cn("mb-5", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className={cn(size === "lg" ? "display-lg" : "display-md", dark ? "text-white" : "text-navy")}>
        {title}
      </Tag>
      {lede && (
        <p className={cn("lede mt-5 max-w-2xl", dark && "text-blue-100/70", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </div>
  )
}

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost" | "primary-dark" | "ghost-dark"
type Size = "sm" | "md" | "lg"

interface Base {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  children?: ReactNode
}

type AsButton = Base & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Base> & { href?: never }
type AsLink = Base & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Base> & { href: string }

export type ButtonProps = AsButton | AsLink

const variants: Record<Variant, string> = {
  primary:
    "bg-blue text-white hover:bg-[#1D4ED8] shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-8px_rgba(37,99,235,0.5)]",
  secondary:
    "bg-white text-navy border border-navy/15 hover:border-navy/35 hover:bg-surface",
  ghost: "text-navy hover:text-blue",
  "primary-dark":
    "bg-white text-navy hover:bg-blue-50",
  "ghost-dark":
    "border border-white/20 text-white/85 hover:text-white hover:border-white/40 hover:bg-white/[0.06]",
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
}

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isGhost = variant === "ghost" || variant === "ghost-dark"
  const classes = cn(
    "group/btn inline-flex items-center justify-center rounded-full font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:-translate-y-px active:translate-y-0 active:scale-[0.985] motion-reduce:transform-none",
    "disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    variant === "ghost-dark" ? sizes[size] : isGhost ? sizes[size].replace(/px-\d+/, "px-1") : sizes[size],
    className
  )
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AsLink
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  return (
    <button className={classes} {...(props as AsButton)}>
      {content}
    </button>
  )
}

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes, ReactNode } from "react"

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: ReactNode
}

type ButtonAsButton = ButtonBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
  href?: never
}

type ButtonAsLink = ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cubott-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#040D1A]",
      "disabled:opacity-50 disabled:pointer-events-none",
      {
        "bg-cubott-teal text-white hover:bg-cubott-teal-dark shadow-lg shadow-cubott-teal/25 hover:shadow-xl hover:shadow-cubott-teal/35 hover:-translate-y-0.5":
          variant === "primary",
        "bg-white/8 text-white hover:bg-white/14 border border-white/10 hover:border-white/20":
          variant === "secondary",
        "border border-cubott-teal/50 text-cubott-teal hover:bg-cubott-teal hover:text-white":
          variant === "outline",
        "text-white/70 hover:text-white hover:bg-white/5":
          variant === "ghost",
      },
      {
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
      },
      className
    )

    if ("href" in props && props.href) {
      const { href, ...restProps } = props as ButtonAsLink
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...restProps}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button

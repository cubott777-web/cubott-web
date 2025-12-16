import { cn } from "@/lib/utils"
import Link from "next/link"
import { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes, ReactNode } from "react"

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline"
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
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      {
        // Variants
        "bg-cubott-teal text-white hover:bg-cubott-teal-dark shadow-lg shadow-cubott-teal/30 hover:shadow-xl hover:shadow-cubott-teal/40":
          variant === "primary",
        "bg-cubott-navy text-white hover:bg-cubott-navy-light shadow-lg shadow-cubott-navy/20":
          variant === "secondary",
        "border-2 border-cubott-navy text-cubott-navy hover:bg-cubott-navy hover:text-white":
          variant === "outline",
      },
      {
        // Sizes
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

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

export default function Container({ className, size = "lg", children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        {
          "max-w-3xl": size === "sm",
          "max-w-5xl": size === "md",
          "max-w-content": size === "lg",
          "max-w-wide": size === "xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

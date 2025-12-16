import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

export default function Container({ 
  className, 
  size = "lg", 
  children, 
  ...props 
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-4xl": size === "sm",
          "max-w-6xl": size === "md",
          "max-w-7xl": size === "lg",
          "max-w-[1400px]": size === "xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}


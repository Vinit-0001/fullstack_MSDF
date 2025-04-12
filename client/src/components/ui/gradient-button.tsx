"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

const gradientButtonVariants = cva(
  "group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out hover:text-white/90",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
  href?: string
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonClasses = cn(gradientButtonVariants({ variant, className }))

    if (href) {
      return (
        <a href={href} className={buttonClasses}>
          {props.children}
        </a>
      )
    }

    return (
      <Comp className={buttonClasses} ref={ref} {...props} />
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, type GradientButtonProps } 
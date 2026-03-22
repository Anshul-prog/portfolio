import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-[#bbbbbb] shadow-md border border-transparent",
        destructive: "bg-red-500 text-white hover:bg-red-500/90 shadow-sm",
        outline: "border border-[#333333] bg-[#000000] hover:bg-[#111111] text-white shadow-sm",
        secondary: "bg-[#111111] text-white hover:bg-[#1a1a1a] border border-[#333333]",
        ghost: "hover:bg-[#111111] hover:text-white text-[#bbbbbb]",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2 uppercase tracking-widest font-space-grotesk text-xs",
        sm: "h-9 rounded-md px-4 text-[10px] uppercase font-space-grotesk tracking-widest",
        lg: "h-14 rounded-md px-10 uppercase tracking-widest font-space-grotesk",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

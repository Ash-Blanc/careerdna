import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-500 hover:shadow-indigo-600/40 active:scale-[0.98]",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-500 active:scale-[0.98]",
        outline:
          "border border-white/[0.1] bg-neutral-900/80 text-neutral-200 hover:bg-neutral-800 hover:text-white hover:border-white/[0.2] active:scale-[0.98]",
        secondary:
          "bg-neutral-800 text-neutral-200 hover:bg-neutral-750 hover:text-white active:scale-[0.98]",
        ghost:
          "text-neutral-400 hover:bg-neutral-850 hover:text-white",
        link:
          "text-indigo-400 underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-600/30 active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-[11px]",
        lg: "h-11 rounded-xl px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

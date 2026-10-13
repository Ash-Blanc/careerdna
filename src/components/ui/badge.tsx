import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-600 text-white shadow hover:bg-indigo-500",
        secondary:
          "border-white/[0.08] bg-neutral-900 text-neutral-300 hover:bg-neutral-800",
        destructive:
          "border-rose-500/30 bg-rose-950/40 text-rose-300 shadow hover:bg-rose-900/60",
        outline:
          "border-white/[0.12] text-neutral-300 hover:bg-neutral-900",
        success:
          "border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60",
        purple:
          "border-purple-500/30 bg-purple-950/40 text-purple-300 hover:bg-purple-900/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

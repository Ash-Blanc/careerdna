import React from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-[200%_auto] bg-clip-text text-transparent animate-[shimmer-text_6s_ease-in-out_infinite_alternate]",
        className
      )}
    >
      {children}
    </span>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#6366f1", // Indigo
  colorTo = "#ec4899",   // Pink
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,_border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className
      )}
    >
      <div
        className="absolute aspect-square inset-0 animate-[spin_var(--duration)_linear_infinite] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] opacity-70"
        style={{
          width: "calc(var(--size))",
          height: "calc(var(--size))",
          offsetPath: "rect(0 auto auto 0 round calc(var(--size) / 2))",
        }}
      />
    </div>
  );
}

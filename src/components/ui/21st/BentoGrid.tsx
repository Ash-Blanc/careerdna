"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/50 hover:bg-neutral-900/90 hover:shadow-2xl hover:shadow-indigo-500/10",
        className
      )}
    >
      <div className="absolute inset-0 -z-10">{background}</div>

      <div className="z-10 flex flex-col gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-indigo-400 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
          {name}
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {href && cta && (
        <div className="z-10 mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
          <Link href={href} className="flex items-center gap-1">
            <span>{cta}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}

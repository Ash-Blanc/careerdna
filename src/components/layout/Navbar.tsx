"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dna, Sparkles, Compass, LayoutDashboard, Settings, ArrowRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [qlooMode, setQlooMode] = useState<"live" | "fallback">("fallback");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => {
        if (data.qloo?.mode === "live") setQlooMode("live");
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { href: "/coach", label: "AI Coach", icon: Sparkles },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/onboarding", label: "Intake", icon: Compass },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-neutral-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Dna className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CareerDNA
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                v1.0
              </span>
            </span>
            <span className="text-[10px] font-medium text-neutral-400">Taste-Aware AI Career Coach</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-800 text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-indigo-400" : "text-neutral-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status indicator & CTA */}
        <div className="flex items-center gap-3">
          {/* Cultural Intelligence Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] font-medium">
            <span
              className={`h-2 w-2 rounded-full ${
                qlooMode === "live" ? "bg-emerald-400 animate-pulse" : "bg-indigo-400"
              }`}
            />
            <span className="text-neutral-300">
              Cultural Intelligence Active
            </span>
          </div>

          <Link
            href="/coach"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-102"
          >
            <span>Ask Coach</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

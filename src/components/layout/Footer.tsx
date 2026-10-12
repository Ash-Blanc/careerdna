import React from "react";
import Link from "next/link";
import { Dna, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-neutral-950 py-10 text-xs text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Dna className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-white">CareerDNA</span> — Cultural Taste-Aware Career Strategist
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Evidence-based career discovery
            </span>
            <Link href="/onboarding" className="hover:text-white transition-colors">
              Intake
            </Link>
            <Link href="/coach" className="hover:text-white transition-colors">
              AI Coach
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/settings" className="hover:text-white transition-colors">
              Settings
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-900 pt-6 text-center text-neutral-500 text-[11px]">
          CareerDNA · Built for ambitious students to discover high-agency careers through genuine interests.
        </div>
      </div>
    </footer>
  );
}

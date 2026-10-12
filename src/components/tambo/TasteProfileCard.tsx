"use client";

import React from "react";
import { TasteProfileCardProps, TasteProfileCardPropsSchema } from "./registry";
import { Sparkles, Brain, Compass, Zap, ShieldAlert, CheckCircle2 } from "lucide-react";

export function TasteProfileCard(rawProps: TasteProfileCardProps) {
  const result = TasteProfileCardPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  if (!props || !props.clusterSummary) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 animate-pulse">
        <div className="h-6 w-48 rounded bg-neutral-800 mb-4" />
        <div className="h-4 w-full rounded bg-neutral-800 mb-2" />
        <div className="h-4 w-3/4 rounded bg-neutral-800" />
      </div>
    );
  }

  const { clusterSummary, coreMotivations, cognitiveStyles, workStylePreferences, culturalAffinities, isDegradedMode } = props;

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 shadow-2xl backdrop-blur-md transition-all hover:border-indigo-500/30">
      {/* Header & Mode Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">Cultural Taste Profile</h3>
            <p className="text-xs text-neutral-400">Synthesized via Qloo Cultural Graph & Latent Signal Mining</p>
          </div>
        </div>

        {isDegradedMode ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/20">
            <ShieldAlert className="h-3.5 w-3.5" />
            Local Cultural Fallback
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Qloo Taste Graph Active
          </span>
        )}
      </div>

      {/* Cluster Summary Narrative */}
      <div className="mt-4 rounded-xl bg-neutral-950/60 p-4 border border-neutral-800/40">
        <p className="text-sm leading-relaxed text-neutral-200 font-normal">
          {clusterSummary}
        </p>
      </div>

      {/* Inferred Motivations & Cognitive Styles */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Motivations */}
        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2.5">
            <Zap className="h-4 w-4" />
            Inferred Motivations
          </div>
          <div className="flex flex-wrap gap-1.5">
            {coreMotivations.map((m, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-200 capitalize"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Cognitive Styles */}
        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2.5">
            <Brain className="h-4 w-4" />
            Cognitive Style Signals
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cognitiveStyles.map((c, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 text-xs font-medium text-purple-200 capitalize"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work Style Preferences */}
      {workStylePreferences.length > 0 && (
        <div className="mt-4 rounded-xl border border-neutral-800/50 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
            <Compass className="h-4 w-4 text-emerald-400" />
            Optimal Work Environment & Agency
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            {workStylePreferences.map((w, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

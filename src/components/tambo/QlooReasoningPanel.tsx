"use client";

import React from "react";
import { QlooReasoningPanelProps, QlooReasoningPanelPropsSchema } from "./registry";
import { Network, Sparkles, CheckCircle2, ShieldAlert, GitFork } from "lucide-react";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { Badge } from "@/components/ui/badge";

export function QlooReasoningPanel(rawProps: QlooReasoningPanelProps) {
  const result = QlooReasoningPanelPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  if (!props) return null;

  const {
    qlooActive = true,
    seedInterests = [],
    inferredTasteSignals = [],
    culturalCorrelationExplanation = "Cultural affinity mapping derived from your core taste signals.",
    adjacentInterests = [],
  } = props;

  const seedList = Array.isArray(seedInterests) ? seedInterests : [];
  const signalsList = Array.isArray(inferredTasteSignals) ? inferredTasteSignals : [];
  const adjacentList = Array.isArray(adjacentInterests) ? adjacentInterests : [];

  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.16)"
      className="my-5 border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 via-neutral-900/90 to-neutral-950 p-5 shadow-xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Network className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Cultural Affinity Reasoning</h4>
            <p className="text-[11px] text-neutral-400">How your taste profile and cultural signals shaped this direction</p>
          </div>
        </div>

        {qlooActive ? (
          <Badge variant="success" className="text-[11px] flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-3 w-3" /> Live Affinity Graph
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-[11px] flex items-center gap-1.5 font-medium">
            <ShieldAlert className="h-3 w-3 text-amber-400" /> Local Ontological Model
          </Badge>
        )}
      </div>

      {/* Explanation Quote */}
      <div className="rounded-xl bg-neutral-950/60 p-3.5 border border-neutral-800/50 mb-3.5">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-200 leading-relaxed font-normal">
            {culturalCorrelationExplanation}
          </p>
        </div>
      </div>

      {/* Seed Interests to Inferred Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
        <div className="rounded-lg bg-neutral-900/60 p-2.5 border border-neutral-800">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block mb-1.5">
            Seed Passions
          </span>
          <div className="flex flex-wrap gap-1">
            {seedList.map((seed, idx) => (
              <span key={idx} className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-300">
                {seed}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-neutral-900/60 p-2.5 border border-neutral-800">
          <span className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider block mb-1.5">
            Inferred Latent Signals
          </span>
          <div className="flex flex-wrap gap-1">
            {signalsList.map((sig, idx) => (
              <span key={idx} className="rounded bg-indigo-950/50 border border-indigo-500/20 px-2 py-0.5 text-[11px] text-indigo-200">
                {sig}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Adjacent Cultural Connections */}
      {adjacentList.length > 0 && (
        <div className="rounded-lg bg-neutral-950/40 p-2.5 border border-neutral-800/40 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400 font-medium text-[11px] mb-1.5">
            <GitFork className="h-3 w-3 text-purple-400" />
            <span>Culturally Adjacent Domains Discovered:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {adjacentList.map((adj, idx) => (
              <span key={idx} className="text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded text-[11px]">
                {adj}
              </span>
            ))}
          </div>
        </div>
      )}
    </SpotlightCard>
  );
}

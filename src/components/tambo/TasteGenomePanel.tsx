"use client";

import React from "react";
import { Dna, Sparkles } from "lucide-react";
import { TasteGenome } from "@/components/TasteGenome";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";

// TasteGenomePanel — registers as a generative UI surface that the coach emits
// when it wants to show the student's taste fingerprint. The visual itself is
// pulled from the TasteGenome component (also surfaced on the landing page).
export interface TasteGenomePanelProps {
  motivations?: string[];
  cognitiveStyles?: string[];
  affinities?: { domain: string; affinity: string; weight: number }[];
  seed?: string;
  caption?: string;
  source?: string; // "qloo" | "fallback"
}

export function TasteGenomePanel(props: TasteGenomePanelProps) {
  const source = props.source ?? "qloo";
  return (
    <SpotlightCard
      spotlightColor="rgba(168, 85, 247, 0.18)"
      className="my-4 border-neutral-800 bg-neutral-950/90 p-6 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <Dna className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Your Taste Genome
            </h3>
            <p className="text-[11px] text-neutral-400">
              A 6-axis fingerprint computed from your cultural signals
              {source === "qloo" ? " · Qloo graph live" : " · Local fallback"}.
            </p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold border ${source === "qloo" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" : "bg-amber-500/10 text-amber-300 border-amber-500/30"}`}>
          <Sparkles className="h-3 w-3" />
          {source === "qloo" ? "Qloo Powered" : "Fallback"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <TasteGenome
            motivations={props.motivations ?? []}
            cognitiveStyles={props.cognitiveStyles ?? []}
            affinities={props.affinities ?? []}
            seed={props.seed ?? "demo-student"}
            size={230}
            variant="dual"
          />
        </div>
        <div className="space-y-3">
          {(props.motivations ?? []).slice(0, 4).map((m, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"
            >
              <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                {idx + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-white capitalize">{m}</p>
                <p className="text-[11px] text-neutral-400 leading-snug">
                  High driver of your taste cluster — feeds career match weight.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {props.caption && (
        <p className="mt-3 text-[11px] text-neutral-500 italic">{props.caption}</p>
      )}
    </SpotlightCard>
  );
}

export default TasteGenomePanel;

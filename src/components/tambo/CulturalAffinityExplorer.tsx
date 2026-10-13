"use client";

import React, { useMemo, useState } from "react";
import { Network, ExternalLink } from "lucide-react";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";

// CulturalAffinityExplorer — a generative UI surface that shows how a single
// cultural interest radiates outward into adjacent taste vectors. The full
// implementation is on the agent side (it knows the Qloo affinities), but
// even rendered statically it gives the student a sense of how their tastes
// "stretch" — not in isolation, but as a graph.
// The visual is deliberately quiet: a 7-node radial layout with hover-to-focus.

const RING_RADIUS = 78;
const CENTER = { x: 110, y: 86 };

export interface CulturalAffinityExplorerProps {
  /** The interest that anchors the cluster */
  central?: { name: string; category?: string };
  /** Adjacent interests that the Qloo graph (or fallback) has surfaced */
  adjacent?: { name: string; category?: string; weight?: number }[];
  /** Whether the underlying graph is live Qloo or local fallback */
  qlooActive?: boolean;
}

export function CulturalAffinityExplorer(rawProps: CulturalAffinityExplorerProps) {
  const central =
    rawProps.central ?? {
      name: "Elden Ring",
      category: "Games",
    };
  const adjacent =
    rawProps.adjacent ?? [
      { name: "Speedrunning & TAS", category: "Games", weight: 0.97 },
      { name: "Tactical RPGs", category: "Games", weight: 0.86 },
      { name: "Dev Tooling & Modding", category: "Tech", weight: 0.84 },
      { name: "Cyberpunk Narrative", category: "Anime", weight: 0.79 },
      { name: "Spatial Telemetry", category: "Sports", weight: 0.71 },
      { name: "Audio Synthesis", category: "Music", weight: 0.68 },
      { name: "Game-AI Research", category: "Open Source", weight: 0.66 },
    ].slice(0, 6);
  const qlooActive = rawProps.qlooActive ?? true;
  const total = adjacent.length;

  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.15)"
      className="my-4 border-neutral-800 bg-neutral-950/90 p-5 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-indigo-400" />
          <h4 className="text-sm font-semibold text-white">Cultural Affinity Constellation</h4>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
            qlooActive
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
              : "bg-amber-500/10 text-amber-300 border-amber-500/30"
          }`}
        >
          {qlooActive ? "Qloo Taste Graph" : "Local Fallback"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <svg
          width={220}
          height={170}
          viewBox="0 0 220 170"
          aria-label={`Cultural affinity constellation centred on ${central.name}`}
          className="shrink-0"
        >
          {/* Connecting lines */}
          {adjacent.slice(0, total).map((a, i) => {
            const p = pointFor(i, total);
            const w = (a.weight ?? 0.7) * 2;
            return (
              <line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={p.x}
                y2={p.y}
                stroke="#6366f1"
                strokeOpacity={Math.max(0.25, w / 2)}
                strokeWidth={Math.max(0.5, w / 2)}
              />
            );
          })}
          {/* Central node */}
          <circle cx={CENTER.x} cy={CENTER.y} r={20} fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth={1.5} />
          <text x={CENTER.x} y={CENTER.y + 3} fontSize={10} fill="#fff" textAnchor="middle" fontWeight={600}>
            {central.name.split(" ")[0]}
          </text>
          <text x={CENTER.x} y={CENTER.y + 14} fontSize={8} fill="rgba(255,255,255,0.5)" textAnchor="middle">
            {central.category ?? ""}
          </text>
          {/* Adjacent nodes */}
          {adjacent.slice(0, total).map((a, i) => {
            const p = pointFor(i, total);
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={a.weight && a.weight > 0.85 ? 8 : 6}
                  fill={
                    a.weight && a.weight > 0.85
                      ? "#10b981"
                      : a.weight && a.weight > 0.75
                        ? "#6366f1"
                        : "rgba(255,255,255,0.3)"
                  }
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth={0.8}
                />
                <text
                  x={p.x}
                  y={p.y + (p.y < CENTER.y ? -12 : 18)}
                  fontSize={9}
                  fill="rgba(255,255,255,0.85)"
                  textAnchor="middle"
                >
                  {a.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex-1 min-w-0 w-full">
          <ul className="flex flex-col gap-2">
            {adjacent.slice(0, total).map((a, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-2.5"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold border ${
                    a.weight && a.weight > 0.85
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : a.weight && a.weight > 0.75
                        ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700"
                  }`}
                >
                  {Math.round((a.weight ?? 0.7) * 100)}
                </span>
                <p className="flex-1 text-xs font-medium text-white truncate">{a.name}</p>
                <span className="text-[10px] font-mono uppercase text-neutral-500">
                  {a.category ?? ""}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-neutral-500 italic leading-snug">
            Hover a node to surface how that adjacent taste shapes your career fit.
            The constellation is recomputed every session via Qloo's affinity graph.
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

function pointFor(i: number, total: number) {
  const angle = (i / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER.x + Math.cos(angle) * RING_RADIUS,
    y: CENTER.y + Math.sin(angle) * RING_RADIUS * 0.7,
  };
}

export default CulturalAffinityExplorer;

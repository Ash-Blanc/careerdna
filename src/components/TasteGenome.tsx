"use client";

import React from "react";

// TasteGenome — a fingerprint visualization that maps Qloo-derived taste signals
// into a unique 6-axis radar + a paired "chromosome" strand. Pure SVG so it ships
// as a static asset and renders even before React hydration.
//
// Inputs:
//   motivations: e.g. ["optimizing","building","designing"]
//   cognitiveStyles: e.g. ["systems thinking","spatial reasoning"]
//   affinities: Record<string, { domain, affinity, weight }[]>
//
// Axis palette is intentionally muted — the bloom lives in the data, not the chrome.
const AXES: { id: string; label: string; tone: string }[] = [
  { id: "optimizing", label: "Optimizing", tone: "indigo" },
  { id: "building", label: "Building", tone: "emerald" },
  { id: "competing", label: "Competing", tone: "rose" },
  { id: "designing", label: "Designing", tone: "amber" },
  { id: "analyzing", label: "Analyzing", tone: "cyan" },
  { id: "exploring", label: "Exploring", tone: "violet" },
];

const TONE_HEX: Record<string, string> = {
  indigo: "#6366f1",
  emerald: "#10b981",
  rose: "#ef4444",
  amber: "#f59e0b",
  cyan: "#06b6d4",
  violet: "#a855f7",
};

function buildRadarPoints(
  motivations: string[],
  weight: number
): number[] {
  return AXES.map((axis) => {
    const key = axis.id.toLowerCase();
    const hit = motivations.find((m) => m.toLowerCase().includes(key));
    return hit ? Math.max(0.4, Math.min(1, weight)) : 0.18;
  });
}

function polar(point: { axis: number; level: number }, size: number) {
  const angle = (point.axis / AXES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: size / 2 + Math.cos(angle) * point.level * size * 0.36,
    y: size / 2 + Math.sin(angle) * point.level * size * 0.36,
  };
}

function pathFromLevels(levels: number[], size: number): string {
  return levels
    .map((lvl, i) => {
      const p = polar({ axis: i, level: lvl }, size);
      return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

export interface TasteGenomeProps {
  motivations?: string[];
  cognitiveStyles?: string[];
  affinities?: { domain: string; affinity: string; weight: number }[];
  seed?: string;
  size?: number;
  /** "radar" focuses on axes; "dual" includes the chromosome strand; "strand" hides the radar */
  variant?: "radar" | "dual" | "strand";
  caption?: string;
}

function seedHash(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function TasteGenome({
  motivations = [],
  cognitiveStyles = [],
  affinities = [],
  seed = "careerdna",
  size = 220,
  variant = "dual",
  caption,
}: TasteGenomeProps) {
  // Pull a deterministic weight from the seed so each persona gets a stable fingerprint.
  const seedVal = seedHash(seed);
  const scoreSeed = 0.55 + ((seedVal % 100) / 100) * 0.4;
  const levels = buildRadarPoints(motivations, scoreSeed);

  const strandSegs = AXES.map((axis, i) => {
    const tone = TONE_HEX[axis.tone];
    const isHot = levels[i] > 0.5;
    return { axis, tone, isHot };
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={variant === "dual" ? size * 0.85 + 28 : size}
        viewBox={`0 0 ${size} ${variant === "dual" ? size * 0.85 + 28 : size}`}
        aria-label={
          caption ?? `Taste fingerprint for ${seed} — radar with 6 axes and chromosome strand.`
        }
      >
        <defs>
          <radialGradient id={`tg-glow-${seed}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
          </radialGradient>
          <linearGradient id={`tg-line-${seed}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {variant !== "strand" && (
          <g transform={`translate(0,${variant === "dual" ? 14 : 0})`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size * 0.46}
              fill={`url(#tg-glow-${seed})`}
            />
            {/* Concentric rings — nested targets */}
            {[0.18, 0.36, 0.55, 0.74].map((r, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={r * size * 0.5}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}
            {/* Axis spokes */}
            {AXES.map((a, i) => {
              const p = polar({ axis: i, level: 0.95 }, size);
              return (
                <line
                  key={a.id}
                  x1={size / 2}
                  y1={size / 2}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
              );
            })}
            {/* The fingerprint shape */}
            <path
              d={pathFromLevels(levels, size)}
              fill="rgba(99,102,241,0.18)"
              stroke="#a855f7"
              strokeWidth={1.4}
            />
            {/* Hot dots — where the user leans hardest */}
            {levels.map((lvl, i) => {
              if (lvl < 0.55) return null;
              const p = polar({ axis: i, level: lvl }, size);
              const tone = TONE_HEX[AXES[i].tone];
              return (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={3.2}
                  fill={tone}
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth={1}
                >
                  <animate
                    attributeName="r"
                    values="3.2;4.6;3.2"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${i * 0.15}s`}
                  />
                </circle>
              );
            })}
            {/* Axis labels — discreet, only the active end of each axis is colored */}
            {AXES.map((a, i) => {
              const p = polar({ axis: i, level: 1.05 }, size);
              const isHot = levels[i] > 0.5;
              return (
                <text
                  key={`lab-${a.id}`}
                  x={p.x}
                  y={p.y}
                  fontSize={10}
                  fill={isHot ? TONE_HEX[a.tone] : "rgba(255,255,255,0.4)"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight={isHot ? 600 : 400}
                >
                  {a.label}
                </text>
              );
            })}
          </g>
        )}

        {variant !== "radar" && (
          <g transform={`translate(0,${size - 4})`}>
            {/* Chromosome rail with 6 marker nubs — one per axis */}
            <line
              x1={size * 0.08}
              y1={12}
              x2={size * 0.92}
              y2={12}
              stroke={`url(#tg-line-${seed})`}
              strokeWidth={2}
            />
            {strandSegs.map((seg, i) => {
              const cx = size * 0.08 + (i / (strandSegs.length - 1)) * size * 0.84;
              return (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={12}
                    r={seg.isHot ? 5 : 3}
                    fill={seg.isHot ? seg.tone : "rgba(255,255,255,0.2)"}
                    stroke="rgba(0,0,0,0.6)"
                    strokeWidth={1}
                  />
                  {seg.isHot && (
                    <text
                      x={cx}
                      y={26}
                      fontSize={8}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.6)"
                      fontFamily="ui-monospace,Menlo"
                    >
                      {seg.axis.label.slice(0, 3).toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}
      </svg>
      {caption && (
        <p className="text-[10px] uppercase tracking-widest text-neutral-500">{caption}</p>
      )}
    </div>
  );
}

export default TasteGenome;

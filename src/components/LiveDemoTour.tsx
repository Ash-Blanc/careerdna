"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sparkles, Compass, BookOpen, FolderGit2, Download, Play } from "lucide-react";
import { TasteGenome } from "@/components/TasteGenome";
import { BorderBeam } from "@/components/ui/21st/BorderBeam";

// LiveDemoTour — a self-contained, auto-orbiting preview that mimics the
// coach agent's UI stream without needing a real LLM. Click "Replay demo" to
// restart. The narrative loops through five micro-moments that a real agent
// would emit, ending with a ZIP download CTA.
//
// Each step renders as a chat balloon + an inline preview card. The transition
// between steps is staggered to feel like the agent is *thinking aloud*.

interface TourStep {
  who: "agent" | "user";
  text: string;
  icon: typeof Sparkles;
  panel: React.ReactNode;
}

function RestartIcon(props: { className?: string }) {
  return <Play className={props.className} />;
}

function TourPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-neutral-950/90 p-4 shadow-2xl shadow-indigo-500/10 backdrop-blur-md">
      {children}
    </div>
  );
}

export function LiveDemoTour() {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const steps = useMemo<TourStep[]>(
    () => [
      {
        who: "user",
        text: "I spend 8 hours a week in Football Manager + speedrunning Elden Ring. What does that say about a career?",
        icon: Play,
        panel: (
          <TourPanel>
            <div className="space-y-2">
              {[
                { tag: "Games", label: "Elden Ring speedrunning", weight: 0.96 },
                { tag: "Sports", label: "Football Manager · xG", weight: 0.94 },
                { tag: "Tech", label: "Neovim & terminal ricing", weight: 0.88 },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-neutral-900/60 p-2.5 text-xs"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      ●
                    </span>
                    <span className="text-neutral-100 font-medium">{row.label}</span>
                  </span>
                  <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-400 font-mono">
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </TourPanel>
        ),
      },
      {
        who: "agent",
        text:
          "I just decoded your taste graph from the Qloo cultural AI — here is your 6-axis fingerprint. Notice the optimizing + competing axes dominate.",
        icon: Sparkles,
        panel: (
          <TourPanel>
            <div className="flex flex-col items-center gap-2 py-2">
              <TasteGenome
                motivations={["optimizing", "competing", "analyzing"]}
                cognitiveStyles={["systems thinking", "spatial reasoning"]}
                seed="alex.fingerprint"
                size={200}
                variant="dual"
                caption="Qloo · 250M entities live"
              />
            </div>
          </TourPanel>
        ),
      },
      {
        who: "agent",
        text:
          "Three career tracks rank above 85% taste fit. Highest: **Sports Analytics Engineer** at 96%. Your spatial and tactical instincts map directly to expected-goals telemetry.",
        icon: Compass,
        panel: (
          <TourPanel>
            <div className="space-y-2">
              {[
                { title: "Sports Analytics Engineer", score: 96, tier: "Differentiated" },
                { title: "Quantitative Developer", score: 92, tier: "High Demand" },
                { title: "Game Systems Engineer", score: 89, tier: "Differentiated" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-3"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{c.title}</p>
                    <p className="text-[10px] text-neutral-400">{c.tier} track</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-emerald-300 tabular-nums">
                      {c.score}
                    </span>
                    <span className="text-[10px] text-neutral-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </TourPanel>
        ),
      },
      {
        who: "agent",
        text:
          "I built a 12-week sprint roadmap and a flagship portfolio project: *Tactical Scout AI* — a spatial pitch telemetry engine. Resources are free (StatsBomb, FastAPI, ChromaDB).",
        icon: BookOpen,
        panel: (
          <TourPanel>
            <div className="space-y-2.5">
              {[
                { week: 1, label: "Scrape StatsBomb · model pressing efficiency matrices" },
                { week: 2, label: "Vector index of football tactics + manager playbooks" },
                { week: 3, label: "Multi-agent commentary & debate loop" },
                { week: 4, label: "Live dashboard · deploy on Vercel / Fly.io" },
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="rounded-md bg-indigo-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/30 shrink-0">
                    W{m.week}
                  </span>
                  <p className="text-xs text-neutral-200 leading-snug">{m.label}</p>
                </div>
              ))}
              <div className="pt-2 border-t border-white/[0.05] flex items-center gap-2 text-[11px] text-emerald-300">
                <Download className="h-3 w-3" />
                <span>ZIP starter repo ready · MIT licensed</span>
              </div>
            </div>
          </TourPanel>
        ),
      },
      {
        who: "agent",
        text:
          "Your starter repo is a 6-file ZIP with package.json, architecture doc, FastAPI/Bun scaffold, weekly milestones, README with pay-band envelope. Click Download to push it.",
        icon: FolderGit2,
        panel: (
          <TourPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-neutral-900/60 p-3">
                <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">
                  Step 1
                </p>
                <p className="text-xs font-semibold text-white mt-1">Decode your Career DNA</p>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                  Click below; you only do this once.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3 relative overflow-hidden">
                <BorderBeam size={120} duration={6} colorFrom="#10b981" colorTo="#6366f1" />
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">
                  Step 2
                </p>
                <p className="text-xs font-semibold text-white mt-1">Download starter repo</p>
                <a
                  href="/api/portfolio/starter-repo"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-200 underline underline-offset-4 hover:text-emerald-100"
                >
                  <Download className="h-3 w-3" />
                  Get careerdna-starter.zip
                </a>
              </div>
            </div>
          </TourPanel>
        ),
      },
    ],
    []
  );

  // Auto-rotate through the steps.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStepIdx((i) => {
        if (i + 1 >= steps.length) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 3600);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const current = steps[stepIdx];

  return (
    <div className="relative">
      {/* Window chrome */}
      <div className="rounded-3xl border border-white/[0.08] bg-neutral-900/60 p-2 shadow-2xl backdrop-blur-xl">
        <BorderBeam size={320} duration={12} colorFrom="#6366f1" colorTo="#a855f7" />
        <div className="rounded-2xl bg-neutral-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="font-mono text-[10px] text-neutral-500">
                careerdna.ai · live agent demo
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStepIdx(0);
                setPlaying(true);
              }}
              className="flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold text-neutral-300 border border-white/[0.07] hover:bg-neutral-800 hover:text-white"
            >
              <RestartIcon className="h-3 w-3" />
              Replay tour
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 min-h-[420px] flex flex-col gap-4 justify-start">
            {steps.slice(0, stepIdx + 1).map((s, i) => {
              const isUser = s.who === "user";
              const isCurrent = i === stepIdx;
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} animate-[fadeIn_0.5s_ease]`}
                  style={{ animationName: "fade-in" }}
                >
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 px-1">
                    {isUser ? "You" : "CareerDNA Strategist"}
                  </span>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed max-w-md ${
                      isUser
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 rounded-tr-sm"
                        : "bg-neutral-900/90 text-neutral-200 border border-white/[0.07] rounded-tl-sm shadow-lg"
                    }`}
                  >
                    <p>
                      {s.text.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                        part.startsWith("**") ? (
                          <strong key={j} className="font-semibold text-white">
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          <React.Fragment key={j}>{part}</React.Fragment>
                        )
                      )}
                    </p>
                  </div>

                  {isCurrent && !isUser && (
                    <div className="w-full max-w-md mt-1">{s.panel}</div>
                  )}
                </div>
              );
            })}

            {/* Streaming hint */}
            {playing && stepIdx < steps.length - 1 && (
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 px-1">
                <Sparkles className="h-3 w-3 animate-spin text-indigo-400" />
                Strategist is synchronizing taste signals…
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {steps.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`h-1.5 rounded-full transition-all ${
              i === stepIdx ? "w-6 bg-indigo-400" : "w-1.5 bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Inline keyframes for the fadeIn animation used in the message stream.
export const LIVE_DEMO_STYLES = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

export default LiveDemoTour;

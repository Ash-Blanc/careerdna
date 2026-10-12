"use client";

import React, { useState } from "react";
import { RoadmapTimelineProps, RoadmapTimelinePropsSchema } from "./registry";
import { CheckCircle2, Circle, Calendar, ChevronRight, CheckSquare, Sparkles, RefreshCw } from "lucide-react";

export function RoadmapTimeline(rawProps: RoadmapTimelineProps) {
  const result = RoadmapTimelinePropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  const [phases, setPhases] = useState(props?.phases || []);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  if (!props || phases.length === 0) {
    return (
      <div className="my-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-sm text-neutral-400">
        Generating 30/60/90-day action roadmap...
      </div>
    );
  }

  const toggleItemStatus = async (phaseIdx: number, weekIdx: number, itemId: string) => {
    const newPhases = [...phases];
    const currentStatus = newPhases[phaseIdx]?.weeks[weekIdx]?.status;
    const nextStatus = currentStatus === "COMPLETED" ? "TODO" : "COMPLETED";

    if (newPhases[phaseIdx]?.weeks[weekIdx]) {
      newPhases[phaseIdx]!.weeks[weekIdx]!.status = nextStatus;
      setPhases(newPhases);
    }

    try {
      await fetch("/api/roadmaps/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, status: nextStatus }),
      });
    } catch (e) {
      console.warn("Failed to update status on server:", e);
    }
  };

  const activePhase = phases[activePhaseIndex] || phases[0];

  return (
    <div className="my-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            12-Week Execution Roadmap
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">{props.roadmapTitle}</h3>
          <p className="text-xs text-neutral-400">Target Role: <strong className="text-neutral-200">{props.targetRole}</strong></p>
        </div>
      </div>

      {/* Phase Tabs */}
      <div className="flex rounded-xl bg-neutral-900/80 p-1 border border-neutral-800 mb-6 overflow-x-auto">
        {phases.map((p, idx) => {
          const isActive = activePhaseIndex === idx;
          const completedCount = p.weeks.filter((w) => w.status === "COMPLETED").length;
          const totalCount = p.weeks.length;

          return (
            <button
              key={p.phase}
              type="button"
              onClick={() => setActivePhaseIndex(idx)}
              className={`flex-1 min-w-[140px] rounded-lg px-3 py-2 text-xs font-medium transition-all text-center flex flex-col items-center gap-0.5 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md font-semibold"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
              }`}
            >
              <span>{p.phase === "30_DAYS" ? "Month 1 (Days 1–30)" : p.phase === "60_DAYS" ? "Month 2 (Days 31–60)" : "Month 3 (Days 61–90)"}</span>
              <span className={`text-[10px] ${isActive ? "text-indigo-200" : "text-neutral-500"}`}>
                {completedCount}/{totalCount} Completed
              </span>
            </button>
          );
        })}
      </div>

      {/* Phase Description */}
      {activePhase && (
        <div className="mb-5 rounded-xl bg-neutral-900/40 p-3.5 border border-neutral-800/60">
          <h4 className="text-xs font-semibold text-neutral-200">{activePhase.label}</h4>
          <p className="text-xs text-neutral-400 mt-0.5">{activePhase.description}</p>
        </div>
      )}

      {/* Weekly Items Timeline */}
      {activePhase && (
        <div className="space-y-4">
          {activePhase.weeks.map((week, weekIdx) => {
            const isCompleted = week.status === "COMPLETED";

            return (
              <div
                key={week.id || week.weekNumber}
                className={`rounded-xl border p-4 transition-all ${
                  isCompleted
                    ? "border-emerald-500/30 bg-emerald-950/10"
                    : "border-neutral-800/80 bg-neutral-900/60 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleItemStatus(activePhaseIndex, weekIdx, week.id)}
                      className="mt-0.5 text-neutral-400 hover:text-emerald-400 transition-colors shrink-0"
                      title={isCompleted ? "Mark incomplete" : "Mark completed"}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-neutral-600 hover:text-neutral-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                          Week {week.weekNumber}
                        </span>
                        <h5 className={`text-sm font-semibold ${isCompleted ? "text-neutral-400 line-through" : "text-white"}`}>
                          {week.title}
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{week.description}</p>

                      {/* Concrete Deliverables */}
                      {week.deliverables.length > 0 && (
                        <div className="mt-3">
                          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                            Concrete Deliverables:
                          </span>
                          <ul className="space-y-1">
                            {week.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="text-xs text-neutral-300 flex items-center gap-1.5">
                                <CheckSquare className="h-3 w-3 text-indigo-400 shrink-0" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

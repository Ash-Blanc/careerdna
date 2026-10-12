"use client";

import React from "react";
import { PortfolioProjectCardProps, PortfolioProjectCardPropsSchema } from "./registry";
import { FolderGit2, Sparkles, CheckCircle2, Clock, Code, Award } from "lucide-react";

export function PortfolioProjectCard(rawProps: PortfolioProjectCardProps) {
  const result = PortfolioProjectCardPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  if (!props) return null;

  const { title, goal, features, techStack, timelineWeeks, difficulty, whyFitReason, starterMilestones } = props;

  return (
    <div className="my-6 rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Signature Proof of Work</span>
            <h3 className="text-base font-bold text-white mt-0.5">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300 font-medium border border-neutral-700 flex items-center gap-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            {timelineWeeks} Weeks Scope
          </span>
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300 font-semibold border border-indigo-500/20">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-4 rounded-xl bg-neutral-950/60 p-4 border border-neutral-800/50">
        <div className="text-xs font-semibold text-neutral-300 mb-1">Project Mission:</div>
        <p className="text-xs leading-relaxed text-neutral-300">{goal}</p>
      </div>

      {/* Why This Project Fits You */}
      <div className="mb-4 rounded-xl border border-purple-900/30 bg-purple-950/10 p-3.5 text-xs text-purple-200">
        <div className="flex items-center gap-1.5 font-semibold text-purple-300 mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          Why This Project Fits Your Taste:
        </div>
        <p className="leading-relaxed">{whyFitReason}</p>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5 text-indigo-400" />
          Recommended Tech Stack
        </div>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, idx) => (
            <span key={idx} className="rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-mono text-neutral-200 border border-neutral-700">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Core Features */}
      {features.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            Standout Portfolio Features
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feat, idx) => (
              <div key={idx} className="rounded-lg bg-neutral-950/40 p-2.5 text-xs text-neutral-300 border border-neutral-900 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Starter Milestones */}
      {starterMilestones && starterMilestones.length > 0 && (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
            Sprint Execution Plan:
          </div>
          <div className="space-y-2">
            {starterMilestones.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-neutral-300 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/40">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  {m.milestone}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Week {m.dueWeek}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

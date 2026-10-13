"use client";

import React from "react";
import { CareerDeepDiveProps, CareerDeepDivePropsSchema } from "./registry";
import { Briefcase, DollarSign, AlertCircle, Wrench, Lightbulb, Clock } from "lucide-react";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { Badge } from "@/components/ui/badge";

export function CareerDeepDive(rawProps: CareerDeepDiveProps) {
  const result = CareerDeepDivePropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  if (!props) return null;

  const {
    trackTitle = "Career Track",
    fitScore = 90,
    dayInLife = "Sprint planning, deep architectural builds, and iterative feature shipping.",
    requiredSkills = [],
    entryRoles = [],
    salaryContext = {
      entry: "Competitive Entry Range",
      mid: "High Mid-Career Range",
      indiaNotes: "High demand in top technology hubs",
      globalNotes: "Strong global remote options",
    },
    risksAndRealities = "Portfolio proof-of-work is decisive over pedigree.",
    portfolioIdeas = [],
  } = props;

  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.15)"
      className="my-6 border-neutral-800 bg-neutral-950/90 p-6 shadow-xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Career Track Reality Check</span>
          <h3 className="text-xl font-bold text-white mt-0.5">{trackTitle}</h3>
        </div>
        <div className="rounded-full bg-indigo-500/10 px-3 py-1 border border-indigo-500/30 text-indigo-300 font-semibold text-xs">
          {fitScore}% Taste Alignment
        </div>
      </div>

      {/* Day in the Life */}
      <div className="mb-5 rounded-xl bg-neutral-950/60 p-4 border border-neutral-800/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
          <Clock className="h-4 w-4 text-indigo-400" />
          Day-to-Day Reality
        </div>
        <p className="text-xs leading-relaxed text-neutral-300">{dayInLife}</p>
      </div>

      {/* Grid: First Roles & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Entry Roles */}
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Briefcase className="h-4 w-4" />
            Typical First Entry Roles
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(entryRoles || []).map((role, idx) => (
              <Badge key={idx} variant="success" className="text-xs">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        {/* Required Skills */}
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Wrench className="h-4 w-4" />
            Core Skills to Prove
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(requiredSkills || []).slice(0, 6).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Salary & Opportunity Context */}
      <div className="mb-5 rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
          <DollarSign className="h-4 w-4" />
          Compensation & Regional Market Realities
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-neutral-950/50 p-2.5 border border-neutral-800">
            <div className="text-neutral-400 font-medium">Entry-Level Range</div>
            <div className="text-white font-semibold mt-0.5">{salaryContext?.entry || "Competitive Entry Range"}</div>
          </div>
          <div className="rounded-lg bg-neutral-950/50 p-2.5 border border-neutral-800">
            <div className="text-neutral-400 font-medium">Mid-Career Range</div>
            <div className="text-white font-semibold mt-0.5">{salaryContext?.mid || "High Mid-Career Range"}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-neutral-400">
          <p><strong className="text-neutral-200">India Market:</strong> {salaryContext?.indiaNotes || "Rapidly growing demand in major tech hubs"}</p>
          <p><strong className="text-neutral-200">Global Remote:</strong> {salaryContext?.globalNotes || "High global remote hiring viability"}</p>
        </div>
      </div>

      {/* Risks & Reality Check */}
      <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 text-xs text-amber-200/90 flex items-start gap-2.5 mb-5">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Hard Truth & Common Misconception: </span>
          {risksAndRealities}
        </div>
      </div>

      {/* Portfolio Ideas */}
      {portfolioIdeas && portfolioIdeas.length > 0 && (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
            <Lightbulb className="h-4 w-4" />
            Signature Project Ideas to Stand Out
          </div>
          <ul className="space-y-1 text-xs text-neutral-300 list-disc list-inside">
            {(portfolioIdeas || []).map((idea, idx) => (
              <li key={idx}>{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </SpotlightCard>
  );
}

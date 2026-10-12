"use client";

import React, { useState, useEffect } from "react";
import { CareerTasteMapProps, CareerTasteMapPropsSchema } from "./registry";
import { Compass, CheckCircle, ArrowRight, AlertTriangle, Layers, Flame, Filter } from "lucide-react";
import { useTamboHost } from "./TamboHostProvider";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { BorderBeam } from "@/components/ui/21st/BorderBeam";

export function CareerTasteMap(rawProps: CareerTasteMapProps) {
  const result = CareerTasteMapPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;
  const { triggerAction } = useTamboHost();

  const [selectedId, setSelectedId] = useState<string | null>(props.selectedCareerId || null);
  const [activeTier, setActiveTier] = useState<string>("ALL");

  const careerOptions = props?.careerOptions || [];

  useEffect(() => {
    if (props?.selectedCareerId) {
      setSelectedId(props.selectedCareerId);
    }
  }, [props?.selectedCareerId]);

  if (careerOptions.length === 0) {
    return (
      <div className="my-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-sm text-neutral-400">
        Synthesizing career directions from your taste graph...
      </div>
    );
  }

  const handleSelect = (career: (typeof careerOptions)[0]) => {
    setSelectedId(career.id);
    triggerAction({
      type: "SELECT_CAREER",
      payload: {
        careerOptionId: career.id,
        trackKey: career.trackKey,
        title: career.title,
        fitScore: career.fitScore,
      },
    });
  };

  const handleDeepDive = (career: (typeof careerOptions)[0]) => {
    triggerAction({
      type: "DEEP_DIVE",
      payload: {
        careerOptionId: career.id,
        trackKey: career.trackKey,
        title: career.title,
      },
    });
  };

  const filteredOptions =
    activeTier === "ALL" ? careerOptions : careerOptions.filter((c) => c.demandTier === activeTier);

  return (
    <div className="my-6 space-y-4">
      {/* Header and Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            Career Taste Map
          </h3>
          <p className="text-xs text-neutral-400">
            {careerOptions.length} ranked career directions aligned with your taste DNA
          </p>
        </div>

        {/* Demand Tier Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["ALL", "High Demand", "Differentiated", "Founder"].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setActiveTier(tier)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                activeTier === tier
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {tier === "ALL" ? "All Tracks" : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOptions.map((career) => {
          const isSelected = selectedId === career.id;

          const tierBadgeColor =
            career.demandTier === "Founder"
              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
              : career.demandTier === "Differentiated"
              ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
              : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";

          return (
            <SpotlightCard
              key={career.id}
              spotlightColor={isSelected ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.08)"}
              className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 ${
                isSelected
                  ? "border-indigo-500 bg-indigo-950/20 shadow-xl shadow-indigo-500/15 ring-1 ring-indigo-500/50"
                  : "border-neutral-800/80 bg-neutral-900/70 hover:border-neutral-700 hover:bg-neutral-900"
              }`}
            >
              {isSelected && <BorderBeam size={220} duration={8} colorFrom="#6366f1" colorTo="#a855f7" />}

              {/* Card Header: Title & Fit Score */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <span className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-medium mb-1.5 ${tierBadgeColor}`}>
                      {career.demandTier}
                    </span>
                    <h4 className="text-base font-semibold text-white leading-snug">{career.title}</h4>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 border border-indigo-500/20">
                      <Flame className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="text-xs font-bold text-indigo-300">{career.fitScore}% Fit</span>
                    </div>
                  </div>
                </div>

                {/* Direct Taste Reasoning */}
                <p className="text-xs leading-relaxed text-neutral-300 mb-4 bg-neutral-950/50 rounded-xl p-3 border border-neutral-800/40">
                  {career.reasoning}
                </p>

                {/* Required Skills */}
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    Core Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-neutral-800/80 px-2 py-0.5 text-[11px] text-neutral-200 border border-neutral-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Risk / Reality Check */}
                <div className="mb-4 text-[11px] text-neutral-400 flex items-start gap-1.5 bg-neutral-950/30 p-2.5 rounded-lg border border-neutral-900">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                  <span>{career.riskAnalysis}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/60">
                <button
                  type="button"
                  onClick={() => handleDeepDive(career)}
                  className="flex-1 rounded-xl border border-neutral-700/80 bg-neutral-800/50 px-3 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all text-center"
                >
                  Deep Dive
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(career)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all shadow-md ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-400"
                      : "bg-indigo-600/90 text-white hover:bg-indigo-500"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" /> Selected
                    </>
                  ) : (
                    <>
                      Select Path <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}

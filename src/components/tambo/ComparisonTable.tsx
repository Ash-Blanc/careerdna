"use client";

import React from "react";
import { ComparisonTableProps, ComparisonTablePropsSchema } from "./registry";
import { Table, Flame } from "lucide-react";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { Badge } from "@/components/ui/badge";

export function ComparisonTable(rawProps: ComparisonTableProps) {
  const result = ComparisonTablePropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  const careers = Array.isArray(props?.careers) ? props.careers : [];
  if (careers.length === 0) return null;

  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.12)"
      className="my-6 border-neutral-800 bg-neutral-950/90 p-5 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
        <Table className="h-4 w-4 text-indigo-400" />
        <h4 className="text-sm font-semibold text-white">Cross-Track Strategic Trade-offs</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-[11px] font-semibold uppercase text-neutral-400">
              <th className="py-2.5 px-3">Career Track</th>
              <th className="py-2.5 px-3">Taste Fit</th>
              <th className="py-2.5 px-3">Core Leverage</th>
              <th className="py-2.5 px-3">Market Demand</th>
              <th className="py-2.5 px-3">Learning Curve</th>
              <th className="py-2.5 px-3">Compensation</th>
              <th className="py-2.5 px-3">Lifestyle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {careers.map((c, idx) => (
              <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">{c.title}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-indigo-300 font-bold">
                    <Flame className="h-3 w-3 text-indigo-400" />
                    {c.fitScore}%
                  </span>
                </td>
                <td className="py-3 px-3 text-neutral-300">{c.skillLeverage}</td>
                <td className="py-3 px-3">
                  <Badge variant="secondary" className="text-[10px]">
                    {c.marketDemand}
                  </Badge>
                </td>
                <td className="py-3 px-3 text-neutral-300">{c.learningCurve}</td>
                <td className="py-3 px-3 text-emerald-400 font-medium">{c.compPotential}</td>
                <td className="py-3 px-3 text-neutral-400">{c.lifestyle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpotlightCard>
  );
}

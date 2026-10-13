"use client";

import React, { useState } from "react";
import { ResourceListProps, ResourceListPropsSchema } from "./registry";
import { BookOpen, Users, Video, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ResourceList(rawProps: ResourceListProps) {
  const result = ResourceListPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const resources = props?.resources || [];

  if (resources.length === 0) return null;

  const filtered = activeFilter === "ALL" ? resources : resources.filter((r) => r.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "COMMUNITY":
        return <Users className="h-4 w-4 text-emerald-400" />;
      case "CREATOR":
        return <Video className="h-4 w-4 text-purple-400" />;
      case "EVENT":
        return <Calendar className="h-4 w-4 text-amber-400" />;
      default:
        return <BookOpen className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-white/[0.08] bg-neutral-950/80 p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
        <div>
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Curated Launchpad</span>
          <h3 className="text-base font-bold text-white mt-0.5">{props.title || "Free & High-Leverage Learning Resources"}</h3>
        </div>

        {/* Filter Chips using shadcn Button */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["ALL", "LEARNING", "COMMUNITY", "CREATOR"].map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={activeFilter === cat ? "default" : "outline"}
              onClick={() => setActiveFilter(cat)}
              className="text-[11px] h-7 px-2.5 rounded-lg"
            >
              {cat === "ALL" ? "All" : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((res, idx) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-white/[0.06] bg-neutral-900/60 p-4 transition-all hover:border-white/[0.15] hover:bg-neutral-900"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(res.category)}
                  <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider font-mono">
                    {res.category}
                  </span>
                </div>
                {res.isFree && (
                  <Badge variant="success" className="font-mono text-[10px]">
                    100% Free
                  </Badge>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                {res.title}
                <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 shrink-0" />
              </h4>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">{res.description}</p>
            </div>

            {/* Tags */}
            {res.tags && res.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1 border-t border-white/[0.06] pt-2.5">
                {res.tags.slice(0, 3).map((tag, tIdx) => (
                  <Badge key={tIdx} variant="secondary" className="font-mono text-[10px] px-1.5 py-0 text-neutral-400">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

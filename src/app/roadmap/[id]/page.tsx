import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { RoadmapTimeline } from "@/components/tambo/RoadmapTimeline";
import { PortfolioProjectCard } from "@/components/tambo/PortfolioProjectCard";
import { ResourceList } from "@/components/tambo/ResourceList";
import { ExportRoadmapButton } from "@/components/tambo/ExportRoadmapButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function safeJsonParse<T>(input: string, fallback: T): T {
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const roadmap = await prisma.roadmap.findUnique({
    where: { id },
    include: {
      careerOption: true,
      items: { orderBy: { orderIndex: "asc" } },
      portfolioProjects: true,
      resources: true,
    },
  });

  if (!roadmap) {
    notFound();
  }

  // Group weekly items into 3 phases
  const phase1Weeks = roadmap.items.filter((i) => i.phase === "30_DAYS");
  const phase2Weeks = roadmap.items.filter((i) => i.phase === "60_DAYS");
  const phase3Weeks = roadmap.items.filter((i) => i.phase === "90_DAYS");

  const phases = [
    {
      phase: "30_DAYS" as const,
      label: "Phase 1: Exploration & Foundations (Days 1–30)",
      description: "Establish foundational mental models, dev environment, and core syntax.",
      weeks: phase1Weeks.map((w) => ({
        id: w.id,
        weekNumber: w.weekNumber,
        title: w.title,
        description: w.description,
        deliverables: safeJsonParse<string[]>(w.deliverables, []),
        resources: safeJsonParse<string[]>(w.resources || "[]", []),
        status: w.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
      })),
    },
    {
      phase: "60_DAYS" as const,
      label: "Phase 2: Deep Skill-Building & Architecture (Days 31–60)",
      description: "Build signature systems, tackle edge cases, and optimize performance.",
      weeks: phase2Weeks.map((w) => ({
        id: w.id,
        weekNumber: w.weekNumber,
        title: w.title,
        description: w.description,
        deliverables: safeJsonParse<string[]>(w.deliverables, []),
        resources: safeJsonParse<string[]>(w.resources || "[]", []),
        status: w.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
      })),
    },
    {
      phase: "90_DAYS" as const,
      label: "Phase 3: Portfolio Polish, Community & Applications (Days 61–90)",
      description: "Deploy to production, write technical case studies, and apply to roles.",
      weeks: phase3Weeks.map((w) => ({
        id: w.id,
        weekNumber: w.weekNumber,
        title: w.title,
        description: w.description,
        deliverables: safeJsonParse<string[]>(w.deliverables, []),
        resources: safeJsonParse<string[]>(w.resources || "[]", []),
        status: w.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
      })),
    },
  ];

  const project = roadmap.portfolioProjects[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Hero Card */}
      <div className="rounded-3xl border border-white/[0.08] bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-4">
          <div>
            <Badge variant="purple" className="text-xs font-semibold">
              Role Focus: {roadmap.targetRole}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{roadmap.title}</h1>
          </div>
          <span className="text-xs font-mono text-neutral-400">{roadmap.totalDurationWeeks} Weeks Strategy</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{roadmap.summary}</p>
      </div>

      {/* Export Button Component */}
      <ExportRoadmapButton roadmapId={roadmap.id} roadmapTitle={roadmap.title} />

      {/* Flagship Portfolio Project */}
      {project && (
        <PortfolioProjectCard
          projectId={project.id}
          title={project.title}
          goal={project.goal}
          features={safeJsonParse<string[]>(project.features, [])}
          techStack={safeJsonParse<string[]>(project.techStack, [])}
          timelineWeeks={project.timelineWeeks}
          difficulty={project.difficulty}
          whyFitReason={project.whyFitReason}
          starterMilestones={safeJsonParse<any[]>(project.starterMilestones, [])}
        />
      )}

      {/* 12-Week Interactive Timeline */}
      <RoadmapTimeline
        roadmapId={roadmap.id}
        roadmapTitle={roadmap.title}
        targetRole={roadmap.targetRole}
        phases={phases}
      />

      {/* Free Resources & Communities */}
      {roadmap.resources.length > 0 && (
        <ResourceList
          resources={roadmap.resources.map((r) => ({
            title: r.title,
            category: r.category,
            url: r.url,
            description: r.description,
            isFree: r.isFree,
            tier: r.tier,
            tags: safeJsonParse<string[]>(r.tags, []),
          }))}
          title="Curated Free Resources & Communities for this Roadmap"
        />
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import {
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  Flame,
  Clock,
  Layers,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await prisma.user.findFirst({
    where: { email: "alex.chen@careerdna.ai" },
    include: {
      profile: {
        include: {
          interests: true,
          tasteProfiles: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: { careerOptions: true },
          },
          roadmaps: {
            orderBy: { createdAt: "desc" },
            include: {
              careerOption: true,
              items: true,
              portfolioProjects: true,
            },
          },
        },
      },
    },
  });

  const profile = user?.profile;
  const latestTasteProfile = profile?.tasteProfiles[0];
  const roadmaps = profile?.roadmaps || [];
  const careerOptions = latestTasteProfile?.careerOptions || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Student Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome back, {user?.name || "Career Explorer"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {profile?.educationLevel || "Student"} · {profile?.interests.length || 0} Cultural Passions Active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/coach"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:scale-102 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open Coach Session</span>
          </Link>
        </div>
      </div>

      {/* Active Roadmaps Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Active 30/60/90-Day Roadmaps</h2>
          </div>
          <span className="text-xs text-neutral-400">{roadmaps.length} saved</span>
        </div>

        {roadmaps.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center">
            <Calendar className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
            <h3 className="text-sm font-semibold text-white">No roadmap generated yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 mb-4">
              Chat with the CareerDNA coach or select a path from your Career Taste Map to generate your 12-week plan.
            </p>
            <Link
              href="/coach"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-all"
            >
              <span>Build Roadmap in Coach</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmaps.map((rm) => {
              const completedCount = rm.items.filter((i) => i.status === "COMPLETED").length;
              const totalCount = rm.items.length;
              const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <SpotlightCard
                  key={rm.id}
                  spotlightColor="rgba(16, 185, 129, 0.15)"
                  className="rounded-2xl border-neutral-800 bg-neutral-900/60 p-5 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="rounded bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          Target: {rm.targetRole}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1.5">{rm.title}</h3>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">{rm.totalDurationWeeks} Wks</span>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">{rm.summary}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                        <span>Milestone Progress</span>
                        <span className="font-semibold text-white">{completedCount}/{totalCount} ({progressPct}%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
                    <span className="text-[11px] text-neutral-500">
                      Created {new Date(rm.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/roadmap/${rm.id}`}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>View Full Roadmap</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Career Taste Map Archive */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Your Career Taste Map Candidates</h2>
          </div>
        </div>

        {careerOptions.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 text-center text-xs text-neutral-400">
            Career options will populate as soon as you run an AI Coach session.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerOptions.map((opt) => (
              <SpotlightCard
                key={opt.id}
                spotlightColor="rgba(99, 102, 241, 0.15)"
                className="rounded-2xl border-neutral-800/80 bg-neutral-900/50 p-4 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-white">{opt.title}</span>
                    <span className="text-indigo-400 font-bold flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {opt.fitScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-3 leading-relaxed mb-3">
                    {opt.reasoning}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[11px]">
                  <span className="text-neutral-500">{opt.demandTier}</span>
                  <Link href="/coach" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Discuss in Coach →
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

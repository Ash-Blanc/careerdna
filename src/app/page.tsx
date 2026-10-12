import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  ArrowRight,
  Gamepad2,
  Trophy,
  Code2,
  Film,
  Music,
  CheckCircle2,
  Zap,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-pink-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center">
        {/* Pill Announcement */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-sm mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Cultural Taste AI Career Coach</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300">Powered by Qloo & Tambo</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-tight">
          Your taste is{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            evidence
          </span>
          , not a distraction.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed">
          CareerDNA decodes what you love—gaming, anime, football tactics, music production, creators, and internet
          culture—into personalized, high-leverage career paths, signature portfolio projects, and a 30/60/90-day action
          plan.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-purple-500 hover:scale-102 transition-all"
          >
            <span>Start Free Intake (2 mins)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/coach"
            className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all"
          >
            <span>Test Live Coach Demo</span>
          </Link>
        </div>

        {/* Badges / Metrics */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            No generic chatbot quizzes
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Qloo Cultural Affinity Mapping
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Tambo Generative UI (No Raw JSON)
          </span>
        </div>
      </section>

      {/* Interactive Transformation Teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Beyond Superficial Stereotypes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              "You like anime → become an animator" is broken.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              CareerDNA analyzes the cognitive style, systems thinking, and intrinsic motivations underneath what you
              consume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Passions */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block mb-3">
                1. Cultural Passions
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-xl bg-neutral-900 p-2.5 text-xs text-neutral-200 border border-neutral-800">
                  <Gamepad2 className="h-4 w-4 text-purple-400" />
                  <span>Elden Ring & Speedrunning</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-900 p-2.5 text-xs text-neutral-200 border border-neutral-800">
                  <Trophy className="h-4 w-4 text-emerald-400" />
                  <span>Premier League Tactics & xG</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-neutral-900 p-2.5 text-xs text-neutral-200 border border-neutral-800">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  <span>Neovim & Terminal Ricing</span>
                </div>
              </div>
            </div>

            {/* Column 2: Qloo Engine */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block mb-3">
                  2. Qloo Latent Signals
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                  Infers underlying desire for <strong>systems optimization</strong>, <strong>spatial analytics</strong>
                  , and <strong>low-latency execution</strong> over shallow visual work.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded bg-indigo-900/40 px-2 py-0.5 text-[10px] text-indigo-200 border border-indigo-500/30">
                    High APM / Reaction
                  </span>
                  <span className="rounded bg-indigo-900/40 px-2 py-0.5 text-[10px] text-indigo-200 border border-indigo-500/30">
                    Probabilistic Modeling
                  </span>
                  <span className="rounded bg-indigo-900/40 px-2 py-0.5 text-[10px] text-indigo-200 border border-indigo-500/30">
                    Ergonomic Mastery
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-500/20 text-[11px] text-indigo-300 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                <span>Zero superficial assumptions made</span>
              </div>
            </div>

            {/* Column 3: High-Leverage Paths */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-3">
                3. Matched Career DNA
              </span>
              <div className="space-y-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Sports Analytics Engineer</span>
                    <span className="text-emerald-400 font-bold">96% Fit</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Spatial pitch telemetry & player valuation</p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Quantitative Developer</span>
                    <span className="text-indigo-400 font-bold">94% Fit</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Nanosecond matching engines & C++</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Generative UI Showcase */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Agentic Generative UI
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Real React Components, Not Endless Paragraphs
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            The Tambo layer renders 10 interactive UI surfaces directly into the conversation stream.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          {[
            { name: "TasteProfileCard", desc: "Motivations & cultural signals" },
            { name: "CareerTasteMap", desc: "4-6 ranked directions" },
            { name: "CareerDeepDive", desc: "Day-to-day & salary reality" },
            { name: "RoadmapTimeline", desc: "30/60/90-day checklist" },
            { name: "PortfolioProjectCard", desc: "Signature starter project" },
            { name: "ResourceList", desc: "Curated learning & creators" },
            { name: "FollowUpQuestionCard", desc: "High-leverage inquiry chips" },
            { name: "ComparisonTable", desc: "Trade-offs across tracks" },
            { name: "QlooReasoningPanel", desc: "Evidence explanation panel" },
            { name: "ExportRoadmapButton", desc: "1-click Markdown & PDF" },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3.5">
              <div className="text-xs font-bold text-indigo-300 font-mono">{"<" + item.name + " />"}</div>
              <div className="text-[11px] text-neutral-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="rounded-3xl bg-gradient-to-tr from-indigo-950/60 via-purple-950/40 to-neutral-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to discover your Career DNA?</h2>
          <p className="mt-3 text-sm text-neutral-300 max-w-xl mx-auto">
            Take 2 minutes to select your passions. Receive a personalized roadmap with weekly deliverables and a
            signature portfolio project.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/onboarding"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

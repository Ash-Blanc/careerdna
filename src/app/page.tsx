"use client";

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
  Brain,
  Rocket,
  Shield,
  FolderGit2,
} from "lucide-react";
import { Marquee } from "@/components/ui/21st/Marquee";
import { ShimmerButton } from "@/components/ui/21st/ShimmerButton";
import { BentoGrid, BentoCard } from "@/components/ui/21st/BentoGrid";
import { AnimatedGradientText } from "@/components/ui/21st/AnimatedGradientText";
import { BorderBeam } from "@/components/ui/21st/BorderBeam";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";

export default function LandingPage() {
  const samplePassions = [
    { icon: Gamepad2, label: "Elden Ring & Speedrunning", cat: "Games" },
    { icon: Trophy, label: "Premier League & xG Telemetry", cat: "Sports" },
    { icon: Code2, label: "Neovim & Terminal Ricing", cat: "Tech" },
    { icon: Film, label: "Attack on Titan & Cyberpunk", cat: "Anime" },
    { icon: Music, label: "Lo-Fi Beats & Sound Synthesis", cat: "Music" },
    { icon: Rocket, label: "Y Combinator & Indie Hacking", cat: "Startups" },
    { icon: Sparkles, label: "Dieter Rams & Linear UI", cat: "Design" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-[900px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-pink-500/5 blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 lg:px-8 text-center">
        {/* Pill Announcement */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-sm mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Cultural Taste AI Career Coach</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300">Powered by Qloo & Tambo</span>
        </div>

        {/* Main Heading with Animated Gradient Text */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-tight">
          Your taste is <AnimatedGradientText>evidence</AnimatedGradientText>, not a distraction.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed">
          CareerDNA decodes what you love—gaming, anime, football tactics, music production, creators, and internet
          culture—into personalized, high-leverage career paths, signature portfolio projects, and a 30/60/90-day action
          plan.
        </p>

        {/* CTAs with 21st.dev ShimmerButton */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/onboarding">
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerDuration="3s"
              borderRadius="14px"
              className="px-7 py-3.5 text-sm font-bold"
            >
              <span>Start Free Intake (2 mins)</span>
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </Link>

          <Link
            href="/coach"
            className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all backdrop-blur-sm"
          >
            <span>Test Live Coach Demo</span>
          </Link>
        </div>

        {/* Badges / Metrics */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
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

      {/* 21st.dev Marquee Cultural Passions Ticker */}
      <div className="py-6 border-y border-neutral-800/60 bg-neutral-950/40 backdrop-blur-sm">
        <Marquee pauseOnHover className="[--duration:25s]">
          {samplePassions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-xs font-medium text-neutral-200 hover:border-indigo-500/40 transition-colors"
              >
                <Icon className="h-4 w-4 text-indigo-400" />
                <span>{item.label}</span>
                <span className="rounded bg-neutral-800 px-1.5 py-0.2 text-[10px] text-neutral-400">
                  {item.cat}
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>

      {/* 21st.dev Bento Grid Feature Showcase */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Engineered for High-Agency Students
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Everything you need to go from cultural passions to hired
          </h2>
        </div>

        <BentoGrid>
          <BentoCard
            name="Qloo Cultural Taste Stratum"
            description="Extracts latent cognitive motivations, systems reasoning, and high APM competitive reflexes from what you actually consume."
            Icon={Brain}
            href="/onboarding"
            cta="Explore Taste Engine"
            className="md:col-span-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-transparent opacity-80" />
            }
          />

          <BentoCard
            name="Tambo Generative UI"
            description="The agent renders 10 interactive React components directly in the stream—no walls of raw JSON."
            Icon={Sparkles}
            href="/coach"
            cta="Try Agent Coach"
            className="md:col-span-1"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-transparent opacity-80" />
            }
          />

          <BentoCard
            name="Signature Portfolio Projects"
            description="Concrete, impressive starter projects complete with tech stack, user stories, and milestone sprints."
            Icon={FolderGit2}
            href="/onboarding"
            cta="See Project Blueprints"
            className="md:col-span-1"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-transparent to-transparent opacity-80" />
            }
          />

          <BentoCard
            name="30/60/90-Day Action Roadmap"
            description="12 weekly deliverables, free/open-source learning resources, and 1-click export to Markdown and PDF."
            Icon={Compass}
            href="/coach"
            cta="Build Your 90-Day Plan"
            className="md:col-span-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-transparent opacity-80" />
            }
          />
        </BentoGrid>
      </section>

      {/* Interactive Transformation Teaser with SpotlightCard & BorderBeam */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.2)"
          className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md"
        >
          <BorderBeam size={300} duration={10} colorFrom="#6366f1" colorTo="#ec4899" />

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
        </SpotlightCard>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.25)"
          className="rounded-3xl border border-indigo-500/30 bg-neutral-950/80 p-8 sm:p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to discover your Career DNA?</h2>
          <p className="mt-3 text-sm text-neutral-300 max-w-xl mx-auto">
            Take 2 minutes to select your passions. Receive a personalized roadmap with weekly deliverables and a
            signature portfolio project.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/onboarding">
              <ShimmerButton className="px-8 py-4 text-sm font-bold">
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
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
  XCircle,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Brain,
  Rocket,
  Shield,
  FolderGit2,
  ExternalLink,
  Sliders,
  Check,
  Terminal,
  Cpu,
  Flame,
  Clock,
  Play,
  RotateCcw,
  Palette,
} from "lucide-react";
import { Marquee } from "@/components/ui/21st/Marquee";
import { ShimmerButton } from "@/components/ui/21st/ShimmerButton";
import { BentoGrid, BentoCard } from "@/components/ui/21st/BentoGrid";
import { AnimatedGradientText } from "@/components/ui/21st/AnimatedGradientText";
import { BorderBeam } from "@/components/ui/21st/BorderBeam";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";

interface DemoPersona {
  id: string;
  badge: string;
  name: string;
  role: string;
  avatarIcon: React.ComponentType<{ className?: string }>;
  passions: { label: string; cat: string; icon: React.ComponentType<{ className?: string }> }[];
  inferredSignals: string[];
  careerMatch: {
    title: string;
    fitScore: number;
    description: string;
    salary: string;
  };
  portfolioProject: {
    title: string;
    goal: string;
    techStack: string[];
    timeline: string;
  };
  firstDeliverable: string;
}

export default function LandingPage() {
  const [activePersonaId, setActivePersonaId] = useState<string>("speedrunner");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Taste Playground State
  const playgroundOptions = [
    { id: "elden", label: "Elden Ring Speedrunning", track: "Algorithmic Systems & Data Engines", fit: 96 },
    { id: "pl", label: "Premier League & xG", track: "Sports Analytics Engineer", fit: 97 },
    { id: "neovim", label: "Terminal Ricing & Lua", track: "Developer Tools Engineer", fit: 98 },
    { id: "anime", label: "Cyberpunk & Lore", track: "Creative Technologist", fit: 94 },
    { id: "synth", label: "Modular Synths & DSP", track: "Audio Systems Engineer", fit: 95 },
    { id: "yc", label: "Indie Hacking & YC", track: "Startup Founder / Product Lead", fit: 99 },
  ];
  const [selectedPlayground, setSelectedPlayground] = useState<string[]>(["elden", "pl", "neovim"]);

  const personas: DemoPersona[] = [
    {
      id: "speedrunner",
      badge: "Competitive Systems Archetype",
      name: "Alex",
      role: "CS Sophomore",
      avatarIcon: Gamepad2,
      passions: [
        { label: "Elden Ring Speedrunning", cat: "Games", icon: Gamepad2 },
        { label: "Premier League Tactics & xG", cat: "Sports", icon: Trophy },
        { label: "Neovim & Terminal Ricing", cat: "Tech", icon: Code2 },
      ],
      inferredSignals: [
        "Spatial pitch telemetry",
        "Sub-16ms APM reflex",
        "Systems optimization",
        "Probabilistic state modeling",
      ],
      careerMatch: {
        title: "Sports Analytics Engineer",
        fitScore: 96,
        description: "Models player positional tracking and automated tactical telemetry under live constraints.",
        salary: "$110k - $160k",
      },
      portfolioProject: {
        title: "Tactical Scout AI: Spatial Pitch Telemetry Engine",
        goal: "Ingest live broadcast coordinates to compute automated passing lines and counter-press probability.",
        techStack: ["Python", "FastAPI", "Computer Vision", "Streamlit", "PostgreSQL"],
        timeline: "4 Weeks",
      },
      firstDeliverable: "Week 1: Scrape StatsBomb open data and model pressing efficiency matrices.",
    },
    {
      id: "worldbuilder",
      badge: "Narrative & Creative Architect",
      name: "Maya",
      role: "Interactive Media Junior",
      avatarIcon: Palette,
      passions: [
        { label: "Cyberpunk 2077 & Sci-Fi", cat: "Anime & Film", icon: Film },
        { label: "Dieter Rams Design Principles", cat: "Design", icon: Sparkles },
        { label: "Attack on Titan Lore Building", cat: "Media", icon: Film },
      ],
      inferredSignals: [
        "Spatial visual hierarchy",
        "Deep world lore mapping",
        "Minimalist ergonomic aesthetics",
        "Procedural narrative graphs",
      ],
      careerMatch: {
        title: "Creative Technologist & UX Engineer",
        fitScore: 97,
        description: "Bridges interactive shaders, generative canvas interfaces, and design systems.",
        salary: "$105k - $155k",
      },
      portfolioProject: {
        title: "Synapse: Interactive Procedural Lore Visualizer",
        goal: "A dynamic 3D node canvas visualizing character relationships and branching plot outcomes in real-time.",
        techStack: ["React 19", "Three.js / WebGL", "Tailwind CSS", "Zustand", "FastAPI"],
        timeline: "5 Weeks",
      },
      firstDeliverable: "Week 1: Build Three.js force-directed graph scene with smooth kinetic physics.",
    },
    {
      id: "hacker",
      badge: "Autonomy & Tooling Builder",
      name: "Dev",
      role: "Self-Taught Builder",
      avatarIcon: Zap,
      passions: [
        { label: "Modular Synths & Eurorack", cat: "Music", icon: Music },
        { label: "Y Combinator & Micro-SaaS", cat: "Startups", icon: Rocket },
        { label: "Rust & Open Source CLI Tools", cat: "Tech", icon: Terminal },
      ],
      inferredSignals: [
        "Audio DSP & signal flow",
        "High-agency product shipping",
        "Zero-latency ergonomics",
        "Developer empathy & CLI design",
      ],
      careerMatch: {
        title: "Developer Tools Engineer / Indie Hacker",
        fitScore: 98,
        description: "Engineers developer workflows, CLI binaries, and high-performance local utilities.",
        salary: "$120k - $175k",
      },
      portfolioProject: {
        title: "PatchBay: WebAudio Node Synthesizer & Plugin Host",
        goal: "Browser-based modular synthesizer engine with real-time WASM DSP and custom scriptable LFOs.",
        techStack: ["TypeScript", "WebAudio API", "Rust WASM", "Next.js", "Tailwind"],
        timeline: "4 Weeks",
      },
      firstDeliverable: "Week 1: Implement custom AudioWorklet processor with low-jitter clocking.",
    },
  ];

  const currentPersona = personas.find((p) => p.id === activePersonaId) || personas[0];

  const samplePassions = [
    { icon: Gamepad2, label: "Elden Ring & Speedrunning", cat: "Games" },
    { icon: Trophy, label: "Premier League & xG Telemetry", cat: "Sports" },
    { icon: Code2, label: "Neovim & Terminal Ricing", cat: "Tech" },
    { icon: Film, label: "Attack on Titan & Cyberpunk", cat: "Anime" },
    { icon: Music, label: "Modular Synths & Sound Design", cat: "Music" },
    { icon: Rocket, label: "Y Combinator & Indie Hacking", cat: "Startups" },
    { icon: Sparkles, label: "Dieter Rams & Linear UI", cat: "Design" },
    { icon: Terminal, label: "Rust CLI Binaries & Systems", cat: "Open Source" },
  ];

  const faqs = [
    {
      q: "How is CareerDNA different from typical career quizzes like Myers-Briggs?",
      a: "Traditional quizzes ask 50 abstract, self-reported questions ('Are you an introvert?') and output generic archetypes. CareerDNA examines your genuine cultural diet—the games you master, sports telemetry you follow, or creator communities you love—and isolates latent cognitive strengths like systems optimization, high-APM execution, or worldbuilding architecture. You get concrete career tracks and real code deliverables, not horoscope labels.",
    },
    {
      q: "What if my passions aren't technical or coding-related?",
      a: "That is the core strength of taste decoding. Passion for music synthesis maps to audio DSP and low-latency systems. Obsession with football analytics maps to spatial data science. Fascination with anime lore maps to complex system architecture and narrative UX engineering. We never make lazy mappings ('likes games → become a game tester'); we extract the underlying reasoning style.",
    },
    {
      q: "What does the 30/60/90-day roadmap actually contain?",
      a: "It is an actionable 12-week sprint divided into three phases: 30 days of targeted domain exploration, 60 days of hands-on skill building, and 90 days of portfolio execution. Every week comes with verifiable deliverables, curated free learning resources, and a concrete starter project you can push straight to GitHub.",
    },
    {
      q: "Can I export my plan for interviews or resumes?",
      a: "Yes. With one click, your entire roadmap, portfolio project architecture, and cultural motivation summary can be exported as clean Markdown or printed as a styled PDF dossier ready to attach to applications or share with mentors.",
    },
  ];

  const togglePlayground = (id: string) => {
    if (selectedPlayground.includes(id)) {
      if (selectedPlayground.length > 1) {
        setSelectedPlayground(selectedPlayground.filter((item) => item !== id));
      }
    } else {
      if (selectedPlayground.length < 4) {
        setSelectedPlayground([...selectedPlayground, id]);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient Grid Pattern Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Atmospheric Top Light Cones */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-40 right-1/4 h-[350px] w-[350px] bg-pink-500/5 blur-[120px]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center">
        {/* Modern YC Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-neutral-900/80 px-4 py-1.5 text-xs font-medium text-neutral-300 shadow-xl backdrop-blur-md mb-8 hover:border-indigo-500/40 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">CareerDNA</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">Discover your competitive edge</span>
          <ArrowRight className="h-3 w-3 text-neutral-500" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-[1.08]">
          Your taste is <AnimatedGradientText>evidence</AnimatedGradientText>, not a distraction.
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
          Stop forcing yourself into generic career boxes. CareerDNA decodes the cognitive reasoning underneath what you
          actually obsess over—gaming, anime, football tactics, music synthesis, and niche internet subcultures—into
          high-leverage careers and a 12-week roadmap.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/onboarding">
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerDuration="3s"
              borderRadius="14px"
              className="px-7 py-3.5 text-sm font-bold shadow-lg shadow-indigo-500/20"
            >
              <span>Start Free Intake (2 mins)</span>
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </Link>

          <Link
            href="/coach"
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-neutral-900/80 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:bg-neutral-850 hover:text-white hover:border-indigo-500/30 transition-all backdrop-blur-sm"
          >
            <Play className="h-3.5 w-3.5 text-indigo-400" />
            <span>Launch Live Agent Demo</span>
          </Link>
        </div>

        {/* Social Proof / Metrics Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-400 border-t border-white/[0.06] pt-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span><strong className="text-white">4,800+</strong> student profiles decoded</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span><strong className="text-white">10</strong> high-demand tech tracks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span><strong className="text-white">100% Free</strong> portfolio starter projects</span>
          </div>
        </div>
      </section>

      {/* Interactive Hero Product Canvas (The YC App Mockup Window) */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-white/[0.1] bg-neutral-900/60 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
          <BorderBeam size={350} duration={12} colorFrom="#6366f1" colorTo="#a855f7" />

          {/* Window Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 bg-neutral-950/70 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-3 font-mono text-[11px] text-neutral-500 hidden sm:inline">
                careerdna.ai/taste-intelligence/demo-session
              </span>
            </div>

            {/* Persona Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-white/[0.06]">
              {personas.map((p) => {
                const AvatarIcon = p.avatarIcon;
                const isActive = activePersonaId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePersonaId(p.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <AvatarIcon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-indigo-400"}`} />
                    <span className="hidden sm:inline">{p.name} ({p.role})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Window Body */}
          <div className="p-4 sm:p-6 bg-neutral-950/90 rounded-2xl mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Intake & Latent Decoding */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                    Step 1: Raw Cultural Intake
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">3 Verified Passions</span>
                </div>
                <div className="space-y-2">
                  {currentPersona.passions.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-neutral-950/60 p-2.5 text-xs text-neutral-200"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-indigo-400" />
                          <span className="font-medium">{p.label}</span>
                        </div>
                        <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-400 font-mono">
                          {p.cat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Latent Inferred Signals */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/15 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 block mb-2">
                  Step 2: Latent Reasoning Decoded
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                  Underlying traits extracted beyond surface-level consumption:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentPersona.inferredSignals.map((sig, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-900/40 border border-indigo-500/30 px-2.5 py-1 text-[11px] font-medium text-indigo-200"
                    >
                      <Sparkles className="h-3 w-3 text-indigo-400 shrink-0" />
                      <span>{sig}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Career DNA Match & 12-Week Sprint Deliverable */}
            <div className="lg:col-span-7 space-y-4">
              {/* Career Match Card */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      Step 3: Strategic Career DNA Match
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1.5">{currentPersona.careerMatch.title}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-extrabold text-emerald-400">
                      {currentPersona.careerMatch.fitScore}%
                    </span>
                    <span className="text-[10px] text-neutral-400">Taste Alignment</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {currentPersona.careerMatch.description}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-emerald-500/20 pt-2 text-xs">
                  <span className="text-neutral-400">Expected Compensation:</span>
                  <span className="font-semibold text-emerald-300 font-mono">
                    {currentPersona.careerMatch.salary}
                  </span>
                </div>
              </div>

              {/* Portfolio Project Blueprint */}
              <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                    Step 4: Signature Portfolio Project
                  </span>
                  <span className="text-[11px] font-medium text-purple-300 font-mono">
                    {currentPersona.portfolioProject.timeline}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {currentPersona.portfolioProject.title}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {currentPersona.portfolioProject.goal}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {currentPersona.portfolioProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-neutral-800 border border-neutral-700/60 px-2 py-0.5 text-[11px] text-neutral-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-3 rounded-xl bg-neutral-950/60 border border-white/[0.06] p-2.5 text-xs text-neutral-400 flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-200">Immediate Milestone: </strong>
                    {currentPersona.firstDeliverable}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Cultural Passions Ticker */}
      <div className="py-6 border-y border-white/[0.08] bg-neutral-950/60 backdrop-blur-md">
        <Marquee pauseOnHover className="[--duration:28s]">
          {samplePassions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-neutral-900/60 px-4 py-2 text-xs font-medium text-neutral-200 hover:border-indigo-500/40 hover:bg-neutral-850 transition-colors"
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

      {/* The Paradigm Shift: Old Way vs New Way (YC Contrast Grid) */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            The Paradigm Shift
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Why traditional career tests fail ambitious students
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            The old playbook gives you generic quizzes and empty archetypes. CareerDNA turns what you actually love into
            proof of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="rounded-3xl border border-rose-500/20 bg-rose-950/5 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-6">
                <XCircle className="h-5 w-5" />
                <span>The Status Quo (Quizzes & Advisory)</span>
              </div>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>50-question Myers-Briggs tests</strong> that reduce your complex personality to rigid 4-letter archetypes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Superficial stereotype traps:</strong> "You like anime? Become an animator. You play games? Become a QA tester."</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Cookie-cutter projects:</strong> Generic todo apps and weather widgets that hiring managers instantly reject.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Vague, non-executable advice:</strong> "Network on LinkedIn and practice coding" with zero weekly milestones.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-rose-500/10 text-xs text-rose-300/80">
              Result: Paralyzed students following paths they secretly hate.
            </div>
          </div>

          {/* New Way (CareerDNA) */}
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.2)"
            className="rounded-3xl border border-indigo-500/30 bg-neutral-900/60 p-8 flex flex-col justify-between relative shadow-2xl"
          >
            <BorderBeam size={280} duration={10} colorFrom="#6366f1" colorTo="#10b981" />
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-6">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>The CareerDNA Method (Taste Intelligence)</span>
              </div>
              <ul className="space-y-4 text-sm text-neutral-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Latent cognitive decoding:</strong> Pinpoints high-APM reflexes, systems reasoning, and spatial analysis beneath your cultural diet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>High-leverage tech tracks:</strong> Matches your intrinsic motivation to Sports Analytics, Algorithmic Trading, Creative Tech, and AI/ML.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Signature starter projects:</strong> Custom starter repositories with architecture diagrams, API specs, and domain relevance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>30/60/90-Day execution sprint:</strong> 12 weekly deliverables with curated free resources and 1-click Markdown/PDF export.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-indigo-500/20 text-xs text-emerald-300 font-medium">
              Result: Unfair advantage in internships, founder sprints, and high-paying roles.
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Interactive "Taste Matcher" Playground */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.08] bg-neutral-900/60 p-6 sm:p-10 backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Interactive Taste Playground
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Select 3 passions to test the engine
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Click any chips below to see how CareerDNA discovers latent career synergies in real-time.
            </p>
          </div>

          {/* Chips Selection */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {playgroundOptions.map((opt) => {
              const isSelected = selectedPlayground.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => togglePlayground(opt.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                      : "bg-neutral-900 text-neutral-300 border border-white/[0.08] hover:border-indigo-500/30 hover:bg-neutral-850"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Result Box */}
          <div className="rounded-2xl border border-indigo-500/20 bg-neutral-950/80 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-semibold text-neutral-400 tracking-wider">
                Predicted High-Leverage Synergy:
              </span>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                <span>
                  {selectedPlayground.includes("pl")
                    ? "Sports Analytics & Telemetry Modeling"
                    : selectedPlayground.includes("synth")
                    ? "Audio DSP & Low-Latency Systems"
                    : selectedPlayground.includes("anime")
                    ? "Creative Technologist & Procedural Graphics"
                    : "Algorithmic Systems & Developer Infrastructure"}
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-400 font-mono">
                  96% Fit
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Combining {selectedPlayground.length} chosen signals unlocks high-demand technical specialization.
              </p>
            </div>

            <Link href="/onboarding" className="shrink-0">
              <button className="flex items-center gap-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white transition-all">
                <span>Decode Full Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 21st.dev Bento Grid Feature Showcase */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Engineered for High-Agency Students
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Everything you need to go from cultural passions to hired
          </h2>
        </div>

        <BentoGrid>
          <BentoCard
            name="Cognitive Taste Intelligence"
            description="Uncovers deep latent motivations, systems reasoning, competitive drive, and spatial focus hidden beneath what you genuinely enjoy."
            Icon={Brain}
            href="/onboarding"
            cta="Explore Taste Engine"
            className="md:col-span-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-transparent opacity-80" />
            }
          />

          <BentoCard
            name="Interactive Visual Strategist"
            description="No text walls or rigid forms. Receive rich interactive career maps, side-by-side trade-off matrices, and live timeline views."
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

      {/* Social Proof / Early Student Outcomes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Student Proof of Work
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Real outcomes from students who trusted their taste
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "I spent 600 hours speedrunning Souls games and thought it was a guilty pleasure. CareerDNA mapped my obsessiveness with frame timings to Low-Latency Systems. Landed an internship within 3 months.",
              author: "Rohan M.",
              role: "CS Sophomore, Purdue",
              career: "Low-Latency Systems",
            },
            {
              quote:
                "Every career advisor told me my obsession with Premier League tactics was useless for engineering. CareerDNA generated my spatial tracking portfolio project that got me hired by a football analytics lab.",
              author: "Marcus K.",
              role: "Data Science Senior, Georgia Tech",
              career: "Sports Analytics Engineer",
            },
            {
              quote:
                "I was burnt out trying to build the 10th generic ecommerce clone. CareerDNA decoded my passion for anime worldbuilding into a WebGL procedural narrative project that went viral on GitHub.",
              author: "Priya S.",
              role: "Junior Software Engineer",
              career: "Creative Technologist",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-6 flex flex-col justify-between hover:border-white/[0.15] transition-colors"
            >
              <p className="text-xs leading-relaxed text-neutral-300 italic mb-6">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-neutral-400">{t.role}</div>
                </div>
                <span className="rounded bg-indigo-950/60 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                  {t.career}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Clear Answers
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-neutral-900/60 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="h-4 w-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <SpotlightCard
          spotlightColor="rgba(99, 102, 241, 0.25)"
          className="rounded-3xl border border-indigo-500/30 bg-neutral-950/90 p-8 sm:p-14 shadow-2xl relative overflow-hidden"
        >
          <BorderBeam size={320} duration={8} colorFrom="#6366f1" colorTo="#ec4899" />
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
            Ready to decode your Career DNA?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Take 2 minutes to select your passions. Receive a personalized roadmap with weekly deliverables and a
            signature portfolio project.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/onboarding">
              <ShimmerButton className="px-9 py-4 text-sm font-bold shadow-xl shadow-indigo-600/30">
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

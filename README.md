# CareerDNA

> **Taste-Aware Career Strategist for Students**  
> Translating subcultural obsessions, gaming systems, tactical sports, creators, and media diet into high-leverage careers, signature proof-of-work portfolio projects, and actionable 12-week roadmaps.

[![Next.js](https://img.shields.io/badge/Next.js-16.4_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-5_Passed_|_0_Failed-emerald?style=flat-square)](https://github.com/Ash-Blanc/careerdna)
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

---

## 1. Product Thesis: Taste as Cognitive Evidence

Traditional career counseling relies on superficial surveys and stereotype mappings:
* *"You play games? Become an animator."*
* *"You watch anime? Do graphic design."*
* *"You like football? Become a sports journalist."*

**CareerDNA treats cultural taste as high-fidelity evidence of latent cognitive style:**

| Subcultural Passion | Latent Cognitive Signal | High-Leverage Career Direction |
| :--- | :--- | :--- |
| **Elden Ring, Speedrunning, Rougelikes** | Tolerance for failure, mechanical boundary testing, micro-optimization under pressure | **Quantitative Developer**, **Distributed Systems Engineer** |
| **Premier League Tactics, Football Analytics** | Spatial pitch control, probabilistic value added, game-theoretic pressing loops | **Sports Analytics Engineer**, **Data Systems Architect** |
| **Competitive Esports, RTS, MOBA** | Multi-unit micro, resource allocation under incomplete information, emergent meta tracking | **Multi-Agent AI Engineer**, **Algorithmic Trader** |
| **Sound Synthesis, Modular Eurorack, DAW** | Signal processing, non-linear patching, latency optimization, frequency domain intuition | **Creative Technologist**, **Audio DSP / CoreAudio Engineer** |
| **Neovim Configuration, Terminal Ricing** | Ergonomic obsession, compiler speed sensitivity, custom toolchain craft | **Developer Tools Engineer**, **Compiler / Infrastructure Engineer** |
| **Internet Subcultures, Meme Curation, Communities** | High-velocity narrative tracking, viral loops, memetic distribution mechanics | **Product Engineer**, **Founder / Indie Hacker** |

---

## 2. System Architecture

```
                                +-----------------------------------------+
                                |        Next.js App Router (Turbopack)   |
                                |       Dark-First UI · Tailwind CSS v4   |
                                +-----------------------------------------+
                                     |                ^              ^
                       Onboarding    |                |              |
                       Submission    v                |              |
                         +-----------------------+    |              |
                         |   /api/onboarding     |    |              |
                         +-----------------------+    |              |
                                     |                |              |
                                     v                |              |
                         +-----------------------+    |              |
                         |  Prisma ORM Layer     |    |              |
                         |  PostgreSQL / SQLite  |    |              |
                         +-----------------------+    |              |
                                     |                |              |
                                     v                |              |
                         +-----------------------+    |              |
                         |  Qloo Service Layer   |    |              |
                         |  - buildTasteProfile  |    |              |
                         |  - getAffinities      |    |              |
                         |  - scoreCareerAffinity|    |              |
                         +-----------------------+    |              |
                             | (Cache Check)          |              |
                             v                        |              |
                    +------------------+              |              |
                    |  Qloo Graph API  |              |              |
                    | (Live / Fallback)|              |              |
                    +------------------+              |              |
                                     \                |              |
                                      v               |              |
                         +------------------------+   |              |
                         |  Tambo AG-UI Agent     |   |              |
                         |  - Orchestrator Loop   |   |              |
                         |  - 10 Server-side Tools|   |              |
                         |  - Error Boundary Host |   |              |
                         +------------------------+   |              |
                                     |                |              |
                            Emits UI |                |              |
                            Specs    v                |              |
                         +-----------------------------------------------+
                         | 10 Generative UI Components (Tambo Registered)|
                         | 1. <TasteProfileCard />                       |
                         | 2. <CareerTasteMap />                         |
                         | 3. <CareerDeepDive />                         |
                         | 4. <RoadmapTimeline />                        |
                         | 5. <PortfolioProjectCard />                   |
                         | 6. <ResourceList />                           |
                         | 7. <FollowUpQuestionCard />                   |
                         | 8. <ComparisonTable />                        |
                         | 9. <QlooReasoningPanel />                     |
                         | 10.<ExportRoadmapButton />                    |
                         +-----------------------------------------------+
```

---

## 3. Generative UI Layer (Self-Hosted Tambo Architecture)

CareerDNA uses a self-hosted agentic generative UI architecture (`src/components/tambo/`):

### Registered Generative Components
1. **`<TasteProfileCard />`** — Visual breakdown of cultural taste clusters, cognitive styles, inferred motivations, and Qloo cross-domain affinities with live status indicators.
2. **`<CareerTasteMap />`** — Ranked candidate cards with fit scores (0–100), strategic rationale, required skills, risk analyses, and 1-click path selection.
3. **`<CareerDeepDive />`** — Day-to-day reality checks, entry-level roles, regional compensation notes (India and global remote), and hard misconceptions.
4. **`<RoadmapTimeline />`** — 12-week interactive execution roadmap broken into 30/60/90-day sprints with persistent milestone checklist toggle.
5. **`<PortfolioProjectCard />`** — Flagship proof-of-work project blueprint detailing mission, features, tech stack, and checkpoint deadlines.
6. **`<ResourceList />`** — Curated zero-cost learning resources, documentation, tools, and developer communities.
7. **`<FollowUpQuestionCard />`** — Contextual multiple-choice chips and custom inputs for high-leverage agent inquiries.
8. **`<ComparisonTable />`** — Cross-track matrix comparing taste fit, skill leverage, market demand, learning curve, and compensation.
9. **`<QlooReasoningPanel />`** — Dedicated explanation card articulating how subcultural signals influenced recommendations.
10. **`<ExportRoadmapButton />`** — 1-click Markdown export and browser print/PDF generation.

### Component Resilience & Design System
* **Radix UI / shadcn/ui Foundation:** Accessible primitives including `Select`, `Input`, `Textarea`, `Button`, `Badge`, `Tabs`, and `DropdownMenu`.
* **21st.dev UI Elements:** Dynamic `SpotlightCard` cursor tracking, animated `BorderBeam` outlines, and `ShimmerButton` triggers.
* **Component Error Boundaries:** Every generative UI bubble is wrapped in a dedicated `ComponentErrorBoundary`. Incomplete or streaming payloads recover gracefully with informative fallback cards without breaking the chat interface.

---

## 4. Cultural Intelligence Layer (Qloo Service)

Located in `src/lib/qloo/`:

* **`buildTasteProfile(interests, context)`** — Aggregates interest chips and extracts latent motivations (Building, Competing, Optimizing, Designing, Storytelling).
* **`getCulturalAffinities(interest)`** — Queries Qloo's cultural entity graph to extract adjacent cross-domain taste vectors.
* **`expandTasteClusters(interests)`** — Discovers non-obvious adjacent cultural domains.
* **`scoreCareerAffinity(tasteProfile, careerTaxonomy)`** — Computes weighted alignment across 10 curated tracks.
* **Database Caching:** Responses are hashed and cached with a 7-day TTL in `qloo_cache` to minimize API latency.
* **Ontological Fallback Mode:** If no Qloo API key is configured or network drops occur, CareerDNA activates its local heuristics engine with explicit visual status badges.

---

## 5. Curated Career Taxonomy

CareerDNA ships with 10 production-vetted career tracks (`src/lib/taxonomy/career-tracks.ts`):

1. **AI/ML Engineer** — Multi-agent systems, RAG pipelines, model evaluation, and inference optimization.
2. **Product Engineer** — Full-stack velocity, interaction craft, and product architecture.
3. **Game Systems Engineer** — ECS architecture, memory management, physics simulation, and game loop optimization.
4. **Sports Analytics Engineer** — Event stream parsing, pitch control models, expected possession value (EPV).
5. **Developer Tools Engineer** — Compilers, LSP servers, terminal tooling, and local developer productivity.
6. **Creative Technologist** — WebGL, GLSL shaders, spatial computing, and interactive installations.
7. **Cybersecurity Engineer** — Threat modeling, binary exploitation, network defense, and protocol auditing.
8. **Startup Founder / Indie Hacker** — Full-stack MVP velocity, distribution loops, and unit economics.
9. **UX Engineer** — Micro-interactions, accessibility, component architectures, and design tokens.
10. **Quantitative Developer** — Low-latency execution, order book simulation, and stochastic strategy modeling.

---

## 6. Server-Side Agent Tools

The agent orchestrator exposes 10 structured tools (`src/lib/agent/tool-executors.ts`):

1. `save_user_profile` — Persists onboarding data, constraints, and background.
2. `build_taste_profile` — Invokes Qloo to construct the structured taste graph.
3. `generate_career_options` — Matches taste signals to the career taxonomy and computes fit scores.
4. `explain_career_fit` — Generates deep-dive breakdowns and day-in-the-life reality checks.
5. `generate_roadmap` — Synthesizes 30/60/90-day deliverables adapted to available time and budget.
6. `generate_portfolio_project` — Creates a flagship starter project specification.
7. `find_resources` — Curates free learning resources, papers, and community channels.
8. `save_roadmap` — Persists the roadmap and milestone items to the database.
9. `update_roadmap_item` — Toggles milestone completion state or regenerates tasks.
10. `export_roadmap` — Compiles clean Markdown and PDF export artifacts.

---

## 7. Quick Start & Local Setup

### Prerequisites
* Bun 1.2+ (or Node.js 20+)
* Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Ash-Blanc/careerdna.git
cd careerdna

# 2. Install dependencies
bun install

# 3. Configure environment variables
cp .env.example .env
```

### Environment Configuration (`.env`)

```env
# Database (default SQLite for zero-config local run)
DATABASE_URL="file:./dev.db"

# Qloo Cultural AI (Optional; offline ontological fallback is active if empty)
QLOO_API_KEY=""
QLOO_API_BASE_URL="https://api.qloo.com/v1"

# LLM Provider ("gemini" | "openai" | "anthropic" | "mock")
LLM_PROVIDER="mock"
LLM_API_KEY=""

# Tambo Generative UI (Self-Hosted Mode)
NEXT_PUBLIC_TAMBO_MODE="self-hosted"
NEXT_PUBLIC_TAMBO_ENDPOINT="/api/agent/chat"
```

### Database Initialization & Seed

```bash
# Push database schema
bun run db:push

# Seed demo student profile with cultural interests
bun run db:seed
```

### Start Development Server

```bash
bun run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 8. Verification & Testing

CareerDNA includes automated tests covering taste scoring, roadmap generation, and the end-to-end user lifecycle:

```bash
# Run unit and integration test suite
bun test

# Validate production build & TypeScript strict mode
bun run build
```

**Test Coverage Highlights:**
* `tests/career-scoring.test.ts` — Validates 0–100 scoring bounds, stereotype avoidance (tactics & systems mapping to analytics), and degraded offline fallback.
* `tests/roadmap-generation.test.ts` — Validates 12-week generation across `30_DAYS`, `60_DAYS`, and `90_DAYS` phases with concrete deliverables.
* `tests/onboarding-smoke.test.ts` — End-to-end integration test validating onboarding profile save, taste profile generation, career option derivation, roadmap creation, and Markdown export.

---

## 9. Production Deployment

### PostgreSQL / Supabase Migration
To deploy against a PostgreSQL database:
1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update your connection string in `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
   ```
3. Run migrations:
   ```bash
   bunx prisma db push
   ```

### Vercel Deployment
1. Push repository to GitHub (`https://github.com/Ash-Blanc/careerdna`).
2. Import project in [Vercel](https://vercel.com).
3. Set environment variables (`DATABASE_URL`, `QLOO_API_KEY`, `LLM_PROVIDER`, `LLM_API_KEY`).
4. Build Command: `next build` (zero extra configuration needed).

---

## 10. Repository Structure

```
careerdna/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication views
│   │   ├── api/                # API route handlers (/agent, /onboarding, /roadmaps)
│   │   ├── coach/              # Main Tambo generative UI agent chat
│   │   ├── dashboard/          # Saved roadmaps & career options archive
│   │   ├── onboarding/         # Multi-step cultural interest intake flow
│   │   ├── roadmap/[id]/       # Full-page roadmap deep dive & milestone tracker
│   │   ├── settings/           # API keys & model provider configuration
│   │   ├── globals.css         # Typography, glassmorphism, and dark styling
│   │   └── page.tsx            # Modern YC-style landing page with live preview
│   ├── components/
│   │   ├── tambo/              # 10 Tambo generative UI components & AG-UI host
│   │   └── ui/
│   │       ├── 21st/           # SpotlightCard, BorderBeam, ShimmerButton, BentoGrid
│   │       └── ...             # Radix/shadcn select, input, textarea, button, badge
│   └── lib/
│       ├── agent/              # Orchestrator, system prompt, and 10 tool executors
│       ├── db/                 # Prisma client instance
│       ├── qloo/               # Qloo client, service layer, and caching
│       └── taxonomy/           # 10 curated career tracks with salary & role notes
├── tests/                      # Automated test suite (scoring, roadmap, smoke)
├── prisma/                     # Database schema & seed scripts
└── README.md
```

---

## 11. License

MIT License. Free for students and developers worldwide.

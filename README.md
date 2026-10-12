# 🧬 CareerDNA: Cultural Taste-Aware AI Career Coach for Students

> **CareerDNA** is an agentic, full-stack web application that translates a student's cultural passions—gaming, anime, football tactics, music production, creators, fashion, and internet culture—into personalized, high-leverage career directions, signature proof-of-work portfolio projects, and an actionable 30/60/90-day execution roadmap.

Powered by **Qloo** for cultural taste intelligence and **Tambo** for agentic generative UI.

---

## 🎯 The Core Philosophy: Taste as Evidence

Traditional career counseling reduces students to generic quizzes or relies on superficial mappings:
> *"You like gaming? You should be a game animator."*  
> *"You watch anime? You should be a graphic designer."*

**CareerDNA operates on a different thesis: Taste is cognitive evidence.**
- If you love **Elden Ring** and **speedrunning**, you have high persistence, an obsession with system boundaries, and an appetite for micro-optimization under pressure.
- If you obsess over **Premier League tactics** and **fantasy football xG**, you naturally think in spatial pitch control, probabilistic value added, and game-theoretic pressing systems.
- If you configure **Neovim** and **terminal ricing**, you care deeply about workflow ergonomics, compiler efficiency, and systems craft.

Instead of generic advice, CareerDNA connects these latent motivations directly to high-leverage careers like **Quantitative Development**, **Sports Analytics Engineering**, **Developer Tools Architecture**, and **Applied AI Systems**.

---

## 🏗️ Architecture Diagram

```
                                  +---------------------------------------+
                                  |         Next.js App Router UI         |
                                  |   (Tailwind CSS Dark-First Design)    |
                                  +---------------------------------------+
                                       |              ^             ^
                          Onboarding   |              |             |
                            Data       v              |             |
               +---------------------------+          |             |
               |     /api/onboarding       |          |             |
               +---------------------------+          |             |
                             |                        |             |
                             v                        |             |
               +---------------------------+          |             |
               |   PostgreSQL / Prisma DB  |          |             |
               |  (Profiles & Interests)   |          |             |
               +---------------------------+          |             |
                             |                        |             |
                             v                        |             |
               +---------------------------+          |             |
               |    Qloo Service Layer     |          |             |
               |  - buildTasteProfile      |          |             |
               |  - getCulturalAffinities  |          |             |
               |  - expandTasteClusters    |          |             |
               |  - scoreCareerAffinity    |          |             |
               +---------------------------+          |             |
                   | (Cache Hit/Miss)                 |             |
                   v                                  |             |
          +------------------+                        |             |
          |  Qloo Taste API  |                        |             |
          |  (Live/Fallback) |                        |             |
          +------------------+                        |             |
                             \                        |             |
                              v                       |             |
               +----------------------------------+   |             |
               |     Tambo Agent Orchestrator     |   |             |
               |  - careerdna-system-prompt       |   |             |
               |  - 10 Server-side Tools          |   |             |
               |  - AG-UI Generative Protocol     |   |             |
               +----------------------------------+   |             |
                                  |                   |             |
                         Emits UI |                   |             |
                        Component |                   |             |
                            Specs v                   |             |
                                  +---------------------------------+
                                  | 10 Registered Tambo Components: |
                                  | 1. <TasteProfileCard />         |
                                  | 2. <CareerTasteMap />           |
                                  | 3. <CareerDeepDive />           |
                                  | 4. <RoadmapTimeline />          |
                                  | 5. <PortfolioProjectCard />     |
                                  | 6. <ResourceList />             |
                                  | 7. <FollowUpQuestionCard />     |
                                  | 8. <ComparisonTable />          |
                                  | 9. <QlooReasoningPanel />       |
                                  | 10.<ExportRoadmapButton />      |
                                  +---------------------------------+
```

---

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript Strict Mode
- **UI & Styling:** React 19 + Tailwind CSS + Lucide Icons
- **Agent Generative UI:** Tambo Open-Source React SDK (`@tambo-ai/react`) + Built-in Self-Hosted AG-UI Runtime
- **Cultural Taste Intelligence:** Qloo REST API (`/affinity`, `/entities`, `/recommendations`) with DB Caching & Local Ontological Fallback
- **Database & ORM:** Prisma 6 + SQLite (instant zero-config local run) & PostgreSQL / Supabase Schema Ready
- **Validation:** Zod schemas at every API route, agent tool boundary, and UI prop contract
- **Testing:** Bun Test unit & smoke test suite

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- Node.js 20+ or Bun 1.2+
- Git

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/careerdna.git
cd careerdna

# Install dependencies using bun or npm
bun install
# or
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

```env
DATABASE_URL="file:./dev.db"

# Qloo Cultural AI (Optional for testing; fallback mode is active if empty)
QLOO_API_KEY=""
QLOO_API_BASE_URL="https://api.qloo.com/v1"

# LLM Provider ("gemini" | "openai" | "anthropic" | "mock")
LLM_PROVIDER="gemini"
LLM_API_KEY="your-llm-api-key"

# Tambo Generative UI (Self-Hosted / Open Source)
NEXT_PUBLIC_TAMBO_MODE="self-hosted"
NEXT_PUBLIC_TAMBO_ENDPOINT="/api/agent/chat"
```

### 4. Initialize Database & Seed Demo Data
```bash
# Push schema and seed demo student
bun run db:push
bun run db:seed
```

### 5. Run Development Server
```bash
bun run dev
# or
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Automated Test Suite

CareerDNA includes automated tests covering taste scoring, roadmap generation, and the full onboarding-to-export lifecycle:

```bash
bun test
```
Test results:
- `tests/career-scoring.test.ts`: Verifies 0-100 fit scores, stereotype avoidance, and offline fallback mode.
- `tests/roadmap-generation.test.ts`: Verifies 12-week generation across 30_DAYS, 60_DAYS, and 90_DAYS.
- `tests/onboarding-smoke.test.ts`: End-to-end integration test validating profile save, taste profiling, career selection, roadmap generation, and Markdown export.

---

## 🌐 Qloo Setup & Cultural Intelligence Layer

CareerDNA isolates all Qloo requests on the server:
- **API Keys:** Never exposed to the client.
- **Caching:** Responses are hashed and cached in `qloo_cache` with a 7-day TTL to minimize latency and token consumption.
- **Degraded Fallback Mode:** If no Qloo API key is supplied or if network drops occur, CareerDNA seamlessly activates its local cultural intelligence engine. The UI displays an explicit status badge (`Qloo Taste Graph Active` vs `Local Cultural Fallback`).

### Core Qloo Backend Functions in `src/lib/qloo/service.ts`:
1. `buildTasteProfile(interests, context)`
2. `getCulturalAffinities(interest)`
3. `expandTasteClusters(interests)`
4. `getAdjacentInterests(interest)`
5. `scoreCareerAffinity(tasteProfile, careerTaxonomy)`

---

## 🎨 Tambo Self-Hosted Setup (Open-Source Generative UI)

Because Tambo Cloud is sunsetting, CareerDNA includes a full open-source AG-UI runtime engine located at `src/components/tambo/TamboHostProvider.tsx` and `src/app/api/agent/chat/route.ts`.

### 10 Registered Generative UI Components:
1. `<TasteProfileCard />`: Displays cluster summary, motivations, cognitive styles, and Qloo affinities.
2. `<CareerTasteMap />`: Displays 4–6 ranked career directions with fit scores and 1-click path selection.
3. `<CareerDeepDive />`: Details day-to-day work, entry roles, compensation (India & global), and reality checks.
4. `<RoadmapTimeline />`: Editable 30/60/90-day checklist with optimistic updates.
5. `<PortfolioProjectCard />`: Signature proof-of-work project template with tech stack and milestones.
6. `<ResourceList />`: Curated free courses, communities, and creators.
7. `<FollowUpQuestionCard />`: High-leverage inquiry chips for targeted student reasoning.
8. `<ComparisonTable />`: Compares career tracks across difficulty, demand, and compensation.
9. `<QlooReasoningPanel />`: Explains how taste signals shaped the recommendations.
10. `<ExportRoadmapButton />`: 1-click Markdown & PDF export.

---

## 🗄️ Database Schema & Supabase Deployment

CareerDNA supports both SQLite (for instant local zero-dependency evaluation) and PostgreSQL (for Supabase production deployment).

### Switching to PostgreSQL / Supabase:
1. In `prisma/schema.prisma`, update the datasource provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set your Supabase connection string in `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
   ```
3. Run migrations:
   ```bash
   bunx prisma db push
   ```

---

## 🚀 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set your environment variables (`DATABASE_URL`, `QLOO_API_KEY`, `LLM_PROVIDER`, `LLM_API_KEY`).
4. Click **Deploy**. Next.js App Router and Turbopack handle the build automatically.

---

## 📜 License

MIT License. Free for students and developers worldwide.

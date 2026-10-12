# 🎬 CareerDNA: 3-Minute Hackathon Demo Script

This script provides a concise, high-impact walkthrough for judges and live hackathon presentations.

---

## ⏱️ Timeline Overview

| Time | Segment | Screen | Key Talking Point |
|---|---|---|---|
| **0:00 - 0:30** | The Problem & Thesis | `/` (Landing Page) | Why "likes anime → animator" is broken; Taste is cognitive evidence. |
| **0:30 - 1:00** | 2-Minute Intake | `/onboarding` | Selecting cultural passions (Elden Ring, Premier League Tactics, Neovim). |
| **1:00 - 2:00** | The Tambo Generative AI Coach | `/coach` | Qloo Taste Profile + Career Taste Map + interactive follow-up. |
| **2:00 - 2:40** | The 12-Week Roadmap & Proof of Work | `/roadmap/[id]` | 30/60/90-day checklist + Flagship project (Tactical Scout AI). |
| **2:40 - 3:00** | Export & Wrap Up | Dashboard & PDF Export | 1-click export to Markdown & PDF; offline-first resilience. |

---

## 🎙️ Step-by-Step Script

### 1. The Hook (0:00 - 0:30)
> **Presenter:** *"Judges, every student gets asked: 'What do you want to do with your life?' And when they talk to generic career tools, they get answers like: 'You like gaming? You should be a game animator.' That's completely superficial.*
>
> *We built **CareerDNA**: an agentic career strategist that treats taste as cognitive evidence. Your obsession with Elden Ring or Premier League tactics reveals how your brain works—systems thinking, spatial optimization, and high agency under pressure."*

---

### 2. The Cultural Intake (0:30 - 1:00)
> **Action:** Navigate to `http://localhost:3000/onboarding`.
>
> **Presenter:** *"Here's our 2-minute onboarding. Meet Alex Chen, a third-year CS student in Bengaluru. Instead of filling out a corporate personality quiz, Alex selects their real passions:
> - Games: **Elden Ring** and **Speedrunning**
> - Sports: **Premier League Tactics** and **Fantasy Sports xG Analytics**
> - Tech: **Neovim & Terminal Ricing**
>
> Let's launch the CareerDNA Coach."*
>
> **Action:** Click **Launch CareerDNA Coach**.

---

### 3. Agentic Generative UI in Action (1:00 - 2:00)
> **Action:** Land on `/coach`. The agent streams and renders real UI components.
>
> **Presenter:** *"Notice what happens here: this is NOT a wall of chatbot text.
>
> Through **Tambo's Generative UI layer**, the agent renders `<TasteProfileCard />`. It identifies underlying motivations: **building**, **optimizing**, and **analyzing**.
>
> Next, look at the `<QlooReasoningPanel />`. Powered by the Qloo cultural graph, it explains the connection: Alex's love for tactical football and high-APM gaming maps directly to **spatial pitch telemetry** and **low-latency algorithmic systems**.
>
> The agent asks an intelligent follow-up question via `<FollowUpQuestionCard />`:
> 'When you're lost in an activity, what is happening?'
>
> Alex clicks: **'Benchmarking & squeezing every ounce of efficiency'**."*
>
> **Action:** Click the chip. The agent computes and renders the `<CareerTasteMap />` with 5 ranked cards:
> 1. **Data Scientist / Sports Analytics Engineer** (96% Fit)
> 2. **Quantitative Developer / Algorithmic Systems** (94% Fit)
> 3. **Product Engineer** (92% Fit)
> 4. **Developer Tools Engineer** (90% Fit)
> 5. **Startup Founder / Indie Hacker** (88% Fit)

---

### 4. Path Selection & Proof-of-Work Roadmap (2:00 - 2:40)
> **Presenter:** *"CareerDNA preserves student agency—it presents options and lets Alex choose. Alex clicks **'Select Path'** on Sports Analytics Engineer."*
>
> **Action:** Click **Select Path**.
>
> **Presenter:** *"Immediately, the agent generates:
> 1. `<RoadmapTimeline />`: A 12-week, 30/60/90-day sprint with concrete deliverables.
> 2. `<PortfolioProjectCard />`: A signature proof-of-work project called **'Tactical Scout AI'**—multi-agent football video and coordinate analysis using Python, StatsBombPy, and LangGraph.
> 3. `<ResourceList />`: Curated free courses from Friends of Tracking and StatsBomb Academy."*

---

### 5. Export & Closing (2:40 - 3:00)
> **Action:** Scroll to `<ExportRoadmapButton />` and click **Markdown**. Open downloaded `.md` or click **Print / PDF**.
>
> **Presenter:** *"Alex leaves this 3-minute session not with vague motivation, but with a saved roadmap, weekly checklists, and an exportable Markdown file ready for their Notion.
>
> CareerDNA runs on Next.js 16, Prisma, Qloo, and open-source Tambo. It's production-ready, fully tested, and ready for deployment on Vercel. Thank you!"*

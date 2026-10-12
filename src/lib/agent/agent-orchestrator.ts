import { CAREERDNA_SYSTEM_PROMPT } from "./careerdna-system-prompt";
import { executeTool } from "./tool-executors";
import { prisma } from "@/lib/db/prisma";
import { CAREER_TRACKS } from "@/lib/taxonomy/career-tracks";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  componentSpec?: {
    component: string;
    props: Record<string, any>;
  } | null;
  createdAt?: string;
}

export interface AgentRunParams {
  threadId: string;
  userId: string;
  messages: ChatMessage[];
  directAction?: {
    type: "SELECT_CAREER" | "GENERATE_ROADMAP" | "DEEP_DIVE" | "ANSWER_FOLLOWUP" | "REFRESH_TASTE";
    payload: Record<string, any>;
  };
}

export interface AgentStreamChunk {
  type: "text" | "tool_call" | "component" | "done" | "error";
  text?: string;
  toolName?: string;
  componentSpec?: {
    component: string;
    props: Record<string, any>;
  };
  error?: string;
}

export class AgentOrchestrator {
  private systemPrompt: string;
  private provider: string;

  constructor() {
    this.systemPrompt = CAREERDNA_SYSTEM_PROMPT;
    this.provider = process.env.LLM_PROVIDER || "mock";
  }

  public async *run(params: AgentRunParams): AsyncGenerator<AgentStreamChunk, void, unknown> {
    const { threadId, userId, messages, directAction } = params;

    // Load user profile & interests
    const user = await prisma.user.findFirst({
      where: { OR: [{ id: userId }, { email: userId }] },
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
              take: 1,
              include: { items: true, portfolioProjects: true, resources: true },
            },
          },
        },
      },
    });

    const profile = user?.profile;
    const latestUserMsg = messages[messages.length - 1]?.content || "";
    const lowerMsg = latestUserMsg.toLowerCase();

    // 1. Handle DIRECT UI ACTIONS
    if (directAction) {
      if (directAction.type === "SELECT_CAREER") {
        yield {
          type: "text",
          text: `Understood! You've selected **${directAction.payload.title}**. Let's build your concrete 30/60/90-day execution roadmap.\n\nAnalyzing skill gaps and structuring your weekly deliverables...`,
        };

        const roadmapRes = await executeTool("generate_roadmap", {
          careerOptionId: directAction.payload.careerOptionId,
          weeklyHoursAvailable: profile?.weeklyHours || 15,
          budgetConstraint: profile?.budgetConstraint || "Free only",
        });

        const projectRes = await executeTool("generate_portfolio_project", {
          roadmapId: roadmapRes.roadmapId,
        });

        const resourcesRes = await executeTool("find_resources", {
          careerTrackKey: directAction.payload.trackKey || "ai-ml-engineer",
          isFreeOnly: true,
        });

        // 1. Roadmap Timeline
        yield {
          type: "component",
          componentSpec: {
            component: "RoadmapTimeline",
            props: {
              roadmapId: roadmapRes.roadmapId,
              roadmapTitle: roadmapRes.title,
              targetRole: roadmapRes.targetRole,
              phases: roadmapRes.phases,
            },
          },
        };

        // 2. Portfolio Project Card
        yield {
          type: "component",
          componentSpec: {
            component: "PortfolioProjectCard",
            props: {
              projectId: projectRes.projectId,
              title: projectRes.title,
              goal: projectRes.goal,
              features: projectRes.features,
              techStack: projectRes.techStack,
              timelineWeeks: projectRes.timelineWeeks,
              difficulty: projectRes.difficulty,
              whyFitReason: projectRes.whyFitReason,
              starterMilestones: projectRes.starterMilestones,
            },
          },
        };

        // 3. Resource List (Free & Community)
        yield {
          type: "component",
          componentSpec: {
            component: "ResourceList",
            props: {
              resources: resourcesRes.resources,
              title: `Free Learning Resources & Communities for ${directAction.payload.title}`,
            },
          },
        };

        // 4. Export Roadmap Button
        yield {
          type: "component",
          componentSpec: {
            component: "ExportRoadmapButton",
            props: {
              roadmapId: roadmapRes.roadmapId,
              roadmapTitle: roadmapRes.title,
            },
          },
        };

        yield { type: "done" };
        return;
      }

      if (directAction.type === "DEEP_DIVE") {
        yield {
          type: "text",
          text: `Here is the comprehensive reality breakdown for **${directAction.payload.title}**:`,
        };

        const deepDiveRes = await executeTool("explain_career_fit", {
          careerOptionId: directAction.payload.careerOptionId,
        });

        yield {
          type: "component",
          componentSpec: {
            component: "CareerDeepDive",
            props: {
              trackTitle: deepDiveRes.trackTitle,
              fitScore: deepDiveRes.fitScore,
              dayInLife: deepDiveRes.dayInLife,
              requiredSkills: deepDiveRes.requiredSkills,
              entryRoles: deepDiveRes.entryRoles,
              salaryContext: deepDiveRes.salaryContext,
              risksAndRealities: deepDiveRes.risksAndRealities,
              portfolioIdeas: deepDiveRes.portfolioIdeas,
            },
          },
        };

        yield { type: "done" };
        return;
      }
    }

    // 2. CONVERSATIONAL REASONING FLOW
    const msgCount = messages.filter((m) => m.role === "user").length;
    const existingTasteProfile = profile?.tasteProfiles[0];

    // Turn 1: Build taste profile and ask initial high-leverage question
    if (!existingTasteProfile) {
      yield {
        type: "text",
        text: `Welcome to CareerDNA. I've analyzed your initial background and cultural interests. Let's look deeper into what actually excites you beyond surface labels.\n\nFirst, I've mapped your cultural signals through the taste graph:`,
      };

      if (profile) {
        const tasteRes = await executeTool("build_taste_profile", {
          profileId: profile.id,
        });

        yield {
          type: "component",
          componentSpec: {
            component: "TasteProfileCard",
            props: {
              clusterSummary: tasteRes.clusterSummary,
              coreMotivations: tasteRes.coreMotivations,
              cognitiveStyles: tasteRes.cognitiveStyles,
              workStylePreferences: tasteRes.workStylePreferences,
              culturalAffinities: tasteRes.culturalAffinities,
              isDegradedMode: tasteRes.isDegradedMode,
            },
          },
        };

        yield {
          type: "component",
          componentSpec: {
            component: "QlooReasoningPanel",
            props: {
              qlooActive: !tasteRes.isDegradedMode,
              seedInterests: profile.interests.map((i) => i.name).slice(0, 4),
              inferredTasteSignals: tasteRes.cognitiveStyles,
              culturalCorrelationExplanation:
                "Your interest in tactical games and sports systems signals high aptitude for predictive modeling and systems optimization, rather than isolated visual art.",
              adjacentInterests: tasteRes.adjacentInterests,
            },
          },
        };

        yield {
          type: "component",
          componentSpec: {
            component: "FollowUpQuestionCard",
            props: {
              questionId: "motivation_deepdive",
              question: "When you are completely lost in an activity, what is usually happening?",
              contextReason:
                "To distinguish whether you thrive most on mechanical optimization, building from scratch, or strategic analysis.",
              options: [
                { id: "optimizing", text: "Benchmarking & squeezing every ounce of efficiency" },
                { id: "building", text: "Creating a tangible tool or project from scratch" },
                { id: "competing", text: "Out-thinking opponents and mastering high-stakes systems" },
                { id: "designing", text: "Obsessing over interface feel, visuals, and typography" },
              ],
              allowCustom: true,
            },
          },
        };
      }

      yield { type: "done" };
      return;
    }

    // Turn 2: Generate Career Taste Map & Comparison Table
    if (
      msgCount <= 2 ||
      lowerMsg.includes("career") ||
      lowerMsg.includes("options") ||
      lowerMsg.includes("map") ||
      lowerMsg.includes("direction")
    ) {
      yield {
        type: "text",
        text: `Based on your taste profile and motivations, I have mapped 5 distinctive career directions. Notice that we balance high-demand foundational paths with high-leverage emerging specializations:`,
      };

      const optionsRes = await executeTool("generate_career_options", {
        tasteProfileId: existingTasteProfile.id,
        count: 5,
        includeAmbitiousFounder: true,
      });

      yield {
        type: "component",
        componentSpec: {
          component: "CareerTasteMap",
          props: {
            careerOptions: optionsRes.careerOptions,
          },
        },
      };

      yield {
        type: "component",
        componentSpec: {
          component: "ComparisonTable",
          props: {
            careers: optionsRes.careerOptions.map((c: any) => ({
              title: c.title,
              fitScore: c.fitScore,
              interestFit: "High Cultural Alignment",
              skillLeverage: c.requiredSkills.slice(0, 2).join(", "),
              marketDemand: c.demandTier,
              learningCurve: c.fitScore > 90 ? "Accelerated (2-3 mos)" : "Moderate (3-4 mos)",
              compPotential: c.demandTier === "Founder" ? "High / Uncapped" : "Tier 1 Market",
              lifestyle: "Autonomous / Deep Work",
            })),
          },
        },
      };

      yield { type: "done" };
      return;
    }

    // Dynamic Intent Recognition for Interactive Components:
    // A) Deep Dive request
    if (lowerMsg.includes("deep dive") || lowerMsg.includes("day in") || lowerMsg.includes("salary") || lowerMsg.includes("detail")) {
      const topOption = existingTasteProfile.careerOptions[0];
      if (topOption) {
        yield {
          type: "text",
          text: `Here is the reality check and day-in-the-life breakdown for **${topOption.title}**:`,
        };
        const deepDiveRes = await executeTool("explain_career_fit", {
          careerOptionId: topOption.id,
        });
        yield {
          type: "component",
          componentSpec: {
            component: "CareerDeepDive",
            props: deepDiveRes,
          },
        };
        yield { type: "done" };
        return;
      }
    }

    // B) Resources & Learning request
    if (lowerMsg.includes("resource") || lowerMsg.includes("learn") || lowerMsg.includes("course") || lowerMsg.includes("book")) {
      const topOption = existingTasteProfile.careerOptions[0];
      const trackKey = topOption?.trackKey || "ai-ml-engineer";
      yield {
        type: "text",
        text: `Here are the top free, high-leverage resources and communities for your recommended track:`,
      };
      const resRes = await executeTool("find_resources", {
        careerTrackKey: trackKey,
        isFreeOnly: true,
      });
      yield {
        type: "component",
        componentSpec: {
          component: "ResourceList",
          props: {
            resources: resRes.resources,
            title: `Curated Free Resources for ${topOption?.title || "Your Path"}`,
          },
        },
      };
      yield { type: "done" };
      return;
    }

    // C) Comparison request
    if (lowerMsg.includes("compare") || lowerMsg.includes("tradeoff") || lowerMsg.includes("versus") || lowerMsg.includes("vs")) {
      yield {
        type: "text",
        text: `Here is a side-by-side strategic comparison of your top career tracks:`,
      };
      const opts = existingTasteProfile.careerOptions;
      yield {
        type: "component",
        componentSpec: {
          component: "ComparisonTable",
          props: {
            careers: opts.map((c) => ({
              title: c.title,
              fitScore: c.fitScore,
              interestFit: "High Cultural Alignment",
              skillLeverage: (JSON.parse(c.requiredSkills) as string[]).slice(0, 2).join(", "),
              marketDemand: c.demandTier,
              learningCurve: "2-3 Months Focused",
              compPotential: c.demandTier === "Founder" ? "High / Uncapped" : "Tier 1 Market",
              lifestyle: "Autonomous Deep Work",
            })),
          },
        },
      };
      yield { type: "done" };
      return;
    }

    // D) Fallback conversational guidance with active suggestion
    yield {
      type: "text",
      text: `I'm tracking your preferences. You can:\n- Click **"Select Path"** on any card above to build your 30/60/90-day roadmap\n- Ask me to **"Compare paths"**\n- Ask for **"Free learning resources"**\n- Ask for a **"Deep dive into salary & reality"**`,
    };

    yield { type: "done" };
  }
}

export const agentOrchestrator = new AgentOrchestrator();

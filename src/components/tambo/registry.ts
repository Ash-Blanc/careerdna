import { z } from "zod";

// 1. TasteProfileCard Props Schema
export const TasteProfileCardPropsSchema = z.object({
  clusterSummary: z.string().default("Analyzing cultural taste signals..."),
  coreMotivations: z.array(z.string()).default([]),
  cognitiveStyles: z.array(z.string()).default([]),
  workStylePreferences: z.array(z.string()).default([]),
  culturalAffinities: z.record(z.string(), z.any()).default({}),
  isDegradedMode: z.boolean().default(false),
});
export type TasteProfileCardProps = z.infer<typeof TasteProfileCardPropsSchema>;

// 2. CareerTasteMap Props Schema
export const CareerOptionCardSchema = z.object({
  id: z.string().default("career-1"),
  trackKey: z.string().default("ai-ml-engineer"),
  title: z.string().default("Engineering Specialist"),
  fitScore: z.number().default(85),
  reasoning: z.string().default("High alignment with your core motivations."),
  riskAnalysis: z.string().default("Competitive landscape requiring strong proof of work."),
  requiredSkills: z.array(z.string()).default([]),
  entryRoles: z.array(z.string()).default([]),
  portfolioIdeas: z.array(z.string()).default([]),
  recommendedNextMove: z.string().default("Build a signature project."),
  demandTier: z.string().default("High Demand"),
});

export const CareerTasteMapPropsSchema = z.object({
  careerOptions: z.array(CareerOptionCardSchema).default([]),
  selectedCareerId: z.string().optional(),
});
export type CareerTasteMapProps = z.infer<typeof CareerTasteMapPropsSchema>;

// 3. CareerDeepDive Props Schema
export const SalaryContextSchema = z.object({
  entry: z.string().default("Competitive Entry Range"),
  mid: z.string().default("High Mid-Career Range"),
  indiaNotes: z.string().default("High demand in Bengaluru, Hyderabad, and Pune hubs"),
  globalNotes: z.string().default("Strong global remote market with US/EU companies"),
});

export const CareerDeepDivePropsSchema = z.object({
  trackTitle: z.string().default("Career Track"),
  fitScore: z.number().default(90),
  dayInLife: z.string().default("Sprint planning, architecture design, and iterative shipping."),
  requiredSkills: z.array(z.string()).default([]),
  entryRoles: z.array(z.string()).default([]),
  salaryContext: SalaryContextSchema.default({
    entry: "Competitive Entry Range",
    mid: "High Mid-Career Range",
    indiaNotes: "High demand in Bengaluru, Hyderabad, and Pune hubs",
    globalNotes: "Strong global remote market with US/EU companies",
  }),
  risksAndRealities: z.string().default("Portfolio proof-of-work is decisive over pedigree alone."),
  portfolioIdeas: z.array(z.string()).default([]),
});
export type CareerDeepDiveProps = z.infer<typeof CareerDeepDivePropsSchema>;

// 4. RoadmapTimeline Props Schema
export const TimelineWeekSchema = z.object({
  id: z.string().default("week-1"),
  weekNumber: z.number().default(1),
  title: z.string().default("Foundation Sprint"),
  description: z.string().default("Core fundamentals and project scaffolding."),
  deliverables: z.array(z.string()).default([]),
  resources: z.array(z.string()).optional().default([]),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),
});

export const TimelinePhaseSchema = z.object({
  phase: z.enum(["30_DAYS", "60_DAYS", "90_DAYS"]).default("30_DAYS"),
  label: z.string().default("Phase 1: Foundations"),
  description: z.string().default("Exploration and skill building."),
  weeks: z.array(TimelineWeekSchema).default([]),
});

export const RoadmapTimelinePropsSchema = z.object({
  roadmapId: z.string().default("roadmap-1"),
  roadmapTitle: z.string().default("30/60/90-Day Career Roadmap"),
  targetRole: z.string().default("Specialist"),
  phases: z.array(TimelinePhaseSchema).default([]),
});
export type RoadmapTimelineProps = z.infer<typeof RoadmapTimelinePropsSchema>;

// 5. PortfolioProjectCard Props Schema
export const PortfolioProjectCardPropsSchema = z.object({
  projectId: z.string().default("project-1"),
  title: z.string().default("Signature Portfolio Project"),
  goal: z.string().default("Build and deploy a production-grade application showcasing end-to-end architecture."),
  features: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  timelineWeeks: z.union([z.number(), z.string()]).transform((v) => (typeof v === "number" ? v : parseInt(String(v), 10) || 4)).default(4),
  difficulty: z.string().default("Intermediate"),
  whyFitReason: z.string().default("Directly tests the intersection of your taste and technical capabilities."),
  starterMilestones: z
    .array(
      z.object({
        milestone: z.string().default("Scaffold MVP"),
        dueWeek: z.union([z.number(), z.string()]).transform((v) => (typeof v === "number" ? v : parseInt(String(v), 10) || 1)).default(1),
      })
    )
    .default([]),
});
export type PortfolioProjectCardProps = z.infer<typeof PortfolioProjectCardPropsSchema>;

// 6. ResourceList Props Schema
export const ResourceItemSchema = z.object({
  title: z.string().default("Learning Resource"),
  category: z.string().default("Foundations"),
  url: z.string().default("#"),
  description: z.string().default("Curated learning guide."),
  isFree: z.boolean().default(true),
  tier: z.string().default("ESSENTIAL"),
  tags: z.array(z.string()).default([]),
});

export const ResourceListPropsSchema = z.object({
  resources: z.array(ResourceItemSchema).default([]),
  title: z.string().default("Curated Learning Resources & Communities"),
});
export type ResourceListProps = z.infer<typeof ResourceListPropsSchema>;

// 7. FollowUpQuestionCard Props Schema
export const FollowUpQuestionCardPropsSchema = z.object({
  questionId: z.string().default("q-1"),
  question: z.string().default("What aspect of this direction feels most exciting to you?"),
  contextReason: z.string().optional(),
  options: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        icon: z.string().optional(),
      })
    )
    .default([]),
  allowCustom: z.boolean().default(true),
});
export type FollowUpQuestionCardProps = z.infer<typeof FollowUpQuestionCardPropsSchema>;

// 8. ComparisonTable Props Schema
export const ComparisonTableRowSchema = z.object({
  title: z.string().default("Career Track"),
  fitScore: z.number().default(85),
  interestFit: z.string().default("Strong"),
  skillLeverage: z.string().default("High"),
  marketDemand: z.string().default("High Demand"),
  learningCurve: z.string().default("Moderate"),
  compPotential: z.string().default("Competitive"),
  lifestyle: z.string().default("Balanced"),
});

export const ComparisonTablePropsSchema = z.object({
  careers: z.array(ComparisonTableRowSchema).default([]),
});
export type ComparisonTableProps = z.infer<typeof ComparisonTablePropsSchema>;

// 9. QlooReasoningPanel Props Schema
export const QlooReasoningPanelPropsSchema = z.object({
  qlooActive: z.boolean().default(true),
  seedInterests: z.array(z.string()).default([]),
  inferredTasteSignals: z.array(z.string()).default([]),
  culturalCorrelationExplanation: z.string().default("Latent cultural affinity mapping derived from your passion points."),
  adjacentInterests: z.array(z.string()).default([]),
});
export type QlooReasoningPanelProps = z.infer<typeof QlooReasoningPanelPropsSchema>;

// 10. ExportRoadmapButton Props Schema
export const ExportRoadmapButtonPropsSchema = z.object({
  roadmapId: z.string().default("roadmap-1"),
  roadmapTitle: z.string().default("My CareerDNA Roadmap"),
  trackKey: z.string().optional(),
  projectTitle: z.string().optional(),
});
export type ExportRoadmapButtonProps = z.infer<typeof ExportRoadmapButtonPropsSchema>;

// 11. CulturalAffinityExplorer Props Schema
export const CulturalAffinityExplorerPropsSchema = z.object({
  central: z
    .object({
      name: z.string().default("Elden Ring"),
      category: z.string().default("Games"),
    })
    .default({ name: "Elden Ring", category: "Games" }),
  adjacent: z
    .array(
      z.object({
        name: z.string(),
        category: z.string().optional(),
        weight: z.number().optional(),
      })
    )
    .default([]),
  qlooActive: z.boolean().default(true),
});
export type CulturalAffinityExplorerProps = z.infer<typeof CulturalAffinityExplorerPropsSchema>;

// 12. TasteGenomePanel Props Schema (Tambo generative UI surface)
export const TasteGenomePanelPropsSchema = z.object({
  motivations: z.array(z.string()).default([]),
  cognitiveStyles: z.array(z.string()).default([]),
  affinities: z
    .array(
      z.object({
        domain: z.string(),
        affinity: z.string(),
        weight: z.number(),
        reasoning: z.string().optional(),
      })
    )
    .default([]),
  seed: z.string().default("demo-student"),
  caption: z.string().optional(),
  source: z.enum(["qloo", "fallback"]).default("qloo"),
});
export type TasteGenomePanelProps = z.infer<typeof TasteGenomePanelPropsSchema>;

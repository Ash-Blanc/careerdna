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
  id: z.string(),
  trackKey: z.string(),
  title: z.string(),
  fitScore: z.number(),
  reasoning: z.string(),
  riskAnalysis: z.string(),
  requiredSkills: z.array(z.string()),
  entryRoles: z.array(z.string()).optional(),
  portfolioIdeas: z.array(z.string()).optional(),
  recommendedNextMove: z.string().optional(),
  demandTier: z.string().default("High Demand"),
});

export const CareerTasteMapPropsSchema = z.object({
  careerOptions: z.array(CareerOptionCardSchema).default([]),
  selectedCareerId: z.string().optional(),
});
export type CareerTasteMapProps = z.infer<typeof CareerTasteMapPropsSchema>;

// 3. CareerDeepDive Props Schema
export const CareerDeepDivePropsSchema = z.object({
  trackTitle: z.string(),
  fitScore: z.number(),
  dayInLife: z.string(),
  requiredSkills: z.array(z.string()),
  entryRoles: z.array(z.string()),
  salaryContext: z.object({
    entry: z.string(),
    mid: z.string(),
    indiaNotes: z.string(),
    globalNotes: z.string(),
  }),
  risksAndRealities: z.string(),
  portfolioIdeas: z.array(z.string()),
});
export type CareerDeepDiveProps = z.infer<typeof CareerDeepDivePropsSchema>;

// 4. RoadmapTimeline Props Schema
export const TimelineWeekSchema = z.object({
  id: z.string(),
  weekNumber: z.number(),
  title: z.string(),
  description: z.string(),
  deliverables: z.array(z.string()),
  resources: z.array(z.string()).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),
});

export const TimelinePhaseSchema = z.object({
  phase: z.enum(["30_DAYS", "60_DAYS", "90_DAYS"]),
  label: z.string(),
  description: z.string(),
  weeks: z.array(TimelineWeekSchema),
});

export const RoadmapTimelinePropsSchema = z.object({
  roadmapId: z.string(),
  roadmapTitle: z.string().default("30/60/90-Day Career Roadmap"),
  targetRole: z.string().default("Specialist"),
  phases: z.array(TimelinePhaseSchema).default([]),
});
export type RoadmapTimelineProps = z.infer<typeof RoadmapTimelinePropsSchema>;

// 5. PortfolioProjectCard Props Schema
export const PortfolioProjectCardPropsSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  goal: z.string(),
  features: z.array(z.string()),
  techStack: z.array(z.string()),
  timelineWeeks: z.number(),
  difficulty: z.string(),
  whyFitReason: z.string(),
  starterMilestones: z.array(
    z.object({
      milestone: z.string(),
      dueWeek: z.number(),
    })
  ),
});
export type PortfolioProjectCardProps = z.infer<typeof PortfolioProjectCardPropsSchema>;

// 6. ResourceList Props Schema
export const ResourceItemSchema = z.object({
  title: z.string(),
  category: z.string(),
  url: z.string(),
  description: z.string(),
  isFree: z.boolean().default(true),
  tier: z.string().default("ESSENTIAL"),
  tags: z.array(z.string()).default([]),
});

export const ResourceListPropsSchema = z.object({
  resources: z.array(ResourceItemSchema).default([]),
  title: z.string().optional(),
});
export type ResourceListProps = z.infer<typeof ResourceListPropsSchema>;

// 7. FollowUpQuestionCard Props Schema
export const FollowUpQuestionCardPropsSchema = z.object({
  questionId: z.string(),
  question: z.string(),
  contextReason: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      icon: z.string().optional(),
    })
  ),
  allowCustom: z.boolean().default(true),
});
export type FollowUpQuestionCardProps = z.infer<typeof FollowUpQuestionCardPropsSchema>;

// 8. ComparisonTable Props Schema
export const ComparisonTableRowSchema = z.object({
  title: z.string(),
  fitScore: z.number(),
  interestFit: z.string(),
  skillLeverage: z.string(),
  marketDemand: z.string(),
  learningCurve: z.string(),
  compPotential: z.string(),
  lifestyle: z.string(),
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
  culturalCorrelationExplanation: z.string(),
  adjacentInterests: z.array(z.string()).default([]),
});
export type QlooReasoningPanelProps = z.infer<typeof QlooReasoningPanelPropsSchema>;

// 10. ExportRoadmapButton Props Schema
export const ExportRoadmapButtonPropsSchema = z.object({
  roadmapId: z.string(),
  roadmapTitle: z.string().default("My CareerDNA Roadmap"),
});
export type ExportRoadmapButtonProps = z.infer<typeof ExportRoadmapButtonPropsSchema>;

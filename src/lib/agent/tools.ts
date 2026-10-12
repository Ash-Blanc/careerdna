import { z } from "zod";

// 1. save_user_profile
export const SaveUserProfileInputSchema = z.object({
  userId: z.string().describe("User ID or demo user email"),
  educationLevel: z.string().describe("e.g. Undergraduate, High School, Bootcamp"),
  major: z.string().optional().describe("Student major or field"),
  location: z.string().optional().describe("City, Country"),
  currentSkills: z.array(z.string()).describe("List of current programming / technical skills"),
  weeklyHours: z.number().min(1).max(80).default(15).describe("Weekly time available to study/build"),
  budgetConstraint: z.string().default("Free only").describe("Budget constraints (Free only, Low, Moderate)"),
  careerConcerns: z.string().optional().describe("Fears, anxieties, or specific career goals"),
  githubUrl: z.string().optional().describe("GitHub profile link"),
  resumeText: z.string().optional().describe("Resume text or work experience summary"),
  portfolioUrl: z.string().optional().describe("Portfolio or personal site link"),
  interests: z.array(
    z.object({
      category: z.string(),
      name: z.string(),
      isCustom: z.boolean().default(false),
    })
  ).describe("Array of cultural and technical interests selected"),
});

export const SaveUserProfileOutputSchema = z.object({
  success: z.boolean(),
  profileId: z.string(),
  interestCount: z.number(),
  message: z.string(),
});

// 2. build_taste_profile
export const BuildTasteProfileInputSchema = z.object({
  profileId: z.string().describe("ID of student profile"),
  directObservations: z.string().optional().describe("Specific conversational signals observed by agent"),
});

export const BuildTasteProfileOutputSchema = z.object({
  success: z.boolean(),
  tasteProfileId: z.string(),
  clusterSummary: stringOrFallback(),
  coreMotivations: z.array(z.string()),
  cognitiveStyles: z.array(z.string()),
  workStylePreferences: z.array(z.string()),
  culturalAffinities: z.record(z.string(), z.any()),
  adjacentInterests: z.array(z.string()),
  isDegradedMode: z.boolean(),
});

// 3. generate_career_options
export const GenerateCareerOptionsInputSchema = z.object({
  tasteProfileId: z.string().describe("ID of the generated taste profile"),
  count: z.number().min(4).max(6).default(5).describe("Number of paths to recommend (4-6)"),
  includeAmbitiousFounder: z.boolean().default(true).describe("Include founder/indie hacker track"),
});

export const CareerOptionItemSchema = z.object({
  id: z.string(),
  trackKey: z.string(),
  title: z.string(),
  fitScore: z.number().min(0).max(100),
  reasoning: z.string(),
  riskAnalysis: z.string(),
  requiredSkills: z.array(z.string()),
  entryRoles: z.array(z.string()),
  portfolioIdeas: z.array(z.string()),
  recommendedNextMove: z.string(),
  demandTier: z.enum(["High Demand", "Differentiated", "Founder"]),
});

export const GenerateCareerOptionsOutputSchema = z.object({
  success: z.boolean(),
  tasteProfileId: z.string(),
  careerOptions: z.array(CareerOptionItemSchema),
});

// 4. explain_career_fit
export const ExplainCareerFitInputSchema = z.object({
  careerOptionId: z.string().describe("ID of the career option card"),
  specificConcern: z.string().optional().describe("Optional question or constraint raised by student"),
});

export const ExplainCareerFitOutputSchema = z.object({
  success: z.boolean(),
  trackTitle: z.string(),
  fitScore: z.number(),
  deepFitExplanation: z.string(),
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

// 5. generate_roadmap
export const GenerateRoadmapInputSchema = z.object({
  careerOptionId: z.string().describe("ID of the chosen career option"),
  weeklyHoursAvailable: z.number().min(1).max(80).default(15),
  budgetConstraint: z.string().default("Free only"),
});

export const RoadmapItemSchema = z.object({
  id: z.string(),
  phase: z.enum(["30_DAYS", "60_DAYS", "90_DAYS"]),
  weekNumber: z.number(),
  title: z.string(),
  description: z.string(),
  deliverables: z.array(z.string()),
  resources: z.array(z.string()),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),
});

export const GenerateRoadmapOutputSchema = z.object({
  success: z.boolean(),
  roadmapId: z.string(),
  title: z.string(),
  summary: z.string(),
  targetRole: z.string(),
  totalWeeks: z.number(),
  phases: z.array(
    z.object({
      phase: z.enum(["30_DAYS", "60_DAYS", "90_DAYS"]),
      label: z.string(),
      description: z.string(),
      weeks: z.array(RoadmapItemSchema),
    })
  ),
});

// 6. generate_portfolio_project
export const GeneratePortfolioProjectInputSchema = z.object({
  roadmapId: z.string().describe("Roadmap ID to attach project to"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Intermediate"),
  focusAreas: z.array(z.string()).optional(),
});

export const GeneratePortfolioProjectOutputSchema = z.object({
  success: z.boolean(),
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

// 7. find_resources
export const FindResourcesInputSchema = z.object({
  careerTrackKey: z.string().describe("e.g. ai-ml-engineer, quant-developer"),
  isFreeOnly: z.boolean().default(true),
  categories: z.array(z.enum(["LEARNING", "COMMUNITY", "CREATOR", "EVENT"])).optional(),
});

export const ResourceItemSchema = z.object({
  title: z.string(),
  category: z.string(),
  url: z.string(),
  description: z.string(),
  isFree: z.boolean(),
  tier: z.string(),
  tags: z.array(z.string()),
});

export const FindResourcesOutputSchema = z.object({
  success: z.boolean(),
  resources: z.array(ResourceItemSchema),
});

// 8. save_roadmap
export const SaveRoadmapInputSchema = z.object({
  roadmapId: z.string().describe("ID of the roadmap to persist"),
  customTitle: z.string().optional(),
});

export const SaveRoadmapOutputSchema = z.object({
  success: z.boolean(),
  roadmapId: z.string(),
  savedAt: z.string(),
  message: z.string(),
});

// 9. update_roadmap_item
export const UpdateRoadmapItemInputSchema = z.object({
  itemId: z.string().describe("ID of the roadmap week task"),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
  regenerateRequest: z.string().optional(),
});

export const UpdateRoadmapItemOutputSchema = z.object({
  success: z.boolean(),
  updatedItem: z.any(),
});

// 10. export_roadmap
export const ExportRoadmapInputSchema = z.object({
  roadmapId: z.string().describe("ID of the roadmap to export"),
  format: z.enum(["markdown", "pdf"]).default("markdown"),
});

export const ExportRoadmapOutputSchema = z.object({
  success: z.boolean(),
  format: z.enum(["markdown", "pdf"]),
  filename: z.string(),
  content: z.string().optional(),
  downloadUrl: z.string().optional(),
});

function stringOrFallback() {
  return z.string().default("");
}

export const AGENT_TOOLS_DEFINITIONS = [
  {
    name: "save_user_profile",
    description: "Saves student onboarding information, goals, education, skills, and cultural interests.",
    parameters: SaveUserProfileInputSchema,
  },
  {
    name: "build_taste_profile",
    description: "Calls Qloo cultural intelligence layer to synthesize user cultural affinities into a structured taste profile.",
    parameters: BuildTasteProfileInputSchema,
  },
  {
    name: "generate_career_options",
    description: "Generates 4-6 ranked career directions with fit scores, trade-offs, and reasons based on cultural taste signals.",
    parameters: GenerateCareerOptionsInputSchema,
  },
  {
    name: "explain_career_fit",
    description: "Provides deep dive explanation for a career direction, including day in the life, salary context, and reality checks.",
    parameters: ExplainCareerFitInputSchema,
  },
  {
    name: "generate_roadmap",
    description: "Generates a structured 30/60/90-day execution roadmap with weekly deliverables for a chosen career path.",
    parameters: GenerateRoadmapInputSchema,
  },
  {
    name: "generate_portfolio_project",
    description: "Generates one concrete, impressive starter portfolio project with milestones and tech stack.",
    parameters: GeneratePortfolioProjectInputSchema,
  },
  {
    name: "find_resources",
    description: "Finds high-quality free and open-source learning resources, creators, and communities for a career track.",
    parameters: FindResourcesInputSchema,
  },
  {
    name: "save_roadmap",
    description: "Persists and bookmarks a student's generated roadmap to their dashboard.",
    parameters: SaveRoadmapInputSchema,
  },
  {
    name: "update_roadmap_item",
    description: "Updates status (TODO/DONE) or modifies a weekly milestone deliverable in a roadmap.",
    parameters: UpdateRoadmapItemInputSchema,
  },
  {
    name: "export_roadmap",
    description: "Generates Markdown or PDF export format for a student roadmap.",
    parameters: ExportRoadmapInputSchema,
  },
];

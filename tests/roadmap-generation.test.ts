import { describe, expect, it } from "bun:test";
import { executeTool } from "../src/lib/agent/tool-executors";
import { prisma } from "../src/lib/db/prisma";

describe("Roadmap Generation Logic", () => {
  it("should generate a complete 12-week roadmap structured across 3 phases", async () => {
    // 1. Setup profile and career option
    const user = await prisma.user.upsert({
      where: { email: "test.student@careerdna.ai" },
      update: {},
      create: { email: "test.student@careerdna.ai", name: "Test Student" },
    });

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        educationLevel: "Undergraduate",
        currentSkills: JSON.stringify(["Python", "SQL"]),
        weeklyHours: 15,
        budgetConstraint: "Free only",
      },
    });

    const tasteProfile = await prisma.tasteProfile.create({
      data: {
        profileId: profile.id,
        clusterSummary: "Test summary",
        coreMotivations: JSON.stringify(["building", "optimizing"]),
        cognitiveStyles: JSON.stringify(["systems thinking"]),
        workStylePreferences: JSON.stringify(["deep focus"]),
        culturalAffinities: JSON.stringify({}),
      },
    });

    const option = await prisma.careerOption.create({
      data: {
        tasteProfileId: tasteProfile.id,
        trackKey: "product-engineer",
        title: "Product Engineer",
        fitScore: 92,
        reasoning: "High craftsmanship match",
        riskAnalysis: "Fast-moving ecosystem",
        requiredSkills: JSON.stringify(["TypeScript", "Next.js"]),
        entryRoles: JSON.stringify(["Junior Product Engineer"]),
        portfolioIdeas: JSON.stringify(["SquadVault"]),
        recommendedNextMove: "Build flagship prototype",
        demandTier: "High Demand",
      },
    });

    // 2. Execute generate_roadmap
    const roadmapRes = await executeTool("generate_roadmap", {
      careerOptionId: option.id,
      weeklyHoursAvailable: 15,
      budgetConstraint: "Free only",
    });

    expect(roadmapRes.success).toBe(true);
    expect(roadmapRes.roadmapId).toBeDefined();
    expect(roadmapRes.totalWeeks).toBe(12);
    expect(roadmapRes.phases.length).toBe(3);

    // Verify 30_DAYS, 60_DAYS, 90_DAYS
    expect(roadmapRes.phases[0].phase).toBe("30_DAYS");
    expect(roadmapRes.phases[1].phase).toBe("60_DAYS");
    expect(roadmapRes.phases[2].phase).toBe("90_DAYS");

    const totalWeeksCount = roadmapRes.phases.reduce((sum: number, p: any) => sum + p.weeks.length, 0);
    expect(totalWeeksCount).toBe(12);

    // Verify deliverables exist
    for (const phase of roadmapRes.phases) {
      for (const week of phase.weeks) {
        expect(week.deliverables.length).toBeGreaterThan(0);
        expect(week.title.length).toBeGreaterThan(3);
      }
    }
  });
});

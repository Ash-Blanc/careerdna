import { describe, expect, it } from "bun:test";
import { executeTool } from "../src/lib/agent/tool-executors";
import { prisma } from "../src/lib/db/prisma";

describe("CareerDNA End-to-End Smoke Test", () => {
  it("should complete the full flow from onboarding to taste profiling, career options, roadmap, and markdown export", async () => {
    // 1. Onboarding Save Profile
    const profileRes = await executeTool("save_user_profile", {
      userId: "smoke.test@careerdna.ai",
      educationLevel: "Undergraduate (3rd Year)",
      major: "Computer Science",
      location: "Bengaluru, India",
      currentSkills: ["Python", "JavaScript", "SQL"],
      weeklyHours: 15,
      budgetConstraint: "Zero / Free only",
      careerConcerns: "Breaking into AI without PhD",
      interests: [
        { category: "games", name: "Elden Ring / Soulsborne" },
        { category: "football", name: "Premier League Tactics" },
        { category: "tech", name: "Neovim & Terminal Ricing" },
      ],
    });

    expect(profileRes.success).toBe(true);
    expect(profileRes.profileId).toBeDefined();

    // 2. Build Taste Profile via Qloo
    const tasteRes = await executeTool("build_taste_profile", {
      profileId: profileRes.profileId,
    });

    expect(tasteRes.success).toBe(true);
    expect(tasteRes.tasteProfileId).toBeDefined();
    expect(tasteRes.coreMotivations.length).toBeGreaterThan(0);
    expect(tasteRes.clusterSummary).toBeDefined();

    // 3. Generate 5 Career Options
    const optionsRes = await executeTool("generate_career_options", {
      tasteProfileId: tasteRes.tasteProfileId,
      count: 5,
      includeAmbitiousFounder: true,
    });

    expect(optionsRes.success).toBe(true);
    expect(optionsRes.careerOptions.length).toBeGreaterThanOrEqual(4);

    const topCareer = optionsRes.careerOptions[0];
    expect(topCareer.fitScore).toBeGreaterThan(60);

    // 4. Generate 30/60/90-Day Roadmap for Top Career
    const roadmapRes = await executeTool("generate_roadmap", {
      careerOptionId: topCareer.id,
      weeklyHoursAvailable: 15,
      budgetConstraint: "Free only",
    });

    expect(roadmapRes.success).toBe(true);
    expect(roadmapRes.roadmapId).toBeDefined();
    expect(roadmapRes.phases.length).toBe(3);

    // 5. Generate Starter Portfolio Project
    const projectRes = await executeTool("generate_portfolio_project", {
      roadmapId: roadmapRes.roadmapId,
      difficulty: "Intermediate",
    });

    expect(projectRes.success).toBe(true);
    expect(projectRes.projectId).toBeDefined();
    expect(projectRes.features.length).toBeGreaterThan(0);

    // 6. Export Roadmap as Markdown
    const exportRes = await executeTool("export_roadmap", {
      roadmapId: roadmapRes.roadmapId,
      format: "markdown",
    });

    expect(exportRes.success).toBe(true);
    expect(exportRes.content).toContain(roadmapRes.title);
    expect(exportRes.content).toContain("Week 1");
    expect(exportRes.content).toContain("Deliverables");

    console.log("✅ End-to-End Smoke Test Passed Successfully!");
  });
});

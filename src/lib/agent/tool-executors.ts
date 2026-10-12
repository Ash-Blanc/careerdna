import { prisma } from "@/lib/db/prisma";
import { buildTasteProfile, scoreCareerAffinity } from "@/lib/qloo/service";
import { CAREER_TRACKS, getCareerTrackByKey } from "@/lib/taxonomy/career-tracks";
import {
  SaveUserProfileInputSchema,
  BuildTasteProfileInputSchema,
  GenerateCareerOptionsInputSchema,
  ExplainCareerFitInputSchema,
  GenerateRoadmapInputSchema,
  GeneratePortfolioProjectInputSchema,
  FindResourcesInputSchema,
  SaveRoadmapInputSchema,
  UpdateRoadmapItemInputSchema,
  ExportRoadmapInputSchema,
} from "./tools";

export class ToolExecutionError extends Error {
  constructor(public toolName: string, message: string) {
    super(`[${toolName}] ${message}`);
  }
}

export async function executeTool(toolName: string, args: any): Promise<any> {
  switch (toolName) {
    case "save_user_profile": {
      const parsed = SaveUserProfileInputSchema.parse(args);
      // Upsert user
      const user = await prisma.user.upsert({
        where: { email: parsed.userId.includes("@") ? parsed.userId : "demo.student@careerdna.ai" },
        update: { name: "Career Explorer" },
        create: {
          email: parsed.userId.includes("@") ? parsed.userId : "demo.student@careerdna.ai",
          name: "Career Explorer",
        },
      });

      // Upsert profile
      const profile = await prisma.profile.upsert({
        where: { userId: user.id },
        update: {
          educationLevel: parsed.educationLevel,
          major: parsed.major,
          location: parsed.location,
          currentSkills: JSON.stringify(parsed.currentSkills),
          weeklyHours: parsed.weeklyHours,
          budgetConstraint: parsed.budgetConstraint,
          careerConcerns: parsed.careerConcerns,
          githubUrl: parsed.githubUrl,
          resumeText: parsed.resumeText,
          portfolioUrl: parsed.portfolioUrl,
        },
        create: {
          userId: user.id,
          educationLevel: parsed.educationLevel,
          major: parsed.major,
          location: parsed.location,
          currentSkills: JSON.stringify(parsed.currentSkills),
          weeklyHours: parsed.weeklyHours,
          budgetConstraint: parsed.budgetConstraint,
          careerConcerns: parsed.careerConcerns,
          githubUrl: parsed.githubUrl,
          resumeText: parsed.resumeText,
          portfolioUrl: parsed.portfolioUrl,
        },
      });

      // Re-create interests
      await prisma.interest.deleteMany({ where: { profileId: profile.id } });
      await prisma.interest.createMany({
        data: parsed.interests.map((i) => ({
          profileId: profile.id,
          category: i.category,
          name: i.name,
          isCustom: i.isCustom ?? false,
        })),
      });

      return {
        success: true,
        profileId: profile.id,
        interestCount: parsed.interests.length,
        message: "Student profile and cultural preferences saved successfully.",
      };
    }

    case "build_taste_profile": {
      const parsed = BuildTasteProfileInputSchema.parse(args);
      const profile = await prisma.profile.findUnique({
        where: { id: parsed.profileId },
        include: { interests: true },
      });

      if (!profile) {
        throw new ToolExecutionError("build_taste_profile", `Profile ${parsed.profileId} not found`);
      }

      const qlooResult = await buildTasteProfile(
        profile.interests.map((i) => ({ name: i.name, category: i.category })),
        {
          educationLevel: profile.educationLevel,
          major: profile.major || undefined,
          careerConcerns: profile.careerConcerns || undefined,
          weeklyHours: profile.weeklyHours,
        }
      );

      // Persist in DB
      const tasteProfile = await prisma.tasteProfile.create({
        data: {
          profileId: profile.id,
          clusterSummary: qlooResult.clusterSummary,
          coreMotivations: JSON.stringify(qlooResult.coreMotivations),
          cognitiveStyles: JSON.stringify(qlooResult.cognitiveStyles),
          workStylePreferences: JSON.stringify(qlooResult.workStylePreferences),
          culturalAffinities: JSON.stringify(qlooResult.culturalAffinities),
          isDegradedMode: qlooResult.isDegradedMode,
        },
      });

      return {
        success: true,
        tasteProfileId: tasteProfile.id,
        clusterSummary: qlooResult.clusterSummary,
        coreMotivations: qlooResult.coreMotivations,
        cognitiveStyles: qlooResult.cognitiveStyles,
        workStylePreferences: qlooResult.workStylePreferences,
        culturalAffinities: qlooResult.culturalAffinities,
        adjacentInterests: qlooResult.adjacentInterests,
        isDegradedMode: qlooResult.isDegradedMode,
      };
    }

    case "generate_career_options": {
      const parsed = GenerateCareerOptionsInputSchema.parse(args);
      const tasteProfile = await prisma.tasteProfile.findUnique({
        where: { id: parsed.tasteProfileId },
      });

      if (!tasteProfile) {
        throw new ToolExecutionError("generate_career_options", `TasteProfile ${parsed.tasteProfileId} not found`);
      }

      const motivations = JSON.parse(tasteProfile.coreMotivations) as string[];
      const affinities = JSON.parse(tasteProfile.culturalAffinities) as Record<string, any>;

      const scored = scoreCareerAffinity(
        { coreMotivations: motivations, culturalAffinities: affinities },
        CAREER_TRACKS
      );

      // Curate required portfolio: 2 high demand, 2 differentiated, 1 founder
      const highDemand = scored.filter((s) => s.demandTier === "High Demand");
      const differentiated = scored.filter((s) => s.demandTier === "Differentiated");
      const founder = scored.filter((s) => s.demandTier === "Founder");

      const selectedList: typeof scored = [
        ...highDemand.slice(0, 2),
        ...differentiated.slice(0, 2),
        ...(parsed.includeAmbitiousFounder && founder[0] ? [founder[0]] : []),
      ];

      // Pad up to requested count
      for (const item of scored) {
        if (selectedList.length >= parsed.count) break;
        if (!selectedList.find((x) => x.trackKey === item.trackKey)) {
          selectedList.push(item);
        }
      }

      // Save to CareerOption table
      const createdOptions = [];
      for (const item of selectedList) {
        const track = getCareerTrackByKey(item.trackKey);
        if (!track) continue;

        const record = await prisma.careerOption.create({
          data: {
            tasteProfileId: tasteProfile.id,
            trackKey: track.trackKey,
            title: track.name,
            fitScore: item.fitScore,
            reasoning: item.reasoning,
            riskAnalysis: track.commonMisconceptions[0] || "Competitive market; requires proof of work.",
            requiredSkills: JSON.stringify(track.coreSkills.slice(0, 5)),
            entryRoles: JSON.stringify(track.typicalEntryRoles),
            portfolioIdeas: JSON.stringify(track.portfolioProjectTemplates.map((p) => p.title)),
            recommendedNextMove: `Build ${track.portfolioProjectTemplates[0]?.title || "a signature proof-of-work project"}.`,
            demandTier: track.demandTier,
          },
        });

        createdOptions.push({
          id: record.id,
          trackKey: record.trackKey,
          title: record.title,
          fitScore: record.fitScore,
          reasoning: record.reasoning,
          riskAnalysis: record.riskAnalysis,
          requiredSkills: JSON.parse(record.requiredSkills) as string[],
          entryRoles: JSON.parse(record.entryRoles) as string[],
          portfolioIdeas: JSON.parse(record.portfolioIdeas) as string[],
          recommendedNextMove: record.recommendedNextMove,
          demandTier: record.demandTier as "High Demand" | "Differentiated" | "Founder",
        });
      }

      return {
        success: true,
        tasteProfileId: tasteProfile.id,
        careerOptions: createdOptions,
      };
    }

    case "explain_career_fit": {
      const parsed = ExplainCareerFitInputSchema.parse(args);
      const option = await prisma.careerOption.findUnique({
        where: { id: parsed.careerOptionId },
      });

      if (!option) {
        throw new ToolExecutionError("explain_career_fit", `CareerOption ${parsed.careerOptionId} not found`);
      }

      const track = getCareerTrackByKey(option.trackKey);
      if (!track) {
        throw new ToolExecutionError("explain_career_fit", `Track ${option.trackKey} not found in taxonomy`);
      }

      return {
        success: true,
        trackTitle: track.name,
        fitScore: option.fitScore,
        deepFitExplanation: `${option.reasoning} ${track.shortDescription}`,
        dayInLife: `A typical day involves deep work in ${track.coreSkills.slice(0, 3).join(", ")}, pairing with team members, and shipping verifiable features to production.`,
        requiredSkills: track.coreSkills,
        entryRoles: track.typicalEntryRoles,
        salaryContext: {
          entry: track.opportunityNotes.salaryEntryRange,
          mid: track.opportunityNotes.salaryMidRange,
          indiaNotes: track.opportunityNotes.indiaNotes,
          globalNotes: track.opportunityNotes.globalNotes,
        },
        risksAndRealities: track.commonMisconceptions.join(". "),
        portfolioIdeas: track.portfolioProjectTemplates.map((p) => p.title),
      };
    }

    case "generate_roadmap": {
      const parsed = GenerateRoadmapInputSchema.parse(args);
      const option = await prisma.careerOption.findUnique({
        where: { id: parsed.careerOptionId },
        include: { tasteProfile: true },
      });

      if (!option) {
        throw new ToolExecutionError("generate_roadmap", `CareerOption ${parsed.careerOptionId} not found`);
      }

      const track = getCareerTrackByKey(option.trackKey);
      const targetRole = track?.typicalEntryRoles[0] || `${option.title} Specialist`;

      // Create Roadmap
      const roadmap = await prisma.roadmap.create({
        data: {
          profileId: option.tasteProfile.profileId,
          careerOptionId: option.id,
          title: `30/60/90-Day Roadmap: ${option.title}`,
          summary: `Accelerated 12-week roadmap designed for ${parsed.weeklyHoursAvailable} hrs/week with ${parsed.budgetConstraint} resources.`,
          targetRole,
          totalDurationWeeks: 12,
        },
      });

      // Generate 12 weekly roadmap items across the 3 phases
      const phases = [
        {
          phase: "30_DAYS" as const,
          label: "Phase 1: Exploration & Foundations (Days 1–30)",
          description: "Establish foundational mental models, set up dev environment, and master essential syntax and patterns.",
          weeks: [
            {
              week: 1,
              title: "Environment Setup & Mental Models",
              description: `Configure tooling, install dependencies, and complete core fundamentals for ${track?.coreSkills[0] || "core stack"}.`,
              deliverables: ["Dev environment repo initialized on GitHub", "Working 'Hello World' with strict typing"],
              resources: [track?.learningResources[0]?.url || "https://github.com"],
            },
            {
              week: 2,
              title: "Core Mechanics & Architecture",
              description: `Deep dive into ${track?.coreSkills[1] || "system patterns"} and complete guided exercises.`,
              deliverables: ["Solved 5 architectural challenges", "Documented notes in personal dev log"],
              resources: [track?.learningResources[1]?.url || "https://freecodecamp.org"],
            },
            {
              week: 3,
              title: "Mini-Prototype Spike",
              description: "Build an end-to-end toy project demonstrating state management and external data flow.",
              deliverables: ["Functional mini-project pushed to GitHub", "README walkthrough written"],
              resources: ["https://developer.mozilla.org"],
            },
            {
              week: 4,
              title: "Phase 1 Synthesis & Retrospective",
              description: "Review progress, refactor toy project, and prepare scope for Phase 2 signature project.",
              deliverables: ["Recorded a 2-minute Loom walkthrough", "Self-graded foundational checklist"],
              resources: ["https://loom.com"],
            },
          ],
        },
        {
          phase: "60_DAYS" as const,
          label: "Phase 2: Deep Skill-Building & Architecture (Days 31–60)",
          description: "Build complex systems, tackle edge cases, optimize performance, and integrate live data.",
          weeks: [
            {
              week: 5,
              title: "Signature Project Inception",
              description: `Kick off signature portfolio project: ${track?.portfolioProjectTemplates[0]?.title || "Flagship Project"}.`,
              deliverables: ["Architecture diagram & database schema completed", "Project skeleton configured"],
              resources: [track?.learningResources[0]?.url || "https://github.com"],
            },
            {
              week: 6,
              title: "Core Logic & Data Pipelines",
              description: "Implement backend logic, database queries, and error boundaries.",
              deliverables: ["Core algorithm / pipeline operating with unit tests", "CI workflow enabled"],
              resources: ["https://docs.github.com/actions"],
            },
            {
              week: 7,
              title: "Interface Craft & User Delight",
              description: "Build intuitive UI/CLI with micro-interactions, responsive states, and crisp typography.",
              deliverables: ["Complete responsive interface", "Loading, empty, and error states handled"],
              resources: ["https://tailwindcss.com"],
            },
            {
              week: 8,
              title: "Edge Cases & Benchmarking",
              description: "Stress-test system performance, optimize queries, and implement defensive guardrails.",
              deliverables: ["Performance benchmark report in README", "Security / input validation added"],
              resources: ["https://owasp.org"],
            },
          ],
        },
        {
          phase: "90_DAYS" as const,
          label: "Phase 3: Portfolio Polish, Community & Applications (Days 61–90)",
          description: "Deploy to production, write technical breakdowns, engage with communities, and apply to entry roles.",
          weeks: [
            {
              week: 9,
              title: "Production Deployment & Polish",
              description: "Deploy flagship project to public URL with custom domain and analytics.",
              deliverables: ["Live production deployment on Vercel / Fly.io", "Zero console errors"],
              resources: ["https://vercel.com"],
            },
            {
              week: 10,
              title: "Technical Writing & Public Case Study",
              description: "Publish a deep technical writeup explaining your design decisions and taste connection.",
              deliverables: ["Published technical article on Substack / Dev.to", "Shared 5-tweet thread"],
              resources: ["https://dev.to"],
            },
            {
              week: 11,
              title: "Open Source Outreach & Networking",
              description: "Contribute to 1 open-source repository and connect with 5 practitioners in the field.",
              deliverables: ["Submitted 1 PR to an open-source project", "Engaged in community Discord"],
              resources: [track?.learningResources.find((r) => r.category === "COMMUNITY")?.url || "https://github.com"],
            },
            {
              week: 12,
              title: "Portfolio Packaging & Targeted Applications",
              description: "Assemble portfolio site, refine resume with metrics, and submit 10 personalized applications.",
              deliverables: ["Updated resume and GitHub pinned repos", "Submitted 10 high-fit applications"],
              resources: ["https://wellfound.com"],
            },
          ],
        },
      ];

      const createdPhases = [];
      let globalIndex = 0;

      for (const p of phases) {
        const weekItems = [];
        for (const w of p.weeks) {
          const item = await prisma.roadmapItem.create({
            data: {
              roadmapId: roadmap.id,
              phase: p.phase,
              weekNumber: w.week,
              title: w.title,
              description: w.description,
              deliverables: JSON.stringify(w.deliverables),
              resources: JSON.stringify(w.resources),
              status: "TODO",
              orderIndex: globalIndex++,
            },
          });

          weekItems.push({
            id: item.id,
            phase: p.phase,
            weekNumber: item.weekNumber,
            title: item.title,
            description: item.description,
            deliverables: w.deliverables,
            resources: w.resources,
            status: "TODO" as const,
          });
        }

        createdPhases.push({
          phase: p.phase,
          label: p.label,
          description: p.description,
          weeks: weekItems,
        });
      }

      // Automatically attach default starter project & resources
      if (track?.portfolioProjectTemplates[0]) {
        const proto = track.portfolioProjectTemplates[0];
        await prisma.portfolioProject.create({
          data: {
            roadmapId: roadmap.id,
            title: proto.title,
            goal: proto.goal,
            features: JSON.stringify(proto.features),
            techStack: JSON.stringify(proto.techStack),
            timelineWeeks: proto.timelineWeeks,
            difficulty: proto.difficulty,
            whyFitReason: proto.whyFitReason,
            starterMilestones: JSON.stringify(proto.starterMilestones),
          },
        });
      }

      // Attach track resources
      if (track?.learningResources) {
        await prisma.resource.createMany({
          data: track.learningResources.map((res) => ({
            roadmapId: roadmap.id,
            category: res.category,
            title: res.title,
            url: res.url,
            description: res.description,
            isFree: res.isFree,
            tier: res.tier,
            tags: JSON.stringify(res.tags),
          })),
        });
      }

      return {
        success: true,
        roadmapId: roadmap.id,
        title: roadmap.title,
        summary: roadmap.summary,
        targetRole,
        totalWeeks: 12,
        phases: createdPhases,
      };
    }

    case "generate_portfolio_project": {
      const parsed = GeneratePortfolioProjectInputSchema.parse(args);
      const roadmap = await prisma.roadmap.findUnique({
        where: { id: parsed.roadmapId },
        include: { careerOption: true },
      });

      if (!roadmap) {
        throw new ToolExecutionError("generate_portfolio_project", `Roadmap ${parsed.roadmapId} not found`);
      }

      const track = getCareerTrackByKey(roadmap.careerOption.trackKey);
      const template = track?.portfolioProjectTemplates[0] || {
        title: "Flagship Portfolio System",
        goal: "Build a production-grade project showcasing system architecture and clean craft.",
        features: ["Type-safe data layer", "Interactive dashboard", "Public API"],
        techStack: ["TypeScript", "Next.js", "PostgreSQL"],
        timelineWeeks: 4,
        difficulty: "Intermediate" as const,
        whyFitReason: "Directly proves your ability to build production software end to end.",
        starterMilestones: [
          { milestone: "Core data schema & setup", dueWeek: 1 },
          { milestone: "Feature development & testing", dueWeek: 2 },
          { milestone: "Deployment & public launch", dueWeek: 3 },
        ],
      };

      const project = await prisma.portfolioProject.create({
        data: {
          roadmapId: roadmap.id,
          title: template.title,
          goal: template.goal,
          features: JSON.stringify(template.features),
          techStack: JSON.stringify(template.techStack),
          timelineWeeks: template.timelineWeeks,
          difficulty: parsed.difficulty || template.difficulty,
          whyFitReason: template.whyFitReason,
          starterMilestones: JSON.stringify(template.starterMilestones),
        },
      });

      return {
        success: true,
        projectId: project.id,
        title: project.title,
        goal: project.goal,
        features: template.features,
        techStack: template.techStack,
        timelineWeeks: project.timelineWeeks,
        difficulty: project.difficulty,
        whyFitReason: project.whyFitReason,
        starterMilestones: template.starterMilestones,
      };
    }

    case "find_resources": {
      const parsed = FindResourcesInputSchema.parse(args);
      const track = getCareerTrackByKey(parsed.careerTrackKey);

      if (!track) {
        throw new ToolExecutionError("find_resources", `Track ${parsed.careerTrackKey} not found`);
      }

      let list = track.learningResources;
      if (parsed.isFreeOnly) {
        list = list.filter((r) => r.isFree);
      }
      if (parsed.categories && parsed.categories.length > 0) {
        list = list.filter((r) => parsed.categories!.includes(r.category as any));
      }

      return {
        success: true,
        resources: list,
      };
    }

    case "save_roadmap": {
      const parsed = SaveRoadmapInputSchema.parse(args);
      const roadmap = await prisma.roadmap.update({
        where: { id: parsed.roadmapId },
        data: {
          title: parsed.customTitle || undefined,
        },
      });

      return {
        success: true,
        roadmapId: roadmap.id,
        savedAt: new Date().toISOString(),
        message: "Roadmap successfully saved and bookmarked to your dashboard.",
      };
    }

    case "update_roadmap_item": {
      const parsed = UpdateRoadmapItemInputSchema.parse(args);
      const item = await prisma.roadmapItem.update({
        where: { id: parsed.itemId },
        data: {
          status: parsed.status,
          title: parsed.title,
          description: parsed.description,
          deliverables: parsed.deliverables ? JSON.stringify(parsed.deliverables) : undefined,
        },
      });

      return {
        success: true,
        updatedItem: {
          id: item.id,
          weekNumber: item.weekNumber,
          title: item.title,
          description: item.description,
          status: item.status,
          deliverables: JSON.parse(item.deliverables),
        },
      };
    }

    case "export_roadmap": {
      const parsed = ExportRoadmapInputSchema.parse(args);
      const roadmap = await prisma.roadmap.findUnique({
        where: { id: parsed.roadmapId },
        include: {
          items: { orderBy: { orderIndex: "asc" } },
          portfolioProjects: true,
          resources: true,
        },
      });

      if (!roadmap) {
        throw new ToolExecutionError("export_roadmap", `Roadmap ${parsed.roadmapId} not found`);
      }

      const filename = `careerdna-roadmap-${roadmap.id.slice(-6)}.${parsed.format === "markdown" ? "md" : "pdf"}`;

      if (parsed.format === "markdown") {
        let md = `# ${roadmap.title}\n\n`;
        md += `> **Target Role:** ${roadmap.targetRole}\n`;
        md += `> **Duration:** ${roadmap.totalDurationWeeks} Weeks\n\n`;
        md += `## Overview\n${roadmap.summary}\n\n`;

        if (roadmap.portfolioProjects.length > 0) {
          const proj = roadmap.portfolioProjects[0];
          md += `## Flagship Portfolio Project: ${proj.title}\n`;
          md += `**Goal:** ${proj.goal}\n\n`;
          md += `**Tech Stack:** ${(JSON.parse(proj.techStack) as string[]).join(", ")}\n\n`;
          md += `**Why It Fits You:** ${proj.whyFitReason}\n\n`;
        }

        md += `## Weekly Action Plan\n\n`;
        for (const item of roadmap.items) {
          md += `### Week ${item.weekNumber}: ${item.title} [${item.status}]\n`;
          md += `${item.description}\n\n`;
          const dels = JSON.parse(item.deliverables) as string[];
          if (dels.length > 0) {
            md += `**Deliverables:**\n`;
            dels.forEach((d) => (md += `- [ ] ${d}\n`));
            md += `\n`;
          }
        }

        return {
          success: true,
          format: "markdown",
          filename,
          content: md,
        };
      }

      return {
        success: true,
        format: "pdf",
        filename,
        downloadUrl: `/api/roadmaps/${roadmap.id}/export?format=pdf`,
      };
    }

    default:
      throw new Error(`Unknown tool name: ${toolName}`);
  }
}

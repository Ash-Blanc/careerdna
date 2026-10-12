import { describe, expect, it } from "bun:test";
import { scoreCareerAffinity, buildTasteProfile } from "../src/lib/qloo/service";
import { CAREER_TRACKS } from "../src/lib/taxonomy/career-tracks";

describe("Career Scoring Algorithm", () => {
  it("should score career fit between 0 and 100", async () => {
    const tasteProfile = await buildTasteProfile([
      { name: "Elden Ring / Soulsborne", category: "games" },
      { name: "Premier League Tactics", category: "football" },
      { name: "Neovim & Terminal Ricing", category: "tech" },
    ]);

    const results = scoreCareerAffinity(tasteProfile, CAREER_TRACKS);

    expect(results.length).toBe(CAREER_TRACKS.length);
    for (const res of results) {
      expect(res.fitScore).toBeGreaterThanOrEqual(0);
      expect(res.fitScore).toBeLessThanOrEqual(100);
      expect(res.reasoning.length).toBeGreaterThan(10);
    }
  });

  it("should avoid stereotypes and map tactics + systems gaming to high-leverage analytics", async () => {
    const tasteProfile = await buildTasteProfile([
      { name: "Premier League Tactics", category: "football" },
      { name: "Fantasy Sports & xG Analytics", category: "football" },
      { name: "Speedrunning / Glitch Hunting", category: "games" },
    ]);

    const results = scoreCareerAffinity(tasteProfile, CAREER_TRACKS);

    const sportsAnalyst = results.find((r) => r.trackKey === "sports-analytics-engineer");
    const quantDev = results.find((r) => r.trackKey === "quant-developer");

    expect(sportsAnalyst).toBeDefined();
    expect(quantDev).toBeDefined();

    // High fit scores for quantitative / systems roles
    expect(sportsAnalyst!.fitScore).toBeGreaterThanOrEqual(80);
    expect(quantDev!.fitScore).toBeGreaterThanOrEqual(75);
  });

  it("should work reliably in degraded offline mode", async () => {
    const tasteProfile = await buildTasteProfile([
      { name: "Minimalist UI", category: "design" },
      { name: "Streetwear & Sneaker Culture", category: "design" },
    ]);

    expect(tasteProfile.isDegradedMode).toBeBoolean();
    expect(tasteProfile.coreMotivations.length).toBeGreaterThan(0);
    expect(tasteProfile.clusterSummary).toContain("passions");
  });
});

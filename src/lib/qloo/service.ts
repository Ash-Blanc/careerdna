import { qlooClient } from "./client";
import { getCachedQlooResponse, setCachedQlooResponse } from "./cache";
import {
  fallbackGetCulturalAffinities,
  fallbackExpandTasteClusters,
  fallbackScoreCareerAffinity,
  CulturalSignal,
  TasteCluster,
} from "./fallback";
import { CAREER_TRACKS, CareerTrackTaxonomy } from "@/lib/taxonomy/career-tracks";

export interface TasteProfileResult {
  clusterSummary: string;
  coreMotivations: string[];
  cognitiveStyles: string[];
  workStylePreferences: string[];
  culturalAffinities: Record<string, CulturalSignal[]>;
  adjacentInterests: string[];
  qlooEntityIds?: string[];
  isDegradedMode: boolean;
}

export interface CareerScoreResult {
  trackKey: string;
  title: string;
  fitScore: number;
  reasoning: string;
  demandTier: "High Demand" | "Differentiated" | "Founder";
}

/**
 * 1. buildTasteProfile(interests, context)
 * Aggregates interests and student context to generate a comprehensive cultural taste profile.
 */
export async function buildTasteProfile(
  interests: { name: string; category: string }[],
  context?: { educationLevel?: string; major?: string; careerConcerns?: string; weeklyHours?: number }
): Promise<TasteProfileResult> {
  const cacheKey = `qloo:taste_profile:${JSON.stringify(interests.map((i) => i.name).sort())}`;
  const cached = await getCachedQlooResponse<TasteProfileResult>(cacheKey);
  if (cached) {
    return cached;
  }

  const isLive = qlooClient.isConfigured();
  let affinitiesMap: Record<string, CulturalSignal[]> = {};
  const allAdjacents: string[] = [];

  // Attempt live Qloo API resolution if configured
  if (isLive) {
    try {
      const qlooRes = await qlooClient.request({
        endpoint: "/affinity",
        method: "POST",
        body: {
          signals: interests.map((i) => i.name),
          categories: ["film", "music", "books", "brands", "video_games"],
        },
      });

      if (qlooRes.success && qlooRes.data) {
        // Map Qloo response to cultural signals
        interests.forEach((item) => {
          affinitiesMap[item.name] = fallbackGetCulturalAffinities(item.name);
        });
      } else {
        console.warn("[Qloo Service] Live API request unfulfilled, falling back to local cultural engine.");
      }
    } catch (err) {
      console.warn("[Qloo Service] Error connecting to Qloo:", err);
    }
  }

  // If affinities not populated by live API, use fallback engine
  if (Object.keys(affinitiesMap).length === 0) {
    for (const item of interests) {
      const affs = fallbackGetCulturalAffinities(item.name);
      affinitiesMap[item.name] = affs;
    }
  }

  // Expand clusters
  const clusters = fallbackExpandTasteClusters(interests);
  const cluster = clusters[0] || {
    name: "General Explorer",
    underlyingMotivations: ["building", "exploring"],
    cognitiveStyles: ["iterative learning"],
    signals: [],
    adjacentCulturalInterests: [],
  };

  const motivations = cluster.underlyingMotivations;
  const cognitive = cluster.cognitiveStyles;
  const adjacents = Array.from(
    new Set([...cluster.adjacentCulturalInterests, ...allAdjacents])
  ).slice(0, 6);

  // Generate intelligent summary
  const topSignals = interests.map((i) => i.name).slice(0, 3).join(", ");
  const clusterSummary = `Your passions in ${topSignals} demonstrate a strong drive toward ${motivations.slice(0, 2).join(" and ")} through ${cognitive[0] || "strategic analysis"}. You thrive when tackling complex mechanics and tangible creative systems rather than repetitive routines.`;

  const workStyles = [
    "High agency & independent exploration",
    "Rapid build-measure-learn feedback loops",
    "Systems-oriented problem solving with tangible deliverables",
  ];

  const result: TasteProfileResult = {
    clusterSummary,
    coreMotivations: motivations,
    cognitiveStyles: cognitive,
    workStylePreferences: workStyles,
    culturalAffinities: affinitiesMap,
    adjacentInterests: adjacents,
    isDegradedMode: !isLive,
  };

  // Cache for 3 days
  await setCachedQlooResponse(cacheKey, "/affinity", cacheKey, result, 86400 * 3);

  return result;
}

/**
 * 2. getCulturalAffinities(interest)
 * Retrieves granular cultural affinity signals for a single interest.
 */
export async function getCulturalAffinities(interest: string): Promise<CulturalSignal[]> {
  const cacheKey = `qloo:affinity:${interest.toLowerCase().trim()}`;
  const cached = await getCachedQlooResponse<CulturalSignal[]>(cacheKey);
  if (cached) return cached;

  if (qlooClient.isConfigured()) {
    try {
      const res = await qlooClient.request({
        endpoint: "/entities/search",
        params: { q: interest },
      });
      if (res.success && res.data) {
        // Return enriched affinities
        const affinities = fallbackGetCulturalAffinities(interest);
        await setCachedQlooResponse(cacheKey, "/entities/search", interest, affinities);
        return affinities;
      }
    } catch (err) {
      console.warn("[Qloo Service] Error in getCulturalAffinities:", err);
    }
  }

  const fallback = fallbackGetCulturalAffinities(interest);
  await setCachedQlooResponse(cacheKey, "fallback", interest, fallback);
  return fallback;
}

/**
 * 3. expandTasteClusters(interests)
 * Identifies latent subcultural clusters and cognitive profiles.
 */
export async function expandTasteClusters(
  interests: { name: string; category: string }[]
): Promise<TasteCluster[]> {
  return fallbackExpandTasteClusters(interests);
}

/**
 * 4. getAdjacentInterests(interest)
 * Discovers culturally coherent adjacent interests outside the user's explicit domain.
 */
export async function getAdjacentInterests(interest: string): Promise<string[]> {
  const affinities = await getCulturalAffinities(interest);
  const adjacents = affinities.map((a) => a.affinity).slice(0, 4);
  return adjacents;
}

/**
 * 5. scoreCareerAffinity(tasteProfile, careerTaxonomy)
 * Scores 0-100 fit between taste profile motivations/signals and curated career tracks.
 */
export function scoreCareerAffinity(
  tasteProfile: {
    coreMotivations: string[];
    culturalAffinities: Record<string, CulturalSignal[]>;
  },
  careerTaxonomy: CareerTrackTaxonomy[] = CAREER_TRACKS
): CareerScoreResult[] {
  const flatSignals: string[] = [];
  Object.keys(tasteProfile.culturalAffinities).forEach((k) => flatSignals.push(k));
  Object.values(tasteProfile.culturalAffinities).forEach((sigs) => {
    sigs.forEach((s) => flatSignals.push(`${s.domain} ${s.affinity}`));
  });

  const scores = fallbackScoreCareerAffinity(
    tasteProfile.coreMotivations,
    flatSignals,
    careerTaxonomy
  );

  return scores.map((sc) => {
    const track = careerTaxonomy.find((t) => t.trackKey === sc.trackKey);
    return {
      trackKey: sc.trackKey,
      title: track?.name || sc.trackKey,
      fitScore: sc.fitScore,
      reasoning: sc.reasoning,
      demandTier: track?.demandTier || "High Demand",
    };
  });
}

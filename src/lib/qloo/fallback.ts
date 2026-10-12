import { CareerTrackTaxonomy } from "@/lib/taxonomy/career-tracks";

export interface CulturalSignal {
  domain: string;
  affinity: string;
  weight: number;
  reasoning: string;
}

export interface TasteCluster {
  name: string;
  underlyingMotivations: string[];
  cognitiveStyles: string[];
  signals: string[];
  adjacentCulturalInterests: string[];
}

// Cultural ontology mappings for high-accuracy local inference
const CULTURAL_ONTOLOGY: Record<string, {
  motivations: string[];
  cognitiveStyles: string[];
  affinities: { domain: string; affinity: string; weight: number }[];
  adjacents: string[];
}> = {
  "elden ring": {
    motivations: ["optimizing", "exploring", "competing"],
    cognitiveStyles: ["systems thinking", "pattern recognition", "iterative resilience"],
    affinities: [
      { domain: "systems", affinity: "complex state machines", weight: 0.94 },
      { domain: "architecture", affinity: "layered spatial design", weight: 0.88 },
      { domain: "culture", affinity: "dark fantasy worldbuilding", weight: 0.91 }
    ],
    adjacents: ["Bloodborne", "System Dynamics", "Medieval Cartography", "Ludology"]
  },
  "valorant": {
    motivations: ["competing", "optimizing", "leading"],
    cognitiveStyles: ["high APM focus", "team coordination", "spatial awareness"],
    affinities: [
      { domain: "tactics", affinity: "probabilistic positioning", weight: 0.92 },
      { domain: "speed", affinity: "low-latency reaction times", weight: 0.95 }
    ],
    adjacents: ["Esports Coaching", "Aim Lab Metrics", "Game Telemetry", "Tactical FPS"]
  },
  "speedrunning": {
    motivations: ["optimizing", "building", "exploring"],
    cognitiveStyles: ["boundary analysis", "decompilation curiosity", "micro-optimization"],
    affinities: [
      { domain: "engineering", affinity: "memory registers & glitch mechanics", weight: 0.98 },
      { domain: "performance", affinity: "millisecond timing benchmarks", weight: 0.96 }
    ],
    adjacents: ["Reverse Engineering", "Tool-Assisted Runs (TAS)", "Compiler Optimization", "Hex Editing"]
  },
  "premier league": {
    motivations: ["analyzing", "optimizing", "competing"],
    cognitiveStyles: ["spatial pressing analysis", "game theory", "systemic balance"],
    affinities: [
      { domain: "analytics", affinity: "expected goals (xG) & spatial heatmaps", weight: 0.95 },
      { domain: "strategy", affinity: "Pep Guardiola / De Zerbi positional play", weight: 0.93 }
    ],
    adjacents: ["Expected Threat (xT)", "StatsBomb Data", "Chess Opening Theory", "Spatial Telemetry"]
  },
  "fantasy sports": {
    motivations: ["analyzing", "optimizing", "competing"],
    cognitiveStyles: ["probabilistic forecasting", "portfolio optimization", "variance management"],
    affinities: [
      { domain: "finance", affinity: "risk-weighted asset allocation", weight: 0.91 },
      { domain: "statistics", affinity: "Monte Carlo simulation", weight: 0.89 }
    ],
    adjacents: ["Bayesian Statistics", "Poker Bankroll Theory", "Predictive Modeling", "Polars / DuckDB"]
  },
  "attack on titan": {
    motivations: ["analyzing", "storytelling", "leading"],
    cognitiveStyles: ["macro political dynamics", "adversarial anticipation", "existential strategy"],
    affinities: [
      { domain: "narrative", affinity: "multi-generational plot architecture", weight: 0.92 },
      { domain: "philosophy", affinity: "moral dilemmas & consequentialism", weight: 0.87 }
    ],
    adjacents: ["Geopolitics", "Speculative Fiction", "Game Theory", "Directing"]
  },
  "neovim": {
    motivations: ["building", "optimizing"],
    cognitiveStyles: ["tool minimalism", "ergonomic mastery", "declarative configuration"],
    affinities: [
      { domain: "developer tools", affinity: "modal editing & Lua scripting", weight: 0.97 },
      { domain: "craft", affinity: "bespoke productivity tooling", weight: 0.94 }
    ],
    adjacents: ["Rust Language", "TUI Frameworks", "Keyboard Ergonomics", "Unix Philosophy"]
  },
  "lo-fi beats": {
    motivations: ["building", "exploring", "designing"],
    cognitiveStyles: ["ambient flow state", "calm deep focus", "sensory aesthetic"],
    affinities: [
      { domain: "lifestyle", affinity: "solo deep work sessions", weight: 0.89 },
      { domain: "audio", affinity: "analog warmth & tape saturation", weight: 0.86 }
    ],
    adjacents: ["Bedroom Pop", "Modular Synthesizers", "Minimalist Workspaces", "Sound Design"]
  },
  "minimalist ui": {
    motivations: ["designing", "optimizing", "building"],
    cognitiveStyles: ["visual hierarchy", "cognitive load reduction", "typographic taste"],
    affinities: [
      { domain: "design", affinity: "Linear & Apple interaction models", weight: 0.96 },
      { domain: "craft", affinity: "sub-pixel polish & micro-interactions", weight: 0.93 }
    ],
    adjacents: ["Dieter Rams Principles", "Swiss Typography", "Radix Primitives", "Design Tokens"]
  },
  "y combinator": {
    motivations: ["building", "leading", "competing"],
    cognitiveStyles: ["rapid iterative shipping", "high agency", "market contrarianism"],
    affinities: [
      { domain: "business", affinity: "zero to one product launches", weight: 0.96 },
      { domain: "autonomy", affinity: "founder velocity & direct customer feedback", weight: 0.94 }
    ],
    adjacents: ["Paul Graham Essays", "Product Hunt Launches", "Micro-SaaS", "Indie Hacking"]
  }
};

export function fallbackGetCulturalAffinities(interestName: string): CulturalSignal[] {
  const norm = interestName.toLowerCase();
  for (const [key, entry] of Object.entries(CULTURAL_ONTOLOGY)) {
    if (norm.includes(key)) {
      return entry.affinities.map(a => ({
        ...a,
        reasoning: `Strong cultural affinity observed between ${interestName} and ${a.affinity} (${(a.weight * 100).toFixed(0)}% correlation in taste network).`
      }));
    }
  }

  // Generic cultural affinity generator
  return [
    {
      domain: "cultural expression",
      affinity: `${interestName} craft & subculture`,
      weight: 0.82,
      reasoning: `Affinity for creative exploration and authentic subculture connection in ${interestName}.`
    },
    {
      domain: "cognitive engagement",
      affinity: "pattern discovery & self-expression",
      weight: 0.78,
      reasoning: `Desire for hands-on involvement and nuanced literacy around ${interestName}.`
    }
  ];
}

export function fallbackExpandTasteClusters(interests: { name: string; category: string }[]): TasteCluster[] {
  const clusters: TasteCluster[] = [];
  const allMotivations = new Set<string>();
  const allCognitive = new Set<string>();
  const allSignals: string[] = [];
  const allAdjacents: string[] = [];

  for (const item of interests) {
    const norm = item.name.toLowerCase();
    let matched = false;

    for (const [key, entry] of Object.entries(CULTURAL_ONTOLOGY)) {
      if (norm.includes(key)) {
        entry.motivations.forEach(m => allMotivations.add(m));
        entry.cognitiveStyles.forEach(c => allCognitive.add(c));
        entry.affinities.forEach(a => allSignals.push(`${a.domain}: ${a.affinity}`));
        entry.adjacents.forEach(adj => allAdjacents.push(adj));
        matched = true;
        break;
      }
    }

    if (!matched) {
      if (item.category === "games") {
        allMotivations.add("competing");
        allMotivations.add("optimizing");
        allCognitive.add("interactive feedback loops");
      } else if (item.category === "football" || item.category === "sports") {
        allMotivations.add("analyzing");
        allMotivations.add("competing");
        allCognitive.add("spatial awareness & tactical execution");
      } else if (item.category === "tech" || item.category === "startups") {
        allMotivations.add("building");
        allMotivations.add("leading");
        allCognitive.add("systems thinking & iteration");
      } else {
        allMotivations.add("exploring");
        allMotivations.add("designing");
        allCognitive.add("aesthetic sensitivity");
      }
    }
  }

  // Ensure building or optimizing are present if empty
  if (allMotivations.size === 0) {
    allMotivations.add("building");
    allMotivations.add("exploring");
  }

  clusters.push({
    name: "Core Taste Blueprint",
    underlyingMotivations: Array.from(allMotivations),
    cognitiveStyles: Array.from(allCognitive).slice(0, 4),
    signals: Array.from(new Set(allSignals)).slice(0, 6),
    adjacentCulturalInterests: Array.from(new Set(allAdjacents)).slice(0, 5)
  });

  return clusters;
}

export function fallbackScoreCareerAffinity(
  motivations: string[],
  culturalSignals: string[],
  careerTracks: CareerTrackTaxonomy[]
): { trackKey: string; fitScore: number; reasoning: string }[] {
  return careerTracks.map((track) => {
    let score = 50; // base score

    // Match motivations against track requirements
    const trackText = `${track.name} ${track.shortDescription} ${track.coreSkills.join(" ")} ${track.culturalAffinityKeywords.join(" ")}`.toLowerCase();

    for (const motivation of motivations) {
      if (trackText.includes(motivation.toLowerCase())) {
        score += 8;
      }
    }

    // Match cultural affinity keywords and signals
    const allSignalsJoined = culturalSignals.join(" ").toLowerCase();
    for (const kw of track.culturalAffinityKeywords) {
      const kwLower = kw.toLowerCase();
      if (allSignalsJoined.includes(kwLower)) {
        score += 10;
      } else {
        // Check partial word overlap
        const words = kwLower.split(" ").filter((w) => w.length > 3);
        if (words.some((w) => allSignalsJoined.includes(w))) {
          score += 6;
        }
      }
    }

    // Specific domain resonance bonuses
    if (track.trackKey === "sports-analytics-engineer" && (allSignalsJoined.includes("football") || allSignalsJoined.includes("tactics") || allSignalsJoined.includes("analytics"))) {
      score += 12;
    }
    if (track.trackKey === "quant-developer" && (allSignalsJoined.includes("speedrunning") || allSignalsJoined.includes("timing") || allSignalsJoined.includes("optimization"))) {
      score += 10;
    }
    if (track.trackKey === "developer-tools-engineer" && (allSignalsJoined.includes("neovim") || allSignalsJoined.includes("terminal") || allSignalsJoined.includes("ergonomics"))) {
      score += 12;
    }
    if (track.trackKey === "ai-ml-engineer" && (allSignalsJoined.includes("systems") || allSignalsJoined.includes("lore") || allSignalsJoined.includes("strategy"))) {
      score += 8;
    }

    // Clamp score
    const finalScore = Math.min(98, Math.max(58, score));

    // Construct high-leverage taste-to-career reason
    let reasoning = "";
    if (track.trackKey === "sports-analytics-engineer") {
      reasoning = "Your tactical interest in football combined with systems analysis reveals strong affinity for spatial tracking, expected threat modeling, and performance telemetry.";
    } else if (track.trackKey === "quant-developer") {
      reasoning = "Your speedrunning, high-APM competitive mindset and obsession with micro-optimization directly parallel nanosecond latency profiling and lock-free execution engines.";
    } else if (track.trackKey === "ai-ml-engineer") {
      reasoning = "Your appetite for complex multi-turn strategy and emergent systems maps naturally to multi-agent architectures, RAG pipelines, and model evaluation loops.";
    } else if (track.trackKey === "product-engineer") {
      reasoning = "Your focus on craftsmanship, developer tooling ergonomics, and rapid iteration provides the ideal foundation for high-agency full-stack product building.";
    } else if (track.trackKey === "developer-tools-engineer") {
      reasoning = "Your affinity for terminal ricing and custom workflow setup shows a rare appreciation for developer experience, compiler ergonomics, and high-performance CLIs.";
    } else if (track.trackKey === "game-developer") {
      reasoning = "Your deep appreciation for responsive mechanics, physics feel, and complex game loops channels into systems programming and gameplay architecture.";
    } else if (track.trackKey === "startup-founder") {
      reasoning = "Your cross-disciplinary curiosity and desire for sovereign creation indicate high founder agency and zero-to-one product velocity.";
    } else {
      reasoning = `Your taste signals around ${motivations.slice(0, 2).join(" and ")} align strongly with the day-to-day challenges of ${track.name}.`;
    }

    return {
      trackKey: track.trackKey,
      fitScore: finalScore,
      reasoning
    };
  }).sort((a, b) => b.fitScore - a.fitScore);
}

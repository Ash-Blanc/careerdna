export interface InterestItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  icon?: string;
  culturalSignals: string[];
}

export interface InterestCategory {
  id: string;
  label: string;
  description: string;
  iconName: string;
  color: string;
  presetChips: InterestItem[];
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: "games",
    label: "Games and Esports",
    description: "Competitive gaming, immersive RPGs, speedrunning, and game systems",
    iconName: "Gamepad2",
    color: "from-purple-500 to-indigo-600",
    presetChips: [
      { id: "elden-ring", name: "Elden Ring / Soulsborne", category: "games", culturalSignals: ["challenge-seeking", "deep lore", "mastery", "spatial exploration"] },
      { id: "valorant", name: "Valorant / Tactical Shooters", category: "games", culturalSignals: ["team coordination", "high APM", "reflexes", "tactical discipline"] },
      { id: "minecraft", name: "Minecraft / Redstone", category: "games", culturalSignals: ["creative building", "logic systems", "spatial engineering", "sandboxing"] },
      { id: "hades", name: "Hades / Roguelikes", category: "games", culturalSignals: ["build synergy", "fast feedback loops", "iterative resilience"] },
      { id: "chess", name: "Chess / Strategic Board Games", category: "games", culturalSignals: ["abstract strategy", "pattern recognition", "multi-turn planning"] },
      { id: "speedrunning", name: "Speedrunning / Glitch Hunting", category: "games", culturalSignals: ["boundary pushing", "decompilation curiosity", "extreme optimization"] }
    ]
  },
  {
    id: "anime",
    label: "Anime, Films, and Web Series",
    description: "Visual storytelling, complex worlds, cinematography, and animation",
    iconName: "Film",
    color: "from-pink-500 to-rose-600",
    presetChips: [
      { id: "attack-on-titan", name: "Attack on Titan", category: "anime", culturalSignals: ["high-stakes mystery", "political maneuvering", "uncompromising intensity"] },
      { id: "evangelion", name: "Neon Genesis Evangelion", category: "anime", culturalSignals: ["philosophical depth", "existential dread", "mecha tech", "introspection"] },
      { id: "ghibli", name: "Studio Ghibli Films", category: "anime", culturalSignals: ["craft appreciation", "aesthetic warmth", "meticulous attention to detail"] },
      { id: "cyberpunk-edgerunners", name: "Cyberpunk: Edgerunners", category: "anime", culturalSignals: ["high kinetic style", "transhumanism", "gritty neon aesthetics"] },
      { id: "christopher-nolan", name: "Nolan Sci-Fi (Interstellar / Inception)", category: "anime", culturalSignals: ["temporal puzzles", "scientific curiosity", "grand ambition"] },
      { id: "death-note", name: "Death Note / Psychological Thrillers", category: "anime", culturalSignals: ["intellectual chess", "adversarial thinking", "game theory"] }
    ]
  },
  {
    id: "music",
    label: "Music and Creators",
    description: "Electronic music, sound production, live performances, and modern creators",
    iconName: "Music",
    color: "from-amber-500 to-orange-600",
    presetChips: [
      { id: "lofi-beats", name: "Lo-Fi Beats & Ambient Sound", category: "music", culturalSignals: ["focus loops", "nostalgia", "calm deep work"] },
      { id: "electronic-synth", name: "Synthwave & Electronic Music", category: "music", culturalSignals: ["futurism", "frequency synthesis", "digital texture"] },
      { id: "hip-hop-production", name: "Hip-Hop & Beat Production", category: "music", culturalSignals: ["sampling", "rhythmic timing", "creative recombination"] },
      { id: "indie-rock", name: "Indie Rock & Bedroom Pop", category: "music", culturalSignals: ["authenticity", "DIY ethos", "raw emotion"] },
      { id: "veritasium-3blue1brown", name: "3Blue1Brown / Veritasium", category: "music", culturalSignals: ["conceptual visual teaching", "intellectual rigor", "first principles"] },
      { id: "mkbhd", name: "MKBHD & Industrial Tech Reviews", category: "music", culturalSignals: ["industrial design", "hardware taste", "crisp production"] }
    ]
  },
  {
    id: "football",
    label: "Football and Sports",
    description: "Tactics, match analytics, athletic performance, and high-stakes competition",
    iconName: "Trophy",
    color: "from-emerald-500 to-green-600",
    presetChips: [
      { id: "premier-league", name: "Premier League Tactics", category: "football", culturalSignals: ["pressing dynamics", "system management", "spatial control"] },
      { id: "f1-telemetry", name: "Formula 1 & Telemetry", category: "football", culturalSignals: ["millisecond optimization", "aerodynamics", "data telemetry"] },
      { id: "fantasy-sports", name: "Fantasy Sports & xG Analytics", category: "football", culturalSignals: ["expected value calculation", "roster optimization", "probabilistic modeling"] },
      { id: "nba-analytics", name: "Basketball Spacing & Pace", category: "football", culturalSignals: ["efficiency modeling", "athletic burst", "momentum analysis"] },
      { id: "climbing-bouldering", name: "Bouldering & Calisthenics", category: "football", culturalSignals: ["body geometry", "problem solving under tension", "incremental mastery"] }
    ]
  },
  {
    id: "tech",
    label: "Technology and Open Source",
    description: "Hacking, terminal tools, AI development, and open source communities",
    iconName: "Code2",
    color: "from-cyan-500 to-blue-600",
    presetChips: [
      { id: "neovim-linux", name: "Neovim & Terminal Ricing", category: "tech", culturalSignals: ["ergonomics", "keyboard-first flow", "tool personalization"] },
      { id: "rust-lang", name: "Rust & Systems Programming", category: "tech", culturalSignals: ["type safety", "memory models", "zero-cost abstractions"] },
      { id: "open-source-ai", name: "Local LLMs (Ollama / HuggingFace)", category: "tech", culturalSignals: ["sovereign AI", "privacy", "tinkering", "latency optimization"] },
      { id: "raspberry-pi", name: "Home Lab & Raspberry Pi", category: "tech", culturalSignals: ["hardware tinkering", "networking", "self-hosting"] },
      { id: "github-craft", name: "GitHub OSS Curation", category: "tech", culturalSignals: ["code reading", "collaborative craft", "transparent building"] }
    ]
  },
  {
    id: "startups",
    label: "Startups and Business",
    description: "Bootstrapping, high-growth ventures, market dynamics, and indie products",
    iconName: "Rocket",
    color: "from-violet-500 to-purple-600",
    presetChips: [
      { id: "y-combinator", name: "Y Combinator & Seed Startups", category: "startups", culturalSignals: ["high growth", "rapid shipping", "talking to users"] },
      { id: "indie-hackers", name: "Indie Hacking & Micro-SaaS", category: "startups", culturalSignals: ["solopreneurship", "bootstrapped freedom", "cash-flow focus"] },
      { id: "zero-to-one", name: "Zero to One Thinking", category: "startups", culturalSignals: ["contrarian ideas", "monopoly theory", "bold visions"] },
      { id: "crypto-defi", name: "Crypto & Decentralized Protocols", category: "startups", culturalSignals: ["incentive design", "permissionless finance", "protocol economics"] }
    ]
  },
  {
    id: "design",
    label: "Design and Fashion",
    description: "Typography, streetwear, architectural minimalism, and design systems",
    iconName: "Palette",
    color: "from-fuchsia-500 to-pink-600",
    presetChips: [
      { id: "minimalist-ui", name: "Linear / Apple Minimalist UI", category: "design", culturalSignals: ["visual restraint", "micro-delight", "typographic hierarchy"] },
      { id: "streetwear-fashion", name: "Streetwear & Sneaker Culture", category: "design", culturalSignals: ["brand identity", "cultural drops", "visual signalling"] },
      { id: "japanese-architecture", name: "Japanese Architecture & Brutalism", category: "design", culturalSignals: ["spatial balance", "material honesty", "negative space"] },
      { id: "3d-motion", name: "3D Motion Graphics & Blender", category: "design", culturalSignals: ["lighting physics", "kinetic composition", "visual texture"] }
    ]
  },
  {
    id: "food-travel",
    label: "Food and Travel",
    description: "Culinary craft, nomadic culture, global exploration, and coffee science",
    iconName: "Compass",
    color: "from-teal-500 to-emerald-600",
    presetChips: [
      { id: "specialty-coffee", name: "Specialty Pour-Over & Coffee Science", category: "food-travel", culturalSignals: ["extraction variables", "sensory discernment", "ritualistic precision"] },
      { id: "solo-travel", name: "Backpacking & Off-the-Grid Travel", category: "food-travel", culturalSignals: ["adaptability", "cross-cultural curiosity", "navigation"] },
      { id: "fermentation-craft", name: "Fermentation, Sourdough & Cooking Craft", category: "food-travel", culturalSignals: ["biological patience", "chemistry curiosity", "artisanal craft"] }
    ]
  },
  {
    id: "history-books",
    label: "History and Books",
    description: "Civilizations, biography deep dives, speculative sci-fi, and philosophy",
    iconName: "BookOpen",
    color: "from-amber-600 to-yellow-600",
    presetChips: [
      { id: "sci-fi-classics", name: "Hard Sci-Fi (Dune / Three-Body Problem)", category: "history-books", culturalSignals: ["cosmic scale", "civilizational game theory", "deep time"] },
      { id: "military-history", name: "History of Inventions & Great Empires", category: "history-books", culturalSignals: ["causality analysis", "strategic blunders", "macro history"] },
      { id: "stoicism-philosophy", name: "Stoicism & Classical Philosophy", category: "history-books", culturalSignals: ["mental models", "emotional resilience", "first principles"] },
      { id: "biographies", name: "Biographies of Inventors & Builders", category: "history-books", culturalSignals: ["grit study", "psychology of obsessives", "historical agency"] }
    ]
  },
  {
    id: "memes-culture",
    label: "Memes and Internet Culture",
    description: "Viral mechanics, digital subcultures, absurdity, and internet lore",
    iconName: "Sparkles",
    color: "from-lime-500 to-green-600",
    presetChips: [
      { id: "shitposting-lore", name: "Internet Absurdism & Meme Formats", category: "memes-culture", culturalSignals: ["rapid cultural adaptation", "semiotic decoding", "pattern inversion"] },
      { id: "reddit-deep-dives", name: "Niche Subreddit Deep Dives", category: "memes-culture", culturalSignals: ["digital anthropology", "community lore", "obsessive fact-checking"] },
      { id: "tiktok-micro-trends", name: "TikTok / Reels Micro-Trends", category: "memes-culture", culturalSignals: ["viral pacing", "attention capture", "hook architecture"] }
    ]
  },
  {
    id: "science-math",
    label: "Science and Mathematics",
    description: "Astrophysics, chaos theory, pure geometry, and cognitive neuroscience",
    iconName: "Atom",
    color: "from-sky-500 to-indigo-600",
    presetChips: [
      { id: "quantum-physics", name: "Quantum Mechanics & Relativity", category: "science-math", culturalSignals: ["counter-intuitive models", "mathematical elegance", "nature of reality"] },
      { id: "chaos-fractals", name: "Chaos Theory & Complex Systems", category: "science-math", culturalSignals: ["emergence", "nonlinear feedback", "fractal beauty"] },
      { id: "neuroscience-cognition", name: "Cognitive Science & Memory Architecture", category: "science-math", culturalSignals: ["mental representations", "human hardware", "consciousness"] }
    ]
  },
  {
    id: "custom",
    label: "Custom Interests",
    description: "Your unique, uncategorized obsessions, hobbies, and specific niche loves",
    iconName: "PlusCircle",
    color: "from-neutral-500 to-zinc-600",
    presetChips: []
  }
];

export function findInterestByName(name: string): InterestItem | undefined {
  for (const cat of INTEREST_CATEGORIES) {
    const found = cat.presetChips.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  return undefined;
}

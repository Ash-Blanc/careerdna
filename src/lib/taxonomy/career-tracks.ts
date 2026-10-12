export interface PortfolioProjectTemplate {
  title: string;
  goal: string;
  features: string[];
  techStack: string[];
  timelineWeeks: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  whyFitReason: string;
  starterMilestones: { milestone: string; dueWeek: number }[];
}

export interface CareerTrackTaxonomy {
  id: string;
  trackKey: string;
  name: string;
  shortDescription: string;
  demandTier: "High Demand" | "Differentiated" | "Founder";
  coreSkills: string[];
  adjacentJobTitles: string[];
  typicalEntryRoles: string[];
  portfolioProjectTemplates: PortfolioProjectTemplate[];
  culturalAffinityKeywords: string[];
  learningResources: {
    title: string;
    category: "LEARNING" | "COMMUNITY" | "CREATOR" | "EVENT";
    url: string;
    description: string;
    isFree: boolean;
    tier: "ESSENTIAL" | "RECOMMENDED" | "OPTIONAL";
    tags: string[];
  }[];
  commonMisconceptions: string[];
  opportunityNotes: {
    indiaNotes: string;
    globalNotes: string;
    salaryEntryRange: string;
    salaryMidRange: string;
  };
}

export const CAREER_TRACKS: CareerTrackTaxonomy[] = [
  {
    id: "ai-ml-engineer",
    trackKey: "ai-ml-engineer",
    name: "AI/ML Engineer",
    shortDescription: "Architects, fine-tunes, and deploys intelligent models, LLM evaluation pipelines, and autonomous agent systems.",
    demandTier: "High Demand",
    coreSkills: [
      "Python",
      "PyTorch",
      "Transformer Architectures",
      "Vector Databases & RAG",
      "Agentic Tool Calling",
      "Model Evaluation & Guardrails",
      "FastAPI & Docker",
      "Prompt Optimization"
    ],
    adjacentJobTitles: ["Applied AI Engineer", "LLM Systems Engineer", "Machine Learning Infrastructure Specialist"],
    typicalEntryRoles: ["Junior AI Engineer", "Associate ML Ops Specialist", "AI Prototype Developer"],
    portfolioProjectTemplates: [
      {
        title: "Tactical Scout AI: Multi-Agent Football Match Analysis",
        goal: "Ingest match commentary, spatial coordinates, and team tactics to produce automated tactical breakdowns.",
        features: ["Vision-language clip analysis", "Player pressing heatmaps", "RAG query engine over tactical manuals"],
        techStack: ["Python", "FastAPI", "LangChain/LangGraph", "ChromaDB", "Streamlit/Next.js"],
        timelineWeeks: 4,
        difficulty: "Intermediate",
        whyFitReason: "Unites passions for sports tactics, competitive analysis, and generative reasoning.",
        starterMilestones: [
          { milestone: "Extract and structure event data from public match datasets", dueWeek: 1 },
          { milestone: "Build vector index of football tactics and manager playbooks", dueWeek: 2 },
          { milestone: "Implement multi-agent commentary and debate loop", dueWeek: 3 },
          { milestone: "Package interactive dashboard and deploy on Vercel/Fly.io", dueWeek: 4 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "strategy games", "football tactics", "anime power systems", "chess",
      "optimizing", "systems thinking", "scifi worldbuilding", "math puzzles"
    ],
    learningResources: [
      {
        title: "Fast.ai Practical Deep Learning for Coders",
        category: "LEARNING",
        url: "https://course.fast.ai",
        description: "Premier top-down hands-on deep learning curriculum.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["PyTorch", "Deep Learning", "Vision", "NLP"]
      },
      {
        title: "Hugging Face Open LLM Leaderboard & Discord",
        category: "COMMUNITY",
        url: "https://huggingface.co/join/discord",
        description: "Global community discussing bleeding-edge models and open weights.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Open Source", "LLMs", "Community"]
      },
      {
        title: "Andrej Karpathy YouTube Channel",
        category: "CREATOR",
        url: "https://youtube.com/@AndrejKarpathy",
        description: "Masterclasses on building LLMs from scratch and neural network mechanics.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Architecture", "Transformers", "Karpathy"]
      }
    ],
    commonMisconceptions: [
      "You need a PhD in pure math before writing your first useful AI app",
      "Prompt engineering is all that matters—software engineering and evaluation discipline are the real differentiators"
    ],
    opportunityNotes: {
      indiaNotes: "Unprecedented demand in Bengaluru, Hyderabad, and Pune across AI product studios, GCCs, and high-growth venture-backed startups. High leverage for developers who know evaluation and production latency optimization.",
      globalNotes: "Global remote-first market paying top-percentile compensation for engineers capable of turning brittle LLM prototypes into resilient production agent loops.",
      salaryEntryRange: "₹12L - ₹24L ($80k - $125k Global)",
      salaryMidRange: "₹28L - ₹55L ($150k - $240k Global)"
    }
  },
  {
    id: "product-engineer",
    trackKey: "product-engineer",
    name: "Product Engineer",
    shortDescription: "Full-stack craftsman who bridges high-fidelity user experience, rapid product iteration, and robust system architecture.",
    demandTier: "High Demand",
    coreSkills: [
      "TypeScript",
      "Next.js App Router",
      "React & Tailwind CSS",
      "PostgreSQL & Prisma",
      "API Design & Server Actions",
      "Design Systems & Micro-interactions",
      "Analytics & User Telemetry",
      "Product Taste"
    ],
    adjacentJobTitles: ["Full-Stack Software Engineer", "Product Software Developer", "Founding Engineer"],
    typicalEntryRoles: ["Junior Full-Stack Engineer", "Frontend Specialist (Product)", "Associate Software Engineer"],
    portfolioProjectTemplates: [
      {
        title: "SquadVault: Collaborative Taste & Gear Graph for Gamers",
        goal: "Social inventory and build-sharing web app with real-time sync, visual gear builders, and community voting.",
        features: ["Live drag-and-drop build editor", "Postgres-backed search", "Shareable OG card generator"],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Channels gaming communities, aesthetic curation, and full-stack execution.",
        starterMilestones: [
          { milestone: "Setup schema, Next.js App Router, and auth flow", dueWeek: 1 },
          { milestone: "Build interactive visual loadout editor with Tailwind and DnD", dueWeek: 2 },
          { milestone: "Deploy on Vercel with social preview images and polish", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "minimalist design", "indie games", "creator economy", "craftsmanship",
      "building", "interactive media", "product launches", "notion power-user"
    ],
    learningResources: [
      {
        title: "Full Stack Open (University of Helsinki)",
        category: "LEARNING",
        url: "https://fullstackopen.com/en/",
        description: "World-class modern JavaScript and full-stack web development course.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["React", "Node", "GraphQL", "TypeScript"]
      },
      {
        title: "The Changelog / Syntax.fm",
        category: "CREATOR",
        url: "https://syntax.fm",
        description: "Deep dives into practical web architecture, UI craft, and framework evolution.",
        isFree: true,
        tier: "RECOMMENDED",
        tags: ["Podcasts", "Web Development", "DX"]
      }
    ],
    commonMisconceptions: [
      "Product engineering is just frontend styling without backend rigor",
      "Product engineers only follow Figma specs without influencing product direction"
    ],
    opportunityNotes: {
      indiaNotes: "The most consistently hired profile across early-stage seed/Series A startups and tier-1 product companies (Swiggy, Razorpay, CRED, Postman). High mobility into Founding Engineer roles.",
      globalNotes: "Companies like Linear, Vercel, Supabase, and Stripe treat Product Engineers as primary drivers of customer delight.",
      salaryEntryRange: "₹10L - ₹20L ($75k - $115k Global)",
      salaryMidRange: "₹24L - ₹45L ($135k - $210k Global)"
    }
  },
  {
    id: "game-developer",
    trackKey: "game-developer",
    name: "Game Developer / Game Systems Engineer",
    shortDescription: "Designs the rules, physics, state machines, and immersive interactive mechanics behind modern games and virtual worlds.",
    demandTier: "Differentiated",
    coreSkills: [
      "C# / C++",
      "Unity or Unreal Engine",
      "Game Loop & Physics Architecture",
      "Gameplay State Machines",
      "Shader Programming / HLSL",
      "Spatial Math & Vector Algebra",
      "Performance Profiling",
      "Game Feel & Juice"
    ],
    adjacentJobTitles: ["Gameplay Programmer", "Systems Designer", "Technical Game Designer"],
    typicalEntryRoles: ["Junior Gameplay Programmer", "Associate Unity Developer", "Technical Designer"],
    portfolioProjectTemplates: [
      {
        title: "ChronoDrift: 2D Kinetic Roguelike Combat Prototype",
        goal: "Build a tight 10-minute gameplay loop emphasizing mechanical feedback, particle juice, and procedural upgrade synergies.",
        features: ["Entity-component architecture", "Responsive input buffering", "Custom particle shaders"],
        techStack: ["Unity (C#) or Godot (GDScript/C#)", "Aseprite", "FMOD"],
        timelineWeeks: 4,
        difficulty: "Intermediate",
        whyFitReason: "Channels deep gaming literacy, competitive reflexes, and creative mechanics.",
        starterMilestones: [
          { milestone: "Core movement, dash physics, and hit-stop feel", dueWeek: 1 },
          { milestone: "State-driven enemy behavior tree and combat logic", dueWeek: 2 },
          { milestone: "Upgrade draft system with stat modifiers", dueWeek: 3 },
          { milestone: "Web export (WebGL) and itch.io launch with playable demo", dueWeek: 4 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "elden ring", "esports", "roguelikes", "anime fighting games",
      "competing", "kinesthetics", "level design", "speedrunning"
    ],
    learningResources: [
      {
        title: "Game Programming Patterns by Robert Nystrom",
        category: "LEARNING",
        url: "https://gameprogrammingpatterns.com",
        description: "Free web book covering the foundational architectural patterns in game development.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Architecture", "Patterns", "C++"]
      },
      {
        title: "GMTK (Game Maker's Toolkit)",
        category: "CREATOR",
        url: "https://youtube.com/@GMTK",
        description: "Masterful analysis of game design, mechanics, and cognitive player psychology.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Game Design", "Mechanics", "YouTube"]
      }
    ],
    commonMisconceptions: [
      "Liking games means you will automatically enjoy debugging physics frame collisions",
      "Only triple-A studios hire; indie games and interactive simulations are thriving spaces"
    ],
    opportunityNotes: {
      indiaNotes: "Surging ecosystem of mobile gaming giants (Dream11, Moonfrog, Nazara) alongside ambitious indie PC/console studios (Nodding Heads, SuperGaming, Dotemu partners).",
      globalNotes: "Highly competitive, but programmers with proven systems design and itch.io portfolios stand out dramatically over degree-only applicants.",
      salaryEntryRange: "₹8L - ₹18L ($65k - $100k Global)",
      salaryMidRange: "₹20L - ₹38L ($110k - $180k Global)"
    }
  },
  {
    id: "sports-analytics-engineer",
    trackKey: "sports-analytics-engineer",
    name: "Data Scientist / Sports Analytics Engineer",
    shortDescription: "Extracts predictive alpha and operational intelligence from high-velocity telemetry, event streams, and competitive performance data.",
    demandTier: "Differentiated",
    coreSkills: [
      "Python & R",
      "Pandas, Polars & DuckDB",
      "Expected Goals (xG) & Spatial Modeling",
      "Bayesian Inference & Regression",
      "Data Visualization (D3, Plotly)",
      "SQL Data Modeling",
      "ETL Pipelines",
      "Sports Domain Fluency"
    ],
    adjacentJobTitles: ["Performance Analyst", "Tactical Data Scientist", "Quantitative Sports Researcher"],
    typicalEntryRoles: ["Junior Sports Analyst", "Associate Data Scientist", "Quantitative Research Analyst"],
    portfolioProjectTemplates: [
      {
        title: "PressMetrics: Spatial Pressing & Pass Value in European Football",
        goal: "Model pass completion probability and off-the-ball pressing effectiveness using open StatsBomb event datasets.",
        features: ["Pitch coordinate heatmaps", "Pass value added metric (EPV)", "Interactive player radar charts"],
        techStack: ["Python", "Polars", "StatsBombPy", "Plotly", "Streamlit"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Directly rewards football obsessives who enjoy numbers, tactics, and visual storytelling.",
        starterMilestones: [
          { milestone: "Data ingestion & cleaning from StatsBomb free tier", dueWeek: 1 },
          { milestone: "Feature engineering: pitch zones, pressure distance, pitch velocity", dueWeek: 2 },
          { milestone: "Interactive dashboard publication and Twitter/Substack breakdown", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "premier league", "fantasy football", "moneyball", "formula 1 telemetry",
      "analyzing", "optimizing", "probability puzzles", "tactical threads"
    ],
    learningResources: [
      {
        title: "Friends of Tracking (YouTube / GitHub)",
        category: "LEARNING",
        url: "https://youtube.com/@FriendsofTracking",
        description: "Lectures by top club analysts (Barcelona, Liverpool, Hammarby) on tracking data science.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Football", "Data Science", "Tracking Data"]
      },
      {
        title: "StatsBomb Free Data & Open Academy",
        category: "LEARNING",
        url: "https://statsbomb.com/what-we-do/hub/free-data/",
        description: "Rich free event and 360 spatial data sets from major tournaments.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Datasets", "Football", "Analytics"]
      }
    ],
    commonMisconceptions: [
      "Sports analytics is just watching games and tweeting opinions",
      "You need insider connections to break in—public open data analyses on GitHub and Twitter regularly get people hired by pro clubs"
    ],
    opportunityNotes: {
      indiaNotes: "Booming growth around cricket analytics (IPL franchises, CricViz, SportsMechanics) and fantasy tech platforms (Dream11, MPL).",
      globalNotes: "European clubs, US franchises (NBA/NFL/MLS), and high-frequency sports betting syndicates actively recruit data scientists who understand competitive games.",
      salaryEntryRange: "₹8L - ₹18L ($70k - $110k Global)",
      salaryMidRange: "₹22L - ₹42L ($125k - $190k Global)"
    }
  },
  {
    id: "developer-tools-engineer",
    trackKey: "developer-tools-engineer",
    name: "Developer Tools Engineer",
    shortDescription: "Builds high-performance compilers, CLIs, SDKs, and workflow infrastructure that supercharge other software engineers.",
    demandTier: "Differentiated",
    coreSkills: [
      "Rust or Go",
      "TypeScript & Node Internals",
      "CLI Ergonomics & Terminal UI",
      "AST Manipulation & Compilers",
      "CI/CD Pipeline Architecture",
      "Benchmarking & Profiling",
      "Open Source Stewardship",
      "Documentation Craft"
    ],
    adjacentJobTitles: ["DevEx Engineer", "Infrastructure Engineer", "Platform Systems Developer"],
    typicalEntryRoles: ["Junior DevTools Engineer", "Platform Engineer", "Open Source Software Engineer"],
    portfolioProjectTemplates: [
      {
        title: "OrbitCLI: Blazing-Fast Microservice & Spec Mock Runner",
        goal: "Build a single-binary terminal tool in Rust or Go that instantly mocks APIs and parses OpenAPI specs with live hot-reloading.",
        features: ["Terminal UI with ink/bubbletea", "Zero-config schema inference", "Instant CLI flags"],
        techStack: ["Go or Rust", "Cobra/Clap", "Docker", "GitHub Actions"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Appeals to developers obsessed with ergonomics, efficiency, and craft over endless forms.",
        starterMilestones: [
          { milestone: "CLI command parser and config loader", dueWeek: 1 },
          { milestone: "Mock server with simulated latency and response generation", dueWeek: 2 },
          { milestone: "Homebrew formula, benchmark comparison, and README gif", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "open source", "terminal aesthetics", "neovim", "linux ricing",
      "optimizing", "building", "developer twitter", "automation"
    ],
    learningResources: [
      {
        title: "Writing An Interpreter In Go by Thorsten Ball",
        category: "LEARNING",
        url: "https://interpreterbook.com",
        description: "The gold standard book on lexing, parsing, and building developer tools.",
        isFree: false,
        tier: "RECOMMENDED",
        tags: ["Go", "Compilers", "Tools"]
      },
      {
        title: "Charm.sh Community (Bubble Tea & Lip Gloss)",
        category: "COMMUNITY",
        url: "https://charm.sh",
        description: "Community creating the most beautiful command line tools.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["CLI", "TUI", "Go", "Design"]
      }
    ],
    commonMisconceptions: [
      "Nobody pays for developer tools—modern developer infrastructure is one of the highest margin enterprise software segments",
      "Only senior 10x engineers can work on developer tools"
    ],
    opportunityNotes: {
      indiaNotes: "Home to global devtools champions (Postman, BrowserStack, Hasura, SigNoz). Rapidly hiring engineers with strong systems fundamentals.",
      globalNotes: "Extremely high leverage profile. Companies like Warp, Supabase, Cloudflare, and Docker heavily recruit open source contributors.",
      salaryEntryRange: "₹12L - ₹22L ($85k - $130k Global)",
      salaryMidRange: "₹26L - ₹50L ($150k - $230k Global)"
    }
  },
  {
    id: "creative-technologist",
    trackKey: "creative-technologist",
    name: "Creative Technologist",
    shortDescription: "Merges code, generative shaders, interactive sound, and digital art to build unforgettable experiential digital products.",
    demandTier: "Differentiated",
    coreSkills: [
      "Three.js / WebGL / WebGPU",
      "GLSL Shaders",
      "Canvas & SVG Manipulation",
      "Web Audio API",
      "Framer Motion & GSAP",
      "Creative Coding (p5.js / TouchDesigner)",
      "Typography & Aesthetic Layout",
      "Performance Tuning for 60fps"
    ],
    adjacentJobTitles: ["Interactive Developer", "WebGL Artist", "Creative Frontend Technologist"],
    typicalEntryRoles: ["Junior Creative Developer", "Interactive Web Developer", "UI Motion Designer"],
    portfolioProjectTemplates: [
      {
        title: "AudioWave: Synesthetic Real-Time Music Visualizer",
        goal: "Interactive 3D sound visualizer reacting dynamically to audio stems, frequency bands, and mouse physics.",
        features: ["Custom GLSL vertex shader distortion", "Web Audio frequency FFT analyzer", "Export as 4k video"],
        techStack: ["Next.js", "Three.js (React Three Fiber)", "GLSL", "Web Audio API"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Combines music taste, anime visual energy, and bleeding-edge web graphics.",
        starterMilestones: [
          { milestone: "Setup Three.js scene with audio microphone/file input", dueWeek: 1 },
          { milestone: "Write custom vertex and fragment shaders driven by frequency", dueWeek: 2 },
          { milestone: "Add interactive camera gestures, post-processing bloom, and live site", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "electronic music", "anime aesthetics", "cyberpunk visual design", "generative art",
      "designing", "exploring", "fashion", "music videos"
    ],
    learningResources: [
      {
        title: "Three.js Journey by Bruno Simon",
        category: "LEARNING",
        url: "https://threejs-journey.com",
        description: "The universally acclaimed masterclass for interactive 3D web experiences.",
        isFree: false,
        tier: "RECOMMENDED",
        tags: ["Three.js", "WebGL", "Shaders"]
      },
      {
        title: "The Book of Shaders",
        category: "LEARNING",
        url: "https://thebookofshaders.com",
        description: "Gentle step-by-step guide to fragment shaders and creative visual mathematics.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["GLSL", "Shaders", "Free"]
      }
    ],
    commonMisconceptions: [
      "Creative technology is just an art hobby with no commercial viability—high-end luxury brands, studios, and entertainment pay top dollar for interactive storytelling",
      "You have to choose between being an artist or a programmer"
    ],
    opportunityNotes: {
      indiaNotes: "Growing experiential studios in Mumbai and Bengaluru catering to entertainment, fashion, and tech launches (CRED, media agencies).",
      globalNotes: "International digital agencies (Active Theory, Resn, Studio Freight, Monopo) pay premium rates for WebGL and interactive frontends.",
      salaryEntryRange: "₹8L - ₹18L ($75k - $115k Global)",
      salaryMidRange: "₹22L - ₹40L ($130k - $200k Global)"
    }
  },
  {
    id: "cybersecurity-engineer",
    trackKey: "cybersecurity-engineer",
    name: "Cybersecurity Engineer",
    shortDescription: "Protects critical infrastructure, audits vulnerability vectors, and out-thinks adversaries through offensive and defensive security.",
    demandTier: "High Demand",
    coreSkills: [
      "Network Protocols (TCP/IP, HTTP/3)",
      "Linux System Internals",
      "Threat Modeling & OWASP Top 10",
      "Application Security (AppSec)",
      "Reverse Engineering Basics",
      "Cloud Security (AWS/GCP IAM)",
      "Python / Bash Scripting",
      "Adversarial Mindset"
    ],
    adjacentJobTitles: ["Application Security Engineer", "Penetration Tester", "Cloud Security Architect"],
    typicalEntryRoles: ["Associate Security Analyst", "Junior AppSec Engineer", "SOC Analyst"],
    portfolioProjectTemplates: [
      {
        title: "BreachHound: Automated CI/CD Secret & Vulnerability Auditing Action",
        goal: "GitHub action that scans pull requests for exposed tokens, AST security antipatterns, and misconfigured dependency permissions.",
        features: ["Entropy-based secret detection", "Semgrep custom rule runner", "Automated PR security scorecard"],
        techStack: ["Go or Python", "Semgrep", "GitHub Actions", "Docker"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Channels the investigative, mystery-solving, and protective mindset.",
        starterMilestones: [
          { milestone: "Build high-speed regex and entropy secret scanner", dueWeek: 1 },
          { milestone: "Integrate static AST taint analysis for web apps", dueWeek: 2 },
          { milestone: "Package as reusable GitHub Action with live demo repository", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "ctf competitions", "detective mystery fiction", "mr robot", "puzzle solving",
      "analyzing", "competing", "systems resilience", "curiosity"
    ],
    learningResources: [
      {
        title: "PortSwigger Web Security Academy",
        category: "LEARNING",
        url: "https://portswigger.net/web-security",
        description: "Completely free, high-quality interactive labs for modern web security and exploits.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Web Security", "Labs", "Burp Suite"]
      },
      {
        title: "OverTheWire Wargames",
        category: "LEARNING",
        url: "https://overthewire.org/wargames/",
        description: "Gamified SSH challenges teaching Linux command line and security mechanics.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Linux", "Wargame", "Hands-on"]
      }
    ],
    commonMisconceptions: [
      "You have to be an underground hacker to work in cybersecurity—most real-world impact is in AppSec, cloud hardening, and developer security tooling",
      "Certifications alone guarantee jobs; public CTF write-ups and tool contributions are far more compelling"
    ],
    opportunityNotes: {
      indiaNotes: "Massive talent gap across banking, fintech, healthcare, and enterprise software. Indian cyber defense centers of excellence are expanding rapidly.",
      globalNotes: "Zero-unemployment domain with extreme job security and high compensation across tech, aerospace, and defense sectors.",
      salaryEntryRange: "₹8L - ₹18L ($75k - $120k Global)",
      salaryMidRange: "₹22L - ₹45L ($135k - $215k Global)"
    }
  },
  {
    id: "startup-founder",
    trackKey: "startup-founder",
    name: "Startup Founder / Indie Hacker",
    shortDescription: "Combines product instinct, rapid shipping, storytelling, and distribution to build and monetize software businesses from scratch.",
    demandTier: "Founder",
    coreSkills: [
      "Rapid Full-Stack Prototyping",
      "Customer Discovery & Interviewing",
      "Growth & Viral Distribution",
      "Pricing & Unit Economics",
      "Copywriting & Storytelling",
      "Community Building",
      "Extreme Resourcefulness",
      "High Agency"
    ],
    adjacentJobTitles: ["Indie SaaS Builder", "Solopreneur", "Venture-Backed Founder", "Chief Product Officer"],
    typicalEntryRoles: ["Founding Engineer", "First Product Builder", "Growth Engineer"],
    portfolioProjectTemplates: [
      {
        title: "MicroSaaS: Niche Workflow Automation Tool with Live Stripe Billing",
        goal: "Build, launch, and acquire your first 5 paying users for a tight software utility solving an acute problem.",
        features: ["Stripe subscription checkout", "Magic-link auth", "Automated daily email or webhook report"],
        techStack: ["Next.js", "Tailwind CSS", "Prisma", "Stripe", "Resend"],
        timelineWeeks: 4,
        difficulty: "Intermediate",
        whyFitReason: "For ambitious students who want complete autonomy, ownership, and direct commercial feedback.",
        starterMilestones: [
          { milestone: "Customer interview problem validation & landing page waitlist", dueWeek: 1 },
          { milestone: "Core functional MVP built and tested with 3 pilot users", dueWeek: 2 },
          { milestone: "Stripe billing integration and security hardening", dueWeek: 3 },
          { milestone: "Launch on Product Hunt, Twitter, and niche Reddit communities", dueWeek: 4 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "indie hacking", "startups", "y combinator", "crypto / web3",
      "leading", "building", "high agency", "storytelling", "freedom"
    ],
    learningResources: [
      {
        title: "Y Combinator Startup School",
        category: "LEARNING",
        url: "https://startupschool.org",
        description: "Essential curriculum on ideation, talking to users, MVP building, and fundraising.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["YC", "Startups", "Founder"]
      },
      {
        title: "Indie Hackers Community & Podcasts",
        category: "COMMUNITY",
        url: "https://indiehackers.com",
        description: "Community of bootstrapped founders sharing verified revenue numbers and launch tactics.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Bootstrapping", "SaaS", "Community"]
      }
    ],
    commonMisconceptions: [
      "You need venture capital and millions in funding to start building a meaningful technology company",
      "Failure in an early startup destroys your resume—tech companies aggressively hire ex-founders for product and founding engineer roles"
    ],
    opportunityNotes: {
      indiaNotes: "India is the 3rd largest startup ecosystem globally. Strong angel syndicates, incubators (Antler, Surge, 100x.vc), and domestic customer bases.",
      globalNotes: "Uncapped upside, global distribution via Stripe and Twitter, and the ability to live anywhere while serving customers worldwide.",
      salaryEntryRange: "Variable / Equity / First ₹50k/mo MRR ($0 - $100k)",
      salaryMidRange: "Uncapped ($100k - $1M+ Equity Value)"
    }
  },
  {
    id: "ux-engineer",
    trackKey: "ux-engineer",
    name: "UX Engineer",
    shortDescription: "The vital link between design and code—specializing in accessible design systems, fluid micro-interactions, and interface ergonomics.",
    demandTier: "High Demand",
    coreSkills: [
      "Design Systems & Tokens",
      "Figma-to-Code Mastery",
      "Web Accessibility (WCAG 2.1 AA)",
      "Micro-animations (Framer Motion, CSS)",
      "Component Architecture (Radix, React Aria)",
      "State Machine UI Patterns",
      "User Testing & Ergonomics",
      "Visual Hierarchy"
    ],
    adjacentJobTitles: ["Design Systems Engineer", "UI Engineer", "Frontend Design Technologist"],
    typicalEntryRoles: ["Junior UX Engineer", "Associate Frontend Specialist", "Design Systems Developer"],
    portfolioProjectTemplates: [
      {
        title: "Prism: Open-Source Accessible Headless UI Component Kit",
        goal: "Build and publish a suite of highly accessible, keyboard-navigable React components with custom theme switcher and fluid transitions.",
        features: ["WAI-ARIA compliance", "Figma token syncing", "Interactive Storybook documentation"],
        techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "NPM Package"],
        timelineWeeks: 3,
        difficulty: "Intermediate",
        whyFitReason: "Perfect for students who care intensely about visual polish, tactile feel, and human usability.",
        starterMilestones: [
          { milestone: "Define design tokens and color scales with dark mode support", dueWeek: 1 },
          { milestone: "Build 5 core components (Modal, Command Palette, Select, Tabs, Tooltip)", dueWeek: 2 },
          { milestone: "Interactive documentation site and keyboard navigation showcase", dueWeek: 3 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "fashion and aesthetics", "japanese graphic design", "typography", "apple hardware",
      "designing", "optimizing", "craft", "notion / arc browser fans"
    ],
    learningResources: [
      {
        title: "Refactoring UI by Adam Wathan & Steve Schoger",
        category: "LEARNING",
        url: "https://refactoringui.com",
        description: "Practical UI design and layout wisdom written explicitly for developers.",
        isFree: false,
        tier: "RECOMMENDED",
        tags: ["UI", "Tailwind", "Design"]
      },
      {
        title: "Inclusive Components by Heydon Pickering",
        category: "LEARNING",
        url: "https://inclusive-components.design",
        description: "Masterclass on designing truly accessible web components that everyone can use.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["Accessibility", "HTML", "Ergonomics"]
      }
    ],
    commonMisconceptions: [
      "UX engineering is just styling buttons—it governs complex state management, internationalization, keyboard shortcuts, and performance",
      "Designers can do everything in Figma without needing an engineer who understands browser constraints"
    ],
    opportunityNotes: {
      indiaNotes: "Massive demand in premium consumer apps (CRED, Zepto, Swiggy) and enterprise design systems (Freshworks, Zoho).",
      globalNotes: "Companies like Figma, Airbnb, Stripe, and Apple hold UX Engineers in highest regard for product differentiation.",
      salaryEntryRange: "₹9L - ₹19L ($75k - $115k Global)",
      salaryMidRange: "₹22L - ₹42L ($130k - $200k Global)"
    }
  },
  {
    id: "quant-developer",
    trackKey: "quant-developer",
    name: "Quantitative Developer / Algorithmic Engineer",
    shortDescription: "Builds ultra-low-latency execution engines, algorithmic modeling backtests, and high-throughput order routing systems.",
    demandTier: "High Demand",
    coreSkills: [
      "Modern C++ (C++20) or Rust",
      "Data Structures & Cache-Friendly Algorithms",
      "Lock-Free Concurrency & Memory Models",
      "Network Socket Programming",
      "Backtesting Frameworks",
      "Time-Series Financial Data",
      "Mathematical Rigor & Statistics",
      "Hardware-Level Performance Profiling"
    ],
    adjacentJobTitles: ["Algorithmic Trading Engineer", "Low-Latency Software Engineer", "Quant Systems Specialist"],
    typicalEntryRoles: ["Junior Quantitative Developer", "Associate Systems Engineer", "Algorithmic Platform Developer"],
    portfolioProjectTemplates: [
      {
        title: "NanoMatch: Ultra-Fast In-Memory Limit Order Book",
        goal: "Build a lock-free limit order book engine in C++ or Rust capable of processing 1,000,000 orders/sec with p99 latency under 5 microseconds.",
        features: ["Price-time priority matching", "Benchmarked nanosecond latency timers", "WebSocket streaming interface"],
        techStack: ["C++20 or Rust", "Google Benchmark / Criterion", "WebSockets"],
        timelineWeeks: 4,
        difficulty: "Advanced",
        whyFitReason: "Directly rewards students fascinated by competitive gaming APM, algorithmic optimizations, and mathematical precision.",
        starterMilestones: [
          { milestone: "Core order book data structure with memory arenas", dueWeek: 1 },
          { milestone: "Order matching engine (Limit, Market, Cancel)", dueWeek: 2 },
          { milestone: "Microbenchmarking, cache-miss optimization, and flamegraph profiling", dueWeek: 3 },
          { milestone: "Interactive frontend visualizing live bid/ask order book depth", dueWeek: 4 }
        ]
      }
    ],
    culturalAffinityKeywords: [
      "competitive speedrunning", "high apm esports (starcraft, osu!)", "poker / chess theory", "systems optimization",
      "competing", "optimizing", "algorithmic math", "extreme performance"
    ],
    learningResources: [
      {
        title: "QuantStart Trading & Financial Engineering",
        category: "LEARNING",
        url: "https://quantstart.com",
        description: "Foundational guides on quantitative finance, algorithmic trading, and C++ design.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["C++", "Finance", "Trading"]
      },
      {
        title: "CppCon & Meeting C++ High-Frequency Trading Talks",
        category: "CREATOR",
        url: "https://youtube.com/@CppCon",
        description: "Top-tier conference recordings on cache lines, lock-free queues, and nanosecond latency.",
        isFree: true,
        tier: "ESSENTIAL",
        tags: ["C++", "Low Latency", "Architecture"]
      }
    ],
    commonMisconceptions: [
      "You have to be a finance major to get in—trading firms actively prefer computer science, physics, and competitive programming specialists",
      "Quant development is all about speculating on stocks; it is primarily high-performance systems engineering"
    ],
    opportunityNotes: {
      indiaNotes: "Top compensation in the country. Proprietary trading firms (Tower Research, Graviton, NK Securities, Jane Street, Optiver, Quadeye) recruit aggressively in India.",
      globalNotes: "Among the highest starting compensations in all of technology globally ($200k - $400k+ first-year packages in NYC, Chicago, London, Singapore).",
      salaryEntryRange: "₹25L - ₹60L ($150k - $250k Global)",
      salaryMidRange: "₹65L - ₹1.5Cr+ ($280k - $500k+ Global)"
    }
  }
];

export function getCareerTrackByKey(key: string): CareerTrackTaxonomy | undefined {
  return CAREER_TRACKS.find(t => t.trackKey === key || t.id === key);
}

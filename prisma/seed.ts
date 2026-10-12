import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding CareerDNA database...");

  // Clean existing demo user if present
  const demoEmail = "alex.chen@careerdna.ai";
  const existing = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existing) {
    await prisma.user.delete({
      where: { email: demoEmail },
    });
  }

  // Create demo student
  const demoUser = await prisma.user.create({
    data: {
      email: demoEmail,
      name: "Alex Chen",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      profile: {
        create: {
          educationLevel: "Undergraduate (3rd Year)",
          major: "Computer Science & Cognitive Minor",
          location: "Bengaluru, India",
          currentSkills: JSON.stringify(["Python", "JavaScript", "Basic React", "SQL", "Git"]),
          weeklyHours: 18,
          budgetConstraint: "Zero / Free only",
          careerConcerns: "I love games and football tactics, but I'm worried about breaking into saturated entry-level web developer jobs. I want to build things that feel intellectually exciting and have high market leverage.",
          githubUrl: "https://github.com/alexchen-dev",
          portfolioUrl: "https://alexchen.dev",
          resumeText: "Third-year CS student. Coursework: Algorithms, Systems, Database Management. Built a Discord bot for football live scores and a 2D platformer in Godot.",
          interests: {
            create: [
              { category: "games", name: "Elden Ring / Soulsborne", affinityWeight: 1.0 },
              { category: "games", name: "Speedrunning / Glitch Hunting", affinityWeight: 0.9 },
              { category: "football", name: "Premier League Tactics", affinityWeight: 1.0 },
              { category: "football", name: "Fantasy Sports & xG Analytics", affinityWeight: 0.95 },
              { category: "anime", name: "Attack on Titan", affinityWeight: 0.8 },
              { category: "tech", name: "Neovim & Terminal Ricing", affinityWeight: 0.85 },
              { category: "music", name: "Lo-Fi Beats & Ambient Sound", affinityWeight: 0.75 }
            ]
          }
        }
      }
    },
    include: {
      profile: {
        include: {
          interests: true
        }
      }
    }
  });

  console.log(`✅ Seeded demo user: ${demoUser.name} (${demoUser.email})`);
  console.log(`   Profile ID: ${demoUser.profile?.id}`);
  console.log(`   Interests seeded: ${demoUser.profile?.interests.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

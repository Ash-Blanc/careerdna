import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "markdown";

    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: {
        careerOption: true,
        items: { orderBy: { orderIndex: "asc" } },
        portfolioProjects: true,
        resources: true,
      },
    });

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    if (format === "markdown") {
      let md = `# ${roadmap.title}\n\n`;
      md += `> **Target Career:** ${roadmap.targetRole}  \n`;
      md += `> **Duration:** ${roadmap.totalDurationWeeks} Weeks  \n`;
      md += `> **Generated with:** CareerDNA & Qloo Taste Intelligence\n\n`;
      md += `## Strategic Vision\n${roadmap.summary}\n\n`;

      if (roadmap.portfolioProjects.length > 0) {
        const proj = roadmap.portfolioProjects[0];
        md += `## 🚀 Flagship Portfolio Project: ${proj.title}\n`;
        md += `**Goal:** ${proj.goal}\n\n`;
        md += `**Tech Stack:** ${(JSON.parse(proj.techStack) as string[]).join(", ")}\n\n`;
        md += `**Why It Fits You:** ${proj.whyFitReason}\n\n`;
        md += `**Core Features:**\n`;
        (JSON.parse(proj.features) as string[]).forEach((f) => {
          md += `- ${f}\n`;
        });
        md += `\n`;
      }

      md += `## 🗓️ 12-Week Sprint Timeline\n\n`;
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

      if (roadmap.resources.length > 0) {
        md += `## 📚 Recommended Free Resources & Communities\n\n`;
        roadmap.resources.forEach((r) => {
          md += `- **[${r.title}](${r.url})** (${r.category}) - ${r.description}\n`;
        });
      }

      return new NextResponse(md, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": `attachment; filename="careerdna-roadmap-${id.slice(-6)}.md"`,
        },
      });
    }

    // PDF / Printable HTML document
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${roadmap.title} - CareerDNA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #1e1b4b; border-bottom: 2px solid #4f46e5; padding-bottom: 8px; }
    h2 { color: #312e81; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
    h3 { color: #4338ca; margin-top: 20px; }
    .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .week-item { border-left: 3px solid #6366f1; padding-left: 12px; margin-bottom: 16px; }
    @media print {
      body { margin: 0; padding: 10px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px;">
    <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">
      🖨️ Print to PDF
    </button>
  </div>
  <h1>${roadmap.title}</h1>
  <p><span class="badge">Target: ${roadmap.targetRole}</span> <span class="badge">Duration: 12 Weeks</span></p>
  <p><strong>Overview:</strong> ${roadmap.summary}</p>

  ${
    roadmap.portfolioProjects[0]
      ? `
  <div class="card">
    <h2>Flagship Portfolio Project: ${roadmap.portfolioProjects[0].title}</h2>
    <p><strong>Mission:</strong> ${roadmap.portfolioProjects[0].goal}</p>
    <p><strong>Why It Fits:</strong> ${roadmap.portfolioProjects[0].whyFitReason}</p>
    <p><strong>Tech Stack:</strong> ${(JSON.parse(roadmap.portfolioProjects[0].techStack) as string[]).join(", ")}</p>
  </div>
  `
      : ""
  }

  <h2>Weekly Action Sprints</h2>
  ${roadmap.items
    .map(
      (item) => `
    <div class="week-item">
      <h3>Week ${item.weekNumber}: ${item.title}</h3>
      <p>${item.description}</p>
      <ul>
        ${(JSON.parse(item.deliverables) as string[]).map((d) => `<li>${d}</li>`).join("")}
      </ul>
    </div>
  `
    )
    .join("")}

  <h2>Curated Resources</h2>
  <ul>
    ${roadmap.resources.map((r) => `<li><strong>${r.title}</strong> (${r.category}) - ${r.description} <br><a href="${r.url}">${r.url}</a></li>`).join("")}
  </ul>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

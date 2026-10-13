import { NextRequest, NextResponse } from "next/server";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { CAREER_TRACKS, getCareerTrackByKey } from "@/lib/taxonomy/career-tracks";

// POST /api/portfolio/starter-repo
// Generates a real starter repo ZIP for the student. Pure server-side — no
// external deps. Body:
//   {
//     student: string,
//     trackKey: string,        // career track key, e.g. "ai-ml-engineer"
//     projectTitle?: string,   // overrides the track's first portfolio template
//   }
// The ZIP includes: README.md · package.json · src/index.{ts|py} · data/sample.json
// · docs/architecture.md · docs/careerfit.md · LICENSE

export const dynamic = "force-dynamic";

interface BodyShape {
  student?: string;
  trackKey?: string;
  projectTitle?: string;
}

function resolvePython(): string {
  // Prefer system python3 (has stdlib zipfile); fall back to python.
  for (const cmd of ["python3", "python"]) {
    try {
      const probe = spawnSync(cmd, ["-c", "import zipfile,sys,json; print(sys.version_info[0])"], {
        encoding: "utf-8",
        timeout: 2000,
      });
      if (probe.status === 0 && probe.stdout?.trim() === "3") return cmd;
    } catch {
      // try next
    }
  }
  return "python3";
}

export async function POST(req: NextRequest) {
  let body: BodyShape;
  try {
    body = (await req.json()) as BodyShape;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const trackKey = (body.trackKey ?? "ai-ml-engineer").trim();
  const track = getCareerTrackByKey(trackKey);
  if (!track) {
    return NextResponse.json(
      { error: `Unknown track key: ${trackKey}.`, availableKeys: CAREER_TRACKS.map((t) => t.trackKey) },
      { status: 400 }
    );
  }

  const projectTemplate =
    track.portfolioProjectTemplates.find((p) =>
      body.projectTitle ? p.title === body.projectTitle : true
    ) ?? track.portfolioProjectTemplates[0];
  if (!projectTemplate) {
    return NextResponse.json({ error: `Track ${trackKey} has no portfolio templates.` }, { status: 500 });
  }

  const spec = {
    student: body.student?.trim() || "Student",
    trackKey: track.trackKey,
    trackName: track.name,
    projectTitle: projectTemplate.title,
    projectGoal: projectTemplate.goal,
    features: projectTemplate.features,
    techStack: projectTemplate.techStack,
    milestones: projectTemplate.starterMilestones,
    salaryEntry: track.opportunityNotes.salaryEntryRange,
    salaryMid: track.opportunityNotes.salaryMidRange,
  };

  const scriptPath = path.join(process.cwd(), "scripts", "build_starter_zip.py");
  const py = resolvePython();
  const result = spawnSync(py, [scriptPath], {
    input: Buffer.from(JSON.stringify(spec), "utf-8"),
    timeout: 6000,
    maxBuffer: 4 * 1024 * 1024,
  });

  if (result.status !== 0) {
    return NextResponse.json(
      {
        error: "Starter repo generator failed.",
        stderr: result.stderr?.toString("utf-8") ?? "",
        status: result.status,
      },
      { status: 500 }
    );
  }

  const zipBytes = result.stdout;
  if (!zipBytes || zipBytes.length < 100) {
    return NextResponse.json(
      {
        error: "Empty starter repo from generator.",
        stderr: result.stderr?.toString("utf-8") ?? "",
      },
      { status: 500 }
    );
  }

  const safeTitle = spec.projectTitle.toLowerCase().replace(/\s+/g, "-");
  const filename = `${trackKey}-${safeTitle}.zip`;

  return new NextResponse(zipBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(zipBytes.length),
      "Cache-Control": "no-store",
    },
  });
}

export async function GET() {
  return NextResponse.json({
    description: "POST a body to receive a real starter-repo ZIP archive.",
    method: "POST",
    body: {
      student: "Your Name",
      trackKey: "ai-ml-engineer",
      projectTitle: "Optional exact title (defaults to first template)",
    },
    availableTracks: CAREER_TRACKS.map((t) => ({ key: t.trackKey, name: t.name })),
  });
}

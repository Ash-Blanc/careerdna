import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

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

    return NextResponse.json({ success: true, roadmap });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.roadmap.update({
      where: { id },
      data: {
        title: body.title,
        summary: body.summary,
      },
    });

    return NextResponse.json({ success: true, roadmap: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.roadmap.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Roadmap deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

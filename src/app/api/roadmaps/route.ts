import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "alex.chen@careerdna.ai";

    const user = await prisma.user.findFirst({
      where: { OR: [{ id: userId }, { email: userId }] },
      include: {
        profile: {
          include: {
            roadmaps: {
              include: {
                careerOption: true,
                items: { orderBy: { orderIndex: "asc" } },
                portfolioProjects: true,
              },
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });

    const roadmaps = user?.profile?.roadmaps || [];

    return NextResponse.json({
      success: true,
      roadmaps,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

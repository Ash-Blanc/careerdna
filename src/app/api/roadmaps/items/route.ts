import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { itemId, status, title, description, deliverables } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "itemId is required" }, { status: 400 });
    }

    const updated = await prisma.roadmapItem.update({
      where: { id: itemId },
      data: {
        status: status || undefined,
        title: title || undefined,
        description: description || undefined,
        deliverables: deliverables ? JSON.stringify(deliverables) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      item: {
        ...updated,
        deliverables: JSON.parse(updated.deliverables),
        resources: JSON.parse(updated.resources),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

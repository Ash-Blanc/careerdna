import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { qlooClient } from "@/lib/qloo/client";

export async function GET() {
  let dbOk = false;
  let userCount = 0;

  try {
    userCount = await prisma.user.count();
    dbOk = true;
  } catch (err) {
    console.error("Health check DB error:", err);
  }

  const qlooConfigured = qlooClient.isConfigured();

  return NextResponse.json({
    status: dbOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    database: {
      connected: dbOk,
      userCount,
    },
    qloo: {
      mode: qlooConfigured ? "live" : "fallback",
      configured: qlooConfigured,
      note: qlooConfigured ? "Live Qloo Taste Graph Active" : "Local cultural intelligence fallback active",
    },
    tambo: {
      mode: process.env.NEXT_PUBLIC_TAMBO_MODE || "self-hosted",
      runtime: "Tambo AG-UI Generative Engine",
      registeredComponents: 10,
    },
  });
}

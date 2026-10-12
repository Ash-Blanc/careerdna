import { NextRequest, NextResponse } from "next/server";
import { executeTool } from "@/lib/agent/tool-executors";
import { SaveUserProfileInputSchema } from "@/lib/agent/tools";

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const parsed = SaveUserProfileInputSchema.parse(raw);

    const result = await executeTool("save_user_profile", parsed);

    return NextResponse.json({
      success: true,
      profileId: result.profileId,
      message: "Onboarding completed successfully. Ready for career taste coach.",
    });
  } catch (error: any) {
    console.error("[Onboarding API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save onboarding data" },
      { status: 400 }
    );
  }
}

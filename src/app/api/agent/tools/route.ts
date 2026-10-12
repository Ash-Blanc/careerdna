import { NextRequest, NextResponse } from "next/server";
import { executeTool } from "@/lib/agent/tool-executors";

export async function POST(req: NextRequest) {
  try {
    const { toolName, args } = await req.json();

    if (!toolName) {
      return NextResponse.json({ error: "toolName is required" }, { status: 400 });
    }

    const result = await executeTool(toolName, args);
    return NextResponse.json({ success: true, toolName, result });
  } catch (error: any) {
    console.error(`[Tool Execution Error] ${error.message}`);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

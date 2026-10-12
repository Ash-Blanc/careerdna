import { NextRequest, NextResponse } from "next/server";
import { agentOrchestrator } from "@/lib/agent/agent-orchestrator";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { threadId = "default-thread", userId = "alex.chen@careerdna.ai", messages = [], directAction } = body;

    // Load or create thread
    let thread = await prisma.chatThread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      // Find or create user
      const user = await prisma.user.upsert({
        where: { email: userId.includes("@") ? userId : "alex.chen@careerdna.ai" },
        update: {},
        create: {
          email: userId.includes("@") ? userId : "alex.chen@careerdna.ai",
          name: "Career Explorer",
        },
      });

      thread = await prisma.chatThread.create({
        data: {
          id: threadId,
          userId: user.id,
          title: "Career Strategy Session",
        },
      });
    }

    // Save latest user message to DB if present
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === "user") {
      await prisma.message.create({
        data: {
          threadId: thread.id,
          role: "user",
          content: lastUserMessage.content,
        },
      });
    }

    // Run agent orchestrator
    const emittedMessages: Array<{
      id: string;
      role: "assistant";
      content: string;
      componentSpec?: any;
      createdAt: string;
    }> = [];

    const stream = agentOrchestrator.run({
      threadId: thread.id,
      userId,
      messages,
      directAction,
    });

    let currentText = "";

    for await (const chunk of stream) {
      if (chunk.type === "text" && chunk.text) {
        currentText += chunk.text;
      } else if (chunk.type === "component" && chunk.componentSpec) {
        // If we have accumulated text, flush it as an assistant message
        if (currentText.trim()) {
          const textMsg = {
            id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            role: "assistant" as const,
            content: currentText,
            createdAt: new Date().toISOString(),
          };
          emittedMessages.push(textMsg);

          await prisma.message.create({
            data: {
              threadId: thread.id,
              role: "assistant",
              content: currentText,
            },
          });
          currentText = "";
        }

        // Add component message
        const compMsg = {
          id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "assistant" as const,
          content: "",
          componentSpec: chunk.componentSpec,
          createdAt: new Date().toISOString(),
        };
        emittedMessages.push(compMsg);

        await prisma.message.create({
          data: {
            threadId: thread.id,
            role: "assistant",
            content: `[Tambo Component: ${chunk.componentSpec.component}]`,
            componentSpec: JSON.stringify(chunk.componentSpec),
          },
        });
      }
    }

    // Flush any remaining text
    if (currentText.trim()) {
      const textMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "assistant" as const,
        content: currentText,
        createdAt: new Date().toISOString(),
      };
      emittedMessages.push(textMsg);

      await prisma.message.create({
        data: {
          threadId: thread.id,
          role: "assistant",
          content: currentText,
        },
      });
    }

    return NextResponse.json({
      success: true,
      threadId: thread.id,
      messages: emittedMessages,
    });
  } catch (error: any) {
    console.error("[Agent Chat API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process agent message",
      },
      { status: 500 }
    );
  }
}

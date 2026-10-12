"use client";

import React, { useState, useEffect, useRef } from "react";
import { TamboHostProvider, useTamboHost } from "@/components/tambo/TamboHostProvider";
import { Sparkles, Send, Dna, RotateCcw, Bot, User, ArrowDown } from "lucide-react";

function CoachChatInterface() {
  const { messages, isStreaming, sendMessage, resetThread, renderComponent } = useTamboHost();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Initial trigger if conversation is empty
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage("Hello CareerDNA! I've completed onboarding and I'm ready to explore my taste profile and career directions.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    const text = input.trim();
    setInput("");
    await sendMessage(text);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col bg-neutral-950">
      {/* Session Header */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-950/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20">
            <Dna className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              CareerDNA Agent Session
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            </h2>
            <p className="text-[11px] text-neutral-400">Cultural Taste Stratum · Tambo Generative UI Active</p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetThread}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          title="Restart Session"
        >
          <RotateCcw className="h-3 w-3" />
          <span className="hidden sm:inline">Reset Session</span>
        </button>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-full`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[11px] font-semibold text-neutral-500">
                  {isUser ? "You" : "CareerDNA Strategist"}
                </span>
              </div>

              {/* Text narrative balloon if present */}
              {msg.content && (
                <div
                  className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed max-w-2xl ${
                    isUser
                      ? "bg-indigo-600 text-white font-medium rounded-tr-sm shadow-md shadow-indigo-600/20"
                      : "bg-neutral-900/90 text-neutral-200 border border-neutral-800/80 rounded-tl-sm shadow-lg"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              )}

              {/* Tambo Generative UI Component Render */}
              {msg.componentSpec && (
                <div className="w-full mt-2">
                  {renderComponent(msg.componentSpec)}
                </div>
              )}
            </div>
          );
        })}

        {/* Skeleton while streaming */}
        {isStreaming && (
          <div className="flex items-center gap-3 rounded-2xl bg-neutral-900/60 p-4 border border-neutral-800 max-w-md animate-pulse">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="text-xs text-neutral-400">
              Agent is computing cultural affinities & rendering generative UI...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-neutral-850/60 bg-neutral-950/40">
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider shrink-0 mr-1">
          Quick Actions:
        </span>
        {[
          { label: "🗺️ Explore Career Taste Map", prompt: "Show me my Career Taste Map with 5 ranked directions" },
          { label: "⚖️ Compare Career Trade-offs", prompt: "Show me the comparison table of my recommended career paths" },
          { label: "📚 Free Learning Resources", prompt: "Find me the best free learning resources and communities" },
          { label: "🔍 Deep Dive Reality Check", prompt: "Give me a deep dive into day-to-day work, entry roles, and salary realities" },
          { label: "🧬 Refresh Cultural Profile", prompt: "Show my taste profile and cultural affinities" },
        ].map((chip, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isStreaming}
            onClick={() => sendMessage(chip.prompt)}
            className="rounded-lg bg-neutral-900 border border-neutral-800 hover:border-indigo-500/40 hover:bg-neutral-850 px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white transition-all whitespace-nowrap disabled:opacity-40"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="border-t border-neutral-800/80 bg-neutral-950/90 p-4 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            placeholder="Ask about trade-offs, explore another path, or refine your taste profile..."
            className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/90 py-3.5 pl-4 pr-12 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
          />

          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all shadow-md shadow-indigo-600/30"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 px-1">
          <span>Tip: Click "Select Path" on any card above to generate a 30/60/90-day roadmap</span>
          <span>Tambo Generative Engine</span>
        </div>
      </div>
    </div>
  );
}

export default function CoachPage() {
  return (
    <TamboHostProvider threadId="alex-session-1" userId="alex.chen@careerdna.ai">
      <CoachChatInterface />
    </TamboHostProvider>
  );
}

"use client";

import React, { useState } from "react";
import { FollowUpQuestionCardProps, FollowUpQuestionCardPropsSchema } from "./registry";
import { HelpCircle, Send, Sparkles } from "lucide-react";
import { useTamboHost } from "./TamboHostProvider";
import { SpotlightCard } from "@/components/ui/21st/SpotlightCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FollowUpQuestionCard(rawProps: FollowUpQuestionCardProps) {
  const result = FollowUpQuestionCardPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;
  const { sendMessage } = useTamboHost();

  const [customText, setCustomText] = useState("");
  const [answered, setAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  if (!props) return null;

  const options = Array.isArray(props?.options) ? props.options : [];

  const handleSelectOption = (option: { id: string; text: string }) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOptionId(option.id);
    sendMessage(option.text);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() || answered) return;
    setAnswered(true);
    sendMessage(customText.trim());
    setCustomText("");
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(99, 102, 241, 0.2)"
      className="my-5 border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 via-neutral-900 to-neutral-950 p-5 shadow-xl backdrop-blur-md"
    >
      {/* Context Badge & Question */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
          <HelpCircle className="h-4 w-4" />
        </div>
        <div>
          {props.contextReason && (
            <span className="text-[11px] font-medium text-indigo-300 block mb-0.5">
              Targeted Inquiry: {props.contextReason}
            </span>
          )}
          <h4 className="text-sm font-semibold text-white leading-snug">{props.question}</h4>
        </div>
      </div>

      {/* Selectable Answer Chips */}
      <div className="flex flex-col gap-2 mt-4">
        {options.map((opt) => {
          const isChosen = selectedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={answered}
              onClick={() => handleSelectOption(opt)}
              className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                isChosen
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : answered
                  ? "border-neutral-800 bg-neutral-900/40 text-neutral-500 opacity-60"
                  : "border-neutral-800 bg-neutral-900/70 text-neutral-200 hover:border-indigo-500/40 hover:bg-neutral-850 hover:text-white"
              }`}
            >
              <span>{opt.text}</span>
              <Sparkles className="h-3.5 w-3.5 opacity-50 shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Free Text Input (if allowed) */}
      {props.allowCustom && !answered && (
        <form onSubmit={handleCustomSubmit} className="mt-3.5 flex gap-2">
          <Input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Or share custom thought..."
            className="flex-1 text-xs"
          />
          <Button
            type="submit"
            disabled={!customText.trim()}
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      )}
    </SpotlightCard>
  );
}

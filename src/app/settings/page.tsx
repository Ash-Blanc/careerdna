"use client";

import React, { useState } from "react";
import { Settings, Key, User, Shield, Terminal, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [qlooKey, setQlooKey] = useState("");
  const [llmProvider, setLlmProvider] = useState("gemini");
  const [tamboMode, setTamboMode] = useState("self-hosted");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">System Preferences</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Settings & Integrations</h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Configure API credentials, cultural intelligence parameters, and self-hosted Tambo options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Account Info */}
        <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
            <User className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Student Account</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1.5 font-medium">Email</label>
              <Input
                type="email"
                disabled
                value="alex.chen@careerdna.ai"
                className="cursor-not-allowed text-neutral-400 bg-neutral-950/40"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1.5 font-medium">Name</label>
              <Input
                type="text"
                disabled
                value="Alex Chen"
                className="cursor-not-allowed text-neutral-400 bg-neutral-950/40"
              />
            </div>
          </div>
        </div>

        {/* Qloo Cultural Intelligence Configuration */}
        <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
            <Key className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Cultural Intelligence API</h2>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-neutral-400 leading-relaxed">
              When a Qloo API key is provided in <code className="text-indigo-300 font-mono">.env</code> or below, live affinity
              queries are made against the Qloo Taste Graph. If empty or offline, CareerDNA automatically runs in
              resilient degraded fallback mode.
            </p>

            <div>
              <label className="block text-neutral-300 mb-1.5 font-medium">API Key</label>
              <Input
                type="password"
                value={qlooKey}
                onChange={(e) => setQlooKey(e.target.value)}
                placeholder="ql_live_..."
                className="font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Tambo Generative UI Configuration */}
        <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Generative UI Engine Runtime</h2>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-neutral-400 leading-relaxed">
              This application runs with the open-source self-hosted Tambo
              generative UI engine registered directly with your Next.js backend.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 mb-1.5 font-medium">Tambo Mode</label>
                <Select value={tamboMode} onValueChange={setTamboMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tambo mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-hosted">Self-Hosted / Open-Source Engine</SelectItem>
                    <SelectItem value="custom-server">Custom Server Endpoint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1.5 font-medium">LLM Provider</label>
                <Select value={llmProvider} onValueChange={setLlmProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select LLM provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini (Gemini 1.5 Pro)</SelectItem>
                    <SelectItem value="openai">OpenAI (GPT-4o)</SelectItem>
                    <SelectItem value="anthropic">Anthropic (Claude 3.5 Sonnet)</SelectItem>
                    <SelectItem value="mock">Local Deterministic Evaluator (Zero-Config)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Preferences saved!
            </span>
          ) : (
            <div />
          )}

          <Button type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}

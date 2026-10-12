"use client";

import React, { useState } from "react";
import { Settings, Key, User, Shield, Terminal, CheckCircle2 } from "lucide-react";

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
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
            <User className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Student Account</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Email</label>
              <input
                type="email"
                disabled
                value="alex.chen@careerdna.ai"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3.5 py-2.5 text-neutral-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Name</label>
              <input
                type="text"
                disabled
                value="Alex Chen"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3.5 py-2.5 text-neutral-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Qloo Cultural Intelligence Configuration */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
            <Key className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Qloo Cultural Intelligence API</h2>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-neutral-400 leading-relaxed">
              When a Qloo API key is provided in <code className="text-indigo-300">.env</code> or below, live affinity
              queries are made against the Qloo Taste Graph. If empty or offline, CareerDNA automatically runs in
              resilient degraded fallback mode.
            </p>

            <div>
              <label className="block text-neutral-300 mb-1 font-medium">Qloo API Key</label>
              <input
                type="password"
                value={qlooKey}
                onChange={(e) => setQlooKey(e.target.value)}
                placeholder="ql_live_..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tambo Generative UI Configuration */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Tambo Generative UI Runtime</h2>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-neutral-400 leading-relaxed">
              Since Tambo Cloud is shutting down, this application runs with the open-source self-hosted Tambo
              generative UI engine registered directly with your Next.js backend.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Tambo Mode</label>
                <select
                  value={tamboMode}
                  onChange={(e) => setTamboMode(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="self-hosted">Self-Hosted / Open-Source Engine</option>
                  <option value="custom-server">Custom Server Endpoint</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">LLM Provider</label>
                <select
                  value={llmProvider}
                  onChange={(e) => setLlmProvider(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="gemini">Google Gemini (Gemini 1.5 Pro)</option>
                  <option value="openai">OpenAI (GPT-4o)</option>
                  <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                  <option value="mock">Local Deterministic Evaluator (Zero-Config)</option>
                </select>
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

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

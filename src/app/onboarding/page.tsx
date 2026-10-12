"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INTEREST_CATEGORIES, InterestItem } from "@/lib/taxonomy/interest-categories";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Compass,
  FileText,
  User,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1: Basic Info
  const [educationLevel, setEducationLevel] = useState("Undergraduate (3rd/4th Year)");
  const [major, setMajor] = useState("Computer Science & Engineering");
  const [location, setLocation] = useState("Bengaluru, India");
  const [skillsInput, setSkillsInput] = useState("Python, JavaScript, React, SQL, Git");
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [budgetConstraint, setBudgetConstraint] = useState("Zero / Free only");
  const [careerConcerns, setCareerConcerns] = useState(
    "Worried about generic web dev competition. Want to work on hard systems and differentiated domains."
  );

  // Step 2: Context
  const [githubUrl, setGithubUrl] = useState("https://github.com/alexchen-dev");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeText, setResumeText] = useState(
    "CS undergraduate student. Completed data structures, computer networks, and operating systems coursework. Built small open-source Discord and terminal tools."
  );

  // Step 3: Interests Selection
  const [selectedInterests, setSelectedInterests] = useState<
    Array<{ category: string; name: string; isCustom?: boolean }>
  >([
    { category: "games", name: "Elden Ring / Soulsborne" },
    { category: "games", name: "Speedrunning / Glitch Hunting" },
    { category: "football", name: "Premier League Tactics" },
    { category: "tech", name: "Neovim & Terminal Ricing" },
  ]);

  const [activeCategoryTab, setActiveCategoryTab] = useState(INTEREST_CATEGORIES[0]?.id || "games");
  const [customInterestName, setCustomInterestName] = useState("");

  const toggleInterest = (category: string, name: string) => {
    const exists = selectedInterests.some((i) => i.name === name);
    if (exists) {
      setSelectedInterests(selectedInterests.filter((i) => i.name !== name));
    } else {
      setSelectedInterests([...selectedInterests, { category, name, isCustom: false }]);
    }
  };

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInterestName.trim()) return;
    setSelectedInterests([
      ...selectedInterests,
      { category: activeCategoryTab, name: customInterestName.trim(), isCustom: true },
    ]);
    setCustomInterestName("");
  };

  const removeInterest = (name: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i.name !== name));
  };

  const handleSubmit = async () => {
    if (selectedInterests.length < 2) {
      setErrorMsg("Please select at least 2 interests so the cultural intelligence engine has sufficient signals.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const skillsArray = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        userId: "alex.chen@careerdna.ai",
        educationLevel,
        major,
        location,
        currentSkills: skillsArray,
        weeklyHours: Number(weeklyHours),
        budgetConstraint,
        careerConcerns,
        githubUrl: githubUrl || undefined,
        portfolioUrl: portfolioUrl || undefined,
        resumeText: resumeText || undefined,
        interests: selectedInterests,
      };

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect directly to coach session
        router.push("/coach");
      } else {
        setErrorMsg(data.error || "Failed to save profile");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error submitting profile");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCategory = INTEREST_CATEGORIES.find((c) => c.id === activeCategoryTab) || INTEREST_CATEGORIES[0]!;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Step {currentStep} of 3</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Student Cultural & Context Intake</h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg mx-auto">
          Takes under 2 minutes. We translate your lifestyle, background, and cultural taste into career strategy.
        </p>

        {/* Stepper Progress */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                currentStep === step
                  ? "w-10 bg-indigo-500"
                  : currentStep > step
                  ? "w-6 bg-emerald-500"
                  : "w-6 bg-neutral-800"
              }`}
            />
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Basic Info */}
      {currentStep === 1 && (
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <User className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Academic Background & Weekly Constraints</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Education Level</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Undergraduate (1st/2nd Year)</option>
                <option>Undergraduate (3rd/4th Year)</option>
                <option>Graduate / Master's Student</option>
                <option>High School Senior</option>
                <option>Bootcamp Graduate</option>
                <option>Self-Taught / Career Switcher</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Major or Primary Field</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. Computer Science, Mechanical, Design, Economics"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Current Location (City, Country)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India or Remote / Global"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Weekly Available Hours ({weeklyHours} hrs/week)
              </label>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-indigo-500 mt-2"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                <span>5 hrs (Casual)</span>
                <span>15 hrs (Recommended)</span>
                <span>40 hrs (Full-time)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Budget Constraints</label>
              <select
                value={budgetConstraint}
                onChange={(e) => setBudgetConstraint(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Zero / Free only</option>
                <option>Low (&lt;$30/month for APIs or tools)</option>
                <option>Moderate (Can purchase key textbooks or courses)</option>
                <option>Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Current Technical Skills (Comma-separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, React, Git, SQL..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">What are your biggest career anxieties or goals?</label>
            <textarea
              rows={3}
              value={careerConcerns}
              onChange={(e) => setCareerConcerns(e.target.value)}
              placeholder="e.g. I hate building boring CRUD apps, want high ownership, worried about AI replacing entry coders..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all"
            >
              <span>Next: Links & Context</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Optional Context & Portfolio */}
      {currentStep === 2 && (
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <FileText className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Digital Footprint & Experience (Optional)</h2>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Sharing your GitHub or resume allows the agent to identify existing skill foundations and avoid
            recommending beginner tutorials for topics you already know.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">GitHub Profile Link</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Personal Portfolio or Blog URL</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourname.dev"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Resume Summary or Key Projects</label>
            <textarea
              rows={4}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste bullet points of recent projects, hackathons, or coursework..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all"
            >
              <span>Next: Cultural Passions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Cultural Taste Intake */}
      {currentStep === 3 && (
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-pink-400" />
              <h2 className="text-sm font-semibold text-white">Select Your Cultural Passions & Obsessions</h2>
            </div>
            <div className="text-xs text-indigo-400 font-semibold">{selectedInterests.length} Selected</div>
          </div>

          {/* Selected chips bar */}
          {selectedInterests.length > 0 && (
            <div className="rounded-2xl bg-neutral-950/70 p-3.5 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-2">
                Your Cultural DNA Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedInterests.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 text-xs font-medium text-indigo-200"
                  >
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(item.name)}
                      className="text-neutral-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-neutral-800/60">
            {INTEREST_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryTab(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategoryTab === cat.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Category Chips */}
          <div>
            <p className="text-xs text-neutral-400 mb-3">{activeCategory.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeCategory.presetChips.map((chip) => {
                const isSelected = selectedInterests.some((i) => i.name === chip.name);

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => toggleInterest(chip.category, chip.name)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-950/40 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500"
                        : "border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{chip.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{chip.culturalSignals.slice(0, 2).join(" · ")}</div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Interest input */}
            <form onSubmit={addCustomInterest} className="mt-4 flex gap-2">
              <input
                type="text"
                value={customInterestName}
                onChange={(e) => setCustomInterestName(e.target.value)}
                placeholder={`Add custom interest in ${activeCategory.label.toLowerCase()}...`}
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!customInterestName.trim()}
                className="flex items-center gap-1 rounded-xl bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:scale-102 transition-all disabled:opacity-50"
            >
              <span>{submitting ? "Analyzing Cultural DNA..." : "Launch CareerDNA Coach"}</span>
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

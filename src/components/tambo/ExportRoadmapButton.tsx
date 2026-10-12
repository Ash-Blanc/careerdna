"use client";

import React, { useState } from "react";
import { ExportRoadmapButtonProps, ExportRoadmapButtonPropsSchema } from "./registry";
import { Download, FileText, Printer, Check } from "lucide-react";

export function ExportRoadmapButton(rawProps: ExportRoadmapButtonProps) {
  const result = ExportRoadmapButtonPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  const [downloadingMd, setDownloadingMd] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!props?.roadmapId) return null;

  const handleDownloadMarkdown = async () => {
    try {
      setDownloadingMd(true);
      const res = await fetch(`/api/roadmaps/${props.roadmapId}/export?format=markdown`);
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([data.content || ""], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.filename || `careerdna-roadmap-${props.roadmapId}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
      }
    } catch (e) {
      console.error("Markdown export error:", e);
    } finally {
      setDownloadingMd(false);
    }
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    window.open(`/api/roadmaps/${props.roadmapId}/export?format=pdf`, "_blank");
    setDownloadingPdf(false);
  };

  return (
    <div className="my-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 className="text-xs font-semibold text-white">Save & Take Your Roadmap</h4>
        <p className="text-[11px] text-neutral-400">Export as clean Markdown for your Obsidian/Notion, or print as PDF</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownloadMarkdown}
          disabled={downloadingMd}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all disabled:opacity-50"
        >
          {downloaded ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileText className="h-3.5 w-3.5" />}
          <span>{downloadingMd ? "Exporting..." : "Markdown"}</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>
    </div>
  );
}

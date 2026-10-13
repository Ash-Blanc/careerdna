"use client";

import React, { useState } from "react";
import { ExportRoadmapButtonProps, ExportRoadmapButtonPropsSchema } from "./registry";
import { FileText, Printer, Check, Download, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportRoadmapButton(rawProps: ExportRoadmapButtonProps) {
  const result = ExportRoadmapButtonPropsSchema.safeParse(rawProps);
  const props = result.success ? result.data : rawProps;

  const [downloadingMd, setDownloadingMd] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingStarter, setDownloadingStarter] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const roadmapId = props?.roadmapId || "roadmap-1";
  const trackKey = props?.trackKey;
  const projectTitle = props?.projectTitle;

  const handleDownloadMarkdown = async () => {
    try {
      setDownloadingMd(true);
      const res = await fetch(`/api/roadmaps/${roadmapId}/export?format=markdown`);
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([data.content || ""], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.filename || `careerdna-roadmap-${roadmapId}.md`;
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
    window.open(`/api/roadmaps/${roadmapId}/export?format=pdf`, "_blank");
    setDownloadingPdf(false);
  };

  const handleDownloadStarterRepo = async () => {
    if (!trackKey) return;
    try {
      setDownloadingStarter(true);
      const res = await fetch("/api/portfolio/starter-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: "CareerDNA Student",
          trackKey,
          projectTitle: projectTitle || undefined,
        }),
      });
      if (!res.ok) throw new Error(`ZIP build failed (${res.status}).`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${trackKey}-starter.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (e) {
      console.error("Starter repo download error:", e);
    } finally {
      setDownloadingStarter(false);
    }
  };

  return (
    <div className="my-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h4 className="text-xs font-semibold text-white">Save & Take Your Roadmap</h4>
        <p className="text-[11px] text-neutral-400">
          Markdown/PDF for applications, plus a real starter-repo ZIP for your portfolio.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDownloadMarkdown}
          disabled={downloadingMd}
          className="flex items-center gap-1.5 text-xs"
        >
          {downloaded ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileText className="h-3.5 w-3.5" />}
          <span>{downloadingMd ? "Exporting..." : "Markdown"}</span>
        </Button>

        <Button
          type="button"
          variant="gradient"
          size="sm"
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          className="flex items-center gap-1.5 text-xs shadow-md shadow-indigo-600/20"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Print / PDF</span>
        </Button>

        {trackKey && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadStarterRepo}
            disabled={downloadingStarter}
            className="flex items-center gap-1.5 text-xs border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/30 hover:text-emerald-200"
          >
            {downloadingStarter ? (
              <Download className="h-3.5 w-3.5 animate-pulse" />
            ) : (
              <FolderGit2 className="h-3.5 w-3.5" />
            )}
            <span>{downloadingStarter ? "Building ZIP..." : "Starter Repo ZIP"}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

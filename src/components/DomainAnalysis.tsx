// NEW: Domain Analysis panel
import { Target } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";

const severityColors: Record<string, string> = {
  Low: "bg-success/10 text-success border-success/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  High: "bg-danger/10 text-danger border-danger/30",
};

export default function DomainAnalysis({ result }: { result: AnalysisResult }) {
  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Target className="h-5 w-5 text-primary" /> Domain Analysis
      </h3>
      <div className="space-y-3">
        {result.domains.map((d, i) => (
          <div key={i} className="rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{d.name}</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${severityColors[d.severity]}`}>{d.severity}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{d.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

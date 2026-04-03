// NEW: Trust Analyzer panel
import { Shield, AlertTriangle, Eye } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";

function RiskMeter({ score }: { score: number }) {
  const color = score < 33 ? "bg-success" : score < 66 ? "bg-warning" : "bg-danger";
  const label = score < 33 ? "Safe" : score < 66 ? "Caution" : "Danger";
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Risk Score</span>
        <span className="font-semibold">{score}/100 — {label}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-secondary">
        <div className={`h-3 rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function TrustAnalyzer({ result }: { result: AnalysisResult }) {
  const { trustAnalysis } = result;
  const flagColors: Record<string, string> = {
    spam: "border-danger/50 bg-danger/10 text-danger",
    manipulation: "border-warning/50 bg-warning/10 text-warning",
    info: "border-info/50 bg-info/10 text-info",
  };

  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Shield className="h-5 w-5 text-primary" /> Trust Analyzer
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-2 text-sm font-medium"><AlertTriangle className="h-4 w-4 text-warning" /> Spam & Scam Detection</div>
          <p className="mt-1 text-2xl font-bold">{trustAnalysis.spamScore}<span className="text-sm text-muted-foreground">/100</span></p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-2 text-sm font-medium"><Eye className="h-4 w-4 text-danger" /> Manipulation Detection</div>
          <p className="mt-1 text-2xl font-bold">{trustAnalysis.manipulationScore}<span className="text-sm text-muted-foreground">/100</span></p>
        </div>
      </div>
      <RiskMeter score={trustAnalysis.riskScore} />
      {trustAnalysis.flags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {trustAnalysis.flags.map((f, i) => (
            <div key={i} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${flagColors[f.type] || flagColors.info}`} title={f.description}>
              {f.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

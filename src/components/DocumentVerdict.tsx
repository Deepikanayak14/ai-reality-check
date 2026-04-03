// NEW: Document verdict card
import { FileCheck } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";

const verdictStyles: Record<string, string> = {
  "Likely Scam": "border-danger/50 bg-danger/10 text-danger",
  "Suspicious": "border-warning/50 bg-warning/10 text-warning",
  "Appears Legitimate": "border-success/50 bg-success/10 text-success",
};

export default function DocumentVerdict({ result }: { result: AnalysisResult }) {
  if (!result.documentVerdict) return null;
  const { verdict, confidence, reasons } = result.documentVerdict;

  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <FileCheck className="h-5 w-5 text-primary" /> Reality Report
      </h3>
      <div className={`mb-3 inline-block rounded-full border px-3 py-1 text-sm font-bold ${verdictStyles[verdict] || ""}`}>{verdict}</div>
      <p className="text-sm text-muted-foreground">Confidence: {confidence}%</p>
      <ul className="mt-3 space-y-1">
        {reasons.map((r, i) => <li key={i} className="text-sm text-muted-foreground">• {r}</li>)}
      </ul>
    </div>
  );
}

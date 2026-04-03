// NEW: Structured Analysis Output
import { CheckCircle, XCircle, Brain, Lightbulb, BarChart3 } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";

export default function StructuredOutput({ result }: { result: AnalysisResult }) {
  const { logicCheck, conclusionAssessment, clearAnalysis, criticalThinkingScore, actionableOutput } = result;
  const scoreColor = criticalThinkingScore > 70 ? "text-success" : criticalThinkingScore > 40 ? "text-warning" : "text-danger";

  return (
    <div className="animate-fade-in-up rounded-xl border border-border bg-card p-5 card-shadow">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Brain className="h-5 w-5 text-primary" /> Structured Analysis
      </h3>
      <div className="space-y-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold">
            {logicCheck.sound ? <CheckCircle className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
            Logic Check
          </p>
          <p className="ml-6 text-sm text-muted-foreground">
            {logicCheck.sound ? "Reasoning is generally sound." : "Logical gaps detected."} Fallacies: {logicCheck.fallacies.join(", ") || "None"}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold"><BarChart3 className="h-4 w-4 text-primary" /> Conclusion Assessment</p>
          <p className="ml-6 text-sm text-muted-foreground">{conclusionAssessment}</p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold"><Brain className="h-4 w-4 text-primary" /> Clear Analysis</p>
          <p className="ml-6 text-sm text-muted-foreground">{clearAnalysis}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Critical Thinking Score</p>
          <p className={`ml-0 text-3xl font-bold ${scoreColor}`}>{criticalThinkingScore}<span className="text-sm text-muted-foreground">/100</span></p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="h-4 w-4 text-warning" /> Actionable Steps</p>
          <ul className="ml-6 mt-1 space-y-1">
            {actionableOutput.map((a, i) => (
              <li key={i} className="text-sm text-muted-foreground">• {a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

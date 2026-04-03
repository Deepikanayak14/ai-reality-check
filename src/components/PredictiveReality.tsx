// NEW: Predictive Reality Engine
import { TrendingUp, Minus, TrendingDown } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyzer";

export default function PredictiveReality({ result }: { result: AnalysisResult }) {
  const cards = [
    { title: "Best Case", text: result.predictive.best, icon: TrendingUp, border: "border-success/40", bg: "bg-success/5", iconColor: "text-success" },
    { title: "Most Likely", text: result.predictive.likely, icon: Minus, border: "border-warning/40", bg: "bg-warning/5", iconColor: "text-warning" },
    { title: "Worst Case", text: result.predictive.worst, icon: TrendingDown, border: "border-danger/40", bg: "bg-danger/5", iconColor: "text-danger" },
  ];

  return (
    <div className="animate-fade-in-up">
      <h3 className="mb-4 text-lg font-bold">🔮 Predictive Reality</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-4 card-shadow`}>
            <div className="mb-2 flex items-center gap-2">
              <c.icon className={`h-5 w-5 ${c.iconColor}`} />
              <span className="font-semibold">{c.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

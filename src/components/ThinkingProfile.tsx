// NEW: Personalization & self-improvement
import { User, Flame, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { getThinkingProfile, type SessionData } from "@/lib/storage";

export default function ThinkingProfile({ sessions }: { sessions: SessionData[] }) {
  const profile = getThinkingProfile(sessions);
  if (!profile) return null;

  const tips = [
    `Focus on reducing ${profile.mostCommonBias} by actively seeking opposing viewpoints.`,
    `Strengthen your ${profile.weakestArea} by practicing structured decision frameworks.`,
    "Before making decisions, write down 3 reasons why you might be wrong.",
  ];

  return (
    <div className="animate-fade-in-up">
      <h3 className="mb-4 text-lg font-bold">📈 Your Thinking Profile</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <User className="mb-2 h-5 w-5 text-primary" />
          <p className="text-xs text-muted-foreground">Most Common Bias</p>
          <p className="font-semibold">{profile.mostCommonBias}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <TrendingUp className="mb-2 h-5 w-5 text-success" />
          <p className="text-xs text-muted-foreground">Strongest Area</p>
          <p className="font-semibold">{profile.strongestArea}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <AlertCircle className="mb-2 h-5 w-5 text-warning" />
          <p className="text-xs text-muted-foreground">Weakest Area</p>
          <p className="font-semibold">{profile.weakestArea}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <Flame className="mb-2 h-5 w-5 text-danger" />
          <p className="text-xs text-muted-foreground">Growth Streak</p>
          <p className="font-semibold">{profile.streak} sessions</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-border bg-card p-4 card-shadow">
        <p className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="h-4 w-4 text-warning" /> Self-Improvement Tips</p>
        <ul className="mt-2 space-y-1">
          {tips.map((t, i) => <li key={i} className="text-sm text-muted-foreground">• {t}</li>)}
        </ul>
      </div>
    </div>
  );
}

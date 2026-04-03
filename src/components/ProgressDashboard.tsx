// NEW: Progress Dashboard with charts
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { SessionData } from "@/lib/storage";

export default function ProgressDashboard({ sessions }: { sessions: SessionData[] }) {
  if (sessions.length < 1) return null;

  const lineData = sessions.map((s, i) => ({
    session: `#${i + 1}`,
    score: s.clarityScore,
  }));

  const latest = sessions[sessions.length - 1];
  const radarData = Object.entries(latest.riskProfile).map(([key, value]) => ({
    axis: key,
    value,
  }));

  return (
    <div className="animate-fade-in-up">
      <h3 className="mb-4 text-lg font-bold">📊 Progress Dashboard</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="mb-3 text-sm font-semibold">Improvement Over Time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="session" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="mb-3 text-sm font-semibold">Risk Pattern Radar</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

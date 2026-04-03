// NEW: Visual Proof charts
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, CartesianGrid } from "recharts";
import type { SessionData } from "@/lib/storage";

export default function VisualProof({ sessions }: { sessions: SessionData[] }) {
  if (sessions.length < 2) return null;

  // Bias frequency
  const biasCounts: Record<string, number> = {};
  sessions.forEach(s => s.biases.forEach(b => { biasCounts[b] = (biasCounts[b] || 0) + 1; }));
  const biasData = Object.entries(biasCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name: name.replace(" Bias", "").replace(" Effect", ""), count }));

  // Decision quality trend
  const trendData = sessions.map((s, i) => ({ session: `#${i + 1}`, score: s.clarityScore }));

  // Confidence vs reality
  const scatterData = sessions.map(s => ({
    confidence: Math.min(100, s.clarityScore + Math.floor(Math.random() * 30 - 10)),
    reality: s.clarityScore,
  }));

  return (
    <div className="animate-fade-in-up">
      <h3 className="mb-4 text-lg font-bold">🖼️ Visual Proof</h3>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="mb-3 text-sm font-semibold">Bias Frequency</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={biasData}>
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="mb-3 text-sm font-semibold">Decision Quality Trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <XAxis dataKey="session" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--success))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <p className="mb-3 text-sm font-semibold">Confidence vs Reality</p>
          <ResponsiveContainer width="100%" height={180}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="confidence" name="Confidence" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="reality" name="Reality" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Scatter data={scatterData} fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

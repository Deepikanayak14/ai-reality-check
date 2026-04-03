// NEW: localStorage persistence for session data
export interface SessionData {
  id: string;
  date: string;
  input: string;
  clarityScore: number;
  biases: string[];
  domains: string[];
  riskProfile: Record<string, number>;
  trustScore: number;
}

const STORAGE_KEY = "arc_sessions";

export function getSessions(): SessionData[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

export function saveSession(session: SessionData) {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getThinkingProfile(sessions: SessionData[]) {
  if (sessions.length < 3) return null;
  const allBiases = sessions.flatMap(s => s.biases);
  const biasCounts: Record<string, number> = {};
  allBiases.forEach(b => { biasCounts[b] = (biasCounts[b] || 0) + 1; });
  const sorted = Object.entries(biasCounts).sort((a, b) => b[1] - a[1]);
  const avgScore = sessions.reduce((a, s) => a + s.clarityScore, 0) / sessions.length;
  const recentScores = sessions.slice(-5).map(s => s.clarityScore);
  let streak = 0;
  for (let i = recentScores.length - 1; i > 0; i--) {
    if (recentScores[i] >= recentScores[i - 1]) streak++;
    else break;
  }
  return {
    mostCommonBias: sorted[0]?.[0] || "None detected",
    strongestArea: avgScore > 70 ? "Logical Reasoning" : "Critical Questioning",
    weakestArea: sorted[0]?.[0] || "Emotional Decisions",
    avgScore,
    streak,
  };
}

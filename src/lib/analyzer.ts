// NEW: Mock AI analysis engine
import type { SessionData } from "./storage";

const BIASES = [
  "Confirmation Bias", "Anchoring Bias", "Availability Heuristic",
  "Dunning-Kruger Effect", "Sunk Cost Fallacy", "Bandwagon Effect",
  "Optimism Bias", "Negativity Bias", "Status Quo Bias", "Framing Effect"
];

const DOMAINS = [
  "Unrealistic Goals", "Bad Financial Decisions", "Social Media Illusion",
  "Career Confusion", "Emotional Decisions", "Health & Fitness Myths",
  "Overconfidence", "Under-confidence", "Social Comparison"
];

const SEVERITIES = ["Low", "Medium", "High"] as const;

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface AnalysisResult {
  session: SessionData;
  logicCheck: { sound: boolean; fallacies: string[] };
  conclusionAssessment: string;
  clearAnalysis: string;
  criticalThinkingScore: number;
  actionableOutput: string[];
  domains: { name: string; severity: string; insight: string }[];
  trustAnalysis: {
    spamScore: number;
    manipulationScore: number;
    riskScore: number;
    flags: { type: string; label: string; description: string }[];
  };
  predictive: {
    best: string;
    likely: string;
    worst: string;
  };
  documentVerdict?: { verdict: string; confidence: number; reasons: string[] };
}

const DOMAIN_INSIGHTS: Record<string, string[]> = {
  "Unrealistic Goals": ["Your timeline expectations may not account for typical learning curves.", "The goals set appear aspirational but lack concrete milestones."],
  "Bad Financial Decisions": ["This financial reasoning shows signs of short-term thinking.", "Risk/reward calculation appears skewed toward optimistic outcomes."],
  "Social Media Illusion": ["Comparisons to curated online personas can distort self-perception.", "This thinking pattern mirrors common social media influence effects."],
  "Career Confusion": ["Multiple conflicting career signals detected in your reasoning.", "Career decisions benefit from separating passion from practical constraints."],
  "Emotional Decisions": ["Strong emotional undertones may be overriding logical evaluation.", "Consider revisiting this decision after a 24-hour cooling period."],
  "Health & Fitness Myths": ["This belief conflicts with established scientific evidence.", "Quick-fix thinking detected—sustainable results require consistent effort."],
  "Overconfidence": ["Your certainty level exceeds what the evidence supports.", "Consider seeking disconfirming evidence before proceeding."],
  "Under-confidence": ["You may be undervaluing your capabilities in this area.", "Imposter syndrome indicators detected—your evidence suggests competence."],
  "Social Comparison": ["External benchmarks are being weighted too heavily here.", "Your comparison reference group may not be representative."],
};

export function analyzeInput(input: string): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const wordCount = input.split(/\s+/).length;
      const hasQuestionMarks = (input.match(/\?/g) || []).length;
      const hasExclamation = input.includes("!");
      const hasUrgency = /urgent|asap|immediately|hurry|now|quick/i.test(input);
      const hasMoney = /\$|money|pay|price|cost|invest|profit|free/i.test(input);
      const hasEmotional = /feel|love|hate|angry|sad|happy|scared|afraid|worry/i.test(input);

      const biasCount = Math.min(Math.max(1, Math.floor(wordCount / 15)), 4);
      const biases = pickRandom(BIASES, biasCount);
      const domainCount = Math.min(Math.max(1, Math.floor(wordCount / 20)), 3);
      const selectedDomains = pickRandom(DOMAINS, domainCount);

      const clarityScore = rand(35, 85);
      const spamScore = hasMoney && hasUrgency ? rand(60, 95) : rand(5, 35);
      const manipulationScore = hasEmotional && hasExclamation ? rand(50, 85) : rand(5, 30);
      const riskScore = Math.floor((spamScore + manipulationScore) / 2);

      const flags: { type: string; label: string; description: string }[] = [];
      if (hasUrgency) flags.push({ type: "spam", label: "Urgency Language", description: "Uses pressure words to force quick decisions" });
      if (hasMoney) flags.push({ type: "spam", label: "Financial Lure", description: "References money or financial gain as bait" });
      if (hasEmotional) flags.push({ type: "manipulation", label: "Emotional Appeal", description: "Appeals to emotions over logic" });
      if (hasExclamation) flags.push({ type: "manipulation", label: "Exclamatory Pressure", description: "Uses exclamation to heighten urgency" });
      if (hasQuestionMarks > 2) flags.push({ type: "info", label: "Questioning Pattern", description: "Multiple questions may indicate confusion or probing" });

      const domains = selectedDomains.map(name => ({
        name,
        severity: SEVERITIES[rand(0, 2)],
        insight: DOMAIN_INSIGHTS[name]?.[rand(0, 1)] || "Analysis pending for this domain.",
      }));

      const session: SessionData = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        input,
        clarityScore,
        biases,
        domains: selectedDomains,
        riskProfile: {
          "Emotional Decisions": rand(20, 90),
          "Financial Risk": rand(20, 90),
          "Social Pressure": rand(20, 90),
          "Overconfidence": rand(20, 90),
          "Logical Gaps": rand(20, 90),
          "External Manipulation": rand(20, 90),
        },
        trustScore: 100 - riskScore,
      };

      resolve({
        session,
        logicCheck: {
          sound: clarityScore > 60,
          fallacies: biases.slice(0, 2),
        },
        conclusionAssessment: clarityScore > 60
          ? "The conclusion is partially supported by the premises, but contains gaps."
          : "The conclusion is weakly supported—several premises are unverified or emotionally driven.",
        clearAnalysis: `Your thinking on this topic shows ${biases.length} cognitive bias pattern${biases.length > 1 ? "s" : ""}. The overall reasoning clarity scores ${clarityScore}/100. Key areas for improvement include ${domains[0]?.name || "general critical thinking"}.`,
        criticalThinkingScore: clarityScore,
        actionableOutput: [
          "Challenge your core assumption by seeking one piece of contradicting evidence.",
          `Address your ${biases[0] || "primary bias"} by considering the opposite perspective.`,
          "Write down your reasoning steps and check each for logical validity.",
        ],
        domains,
        trustAnalysis: { spamScore, manipulationScore, riskScore, flags },
        predictive: {
          best: "With corrected reasoning, you could make a well-informed decision that accounts for risks and leads to a positive outcome aligned with your actual goals.",
          likely: "Without adjusting your thinking patterns, you'll proceed with partial information and moderate bias, leading to an acceptable but suboptimal result.",
          worst: "If biases go unchecked, the decision could lead to significant regret, financial loss, or emotional damage from acting on flawed assumptions.",
        },
      });
    }, 2000);
  });
}

export function analyzeDocument(fileName: string, content: string): Promise<AnalysisResult> {
  return analyzeInput(content || `Document: ${fileName}`).then(result => {
    const hasMoney = /\$|money|pay|price|cost|invest|profit|free/i.test(content);
    const hasUrgency = /urgent|asap|immediately|hurry|now|quick|limited/i.test(content);
    const suspicious = hasMoney && hasUrgency;
    result.documentVerdict = {
      verdict: suspicious ? "Likely Scam" : (hasMoney || hasUrgency ? "Suspicious" : "Appears Legitimate"),
      confidence: rand(60, 95),
      reasons: [
        suspicious ? "Contains both financial lures and urgency language" : "No major red flags detected",
        hasMoney ? "References financial transactions or gains" : "No financial manipulation detected",
        hasUrgency ? "Uses time-pressure language" : "No artificial urgency detected",
      ],
    };
    return result;
  });
}

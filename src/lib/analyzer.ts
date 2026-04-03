// AI analysis engine — calls the backend edge function
import { supabase } from "@/integrations/supabase/client";
import type { SessionData } from "./storage";

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

async function callAnalyzeFunction(input: string, type: "text" | "document"): Promise<any> {
  const { data, error } = await supabase.functions.invoke("analyze", {
    body: { input, type },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error(error.message || "Analysis failed");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

function buildResult(input: string, data: any, type: "text" | "document"): AnalysisResult {
  const session: SessionData = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    input,
    clarityScore: data.clarityScore ?? 50,
    biases: data.biases ?? [],
    domains: (data.domains ?? []).map((d: any) => d.name),
    riskProfile: data.riskProfile ?? {},
    trustScore: 100 - (data.trustAnalysis?.riskScore ?? 50),
  };

  const result: AnalysisResult = {
    session,
    logicCheck: data.logicCheck ?? { sound: true, fallacies: [] },
    conclusionAssessment: data.conclusionAssessment ?? "",
    clearAnalysis: data.clearAnalysis ?? "",
    criticalThinkingScore: data.clarityScore ?? 50,
    actionableOutput: data.actionableOutput ?? [],
    domains: data.domains ?? [],
    trustAnalysis: data.trustAnalysis ?? { spamScore: 0, manipulationScore: 0, riskScore: 0, flags: [] },
    predictive: data.predictive ?? { best: "", likely: "", worst: "" },
  };

  if (type === "document" && data.documentVerdict) {
    result.documentVerdict = data.documentVerdict;
  }

  return result;
}

export function analyzeInput(input: string): Promise<AnalysisResult> {
  return callAnalyzeFunction(input, "text").then((data) => buildResult(input, data, "text"));
}

export function analyzeDocument(fileName: string, content: string): Promise<AnalysisResult> {
  const input = content || `Document: ${fileName}`;
  return callAnalyzeFunction(input, "document").then((data) => buildResult(input, data, "document"));
}

// NEW: Main application page — AI Reality Checker
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";
import HowItWorks from "@/components/HowItWorks";
import DocumentUpload from "@/components/DocumentUpload";
import TrustAnalyzer from "@/components/TrustAnalyzer";
import DomainAnalysis from "@/components/DomainAnalysis";
import StructuredOutput from "@/components/StructuredOutput";
import PredictiveReality from "@/components/PredictiveReality";
import DocumentVerdict from "@/components/DocumentVerdict";
import ProgressDashboard from "@/components/ProgressDashboard";
import ThinkingProfile from "@/components/ThinkingProfile";
import VisualProof from "@/components/VisualProof";
import { analyzeInput, analyzeDocument, type AnalysisResult } from "@/lib/analyzer";
import { getSessions, saveSession, type SessionData } from "@/lib/storage";
import { initTheme } from "@/lib/theme";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    initTheme();
    setSessions(getSessions());
  }, []);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeInput(text);
      saveSession(res.session);
      setSessions(getSessions());
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeDocument = async (fileName: string, content: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeDocument(fileName, content);
      saveSession(res.session);
      setSessions(getSessions());
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto space-y-10 px-4 py-10">
        <HeroInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        <HowItWorks />
        <DocumentUpload onAnalyzeDocument={handleAnalyzeDocument} isLoading={isLoading} />

        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Analyzing your thinking patterns...</p>
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <StructuredOutput result={result} />
              <TrustAnalyzer result={result} />
            </div>
            <DomainAnalysis result={result} />
            <PredictiveReality result={result} />
            <DocumentVerdict result={result} />
          </div>
        )}

        <ProgressDashboard sessions={sessions} />
        <ThinkingProfile sessions={sessions} />
        <VisualProof sessions={sessions} />
      </main>
    </div>
  );
}

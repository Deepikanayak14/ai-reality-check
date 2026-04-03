// Main application page — AI Reality Checker
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { type SessionData } from "@/lib/storage";
import { initTheme } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else {
        setUser(session.user);
        loadSessions();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadSessions = async () => {
    const { data, error } = await supabase
      .from("analysis_sessions")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      const mapped: SessionData[] = data.map((s: any) => ({
        id: s.id,
        date: s.created_at,
        input: s.input_text,
        clarityScore: s.clarity_score,
        biases: s.biases || [],
        domains: s.domains || [],
        riskProfile: s.risk_profile || {},
        trustScore: s.trust_score,
      }));
      setSessions(mapped);
    }
  };

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeInput(text);
      await loadSessions();
      setResult(res);
    } catch (err: any) {
      toast.error(err.message || "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeDocument = async (fileName: string, content: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await analyzeDocument(fileName, content);
      await loadSessions();
      setResult(res);
    } catch (err: any) {
      toast.error(err.message || "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar user={user} />
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

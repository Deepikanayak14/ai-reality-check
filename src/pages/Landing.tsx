// NEW: Stylish landing page
import { Brain, ShieldCheck, BarChart3, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { initTheme } from "@/lib/theme";
import HowItWorks from "@/components/HowItWorks";

const features = [
  { icon: Brain, title: "Cognitive Bias Detection", desc: "Uncover hidden biases influencing your decisions" },
  { icon: ShieldCheck, title: "Trust & Scam Analysis", desc: "Detect manipulation, phishing, and emotional traps" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visualize your reasoning improvement over time" },
  { icon: Zap, title: "Instant Clarity", desc: "Get actionable insights in seconds, not hours" },
];

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="animate-fade-in-up mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
            <Brain className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up text-center text-5xl font-extrabold tracking-tight md:text-7xl" style={{ animationDelay: "0.1s" }}>
          AI Reality
          <span className="bg-gradient-to-r from-primary to-[hsl(var(--info))] bg-clip-text text-transparent"> Checker</span>
        </h1>

        <p className="animate-fade-in-up mt-5 max-w-xl text-center text-lg text-muted-foreground md:text-xl" style={{ animationDelay: "0.2s" }}>
          Detect cognitive biases, manipulation, and logical flaws in your thinking. Make sharper decisions with AI-powered clarity.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/app")}
          className="animate-fade-in-up group mt-10 flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
          style={{ animationDelay: "0.35s" }}
        >
          Start Reality Check
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="animate-fade-in-up mt-4 text-sm text-muted-foreground" style={{ animationDelay: "0.45s" }}>
          No sign-up required · Free to use · Instant results
        </p>

        {/* Feature cards */}
        <div className="animate-fade-in-up mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: "0.55s" }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/60 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md card-shadow"
            >
              <f.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

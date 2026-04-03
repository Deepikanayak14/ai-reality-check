// NEW: How It Works modal
import { useState } from "react";
import { FileText, Brain, BarChart3, CheckCircle, X, HelpCircle } from "lucide-react";

const steps = [
  { icon: FileText, title: "Input", desc: "You input your thought, decision, or document" },
  { icon: Brain, title: "AI Scan", desc: "AI scans for cognitive biases, manipulation, and logical flaws" },
  { icon: BarChart3, title: "Analysis", desc: "Risk scoring, pattern detection, and domain analysis run simultaneously" },
  { icon: CheckCircle, title: "Results", desc: "You receive a structured reality check with actionable clarity" },
];

export default function HowItWorks() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="mx-auto mt-4 flex items-center gap-1.5 text-sm text-primary hover:underline">
        <HelpCircle className="h-4 w-4" /> See How It Works
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="animate-fade-in-up relative mx-4 w-full max-w-lg rounded-xl border border-border bg-card p-6 card-shadow" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            <h2 className="mb-6 text-xl font-bold">How It Works</h2>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Step {i + 1}: {s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Got It</button>
          </div>
        </div>
      )}
    </>
  );
}

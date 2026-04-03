// NEW: Main text input with Enter key + button trigger
import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

interface HeroInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function HeroInput({ onAnalyze, isLoading }: HeroInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (text.trim() && !isLoading) onAnalyze(text.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="animate-fade-in-up mx-auto max-w-3xl text-center">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
        AI Reality Checker
      </h1>
      <p className="mb-8 text-muted-foreground">
        Paste your thought, decision, or message. Get a structured reality check in seconds.
      </p>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or paste your thought, decision, message, or document text here..."
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-card p-4 pr-14 text-card-foreground shadow-sm transition-all duration-300 placeholder:text-muted-foreground focus:glow-border focus:outline-none focus:ring-2 focus:ring-primary/30"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="absolute bottom-3 right-3 rounded-lg bg-primary p-2.5 text-primary-foreground transition-all duration-200 hover:opacity-90 disabled:opacity-40"
          aria-label="Analyze my thinking"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin-slow" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Press Enter to analyze · Shift+Enter for new line</p>
    </section>
  );
}

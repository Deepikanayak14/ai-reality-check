// Navbar with theme toggle and auth
import { Moon, Sun, Brain, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { toggleTheme, getTheme } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user?: User | null }) {
  const [isDark, setIsDark] = useState(getTheme() === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    setIsDark(getTheme() === "dark");
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setIsDark(newTheme === "dark");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">AI Reality Checker</span>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
          )}
          <button
            onClick={handleToggle}
            className="rounded-lg border border-border p-2 transition-all duration-300 hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-border p-2 transition-all duration-300 hover:bg-secondary"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

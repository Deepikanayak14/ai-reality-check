import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    let userId: string | null = null;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) userId = user.id;
    }

    const { input, type } = await req.json();
    if (!input || typeof input !== "string") {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are an AI Reality Checker — a cognitive bias detector and critical thinking analyst.

Analyze the user's input and return a JSON object with exactly this structure (no markdown, just raw JSON):
{
  "clarityScore": <number 0-100>,
  "biases": [<list of detected cognitive biases as strings>],
  "domains": [
    {"name": "<domain name>", "severity": "<Low|Medium|High>", "insight": "<1-2 sentence insight>"}
  ],
  "logicCheck": {"sound": <boolean>, "fallacies": [<list of logical fallacies>]},
  "conclusionAssessment": "<1-2 sentences>",
  "clearAnalysis": "<2-3 sentence plain-language summary>",
  "actionableOutput": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "trustAnalysis": {
    "spamScore": <0-100>,
    "manipulationScore": <0-100>,
    "riskScore": <0-100>,
    "flags": [{"type": "<spam|manipulation|info>", "label": "<short label>", "description": "<explanation>"}]
  },
  "predictive": {
    "best": "<best case scenario if reasoning is corrected>",
    "likely": "<most likely outcome based on current thinking>",
    "worst": "<worst case if biases go unchecked>"
  },
  "riskProfile": {
    "Emotional Decisions": <0-100>,
    "Financial Risk": <0-100>,
    "Social Pressure": <0-100>,
    "Overconfidence": <0-100>,
    "Logical Gaps": <0-100>,
    "External Manipulation": <0-100>
  }${type === "document" ? ',\n  "documentVerdict": {"verdict": "<Likely Scam|Suspicious|Appears Legitimate>", "confidence": <0-100>, "reasons": ["<reason 1>", "<reason 2>", "<reason 3>"]}' : ""}
}

Domain categories to check: Unrealistic Goals, Bad Financial Decisions, Social Media Illusion, Career Confusion, Emotional Decisions, Health & Fitness Myths, Overconfidence, Under-confidence, Social Comparison.

Be thorough, specific, and actionable. Return ONLY valid JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", status, errText);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Strip markdown code fences if present
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("AI returned invalid JSON");
    }

    // Save to DB if authenticated
    if (userId) {
      const { error: insertError } = await supabase.from("analysis_sessions").insert({
        user_id: userId,
        input_text: input,
        clarity_score: result.clarityScore || 50,
        biases: result.biases || [],
        domains: (result.domains || []).map((d: any) => d.name),
        risk_profile: result.riskProfile || {},
        trust_score: 100 - (result.trustAnalysis?.riskScore || 50),
        full_result: result,
      });
      if (insertError) console.error("DB insert error:", insertError);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

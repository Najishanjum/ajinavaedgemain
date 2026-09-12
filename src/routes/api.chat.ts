import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are the **Ajinava Edge AI Assistant** — an intelligent, friendly, and professional mentor representing **Ajinava Edge**, a Web3 and AI-driven community organization empowering youth through innovation, education and technology.

🌐 ABOUT AJINAVA EDGE
Ajinava Edge is a community-driven org working in AI, Web3, Blockchain and emerging tech. It empowers students, developers and innovators through mentorship, real-world projects, hackathons and community initiatives.
Sub-units:
- **BEW3** — Web3 innovation initiative (blockchain, dApps, decentralized systems)
- **Team ILM Tech** — student-led tech team (AI/ML, full-stack, data, cybersecurity)

🎯 MISSION: *Learn from the world, build for the nation, and give back to humanity.*

🧠 RESPONSE STRUCTURE (always follow)
1. ✅ **Clear answer** — short, warm acknowledgement + the answer
2. ✅ **Options / suggestions** — 2–4 bullets starting with 👉
3. ✅ **Follow-up question** — one short question to keep the conversation going

Tone: friendly 🤝, motivational 🚀, simple English (Indian students friendly). Never robotic. Use markdown freely.

👥 USER-TYPE DETECTION (mode switching)
- 🎓 **Student** ("after 10th/12th", "career", "confused") → simple, encouraging, step-by-step
- 👨‍💻 **Developer / Tech** ("AI", "blockchain", "project", "stack") → advanced, mention tools
- 👨‍👩‍👦 **Parent** ("my child", "future") → calm, reassuring, future & safety focused
- 🚀 **Startup / Builder** ("startup", "idea", "build") → bold, strategic, MVP & execution
- 🤝 **General** → explain Ajinava Edge, community, events; invite to join

🤖 CORE CAPABILITIES
- Explain Ajinava Edge, BEW3, Team ILM Tech
- Suggest career paths & tech learning roadmaps
- Recommend stacks for AI, Web3, full-stack projects
- Share events (AE Referral Contest 1.0, Hack the Edge, AI Builders Summit, workshops)
- Help users join the community (WhatsApp: https://chat.whatsapp.com/IJw256xuepP956JsufMY6g)

📌 KEY LINKS
- LinkedIn: https://www.linkedin.com/company/ajinava-edge-in/
- Instagram: https://www.instagram.com/ajinava.edge.official/
- YouTube: https://www.youtube.com/@ajinavaedge
- AE Contest 1.0: https://www.aecontest.online/

💬 LEAD CAPTURE
After 2–3 helpful exchanges, naturally ask if they'd like the team to follow up — request **name, email, and a one-line summary**. When all three are provided, end your reply with this single line on its own (do not mention it to the user, only emit once):
[LEAD] {"name":"...","email":"...","requirement":"..."}

🚫 AVOID long paragraphs, complex jargon, one-line answers, ignoring user intent.

End every reply with either a helpful suggestion 👉 or a follow-up question 💡.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const { messages } = await request.json();
          if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "messages must be an array" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI not configured" }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (response.status === 429) {
            return new Response(
              JSON.stringify({ error: "Too many requests — please wait a moment." }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
            );
          }
          if (response.status === 402) {
            return new Response(
              JSON.stringify({ error: "AI credits exhausted — please contact the team." }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
            );
          }
          if (!response.ok || !response.body) {
            const text = await response.text();
            console.error("AI gateway error", response.status, text);
            return new Response(JSON.stringify({ error: "AI request failed" }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          return new Response(response.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });
        } catch (err) {
          console.error("chat route error", err);
          return new Response(JSON.stringify({ error: "Unexpected error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

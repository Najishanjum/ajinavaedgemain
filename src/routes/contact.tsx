import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ajinava Edge" },
      { name: "description", content: "Get in touch with Ajinava Edge — talk to our team or our AI assistant." },
      { property: "og:title", content: "Contact Ajinava Edge" },
      { property: "og:description", content: "Tell us about your project — get an AI-powered quote in minutes." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  requirement: z.string().trim().min(5).max(2000),
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", requirement: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      ...parsed.data,
      source: "contact-form",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Got it! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", requirement: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary mb-3">Contact</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold">
          Let's build your <span className="text-gradient">edge</span>.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-md">
          Send us a note, or open the AI assistant in the corner for an instant project
          quote and tech recommendation.
        </p>
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-3 glass rounded-xl p-4">
            <Mail className="text-primary" size={18} />
            <span className="text-sm">hello@ajinavaedge.com</span>
          </div>
          <div className="flex items-center gap-3 glass rounded-xl p-4">
            <MessageSquare className="text-primary" size={18} />
            <span className="text-sm">Chat with our AI assistant — 24/7</span>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Your name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            maxLength={100}
            className="mt-1 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Aditi Sharma"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            maxLength={255}
            className="mt-1 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@startup.com"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Tell us about your project</label>
          <textarea
            value={form.requirement}
            onChange={(e) => setForm((f) => ({ ...f, requirement: e.target.value }))}
            maxLength={2000}
            rows={5}
            className="mt-1 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="I want to build an e-commerce app with AI recommendations..."
          />
        </div>
        <button
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
        >
          {loading ? "Sending..." : (<>Send message <Send size={14} /></>)}
        </button>
      </form>
    </div>
  );
}

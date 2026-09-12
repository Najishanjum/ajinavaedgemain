import { createFileRoute } from "@tanstack/react-router";
import { Target, Heart, Lightbulb, Users2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ajinava Edge" },
      { name: "description", content: "Ajinava Edge is an AI-first IT studio and a builder community helping founders ship products that matter." },
      { property: "og:title", content: "About Ajinava Edge" },
      { property: "og:description", content: "An AI-first studio + community engineering the edge of what's possible." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-primary mb-3">About us</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
        We are builders <span className="text-gradient">obsessed</span> with the edge.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        Ajinava Edge was born from a simple belief — software should be intelligent,
        beautiful and built to last. We partner with startups, businesses and creators to
        ship AI-powered products fast, and we run a community where the next generation of
        engineers learns to do the same.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 gap-5">
        {[
          { icon: Target, t: "Our Mission", d: "Make world-class AI engineering accessible to every founder, in every city." },
          { icon: Heart, t: "Our Values", d: "Craft, honesty and community over hype. Ship things people love." },
          { icon: Lightbulb, t: "How we work", d: "Tight feedback loops, shared design systems, and AI assistants in every workflow." },
          { icon: Users2, t: "The community", d: "5,000+ builders meeting weekly to learn, build and launch together." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="glass rounded-2xl p-6">
            <Icon className="text-primary mb-3" />
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 glass rounded-3xl p-8 sm:p-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">Our story</h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Started in 2024 by a small group of engineers, designers and AI researchers,
          Ajinava Edge has grown into a studio that has shipped 120+ products and a
          community of 5,000+ builders. We blend deep technical work — AI agents, cloud
          architecture, product engineering — with mentorship, hackathons and open
          conversations about how to build the future.
        </p>
      </div>
    </div>
  );
}

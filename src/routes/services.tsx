import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Globe,
  Sparkles,
  FlaskConical,
  GraduationCap,
  Rocket,
  Database,
  Briefcase,
  ArrowRight,
  Bot,
  Check,
} from "lucide-react";
import { useState } from "react";
import { services } from "@/lib/site-data";

const iconMap = {
  Globe,
  Sparkles,
  FlaskConical,
  GraduationCap,
  Rocket,
  Database,
  Briefcase,
} as const;

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ajinava Edge" },
      {
        name: "description",
        content:
          "AI & ML, Web & App Development, Research, Ed-Tech, Startup Incubation, Data Solutions and Internship Program from Ajinava Edge.",
      },
      { property: "og:title", content: "Services — Ajinava Edge" },
      {
        property: "og:description",
        content:
          "AI-powered services to help you ship faster — from idea to launch.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-primary mb-3">
        Services
      </div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold max-w-3xl">
        Our <span className="text-gradient">Services</span>
      </h1>
      <p className="text-muted-foreground mt-5 max-w-2xl">
        Comprehensive technology solutions and services to drive your
        innovation forward.
      </p>

      {/* AI assistant CTA above services */}
      <div className="mt-10 relative overflow-hidden rounded-3xl glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="absolute inset-0 bg-gradient-edge opacity-10" />
        <div className="relative flex-1">
          <h2 className="font-display text-xl sm:text-2xl font-bold">
            Have an idea? Talk to our{" "}
            <span className="text-gradient">AI assistant</span>.
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Describe your project and get an instant recommendation, tech stack
            and timeline.
          </p>
        </div>
        <Link
          to="/contact"
          className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Bot size={16} /> Chat with Edge
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
          const isOpen = open === i;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-3 left-3 h-10 w-10 rounded-xl bg-gradient-edge flex items-center justify-center text-primary-foreground shadow-glow">
                  <Icon size={18} />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>

                <div className="mt-4">
                  <div className="text-xs uppercase tracking-wider text-primary mb-2">
                    Key Features
                  </div>
                  <ul className="space-y-1.5">
                    {(isOpen ? s.features : s.features.slice(0, 2)).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Check
                          size={14}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="mt-4 text-xs font-semibold text-primary hover:underline self-start"
                >
                  {isOpen ? "Show less" : "Click to see more..."}
                </button>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 glass rounded-3xl p-10 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          Not sure where to start?
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Open the AI assistant in the corner — describe your idea and we'll
          suggest the right services, tech stack and an estimated timeline.
        </p>
        <Link
          to="/contact"
          className="inline-flex mt-6 items-center gap-2 rounded-full bg-gradient-edge px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Talk to us <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

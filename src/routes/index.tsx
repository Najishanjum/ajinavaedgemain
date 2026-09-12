import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, Rocket, Users2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { JoinRoleSection } from "@/components/home/JoinRoleSection";

function useCountUp(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let animId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [started, end, duration]);

  return { count, ref, suffix };
}

function CountUpStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref}>
      <div className="font-display text-3xl sm:text-4xl">
        {count}{suffix}
      </div>
      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/50 mt-1">
        {label}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ajinava Edge — AI-powered IT Solutions & Builder Community" },
      {
        name: "description",
        content:
          "We build AI-powered web, mobile and cloud products and run a thriving builder community. Talk to our AI assistant to get an instant quote.",
      },
      { property: "og:title", content: "Ajinava Edge — AI-powered IT Solutions" },
      {
        property: "og:description",
        content: "AI products, smart web/mobile apps, mentorship and a builder community.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Editorial Hero */}
      <section className="relative overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 bg-dot-grid opacity-100 pointer-events-none" />
        {/* Violet wash */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-12 pb-24 lg:pt-20 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-9">
              <h1 className="font-display font-normal text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-foreground">
                <span className="inline-block animate-reveal [animation-delay:0.05s] hover:text-primary transition-colors cursor-default">
                  Building
                </span>{" "}
                <span
                  className="inline-block align-middle mx-1 h-[0.7em] w-[1em] rounded-full border border-foreground/10 bg-secondary animate-reveal [animation-delay:0.15s]"
                  aria-hidden
                />{" "}
                <span className="inline-block animate-reveal [animation-delay:0.2s] hover:text-primary transition-colors cursor-default">
                  the
                </span>
                <br />
                <span className="inline-block animate-reveal [animation-delay:0.3s] hover:text-primary transition-colors cursor-default">
                  Decentralized
                </span>{" "}
                <span className="inline-block text-primary text-[0.55em] align-middle animate-pulse mx-1 animate-reveal [animation-delay:0.4s]">
                  ✧
                </span>{" "}
                <span className="inline-block italic text-primary animate-reveal [animation-delay:0.5s]">
                  Edge
                </span>
                <br />
                <span className="inline-block animate-reveal [animation-delay:0.6s] hover:text-primary transition-colors cursor-default">
                  for
                </span>{" "}
                <span
                  className="inline-block align-middle mx-1 h-[0.7em] w-[0.7em] rounded-full border border-foreground/10 bg-secondary animate-reveal [animation-delay:0.7s]"
                  aria-hidden
                />{" "}
                <span className="inline-block animate-reveal [animation-delay:0.8s] hover:text-primary transition-colors cursor-default">
                  Neural
                </span>{" "}
                <span className="inline-block animate-reveal [animation-delay:0.9s] hover:text-primary transition-colors cursor-default">
                  Youth.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-8 pt-6">
              <p className="text-sm leading-relaxed text-foreground/60 font-medium max-w-xs">
                A Web3 & AI-driven community empowering the next generation
                through mentorship, hackathons, and real-world builder projects.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] font-bold tracking-[0.22em] uppercase text-background hover:bg-primary hover:scale-105 transition-all"
                >
                  Explore <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-[11px] font-bold tracking-[0.22em] uppercase text-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <Bot size={14} /> AI Guide
                </Link>
              </div>

              {/* Floating Stat Card */}
              <div className="relative animate-float group mt-4">
                <div className="bg-card border border-foreground/5 rounded-3xl p-6 shadow-elegant transition-all group-hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                      Community Growth
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="flex items-end justify-between h-16 w-full gap-1.5 px-1">
                    <div className="flex-1 bg-secondary rounded-t-sm transition-all group-hover:bg-primary/30 h-[40%]" />
                    <div className="flex-1 bg-secondary rounded-t-sm transition-all group-hover:bg-primary/50 h-[65%]" />
                    <div className="flex-1 bg-secondary rounded-t-sm transition-all group-hover:bg-primary/70 h-[90%]" />
                    <div className="flex-1 bg-foreground rounded-t-sm h-[75%]" />
                    <div className="flex-1 bg-secondary rounded-t-sm transition-all group-hover:bg-primary/50 h-[55%]" />
                    <div className="flex-1 bg-secondary rounded-t-sm transition-all group-hover:bg-primary/30 h-[30%]" />
                  </div>

                  <div className="mt-5 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="font-display text-3xl leading-none">
                        5.2k<span className="text-xs font-normal text-foreground/40 ml-1">builders</span>
                      </span>
                      <span className="text-[10px] font-bold text-foreground/40 tracking-widest uppercase mt-2">
                        Active in BEW3
                      </span>
                    </div>
                    <div className="text-emerald-600 text-[10px] font-bold pb-1">+12.4% ↑</div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
              </div>
            </div>
          </div>

          {/* Stat row */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl border-t border-foreground/10 pt-8">
            <CountUpStat end={120} suffix="+" label="Projects shipped" />
            <CountUpStat end={5000} suffix="+" label="Community builders" />
            <CountUpStat end={30} suffix="+" label="AI products" />
          </div>
        </div>
      </section>

      {/* Community Photo Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-primary/8 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4">
              [ The people behind the edge ]
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              We are building this{" "}
              <br className="hidden sm:block" />
              <span className="italic text-primary">community</span>
            </h2>
          </motion.div>

          {/* Photo container with effects */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Animated border glow */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary/40 via-transparent to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Main image card — clean, no overlays */}
            <div className="relative overflow-hidden rounded-3xl bg-card border border-foreground/10 group-hover:border-primary/30 transition-colors duration-500">
              <img
                src="/images/community-hero.jpg"
                alt="Ajinava Edge Community — building the decentralized future together"
                className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />

              {/* Scan line animation effect on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_3s_ease-in-out_infinite]" />
              </div>

              {/* Corner decorative on hover */}
              <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  Community · Builders · Innovators
                </span>
              </div>
            </div>

            {/* Ambient glow beneath */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* AJINAVA EDGE text below the photo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1]">
              AJINAVA{" "}
              <span className="text-primary">EDGE</span>
            </h3>
            <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              From fragmented minds, a decentralized vanguard emerges architecting the infrastructure of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Join Ajinava Edge Community — Pick Your Role Section */}
      <JoinRoleSection />

      {/* Why Ajinava Edge */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 border-t border-foreground/10">
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { icon: Bot, t: "AI-first thinking", d: "Every product we build is designed to be smarter, faster and more adaptive." },
            { icon: Rocket, t: "Ship in weeks, not quarters", d: "We pair great engineers with battle-tested templates to move fast." },
            { icon: Users2, t: "A community behind you", d: "Join 5,000+ builders, mentors and founders learning together." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-card border border-foreground/5 rounded-3xl p-8">
              <Icon className="text-primary mb-5" />
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="text-sm text-foreground/60 mt-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          <Sparkles className="relative mx-auto text-primary mb-4" />
          <h2 className="relative font-display text-4xl sm:text-5xl">
            Have an idea? Talk to our <span className="italic text-primary">AI assistant</span>.
          </h2>
          <p className="relative text-background/70 mt-5 max-w-xl mx-auto">
            Get an instant quote, project plan and recommended tech stack — in seconds.
          </p>
          <Link
            to="/contact"
            className="relative inline-flex mt-8 items-center gap-2 rounded-full bg-background text-foreground px-7 py-3 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-primary hover:text-background transition-all"
          >
            Start your project <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}


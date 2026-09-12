import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TEXT = "AJINAVA EDGE";
const STORAGE_KEY = "ae_intro_shown_v1";

export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "glitch" | "fadeout" | "done">("typing");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (phase !== "typing") return;
    if (typedCount >= TEXT.length) {
      const t1 = setTimeout(() => setPhase("glitch"), 500);
      return () => clearTimeout(t1);
    }
    const t = setTimeout(() => setTypedCount((c) => c + 1), 130);
    return () => clearTimeout(t);
  }, [visible, typedCount, phase]);

  useEffect(() => {
    if (phase === "glitch") {
      const t = setTimeout(() => setPhase("fadeout"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "fadeout") {
      const t = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {visible && phase !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "fadeout" ? 0 : 1,
            scale: phase === "fadeout" ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
          style={{ fontFamily: "var(--font-display), 'Abril Fatface', serif" }}
        >
          {/* ambient violet glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
              style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)" }} />
            <div className="absolute left-[20%] top-[30%] h-[28vmax] w-[28vmax] rounded-full blur-[100px]"
              style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }} />
          </div>
          {/* dot grid */}
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60"
            style={{
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />
          {/* particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{ background: "color-mix(in oklab, var(--foreground) 25%, transparent)" }}
              initial={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 600 - 300,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * 600 - 300],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="relative flex items-center justify-center px-6">
            <h1
              className="relative select-none text-center font-normal tracking-[-0.02em] text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 8rem)",
                textShadow: phase !== "typing"
                  ? "0 8px 40px color-mix(in oklab, var(--primary) 30%, transparent)"
                  : "none",
              }}
            >
              {TEXT.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    i < typedCount
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }
                  }
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block"
                  style={{ minWidth: ch === " " ? "0.4em" : undefined }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
              {phase === "typing" && (
                <span className="ml-1 inline-block h-[0.9em] w-[0.06em] translate-y-[0.05em] animate-cursor bg-foreground align-middle" />
              )}
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

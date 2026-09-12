import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { partners } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
const tapePositions = ["left-1/2 -translate-x-1/2 rotate-2", "left-6 -rotate-6", "right-5 rotate-6"];

export function PartnerCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const total = partners.length;

  const show = useCallback(
    (index: number) => setActive((index + total) % total),
    [total],
  );
  const next = useCallback(() => show(active + 1), [active, show]);
  const prev = useCallback(() => show(active - 1), [active, show]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % total), 3000);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  useEffect(() => {
    cardRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  return (
    <section aria-label="Community partner filmstrip">
      <div className="flex flex-col gap-6 border-b border-partner-ink/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-partner-coral">
            The partner archive
          </p>
          <h2 className="font-partner text-4xl font-bold text-partner-ink sm:text-5xl">
            Community Partners
          </h2>
          <p className="mt-4 text-base leading-relaxed text-partner-ink/65 sm:text-lg">
            23 communities building a stronger culture of learning, technology and collective progress with Ajinava Edge.
          </p>
        </div>

        <div className="flex items-center gap-3" aria-label="Carousel controls">
          <Button variant="outline" size="icon" onClick={prev} aria-label="Previous partner" className="h-12 w-12 rounded-full border-partner-ink bg-transparent text-partner-ink shadow-none hover:bg-partner-ink hover:text-partner-paper">
            <ArrowLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={next} aria-label="Next partner" className="h-12 w-12 rounded-full border-partner-ink bg-transparent text-partner-ink shadow-none hover:bg-partner-ink hover:text-partner-paper">
            <ArrowRight />
          </Button>
          <div className="mx-1 h-8 w-px bg-partner-ink/20" />
          <Button variant="outline" onClick={() => setPaused((value) => !value)} aria-pressed={paused} className="h-12 rounded-full border-partner-ink bg-transparent px-4 font-partner text-xs font-bold uppercase text-partner-ink shadow-none hover:bg-partner-ink hover:text-partner-paper">
            <span className={cn("h-2 w-2 rounded-full", paused ? "bg-partner-ink/35" : "bg-partner-coral")} />
            {paused ? <Play /> : <Pause />}
            {paused ? "Play" : "Pause"}
          </Button>
        </div>
      </div>

      <div className="partner-filmstrip -mx-4 mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2))] pb-14 pt-8 sm:gap-9 lg:-mx-[calc((100vw-80rem)/2)]">
        {partners.map((partner, index) => (
          <article
            key={partner.name}
            ref={(node) => { cardRefs.current[index] = node; }}
            onClick={() => show(index)}
            className={cn(
              "group relative w-[76vw] max-w-[292px] shrink-0 snap-center transition-[transform,opacity] duration-500 sm:w-[292px]",
              rotations[index % rotations.length],
              active === index ? "opacity-100" : "opacity-70 hover:opacity-100",
            )}
          >
            <div className={cn("partner-tape absolute -top-4 z-10 h-8 w-24 border-x border-partner-coral/15 bg-partner-coral/35", tapePositions[index % tapePositions.length])} />
            <div className="border border-partner-ink/10 bg-partner-matte p-3.5 pb-5 shadow-partner transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0 sm:p-4 sm:pb-6">
              <div className="aspect-[4/5] overflow-hidden border border-partner-ink/10 bg-partner-paper">
                <img
                  src={partner.logo}
                  alt={`${partner.name} community poster`}
                  loading={index < 5 ? "eager" : "lazy"}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 min-h-[74px]">
                <h3 className="font-partner text-base font-bold uppercase leading-tight text-partner-ink sm:text-lg">
                  {partner.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-[11px] font-medium uppercase leading-relaxed text-partner-coral">
                  {String(index + 1).padStart(2, "0")} / {partner.role}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-5">
        <span className="shrink-0 font-partner text-sm font-bold text-partner-ink">
          {String(active + 1).padStart(2, "0")} / {total}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-partner-ink/10" aria-hidden="true">
          <div
            className="h-full rounded-full bg-partner-coral transition-[width] duration-500"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
        <span className="hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-partner-ink/45 sm:block">
          Partners showcased
        </span>
      </div>
    </section>
  );
}
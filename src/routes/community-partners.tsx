import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { PartnerCarousel } from "@/components/partners/PartnerCarousel";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/community-partners")({
  head: () => ({
    meta: [
      { title: "Community Partners — Ajinava Edge" },
      { name: "description", content: "Meet the 23 communities partnering with Ajinava Edge to support builders, students and innovators." },
      { property: "og:title", content: "Community Partners — Ajinava Edge" },
      { property: "og:description", content: "Meet the communities building a stronger technology ecosystem with Ajinava Edge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <div className="overflow-hidden bg-partner-paper text-partner-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <PartnerCarousel />

        <section className="mt-24 grid border-y border-partner-ink/15 py-10 md:grid-cols-[1fr_auto] md:items-center md:gap-12" aria-labelledby="partner-invitation">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-partner-coral">Build with us</p>
            <h2 id="partner-invitation" className="mt-3 font-partner text-3xl font-bold text-partner-ink sm:text-4xl">
              Put your community in the next frame.
            </h2>
            <p className="mt-3 max-w-2xl text-partner-ink/65">
              Collaborate on events, workshops and meaningful opportunities for the next generation of builders.
            </p>
          </div>
          <Button asChild className="mt-7 h-12 rounded-full bg-partner-ink px-6 font-partner font-bold text-partner-paper shadow-none hover:bg-partner-coral md:mt-0">
            <Link to="/contact">Partner with us <ArrowUpRight /></Link>
          </Button>
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-partner-ink/55">
          <span className="font-partner text-base font-bold text-partner-ink">Team ILM Tech</span>
          <span className="inline-flex items-center gap-2">
            Driven by innovation <Heart className="h-4 w-4 fill-partner-coral text-partner-coral" />
          </span>
        </div>
      </div>
    </div>
  );
}
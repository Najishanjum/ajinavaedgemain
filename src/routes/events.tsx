import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, ArrowRight, X, Ticket, Users, Building2, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { EventRegisterDialog } from "@/components/events/EventRegisterDialog";
import { HostEventDialog, HostEventType } from "@/components/events/HostEventDialog";
import { events, highlightVideos } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Ajinava Edge" },
      { name: "description", content: "Hackathons, workshops, contests and summits from the Ajinava Edge community." },
      { property: "og:title", content: "Events — Ajinava Edge" },
      { property: "og:description", content: "Join hackathons, AI workshops, contests and the annual Ajinava Edge summit." },
    ],
  }),
  component: Events,
});

type EventCategory = "past" | "present" | "upcoming";

// All current events are past events
const categorizedEvents: Record<EventCategory, typeof events> = {
  past: [...events],
  present: [],
  upcoming: [],
};

const categoryLabels: Record<EventCategory, string> = {
  past: "Past",
  present: "Present",
  upcoming: "Upcoming",
};

function Events() {
  const [openPoster, setOpenPoster] = useState<{ src: string; alt: string } | null>(null);
  const [registerFor, setRegisterFor] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<EventCategory>("past");
  const [hostEventType, setHostEventType] = useState<HostEventType | null>(null);

  const filteredEvents = categorizedEvents[activeCategory];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-primary mb-3">Events</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold">
        Where builders <span className="text-gradient">meet</span>.
      </h1>
      <p className="text-muted-foreground mt-5 max-w-2xl">
        Hands-on workshops, weekend hackathons, contests and our flagship summit.
        All free for community members.
      </p>

      {/* Category tabs */}
      <div className="mt-10 flex gap-2">
        {(Object.keys(categoryLabels) as EventCategory[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
              activeCategory === cat
                ? "bg-foreground text-background shadow-lg"
                : "bg-secondary text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            {categoryLabels[cat]}
            <span className={`ml-2 inline-flex items-center justify-center min-w-[1.4rem] h-5 rounded-full text-[10px] px-1 ${
              activeCategory === cat
                ? "bg-background/20 text-background"
                : "bg-foreground/10 text-foreground/50"
            }`}>
              {categorizedEvents[cat].length}
            </span>
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="mt-16 text-center py-20">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="font-display text-2xl font-bold">No {categoryLabels[activeCategory].toLowerCase()} events</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            {activeCategory === "present"
              ? "There are no events happening right now. Check upcoming events or browse past events."
              : "Stay tuned! New events will be announced soon."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {filteredEvents.map((e) => (
            <article
              key={e.title}
              className="glass rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all flex flex-col"
            >
              {"image" in e && e.image && (
                <button
                  type="button"
                  onClick={() => setOpenPoster({ src: e.image as string, alt: e.title })}
                  className="group relative block w-full overflow-hidden bg-black/40 aspect-[16/9]"
                >
                  <img
                    src={e.image as string}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 text-white text-[10px] tracking-widest uppercase px-3 py-1 opacity-0 group-hover:opacity-100 transition">Tap to open</span>
                </button>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10">{e.type}</span>
                  {activeCategory === "past" && (
                    <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/50">Completed</span>
                  )}
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Calendar size={12} /> {e.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mt-3">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-1">{e.desc}</p>
                <div className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1">
                  <MapPin size={12} /> {e.location}
                </div>
                {"link" in e && e.link && (
                  <a
                    href={e.link as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
                  >
                    {("cta" in e && e.cta) || "Register Now"} <ArrowRight size={14} />
                  </a>
                )}
                {"secondaryLink" in e && e.secondaryLink && (
                  <a
                    href={e.secondaryLink as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    {("secondaryCta" in e && e.secondaryCta) || "Watch Session"} <ArrowRight size={14} />
                  </a>
                )}
                {activeCategory !== "past" && (
                  <button
                    type="button"
                    onClick={() => setRegisterFor(e.title)}
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Ticket size={14} /> Reserve a seat
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Host Events Feature Section */}
      <section className="mt-24 pt-16 border-t border-foreground/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary mb-3">
              [ Event Collaboration & Chapters ]
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Host with <span className="text-gradient">Ajinava Edge</span>.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm sm:text-base">
              Whether you're an independent creator launching a meetup or a campus leader organizing an official chapter event, we provide the platform, mentorship, and community power.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Host Your Events */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-foreground/10 p-8 sm:p-10 flex flex-col justify-between hover:border-primary/40 hover:shadow-elegant transition-all group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-foreground/5 text-foreground/70">
                  Community & Creators
                </span>
                <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary">
                  <Users size={20} />
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Host Your Events
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Got a workshop, meetup, hackathon, or AI demo day? Partner with Ajinava Edge to amplify your reach, access physical venues, and tap into 5,000+ active developers and builders.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  "Cross-promotion across our 5,000+ builder channels",
                  "Venue, AV livestream equipment & event space support",
                  "Ticketing, registration and attendee check-in tools",
                  "Ajinava Edge mentors & guest speakers for your panel",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-foreground/5">
              <button
                type="button"
                onClick={() => setHostEventType("community")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-primary hover:text-background transition-colors shadow-sm"
              >
                Host Your Event <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Card 2: Host Ajinava Edge Events */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-foreground/10 p-8 sm:p-10 flex flex-col justify-between hover:border-[#D97757]/40 hover:shadow-elegant transition-all group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97757]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#D97757]/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#D97757]/10 text-[#D97757]">
                  Official Chapter & Campus
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#D97757]/10 flex items-center justify-center text-[#D97757]">
                  <Building2 size={20} />
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Host Ajinava Edge Events
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Bring official Ajinava Edge hackathons, AI bootcamps, and developer summits directly to your college, company, or city. We provide turnkey event decks, funding grants, and swag kits.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  "Official Ajinava Edge branding, kits & attendee certificates",
                  "Flagship swag packs: hoodies, tees, stickers & badges",
                  "Keynote speakers, AI researchers & industry judges",
                  "Event sponsorship grants & chapter leader stipends",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-4 h-4 rounded-full bg-[#D97757]/15 text-[#D97757] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-foreground/5">
              <button
                type="button"
                onClick={() => setHostEventType("official")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge text-primary-foreground px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] shadow-glow hover:scale-[1.01] transition-transform"
              >
                Host Ajinava Edge Event <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-24">
        <div className="text-xs uppercase tracking-widest text-primary mb-3">Highlights</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Moments from <span className="text-gradient">the community</span>.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Quick recaps, reels and behind-the-scenes clips from our recent events.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightVideos.map((v) => (
            <div key={v.id} className="glass rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all flex flex-col">
              <div className="relative aspect-[9/16] bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=1&playsinline=1&modestbranding=1&rel=0`}
                  title={`Highlight ${v.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {v.cta && (
                <a
                  href={v.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
                >
                  {v.cta.label} <ArrowRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {registerFor && (
        <EventRegisterDialog eventTitle={registerFor} onClose={() => setRegisterFor(null)} />
      )}

      {hostEventType && (
        <HostEventDialog type={hostEventType} onClose={() => setHostEventType(null)} />
      )}

      {openPoster && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setOpenPoster(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenPoster(null)}
            className="absolute top-5 right-5 rounded-full bg-white/10 hover:bg-white/20 text-white p-2"
          >
            <X size={20} />
          </button>
          <img
            src={openPoster.src}
            alt={openPoster.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

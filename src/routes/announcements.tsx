import { createFileRoute } from "@tanstack/react-router";
import { announcements } from "@/lib/site-data";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — Ajinava Edge" },
      { name: "description", content: "Latest news, launches and updates from Ajinava Edge." },
      { property: "og:title", content: "Announcements — Ajinava Edge" },
      { property: "og:description", content: "Product launches, partnerships and community milestones." },
    ],
  }),
  component: Announcements,
});

function Announcements() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-primary mb-3">Announcements</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold">
        What's <span className="text-gradient">new</span>.
      </h1>

      <div className="mt-12 space-y-5">
        {announcements.map((a) => (
          <article key={a.title} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-gradient-edge text-primary-foreground font-semibold">{a.tag}</span>
              <span className="text-muted-foreground">{a.date}</span>
            </div>
            <h3 className="font-display text-xl font-bold mt-3">{a.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

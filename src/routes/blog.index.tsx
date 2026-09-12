import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { listPublishedPosts, type PublicPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/")({
  loader: async (): Promise<PublicPost[]> => (await listPublishedPosts()) as PublicPost[],

  head: () => ({
    meta: [
      { title: "Resources & Insights — Ajinava Edge" },
      {
        name: "description",
        content:
          "Guides, roadmaps and playbooks on AI, Web3 and building a tech career — written by the Ajinava Edge mentors.",
      },
      { property: "og:title", content: "Resources & Insights — Ajinava Edge" },
      {
        property: "og:description",
        content: "Practical AI, Web3 and career guides from the Ajinava Edge community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center" role="alert">
      <h1 className="font-display text-3xl font-bold">Couldn't load resources</h1>
      <p className="text-muted-foreground mt-3">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">No resources yet.</div>
  ),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData() as PublicPost[];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-xs uppercase tracking-widest text-primary mb-3">Resources</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold">
        Learn at the <span className="text-gradient">edge</span>.
      </h1>
      <p className="text-muted-foreground mt-5 max-w-2xl">
        Roadmaps, playbooks and field notes on AI, Web3 and building a career that compounds.
        Written by the mentors who run our sessions.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 text-muted-foreground">
          Our first articles are being written — check back shortly.
        </p>
      ) : (
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="glass rounded-2xl p-6 flex flex-col hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              {p.cover_image && (
                <img
                  src={p.cover_image}
                  alt={p.title}
                  loading="lazy"
                  className="mb-5 h-40 w-full rounded-xl object-cover"
                />
              )}
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  {p.category}
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  <Clock size={12} /> {p.read_minutes} min read
                </span>
              </div>
              <h2 className="font-display text-xl font-bold mt-4">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 flex-1 leading-relaxed">
                {p.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock } from "lucide-react";
import { getPublishedPost, type PublicPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<PublicPost> => {
    const post = (await getPublishedPost({ data: { slug: params.slug } })) as PublicPost | null;
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — Ajinava Edge" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — Ajinava Edge`;
    const description = loaderData.excerpt ?? "An Ajinava Edge resource on AI, Web3 and building.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center" role="alert">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-3">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="text-primary mt-4 inline-block font-semibold">
        Back to all resources
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData() as PublicPost;

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} /> All resources
      </Link>

      <div className="mt-8 flex items-center gap-3 text-xs">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
          {post.category}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1">
          <Clock size={12} /> {post.read_minutes} min read
        </span>
        {post.published_at && (
          <span className="text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-bold mt-5 leading-[1.05]">
        {post.title}
      </h1>
      {post.excerpt && <p className="text-lg text-muted-foreground mt-5">{post.excerpt}</p>}

      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="mt-10 w-full rounded-2xl object-cover"
        />
      )}

      <div className="prose prose-neutral max-w-none mt-10 prose-headings:font-display prose-headings:font-bold prose-a:text-primary">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-16 glass rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl font-bold">Want mentorship on this?</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Join the Ajinava Edge community and build alongside people on the same path.
        </p>
        <a
          href="https://linktr.ee/ajinavaedge"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-gradient-edge px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
        >
          Join the community
        </a>
      </div>
    </article>
  );
}

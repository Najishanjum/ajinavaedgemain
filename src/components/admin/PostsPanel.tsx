import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listAllPosts, savePost, deletePost } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2, Pencil, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[] | null;
  read_minutes: number;
  published: boolean;
  created_at: string;
};

const empty = {
  id: null as string | null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Resources",
  tags: "",
  readMinutes: 4,
  published: true,
};

export function PostsPanel({ onChanged }: { onChanged?: () => void }) {
  const fetchPosts = useServerFn(listAllPosts);
  const save = useServerFn(savePost);
  const remove = useServerFn(deletePost);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setPosts((await fetchPosts()) as Post[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load posts.");
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startNew() {
    setForm({ ...empty });
    setEditing(true);
  }

  function startEdit(p: Post) {
    setForm({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? "",
      content: p.content,
      coverImage: p.cover_image ?? "",
      category: p.category,
      tags: (p.tags ?? []).join(", "),
      readMinutes: p.read_minutes,
      published: p.published,
    });
    setEditing(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await save({ data: form });
      toast.success(form.id ? "Article updated." : "Article published.");
      setEditing(false);
      await load();
      onChanged?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save article.");
    } finally {
      setBusy(false);
    }
  }

  async function destroy(id: string) {
    setBusy(true);
    try {
      await remove({ data: { id } });
      await load();
      onChanged?.();
      toast.success("Article deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete article.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (editing) {
    return (
      <form onSubmit={submit} className="mt-2 max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">{form.id ? "Edit article" : "New article"}</h3>
          <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
        <Field label="Title">
          <Input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="URL slug (optional)">
            <Input
              value={form.slug}
              placeholder="auto from title"
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </Field>
          <Field label="Category">
            <Input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </Field>
          <Field label="Read minutes">
            <Input
              type="number"
              min={1}
              max={60}
              value={form.readMinutes}
              onChange={(e) => setForm({ ...form, readMinutes: Number(e.target.value) })}
            />
          </Field>
        </div>
        <Field label="Cover image URL (optional)">
          <Input
            value={form.coverImage}
            placeholder="/images/my-cover.jpg"
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
        </Field>
        <Field label="Excerpt">
          <Textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </Field>
        <Field label="Content (Markdown)">
          <Textarea
            rows={14}
            required
            className="font-mono text-xs"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </Field>
        <Field label="Tags (comma separated)">
          <Input
            value={form.tags}
            placeholder="ai, career, web3"
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <Switch
            checked={form.published}
            onCheckedChange={(v) => setForm({ ...form, published: v })}
          />
          Published (visible on the public site)
        </label>
        <Button type="submit" className="rounded-full" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {form.id ? "Save changes" : "Publish article"}
        </Button>
      </form>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">{posts.length} article(s)</span>
        <Button className="rounded-full" onClick={startNew}>
          <Plus className="h-4 w-4" /> New article
        </Button>
      </div>

      <div className="mt-6 grid gap-3">
        {posts.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No articles yet — create your first one.
          </p>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-foreground/10 bg-background/70 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold">{p.title}</p>
                  <Badge variant={p.published ? "default" : "secondary"}>
                    {p.published ? "Live" : "Draft"}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  /blog/{p.slug} · {p.category} · {p.read_minutes} min
                </p>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 hover:bg-foreground/10"
                  aria-label="View article"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Button variant="ghost" size="icon" onClick={() => startEdit(p)} aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={busy}
                  onClick={() => destroy(p.id)}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

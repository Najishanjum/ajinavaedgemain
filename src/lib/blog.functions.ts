import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const POST_COLUMNS =
  "id, title, slug, excerpt, content, cover_image, category, tags, read_minutes, published, published_at, created_at, updated_at";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("posts")
    .select(POST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(60);
  if (error) return [];
  return data ?? [];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => ({ slug: String(input.slug).slice(0, 200) }))
  .handler(async ({ data: input }) => {
    const { data, error } = await publicClient()
      .from("posts")
      .select(POST_COLUMNS)
      .eq("slug", input.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) return null;
    return data ?? null;
  });

export type PublicPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  read_minutes: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

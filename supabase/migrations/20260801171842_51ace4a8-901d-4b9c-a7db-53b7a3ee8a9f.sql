CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  cover_image text,
  category text NOT NULL DEFAULT 'Resources',
  tags text[] NOT NULL DEFAULT '{}',
  read_minutes integer NOT NULL DEFAULT 4,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Admins can read all posts"
  ON public.posts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug text NOT NULL,
  event_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX event_registrations_unique_email_per_event
  ON public.event_registrations (event_slug, lower(email));

GRANT INSERT ON public.event_registrations TO anon;
GRANT SELECT, INSERT, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit valid registrations"
  ON public.event_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(event_slug)) BETWEEN 1 AND 120
    AND char_length(btrim(event_title)) BETWEEN 1 AND 200
    AND char_length(btrim(name)) BETWEEN 2 AND 100
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND char_length(email) <= 255
    AND (phone IS NULL OR char_length(phone) <= 30)
    AND (organization IS NULL OR char_length(organization) <= 150)
    AND (note IS NULL OR char_length(note) <= 1000)
  );

CREATE POLICY "Admins can view registrations"
  ON public.event_registrations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete registrations"
  ON public.event_registrations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.posts (title, slug, excerpt, content, category, tags, read_minutes, published, published_at)
VALUES
(
  'Getting Started with Web3: A Student''s Roadmap',
  'getting-started-with-web3',
  'A practical, no-fluff path from zero to your first on-chain project — the exact route we teach inside BEW3.',
  E'## Why Web3, and why now\n\nWeb3 is not just tokens. It is a new way to build software where users own their data, identity and assets. For students, it is one of the few fields where a strong GitHub profile still beats a fancy degree.\n\n## The four-week roadmap\n\n1. **Week 1 — Foundations.** Learn how blockchains reach consensus, what a wallet actually is, and read one real block explorer transaction end to end.\n2. **Week 2 — Solidity basics.** Variables, mappings, modifiers, events. Ship a token and an NFT on a testnet.\n3. **Week 3 — Frontend integration.** Connect a React app with wagmi/viem, read contract state, send a transaction.\n4. **Week 4 — Ship something small.** A tipping page, an on-chain guestbook, a DAO vote. Small and finished beats big and abandoned.\n\n## What to avoid\n\n- Tutorial loops. If you have watched three courses and shipped nothing, stop watching.\n- Chasing hype chains. Fundamentals transfer; ecosystems come and go.\n\n## Where Ajinava Edge fits in\n\nInside **BEW3 (Build Everyday Web3)** we run this exact roadmap with weekly check-ins, mentor reviews and a demo day. You build in public, we keep you accountable.',
  'Web3',
  ARRAY['web3','blockchain','beginners','roadmap'],
  6,
  true,
  now() - interval '9 days'
),
(
  'AI Projects That Actually Get You Hired',
  'ai-projects-that-get-you-hired',
  'Recruiters skim. These five project patterns survive the skim — and the follow-up interview questions.',
  E'## The problem with most AI portfolios\n\nEverybody has a Titanic notebook and a sentiment classifier. Neither says anything about how you think. What hiring managers look for is evidence that you can take an ambiguous problem, scope it, and ship something a human can use.\n\n## Five patterns that work\n\n1. **A retrieval assistant over a real corpus.** Your college notes, a public dataset, a niche wiki. Show the chunking strategy and how you evaluated answers.\n2. **A model in production.** Any model, deployed, with latency and cost numbers. This alone puts you ahead of most applicants.\n3. **An evaluation harness.** Show you can measure quality, not just generate output.\n4. **A fine-tune with a before/after.** Small model, narrow task, clear metric.\n5. **An automation that saves someone real time.** Bonus points if the someone is not you.\n\n## How to present them\n\nOne README per project with the problem, the decision you made, the tradeoff you rejected, and a 30-second demo GIF. Keep the writing plain.\n\n## Get feedback\n\nBring your project to an Ajinava Edge mentor session and we will review it the way an interviewer would.',
  'AI',
  ARRAY['ai','career','portfolio','machine learning'],
  5,
  true,
  now() - interval '4 days'
),
(
  'How to Win Your First Hackathon',
  'how-to-win-your-first-hackathon',
  'Scope, story and sleep — what separates winning teams from teams with better code.',
  E'## Hackathons reward clarity, not complexity\n\nJudges see forty demos in three hours. The team that explains a real problem in one sentence and shows it solved in ninety seconds wins over the team with a beautiful microservice architecture nobody can see.\n\n## The playbook\n\n- **Hour 0–2: pick a painfully specific problem.** "Attendance for lab sessions" beats "education platform".\n- **Hour 2–4: decide what you will NOT build.** Write it down. Protect it.\n- **Mid-event: build the demo path first.** Only the screens in your demo need to work.\n- **Last 3 hours: freeze features.** Rehearse the pitch out loud three times.\n\n## Team roles that work\n\nOne person owns the frontend, one owns the backend/data, one owns the pitch and slides. The pitch owner is not a spare — they are the reason you win.\n\n## Edge Hack\n\nWe run **Edge Hack** every year with mentors on the floor for exactly this kind of coaching. Come with a team, leave with a shipped project.',
  'Community',
  ARRAY['hackathon','teamwork','projects'],
  4,
  true,
  now() - interval '1 day'
);
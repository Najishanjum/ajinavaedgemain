CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  requirement TEXT,
  source TEXT DEFAULT 'chatbot',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon visitors) can submit a lead via the chatbot
CREATE POLICY "Anyone can insert leads"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read; only service role (used by server) can read
CREATE POLICY "No public read"
ON public.leads FOR SELECT
TO authenticated
USING (false);
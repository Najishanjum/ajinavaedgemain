
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Public can submit valid leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND char_length(btrim(name)) BETWEEN 1 AND 100
  AND email IS NOT NULL
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND char_length(email) <= 255
  AND requirement IS NOT NULL
  AND char_length(btrim(requirement)) BETWEEN 5 AND 2000
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND (source IS NULL OR char_length(source) <= 50)
);

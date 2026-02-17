
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (no auth required for lead capture)
CREATE POLICY "Anyone can submit their quiz result"
  ON public.quiz_leads
  FOR INSERT
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE for anonymous users (admin only via dashboard)

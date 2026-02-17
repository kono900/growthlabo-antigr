
-- Fix 1: Block UPDATE and DELETE on quiz_leads
CREATE POLICY "No updates allowed" ON public.quiz_leads FOR UPDATE USING (false);
CREATE POLICY "No deletes allowed" ON public.quiz_leads FOR DELETE USING (false);

-- Fix 2: Add server-side email validation constraint
ALTER TABLE public.quiz_leads
ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

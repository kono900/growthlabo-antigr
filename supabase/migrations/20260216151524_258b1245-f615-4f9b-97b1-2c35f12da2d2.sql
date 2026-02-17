-- Add unique constraint on email to prevent duplicate submissions
ALTER TABLE public.quiz_leads ADD CONSTRAINT quiz_leads_email_unique UNIQUE (email);
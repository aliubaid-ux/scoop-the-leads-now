-- Create tables for freemium model

-- Table to track anonymous user usage (by session/IP)
CREATE TABLE public.usage_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'search_generated', 'hashtag_selected', etc.
  search_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for saved searches (authenticated users only)
CREATE TABLE public.saved_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  hashtags TEXT[],
  phrases TEXT[],
  custom_keywords TEXT,
  search_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for search history (authenticated users only)
CREATE TABLE public.search_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hashtags TEXT[],
  phrases TEXT[],
  custom_keywords TEXT,
  search_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for usage_tracking
CREATE POLICY "Users can view their own usage" ON public.usage_tracking
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own usage" ON public.usage_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own usage" ON public.usage_tracking
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- RLS policies for saved_searches
CREATE POLICY "Users can view their own saved searches" ON public.saved_searches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved searches" ON public.saved_searches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved searches" ON public.saved_searches
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved searches" ON public.saved_searches
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for search_history
CREATE POLICY "Users can view their own search history" ON public.search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own search history" ON public.search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON public.saved_searches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
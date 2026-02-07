-- AutoCall initial schema: profiles, companies, call_requests + RLS

-- Enum for call request status
CREATE TYPE call_request_status AS ENUM ('pending', 'initiated', 'completed');

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT UNIQUE,
  credits INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Companies (predefined list)
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Call requests
CREATE TABLE public.call_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
  status call_request_status NOT NULL DEFAULT 'pending',
  user_voice_preference TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed companies
INSERT INTO public.companies (name, logo_url, slug) VALUES
  ('Bancolombia', NULL, 'bancolombia'),
  ('EPS Sanitas', NULL, 'eps-sanitas'),
  ('Movistar', NULL, 'movistar'),
  ('Claro', NULL, 'claro'),
  ('Éxito', NULL, 'exito');

-- Trigger: update updated_at on profiles
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Trigger: create profile on signup (auth.users insert)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS: profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can do everything for server-side (e.g. decrement credits)
CREATE POLICY "Service role full access profiles"
  ON public.profiles FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- RLS: companies (public read)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read companies"
  ON public.companies FOR SELECT
  TO public
  USING (true);

-- RLS: call_requests
ALTER TABLE public.call_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own call_requests"
  ON public.call_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own call_requests"
  ON public.call_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own call_requests"
  ON public.call_requests FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access call_requests"
  ON public.call_requests FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Indexes for common queries
CREATE INDEX idx_call_requests_user_id ON public.call_requests(user_id);
CREATE INDEX idx_call_requests_created_at ON public.call_requests(created_at DESC);

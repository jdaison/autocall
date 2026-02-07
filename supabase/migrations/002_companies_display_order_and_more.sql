-- Add display_order for "most requested" ordering and more companies
ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 999;

-- Set "most requested" order: Claro, Movistar, Sura, Colsanitas first
UPDATE public.companies SET display_order = 1 WHERE slug = 'claro';
UPDATE public.companies SET display_order = 2 WHERE slug = 'movistar';
UPDATE public.companies SET display_order = 10 WHERE slug = 'bancolombia';
UPDATE public.companies SET display_order = 11 WHERE slug = 'eps-sanitas';
UPDATE public.companies SET display_order = 12 WHERE slug = 'exito';

-- Insert Sura and Colsanitas if not present (most requested)
INSERT INTO public.companies (name, logo_url, slug, display_order)
VALUES
  ('Sura', NULL, 'sura', 3),
  ('Colsanitas', NULL, 'colsanitas', 4)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order;

-- Ensure other existing companies have a high order
UPDATE public.companies SET display_order = 999 WHERE display_order = 0 OR display_order IS NULL;

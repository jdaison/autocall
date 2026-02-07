-- Campos extra para call_requests: descripción, datos del titular, voz, notificaciones

ALTER TABLE public.call_requests
  ADD COLUMN IF NOT EXISTS call_description TEXT,
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_document TEXT,
  ADD COLUMN IF NOT EXISTS contact_address TEXT,
  ADD COLUMN IF NOT EXISTS voice_gender TEXT CHECK (voice_gender IS NULL OR voice_gender IN ('female', 'male')),
  ADD COLUMN IF NOT EXISTS whatsapp_notify BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS notify_frequency TEXT CHECK (notify_frequency IS NULL OR notify_frequency IN ('every_5_min', 'at_end')),
  ADD COLUMN IF NOT EXISTS join_if_human_needed BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.call_requests.call_description IS 'Descripción del trámite o motivo de la llamada';
COMMENT ON COLUMN public.call_requests.contact_name IS 'Nombre completo del titular del trámite';
COMMENT ON COLUMN public.call_requests.contact_document IS 'Documento de identidad';
COMMENT ON COLUMN public.call_requests.contact_address IS 'Dirección para el trámite';
COMMENT ON COLUMN public.call_requests.voice_gender IS 'female = femenina, male = masculina';
COMMENT ON COLUMN public.call_requests.whatsapp_notify IS 'Si desea notificaciones por WhatsApp';
COMMENT ON COLUMN public.call_requests.notify_frequency IS 'every_5_min o at_end';
COMMENT ON COLUMN public.call_requests.join_if_human_needed IS 'Unir al usuario a la llamada si la IA detecta que necesita intervención humana';

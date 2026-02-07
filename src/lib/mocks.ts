import type { Company } from "@/types/database";

/** UUIDs fijos para que el wizard y la action mock usen los mismos IDs. */
export const MOCK_COMPANIES: Company[] = [
  { id: "11111111-1111-1111-1111-111111111101", name: "Claro", logo_url: null, slug: "claro", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111102", name: "Movistar", logo_url: null, slug: "movistar", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111103", name: "Sura", logo_url: null, slug: "sura", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111104", name: "Colsanitas", logo_url: null, slug: "colsanitas", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111105", name: "Bancolombia", logo_url: null, slug: "bancolombia", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111106", name: "EPS Sanitas", logo_url: null, slug: "eps-sanitas", created_at: new Date().toISOString() },
  { id: "11111111-1111-1111-1111-111111111107", name: "Éxito", logo_url: null, slug: "exito", created_at: new Date().toISOString() },
];

/** Devuelve true si se deben usar mocks en lugar de Supabase/Twilio (solo servidor). */
export function isMocksEnabled(): boolean {
  return process.env.USE_MOCKS === "true" || process.env.USE_MOCKS === "1";
}

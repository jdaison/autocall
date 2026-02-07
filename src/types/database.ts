export type CallRequestStatus = "pending" | "initiated" | "completed";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  credits: number;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  slug: string;
  created_at: string;
  display_order?: number;
}

export interface CallRequest {
  id: string;
  user_id: string;
  company_id: string;
  status: CallRequestStatus;
  user_voice_preference: string;
  created_at: string;
  call_description?: string | null;
  contact_name?: string | null;
  contact_document?: string | null;
  contact_address?: string | null;
  voice_gender?: "female" | "male" | null;
  whatsapp_notify?: boolean;
  notify_frequency?: "every_5_min" | "at_end" | null;
  join_if_human_needed?: boolean;
}

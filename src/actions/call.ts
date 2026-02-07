"use server";

import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { initiateCallSchema } from "@/lib/validations/onboarding";
import { getTwilioClient } from "@/lib/twilio";
import { isMocksEnabled } from "@/lib/mocks";

export interface InitiateCallResult {
  success: boolean;
  error?: string;
}

export async function initiateCallAction(
  input: unknown
): Promise<InitiateCallResult> {
  const parsed = initiateCallSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Datos inválidos",
    };
  }

  const {
    phone,
    companyId,
    voicePreference,
    callDescription,
    contactName,
    contactDocument,
    contactAddress,
    voiceGender,
    whatsappNotify,
    notifyFrequency,
    joinIfHumanNeeded,
  } = parsed.data;

  if (isMocksEnabled()) {
    return {
      success: true,
      // En modo mock no se hace llamada real ni se persiste en BD
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Debes iniciar sesión para usar AutoCall." };
  }

  const serviceClient = createServiceRoleClient();

  const { data: profile, error: profileError } = await serviceClient
    .from("profiles")
    .select("id, credits, phone")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { success: false, error: "No se encontró tu perfil. Intenta de nuevo." };
  }

  if (profile.credits < 1) {
    return {
      success: false,
      error: "No tienes créditos disponibles. Prueba más tarde o contacta soporte.",
    };
  }

  const { data: callRequest, error: insertError } = await serviceClient
    .from("call_requests")
    .insert({
      user_id: user.id,
      company_id: companyId,
      status: "pending",
      user_voice_preference: voicePreference,
      call_description: callDescription,
      contact_name: contactName,
      contact_document: contactDocument,
      contact_address: contactAddress,
      voice_gender: voiceGender,
      whatsapp_notify: whatsappNotify,
      notify_frequency: notifyFrequency,
      join_if_human_needed: joinIfHumanNeeded,
    })
    .select("id")
    .single();

  if (insertError || !callRequest) {
    return {
      success: false,
      error: "No se pudo registrar la solicitud. Intenta de nuevo.",
    };
  }

  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!twilioNumber) {
    await serviceClient
      .from("call_requests")
      .update({ status: "pending" })
      .eq("id", callRequest.id);
    return {
      success: false,
      error: "Configuración de Twilio incompleta. Contacta soporte.",
    };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const twimlUrl = `${baseUrl}/api/twiml/outbound`;

  try {
    const twilio = getTwilioClient();
    await twilio.calls.create({
      to: phone,
      from: twilioNumber,
      url: twimlUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al iniciar la llamada";
    await serviceClient
      .from("call_requests")
      .update({ status: "pending" })
      .eq("id", callRequest.id);
    return {
      success: false,
      error: `No se pudo conectar la llamada: ${message}`,
    };
  }

  await serviceClient
    .from("call_requests")
    .update({ status: "initiated" })
    .eq("id", callRequest.id);

  await serviceClient
    .from("profiles")
    .update({ credits: profile.credits - 1, phone: phone })
    .eq("id", user.id);

  return { success: true };
}

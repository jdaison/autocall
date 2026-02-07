import { z } from "zod";

/** Colombian mobile: 10 digits starting with 3. E.164: +57 + 10 digits. */
export const phoneSchema = z
  .string()
  .min(10, "Mínimo 10 dígitos")
  .max(15, "Máximo 15 caracteres")
  .refine(
    (val) => {
      const digits = val.replace(/\D/g, "");
      const normalized = digits.startsWith("57") ? digits : "57" + digits;
      return normalized.length === 12 && normalized.startsWith("573");
    },
    { message: "Ingresa un número válido (ej: 3001234567 o +573001234567)" }
  )
  .transform((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.startsWith("57") ? "+" + digits : "+57" + digits;
  });

export const contactNameSchema = z
  .string()
  .min(2, "Mínimo 2 caracteres")
  .max(120, "Máximo 120 caracteres")
  .trim();

export const contactDocumentSchema = z
  .string()
  .min(5, "Mínimo 5 caracteres")
  .max(20, "Máximo 20 caracteres")
  .trim();

export const contactAddressSchema = z
  .string()
  .min(5, "Mínimo 5 caracteres")
  .max(300, "Máximo 300 caracteres")
  .trim();

export const companyIdSchema = z.string().uuid("Selecciona una empresa");

export const callDescriptionSchema = z
  .string()
  .min(10, "Describe en al menos 10 caracteres el motivo de tu llamada")
  .max(2000, "Máximo 2000 caracteres")
  .trim();

export const voicePreferenceSchema = z.enum(["predefined", "custom"], {
  required_error: "Elige una opción de voz",
});

export const voiceGenderSchema = z.enum(["female", "male"], {
  required_error: "Elige el tipo de voz",
});
export type VoiceGender = z.infer<typeof voiceGenderSchema>;

export type VoicePreference = z.infer<typeof voicePreferenceSchema>;

export const notifyFrequencySchema = z.enum(["every_5_min", "at_end"]);
export type NotifyFrequency = z.infer<typeof notifyFrequencySchema>;

export const initiateCallSchema = z
  .object({
    phone: phoneSchema,
    contactName: contactNameSchema,
    contactDocument: contactDocumentSchema,
    contactAddress: contactAddressSchema,
    companyId: companyIdSchema,
    callDescription: callDescriptionSchema,
    voicePreference: voicePreferenceSchema,
    voiceGender: voiceGenderSchema,
    whatsappNotify: z.boolean(),
    notifyFrequency: notifyFrequencySchema.nullable(),
    joinIfHumanNeeded: z.boolean(),
  })
  .refine(
    (data) => !data.whatsappNotify || data.notifyFrequency !== null,
    { message: "Elige cuándo quieres recibir notificaciones por WhatsApp", path: ["notifyFrequency"] }
  );

export type InitiateCallInput = z.infer<typeof initiateCallSchema>;

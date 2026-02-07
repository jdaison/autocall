"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  phoneSchema,
  contactNameSchema,
  contactDocumentSchema,
  contactAddressSchema,
} from "@/lib/validations/onboarding";

export interface PersonalDataForm {
  phone: string;
  contactName: string;
  contactDocument: string;
  contactAddress: string;
}

interface StepPersonalDataProps {
  initial: Partial<PersonalDataForm>;
  onNext: (data: PersonalDataForm) => void;
}

export function StepPersonalData({ initial, onNext }: StepPersonalDataProps) {
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [contactName, setContactName] = useState(initial.contactName ?? "");
  const [contactDocument, setContactDocument] = useState(initial.contactDocument ?? "");
  const [contactAddress, setContactAddress] = useState(initial.contactAddress ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const phoneResult = phoneSchema.safeParse(phone.trim());
    if (!phoneResult.success) {
      setError(phoneResult.error.errors[0]?.message ?? "Teléfono inválido");
      return;
    }
    const nameResult = contactNameSchema.safeParse(contactName.trim());
    if (!nameResult.success) {
      setError(nameResult.error.errors[0]?.message ?? "Nombre inválido");
      return;
    }
    const docResult = contactDocumentSchema.safeParse(contactDocument.trim());
    if (!docResult.success) {
      setError(docResult.error.errors[0]?.message ?? "Documento inválido");
      return;
    }
    const addrResult = contactAddressSchema.safeParse(contactAddress.trim());
    if (!addrResult.success) {
      setError(addrResult.error.errors[0]?.message ?? "Dirección inválida");
      return;
    }

    onNext({
      phone: phoneResult.data,
      contactName: nameResult.data,
      contactDocument: docResult.data,
      contactAddress: addrResult.data,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Datos del titular del trámite para poder realizar la gestión.
      </p>
      <div className="space-y-2">
        <Label htmlFor="phone">Número de celular</Label>
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="300 123 4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="min-h-[48px] text-base"
          aria-invalid={!!error}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactName">Nombre completo</Label>
        <Input
          id="contactName"
          type="text"
          autoComplete="name"
          placeholder="Ej: Juan Pérez"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          className="min-h-[48px] text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactDocument">Documento de identidad</Label>
        <Input
          id="contactDocument"
          type="text"
          autoComplete="off"
          placeholder="Ej: C.C. 123456789"
          value={contactDocument}
          onChange={(e) => setContactDocument(e.target.value)}
          className="min-h-[48px] text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactAddress">Dirección (para el trámite)</Label>
        <Input
          id="contactAddress"
          type="text"
          autoComplete="street-address"
          placeholder="Ciudad, barrio, dirección"
          value={contactAddress}
          onChange={(e) => setContactAddress(e.target.value)}
          className="min-h-[48px] text-base"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full min-h-[48px]">
        Siguiente
      </Button>
    </form>
  );
}

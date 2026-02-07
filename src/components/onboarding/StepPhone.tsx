"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { phoneSchema } from "@/lib/validations/onboarding";

interface StepPhoneProps {
  initialPhone: string;
  onNext: (phone: string) => void;
}

export function StepPhone({ initialPhone, onNext }: StepPhoneProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = phoneSchema.safeParse(phone.trim());
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Número inválido");
      return;
    }
    onNext(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full min-h-[48px]">
        Siguiente
      </Button>
    </form>
  );
}

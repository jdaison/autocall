"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { callDescriptionSchema } from "@/lib/validations/onboarding";
import { cn } from "@/lib/utils";

const COMMON_OPTIONS = [
  "Solicitar información sobre un producto o servicio",
  "Reportar un problema o reclamo",
  "Consultar estado de un trámite o solicitud",
  "Agendar cita o modificar una existente",
  "Cancelar o dar de baja un servicio",
  "Solicitar factura o documentos",
  "Consultar saldos, pagos o movimientos",
  "Activación o configuración de servicio",
];

interface StepCallDescriptionProps {
  initialValue: string;
  onNext: (description: string) => void;
  onBack: () => void;
}

export function StepCallDescription({
  initialValue,
  onNext,
  onBack,
}: StepCallDescriptionProps) {
  const [description, setDescription] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = callDescriptionSchema.safeParse(description.trim());
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Descripción inválida");
      return;
    }
    onNext(result.data);
  };

  const pickOption = (option: string) => {
    setDescription((prev) => (prev ? `${prev}. ${option}` : option));
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Describe el motivo de tu llamada para que la IA pueda atenderte mejor.
      </p>
      <div className="space-y-2">
        <Label htmlFor="callDescription">Descripción del trámite o motivo</Label>
        <textarea
          id="callDescription"
          rows={4}
          placeholder="Ej: Necesito consultar el estado de mi solicitud de crédito y saber qué documentos faltan..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(null);
          }}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-y"
          aria-invalid={!!error}
        />
        <p className="text-xs text-muted-foreground">
          Opciones más usadas (toca para agregar) o escribe lo que necesites.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {COMMON_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => pickOption(option)}
            className={cn(
              "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors min-h-[40px]"
            )}
          >
            {option.length > 45 ? option.slice(0, 45) + "…" : option}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="min-h-[48px] flex-1">
          Atrás
        </Button>
        <Button type="submit" size="lg" className="min-h-[48px] flex-1">
          Siguiente
        </Button>
      </div>
    </form>
  );
}

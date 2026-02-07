"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { NotifyFrequency } from "@/lib/validations/onboarding";
import { MessageCircle, Bell, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepNotificationsProps {
  whatsappNotify: boolean;
  notifyFrequency: NotifyFrequency | null;
  joinIfHumanNeeded: boolean;
  onWhatsappNotify: (value: boolean) => void;
  onNotifyFrequency: (value: NotifyFrequency | null) => void;
  onJoinIfHumanNeeded: (value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepNotifications({
  whatsappNotify,
  notifyFrequency,
  joinIfHumanNeeded,
  onWhatsappNotify,
  onNotifyFrequency,
  onJoinIfHumanNeeded,
  onNext,
  onBack,
}: StepNotificationsProps) {
  const canNext = !whatsappNotify || (whatsappNotify && notifyFrequency !== null);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Elige cómo quieres que te mantengamos informado durante y después de la llamada.
      </p>

      <div>
        <Label className="mb-3 flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          ¿Notificaciones por WhatsApp?
        </Label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              onWhatsappNotify(true);
              if (!notifyFrequency) onNotifyFrequency("at_end");
            }}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors min-h-[48px]",
              whatsappNotify
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            <span className="font-medium">Sí</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onWhatsappNotify(false);
              onNotifyFrequency(null);
            }}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors min-h-[48px]",
              !whatsappNotify
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            <span className="font-medium">No</span>
          </button>
        </div>
      </div>

      {whatsappNotify && (
        <div>
          <Label className="mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            ¿Cuándo notificar?
          </Label>
          <RadioGroup
            value={notifyFrequency ?? undefined}
            onValueChange={(v) => onNotifyFrequency(v as NotifyFrequency)}
            className="grid gap-3"
          >
            <label className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px]">
              <RadioGroupItem value="every_5_min" id="freq-5" />
              <span className="font-medium">Cada 5 minutos (progreso)</span>
            </label>
            <label className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px]">
              <RadioGroupItem value="at_end" id="freq-end" />
              <span className="font-medium">Solo al final (resultado)</span>
            </label>
          </RadioGroup>
        </div>
      )}

      <div>
        <Label className="mb-3 flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          ¿Unirte a la llamada si la IA detecta que necesitas intervención humana?
        </Label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onJoinIfHumanNeeded(true)}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors min-h-[48px]",
              joinIfHumanNeeded
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            <span className="font-medium">Sí</span>
          </button>
          <button
            type="button"
            onClick={() => onJoinIfHumanNeeded(false)}
            className={cn(
              "flex-1 rounded-lg border p-4 text-center transition-colors min-h-[48px]",
              !joinIfHumanNeeded
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            <span className="font-medium">No</span>
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Si la IA detecta que un agente humano debe atenderte, te uniremos a la llamada automáticamente.
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="min-h-[48px] flex-1">
          Atrás
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          disabled={!canNext}
          className="min-h-[48px] flex-1"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

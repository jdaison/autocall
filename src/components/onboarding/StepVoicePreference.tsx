"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { VoicePreference, VoiceGender } from "@/lib/validations/onboarding";
import { Mic, MicOff, User, UserCircle } from "lucide-react";

interface StepVoicePreferenceProps {
  voicePreference: VoicePreference | null;
  voiceGender: VoiceGender | null;
  onVoicePreference: (value: VoicePreference) => void;
  onVoiceGender: (value: VoiceGender) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepVoicePreference({
  voicePreference,
  voiceGender,
  onVoicePreference,
  onVoiceGender,
  onNext,
  onBack,
}: StepVoicePreferenceProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Elige el tipo de voz que usará la IA en la llamada.
      </p>

      <div>
        <Label className="mb-3 block">Género de voz</Label>
        <RadioGroup
          value={voiceGender ?? undefined}
          onValueChange={(v) => onVoiceGender(v as VoiceGender)}
          className="grid grid-cols-2 gap-3"
        >
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px]">
            <RadioGroupItem value="female" id="voice-female" />
            <User className="h-5 w-5 text-slate-500" />
            <span className="font-medium">Femenina</span>
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px]">
            <RadioGroupItem value="male" id="voice-male" />
            <UserCircle className="h-5 w-5 text-slate-500" />
            <span className="font-medium">Masculina</span>
          </label>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">Origen de la voz</Label>
        <RadioGroup
          value={voicePreference ?? undefined}
          onValueChange={(v) => onVoicePreference(v as VoicePreference)}
          className="grid gap-3"
        >
          <label className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px]">
            <RadioGroupItem value="predefined" id="predefined" />
            <Mic className="h-5 w-5 text-slate-500" />
            <span className="font-medium">Usar voz predefinida</span>
          </label>
          <label className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 min-h-[52px] opacity-75">
            <RadioGroupItem value="custom" id="custom" disabled />
            <MicOff className="h-5 w-5 text-slate-500" />
            <span className="font-medium">Grabar mi voz</span>
            <span className="text-xs text-muted-foreground">(Próximamente)</span>
          </label>
        </RadioGroup>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="min-h-[48px] flex-1">
          Atrás
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          disabled={!voicePreference || !voiceGender}
          className="min-h-[48px] flex-1"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

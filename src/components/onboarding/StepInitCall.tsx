"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { initiateCallAction } from "@/actions/call";
import { CallProgressView } from "./CallProgressView";
import type { InitiateCallInput } from "@/lib/validations/onboarding";
import { Loader2, Phone, CheckCircle } from "lucide-react";

interface StepInitCallProps {
  data: InitiateCallInput;
  onBack: () => void;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm">
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="text-slate-900">{value}</span>
    </p>
  );
}

export function StepInitCall({ data, onBack }: StepInitCallProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [callStartedAt, setCallStartedAt] = useState<number | null>(null);
  const [progressCompleted, setProgressCompleted] = useState(false);

  const handleInitiate = async () => {
    setStatus("loading");
    setMessage("");
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
    const result = await initiateCallAction(data);
    if (result?.success) {
      setStatus("success");
      setMessage("Llamada iniciada.");
      setCallStartedAt(Date.now());
    } else {
      setStatus("error");
      setMessage(result?.error ?? "No se pudo iniciar la llamada. Intenta de nuevo.");
    }
  };

  const showProgress = status === "success" && callStartedAt !== null;

  return (
    <div className="space-y-6">
      {!showProgress && (
        <>
          <p className="text-sm text-muted-foreground">
            Revisa los datos y pulsa el botón para iniciar la llamada de prueba.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <SummaryRow label="Teléfono" value={data.phone} />
            <SummaryRow label="Nombre" value={data.contactName} />
            <SummaryRow label="Documento" value={data.contactDocument} />
            <SummaryRow label="Dirección" value={data.contactAddress} />
            <SummaryRow
              label="Descripción"
              value={
                data.callDescription.length > 80
                  ? data.callDescription.slice(0, 80) + "…"
                  : data.callDescription
              }
            />
            <SummaryRow
              label="Voz"
              value={`${data.voiceGender === "female" ? "Femenina" : "Masculina"} (${
                data.voicePreference === "predefined" ? "predefinida" : "personalizada"
              })`}
            />
            <SummaryRow
              label="WhatsApp"
              value={
                data.whatsappNotify
                  ? data.notifyFrequency === "every_5_min"
                    ? "Cada 5 min"
                    : "Al final"
                  : "No"
              }
            />
            <SummaryRow
              label="Unir si necesita humano"
              value={data.joinIfHumanNeeded ? "Sí" : "No"}
            />
          </div>
          {message && (
            <p
              role="alert"
              className={
                status === "error"
                  ? "text-sm text-red-600"
                  : "text-sm text-green-700"
              }
            >
              {message}
            </p>
          )}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              disabled={status === "loading"}
              className="min-h-[48px] flex-1"
            >
              Atrás
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleInitiate}
              disabled={status === "loading" || status === "success"}
              className="min-h-[48px] flex-1"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando…
                </>
              ) : status === "success" ? (
                "Llamada iniciada"
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  Iniciar Llamada
                </>
              )}
            </Button>
          </div>
        </>
      )}

      {showProgress && (
        <>
          <CallProgressView
            startedAt={callStartedAt}
            onCompleted={() => setProgressCompleted(true)}
          />
          {progressCompleted && (
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle className="h-5 w-5" />
                <span>Proceso finalizado</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onBack}
                className="min-h-[48px]"
              >
                Volver
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";

export type CallStatusPhase =
  | "connecting"
  | "ringing"
  | "answered"
  | "in_progress"
  | "completed";

export interface CallStatusResponse {
  phase: CallStatusPhase;
  message: string;
  elapsedSeconds: number;
  totalDurationSeconds: number | null;
  completed: boolean;
}

const MOCK_DURATION_SECONDS = 20;

/** Simula el progreso de una llamada en máximo 20 segundos. */
function getMockStatus(startedAtMs: number): CallStatusResponse {
  const elapsedMs = Date.now() - startedAtMs;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  if (elapsedSeconds >= MOCK_DURATION_SECONDS) {
    return {
      phase: "completed",
      message: "Llamada finalizada",
      elapsedSeconds: Math.min(elapsedSeconds, MOCK_DURATION_SECONDS),
      totalDurationSeconds: MOCK_DURATION_SECONDS,
      completed: true,
    };
  }

  if (elapsedSeconds < 3) {
    return {
      phase: "connecting",
      message: "Conectando…",
      elapsedSeconds,
      totalDurationSeconds: null,
      completed: false,
    };
  }

  if (elapsedSeconds < 7) {
    return {
      phase: "ringing",
      message: "Llamando…",
      elapsedSeconds,
      totalDurationSeconds: null,
      completed: false,
    };
  }

  if (elapsedSeconds < 10) {
    return {
      phase: "answered",
      message: "Llamada contestada",
      elapsedSeconds,
      totalDurationSeconds: null,
      completed: false,
    };
  }

  return {
    phase: "in_progress",
    message: "En curso…",
    elapsedSeconds,
    totalDurationSeconds: null,
    completed: false,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mock = searchParams.get("mock");
  const startedAtParam = searchParams.get("startedAt");

  if (mock === "1" && startedAtParam) {
    const startedAtMs = parseInt(startedAtParam, 10);
    if (Number.isNaN(startedAtMs)) {
      return NextResponse.json(
        { error: "startedAt inválido" },
        { status: 400 }
      );
    }
    const status = getMockStatus(startedAtMs);
    return NextResponse.json(status);
  }

  // Futuro: consultar por callId en BD / Twilio
  return NextResponse.json(
    { error: "Parámetros requeridos: mock=1 y startedAt (timestamp ms)" },
    { status: 400 }
  );
}

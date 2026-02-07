"use client";

import { useState, useEffect, useRef } from "react";
import type { CallStatusResponse } from "@/app/api/call-status/route";

const POLL_INTERVAL_MS = 1500;
const MOCK_DURATION_SECONDS = 20;
const CIRCLE_SIZE = 160;
const STROKE_WIDTH = 8;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface CallProgressViewProps {
  startedAt: number;
  onCompleted?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CallProgressView({ startedAt, onCompleted }: CallProgressViewProps) {
  const [status, setStatus] = useState<CallStatusResponse | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(
        `/api/call-status?mock=1&startedAt=${startedAt}`
      );
      if (!res.ok) return;
      const data: CallStatusResponse = await res.json();
      setStatus(data);
      if (data.completed && !completedRef.current) {
        completedRef.current = true;
        onCompleted?.();
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [startedAt, onCompleted]);

  // Temporizador local: avanza cada segundo para el círculo y el tiempo mostrado
  useEffect(() => {
    const tick = () => {
      const elapsed = Math.min(
        Math.floor((Date.now() - startedAt) / 1000),
        MOCK_DURATION_SECONDS
      );
      setElapsedSeconds(elapsed);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [startedAt]);

  const progress = Math.min(elapsedSeconds / MOCK_DURATION_SECONDS, 1);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        <svg
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            className="text-slate-200"
          />
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-semibold tabular-nums text-slate-900">
            {formatTime(status?.completed ? (status.totalDurationSeconds ?? elapsedSeconds) : elapsedSeconds)}
          </span>
          {status?.completed ? (
            <span className="text-xs text-muted-foreground mt-0.5">total</span>
          ) : (
            <span className="text-xs text-muted-foreground mt-0.5">transcurrido</span>
          )}
        </div>
      </div>

      <div className="text-center min-h-[3rem]">
        {status && (
          <p
            className={`text-sm font-medium ${
              status.completed ? "text-green-700" : "text-slate-700"
            }`}
          >
            {status.message}
          </p>
        )}
        {status?.phase === "answered" && (
          <p className="text-xs text-muted-foreground mt-1">
            La IA está atendiendo tu solicitud
          </p>
        )}
        {status?.completed && status.totalDurationSeconds != null && (
          <p className="text-xs text-muted-foreground mt-2">
            Duración total: {formatTime(status.totalDurationSeconds)}
          </p>
        )}
      </div>
    </div>
  );
}

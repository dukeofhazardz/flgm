import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DayDial — a 50-tick watch dial. One tick per programme day, lighting from
 * Day 01 clockwise. Today's tick carries the small red mark; future ticks stay
 * quiet. The dial is a state display, not a progress claim beyond today's date.
 */

interface DayDialProps {
  day: number;
  className?: string;
}

const CENTER = 160;
const TICKS = 50;

function tickGeometry(index: number): { x1: number; y1: number; x2: number; y2: number } {
  const angle = (index / TICKS) * Math.PI * 2 - Math.PI / 2;
  const inner = 126;
  const outer = 145;
  return {
    x1: CENTER + Math.cos(angle) * inner,
    y1: CENTER + Math.sin(angle) * inner,
    x2: CENTER + Math.cos(angle) * outer,
    y2: CENTER + Math.sin(angle) * outer,
  };
}

export function DayDial({ day, className }: DayDialProps): React.ReactElement {
  return (
    <div
      role="img"
      aria-label={`Day ${day} of 50 on the Watch and Pray dial`}
      className={cn("relative mx-auto aspect-square w-full max-w-[340px]", className)}
    >
      <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden="true">
        <circle cx="160" cy="160" r="154" stroke="#FFFFFF" strokeOpacity="0.1" />
        <circle
          cx="160"
          cy="160"
          r="154"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeDasharray="1 7"
        />
        <circle cx="160" cy="160" r="112" stroke="#FFFFFF" strokeOpacity="0.07" />
        <circle cx="160" cy="160" r="84" stroke="#FFFFFF" strokeOpacity="0.05" />

        {Array.from({ length: TICKS }, (_, index) => {
          const n = index + 1;
          const { x1, y1, x2, y2 } = tickGeometry(index);
          const isToday = n === day;
          const isPast = n < day;
          return (
            <line
              key={n}
              x1={x1}
              y1={y1}
              x2={isToday ? x2 + 9 : x2}
              y2={isToday ? y2 : y2}
              stroke={isToday ? "#C9F5DA" : isPast ? "#00C853" : "#FFFFFF"}
              strokeOpacity={isToday ? 1 : isPast ? 0.9 : 0.16}
              strokeWidth={isToday ? 3 : isPast ? 2 : 1.4}
              strokeLinecap="round"
              className="transition-[stroke,stroke-opacity] duration-500"
            />
          );
        })}

        {/* The red live mark on today's tick. */}
        {(() => {
          const angle = ((day - 1) / TICKS) * Math.PI * 2 - Math.PI / 2;
          const r = 163;
          return (
            <circle
              cx={CENTER + Math.cos(angle) * r}
              cy={CENTER + Math.sin(angle) * r}
              r="2.6"
              fill="#FC0000"
            />
          );
        })()}

        <g stroke="#C9F5DA" strokeOpacity="0.28">
          <path d="M160 22v8M160 290v8M22 160h8M290 160h8" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/45">
          Day
        </span>
        <span className="mt-1 font-serif text-[clamp(4rem,12vw,7rem)] font-medium leading-[0.8] tracking-[-0.05em] text-white tabular-nums">
          {String(day).padStart(2, "0")}
        </span>
        <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.26em] text-white/45">
          of 50
        </span>
      </div>
    </div>
  );
}

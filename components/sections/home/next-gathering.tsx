"use client";

import * as React from "react";
import { nextSundayService, type NextGathering as Gathering } from "@/lib/time";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

/**
 * NextGathering — a live chip for the next Sunday service in WAT.
 * Computed after hydration only, so no clock is prerendered. The chip reserves
 * its height before the date arrives to avoid any layout shift.
 */

const BASE =
  "flex min-h-[18px] flex-nowrap items-center gap-x-2 whitespace-nowrap font-mono text-[9.5px] uppercase leading-none tracking-[0.13em] text-white/90 md:text-[10.5px] md:tracking-[0.14em]";

let cached: { key: string; value: Gathering } | null = null;

function nextGathering(): Gathering {
  const key = new Date().toDateString();
  if (!cached || cached.key !== key) {
    cached = { key, value: nextSundayService() };
  }
  return cached.value;
}

interface NextGatheringProps {
  className?: string;
}

export function NextGathering({ className }: NextGatheringProps): React.ReactElement {
  const hydrated = useHydrated();
  const gathering = hydrated ? nextGathering() : null;

  return (
    <p className={cn(BASE, className)}>
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-brand-green" />
        <span className="live-dot absolute inset-0 rounded-full bg-brand-green" />
      </span>
      <span className="text-white/76">Next gathering</span>
      <span className="text-white">{gathering ? gathering.dayLabel : "Sunday"}</span>
      <span className="text-dawn-mint/70" aria-hidden="true">
        ·
      </span>
      <span className="text-dawn-mint">{gathering ? gathering.timeLabel : "8:00 AM WAT"}</span>
    </p>
  );
}

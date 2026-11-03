"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { watchAndPrayDayNumber } from "@/lib/time";
import { cn } from "@/lib/utils";

/**
 * DayCounter — "Day N of 50" for Watch and Pray (11 Nov – 30 Dec 2026).
 * Returns null outside the programme period. Client-only to avoid
 * blocking-prerender rule.
 */

interface DayCounterProps {
  className?: string;
}

export function DayCounter({ className }: DayCounterProps): React.ReactElement | null {
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDay(watchAndPrayDayNumber());
  }, []);

  if (!day) return null;

  return (
    <span
      className={cn(
        "font-mono font-bold text-brand-red tracking-tight",
        className
      )}
    >
      Day {day} of 50
    </span>
  );
}

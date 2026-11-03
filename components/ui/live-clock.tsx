"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { nowLagosClient } from "@/lib/time";
import { cn } from "@/lib/utils";

/**
 * LiveClock — Abuja time (WAT).
 * Updates every second on the client only. Never prerenders a time value
 * (Next.js 16 blocking-prerender rule).
 */

interface LiveClockProps {
  className?: string;
  /** 24-hour clock by default: 05:30. */
  hour12?: boolean;
  /** Append the WAT zone label. */
  showZone?: boolean;
  /** Render a fixed-width placeholder before hydration. */
  placeholder?: string;
}

export function LiveClock({
  className,
  hour12 = false,
  showZone = false,
  placeholder = "--:--",
}: LiveClockProps): React.ReactElement {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const d = nowLagosClient();
      setTime(
        d.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12,
        })
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [hour12]);

  return (
    <span
      className={cn("font-mono tabular-nums tracking-[0.06em]", className)}
      suppressHydrationWarning
    >
      {time || placeholder}
      {showZone ? <span className="ml-1 opacity-55">WAT</span> : null}
    </span>
  );
}

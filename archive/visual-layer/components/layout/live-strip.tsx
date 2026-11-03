"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { liveStripMessage } from "@/lib/time";
import { cn } from "@/lib/utils";

/**
 * Slim live strip under the header (dismissible).
 * Shows the next relevant moment computed in WAT:
 * "Watch and Pray starts in X days" / "Day N of 50: Daily prayer 5:30 AM" /
 * next Sunday service otherwise.
 */

interface LiveStripProps {
  className?: string;
}

export function LiveStrip({ className }: LiveStripProps): React.ReactElement | null {
  const [dismissed, setDismissed] = useState(false);
  const [message, setMessage] = useState<ReturnType<typeof liveStripMessage> | null>(null);

  // Compute the live-strip message on the client so the current time is
  // evaluated per-visit, not during prerender (Next.js 16 blocking-prerender rule).
  useEffect(() => {
    const m = liveStripMessage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(m);
  }, []);

  if (dismissed || !message) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[64px] z-40 bg-tint-white border-b border-ink/10 px-6 py-3 md:px-8",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-deep-green flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"
            aria-hidden="true"
          />
          {message.text}
        </span>
        <button
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem("flgm:livestrip:dismissed", "1");
          }}
          aria-label="Dismiss"
          className="p-1 text-ink/50 hover:text-brand-red transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

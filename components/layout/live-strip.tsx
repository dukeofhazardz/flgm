"use client";

import * as React from "react";
import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { liveStripMessage, type LiveStripMessage } from "@/lib/time";
import { noopSubscribe, useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "flgm:livestrip:dismissed";

function readDismissal(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

const serverDismissal = () => false;

/**
 * Cache the WAT message for three hours: render stays cheap and the object
 * identity stays stable between renders.
 */
let cachedMessage: { key: string; value: LiveStripMessage | null } | null = null;

function readMessage(): LiveStripMessage | null {
  const now = new Date();
  const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${Math.floor(
    now.getHours() / 3
  )}`;
  if (!cachedMessage || cachedMessage.key !== key) {
    cachedMessage = { key, value: liveStripMessage() };
  }
  return cachedMessage.value;
}

/**
 * Live Strip — the slim masthead ticker under the header.
 *
 * Reads the next relevant moment in WAT (Watch and Pray countdown / Day N of
 * 50 / next Sunday) after hydration only, so nothing prerenders a clock. It
 * remembers dismissal for the session and never takes more than 30px.
 */

interface LiveStripProps {
  theme: "dark" | "light";
  className?: string;
}

export function LiveStrip({ theme, className }: LiveStripProps): React.ReactElement | null {
  const hydrated = useHydrated();
  const stored = useSyncExternalStore(noopSubscribe, readDismissal, serverDismissal);
  const [dismissed, setDismissed] = useState(false);

  if (!hydrated || stored || dismissed) return null;

  const message = readMessage();
  if (!message) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* Storage can be blocked; the local state alone is enough. */
    }
  };

  return (
    <div
      className={cn(
        "flex h-[30px] items-center gap-3 border-b px-5 md:px-8",
        // Transparent: the header's glass surface paints both rows as one pane.
        theme === "dark"
          ? "border-white/10 text-white"
          : "border-ink/10 text-ink",
        className
      )}
      role="status"
    >
      <span
        className="live-dot block h-1.5 w-1.5 shrink-0 rounded-full bg-signal-red"
        aria-hidden="true"
      />
      <p className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase leading-none tracking-[0.16em] md:text-[10.5px]">
        {message.text}
      </p>
      <span
        className={cn(
          "hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] sm:block",
          theme === "dark" ? "text-white/86" : "text-deep-green"
        )}
      >
        Abuja · WAT
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the live update"
        className={cn(
          "-mr-1 flex h-6 w-6 shrink-0 items-center justify-center transition-opacity",
          theme === "dark"
            ? "text-white/86 hover:text-white"
            : "text-ink/60 hover:text-ink"
        )}
      >
        <X className="h-3 w-3" strokeWidth={1.5} />
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { Play } from "lucide-react";
import { ArtSlot } from "@/components/ui/art-slot";
import { cn } from "@/lib/utils";

/**
 * LiteYouTube — a lightweight YouTube facade.
 *
 * Nothing loads from YouTube until the viewer presses play: the poster is a
 * designed composition, and the iframe is mounted only after the click.
 */

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export function LiteYouTube({
  videoId,
  title,
  className,
}: LiteYouTubeProps): React.ReactElement {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-night", className)}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #04180F 0%, #0B3B24 45%, #007A36 100%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(70% 90% at 50% 110%, rgba(0,200,83,0.55) 0%, rgba(0,200,83,0) 65%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-35">
            <ArtSlot name="rays" size={220} color="white" />
          </div>
          <div className="grain absolute inset-0" aria-hidden="true" />

          <div className="absolute inset-x-4 top-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">
            <span>Replay</span>
            <span>Watch and Pray</span>
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <p className="max-w-[28ch] font-serif text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium leading-tight tracking-[-0.02em] text-white">
              {title}
            </p>
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Play ${title}`}
              data-cursor="Play"
              className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green text-ink transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-95"
            >
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={1.2} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

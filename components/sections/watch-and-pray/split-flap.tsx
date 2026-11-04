"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SplitFlap — a mechanical departure-board countdown.
 * Each changed digit remounts and drops into place with rotateX + opacity.
 * Unchanged digits stay perfectly still, so only the seconds chatter.
 */

interface SplitFlapProps {
  value: number;
  digits: number;
  label: string;
  className?: string;
}

function Digit({ char }: { char: string }): React.ReactElement {
  return (
    <span className="flip-window block">
      <span
        className={cn(
          "flip-digit relative flex items-center justify-center overflow-hidden",
          "border border-white/12 bg-[#082a19] text-white",
          "h-[clamp(3.4rem,11vw,5.6rem)] w-[clamp(2.35rem,8.2vw,4.1rem)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-18px_30px_-18px_rgba(0,0,0,0.8)]"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/55"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent"
        />
        <span className="relative z-0 font-mono text-[clamp(2.1rem,7.4vw,3.5rem)] font-medium leading-none tabular-nums tracking-[-0.04em]">
          {char}
        </span>
      </span>
    </span>
  );
}

export function SplitFlap({
  value,
  digits,
  label,
  className,
}: SplitFlapProps): React.ReactElement {
  const chars = String(Math.max(0, value)).padStart(digits, "0").split("");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-[3px]" aria-hidden="true">
        {chars.map((char, index) => (
          <Digit key={`${index}-${char}`} char={char} />
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
    </div>
  );
}

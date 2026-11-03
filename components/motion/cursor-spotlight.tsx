"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * CursorSpotlight — desktop only.
 * Soft green circular spotlight follows the cursor over dark sections.
 * Disabled on touch devices and under prefers-reduced-motion.
 * Cleans up on unmount.
 */

interface CursorSpotlightProps {
  className?: string;
}

export function CursorSpotlight({
  className,
}: CursorSpotlightProps): React.ReactElement | null {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouchDevice =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isTouchDevice || reduced) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouchDevice, reduced]);

  if (isTouchDevice || reduced) return null;

  return (
    <span
      className={cn(
        "fixed z-[9998] w-[200px] h-[200px] rounded-full bg-brand-green/10 blur-[80px] pointer-events-none transition-transform duration-100",
        className
      )}
      style={{
        left: pos.x - 100,
        top: pos.y - 100,
      }}
      aria-hidden="true"
    />
  );
}

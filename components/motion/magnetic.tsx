"use client";

import * as React from "react";
import { useRef } from "react";
import { useMagnetic } from "@/lib/use-magnetic";
import { cn } from "@/lib/utils";

/**
 * Magnetic — a wrapper that leans toward the pointer, and presses to 0.97.
 * Decorative only, gated to fine pointers; nothing depends on hover.
 */

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.25,
  max = 8,
  className,
}: MagneticProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  useMagnetic(ref, { strength, max });

  return (
    <span
      ref={ref}
      data-magnet="false"
      className={cn("inline-block", className)}
    >
      {children}
    </span>
  );
}

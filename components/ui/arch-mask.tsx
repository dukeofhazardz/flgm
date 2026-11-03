"use strict";

import { cn } from "@/lib/utils";

/**
 * ArchMask — arch-shaped image mask (the signature ARCH shape from DESIGN.md).
 * Used for photography placeholders and section imagery. Square corners,
 * no borders, one dominant image per section.
 */

interface ArchMaskProps {
  className?: string;
  children?: React.ReactNode;
}

export function ArchMask({ className, children }: ArchMaskProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none",
        "clip-path-[polygon(0_0,100%_0,100%_75%,75%_100%,25%_100%,0_75%)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

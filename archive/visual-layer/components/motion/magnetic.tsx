"use strict";

import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * Magnetic — wrapper follows the cursor gently; press scales to 0.97
 * (160ms ease-out). Hover is decorative; nothing relies on hover alone.
 * Cleans up listeners on unmount.
 */

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.4,
  className,
}: MagneticProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const getRect = useCallback((): DOMRect | null => {
    const el = ref.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const rect = getRect();
      if (!rect) return;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          x: x * strength,
          y: y * strength,
          duration: 0.6,
          ease: "ease-out",
        });
      });
    },
    [getRect, strength],
  );

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, ease: "ease-out" });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove, handleLeave]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => handleMove(e.nativeEvent)}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  );
}

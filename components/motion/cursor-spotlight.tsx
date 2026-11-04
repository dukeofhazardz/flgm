"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { canUseRichMotion } from "@/lib/motion";

/**
 * CursorSpotlight — dawn light under the pointer on dark sections.
 *
 * A soft green wash (Grace Green, very low opacity) follows the cursor and is
 * only visible while the pointer is over a section that declares
 * `data-header-theme="dark"`. It is written straight to the transform of one
 * fixed element — no React state, no layout reads, no re-render per frame —
 * and it parks itself as soon as the pointer stops.
 *
 * Disabled on touch and under reduced motion, per DESIGN.md.
 */
export function CursorSpotlight({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const light = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canUseRichMotion() || window.innerWidth < 1024) return undefined;
    const el = light.current;
    if (!el) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currentX = x;
    let currentY = y;
    let raf = 0;
    let onDark = false;

    const render = () => {
      currentX += (x - currentX) * 0.14;
      currentY += (y - currentY) * 0.14;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      const settled = Math.abs(x - currentX) < 0.2 && Math.abs(y - currentY) < 0.2;
      if (settled) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;

      // The event target is the element under the pointer — no probing needed.
      const section = (event.target as Element | null)?.closest?.("[data-header-theme]");
      const dark = section?.getAttribute("data-header-theme") !== "light";
      if (dark !== onDark) {
        onDark = dark;
        el.dataset.on = dark ? "true" : "false";
      }
      wake();
    };

    const onLeave = () => {
      onDark = false;
      el.dataset.on = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    el.dataset.on = "false";

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={light}
      aria-hidden="true"
      data-on="false"
      className={`cursor-spotlight ${className ?? ""}`}
    />
  );
}

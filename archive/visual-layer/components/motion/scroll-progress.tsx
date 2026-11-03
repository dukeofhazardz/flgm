"use strict";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollProgress — thin progress bar showing page scroll position.
 * transform-based (scaleX), no layout thrashing.
 */

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const win = window;
        const height =
          win.document.documentElement.scrollHeight -
          win.document.documentElement.clientHeight;
        const scroll =
          (win.pageYOffset / height) * 100 || 0;
        setProgress(scroll);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-[2px] bg-brand-red z-50">
      <div
        className="h-full bg-brand-green origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

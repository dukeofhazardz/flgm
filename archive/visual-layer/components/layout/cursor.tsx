"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Desktop-only custom cursor with contextual labels (Watch, Give, Play).
 * Disabled on touch devices. Follows the pointer; scales on press;
 * swaps label based on the nearest [data-cursor] attribute.
 */

const LABELS: Record<string, string> = {
  watch: "Watch",
  give: "Give",
  play: "Play",
};

interface CursorProps {
  className?: string;
}

export function Cursor({ className }: CursorProps): React.ReactElement | null {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  const isTouchDevice =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = document.createElement("div");
    cursor.className = "fixed z-[9999] pointer-events-none rounded-full mix-blend-difference";
    document.body.appendChild(cursor);

    const labelEl = document.createElement("div");
    labelEl.className =
      "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-none bg-ink text-white text-[10px] font-medium uppercase tracking-wider whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none";
    cursor.appendChild(labelEl);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorData = target
        ?.closest<HTMLElement>("[data-cursor]")
        ?.dataset.cursor;
      const nextLabel = cursorData ? LABELS[cursorData] : null;
      labelEl.textContent = nextLabel ?? "";
      labelEl.style.opacity = nextLabel ? "1" : "0";
    };

    const handleDown = () => {
      setPressed(true);
      cursor.style.transform = "scale(0.7)";
    };
    const handleUp = () => {
      setPressed(false);
      cursor.style.transform = "scale(1)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver, true);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseleave", () => {
      labelEl.style.opacity = "0";
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver, true);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.body.removeChild(cursor);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <span
      className={cn(
        "fixed z-[9999] w-4 h-4 rounded-full border border-brand-red/50 bg-brand-red/10 pointer-events-none transition-transform duration-100",
        pressed && "scale-75",
        className
      )}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  );
}

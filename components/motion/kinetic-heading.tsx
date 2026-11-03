"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

/**
 * KineticHeading — variable-font cursor reaction.
 * Display type that softens/grows bolder as the cursor approaches within 200px.
 * Uses CSS variables --kinetic-weight and --kinetic-softness updated on mouse move.
 * Disabled under prefers-reduced-motion and on touch devices.
 * Cleans up listeners on unmount.
 */

interface KineticHeadingProps {
  children: React.ReactNode;
  className?: string;
}

let mouseX = 0;
let mouseY = 0;
const listeners = new Set<(x: number, y: number) => void>();

let rafId: number | null = null;

function updateListeners() {
  listeners.forEach((fn) => fn(mouseX, mouseY));
}

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      updateListeners();
      rafId = null;
    });
  }
}

let isTracked = false;

function ensureMouseTracker() {
  if (typeof window === "undefined" || isTracked) return;
  isTracked = true;
  window.addEventListener("mousemove", handleMouseMove);
}

export function KineticHeading({
  children,
  className,
}: KineticHeadingProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches);

  useEffect(() => {
    ensureMouseTracker();

    const listener = (x: number, y: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, 1 - dist / 200);
      ref.current.style.setProperty(
        "--kinetic-weight",
        String(Math.round(400 + t * 500))
      );
      ref.current.style.setProperty(
        "--kinetic-softness",
        String(t.toFixed(2))
      );
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        window.removeEventListener("mousemove", handleMouseMove);
        isTracked = false;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };
  }, []);

  if (reduced || isTouch) {
    return (
      <span
        className={className}
        style={{
          fontVariationSettings: "'wght' 400, 'SOFT' 0, 'WONK' 0",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariationSettings:
          "var(--kinetic-weight, 400) var(--kinetic-softness, 0) var(--kinetic-wonk, 0)",
      }}
    >
      {children}
    </span>
  );
}

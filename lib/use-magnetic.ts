"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { canUseRichMotion } from "@/lib/motion";

interface MagneticOptions {
  /** How far the element travels toward the pointer (0–0.5). */
  strength?: number;
  /** Hard ceiling in px, so a wide button never slides absurdly. */
  max?: number;
}

/**
 * useMagnetic — the pressable element leans toward the pointer.
 *
 * The rect is measured once on enter (never per move), the offset is clamped,
 * and GSAP's quickTo writes transforms only. Off for touch and reduced motion.
 * Returns nothing; attach the same ref to the element that should move.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { strength = 0.22, max = 10 }: MagneticOptions = {}
): void {
  useEffect(() => {
    if (!canUseRichMotion()) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let rect: DOMRect | null = null;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const onEnter = () => {
      measure();
      el.dataset.magnet = "true";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !rect) return;
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const clampX = gsap.utils.clamp(-max, max, dx * strength);
      const clampY = gsap.utils.clamp(-max, max, dy * strength);
      xTo(clampX);
      yTo(clampY);
    };

    const onLeave = () => {
      rect = null;
      el.dataset.magnet = "false";
      xTo(0);
      yTo(0);
    };

    const onDown = () => {
      gsap.to(el, { scale: 0.97, duration: 0.16, ease: "power2.out", overwrite: "auto" });
    };

    const onUp = () => {
      gsap.to(el, { scale: 1, duration: 0.28, ease: "power3.out", overwrite: "auto" });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [ref, strength, max]);
}

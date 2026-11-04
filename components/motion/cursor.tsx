"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { canUseRichMotion } from "@/lib/motion";

/**
 * CustomCursor — a desktop pointer in two parts.
 *
 * A small green dot sits exactly on the pointer; a thin ring trails it with a
 * little weight, so the pointer feels physical rather than glued on. When the
 * pointer crosses a control that carries `data-cursor` (Watch, Give, Play…), the
 * ring opens into a labelled disc and the dot steps aside.
 *
 * Rules:
 * - fine pointers only, 1024px and up, never under reduced motion;
 * - decorative: aria-hidden, pointer-events none, never traps the pointer;
 * - the label is read from the hovered element, so any link can opt in;
 * - text fields keep the native caret (the class only hides it on controls);
 * - one rAF loop that parks itself when the pointer stops.
 */
export function CustomCursor(): React.ReactElement {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canUseRichMotion() || window.innerWidth < 1024) return undefined;
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = labelRef.current;
    if (!dotEl || !ringEl || !labelEl) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;
    let visible = false;
    let lastLabel = "";

    const render = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      dotEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      const settled = Math.abs(targetX - ringX) < 0.15 && Math.abs(targetY - ringY) < 0.15;
      if (settled) {
        ringX = targetX;
        ringY = targetY;
        ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const setLabel = (el: HTMLElement | null) => {
      const host = el?.closest<HTMLElement>("[data-cursor]") ?? null;
      const next = host?.dataset.cursor ?? "";
      if (next === lastLabel) return;
      lastLabel = next;
      labelEl.textContent = next;
      ringEl.dataset.labelled = next ? "true" : "false";
      dotEl.dataset.hidden = next ? "true" : "false";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        ringX = targetX;
        ringY = targetY;
        dotEl.dataset.visible = "true";
        ringEl.dataset.visible = "true";
      }

      const target = event.target as Element | null;
      const overField = target?.closest(
        "input, textarea, select, [contenteditable='true']"
      );
      dotEl.dataset.field = overField ? "true" : "false";
      ringEl.dataset.field = overField ? "true" : "false";
      setLabel(target as HTMLElement | null);
      wake();
    };

    const onDown = () => {
      ringEl.dataset.pressed = "true";
      dotEl.dataset.pressed = "true";
    };
    const onUp = () => {
      ringEl.dataset.pressed = "false";
      dotEl.dataset.pressed = "false";
    };
    const onLeave = () => {
      visible = false;
      dotEl.dataset.visible = "false";
      ringEl.dataset.visible = "false";
    };
    const onBlur = () => onLeave();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onBlur);
    ringX = targetX;
    ringY = targetY;
    render();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onBlur);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dot} className="custom-cursor__dot" data-visible="false">
        <span className="custom-cursor__dot-core" />
      </div>
      <div ref={ring} className="custom-cursor__ring" data-visible="false" data-labelled="false">
        <span className="custom-cursor__disc">
          <span ref={labelRef} className="custom-cursor__label" />
        </span>
      </div>
    </div>
  );
}

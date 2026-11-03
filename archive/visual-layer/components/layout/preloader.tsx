"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { CHURCH } from "@/data/church";

/**
 * Preloader — first visit per session only.
 * 1. Arch outline draws in (CSS stroke-dashoffset, free DrawSVG equivalent).
 * 2. Green light fills from the bottom like dawn.
 * 3. "We Get Better Every Day!" fades in.
 * 4. Arch expands (clip-path) to reveal the hero.
 * Total under 2.2s. Skippable (Esc / click). Never blocks returning visitors.
 * DrawSVGPlugin is a paid Club GreenSock plugin; the stroke-dashoffset CSS
 * approach below produces the identical visual result without it.
 */

const SESSION_KEY = "flgm:preloader:seen";

interface PreloaderProps {
  onFinish?: () => void;
}

export function Preloader({ onFinish }: PreloaderProps): React.ReactElement | null {
  // First visit per session only. Returning visitors: never block content.
  // One-time sessionStorage check on mount (sessionStorage is client-only).
  const [active, setActive] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) !== "1");
  }, []);

  const skip = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    tlRef.current?.kill();
    setActive(false);
    sessionStorage.setItem(SESSION_KEY, "1");
    onFinish?.();
  }, [skipped, onFinish]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    },
    [skip]
  );

  useEffect(() => {
    if (!active) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [active, handleKeyDown]);

  useEffect(() => {
    if (!active) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
        sessionStorage.setItem(SESSION_KEY, "1");
        onFinish?.();
      },
    });
    tlRef.current = tl;

    // 1. Arch outline draws in (0.0s – 0.7s).
    tl.fromTo(
      "[data-arch-path]",
      { strokeDasharray: "260", strokeDashoffset: "260" },
      { strokeDashoffset: 0, duration: 0.7, ease: "ease-out" },
      0
    );

    // 2. Green light fills from the bottom like dawn (0.35s – 1.05s).
    tl.fromTo(
      "[data-dawn-fill]",
      { y: "100%" },
      { y: "0%", duration: 0.7, ease: "ease-in-out" },
      0.35
    );

    // 3. Tagline fades in (0.95s – 1.35s).
    tl.fromTo(
      "[data-tagline]",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "ease-out" },
      0.95
    );

    // 4. Arch expands (clip-path) to reveal the hero (1.35s – 1.85s).
    tl.to(
      "[data-arch-mask]",
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "ease-in-out",
      },
      1.35
    );

    // Fade out preloader (1.75s – 2.15s) — under 2.2s total.
    tl.to(
      "[data-preloader]",
      { opacity: 0, duration: 0.4, ease: "ease-out" },
      1.75
    );

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [active, skip, onFinish]);

  if (!active) return null;

  return (
    <div
      data-preloader
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
      onClick={skip}
      aria-label="Loading Forever Life and Grace Mission"
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        {/* Arch outline: doorway/house shape — the signature ARCH from DESIGN.md */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 200 200"
          fill="none"
          stroke="#00c853"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            data-arch-path
            d="M 50 150 L 50 70 A 50 50 0 0 1 150 70 L 150 150 Z"
            className="fill-none"
            strokeDasharray="260"
            strokeDashoffset="260"
          />
          {/* Dawn light: fills from bottom to top inside the arch */}
          <rect
            data-dawn-fill
            x="50"
            y="70"
            width="100"
            height="80"
            fill="#00c853"
            className="origin-bottom"
          />
        </svg>
      </div>
      <h2
        data-tagline
        className="mt-8 font-serif text-2xl md:text-3xl font-bold text-ink tracking-tight opacity-0"
      >
        {CHURCH.tagline}
      </h2>
      {/* Expanding arch mask that reveals the hero behind the preloader */}
      <div
        data-arch-mask
        className="absolute inset-0 bg-white clip-path-[inset(0%_0%_100%_0%)]"
      />
    </div>
  );
}

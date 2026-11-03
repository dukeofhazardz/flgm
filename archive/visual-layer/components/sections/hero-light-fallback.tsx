"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * HeroLightFallback — CSS/SVG gradient daybreak for mobile, low-power and
 * reduced-motion visitors. No WebGL, no layout shift.
 * Soft green radial glow, grain texture, slow pulse.
 */

interface HeroLightFallbackProps {
  className?: string;
}

export function HeroLightFallback({
  className,
}: HeroLightFallbackProps): React.ReactElement {
  return (
    <div
      className={cn(
        "relative w-full h-full bg-white",
        "overflow-hidden",
        className
      )}
      style={{
        background:
          "radial-gradient(circle at 50% 38%, rgba(0, 200, 83, 0.10) 0%, transparent 55%), #ffffff",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.5%27/%3E%3C/svg%3E')",
        }}
      />
      {/* Slow pulse glow */}
      <div
        className="absolute inset-0 rounded-full bg-brand-green/20 blur-[120px] animate-pulse"
        style={{
          animationDuration: "8s",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.6)",
          width: "60vw",
          height: "60vw",
        }}
      />
    </div>
  );
}

export default HeroLightFallback;

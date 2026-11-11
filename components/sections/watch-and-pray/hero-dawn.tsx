import * as React from "react";

/**
 * HeroDawn — the night sky at the horizon.
 *
 * A deterministic star field, concentric watch rings, and a green sun breaking
 * the horizon. The solid green band below the scene carries the 5:30 numerals
 * in ink, so the opening image is both dramatic and AA-legible. No photographs,
 * no empty boxes.
 */

const STARS = Array.from({ length: 96 }, (_, i) => {
  const x = (i * 197.3 + 41) % 1600;
  const y = (i * 83.7 + 23) % 760;
  const big = i % 11 === 0;
  return {
    x,
    y,
    r: big ? 1.8 : i % 5 === 0 ? 1.1 : 0.7,
    opacity: big ? 0.8 : 0.18 + ((i * 13) % 45) / 100,
  };
});

export function HeroDawn(): React.ReactElement {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep night falling to a green horizon glow. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #024A0B 0%, #02600D 46%, #0E6B0C 68%, #1B6E0C 84%, #156C0C 100%)",
        }}
      />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id="wap-sun-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#33A402" stopOpacity="0.5" />
            <stop offset="42%" stopColor="#33A402" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wap-sun-face" x1="800" y1="770" x2="800" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6FC108" />
            <stop offset="46%" stopColor="#33A402" />
            <stop offset="100%" stopColor="#33A402" />
          </linearGradient>
          <radialGradient id="wap-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4D120" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C4D120" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stars */}
        <g fill="#FFFFFF">
          {STARS.map((star, index) => (
            <circle
              key={index}
              cx={star.x}
              cy={star.y}
              r={star.r}
              opacity={star.opacity}
            />
          ))}
        </g>

        {/* Watch rings around the sun */}
        <g stroke="#C4D120" fill="none">
          <circle cx="800" cy="1000" r="300" opacity="0.1" />
          <circle cx="800" cy="1000" r="400" opacity="0.07" />
          <circle cx="800" cy="1000" r="530" opacity="0.05" />
          <circle cx="800" cy="1000" r="680" opacity="0.035" />
        </g>
        <g stroke="#C4D120" strokeDasharray="1 13" opacity="0.26">
          <circle cx="800" cy="1000" r="350" />
        </g>

        {/* Rays, clipped by the horizon */}
        <g stroke="#33A402" strokeOpacity="0.22" strokeLinecap="round">
          <path d="M800 1000V520" strokeWidth="1" />
          <path d="M636 1000 380 560" strokeWidth="0.8" />
          <path d="M964 1000 1220 560" strokeWidth="0.8" />
          <path d="M530 1000 170 760" strokeWidth="0.7" />
          <path d="M1070 1000 1430 760" strokeWidth="0.7" />
        </g>

        {/* Sun halo and disc, cut by the band below */}
        <circle cx="800" cy="1000" r="650" fill="url(#wap-sun-halo)" />
        <circle cx="800" cy="1000" r="232" fill="url(#wap-sun-face)" />
        <circle cx="800" cy="1000" r="232" fill="url(#wap-core)" opacity="0.28" />
        <circle cx="800" cy="1000" r="252" stroke="#C4D120" strokeOpacity="0.26" />
        <circle cx="800" cy="1000" r="286" stroke="#C4D120" strokeOpacity="0.1" />

        {/* Fine registration marks at the edge of the plate */}
        <g stroke="#C4D120" strokeOpacity="0.22">
          <path d="M40 96v26M27 109h26" />
          <path d="M1560 96v26M1547 109h26" />
          <path d="M40 470v20M30 480h20" />
          <path d="M1560 470v20M1550 480h20" />
        </g>
      </svg>

      <div className="grain absolute inset-0" />
    </div>
  );
}

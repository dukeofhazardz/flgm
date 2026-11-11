import * as React from "react";
import { HeroLand } from "@/components/sections/home/hero-land";

/**
 * HeroAtmosphere — the sunrise machinery.
 *
 * Pure markup so it renders on the server; HomeHero drives every layer through
 * data attributes. Nothing here is a photograph or a blank box: the sky, the
 * sun, the ridge and the skyline are the composition.
 *
 * At rest the disc sits entirely below the ridge line, so the opening frame is
 * pure type over a night field. As the page moves it rises, appears first as a
 * dawn-mint rim, then fills with light from the core outward. That keeps white
 * type off bright green and makes the sunrise the payoff of the scroll.
 *
 * Depth order (bottom to top): dawn sky → horizon glow → rim/sun/rays → bloom →
 * warm horizon → land → light spilling over the ridge → scrim → grain →
 * cursor spotlight.
 */

export function HeroAtmosphere(): React.ReactElement {
  return (
    <>
      {/* The sky. Night at the top, forest in the middle, first light on the
          horizon. Fades in over the night field as the scroll begins. */}
      <div
        data-hero-forest
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, #02600D 0%, #156C0C 16%, #26760B 30%, #347F0A 42%, #408609 52%, #3A9506 60%, #33A402 68%, #51B205 78%, #60B906 88%, #6FC108 100%)",
        }}
      />

      {/* Dawn bloom in the sky, centred on the horizon. */}
      <div
        data-hero-glow
        aria-hidden="true"
        className="absolute left-1/2 top-[72%] z-[1] h-[78vh] w-[145vw] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 46% at 50% 50%, rgba(255,227,222,0.34) 0%, rgba(196,209,32,0.30) 20%, rgba(51,164,2,0.16) 44%, rgba(51,164,2,0.05) 62%, rgba(51,164,2,0) 74%)",
        }}
      />

      {/* The sun: rim, rays and body all rise together. At rest its top edge
          sits just under the crest, so the opening frame is pure type and the
          first thing the scroll gives back is a sliver of mint rim. */}
      <div
        data-hero-sun
        aria-hidden="true"
        className="absolute left-1/2 top-[74%] z-[3]"
        style={{
          width: "min(78vw, clamp(250px, 42svh, 460px))",
          aspectRatio: "1",
          translate: "-50% 0",
        }}
      >
        <div data-hero-sun-body className="relative h-full w-full">
          {/* Atmosphere around the body: warm at the crown, green as it falls
              away. Tight, so the limb stays a limb. */}
          <div
            data-hero-sun-halo
            className="absolute left-1/2 top-1/2 h-[186%] w-[186%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[38px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,236,228,0.30) 0%, rgba(196,209,32,0.24) 30%, rgba(51,164,2,0.12) 56%, rgba(51,164,2,0) 76%)",
            }}
          />

          {/* Rays: a fan of soft wedges rather than drawn lines. */}
          <div
            data-hero-rays
            className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <div
              className="hero-rays h-full w-full"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg at 50% 50%, rgba(196,209,32,0.45) 0deg, rgba(196,209,32,0.08) 2.6deg, rgba(196,209,32,0) 5.2deg, rgba(196,209,32,0) 9.4deg)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, transparent 16%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.24) 40%, transparent 54%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, transparent 16%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.24) 40%, transparent 54%)",
                opacity: 0.3,
              }}
            />
          </div>

          {/* Before ignition: a bare rim rising out of the ridge. */}
          <div
            data-hero-sun-dark
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(196,209,32,0) 62%, rgba(196,209,32,0.05) 88%, rgba(196,209,32,0.12) 100%)",
              boxShadow: "inset 0 0 0 1px rgba(196,209,32,0.42)",
            }}
          />

          {/* Lit body. The limb darkens into green so the disc has a real edge
              at any point of the rise; the core stays white-hot. */}
          <div
            data-hero-sun-lit
            className="absolute inset-0 rounded-full opacity-0"
            style={{
              background:
                "radial-gradient(circle closest-side, rgba(255,255,255,0) 96.4%, rgba(255,255,255,0.28) 98.6%, rgba(255,255,255,0.46) 100%), radial-gradient(circle closest-side at 50% 50%, #FFFFFF 0%, #FDFFF5 7%, #F8FCEF 15%, #E6F8CE 25%, #D4F0B0 37%, #BCE89A 50%, #A6E07A 64%, #8ED85C 77%, #6FC108 88%, #4FB505 96%, #33A402 100%)",
              boxShadow: "0 0 34px 4px rgba(196,209,32,0.34), 0 0 120px 34px rgba(51,164,2,0.16)",
            }}
          />
        </div>
      </div>

      {/* First light blooming in the sky around the sun. Sits behind the land
          so the ridge and the town stay true silhouettes. */}
      <div
        data-hero-bloom
        aria-hidden="true"
        className="absolute left-1/2 top-[72%] z-[3] h-[86vh] w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 50% at 50% 52%, rgba(255,238,231,0.52) 0%, rgba(196,209,32,0.42) 24%, rgba(196,209,32,0.20) 46%, rgba(51,164,2,0.10) 62%, rgba(51,164,2,0.03) 74%, rgba(51,164,2,0) 82%)",
        }}
      />

      {/* Warmth at the horizon: the blush the palette reserves for sunrise. */}
      <div
        data-hero-warm
        aria-hidden="true"
        className="absolute left-1/2 top-[74%] z-[3] h-[30vh] w-[132vw] -translate-x-1/2 -translate-y-full opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,227,222,0) 0%, rgba(255,227,222,0.04) 40%, rgba(255,227,222,0.14) 68%, rgba(255,227,222,0.24) 88%, rgba(255,227,222,0.12) 96%, rgba(255,227,222,0) 100%)",
        }}
      />

      {/* Land: far ridge + skyline, then the nearer ridges over their feet. */}
      <div
        data-hero-land
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[72%] z-[4]"
      >
        <HeroLand />
      </div>

      {/* Light on the ground: a local glow under the sun, not a wash across
          the whole ridge, so the ground stays a silhouette. Masked top and
          bottom so the box edges never print as a seam. */}
      <div
        data-hero-spill
        aria-hidden="true"
        className="absolute inset-x-0 top-[72%] z-[5] h-[26%] opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 100% at 50% 0%, rgba(196,209,32,0.16) 0%, rgba(196,209,32,0.06) 44%, rgba(196,209,32,0) 78%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 22%, #000 52%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 22%, #000 52%, transparent 96%)",
        }}
      />

      {/* Veil: keeps white type readable while the sky is still night. */}
      <div
        data-hero-scrim
        aria-hidden="true"
        className="absolute inset-0 z-[7]"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,96,13,0.54) 0%, rgba(2,96,13,0.40) 26%, rgba(2,96,13,0.18) 48%, rgba(2,96,13,0.04) 62%, rgba(2,96,13,0) 74%)",
        }}
      />

      <div className="grain absolute inset-0 z-[8]" style={{ opacity: 0.26 }} aria-hidden="true" />
      {/* A screen pass of the same noise: overlay alone barely moves deep
          greens, so this is what breaks up gradient banding in the night sky. */}
      <div
        className="grain absolute inset-0 z-[8]"
        style={{ opacity: 0.07, mixBlendMode: "screen" }}
        aria-hidden="true"
      />
      <div data-hero-spotlight className="hero-spotlight absolute inset-0 z-[9]" aria-hidden="true" />
    </>
  );
}

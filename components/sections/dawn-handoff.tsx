import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CHURCH } from "@/data/church";

/**
 * DawnHandoff — the white morning the hero resolves into.
 * Real copy from content.md; the arch composition is generative art, labelled
 * as a study rather than photography. This is the first page of the day.
 */

export function DawnHandoff(): React.ReactElement {
  return (
    <section data-section="dawn" data-header-theme="light" className="relative bg-white text-ink">
      <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-14 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2 md:col-start-1 md:row-start-1">
            <p className="flex items-baseline gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40 md:flex-col md:gap-2">
              <span>§ 03</span>
              <span className="hidden h-10 w-px bg-ink/15 md:block" aria-hidden="true" />
              <span>Welcome</span>
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-3 md:row-start-1">
            <h2 className="max-w-[18ch] font-serif text-[clamp(2.1rem,4.6vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.035em]">
              Welcome to Forever Life and Grace Mission
            </h2>
            <p className="mt-7 max-w-[54ch] font-sans text-[17px] leading-[1.6] text-forest/80 md:text-[18px]">
              Welcome to Forever Life and Grace Mission, where the life of God is
              revealed, the grace of Jesus Christ is celebrated, and believers are
              established in their identity as sons of God.
            </p>
            <p className="mt-5 max-w-[52ch] font-sans text-[15px] leading-[1.65] text-ink/55">
              {CHURCH.address}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
            >
              Read our story
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          {/* At tablet the study drops into the second row, offset right; from
              desktop it sits beside the copy. Both are deliberate. */}
          <div className="md:col-span-6 md:col-start-7 md:row-start-2 md:mt-2 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0">
            <figure className="relative">
              <div className="arch-top relative aspect-[4/5] w-full overflow-hidden bg-mist">
                {/* Dawn sky. It starts on mist, never pure white, so the arch
                    silhouette holds against the white page. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #EFF9F2 0%, #F5FCF8 12%, #E9FBF0 32%, #D2F7E0 54%, #BCF2D0 68%, #F3E7DF 80%, #FFDCD5 90%, #F6D2CA 100%)",
                  }}
                />
                {/* Halo. */}
                <div
                  className="absolute left-[36%] top-[66%] h-[54%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[24px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,232,225,0.85) 0%, rgba(201,245,218,0.6) 40%, rgba(0,200,83,0.14) 66%, rgba(0,200,83,0) 84%)",
                  }}
                  aria-hidden="true"
                />
                {/* Sun, rising off the shoulder of the ridge. Pale and hazy —
                    the hero already carries the saturated disc. */}
                <div
                  className="absolute left-[34%] top-[64%] aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle closest-side at 50% 44%, #FFFFFF 0%, #FDFFFE 18%, #F2FEF7 34%, #E2FCED 50%, #CCF8DF 66%, #B0F2CB 82%, #93EAB8 100%)",
                    boxShadow: "0 0 46px 14px rgba(255,241,233,0.5), 0 0 90px 30px rgba(201,245,218,0.28)",
                  }}
                  aria-hidden="true"
                />
                {/* Ridges: a far crest that peaks right of the sun, then a
                    nearer fold in front of it. */}
                <svg
                  viewBox="0 0 400 170"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-0 h-[34%] w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="study-far" x1="0" y1="0" x2="0.16" y2="1">
                      <stop offset="0%" stopColor="#0F3522" />
                      <stop offset="46%" stopColor="#072015" />
                      <stop offset="100%" stopColor="#03100A" />
                    </linearGradient>
                    <linearGradient id="study-near" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#03120C" />
                      <stop offset="100%" stopColor="#010604" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 52 C 74 44 120 24 176 26 C 236 28 268 12 316 14 C 356 16 384 26 400 30 L400 170 L0 170 Z"
                    fill="url(#study-far)"
                  />
                  <path
                    d="M0 52 C 74 44 120 24 176 26 C 236 28 268 12 316 14 C 356 16 384 26 400 30"
                    fill="none"
                    stroke="rgba(201,245,218,0.5)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M0 128 C 46 118 86 92 140 96 C 196 100 230 134 286 138 C 330 141 368 128 400 124 L400 170 L0 170 Z"
                    fill="url(#study-near)"
                  />
                </svg>
                <div className="grain absolute inset-0 z-30" aria-hidden="true" />
              </div>
              <div
                className="arch-top pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15"
                aria-hidden="true"
              />
              <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
                <span>Dawn study · Gwarinpa</span>
                <span>Fig. 01</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="mx-auto h-px max-w-[1680px] bg-ink/10" />
    </section>
  );
}

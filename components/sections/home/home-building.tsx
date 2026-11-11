"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { ConceptLabel } from "@/components/ui/concept-label";
import { Button } from "@/components/ui/button";
import { BUILDING } from "@/data/home";
import { GIVING } from "@/data/giving";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeBuilding — the building project as a blueprint that draws itself.
 *
 * The elevation is drawn stroke by stroke on scroll, then floods with green
 * light while the capacity counts to 1,000. Clearly labelled as an
 * architectural concept, never as finished construction.
 *
 * The Give page reuses the same drawing with its own copy and the published
 * list of who the church welcomes into the project, so there is one blueprint
 * and one animation, not two.
 */

interface HomeBuildingProps {
  variant?: "home" | "give";
}

export function HomeBuilding({ variant = "home" }: HomeBuildingProps): React.ReactElement {
  const isGive = variant === "give";
  const copy = isGive ? GIVING.building : BUILDING;
  const root = useRef<HTMLElement>(null);
  const drawing = useRef<SVGSVGElement>(null);
  const capacity = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const svg = drawing.current;
    if (!section || !svg) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const lines = Array.from(
        svg.querySelectorAll<SVGGeometryElement>("[data-draw]")
      );

      if (reduced) {
        lines.forEach((line) => {
          line.style.strokeDasharray = "none";
          line.style.strokeDashoffset = "0";
        });
        gsap.set("[data-blueprint-fill], [data-blueprint-light], [data-blueprint-windows]", {
          opacity: 1,
        });
        return;
      }

      lines.forEach((line) => {
        const length = line.getTotalLength();
        line.style.strokeDasharray = `${length}`;
        line.style.strokeDashoffset = `${length}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 78%",
          end: "bottom 58%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      tl.to(lines, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1,
        stagger: 0.055,
      })
        .fromTo(
          "[data-blueprint-fill]",
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.35 },
          0.62
        )
        .fromTo(
          "[data-blueprint-light]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.45 },
          0.66
        )
        .fromTo(
          "[data-blueprint-windows]",
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.4 },
          0.72
        );
    }, section);

    // ── Count the capacity when the stat is actually on screen ──
    let raf = 0;
    let observer: IntersectionObserver | undefined;
    const number = capacity.current;

    if (number) {
      if (reduced) {
        number.textContent = "1,000";
      } else {
        number.textContent = "0";
        observer = new IntersectionObserver(
          (entries) => {
            if (!entries[0]?.isIntersecting) return;
            observer?.disconnect();

            const start = performance.now();
            const duration = 1500;
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              number.textContent = Math.round(eased * 1000).toLocaleString("en-US");
              if (progress < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          },
          { threshold: 0.55 }
        );
      }
    }

    // The observer needs the element in the document.
    if (observer && number) observer.observe(number);

    return () => {
      observer?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id={isGive ? "building-project" : "building-project"}
      data-section="building"
      data-header-theme="dark"
      className="relative overflow-hidden bg-night text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 52%, rgba(51,164,2,0.14) 0%, rgba(51,164,2,0.03) 44%, rgba(2,96,13,0) 74%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/15 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-dawn-mint/90">
              {isGive ? "§ 03 — The Building Project" : "§ 07 — Building Project"}
            </SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/72 md:col-span-4 md:block md:text-left">
            {isGive ? "Architectural concept · not yet built" : "A vision for generations"}
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-white/72 md:col-span-2">
            {isGive ? "No. 03 / 05" : "No. 07 / 10"}
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-14">
          {/* ── Copy ── */}
          <div className="col-span-12 lg:col-span-5">
            <h2 className="max-w-[13ch] font-serif text-[clamp(2.4rem,5.6vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.04em]">
              {isGive ? (
                <>
                  A Vision for a <span className="italic text-dawn-mint">1,000-Capacity</span>{" "}
                  Auditorium
                </>
              ) : (
                <>
                  Building a House <span className="italic text-dawn-mint">for</span>{" "}
                  Generations
                </>
              )}
            </h2>

            <p className="mt-6 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-white/90">
              {copy.lead}
            </p>

            {/* Count-up */}
            <div className="mt-8 flex items-end gap-4 border-y border-white/12 py-5">
              <span
                aria-label="1,000"
                className="font-serif text-[clamp(4.4rem,10vw,8.4rem)] font-medium leading-[0.8] tracking-[-0.06em] text-white"
              >
                <span ref={capacity} aria-hidden="true">
                  1,000
                </span>
              </span>
              <span className="pb-2 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.18em] text-white/76">
                Capacity
                <br />
                auditorium
              </span>
            </div>

            <p className="mt-6 max-w-[46ch] font-sans text-[15px] leading-[1.65] text-white/86">
              {copy.body}
            </p>
            <p className="mt-4 max-w-[42ch] font-sans text-[15px] leading-[1.65] text-dawn-mint/95">
              {copy.invitation}
            </p>

            {isGive ? (
              <ul className="mt-6 grid max-w-[46ch] gap-x-6 gap-y-2 border-t border-white/12 pt-5 sm:grid-cols-2">
                {GIVING.building.contributors.map((contributor) => (
                  <li
                    key={contributor}
                    className="flex items-baseline gap-2 font-sans text-[13px] leading-[1.5] text-white/86"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-brand-green"
                    />
                    {contributor}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild size="md" variant="brand">
                <Link href={isGive ? "#official-account" : "/give"}>
                  {isGive ? "Give toward the building" : "Support the Building Project"}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/66">
                Prayer · Partnership · Giving
              </p>
            </div>
          </div>

          {/* ── Blueprint ── */}
          <figure className="col-span-12 lg:col-span-7">
            <div className="relative border border-white/15 bg-[#024A0B] p-3 md:p-4">
              <ConceptLabel className="absolute right-3 top-3 z-20 md:right-4 md:top-4" />

              <svg
                ref={drawing}
                viewBox="0 0 900 640"
                className="block h-auto w-full"
                role="img"
                aria-label="Architectural concept: elevation of the proposed 1,000-capacity auditorium"
              >
                <defs>
                  <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M40 0H0V40"
                      stroke="#C4D120"
                      strokeWidth="0.5"
                      opacity="0.22"
                    />
                  </pattern>
                  <linearGradient id="bp-green" x1="0" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor="#C4D120" stopOpacity="0.95" />
                    <stop offset="42%" stopColor="#6FC108" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="bp-window" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F8FCEF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#D8E36B" stopOpacity="0.55" />
                  </linearGradient>
                  <radialGradient id="bp-light" cx="50%" cy="52%" r="55%">
                    <stop offset="0%" stopColor="#33A402" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#33A402" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="900" height="640" fill="url(#bp-grid)" />

                {/* Green fill, under the line work. */}
                <path
                  data-blueprint-fill
                  d="M240 300 C240 210 332 164 450 164 C568 164 660 210 660 300 L660 516 L240 516 Z"
                  fill="url(#bp-green)"
                  style={{ opacity: 0 }}
                />
                <path
                  data-blueprint-fill
                  d="M110 516 V360 H240 V516 Z"
                  fill="url(#bp-green)"
                  style={{ opacity: 0 }}
                />
                <path
                  data-blueprint-fill
                  d="M660 516 V360 H790 V516 Z"
                  fill="url(#bp-green)"
                  style={{ opacity: 0 }}
                />

                {/* Light bloom over the massing, revealed with the fill. */}
                <ellipse
                  data-blueprint-light
                  cx="450"
                  cy="392"
                  rx="320"
                  ry="205"
                  fill="url(#bp-light)"
                  style={{ opacity: 0 }}
                />

                {/* Lit glazing — turned on with the fill. */}
                <g data-blueprint-windows style={{ opacity: 0 }}>
                  <rect x="390" y="350" width="120" height="166" fill="url(#bp-window)" opacity="0.5" />
                  <rect x="418" y="470" width="64" height="46" fill="#F4F9E4" opacity="0.65" />
                  <rect x="132" y="386" width="34" height="54" fill="url(#bp-window)" opacity="0.55" />
                  <rect x="184" y="386" width="34" height="54" fill="url(#bp-window)" opacity="0.45" />
                  <rect x="682" y="386" width="34" height="54" fill="url(#bp-window)" opacity="0.45" />
                  <rect x="734" y="386" width="34" height="54" fill="url(#bp-window)" opacity="0.55" />
                </g>

                {/* Ground + datum */}
                <line
                  data-draw
                  x1="40"
                  y1="516"
                  x2="860"
                  y2="516"
                  stroke="#C4D120"
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  data-draw
                  x1="40"
                  y1="610"
                  x2="860"
                  y2="610"
                  stroke="#C4D120"
                  strokeWidth="0.5"
                  strokeDasharray="2 6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Central hall */}
                <path
                  data-draw
                  fill="none"
                  d="M240 516 V300 C240 210 332 164 450 164 C568 164 660 210 660 300 V516"
                  stroke="#C4D120"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M228 300 H672"
                  stroke="#C4D120"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M252 300 C252 222 336 188 450 188 C564 188 648 222 648 300"
                  stroke="#C4D120"
                  strokeWidth="0.7"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Roof ribs */}
                <path
                  data-draw
                  fill="none"
                  d="M450 164 V516"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M360 172 C330 246 330 392 330 516"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M540 172 C570 246 570 392 570 516"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M300 206 C278 292 278 412 278 516"
                  stroke="#C4D120"
                  strokeWidth="0.45"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M600 206 C622 292 622 412 622 516"
                  stroke="#C4D120"
                  strokeWidth="0.45"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Facade glazing */}
                <rect
                  data-draw
                  fill="none"
                  x="390"
                  y="350"
                  width="120"
                  height="166"
                  stroke="#C4D120"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M390 392 H510 M390 434 H510 M390 476 H510 M450 350 V516"
                  stroke="#C4D120"
                  strokeWidth="0.45"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Doors */}
                <path
                  data-draw
                  fill="none"
                  d="M418 516 V470 H482 V516"
                  stroke="#C4D120"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Wings */}
                <path
                  data-draw
                  fill="none"
                  d="M110 516 V360 H240 M660 360 H790 V516"
                  stroke="#C4D120"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M110 360 L126 336 H222 L240 360"
                  stroke="#C4D120"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M660 360 L678 336 H774 L790 360"
                  stroke="#C4D120"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Wing windows */}
                <rect
                  data-draw
                  fill="none"
                  x="132"
                  y="386"
                  width="34"
                  height="54"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  data-draw
                  fill="none"
                  x="184"
                  y="386"
                  width="34"
                  height="54"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  data-draw
                  fill="none"
                  x="682"
                  y="386"
                  width="34"
                  height="54"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  data-draw
                  fill="none"
                  x="734"
                  y="386"
                  width="34"
                  height="54"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Steps */}
                <path
                  data-draw
                  fill="none"
                  d="M200 516 H700 M190 528 H710 M180 540 H720 M170 552 H730"
                  stroke="#C4D120"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Site hatching */}
                <path
                  data-draw
                  fill="none"
                  d="M60 532 l14 -14 M90 532 l14 -14 M120 532 l14 -14 M760 532 l14 -14 M790 532 l14 -14 M820 532 l14 -14"
                  stroke="#C4D120"
                  strokeWidth="0.45"
                  opacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Dimension line + drawing annotations */}
                <line
                  data-draw
                  x1="820"
                  y1="164"
                  x2="820"
                  y2="516"
                  stroke="#C4D120"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M812 172 L820 164 L828 172 M812 508 L820 516 L828 508"
                  stroke="#C4D120"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x="836"
                  y="344"
                  fill="#C4D120"
                  opacity="0.55"
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                  letterSpacing="2"
                  transform="rotate(90 836 344)"
                >
                  1,000 SEATS
                </text>

                <text
                  x="56"
                  y="76"
                  fill="#C4D120"
                  opacity="0.62"
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                  letterSpacing="2.4"
                >
                  PROPOSED ELEVATION · A–A
                </text>
                <text
                  x="56"
                  y="94"
                  fill="#C4D120"
                  opacity="0.38"
                  fontFamily="var(--font-mono)"
                  fontSize="8"
                  letterSpacing="1.8"
                >
                  RESURRECTION GROUND · GWARINPA
                </text>

                {/* North point */}
                <circle
                  data-draw
                  fill="none"
                  cx="786"
                  cy="86"
                  r="18"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  data-draw
                  fill="none"
                  d="M786 100 V72 M786 72 L780 82 M786 72 L792 82"
                  stroke="#C4D120"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x="786"
                  y="58"
                  textAnchor="middle"
                  fill="#C4D120"
                  opacity="0.55"
                  fontFamily="var(--font-mono)"
                  fontSize="8"
                  letterSpacing="1.5"
                >
                  N
                </text>
              </svg>
            </div>

            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/72">
              <span>Proposed auditorium · Resurrection Ground, Gwarinpa</span>
              <span>Drawing 07</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

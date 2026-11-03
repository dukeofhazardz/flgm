"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Pending } from "@/components/ui/pending";
import { ConceptLabel } from "@/components/ui/concept-label";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CHURCH BUILDING PROJECT — "Building a House for Generations".
 * Scroll-scrubbed blueprint line drawing builds an auditorium outline,
 * then a placeholder concept panel with the visible label "Architectural concept".
 * Count-up to "1,000-capacity auditorium". CTA to /give.
 * Exact project copy including "prayer, partnership, and voluntary giving".
 */

const PROJECT_COPY =
  "Forever Life and Grace Mission is advancing its vision for a 1,000-capacity church auditorium in Gwarinpa, Abuja. The Church Building Project represents our commitment to creating a place where generations can worship, grow spiritually, receive the Word, and participate in the work of God’s Kingdom. Join us in advancing this vision through prayer, partnership, and voluntary giving.";

export function BuildingProjectSection(): React.ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const paths = svg.querySelectorAll<SVGPathElement>("[data-blueprint]");

    // Draw each blueprint line in sequence on scroll.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 70%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      tl.to(
        path,
        { strokeDashoffset: 0, duration: 1, ease: "none" },
        i * 0.15
      );
    });

    // Count-up to 1,000 on scroll.
    gsap.to({}, {
      scrollTrigger: {
        trigger: svg,
        start: "top 60%",
        end: "bottom 40%",
        scrub: true,
        onUpdate: (self) => {
          setCount(Math.round(self.progress * 1000));
        },
      },
    });

    return () => {
      tl.kill();
      paths.forEach((p) => {
        p.style.strokeDasharray = "";
        p.style.strokeDashoffset = "";
      });
    };
  }, []);

  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <Reveal className="mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Building a House for Generations
          </h2>
        </Reveal>

        {/* Blueprint line drawing */}
        <div className="relative max-w-md mx-auto mb-16 aspect-square group">
          <svg
            ref={svgRef}
            className="w-full h-full overflow-visible"
            viewBox="0 0 200 200"
            fill="none"
            stroke="#00c853"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Auditorium outline: outer walls */}
            <path data-blueprint d="M 30 170 L 30 50 L 170 50 L 170 170 Z" className="fill-none" />
            {/* Stage area */}
            <path data-blueprint d="M 30 50 L 170 50 L 170 80 L 30 80 Z" className="fill-none" />
            {/* Pews / seating rows */}
            <path data-blueprint d="M 40 100 L 160 100" className="fill-none" />
            <path data-blueprint d="M 40 120 L 160 120" className="fill-none" />
            <path data-blueprint d="M 40 140 L 160 140" className="fill-none" />
            <path data-blueprint d="M 40 160 L 160 160" className="fill-none" />
            {/* Aisle center */}
            <path data-blueprint d="M 100 80 L 100 170" className="fill-none" />
            {/* Entrance */}
            <path data-blueprint d="M 90 170 L 110 170" className="fill-none" strokeWidth="3" />
            {/* Roof arch */}
            <path data-blueprint d="M 30 50 Q 100 20 170 50" className="fill-none" strokeWidth="2" />
          </svg>
          <div className="absolute -inset-1 bg-brand-green/5 rounded-none blur-[4px]" />
        </div>

        {/* Count-up */}
        <div className="flex items-baseline justify-center gap-2 mb-8">
          <span className="font-serif text-6xl md:text-7xl font-bold text-ink">
            {count}
          </span>
          <span className="text-sm md:text-base text-ink/60 font-medium tracking-tight">
            capacity auditorium
          </span>
        </div>

        <p className="text-base md:text-lg text-ink/70 leading-relaxed text-center mb-10 max-w-2xl mx-auto">
          {PROJECT_COPY}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/give"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-ink font-semibold text-base rounded-none hover:bg-deep-green transition-colors"
          >
            Support the Church Building Project
            <span className="text-[10px]">→</span>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-between max-w-md mx-auto px-4">
          <Pending confirmed={false} label="Concept images pending church approval" className="w-1/2">
            <div className="h-48 bg-tint-white border border-ink/10 flex items-center justify-center">
              <ConceptLabel className="block" />
              <span className="text-[10px] text-ink/40 mt-2">Architectural concept</span>
            </div>
          </Pending>
        </div>
      </div>
    </section>
  );
}

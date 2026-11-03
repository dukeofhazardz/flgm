"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { CHURCH } from "@/data/church";
import { watchAndPrayDayNumber, liveStripMessage } from "@/lib/time";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroWebGL = dynamic(() => import("./hero-light"), {
  loading: () => null,
  ssr: false,
});

const HeroFallback = dynamic(() => import("./hero-light-fallback"), {
  loading: () => null,
  ssr: false,
});

/** Trimmed welcome line from content.md (lines 204–207). */
const WELCOME_COPY =
  "Welcome to Forever Life and Grace Mission, a Christ-centred ministry committed to revealing the life of God, establishing believers in the grace of Jesus Christ, and raising a generation of sons who manifest God’s purpose, dominion, and Kingdom influence.";

export function Hero(): React.ReactElement {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hydration-safe: server + first client paint render fallback (useWebGL=false);
  // swap to WebGL after mount when appropriate. One-time mount correction.
  const [useWebGL, setUseWebGL] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUseWebGL(!isMobile && !prefersReduced);
  }, [isMobile, prefersReduced]);

  // ---- Next gathering (WAT-aware) — computed on client to avoid prerender time ----
  const [gathering, setGathering] = useState<{
    label: string;
    time: string;
  }>({ label: "Sunday worship", time: "8:00 AM & 9:30 AM" });
  useEffect(() => {
    const day = watchAndPrayDayNumber();
    if (day) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGathering({ label: `Day ${day} of 50`, time: "Daily prayer 5:30 AM" });
      return;
    }
    const msg = liveStripMessage();
    if (msg && msg.type === "watch-and-pray-countdown") {
      setGathering({ label: msg.text, time: "Daily prayer 5:30 AM" });
      return;
    }
    setGathering({ label: "Sunday worship", time: "8:00 AM & 9:30 AM" });
  }, []);

  // ---- SplitText headline reveal ----
  useEffect(() => {
    if (!headlineRef.current || prefersReduced) return;
    const split = new SplitText(headlineRef.current, { type: "chars" });
    const tl = gsap.timeline();
    tl.from(split.chars, {
      opacity: 0,
      y: 44,
      duration: 0.7,
      ease: "ease-out",
      stagger: 0.025,
    });
    return () => split.revert();
  }, [prefersReduced]);

  // ---- DrawSVG-style hand-drawn underline ----
  useEffect(() => {
    if (!underlineRef.current || prefersReduced) return;
    const path = underlineRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "ease-out",
      delay: 0.6,
    });
    return () => {
      path.style.strokeDasharray = "";
      path.style.strokeDashoffset = "";
    };
  }, [prefersReduced]);

  // ---- Arch scroll animation: scales & opens clip-path into next section ----
  useEffect(() => {
    if (!archRef.current || prefersReduced) return;
    const arch = archRef.current;
    gsap.to(arch, {
      scrollTrigger: {
        trigger: arch,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      scale: 1.15,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 75% 100%, 25% 100%, 0% 100%)",
      ease: "none",
    });
  }, [prefersReduced]);

  return (
    <section
      className="relative min-h-[dvh] min-h-[svh] w-full bg-white overflow-hidden"
      aria-label="Hero"
    >
      {/* Background daybreak light — full viewport, behind content */}
      <div className="absolute inset-0 -z-10">
        {useWebGL ? (
          <HeroWebGL className="inset-0 w-full h-full" />
        ) : (
          <HeroFallback className="inset-0 w-full h-full" />
        )}
      </div>

      <div
        className="relative z-10 px-6 pt-[dvh] pb-24 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow — identity line */}
        <p className="text-xs font-semibold text-deep-green tracking-widest uppercase mb-6">
          A HOUSE OF GRACE &bull; A PEOPLE OF PURPOSE
        </p>

        {/* Giant arch mask — centre, generative placeholder scene */}
        <div
          ref={archRef}
          className="relative w-full max-w-[560px] h-[560px] md:w-[720px] md:h-[720px] mx-auto mb-16 group transition-all duration-700"
        >
          <div
            className="absolute inset-0 bg-tint-white/60 clip-path-[polygon(0_0,100%_0,100%_75%,75%_100%,25%_100%,0_75%)]"
          />
          {/* Placeholder: generative light + architecture lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-28 h-28 md:w-36 md:h-36 text-brand-green/35"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 50 150 L 50 72 A 50 50 0 0 1 150 72 L 150 150" />
              <path d="M 100 30 L 100 100" />
              <path d="M 62 82 L 138 82" />
              <path d="M 84 108 L 116 108" />
              <circle cx="100" cy="70" r="14" className="fill-brand-green opacity-50" />
            </svg>
            <div
              className="absolute w-full h-full rounded-full bg-brand-green/10 blur-[60px] animate-pulse"
              style={{
                animationDuration: "10s",
                width: "120%",
                height: "120%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>

        {/* Headline — SplitText char reveal */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tight mb-6"
        >
          FOREVER LIFE AND GRACE MISSION
        </h1>

        {/* Tagline + hand-drawn underline */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <p className="text-base md:text-lg font-bold text-brand-green tracking-tight">
            {CHURCH.tagline}
          </p>
          <svg className="w-28 md:w-40 h-[2px]" viewBox="0 0 200 2" fill="none">
            <path
              ref={underlineRef}
              d="M 0 1 L 200 1"
              stroke="#00c853"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Welcome line — church copy, trimmed */}
        <p className="max-w-xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed mb-12">
          {WELCOME_COPY}
        </p>

        {/* CTAs — magnetic */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Magnetic>
            <Button asChild size="lg" variant="brand">
              <Link href="/contact">Plan Your Visit</Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="/watch-and-pray">Join Watch and Pray</Link>
            </Button>
          </Magnetic>
        </div>
        <Magnetic>
          <Button size="sm" variant="red" asChild>
            <Link href="/give">Support the Church Building Project</Link>
          </Button>
        </Magnetic>

        {/* Next gathering card — WAT-aware */}
        <div className="mt-16 inline-flex flex-col items-center gap-2 px-6 py-4 rounded-none bg-tint-white border border-ink/10">
          <p className="text-[10px] font-semibold text-deep-green tracking-widest uppercase">
            Next gathering
          </p>
          <p className="text-sm md:text-base font-bold text-ink">{gathering.label}</p>
          <p className="text-[11px] text-ink/60">{gathering.time}</p>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex flex-col items-center gap-2">
          <ArrowRight className="w-5 h-5 text-brand-red" />
          <p className="text-[10px] text-ink/40 tracking-widest uppercase">Scroll</p>
        </div>
      </div>

      {/* Marquee beneath hero */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-white border-t border-ink/10 py-4">
        <Marquee speed={32}>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            Grace
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            &bull;
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            Eternal Life
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            &bull;
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            Sonship
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            &bull;
          </span>
          <span className="text-[11px] font-semibold text-ink/60 tracking-widest uppercase">
            Kingdom Influence
          </span>
        </Marquee>
      </div>

      {/* Address line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[11px] text-ink/40 tracking-widest uppercase whitespace-nowrap">
        {CHURCH.address.split("\n")[1]}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { CHURCH } from "@/data/church";
import { Button } from "@/components/ui/button";
import { HeroAtmosphere } from "@/components/sections/home/hero-atmosphere";
import { HeroMasthead } from "@/components/sections/home/hero-masthead";
import { NextGathering } from "@/components/sections/home/next-gathering";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeHero — the sunrise masthead.
 *
 * Desktop pins the scene for ~2.2 screens: the sun lifts off the ridge and
 * lights from the core outward, the masthead drifts, the sky runs
 * Night → forest → mint-and-blush dawn, and a caption closes the scene before
 * the white morning of the next section takes over.
 *
 * On wide screens the small copy lives inside the rag of the masthead — the
 * paragraph beside "and Grace", the actions beside "Mission" — so the type can
 * be as large as the band allows without ever crowding the copy. Below that
 * width the same content stacks under the masthead.
 */

const HERO_COPY =
  "Where the life of God, the grace of Jesus Christ and the revelation of sonship empower believers to live purposeful, victorious lives.";

function HeroActions({ stacked }: { stacked?: boolean }): React.ReactElement {
  return (
    <div className={stacked ? "flex flex-col items-stretch gap-2.5" : "flex flex-wrap items-center gap-3"}>
      <Button asChild size="md" variant="brand" className={stacked ? "w-full" : undefined}>
        <Link href="/contact">
          Plan Your Visit
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </Link>
      </Button>
      <Button asChild size="md" variant="outline-light" className={stacked ? "w-full" : undefined}>
        <Link href="/watch-and-pray">Join Watch and Pray</Link>
      </Button>
    </div>
  );
}

function HeroSupportLink({ className }: { className?: string }): React.ReactElement {
  return (
    <Link
      href="/give"
      className={`inline-flex items-center gap-2 whitespace-nowrap border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-white/70 transition-colors hover:text-white ${className ?? ""}`}
    >
      Support the Church Building Project
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

function HeroAddress({ className }: { className?: string }): React.ReactElement {
  return (
    <p
      className={`font-mono text-[9px] uppercase leading-[1.8] tracking-[0.1em] text-white/45 ${className ?? ""}`}
    >
      {CHURCH.address}
    </p>
  );
}

export function HomeHero(): React.ReactElement {
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const stage = scene.current;
    if (!root || !stage) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const band = root.querySelector<HTMLElement>("[data-masthead-band]");

      // ── Fit each visible masthead to the band it actually has ──
      const fitOne = (host: HTMLElement | null) => {
        if (!host || !band) return;
        const h1 = host.querySelector<HTMLElement>(".hero-h1");
        if (!h1) return;
        host.style.removeProperty("--fit");
        if (!h1.offsetWidth) return; // display:none variant
        const availableW = band.clientWidth;
        const availableH = band.clientHeight;
        if (!availableW || !availableH) return;
        const lines = Array.from(h1.querySelectorAll<HTMLElement>("[data-line]"));
        // Lines are w-max, so offsetWidth is the true width of the set type.
        const naturalW = lines.length
          ? Math.max(...lines.map((line) => line.offsetWidth))
          : h1.scrollWidth;
        const naturalH = h1.offsetHeight;
        if (!naturalW || !naturalH) return;
        // 0.94 leaves optical air around the block.
        const scale = Math.min(availableW / naturalW, availableH / naturalH) * 0.94;
        host.style.setProperty("--fit", String(Math.min(scale, 2.4)));
      };

      const fit = () => {
        fitOne(root.querySelector<HTMLElement>('[data-masthead="desktop"]'));
        fitOne(root.querySelector<HTMLElement>('[data-masthead="mobile"]'));
      };

      fit();
      ScrollTrigger.refresh();
      const resize = new ResizeObserver(fit);
      if (band) resize.observe(band);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          fit();
          ScrollTrigger.refresh();
        });
      }

      if (reduced) {
        gsap.set("[data-hero-forest], [data-hero-glow], [data-hero-bloom]", { opacity: 1 });
        gsap.set("[data-hero-spill], [data-hero-rim], [data-hero-warm]", { opacity: 1 });
        gsap.set("[data-hero-sun]", { yPercent: -110 });
        gsap.set("[data-hero-sun-lit], [data-hero-sun-halo]", { opacity: 1 });
        gsap.set("[data-hero-sun-dark]", { opacity: 0 });
        gsap.set("[data-hero-town], [data-hero-dawn]", { opacity: 1 });
        return () => resize.disconnect();
      }

      // ── Entrance ──
      gsap.set("[data-word]", { yPercent: 116 });
      gsap.set("[data-hero-rule]", { clipPath: "inset(0 100% 0 0)" });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });

      intro
        .to("[data-word]", { yPercent: 0, duration: 1.1, stagger: 0.05 }, 0)
        .from("[data-meta-inner]", { opacity: 0, y: 10, duration: 0.7, stagger: 0.08 }, 0.1)
        .to("[data-hero-rule]", { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power2.inOut" }, 0.5)
        .from("[data-hero-tagline]", { opacity: 0, y: 8, duration: 0.6 }, 0.34)
        .from("[data-bottom-inner]", { opacity: 0, y: 18, duration: 0.8 }, 0.42)
        .from("[data-hero-sun-body]", { scale: 0.94, opacity: 0.5, duration: 1.4, ease: "power2.out" }, 0);

      // ── Scroll: the sunrise ──
      const build = (distance: number) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * distance}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to("[data-hero-sun]", { yPercent: -104, scale: 1.04, duration: 0.92 }, 0.02)
          .to("[data-hero-forest]", { opacity: 1, duration: 0.9 }, 0)
          .to("[data-hero-glow]", { opacity: 1, scaleY: 1.3, duration: 0.95 }, 0.02)
          .to("[data-hero-rim]", { opacity: 1, duration: 0.2 }, 0.05)
          .to("[data-hero-meta]", { opacity: 0, y: -10, duration: 0.12 }, 0.02)
          .to("[data-hero-tagline]", { opacity: 0, y: -8, duration: 0.12 }, 0.02)
          .to("[data-hero-bottom]", { opacity: 0, y: 14, duration: 0.14 }, 0.04)
          .to("[data-hero-spotlight]", { opacity: 0, duration: 0.16 }, 0.04)
          .to("[data-masthead-band]", { scale: 1.04, transformOrigin: "50% 45%", duration: 0.9 }, 0)
          .to('[data-line="1"]', { yPercent: -10, duration: 0.7 }, 0)
          .to('[data-line="2"]', { yPercent: -7, duration: 0.7 }, 0)
          .to('[data-line="3"]', { yPercent: -3, duration: 0.7 }, 0)
          .to('[data-line="4"]', { yPercent: -3, duration: 0.7 }, 0)
          .to("[data-hero-scrim]", { opacity: 0, duration: 0.16 }, 0.08)
          .to("[data-masthead-band]", { opacity: 0, duration: 0.18 }, 0.12)
          .to("[data-hero-bloom]", { opacity: 1, duration: 0.36 }, 0.1)
          .to("[data-hero-warm]", { opacity: 1, duration: 0.4 }, 0.24)
          .to("[data-hero-spill]", { opacity: 1, duration: 0.4 }, 0.16)
          .to("[data-hero-sun-dark]", { opacity: 0, duration: 0.14 }, 0.16)
          .to("[data-hero-sun-lit]", { opacity: 1, duration: 0.2 }, 0.22)
          .to("[data-hero-sun-halo]", { opacity: 1, duration: 0.28 }, 0.24)
          .to("[data-hero-rays]", { opacity: 0.85, duration: 0.3 }, 0.44)
          .to("[data-hero-town]", { opacity: 1, duration: 0.22 }, 0.46)
          .fromTo(
            "[data-hero-dawn]",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.14, ease: "power1.out" },
            0.3
          )
          .to({}, { duration: 0.2 }, 0.8);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => build(1.8));
      mm.add("(max-width: 1023px)", () => build(1.05));

      return () => {
        mm.revert();
        resize.disconnect();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-night">
      <div
        ref={scene}
        data-hero-scene
        data-header-theme="dark"
        className="relative h-[100svh] w-full overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #04180F 0%, #04180F 44%, #051C11 64%, #072215 84%, #082517 100%)",
        }}
      >
        <HeroAtmosphere />

        <div className="relative z-20 flex h-full flex-col px-5 pb-4 pt-[104px] md:px-8 md:pb-6 lg:px-10 lg:pb-6 lg:pt-[120px]">
          {/* ── Top rail: identity + tagline ── */}
          <div data-hero-meta className="flex items-start justify-between gap-6">
            <p
              data-meta-inner
              className="font-mono text-[8.5px] uppercase leading-[1.7] tracking-[0.2em] text-white/55 md:text-[10px] md:tracking-[0.22em]"
            >
              A House of Grace
              <span className="mx-2 text-brand-green" aria-hidden="true">
                •
              </span>
              A People of Purpose
            </p>

            <div data-meta-inner className="hidden shrink-0 text-right md:block">
              <p className="font-serif text-[clamp(1rem,1.55vw,1.5rem)] font-medium italic leading-none tracking-[-0.015em] text-brand-green">
                {CHURCH.tagline}
              </p>
              <span data-hero-rule className="mt-2 block w-full origin-left">
                <svg viewBox="0 0 240 10" fill="none" className="block h-[6px] w-full" aria-hidden="true">
                  <path
                    d="M1.5 7.4C57 2.6 137 2.2 238.5 5.8"
                    stroke="#00C853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* ── Mobile tagline ── */}
          <div data-hero-tagline className="mt-3 md:hidden">
            <p className="inline-flex flex-col items-start">
              <span className="font-serif text-[clamp(1.05rem,4.6vw,1.5rem)] font-medium italic leading-none tracking-[-0.015em] text-brand-green">
                {CHURCH.tagline}
              </span>
              <span data-hero-rule className="mt-1.5 block w-[min(210px,54vw)] origin-left">
                <svg viewBox="0 0 240 10" fill="none" className="block h-[6px] w-full" aria-hidden="true">
                  <path
                    d="M1.5 7.4C57 2.6 137 2.2 238.5 5.8"
                    stroke="#00C853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>
          </div>

          {/* ── Masthead band (+ the copy that lives in its rag, wide screens) ── */}
          <div
            data-masthead-band
            className="relative mt-2 flex min-h-0 flex-1 flex-col justify-center lg:mt-1"
          >
            <div
              className="pointer-events-none absolute inset-0 z-30 hidden roomy:grid"
              style={{ gridTemplateRows: "1fr 1.08fr 1.26fr" }}
            >
              <div className="row-start-2 flex items-center">
                <div className="pointer-events-auto w-[clamp(250px,26vw,320px)]">
                  <p className="font-sans text-[15.5px] leading-[1.55] text-white/80">{HERO_COPY}</p>
                  <HeroAddress className="mt-3" />
                </div>
              </div>

              <div className="row-start-3 flex items-end justify-end pb-0.5">
                <div className="pointer-events-auto flex w-[318px] flex-col items-stretch gap-3">
                  <NextGathering className="text-[8px] tracking-[0.06em]" />
                  <HeroActions stacked />
                  <HeroSupportLink className="self-start text-[8px] tracking-[0.1em]" />
                </div>
              </div>
            </div>

            <HeroMasthead variant="mobile" className="md:hidden" />
            <HeroMasthead variant="desktop" className="hidden md:block" />
          </div>

          {/* ── Stacked band: tablet and small laptop ── */}
          <div data-hero-bottom className="shrink-0 roomy:hidden">
            <div data-bottom-inner className="hidden md:grid md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-6">
                <p className="max-w-[38ch] font-sans text-[15px] leading-[1.5] text-white/75">{HERO_COPY}</p>
                <HeroAddress className="mt-3 max-w-[48ch] short:hidden" />
                
              </div>

              <div className="md:col-span-5 md:col-start-8">
                <NextGathering className="mt-3" />
                <HeroActions />
                <HeroSupportLink className="mt-3.5" />
              </div>
            </div>

            {/* Mobile: thumb-reach actions */}
            <div data-bottom-inner className="flex flex-col gap-2.5 md:hidden">
              <NextGathering className="mb-1" />
              <Button asChild size="md" variant="brand" className="w-full">
                <Link href="/contact">
                  Plan Your Visit
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="md" variant="outline-light" className="w-full">
                <Link href="/watch-and-pray">Join Watch and Pray</Link>
              </Button>
              <HeroSupportLink className="mt-0.5 self-start pb-1" />
            </div>

            {/* Folio line */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 lg:mt-5 lg:pt-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 lg:text-[9px] lg:tracking-[0.2em]">
                No. 01
                <span className="mx-2 text-white/15" aria-hidden="true">
                  /
                </span>
                Gwarinpa, Abuja
              </p>
              <span className="flex items-center gap-2.5" aria-hidden="true">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 lg:text-[9px] lg:tracking-[0.2em]">
                  Scroll
                </span>
                <span className="relative block h-6 w-px overflow-hidden bg-white/15 lg:h-8">
                  <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-2.5 w-px bg-brand-green" />
                </span>
              </span>
            </div>
          </div>

          {/* ── Folio line: wide screens ── */}
          <div
            data-hero-bottom
            className="mt-4 hidden shrink-0 items-center justify-between border-t border-white/10 pt-3.5 roomy:flex"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
              No. 01
              <span className="mx-2 text-white/15" aria-hidden="true">
                /
              </span>
              Gwarinpa, Abuja
            </p>
            <span className="flex items-center gap-2.5" aria-hidden="true">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">Scroll</span>
              <span className="relative block h-8 w-px overflow-hidden bg-white/15">
                <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-2.5 w-px bg-brand-green" />
              </span>
            </span>
          </div>
        </div>

        {/* ── Closing caption: the day begins ── */}
        <div
          data-hero-dawn
          className="pointer-events-none absolute inset-x-0 bottom-[9%] z-[9] flex items-center gap-3 px-5 opacity-0 md:px-8 lg:px-10"
        >
          <span aria-hidden="true" className="block h-px w-8 bg-dawn-mint/40 md:w-12" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-dawn-mint/80 md:text-[10px]">
            Dawn over Gwarinpa
          </span>
        </div>
      </div>
    </section>
  );
}

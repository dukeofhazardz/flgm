"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinnedSection } from "@/components/motion/pinned-section";
import { Reveal } from "@/components/motion/reveal";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * OUR VISION — pinned section.
 * Vision statement fills word by word on scroll (scrubbed text fill:
 * brand green over faint ink). Then the four pillars (Grace, Eternal Life,
 * Sonship, Kingdom Influence) morph through in turn with a supporting line
 * each, taken from the beliefs/vision copy.
 */

const VISION =
  "To raise a people established in the revelation of God’s grace and eternal life, manifesting sonship, dominion, spiritual maturity, and Kingdom influence in every sphere of life.";

const PILLARS = [
  {
    title: "Grace",
    line: "Established in the knowledge of God’s grace and eternal life.",
  },
  {
    title: "Eternal Life",
    line: "Living in the reality and expression of the life of God.",
  },
  {
    title: "Sonship",
    line: "Understanding and living from our identity as sons of God.",
  },
  {
    title: "Kingdom Influence",
    line: "Exercising dominion and influence in every sphere of life.",
  },
] as const;

export function VisionSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const visionEl = visionRef.current;
    if (!container || !visionEl) return undefined;

    // Two layers: faint ink behind, brand green in front (revealed on scroll).
    visionEl.innerHTML = `
      <span class="vision-ink">${VISION}</span>
      <span class="vision-green">${VISION}</span>
    `;

    const inkEl = visionEl.querySelector(".vision-ink") as HTMLElement;
    const greenEl = visionEl.querySelector(".vision-green") as HTMLElement;

    inkEl.style.color = "rgba(11, 42, 30, 0.15)";
    greenEl.style.color = "#00c853";
    greenEl.style.display = "block";
    greenEl.style.overflow = "hidden";
    greenEl.style.clipPath = "inset(0 100% 0 0)";
    inkEl.style.position = "relative";
    greenEl.style.position = "relative";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=120%",
        scrub: true,
        anticipatePin: 1,
      },
    });

    tl.to(greenEl, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1,
      ease: "none",
    });

    return () => {
      tl.kill();
      visionEl.innerHTML = "";
    };
  }, []);

  // Pillars morphing — one at a time, cross-fading on scroll.
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${PILLARS.length * 100}%`,
      scrub: true,
      snap: {
        snapTo: [0, 1 / 3, 2 / 3, 1],
        duration: 0.3,
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          Math.round(progress * (PILLARS.length - 1)),
          PILLARS.length - 1
        );
        setActivePillar(index);
      },
    });
    return () => scrollTrigger.kill();
  }, []);

  return (
    <PinnedSection className="relative min-h-screen">
      <div className="absolute inset-0 bg-tint-white" />
      <div className="relative z-10 px-6 pt-20 pb-32 max-w-3xl mx-auto text-center">
        <Reveal className="mb-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Our Vision
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <h1
            ref={visionRef}
            className="font-serif text-5xl md:text-8xl font-bold leading-[1.05] tracking-tighter block"
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className={
                i === activePillar
                  ? "p-6 rounded-none border border-ink/10 bg-tint-white text-ink"
                  : "p-6 rounded-none border border-ink/10 text-ink/50"
              }
            >
              <h3 className="font-serif text-2xl font-bold text-brand-green mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {pillar.line}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs font-medium text-deep-green tracking-widest uppercase">
          A people established in grace &bull; manifesting sonship &bull;
          dominion &bull; Kingdom influence
        </p>
      </div>
    </PinnedSection>
  );
}

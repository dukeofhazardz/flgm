"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * TAKE YOUR NEXT STEP — "There is a place for you in the FLGM family."
 * Five large interactive tiles with hover reveals (arch masks).
 * Each links to its route.
 */

const TILES = [
  {
    id: "plan-visit",
    title: "Plan Your Visit",
    description:
      "Come and experience a community where God’s grace is celebrated.",
    href: "/contact",
    icon: "☐",
  },
  {
    id: "join-family",
    title: "Join Our Church Family",
    description:
      "Become part of a family committed to spiritual growth and Kingdom influence.",
    href: "/new-members",
    icon: "◐",
  },
  {
    id: "watch-online",
    title: "Watch and Worship Online",
    description:
      "Join us every morning for prayer, spiritual engagement, and the advancement of God’s Kingdom.",
    href: "/watch-and-pray",
    icon: "◑",
  },
  {
    id: "prayer-request",
    title: "Submit a Prayer Request",
    description: "Share your request with the church prayer or pastoral team.",
    href: "/prayer",
    icon: "◒",
  },
  {
    id: "get-involved",
    title: "Get Involved in Ministry",
    description:
      "There is an opportunity for you to serve in evangelism, discipleship, or outreach.",
    href: "/volunteer",
    icon: "◓",
  },
] as const;

export function NextStepSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-tile]");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });

    cards.forEach((card, i) => {
      tl.from(
        card,
        { opacity: 0, y: 30, duration: 0.5, ease: "ease-out" },
        i * 0.12
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-tint-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Take Your Next Step
          </h2>
          <p className="mt-4 text-base font-bold text-brand-green tracking-tight">
            There is a place for you in the FLGM family.
          </p>
        </Reveal>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILES.map((tile) => (
            <article
              key={tile.id}
              data-tile
              className="relative p-8 md:p-12 border border-ink/10 rounded-none bg-white transition-all duration-300 hover:border-brand-green/40"
            >
              <Magnetic strength={0.15}>
                <a
                  href={tile.href}
                  className="block h-full"
                >
                  <div className="absolute inset-0 bg-brand-green/5 group-hover:bg-brand-green/15 transition-colors duration-300" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block opacity-30 group-hover:opacity-60 transition-opacity">
                      {tile.icon}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-[1.1] mb-3">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-ink/60 leading-relaxed">
                      {tile.description}
                    </p>
                  </div>
                  <span className="absolute bottom-6 right-6 text-[10px] font-semibold text-brand-green/60 group-hover:text-brand-green transition-colors uppercase tracking-tighter">
                    open
                  </span>
                </a>
              </Magnetic>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

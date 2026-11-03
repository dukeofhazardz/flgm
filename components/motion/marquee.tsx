"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Marquee — a seamless horizontal ribbon whose skew tracks scroll velocity.
 *
 * The track holds two identical groups and animates xPercent -50. Scroll
 * velocity only drives `skewX` through gsap.quickTo, so nothing re-renders
 * React and nothing touches layout. Static under reduced motion. Paused while
 * off-screen; every timeline and trigger is reverted on unmount.
 */

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels per second. */
  speed?: number;
}

export function Marquee({
  children,
  className,
  speed = 70,
}: MarqueeProps): React.ReactElement {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = viewport.current;
    const ribbon = track.current;
    const first = group.current;
    if (!root || !ribbon || !first) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let loop: gsap.core.Tween | null = null;
    const skewTo = gsap.quickTo(ribbon, "skewX", {
      duration: 0.35,
      ease: "power2.out",
    });

    const build = () => {
      loop?.kill();
      const width = first.offsetWidth;
      if (!width) return;
      gsap.set(ribbon, { x: 0 });
      loop = gsap.to(ribbon, {
        x: -width,
        duration: width / speed,
        ease: "none",
        repeat: -1,
      });
    };

    build();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-7, 7, self.getVelocity() / -320);
          skewTo(skew);
        },
        onToggle: (self) => {
          if (self.isActive) loop?.play();
          else loop?.pause();
        },
      });
    }, root);

    const resize = new ResizeObserver(build);
    resize.observe(first);

    return () => {
      resize.disconnect();
      loop?.kill();
      ctx.revert();
      gsap.killTweensOf(ribbon);
    };
  }, [speed]);

  return (
    <div
      ref={viewport}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div
        ref={track}
        className="flex w-max items-center will-change-transform"
        aria-hidden="false"
      >
        <div ref={group} className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canUseRichMotion, TYPE_SKEW } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * VelocityType — display type leans with the speed of the scroll.
 *
 * Any element marked `data-velocity` gets a small skewY driven by scroll
 * velocity: fast scroll → a 2° lean, at rest → nothing. One ScrollTrigger for
 * the whole document, one quickTo setter per element, transform only. Elements
 * that stop being marked (route change) are released before the new ones are
 * gathered.
 *
 * Desktop only: on touch and under reduced motion it does nothing at all.
 */
export function VelocityType(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (!canUseRichMotion() || window.innerWidth < 1024) return undefined;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-velocity]")
    );
    if (!elements.length) return undefined;

    const setters = elements.map((el) => ({
      el,
      set: gsap.quickTo(el, "skewY", { duration: 0.45, ease: "power2.out" }),
    }));

    let restTimer = 0;
    const rest = () => {
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(() => {
        setters.forEach(({ set }) => set(0));
      }, 140);
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity() / -900;
        const skew = gsap.utils.clamp(-TYPE_SKEW, TYPE_SKEW, velocity);
        setters.forEach(({ set }) => set(skew));
        rest();
      },
    });

    return () => {
      window.clearTimeout(restTimer);
      trigger.kill();
      setters.forEach(({ el, set }) => {
        set(0);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "transform" });
      });
    };
  }, [pathname]);

  return null;
}

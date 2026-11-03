"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Pending } from "@/components/ui/pending";
import { LEADERSHIP_ROLES, LEADERSHIP_DIRECTORY_CONFIRMED } from "@/data/leadership";
import gsap from "gsap";

/**
 * Our Leadership — Chief Pastor and Church Executive Secretary role
 * descriptions exactly as written in content.md; ministry/departmental
 * structure as an animated org diagram; leadership directory grid in empty
 * state until names and photos are supplied (no invented names).
 */

export function LeadershipSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const items = el.querySelectorAll<HTMLElement>("[data-org-item]");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });

    items.forEach((item, i) => {
      tl.from(
        item,
        { opacity: 0, y: 20, duration: 0.5, ease: "ease-out" },
        i * 0.1,
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal className="mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Our Leadership
          </h2>
        </Reveal>

        {/* Chief Pastor & Executive Secretary */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {LEADERSHIP_ROLES.map((role) => (
            <div
              key={role.id}
              className="p-8 border border-ink/10 rounded-none bg-white"
            >
              <h3 className="font-serif text-xl font-bold text-ink mb-3">
                {role.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {role.description}
              </p>
              <Pending
                confirmed={false}
                label={`${role.title} name, biography, and photograph pending Chief Pastor approval`}
                className="mt-6"
              />
            </div>
          ))}
        </div>

        {/* Ministry & departmental structure — org diagram */}
        <div className="mb-16">
          <h3 className="font-serif text-xl font-bold text-ink mb-6">
            Ministry and Departmental Structure
          </h3>
          <div
            ref={containerRef}
            className="flex flex-wrap justify-center gap-4"
            data-org-container
          >
            {LEADERSHIP_ROLES.map((role) => (
              <div
                key={role.id}
                data-org-item
                className="px-6 py-3 border border-brand-green/30 bg-brand-green/5 rounded-none text-[12px] font-semibold text-ink uppercase tracking-wider whitespace-nowrap"
              >
                {role.title}
              </div>
            ))}
            {LEADERSHIP_ROLES.length > 0 && (
              <div
                className="px-6 py-3 border border-ink/10 bg-white rounded-none text-[12px] font-semibold text-ink/60 uppercase tracking-wider whitespace-nowrap"
              >
                Ministry and Departmental Coordination
              </div>
            )}
          </div>
        </div>

        {/* Leadership directory grid — empty state */}
        <div className="border border-ink/10 rounded-none p-8 md:p-12 bg-white">
          <Pending
            confirmed={LEADERSHIP_DIRECTORY_CONFIRMED}
            label="Leadership directory pending Chief Pastor approval"
            className="mb-6"
          />
          <h3 className="font-serif text-xl font-bold text-ink mb-4">
            Leadership Directory
          </h3>
          <p className="text-sm text-ink/60 mb-6">
            Approved names, photographs, titles, and responsibilities will be
            published here following review by the Chief Pastor.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-tint-white border border-ink/10 flex flex-col items-center justify-center p-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 mb-3 flex items-center justify-center">
                  <span className="text-[10px] text-brand-green/40 font-semibold uppercase">
                    TBC
                  </span>
                </div>
                <span className="text-[11px] text-ink/40 uppercase tracking-tighter">
                  Name &bull; Title
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

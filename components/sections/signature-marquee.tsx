import * as React from "react";
import { Marquee } from "@/components/motion/marquee";

const WORDS = ["Grace", "Eternal Life", "Sonship", "Kingdom Influence"];

/**
 * SignatureMarquee — the outlined creed under the hero.
 * Giant outlined serif, separated by green marks, skewed by scroll velocity.
 */

export function SignatureMarquee(): React.ReactElement {
  return (
    <section data-header-theme="light" className="relative overflow-hidden bg-white text-ink">
      <div className="h-px w-full bg-brand-green/30" />

      <div className="mx-auto flex max-w-[1680px] items-baseline justify-between gap-6 px-5 pb-2 pt-8 md:px-8 lg:px-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40">
          § 02
          <span className="mx-2 text-ink/20" aria-hidden="true">
            /
          </span>
          The language of grace
        </p>
      </div>

      <Marquee speed={64} className="pt-3 pb-6 md:pt-4 md:pb-9">
        {WORDS.map((word) => (
          <span key={word} className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14">
            <span className="type-outline-ink whitespace-nowrap font-serif text-[clamp(3.2rem,9.4vw,9rem)] font-medium leading-[0.9] tracking-[-0.045em]">
              {word}
            </span>
            <span
              aria-hidden="true"
              className="block h-2 w-2 shrink-0 rounded-full bg-brand-green"
            />
          </span>
        ))}
      </Marquee>

      <div className="h-px w-full bg-ink/10" />
    </section>
  );
}

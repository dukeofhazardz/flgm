"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { Pending } from "@/components/ui/pending";
import { ConceptLabel } from "@/components/ui/concept-label";

gsap.registerPlugin(SplitText);

/**
 * WELCOME MESSAGE — "Dearly Beloved," letter layout.
 * Arch-framed editorial column with a pull-quote, and a placeholder for the
 * pastor's signature/photo marked Pending. No names are invented.
 */

const WELCOME_BODY =
  "Welcome to Forever Life and Grace Mission, a place where the life of God is revealed, the grace of Jesus Christ is celebrated, and believers are established in their identity as sons of God. We are delighted to welcome you to our online home. Whether you are visiting for the first time, seeking spiritual understanding, desiring fellowship, or looking for a place to grow in faith, we are glad you are here. At FLGM, we believe that God’s grace is the foundation of our relationship with Him and that every believer has a divine purpose to fulfil. Our heart is to see you grow in spiritual understanding, experience the fullness of God’s life, and manifest His purpose in your everyday life. We invite you to worship with us, participate in our programmes, connect with our fellowship, and become part of a family committed to spiritual growth, evangelism, and Kingdom influence. Thank you for visiting. We look forward to welcoming you in person.";

const PULL_QUOTE =
  "We believe that every believer has a divine purpose and is called to manifest the life, wisdom, and character of God in every sphere of life.";

export function WelcomeSection(): React.ReactElement {
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return undefined;

    const split = new SplitText(el, { type: "words" });
    gsap.from(split.words, {
      opacity: 0,
      y: 12,
      duration: 0.5,
      ease: "ease-out",
      stagger: 0.02,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });
    return () => split.revert();
  }, []);

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 border-t border-ink/10">
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Arch frame — left side */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full bg-tint-white clip-path-[polygon(0_0,70%_0,80%_100%,0%_100%)] z-0"
        />
        <div className="relative z-10">
          <Reveal className="mb-6">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
              Welcome Message
            </h2>
          </Reveal>

          {/* "Dearly Beloved," — large salutation */}
          <div ref={colRef} className="max-w-lg mx-auto text-center md:text-left mb-10 relative z-10">
            <p className="font-serif text-4xl md:text-6xl font-bold text-deep-green leading-[1.05] italic">
              Dearly Beloved,
            </p>
          </div>

          <div className="prose-sm text-ink/70 leading-relaxed space-y-6">
            <p>{WELCOME_BODY}</p>
          </div>

          {/* Pull-quote */}
          <blockquote
            className="mt-12 border-l-4 border-brand-green pl-6 py-4 bg-tint-white"
          >
            <p className="font-serif text-xl md:text-2xl font-bold text-ink leading-relaxed">
              “{PULL_QUOTE}”
            </p>
            <p className="mt-2 text-xs font-semibold text-deep-green tracking-widest uppercase">
              Forever Life and Grace Mission
            </p>
          </blockquote>

          {/* Pastor signature/photo placeholder — Pending */}
          <div className="mt-16 flex items-center justify-between max-w-md mx-auto">
            <Pending
              confirmed={false}
              label="Pastor’s signature pending Chief Pastor approval"
              className="w-32 h-32 flex items-center justify-center border border-ink/20 rounded-none bg-tint-white"
            >
              <span className="text-[10px] text-ink/40 tracking-tight">
                Signature
              </span>
            </Pending>
            <Pending
              confirmed={false}
              label="Pastor’s photograph pending Chief Pastor approval"
              className="w-32 h-32 flex items-center justify-center border border-ink/20 rounded-none bg-tint-white"
            >
              <span className="text-[10px] text-ink/40 tracking-tight">
                Photograph
              </span>
            </Pending>
          </div>

          <p className="mt-10 text-xs font-medium text-deep-green tracking-widest uppercase">
            Forever Life and Grace Mission — We Get Better Every Day!
          </p>
        </div>
      </div>

      {/* Concept label for any architectural imagery that may be added later */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <ConceptLabel />
      </div>
    </section>
  );
}

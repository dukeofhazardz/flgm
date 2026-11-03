"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { ArchMask } from "@/components/ui/arch-mask";

/**
 * Who We Are — editorial layout.
 * Oversized arch mask with generative placeholder scene, pull-quote from
 * content.md. Copy comes only from content.md (lines 50–55).
 */

const WHO_WE_ARE_BODY =
  "Forever Life and Grace Mission (FLGM) is a Christ-centred ministry committed to the revelation of God’s grace, eternal life, sonship, spiritual growth, and Kingdom influence. We are a community of believers who recognise that the Christian life is founded on the finished work of Jesus Christ and the reality of God’s life in those who believe. Our ministry emphasises spiritual understanding, personal transformation, fellowship, discipleship, evangelism, and Kingdom influence. We believe every believer has a divine purpose and is called to manifest the life, wisdom, and character of God in every sphere of life.";

const PULL_QUOTE =
  "Every believer has a divine purpose and is called to manifest the life, wisdom, and character of God in every sphere of life.";

export function WhoWeAreSection(): React.ReactElement {
  return (
    <section className="bg-tint-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Editorial column — left */}
          <div className="md:col-span-7 lg:col-span-6">
            <Reveal className="mb-8">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
                Who We Are
              </h2>
            </Reveal>

            <div className="prose-sm text-ink/70 leading-relaxed space-y-6">
              <p>{WHO_WE_ARE_BODY}</p>
            </div>

            {/* Pull-quote */}
            <blockquote
              className="mt-16 border-l-4 border-brand-green pl-6 py-4 bg-white"
            >
              <p className="font-serif text-xl md:text-2xl font-bold text-ink leading-relaxed italic">
                “{PULL_QUOTE}”
              </p>
              <p className="mt-2 text-xs font-semibold text-deep-green tracking-widest uppercase">
                Forever Life and Grace Mission
              </p>
            </blockquote>
          </div>

          {/* Arch-framed placeholder — right */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col items-center justify-center">
            <ArchMask className="w-full max-w-[480px] h-[520px] md:h-[600px] mb-8 bg-tint-white">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  className="w-32 h-32 md:w-40 md:h-40 text-brand-green/30"
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
                  <circle cx="100" cy="70" r="14" className="fill-brand-green opacity-40" />
                </svg>
              </div>
            </ArchMask>
            <p className="text-xs font-semibold text-ink/50 tracking-widest uppercase text-center max-w-xs">
              Placeholder for approved photography — no images supplied yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

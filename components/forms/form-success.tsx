"use client";

import * as React from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * FormSuccess — the sun rises.
 *
 * Rendered only after the server confirms the email provider accepted the
 * submission. The arch window, grain, horizon, and rising sun carry the page's
 * signature motif; the copy stays plain and promises nothing the church has not
 * published.
 */

interface FormSuccessProps {
  title: string;
  body: string;
  onReset: () => void;
  resetLabel?: string;
  reference?: string;
}

export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel = "Send another",
  reference = "Received",
}: FormSuccessProps): React.ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative overflow-hidden bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 74% 28%, rgba(0,200,83,0.16) 0%, rgba(0,200,83,0.03) 44%, rgba(4,24,15,0) 74%)",
        }}
      />

      <div className="relative grid gap-8 p-6 md:grid-cols-12 md:gap-6 md:p-9 lg:p-10">
        <div className="md:col-span-7 md:flex md:flex-col md:justify-between">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-dawn-mint/70">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-ink">
                <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden="true" />
              </span>
              {reference}
            </p>

            <h3 className="mt-5 max-w-[12ch] font-serif text-[clamp(2.4rem,5.6vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.045em]">
              {title}
            </h3>
            <p className="mt-5 max-w-[44ch] font-sans text-[16px] leading-[1.62] text-white/65">
              {body}
            </p>
          </div>

          <div className="mt-8 border-t border-white/12 pt-5">
            <p className="max-w-[42ch] font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.16em] text-white/35">
              Sent to the church team. No further action is needed on this page.
            </p>
            <Button
              type="button"
              variant="outline-light"
              size="sm"
              onClick={onReset}
              className="mt-4 min-h-[44px]"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {resetLabel}
            </Button>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[290px] md:col-span-5 md:mx-0 md:ml-auto">
          <div
            className="relative aspect-[4/5] overflow-hidden bg-night"
            style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #04180F 0%, #062316 42%, #0B3B24 70%, #0B3B24 100%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[46%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,200,83,0) 0%, rgba(0,200,83,0.2) 48%, rgba(201,245,218,0.85) 100%)",
              }}
            />

            <div className="absolute bottom-[24%] left-1/2 h-32 w-32 -translate-x-1/2 md:h-36 md:w-36">
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="success-rays absolute -inset-14 h-[calc(100%+112px)] w-[calc(100%+112px)]"
              >
                <g stroke="#00C853" strokeWidth="0.7" opacity="0.5">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <line
                      key={index}
                      x1="100"
                      y1="18"
                      x2="100"
                      y2="34"
                      transform={`rotate(${index * 15} 100 100)`}
                    />
                  ))}
                </g>
              </svg>
              <span
                aria-hidden="true"
                className="success-sun absolute inset-0 rounded-full bg-brand-green"
                style={{
                  boxShadow:
                    "0 0 60px rgba(0,200,83,0.55), 0 0 140px rgba(0,200,83,0.28)",
                }}
              />
            </div>

            <span
              aria-hidden="true"
              className="success-horizon absolute inset-x-0 bottom-[24%] h-px bg-dawn-mint/80"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-4 bottom-[24%] h-10 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 100%, rgba(201,245,218,0.42) 0%, rgba(201,245,218,0) 70%)",
              }}
            />

            <div className="grain absolute inset-0" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-white/20"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            />
            <div className="absolute inset-x-0 top-5 flex items-start justify-between px-4 font-mono text-[7px] uppercase tracking-[0.18em] text-white/45">
              <span>Fig. 01</span>
              <span>Daybreak</span>
            </div>
            <div className="absolute inset-x-0 bottom-4 flex items-end justify-between px-4 font-mono text-[7px] uppercase tracking-[0.18em] text-ink/60">
              <span>Resurrection Ground</span>
              <span>WAT</span>
            </div>
          </div>
          <figcaption className="mt-3 text-right font-mono text-[8px] uppercase leading-[1.7] tracking-[0.16em] text-white/30">
            We get better every day.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GIVING } from "@/data/giving";

/**
 * AccountTicket — the official church account as a die-cut ticket.
 * Large type, a perforated stub, and one animated copy action. There is no
 * payment form: the account details are the whole transaction surface.
 */

type CopyState = "idle" | "copied" | "error";

export function AccountTicket(): React.ReactElement {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  async function copyAccount() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(GIVING.accountNumber);
      ok = true;
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = GIVING.accountNumber;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        ok = document.execCommand("copy");
        document.body.removeChild(area);
      } catch {
        ok = false;
      }
    }

    setState(ok ? "copied" : "error");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <section
      id="official-account"
      data-section="give-account"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 02 — The official account"
          note="The church’s supplied Moniepoint account"
          folio="No. 02 / 05"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[13ch] font-serif text-[clamp(2.7rem,6.6vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            One account. <span className="italic">One house.</span>
          </h2>
          <p className="col-span-12 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[16px]">
            Use these exact details in your banking app. All contributions are
            voluntary and made through officially approved church channels.
          </p>
        </div>

        {/* ── The ticket ── */}
        <div className="relative mt-10 md:mt-14">
          <div className="relative overflow-hidden border border-ink/15 bg-tint-white text-ink">
            <div
              className="ticket-notch left-[calc(66.666%-14px)] top-[-14px] hidden md:block"
              aria-hidden="true"
            />
            <div
              className="ticket-notch bottom-[-14px] left-[calc(66.666%-14px)] hidden md:block"
              aria-hidden="true"
            />

            <div className="grid md:grid-cols-3">
              {/* Main ticket */}
              <div className="relative p-6 md:col-span-2 md:p-9 lg:p-11">
                <div className="relative flex items-start justify-between gap-4">
                  <p className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-deep-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green live-dot" aria-hidden="true" />
                    Official church account
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45">
                    Serial 001
                  </p>
                </div>

                <p className="relative mt-7 font-serif text-[clamp(1.7rem,3.4vw,2.7rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                  {GIVING.accountName}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                  {GIVING.bank}
                  <span className="mx-2 text-ink/25" aria-hidden="true">
                    /
                  </span>
                  Account number
                </p>

                <div className="relative mt-5 border-y border-ink/12 py-5 md:py-7">
                  <p
                    className="select-all font-serif text-[clamp(2.55rem,6.7vw,5.1rem)] font-medium leading-[0.82] tracking-[0.1em] tabular-nums text-deep-green"
                    aria-label={`Account number ${GIVING.accountNumber}`}
                  >
                    {GIVING.accountNumber}
                  </p>
                </div>

                <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={copyAccount}
                    aria-live="polite"
                    className="group inline-flex min-h-[52px] items-center justify-between gap-4 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-dawn-mint active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2.5">
                      {state === "copied" ? (
                        <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                      )}
                      {state === "copied"
                        ? "Account number copied"
                        : state === "error"
                          ? "Select the number above"
                          : "Copy account number"}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/55">
                      {GIVING.accountNumber}
                    </span>
                  </button>
                  <p className="max-w-[30ch] font-mono text-[8px] uppercase leading-[1.7] tracking-[0.14em] text-ink/50">
                    No card details are collected on this website.
                  </p>
                </div>
              </div>

              {/* Stub */}
              <div className="relative border-t border-dashed border-ink/20 p-6 md:col-span-1 md:border-l md:border-t-0 md:p-8">
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">
                      Forever Life
                      <br />
                      and Grace Mission
                    </p>
                    <p className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium italic leading-[1.05] tracking-[-0.02em] text-ink/80">
                      Building for generations.
                    </p>
                  </div>

                  <div>
                    <div
                      aria-hidden="true"
                      className="flex h-12 items-end gap-[3px] opacity-40"
                    >
                      {[3, 7, 2, 9, 4, 8, 3, 6, 2, 7, 4, 9, 3, 5, 8, 2, 6, 4, 7, 3].map(
                        (height, index) => (
                          <span
                            key={index}
                            className="block w-[3px] bg-deep-green"
                            style={{ height: `${height * 6}px` }}
                          />
                        )
                      )}
                    </div>
                    <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                      Moniepoint MFB
                      <span className="mx-1.5 text-ink/20" aria-hidden="true">
                        /
                      </span>
                      Nigeria
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-ink/12 pt-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                      Approved channel
                    </p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                      Voluntary giving
                    </p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                      Church-supplied details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
            <p>Forever Life And Grace Mission · Moniepoint MFB · 6023762744</p>
            <p>Ticket 02 / 05</p>
          </div>
        </div>
      </div>
    </section>
  );
}

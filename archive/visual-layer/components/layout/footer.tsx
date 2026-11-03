"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, ExternalLink } from "lucide-react";
import { NAV_ITEMS } from "@/data/nav";
import { CHURCH } from "@/data/church";
import { CONTACT } from "@/data/contact";
import { GIVING } from "@/data/giving";
import { Button } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";

/**
 * Footer on every page.
 * Oversized tagline moment, address, tap-to-call numbers, social links
 * (YouTube hidden until confirmed), quick links, giving block with Moniepoint
 * details and copy button, policy links, copyright.
 */

function useCopyToClipboard(text: string) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, handleCopy };
}

export function Footer(): React.ReactElement {
  const { copied, handleCopy } = useCopyToClipboard(GIVING.accountNumber);

  return (
    <footer className="border-t border-ink/10 bg-white">
      {/* Oversized tagline typographic moment */}
      <div className="bg-tint-white border-b border-ink/5 py-20 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tight">
            {CHURCH.tagline}
          </h2>
          <p className="mt-6 text-lg text-deep-green/80 font-sans">
            {CHURCH.identityLine}
          </p>
        </div>
      </div>

      <div className="px-6 py-16 md:px-10 lg:px-16 md:grid md:grid-cols-4 md:gap-16">
        {/* Church identity */}
        <div className="md:col-span-2 lg:col-span-1">
          <Link href="/" className="font-serif text-2xl font-bold text-ink tracking-tight">
            {CHURCH.name}
          </Link>
          <p className="mt-4 text-sm text-ink/80 leading-relaxed">
            {CHURCH.address.replaceAll("\n", " ")}
          </p>
          <div className="mt-8 space-y-3">
            {CONTACT.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-ink hover:text-brand-red transition-colors"
              >
                <span className="w-4 h-4 text-brand-red" aria-hidden="true">☎</span>
                {phone}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xs font-semibold text-ink tracking-tight uppercase mb-6">
            Quick links
          </h3>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-sm text-ink/70 hover:text-brand-red transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xs font-semibold text-ink tracking-tight uppercase mb-6">
            Connect
          </h3>
          <ul className="space-y-3">
            {CONTACT.socials.map((social) => (
              <li key={social.platform}>
                <Pending confirmed={social.confirmed} label="Details coming soon">
                  <a
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-ink/70 hover:text-brand-red transition-colors"
                  >
                    {social.platform}
                    <ExternalLink className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  </a>
                </Pending>
              </li>
            ))}
          </ul>
        </div>

        {/* Giving */}
        <div>
          <h3 className="text-xs font-semibold text-ink tracking-tight uppercase mb-6">
            Give
          </h3>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>
              <span className="font-bold text-ink">{GIVING.accountName}</span>
            </li>
            <li>{GIVING.bank}</li>
            <li className="font-mono">{GIVING.accountNumber}</li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="red" size="sm" onClick={handleCopy}>
              {copied ? "Copied" : <Copy className="w-4 h-4" />}
            </Button>
            <span className="text-[11px] text-ink/50">
              Copy account number
            </span>
          </div>
          <Pending
            confirmed={!GIVING.secureGatewayPending}
            label="Online giving gateway pending church approval"
          >
            <p className="mt-3 text-[11px] text-blush-red-tint">
              Voluntary giving through officially approved church channels only.
            </p>
          </Pending>
        </div>
      </div>

      <div className="border-t border-ink/10 bg-tint-white px-6 py-10 md:px-10 lg:px-16">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="font-serif text-sm font-bold text-ink tracking-tight">
              {CHURCH.name}
            </p>
            <p className="text-[11px] text-ink/60">{CHURCH.tagline}</p>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-ink/50">
            <Link href="/privacy" className="hover:text-brand-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-red transition-colors">
              Terms of Use
            </Link>
            <Link href="/giving-policy" className="hover:text-brand-red transition-colors">
              Giving Policy
            </Link>
            <Link href="/safeguarding" className="hover:text-brand-red transition-colors">
              Safeguarding &amp; Confidentiality
            </Link>
          </div>
        </div>
        <p className="mt-8 text-[11px] text-ink/40 text-center">
          © 2026 {CHURCH.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

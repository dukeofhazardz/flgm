import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, DM_Mono } from "next/font/google";
import { Chrome } from "@/components/layout/chrome";
import Script from "next/script";
import { CHURCH } from "@/data/church";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import { CHURCH_JSON_LD } from "@/lib/structured-data";

const fraunces = Fraunces({
  variable: "--font-serif",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION = `${CHURCH.identityLine} ${CHURCH.tagline} A church in Gwarinpa, Abuja, Nigeria.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "religion",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The inline script below sets data-pre-seen before hydration, so the server
  // markup and client DOM intentionally differ on this attribute.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${dmMono.variable} antialiased`}
    >
      <body className="bg-white text-ink">
        <Script
          id="flgm-preloader-seen"
          strategy="beforeInteractive"
          // Runs before the curtain markup is parsed: if this session has
          // already seen the preloader, hide it so the first paint is the hero.
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("flgm:preloader:seen")==="1"){document.documentElement.setAttribute("data-pre-seen","1")}}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          // Static, church-supplied facts only — no visitor input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CHURCH_JSON_LD) }}
        />
        <noscript>
          <style>{`[data-pre-root]{display:none!important}`}</style>
        </noscript>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}

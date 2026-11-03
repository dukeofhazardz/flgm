import "./globals.css";
import { Fraunces, Hanken_Grotesk, DM_Mono } from "next/font/google";
import { Chrome } from "@/components/layout/chrome";
import Script from "next/script";

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

export const metadata = {
  title: "Forever Life and Grace Mission",
  description:
    "A House of Grace. A People of Purpose. We Get Better Every Day! — Resurrection Ground, Gwarinpa, Abuja, Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${dmMono.variable} antialiased`}
    >
      <body className="bg-night">
        <Script
          // Runs before the curtain markup is parsed: if this session has
          // already seen the preloader, hide it so the first paint is the hero.
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("flgm:preloader:seen")==="1"){document.documentElement.setAttribute("data-pre-seen","1")}}catch(e){}',
          }}
        />
        <noscript>
          <style>{`[data-pre-root]{display:none!important}`}</style>
        </noscript>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}

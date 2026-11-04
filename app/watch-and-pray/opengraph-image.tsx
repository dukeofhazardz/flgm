import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Watch and Pray — fifty mornings of prayer and outreach";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Watch and Pray · 2026",
    title: "Fifty Mornings of Prayer.",
    subtitle: "11 November — 30 December · 5:30 AM WAT · Gwarinpa, Abuja.",
  });
}

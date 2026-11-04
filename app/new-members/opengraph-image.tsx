import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "New Members at Forever Life and Grace Mission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "New Members",
    title: "Your Journey Begins.",
    subtitle: "A first visit, a returning faith, a church family.",
  });
}

import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "About Forever Life and Grace Mission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "About the house",
    title: "A People of Purpose.",
    subtitle: "The vision we carry, the convictions we hold, and the people we serve.",
  });
}

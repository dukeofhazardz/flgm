import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Events and Programmes at Forever Life and Grace Mission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Events & Programmes",
    title: "The Calendar Issue.",
    subtitle: "Conferences, celebrations, and the annual programme of the house.",
  });
}

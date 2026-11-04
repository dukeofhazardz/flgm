import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Volunteer with Forever Life and Grace Mission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Volunteer",
    title: "Join the Mission.",
    subtitle: "Reach lives. Build disciples. Serve with the house.",
  });
}

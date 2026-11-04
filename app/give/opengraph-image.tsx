import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Giving with grace — the Church Building Project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Online Giving",
    title: "Giving with Grace.",
    subtitle: "Building for generations in Gwarinpa, Abuja.",
  });
}

import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Contact and location — Resurrection Ground, Gwarinpa, Abuja";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Contact & Location",
    title: "Find Resurrection Ground.",
    subtitle: "Gwarinpa, Abuja · Three enquiry lines · Plan your visit.",
  });
}

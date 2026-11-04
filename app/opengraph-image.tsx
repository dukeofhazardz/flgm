import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Forever Life and Grace Mission — A House of Grace. A People of Purpose.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Welcome",
    title: "A House of Grace.",
    subtitle: "A People of Purpose. Resurrection Ground, Gwarinpa, Abuja.",
  });
}

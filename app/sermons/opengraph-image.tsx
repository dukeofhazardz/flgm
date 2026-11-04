import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Sermons and Messages — the teaching library";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Sermons & Messages",
    title: "The Teaching Library.",
    subtitle: "Grace, eternal life, sonship, and Kingdom influence.",
  });
}

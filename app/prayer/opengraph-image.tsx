import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Prayer and Counselling at Forever Life and Grace Mission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    kicker: "Prayer & Counselling",
    title: "We Are Here to Pray.",
    subtitle: "Confidential prayer requests and pastoral support.",
  });
}

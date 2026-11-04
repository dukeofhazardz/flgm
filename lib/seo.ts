import type { Metadata } from "next";
import { CHURCH } from "@/data/church";

/**
 * Canonical site origin.
 *
 * The production domain has not been confirmed yet (content.md §16), so the
 * Vercel preview origin is the placeholder. Set NEXT_PUBLIC_SITE_URL in the
 * hosting project to the live domain before launch — every canonical URL,
 * sitemap entry and Open Graph URL is derived from here.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flgm.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = CHURCH.name;

/** Absolute URL for a route, with the home route kept clean. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

interface PageMetadataInput {
  /** Short page title. The root layout template appends the church name. */
  title: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/about". */
  path: string;
  /** Use the title verbatim instead of the "%s — Church" template. */
  absoluteTitle?: boolean;
  /** Draft policy pages: keep them out of search indexes. */
  noIndex?: boolean;
}

/**
 * The single metadata builder for every public page: canonical URL, Open
 * Graph, Twitter card and an honest robots directive when a page is a draft.
 * The Open Graph image itself comes from the colocated `opengraph-image.tsx`,
 * which Next merges into these tags automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** The home page's own metadata, where the church name is the title. */
export function homeMetadata(description: string): Metadata {
  return pageMetadata({
    title: SITE_NAME,
    description,
    path: "/",
    absoluteTitle: true,
  });
}

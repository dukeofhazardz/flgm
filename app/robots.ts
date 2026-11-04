import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Draft policy pages are intentionally crawlable but noindexed at the page
 * level; the internal styleguide and the form API are disallowed outright.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

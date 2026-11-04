import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Public routes only. Draft policy pages are noindexed and therefore excluded,
 * as is the internal styleguide.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/watch-and-pray", priority: 0.9, changeFrequency: "weekly" },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" },
    { path: "/sermons", priority: 0.8, changeFrequency: "weekly" },
    { path: "/give", priority: 0.8, changeFrequency: "monthly" },
    { path: "/prayer", priority: 0.7, changeFrequency: "monthly" },
    { path: "/new-members", priority: 0.7, changeFrequency: "monthly" },
    { path: "/volunteer", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

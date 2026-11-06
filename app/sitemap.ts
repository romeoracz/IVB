import type { MetadataRoute } from "next";
import { allPages } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}/ro${path}`,
    lastModified,
    alternates: { languages: { ro: `${SITE_URL}/ro${path}`, en: `${SITE_URL}/en${path}` } },
  });
  return [entry(""), entry("/pagini"), ...allPages().map((p) => entry(`/${p.slug}`, p.modified))];
}

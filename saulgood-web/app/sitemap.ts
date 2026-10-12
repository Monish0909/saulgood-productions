import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const lastModified = new Date();

  const routes = [["", 1.0], ["/work", 0.9], ["/services", 0.9], ["/about", 0.8], ["/contact", 0.8]] as const;
  return routes.map(([path, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

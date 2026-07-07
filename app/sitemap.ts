import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://xiaro.com.au",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://xiaro.com.au/pricing",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    }
  ];
}

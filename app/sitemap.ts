import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/urls";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: getSiteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getSiteUrl("/patient"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
};

export default sitemap;

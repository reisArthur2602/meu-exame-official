import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/urls";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/patient"],
        disallow: ["/auth", "/exams", "/patient/", "/design-system"],
      },
    ],
    sitemap: getSiteUrl("/sitemap.xml"),
  };
};

export default robots;

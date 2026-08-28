import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tipificacao.atak.com.br/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

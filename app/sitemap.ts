import type { MetadataRoute } from "next";

// TODO(SEO): atualizar para o domínio definitivo quando disponível.
const SITE_URL = "https://g-echurrascodomicilio-ls8t.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

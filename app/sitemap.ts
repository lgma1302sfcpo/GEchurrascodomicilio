import type { MetadataRoute } from "next";

// TODO(SEO): atualizar para o domínio definitivo quando disponível.
const SITE_URL = "https://g-echurrascodomicilio-ls8t.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      // Date of a meaningful page update, not of each build or crawl.
      lastModified: "2026-09-26",
    },
  ];
}

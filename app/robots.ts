import type { MetadataRoute } from "next";

// TODO(SEO): atualizar para o domínio definitivo quando disponível.
const SITE_URL = "https://g-echurrascodomicilio-ls8t.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

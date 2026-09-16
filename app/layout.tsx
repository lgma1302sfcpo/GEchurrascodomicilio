import type { Metadata } from "next";
import "./globals.css";

// TODO(SEO): domínio de produção ainda não definido pelo cliente; usando o
// domínio provisório do Vercel. Trocar aqui e revisar canonical/OG/sitemap
// assim que houver um domínio próprio (ex: .com.br).
const SITE_URL = "https://g-echurrascodomicilio-ls8t.vercel.app";
const SITE_NAME = "G&E Churrasco a Domicílio";
const WHATSAPP_PHONE = "5513997302538";
const INSTAGRAM_URL = "https://instagram.com/gechurrascodomicilio";
const REGION_CITIES = ["Santos", "São Vicente", "Guarujá", "Cubatão", "Praia Grande", "Mongaguá", "Itanhaém", "Peruíbe", "Bertioga"];

const TITLE = "Churrasco a Domicílio para Festas e Eventos em Santos e Baixada Santista | G&E";
const DESCRIPTION =
  "Churrasco a domicílio para aniversários, casamentos, confraternizações e eventos corporativos em Santos e toda a Baixada Santista. Preparo na brasa no local do evento, equipe própria e orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "churrasco a domicílio",
    "churrasco a domicílio em Santos",
    "churrasco para festas",
    "churrasco para aniversário",
    "churrasco para casamento",
    "churrasco para confraternização",
    "churrasco para eventos corporativos",
    "churrasqueiro a domicílio",
    "serviço de churrasqueiro",
    "buffet de churrasco",
    "buffet de churrasco a domicílio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/event-night.png",
        width: 1200,
        height: 630,
        alt: "Evento com churrasco a domicílio da G&E em Santos e Baixada Santista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/event-night.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "SII1jti8IHylriOo-4P8p7GhAEpKTmNV7tONqQ8P43A",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CateringService",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-fire.png`,
    telephone: `+${WHATSAPP_PHONE}`,
    sameAs: [INSTAGRAM_URL],
    areaServed: REGION_CITIES.map((city) => ({ "@type": "City", name: city })),
    servesCuisine: "Churrasco brasileiro",
    // TODO(SEO): priceRange, endereço e horário de funcionamento só devem ser
    // adicionados aqui quando o cliente informar esses dados reais.
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como funciona o churrasco a domicílio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nossa equipe se desloca até o local do seu evento — casa, salão de festas ou condomínio — e prepara o churrasco na brasa, ao vivo, durante a festa.",
        },
      },
      {
        "@type": "Question",
        name: "Quais tipos de eventos vocês atendem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Atendemos aniversários, casamentos, confraternizações, eventos corporativos e festas particulares.",
        },
      },
      {
        "@type": "Question",
        name: "Quais regiões vocês atendem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Atendemos toda a Baixada Santista: ${REGION_CITIES.join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: "Como faço para solicitar um orçamento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chame a gente no WhatsApp contando a data, o local e o número aproximado de convidados do seu evento.",
        },
      },
    ],
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

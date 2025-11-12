import { Organization, WebSite, WithContext } from "schema-dts";

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SabaiFly",
    url: "https://www.sabaifly.com",
    logo: "https://www.sabaifly.com/img/hero-home.jpg",
    description:
      "Fast, clean flight search. Compare flights from multiple sources. Book with trusted partners. No hidden fees.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: [
        "English",
        "Chinese",
        "Japanese",
        "Korean",
        "German",
        "French",
        "Spanish",
        "Arabic",
        "Thai",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema({ locale }: { locale: string }) {
  const baseUrl = "https://www.sabaifly.com";
  const localePath = locale === "en" ? "" : `/${locale}`;

  // Use plain object for schema as schema-dts doesn't support all SearchAction properties
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SabaiFly",
    url: `${baseUrl}${localePath}`,
    description:
      "Compare flight prices from multiple sources. Fast search, clean results, trusted partners. No added fees.",
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}${localePath}/flights?from={from}&to={to}&depart={depart_date}`,
      },
      "query-input": [
        {
          "@type": "PropertyValueSpecification",
          valueName: "from",
          description: "Departure airport code",
        },
        {
          "@type": "PropertyValueSpecification",
          valueName: "to",
          description: "Arrival airport code",
        },
        {
          "@type": "PropertyValueSpecification",
          valueName: "depart_date",
          description: "Departure date",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
  locale,
}: {
  items: Array<{ name: string; url: string }>;
  locale: string;
}) {
  const baseUrl = "https://www.sabaifly.com";
  const localePath = locale === "en" ? "" : `/${locale}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${localePath}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Geo-targeting metadata for specific regions
export function GeoTargetingMeta({ locale }: { locale: string }) {
  const geoMapping: Record<string, { geo: string; region: string }> = {
    en: { geo: "GB,US,AU,CA,NZ", region: "global" },
    zh: { geo: "CN,HK,TW,SG", region: "Asia" },
    ja: { geo: "JP", region: "Asia" },
    ko: { geo: "KR", region: "Asia" },
    de: { geo: "DE,AT,CH", region: "Europe" },
    fr: { geo: "FR,BE,CH,CA", region: "Europe" },
    es: { geo: "ES,MX,AR,CO,CL", region: "Europe" },
    ar: { geo: "SA,AE,QA,KW,BH,OM", region: "Middle East" },
    th: { geo: "TH", region: "Asia" },
  };

  const geo = geoMapping[locale] || geoMapping["en"]!;

  return (
    <>
      <meta name="geo.region" content={geo.geo.split(",")[0] || ""} />
      <meta name="geo.placename" content={geo.region} />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
    </>
  );
}

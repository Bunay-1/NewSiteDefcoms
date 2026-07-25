import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Интерактивно SOC Демо и Симулатор на Кибератаки | DefComs",
  description: "Изпробвайте нашия интерактивен симулатор на кибератаки и вижте как автоматизираната SOC платформа на DefComs засича и блокира DDoS, Ransomware и Phishing заплахи в реално време.",
  keywords: "симулатор кибератаки, SOC демо, киберсигурност симулация, DDoS защита, Ransomware защита",
  openGraph: {
    title: "Интерактивно SOC Демо и Симулатор на Кибератаки | DefComs",
    description: "Тествайте как DefComs защитава вашите системи срещу DDoS, Ransomware и Phishing в реално време.",
    url: "https://defcoms.eu/demo",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  }
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Начало",
        "item": "https://defcoms.eu"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Демо",
        "item": "https://defcoms.eu/demo"
      }
    ]
  };

  const demoPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SOC Demo Simulator - DefComs",
    "description": "Интерактивно SOC Демо и Симулатор на Кибератаки за засичане и блокиране на DDoS, Ransomware и Phishing заплахи в реално време.",
    "url": "https://defcoms.eu/demo",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5",
    "creator": {
      "@type": "Organization",
      "name": "DefComs"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(demoPageJsonLd) }}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти и Спешна Помощ при Кибератаки | DefComs",
  description: "Свържете се с DefComs за денонощна помощ при киберинциденти, консултации за GDPR/NIS2 съответствие или запитване за нашите SOC и SIEM решения.",
  keywords: "контакти киберсигурност, спешна помощ кибератаки, DefComs телефон, съответствие NIS2 консултации",
  openGraph: {
    title: "Контакти и Спешна Помощ при Кибератаки | DefComs",
    description: "Денонощна поддръжка при киберинциденти и консултации за сигурност.",
    url: "https://defcoms.eu/contact",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  }
};

export default function ContactLayout({
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
        "name": "Контакти",
        "item": "https://defcoms.eu/contact"
      }
    ]
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Контакти и Спешна Помощ при Кибератаки | DefComs",
    "description": "Свържете се с DefComs за денонощна помощ при киберинциденти, консултации за GDPR/NIS2 съответствие или запитване за нашите SOC и SIEM решения.",
    "url": "https://defcoms.eu/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "DefComs",
      "telephone": "+359-886-088-668",
      "email": "info@defcoms.eu",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BG",
        "addressLocality": "Sofia"
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      {children}
    </>
  );
}

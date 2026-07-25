import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endpoint Protection - Защита на Крайни Точки и Работни Станции | DefComs",
  description: "Комплексно решение за защита на крайни точки (EDR) в България срещу Ransomware, малуер и сложни фишинг атаки за работни станции, сървъри и мобилни устройства.",
  keywords: "Endpoint Protection, EDR защита, анти-вирус, защита срещу ransomware, сигурност на крайни точки, EDR България, защита на компютри",
  alternates: {
    canonical: "https://defcoms.eu/products/endpoint-protection",
  },
  openGraph: {
    title: "Endpoint Protection - Защита на Крайни Точки и Работни Станции | DefComs",
    description: "Комплексно решение за защита на крайни точки (EDR) в България срещу Ransomware, малуер и сложни фишинг атаки за работни станции, сървъри и мобилни устройства.",
    url: "https://defcoms.eu/products/endpoint-protection",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://defcoms.eu/Persevs/perservs.webp",
        width: 1200,
        height: 630,
        alt: "Persevs Security System Endpoint Protection",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endpoint Protection - Защита на Крайни Точки и Работни Станции | DefComs",
    description: "Комплексно решение за защита на крайни точки (EDR) в България срещу Ransomware, малуер и сложни фишинг атаки за работни станции, сървъри и мобилни устройства.",
  },
};

export default function EndpointProtectionPage() {
  const faqs = [
    {
      question: "Какво е Endpoint Protection?",
      answer: "Нашето решение за защита на крайни точки предоставя комплексна защита срещу малуер, ransomware и други заплахи за всички устройства във вашата организация - лаптопи, десктопи, сървъри и мобилни устройства."
    },
    {
      question: "Какви са основните функции?",
      answer: "Основните функции включват: real-time анти-вирус защита, anti-ransomware технологии, поведенчески анализ, firewall, device control и автоматични обновления на сигурността."
    },
    {
      question: "Поддържа ли се дистанционно управление?",
      answer: "Да, предоставяме централизирана конзола за управление на всички крайни точки, възможност за remote remediation, scheduled scans и детайлни отчети за състоянието на защитата."
    },
    {
      question: "Какви са системните изисквания?",
      answer: "Поддържаме Windows 10/11, macOS 10.15+, Linux (Ubuntu, CentOS, RHEL) и mobile устройства (iOS 12+, Android 8+). Минимум 4GB RAM и 2GB дисково пространство."
    },
    {
      question: "Как се интегрира със съществуващата инфраструктура?",
      answer: "Интегрира се с Active Directory, SCCM, Intune и други MDM решения. Поддържа и интеграция със SIEM системи за централизиран мониторинг на събитията."
    }
  ];

  const galleryImages = [
    { title: "Persevs Security System", description: "Интерфейс на платформата Persevs за цялостна сигурност", src: "/Persevs/perservs.webp" },
    { title: "User Signup Page", description: "Интуитивен и защитен вход в системата", src: "/Persevs/02_Signup_Page_persevs.webp" },
    { title: "Security Reports Dashboard", description: "Подробни анализи на състоянието и защитата в реално време", src: "/Persevs/04_Reports_Page_Persevs.webp" }
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Endpoint Protection",
    "image": "https://defcoms.eu/Persevs/perservs.webp",
    "description": "Комплексно решение за защита на крайни точки (EDR) срещу Ransomware, малуер и сложни фишинг атаки.",
    "brand": {
      "@type": "Brand",
      "name": "DefComs"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "299",
      "highPrice": "2999",
      "offerCount": "3"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

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
        "name": "Продукти",
        "item": "https://defcoms.eu/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Endpoint Protection",
        "item": "https://defcoms.eu/products/endpoint-protection"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/products" className="text-[#0098b2] hover:underline">
            ← Назад към продуктите
          </Link>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0098b2] rounded-2xl mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Endpoint Protection</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Комплексна защита на крайни точки срещу малуер, ransomware и съвременни кибер заплахи
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Анти-вирус", desc: "Real-time защита срещу малуер" },
            { title: "Anti-ransomware", desc: "Защита срещу ransomware атаки" },
            { title: "Firewall", desc: "Вграден firewall за всяко устройство" },
            { title: "Device Control", desc: "Контрол на USB и други устройства" }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <CheckCircle className="w-8 h-8 text-[#0098b2] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Галерия</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-[#0098b2]/50 transition duration-300 transform hover:scale-[1.02]">
                <div className="aspect-video relative bg-slate-900">
                  <Image
                    src={image.src}
                    alt={`${image.title} - DefComs EDR Защита на Крайни Точки`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                  <p className="text-gray-400 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Често задавани въпроси</h2>
          <FaqAccordion items={faqs} colorTheme="blue" />
        </div>

        <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Готови сте да защитите устройствата си?
          </h2>
          <p className="text-white/80 mb-6">
            Свържете се с нас за демо или безплатна консултация
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#0098b2] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 mx-auto">
              Свържете се с нас
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

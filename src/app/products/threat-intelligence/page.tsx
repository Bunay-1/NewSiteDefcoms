import { Radar, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Threat Intelligence - Разузнаване за Киберзаплахи | DefComs",
  description: "Разузнаване и анализ на глобални киберзаплахи в реално време в България. Идентифициране на индикатори за компрометация (IOCs) и техники на атакуващите (MITRE ATT&CK).",
  keywords: "Threat Intelligence, разузнаване заплахи, IOCs, MITRE ATT&CK, киберразузнаване, киберразузнаване България, заплахи киберсигурност",
  alternates: {
    canonical: "https://defcoms.eu/products/threat-intelligence",
  },
  openGraph: {
    title: "Threat Intelligence - Разузнаване за Киберзаплахи | DefComs",
    description: "Разузнаване и анализ на глобални киберзаплахи в реално време в България. Идентифициране на индикатори за компрометация (IOCs) и техники на атакуващите (MITRE ATT&CK).",
    url: "https://defcoms.eu/products/threat-intelligence",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "https://defcoms.eu/SocNoc/Threats.webp",
        width: 1200,
        height: 630,
        alt: "Threat Intelligence Detection & Analysis",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threat Intelligence - Разузнаване за Киберзаплахи | DefComs",
    description: "Разузнаване и анализ на глобални киберзаплахи в реално време в България. Идентифициране на индикатори за компрометация (IOCs) и техники на атакуващите (MITRE ATT&CK).",
  },
};

export default function ThreatIntelligencePage() {
  const faqs = [
    {
      question: "Какво е Threat Intelligence?",
      answer: "Threat Intelligence е нашата платформа за разузнаване на заплахи, която събира, анализира и разпространява информация за актуални кибер заплахи. Предоставя контекст за индикатори на компрометация (IOCs), TTPs на атакуващите и прогнози за бъдещи заплахи."
    },
    {
      question: "Какви източници на данни използва?",
      answer: "Използваме комбинация от източници: open-source intelligence (OSINT), commercial threat feeds, government CERT advisories, dark web monitoring, honeypot мрежи и данни от нашата SOC платформа."
    },
    {
      question: "Как се интегрира със съществуващите системи?",
      answer: "Платформата поддържа интеграции с SIEM системи (Splunk, IBM QRadar), firewall-и (Palo Alto, Cisco), EDR решения и SOC платформи чрез STIX/TAXII протоколи и REST API."
    },
    {
      question: "Какви са възможностите за анализ?",
      answer: "Предлагаме автоматизирана корелация на IOCs, анализ на TTPs (Tactics, Techniques, Procedures), mapping към MITRE ATT&CK framework, геолокация на заплахи и прогнозен анализ на риска."
    },
    {
      question: "Как се осигурява актуалност на данните?",
      answer: "Данните се обновяват в реално време от множество източници. Нашата ML система автоматично приоритизира новите заплахи според тяхната релевантност за вашата индустрия и географска локация."
    }
  ];

  const galleryImages = [
    { title: "Threat Detection & Analysis", description: "Интелигентно откриване на сложни вектори на атака в реално време", src: "/SocNoc/Threats.webp" },
    { title: "Global Threat Map", description: "Глобална карта и разположение на заплахите по света", src: "/SocNoc/interface_global_threat_dashboard.webp" },
    { title: "Threat Hunting Console", description: "Управление и проактивно преследване на заплахи", src: "/LANProject/03_threat-hunting.webp" }
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Threat Intelligence",
    "image": "https://defcoms.eu/SocNoc/Threats.webp",
    "description": "Разузнаване и анализ на глобални киберзаплахи в реално време. Идентифициране на индикатори за компрометация (IOCs).",
    "brand": {
      "@type": "Brand",
      "name": "DefComs"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "399",
      "highPrice": "3999",
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
        "name": "Threat Intelligence",
        "item": "https://defcoms.eu/products/threat-intelligence"
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
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-[#0098b2] hover:underline">
            ← Назад към продуктите
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0098b2] rounded-2xl mb-6">
            <Radar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Threat Intelligence</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Разузнаване на заплахи с реално време, контекстуален анализ и интеграция с вашата SOC платформа
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Реално Време", desc: "Непрекъснато обновяване на данни" },
            { title: "Множество Източници", desc: "OSINT, commercial, dark web" },
            { title: "MITRE ATT&CK", desc: "Mapping към стандартни TTPs" },
            { title: "SIEM Интеграция", desc: "Автоматизирано разпространение" }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <CheckCircle className="w-8 h-8 text-[#0098b2] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Галерия</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-[#0098b2]/50 transition duration-300 transform hover:scale-[1.02]">
                <div className="aspect-video relative">
                  <Image
                    src={image.src}
                    alt={`${image.title} - DefComs Разузнаване за Заплахи`}
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

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Често задавани въпроси</h2>
          <FaqAccordion items={faqs} colorTheme="blue" />
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Готови сте да бъдете крачка пред заплахите?
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

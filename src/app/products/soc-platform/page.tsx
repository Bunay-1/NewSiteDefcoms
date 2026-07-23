import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOC Платформа - 24/7 Мониторинг на Киберзаплахи | DefComs",
  description: "Централизирана SOC платформа за проактивно засичане, мониторинг и управление на инциденти в реално време с AI-базиран анализ и 24/7 защита на вашата инфраструктура.",
  keywords: "SOC Платформа, център за сигурност, 24/7 кибер мониторинг, автоматизиран отговор на инциденти",
};

export default function SOCPlatformPage() {
  const faqs = [
    {
      question: "Какво е SOC Platform?",
      answer: "SOC Platform е наша централизирана платформа за мониторинг и управление на инциденти в реално време. Тя предоставя 24/7 наблюдение на вашата IT инфраструктура с AI-базирано откриване на заплахи и автоматизиран отговор на инциденти."
    },
    {
      question: "Какви са основните функции?",
      answer: "Основните функции включват: непрекъснат мониторинг, AI-базирано откриване на аномалии, автоматизиран триаж на аларми, интеграция с SIEM системи, мобилно приложение за нотификации и детайлни отчети за инциденти."
    },
    {
      question: "Как се интегрира със съществуващи системи?",
      answer: "Платформата поддържа интеграции с водещие SIEM решения (Splunk, IBM QRadar, LogRhythm), firewall устройства, endpoint protection системи и cloud платформи чрез REST API и стандартни протоколи."
    },
    {
      question: "Какви са изискванията за внедряване?",
      answer: "Минималните изисквания включват: Linux или Windows сървър с 8GB RAM, 100GB дисково пространство и стабилна интернет връзка. Предлагаме и cloud-based решение без нужда от локална инфраструктура."
    },
    {
      question: "Как се осигурява съответствие с GDPR?",
      answer: "Платформата криптира всички данни в покой и в движение, поддържа детайлни логове за достъп, предоставя функции за псевдонимизация на IP адреси и включва механизми за изтриване на данни по заявка."
    }
  ];

  const galleryImages = [
    { title: "Dashboard", description: "Централен dashboard за мониторинг на всички системи", src: "/SocNoc/Dashboard.webp" },
    { title: "Unified Operations Center", description: "Обединен център за операции", src: "/SocNoc/UNIFIED OPERATIONS CENTER.webp" },
    { title: "SIEM Integration", description: "Интеграция със SIEM системи", src: "/SocNoc/SIEM.webp" },
    { title: "Threat Detection", description: "Откриване на заплахи", src: "/SocNoc/Threats.webp" },
    { title: "Incident Management", description: "Управление на инциденти", src: "/SocNoc/incident.webp" },
    { title: "Alert Enrichment", description: "Обогатяване на аларми", src: "/SocNoc/alert_enrichment.webp" },
    { title: "NOC Dashboard", description: "Network Operations Center", src: "/SocNoc/noc.webp" },
    { title: "Global Threat Dashboard", description: "Глобален dashboard за заплахи", src: "/SocNoc/interface_global_threat_dashboard.webp" },
    { title: "Indicators", description: "Индикатори за компрометация", src: "/SocNoc/indicator.webp" }
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SOC Platform",
    "image": "https://defcoms.eu/SocNoc/Dashboard.webp",
    "description": "Централизирана платформа за мониторинг и управление на инциденти в реално време с AI-базирано откриване на заплахи.",
    "brand": {
      "@type": "Brand",
      "name": "DefComs"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "499",
      "highPrice": "4999",
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
        "name": "SOC Platform",
        "item": "https://defcoms.eu/products/soc-platform"
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">SOC Platform</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Централизирана платформа за мониторинг и управление на инциденти в реално време с AI-базирано откриване на заплахи
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "24/7 Мониторинг", desc: "Непрекъснато наблюдение на всички системи" },
            { title: "AI Откриване", desc: "Изкуствен интелект за разпознаване на заплахи" },
            { title: "Автоматизиран Отговор", desc: "Бърза реакция без човешка намеса" },
            { title: "SIEM Интеграция", desc: "Съвместимост с водещи SIEM решения" }
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
                    alt={image.title}
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
            Готови сте да подобрите киберсигурността си?
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

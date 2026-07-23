import { Eye, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIEM Solution - Управление на Логове и Корелация на Събития | DefComs",
  description: "Система за управление на информация и събития за сигурността (SIEM) с интелигентна корелация на логове и събития в реално време за разпознаване на аномалии.",
  keywords: "SIEM решения, управление на логове, корелация на събития за сигурност, засичане на аномалии",
};

export default function SIEMPage() {
  const faqs = [
    {
      question: "Какво е SIEM Solution?",
      answer: "SIEM (Security Information and Event Management) е нашето решение за събиране, анализ и корелация на логове и събития от цялата IT инфраструктура за откриване на аномалии и заплахи."
    },
    {
      question: "Какви източници на данни поддържа?",
      answer: "Поддържаме широк спектър от източници: Windows/Linux сървъри, мрежови устройства (Cisco, Juniper), firewall-и, endpoint protection, cloud платформи (AWS, Azure, GCP) и IoT устройства."
    },
    {
      question: "Как работи корелацията на събития?",
      answer: "Нашата система използва ML алгоритми за корелация на събития в реално време, разпознаване на атаки в няколко етапа и автоматично генериране на аларми при откриване на подозрителни модели."
    },
    {
      question: "Какви са възможностите за отчети?",
      answer: "Предлагаме готови шаблони за отчети (GDPR, ISO 27001), възможност за custom отчети, scheduled автоматични отчети и export в различни формати (PDF, CSV, JSON)."
    },
    {
      question: "Как се осигурява мащабируемост?",
      answer: "Архитектурата ни е хоризонтално мащабируема. Може да се разширява чрез добавяне на нови ноди за събиране и обработка на данни, поддържайки милиони събития на ден."
    }
  ];

  const galleryImages = [
    { title: "SIEM Dashboard", description: "Централизирано събиране на логове", src: "/SocNoc/SIEM.webp" },
    { title: "Threat Detection", description: "Откриване на заплахи", src: "/SocNoc/Threats.webp" },
    { title: "Alert Enrichment", description: "Обогатяване на аларми", src: "/SocNoc/alert_enrichment.webp" },
    { title: "Incident Response", description: "Управление на инциденти", src: "/SocNoc/incident.webp" },
    { title: "Indicators", description: "Индикатори за компрометация", src: "/SocNoc/indicator.webp" },
    { title: "Global Dashboard", description: "Глобален dashboard", src: "/SocNoc/interface_global_threat_dashboard.webp" }
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SIEM Solution",
    "image": "https://defcoms.eu/SocNoc/SIEM.webp",
    "description": "Система за управление на информация и събития за сигурността с ML-базирана корелация и анализ на събития.",
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
        "name": "SIEM Solution",
        "item": "https://defcoms.eu/products/siem"
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f22020] rounded-2xl mb-6">
            <Eye className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">SIEM Solution</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Система за управление на информация и събития за сигурността с ML-базирана корелация и анализ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Събиране на Логове", desc: "Централизирано събиране от всички източници" },
            { title: "Корелация", desc: "ML-базирана корелация на събития" },
            { title: "Откриване", desc: "Автоматично откриване на аномалии" },
            { title: "Отчети", desc: "Детайлни отчети и анализи" }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <CheckCircle className="w-8 h-8 text-[#f22020] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Галерия</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-[#f22020]/50 transition duration-300 transform hover:scale-[1.02]">
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

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Често задавани въпроси</h2>
          <FaqAccordion items={faqs} colorTheme="red" />
        </div>

        <div className="bg-gradient-to-r from-[#f22020] to-red-700 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Готови сте за пълна видимост на вашата сигурност?
          </h2>
          <p className="text-white/80 mb-6">
            Свържете се с нас за демо или безплатна консултация
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#f22020] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 mx-auto">
              Свържете се с нас
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

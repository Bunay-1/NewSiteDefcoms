import PhishingTrainer from "@/components/PhishingTrainer";
import { Mail, HelpCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Фишинг Тренажор - Интерактивна Игра за Разпознаване на Измами | DefComs",
  description: "Изпробвайте своята бдителност в България с нашия безплатен интерактивен фишинг тренажор. Научете се да разпознавате опасни имейли, проектирани за кражба на данни.",
  keywords: "фишинг тренажор, разпознаване на фишинг, фишинг игра, обучение за сигурност, фишинг симулация, обучение служители България, фишинг симулации София",
  alternates: {
    canonical: "https://defcoms.eu/tools/phishing-trainer",
  },
  openGraph: {
    title: "Фишинг Тренажор - Интерактивна Игра за Разпознаване на Измами | DefComs",
    description: "Изпробвайте своята бдителност в България с нашия безплатен интерактивен фишинг тренажор. Научете се да разпознавате опасни имейли, проектирани за кражба на данни.",
    url: "https://defcoms.eu/tools/phishing-trainer",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Фишинг Тренажор - Интерактивна Игра за Разпознаване на Измами | DefComs",
    description: "Изпробвайте своята бдителност в България с нашия безплатен интерактивен фишинг тренажор. Научете се да разпознавате опасни имейли, проектирани за кражба на данни.",
  },
};

export default function PhishingPage() {
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
        "name": "Инструменти",
        "item": "https://defcoms.eu/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Фишинг тренажор",
        "item": "https://defcoms.eu/tools/phishing-trainer"
      }
    ]
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Фишинг Тренажор - Интерактивна Игра за Разпознаване на Измами | DefComs",
    "description": "Изпробвайте своята бдителност с нашия безплатен интерактивен фишинг тренажор.",
    "url": "https://defcoms.eu/tools/phishing-trainer",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5",
    "creator": {
      "@type": "Organization",
      "name": "DefComs"
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-4 h-4" />
            Мини-Игра и Тренажор
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Тренажор „Разпознай Фишинг Имейл“
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Изпробвайте своята бдителност в нашата симулационна пощенска кутия. Разпознайте истинските имейли от опасния фишинг, проектиран да открадне фирмените ви данни.
          </p>
        </div>

        {/* Game UI component */}
        <PhishingTrainer />

        {/* Explanatory notes below */}
        <div className="mt-16 bg-slate-900/40 p-8 border border-slate-800 rounded-2xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <h4 className="text-white font-bold mb-2">1. Проверете домейна</h4>
            <p className="text-xs leading-relaxed">
              Фишърите често използват подвеждащи домейни (напр. microsoft-security-alert.com). Винаги гледайте какво пише след символа @.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">2. Следете за спешност</h4>
            <p className="text-xs leading-relaxed">
              Заплахи с блокиране на карти, глоби от институции и крайни срокове в рамките на часове са класически манипулативен прийом.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">3. Пазете се от линкове</h4>
            <p className="text-xs leading-relaxed">
              Не натискайте директни линкове за плащане или въвеждане на банкови и служебни пароли в съмнително изглеждащи имейли.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-950/40 to-slate-900 p-10 rounded-2xl text-center border border-red-500/30 shadow-lg shadow-red-500/5 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Желаете ли организиране на мащабна фишинг симулация за вашите служители?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            В DefComs можем да създадем напълно автоматизирани, реалистични фишинг сценарии, персонализирани за вашия бизнес, за да обучим служителите ви и драстично да намалим риска от пробив.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="mx-auto">
              <button className="w-full sm:w-auto bg-[#f22020] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition duration-150 flex items-center justify-center gap-2 mx-auto">
                Заявете Фишинг Симулация
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

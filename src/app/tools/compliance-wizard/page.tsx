import ComplianceWizard from "@/components/ComplianceWizard";
import { ShieldAlert, Sparkles, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Интерактивен NIS2 & DORA Калкулатор за Съответствие | DefComs",
  description: "Оценете дали вашата организация попада под обхвата на новите европейски директиви NIS2 и DORA. Попълнете бързия въпросник и получете списък с мерки.",
  keywords: "NIS2 калкулатор, DORA съответствие, оценка на риска, европейски регулации, киберсигурност закони, одит NIS2 България, DORA регламент банки",
  alternates: {
    canonical: "https://defcoms.eu/tools/compliance-wizard",
  },
  openGraph: {
    title: "Интерактивен NIS2 & DORA Калкулатор за Съответствие | DefComs",
    description: "Оценете дали вашата организация попада под обхвата на новите европейски директиви NIS2 и DORA. Попълнете бързия въпросник и получете списък с мерки.",
    url: "https://defcoms.eu/tools/compliance-wizard",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Интерактивен NIS2 & DORA Калкулатор за Съответствие | DefComs",
    description: "Оценете дали вашата организация попада под обхвата на новите европейски директиви NIS2 и DORA. Попълнете бързия въпросник и получете списък с мерки.",
  },
};

export default function ComplianceWizardPage() {
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
        "name": "NIS2 & DORA Калкулатор",
        "item": "https://defcoms.eu/tools/compliance-wizard"
      }
    ]
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NIS2 & DORA Калкулатор за Съответствие | DefComs",
    "description": "Интерактивен тест за оценка на съответствието с NIS2, DORA и GDPR директивите в ЕС.",
    "url": "https://defcoms.eu/tools/compliance-wizard",
    "applicationCategory": "BusinessApplication",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            Инструмент за съответствие
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Калкулатор за NIS2 и DORA съответствие
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Бърз и лесен самоанализ, който ще ви помогне да разберете дали вашата организация е задължена да спазва новите европейски изисквания за киберсигурност.
          </p>
        </div>

        {/* Wizard Component */}
        <ComplianceWizard />

        {/* Informative Grid */}
        <div className="mt-16 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0098b2]" />
            Повече за Директивите
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-base">Какво е NIS2?</h3>
              <p>
                Директивата <strong className="text-white">NIS2 (Network and Information Security Directive)</strong> влезе в сила в края на 2024 г. Тя цели повишаване на киберустойчивостта в целия Европейски съюз. Директивата разширява обхвата на задължените сектори и въвежда лична отговорност за мениджмънта на фирмите при сериозни киберинциденти.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#0098b2] font-bold text-base">Какво е DORA?</h3>
              <p>
                <strong className="text-white">DORA (Digital Operational Resilience Act)</strong> е специфичен регламент за финансовия сектор на ЕС. Той изисква от банки, застрахователни дружества, финтех дружества и техните критични ИТ партньори да гарантират, че техните цифрови операции могат да издържат на сериозни смущения и атаки.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

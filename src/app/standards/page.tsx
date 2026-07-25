import { Shield, BookOpen, AlertTriangle, Activity, Award, Zap, Lock, Server, Code, FileText, Globe, Cpu, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стандарти и Рамки за Киберсигурност | DefComs",
  description: "Изчерпателен справочник на международните и европейски стандарти за киберсигурност: GDPR, NIS2, DORA, CRA, ISO 27001, NIST, CIS, OWASP, SOC и др.",
  keywords: "киберсигурност, стандарти киберсигурност, GDPR, NIS2, DORA, Cyber Resilience Act, ISO 27001, NIST, CIS Controls, OWASP, SOC 2, киберразузнаване",
  alternates: {
    canonical: "https://defcoms.eu/standards",
  },
  openGraph: {
    title: "Стандарти и Рамки за Киберсигурност | DefComs",
    description: "Изчерпателен справочник на международните и европейски стандарти за киберсигурност: GDPR, NIS2, DORA, CRA, ISO 27001, NIST, CIS, OWASP, SOC и др.",
    url: "https://defcoms.eu/standards",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Стандарти и Рамки за Киберсигурност | DefComs",
    description: "Изчерпателен справочник на международните и европейски стандарти за киберсигурност: GDPR, NIS2, DORA, CRA, ISO 27001, NIST, CIS, OWASP, SOC и др.",
  },
};

export default function StandardsPage() {
  const categories = [
    { icon: "🇪🇺", name: "Европейски регулации и директиви", desc: "Задължителни изисквания за съответствие, наложени от ЕС (GDPR, NIS2, DORA, CRA, AI Act)." },
    { icon: "📘", name: "ISO/IEC стандарти", desc: "Международни стандарти за изграждане на Системи за управление на информационната сигурност (ISMS/PIMS)." },
    { icon: "🏷️", name: "NIST рамки и публикации", desc: "Рамки за управление на кибер риска и детайлни технически контроли (NIST CSF, SP 800-53)." },
    { icon: "🛡️", name: "CIS (Center for Internet Security)", desc: "Практически приоритизирани контроли и препоръчителни сигурностни конфигурации." },
    { icon: "🕸️", name: "OWASP (Open Web Application Security Project)", desc: "Стандарти за тестване и сигурност на уеб, мобилни и API софтуерни приложения." },
    { icon: "🧾", name: "Одит, съответствие и киберразузнаване", desc: "Стандарти за сигурен одит и структури за споделяне на заплахи (SOC, PCI DSS, MITRE ATT&CK, CVE)." },
    { icon: "🏥", name: "Секторни регулации (САЩ)", desc: "Специфични изисквания за здравеопазване, образование и федерални системи (HIPAA, FISMA)." },
    { icon: "🏛️", name: "Национални рамки", desc: "Национални закони за киберсигурност, превеждащи европейските директиви на местно ниво." }
  ];

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
        "name": "Стандарти",
        "item": "https://defcoms.eu/standards"
      }
    ]
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Стандарти и Рамки за Киберсигурност | DefComs",
    "description": "Изчерпателен и интерактивен справочник за водещите регулации, стандарти и стандартизирани процеси за сигурност.",
    "url": "https://defcoms.eu/standards"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20 font-sans text-gray-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Page Title & Intro */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Стандарти и Рамки за <span className="text-[#0098b2]">Киберсигурност</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Изчерпателен справочник на международните и европейски стандарти, регулаторни рамки и контроли за информационна сигурност, които гарантират оперативна устойчивост и правно съответствие.
          </p>
        </div>

        {/* Categories Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 hover:border-[#0098b2]/40 hover:bg-slate-800/60 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-4 block">{cat.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 1. European Regulations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🇪🇺</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              1. Европейски регулации и директиви
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🇪🇺 GDPR (EU 2016/679)",
                    desc: "Регламент за защита на личните данни на физически лица в ЕС.",
                    app: "Всички организации, обработващи лични данни на граждани на ЕС.",
                    links: [
                      { text: "🇪🇺 ePrivacy Directive", url: "https://eur-lex.europa.eu/eli/dir/2002/58/oj" },
                      { text: "🇪🇺 eIDAS", url: "https://eur-lex.europa.eu/eli/reg/2014/910/oj" },
                      { text: "🇪🇺 Data Act", url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj" },
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 NIS Directive (2016/1148)",
                    desc: "Първата директива на ЕС за мрежова и информационна сигурност; заменена от NIS2.",
                    app: "Оператори на съществени услуги и доставчици на цифрови услуги (историческа версия).",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 CER Directive", url: "https://eur-lex.europa.eu/eli/dir/2022/2557/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 NIS2 Directive (EU 2022/2555)",
                    desc: "Разширена рамка за киберсигурност с по-строги изисквания за управление на риска и докладване на инциденти.",
                    app: "Средни и големи организации в критични и важни сектори в ЕС.",
                    links: [
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
                      { text: "🇪🇺 CER Directive", url: "https://eur-lex.europa.eu/eli/dir/2022/2557/oj" },
                      { text: "🇪🇺 DORA", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🇪🇺 Cyber Resilience Act (CRA)",
                    desc: "Изисквания за киберсигурност през целия жизнен цикъл на продукти с цифрови елементи (хардуер/софтуер).",
                    app: "Производители, вносители и дистрибутори на цифрови продукти в ЕС.",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 EU Cybersecurity Act", url: "https://eur-lex.europa.eu/eli/reg/2019/881/oj" },
                      { text: "🧾 CVE/CWE", url: "https://cve.org/" }
                    ]
                  },
                  {
                    name: "🇪🇺 DORA",
                    desc: "Дигитална оперативна устойчивост за финансовия сектор — ИКТ риск, инциденти, тестване, надзор на трети страни.",
                    app: "Финансови институции и техните критични ИКТ доставчици в ЕС.",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 PSD2/PSD3", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🇪🇺 EU AI Act",
                    desc: "Регулиране на системи с изкуствен интелект въз основа на ниво на риск.",
                    app: "Разработчици и внедрители на AI системи, предлагани в ЕС.",
                    links: [
                      { text: "🏷️ NIST AI RMF", url: "https://doi.org/10.6028/NIST.AI.100-1" },
                      { text: "📘 ISO/IEC 42001", url: "https://www.iso.org/standard/81230.html" }
                    ]
                  },
                  {
                    name: "🇪🇺 ePrivacy Directive",
                    desc: "Правила за поверителност на електронните комуникации (бисквитки, директен маркетинг).",
                    app: "Доставчици на електронни комуникационни услуги и уебсайтове.",
                    links: [
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 eIDAS",
                    desc: "Рамка за електронна идентификация и удостоверителни услуги (е-подпис, е-печат).",
                    app: "Доставчици на удостоверителни услуги, публични администрации.",
                    links: [
                      { text: "🇪🇺 eIDAS 2.0", url: "https://eur-lex.europa.eu/eli/reg/2024/1183/oj" },
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 eIDAS 2.0",
                    desc: "Разширение на eIDAS с Европейски портфейл за цифрова идентичност (EUDI Wallet).",
                    app: "Държави членки, доставчици на удостоверителни услуги, граждани.",
                    links: [
                      { text: "🇪🇺 eIDAS", url: "https://eur-lex.europa.eu/eli/reg/2014/910/oj" },
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 Data Act",
                    desc: "Правила за достъп и споделяне на данни, генерирани от свързани устройства и услуги.",
                    app: "Производители на IoT устройства, доставчици на облачни услуги.",
                    links: [
                      { text: "🇪🇺 Data Governance Act", url: "https://eur-lex.europa.eu/eli/reg/2022/868/oj" },
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 Data Governance Act",
                    desc: "Механизми за улесняване на споделянето на данни (публични, алтруистични, посреднически услуги).",
                    app: "Публични органи, посредници за данни, организации за алтруизъм на данни.",
                    links: [
                      { text: "🇪🇺 Data Act", url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj" },
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 Cyber Solidarity Act",
                    desc: "Механизми на ЕС за откриване, подготовка и реакция при мащабни кибер инциденти.",
                    app: "Държави членки, CSIRT екипи, критична инфраструктура.",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 CER Directive", url: "https://eur-lex.europa.eu/eli/dir/2022/2557/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 CER Directive",
                    desc: "Физическа и оперативна устойчивост на критични образувания (енергия, транспорт, здравеопазване и др.).",
                    app: "Оператори на критична инфраструктура в ЕС.",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 Cyber Solidarity Act", url: "https://eur-lex.europa.eu/eli/reg/2025/38/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 PSD2",
                    desc: "Директива за платежни услуги — силна автентикация на клиента, отворено банкиране.",
                    app: "Доставчици на платежни услуги, банки, финтех компании.",
                    links: [
                      { text: "🇪🇺 PSD3", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" },
                      { text: "🇪🇺 PSR", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" },
                      { text: "🇪🇺 DORA", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 PSD3 (в процес)",
                    desc: "Обновена версия на PSD2 с допълнителни изисквания за сигурност и конкуренция.",
                    app: "Доставчици на платежни услуги (бъдещо приложение).",
                    links: [
                      { text: "🇪🇺 PSD2", url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj" },
                      { text: "🇪🇺 PSR", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" }
                    ]
                  },
                  {
                    name: "🇪🇺 PSR",
                    desc: "Регламент, допълващ PSD3 с директно приложими правила без нужда от национално транспониране.",
                    app: "Доставчици на платежни услуги в ЕС.",
                    links: [
                      { text: "🇪🇺 PSD2", url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj" },
                      { text: "🇪🇺 PSD3", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" }
                    ]
                  },
                  {
                    name: "🇪🇺 EMC2 Framework",
                    desc: "Рамка на ЕС за сертифициране на продукти, услуги и процеси в киберсигурността.",
                    app: "Производители и доставчици, търсещи сертификация в ЕС.",
                    links: [
                      { text: "🇪🇺 EU Cybersecurity Act", url: "https://eur-lex.europa.eu/eli/reg/2019/881/oj" },
                      { text: "🇪🇺 CRA", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj" }
                    ]
                  },
                  {
                    name: "🇪🇺 EU Cybersecurity Act",
                    desc: "Установява мандата на ENISA и рамката за сертифициране на киберсигурност в ЕС.",
                    app: "ENISA, схеми за сертифициране, производители на ИКТ продукти.",
                    links: [
                      { text: "🇪🇺 EMC2", url: "https://www.enisa.europa.eu/topics/cybersecurity-certification" },
                      { text: "🇪🇺 CRA", url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj" },
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" }
                    ]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. ISO/IEC Standards */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📘</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              2. Международни стандарти ISO/IEC (серия 27000 и свързани)
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "📘 ISO/IEC 27001",
                    desc: "Основен стандарт за система за управление на информационната сигурност (СУИС/ISMS).",
                    app: "Всяка организация, желаеща сертифицирана СУИС.",
                    links: [
                      { text: "📘 ISO/IEC 27002", url: "https://www.iso.org/standard/75652.html" },
                      { text: "📘 ISO/IEC 27005", url: "https://www.iso.org/committee/45306/x/catalogue/" },
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27002",
                    desc: "Кодекс за практики — контроли за информационна сигурност, допълващ 27001.",
                    app: "Организации, внедряващи 27001.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27003",
                    desc: "Насоки за внедряване на система за управление на информационната сигурност.",
                    app: "Екипи, внедряващи ISO/IEC 27001.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27004",
                    desc: "Насоки за измерване на ефективността на СУИС.",
                    app: "Организации с внедрен ISO/IEC 27001.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27005",
                    desc: "Насоки за управление на риска в информационната сигурност.",
                    app: "Организации, извършващи оценка на риска.",
                    links: [
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" },
                      { text: "📘 ISO 31000", url: "https://www.iso.org/iso-31000-risk-management.html" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27006",
                    desc: "Изисквания към органите за сертифициране на СУИС.",
                    app: "Сертифициращи органи.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27007",
                    desc: "Насоки за одит на системи за управление на информационната сигурност.",
                    app: "Вътрешни и външни одитори.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27008",
                    desc: "Насоки за одитори относно контролите за информационна сигурност.",
                    app: "Одитори на технически контроли.",
                    links: [{ text: "📘 ISO/IEC 27002", url: "https://www.iso.org/standard/75652.html" }]
                  },
                  {
                    name: "📘 ISO/IEC 27017",
                    desc: "Контроли за сигурност за облачни услуги.",
                    app: "Доставчици и потребители на облачни услуги.",
                    links: [
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" },
                      { text: "🧾 CSA CCM", url: "https://cloudsecurityalliance.org/research/cloud-controls-matrix" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27018",
                    desc: "Защита на лични данни в публични облаци (PII).",
                    app: "Облачни доставчици, обработващи лични данни.",
                    links: [
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27031",
                    desc: "Готовност на ИКТ за непрекъснатост на бизнеса.",
                    app: "Организации с план за непрекъснатост на дейността.",
                    links: [{ text: "📘 ISO 22301", url: "https://www.iso.org/iso-22301-business-continuity-management.html" }]
                  },
                  {
                    name: "📘 ISO/IEC 27032",
                    desc: "Насоки за киберсигурност (взаимодействие интернет/мрежи).",
                    app: "Организации, управляващи кибер риск отвъд традиционната ИТ сигурност.",
                    links: [
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" },
                      { text: "🏷️ NIST CSF", url: "https://doi.org/10.6028/NIST.CSWP.29" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27033",
                    desc: "Серия за мрежова сигурност (архитектура, дизайн, комуникации).",
                    app: "Мрежови архитекти и администратори.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27034",
                    desc: "Сигурност на приложния софтуер през жизнения му цикъл.",
                    app: "Разработчици и организации за софтуерна сигурност.",
                    links: [
                      { text: "🕸️ OWASP SAMM", url: "https://owaspsamm.org/" },
                      { text: "🕸️ ASVS", url: "https://owasp.org/www-project-application-security-verification-standard/" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27035",
                    desc: "Управление на инциденти с информационна сигурност.",
                    app: "Екипи за реакция при инциденти (CSIRT/CERT).",
                    links: [{ text: "🏷️ NIST SP 800-61", url: "https://doi.org/10.6028/NIST.SP.800-61r2" }]
                  },
                  {
                    name: "📘 ISO/IEC 27036",
                    desc: "Сигурност в отношенията с доставчици (трети страни).",
                    app: "Организации с аутсорсинг и вериги на доставки.",
                    links: [
                      { text: "🇪🇺 NIS2", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" },
                      { text: "🇪🇺 DORA", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 27037",
                    desc: "Насоки за идентифициране, събиране и съхранение на цифрови доказателства.",
                    app: "Специалисти по цифрова криминалистика.",
                    links: [{ text: "📘 ISO/IEC 27041", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27038",
                    desc: "Спецификация за редактиране (заличаване) на цифрови документи.",
                    app: "Организации, обработващи чувствителни документи.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27039",
                    desc: "Избор, внедряване и работа със системи за откриване и предотвратяване на прониквания (IDPS).",
                    app: "Мрежови и security-операционни екипи.",
                    links: [{ text: "🧾 MITRE ATT&CK", url: "https://attack.mitre.org/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27040",
                    desc: "Сигурност на системи за съхранение на данни.",
                    app: "Администратори на storage системи.",
                    links: [{ text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }]
                  },
                  {
                    name: "📘 ISO/IEC 27041",
                    desc: "Насоки за осигуряване на адекватност на методите за разследване на инциденти.",
                    app: "Криминалистични екипи.",
                    links: [{ text: "📘 ISO/IEC 27037", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27042",
                    desc: "Анализ и интерпретация на цифрови доказателства.",
                    app: "Криминалистични анализатори.",
                    links: [{ text: "📘 ISO/IEC 27037", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27043",
                    desc: "Принципи и процеси за разследване на инциденти.",
                    app: "Екипи за реакция и разследване.",
                    links: [{ text: "📘 ISO/IEC 27035", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27050",
                    desc: "Електронно откриване (eDiscovery).",
                    app: "Правни и compliance екипи.",
                    links: [{ text: "📘 ISO/IEC 27037", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO/IEC 27701",
                    desc: "Разширение на 27001 за управление на поверителността на информацията (PIMS).",
                    app: "Организации, управляващи лични данни съгласно GDPR.",
                    links: [
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" },
                      { text: "🇪🇺 GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
                    ]
                  },
                  {
                    name: "📘 ISO/IEC 29147",
                    desc: "Разкриване на уязвимости (vulnerability disclosure).",
                    app: "Производители на софтуер/хардуер, security екипи.",
                    links: [{ text: "🧾 CVE", url: "https://cve.org/" }]
                  },
                  {
                    name: "📘 ISO/IEC 30111",
                    desc: "Обработка на уязвимости (vulnerability handling).",
                    app: "Екипи за управление на уязвимости.",
                    links: [{ text: "🧾 CVE", url: "https://cve.org/" }]
                  },
                  {
                    name: "📘 ISO/IEC 42001",
                    desc: "Система за управление на изкуствения интелект (AIMS).",
                    app: "Организации, разработващи/внедряващи AI системи.",
                    links: [
                      { text: "🇪🇺 EU AI Act", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
                      { text: "🏷️ NIST AI RMF", url: "https://doi.org/10.6028/NIST.AI.100-1" }
                    ]
                  },
                  {
                    name: "📘 ISO 22301",
                    desc: "Система за управление на непрекъснатостта на бизнеса.",
                    app: "Всички организации с нужда от бизнес непрекъснатост.",
                    links: [{ text: "📘 ISO/IEC 27031", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "📘 ISO 31000",
                    desc: "Общи принципи и насоки за управление на риска (не само ИТ).",
                    app: "Всяка организация, управляваща риск.",
                    links: [{ text: "📘 ISO/IEC 27005", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. NIST Frameworks */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏷️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              3. NIST рамки и специални публикации
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🏷️ NIST CSF 2.0",
                    desc: "Рамка за управление на кибер риск чрез функции (Govern, Identify, Protect, Detect, Respond, Recover).",
                    app: "Организации от всякакъв размер и сектор, най-вече в САЩ.",
                    links: [
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" },
                      { text: "🛡️ CIS Controls", url: "https://www.cisecurity.org/controls" }
                    ]
                  },
                  {
                    name: "🏷️ NIST AI RMF",
                    desc: "Рамка за управление на риска при изкуствен интелект.",
                    app: "Организации, разработващи/използващи AI.",
                    links: [
                      { text: "🇪🇺 EU AI Act", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
                      { text: "📘 ISO/IEC 42001", url: "https://www.iso.org/standard/81230.html" }
                    ]
                  },
                  {
                    name: "🏷️ SP 800-30",
                    desc: "Насоки за провеждане на оценка на риска.",
                    app: "Федерални агенции и организации, следващи NIST рамката.",
                    links: [
                      { text: "🏷️ SP 800-37", url: "https://doi.org/10.6028/NIST.SP.800-37r2" },
                      { text: "📘 ISO/IEC 27005", url: "https://www.iso.org/committee/45306/x/catalogue/" }
                    ]
                  },
                  {
                    name: "🏷️ SP 800-37",
                    desc: "Рамка за управление на риска (RMF) — жизнен цикъл на сигурността на системите.",
                    app: "Федерални информационни системи (и доброволно — частен сектор).",
                    links: [
                      { text: "🏷️ SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" },
                      { text: "🏷️ SP 800-30", url: "https://doi.org/10.6028/NIST.SP.800-30r1" }
                    ]
                  },
                  {
                    name: "🏷️ SP 800-39",
                    desc: "Управление на информационен риск на организационно ниво.",
                    app: "Организации с многослойно управление на риска.",
                    links: [{ text: "🏷️ SP 800-37", url: "https://doi.org/10.6028/NIST.SP.800-37r2" }]
                  },
                  {
                    name: "🏷️ SP 800-53",
                    desc: "Каталог с контроли за сигурност и поверителност на федерални информационни системи.",
                    app: "Федерални агенции, изпълнители на федерални договори, FedRAMP.",
                    links: [
                      { text: "🏷️ SP 800-53A", url: "https://doi.org/10.6028/NIST.SP.800-53Ar5" },
                      { text: "🏥 FedRAMP", url: "https://www.fedramp.gov/" },
                      { text: "🏥 FISMA", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/federal-information-security-modernization-act" }
                    ]
                  },
                  {
                    name: "🏷️ SP 800-53A",
                    desc: "Насоки за оценка на контролите от SP 800-53.",
                    app: "Одитори и оценители на сигурността.",
                    links: [{ text: "🏷️ SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" }]
                  },
                  {
                    name: "🏷️ SP 800-61",
                    desc: "Наръчник за управление на инциденти с компютърна сигурност.",
                    app: "CSIRT/SOC екипи.",
                    links: [{ text: "📘 ISO/IEC 27035", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "🏷️ SP 800-63",
                    desc: "Насоки за цифрова идентичност (автентикация, идентификация).",
                    app: "Системи за управление на идентичността и достъпа.",
                    links: [{ text: "🇪🇺 eIDAS", url: "https://eur-lex.europa.eu/eli/reg/2014/910/oj" }]
                  },
                  {
                    name: "🏷️ SP 800-115",
                    desc: "Техническо ръководство за тестване и оценка на сигурността (penetration testing).",
                    app: "Специалисти по тестове за проникване.",
                    links: [{ text: "🕸️ OWASP WSTG", url: "https://owasp.org/www-project-web-security-testing-guide/" }]
                  },
                  {
                    name: "🏷️ SP 800-137",
                    desc: "Непрекъснат мониторинг на сигурността на информацията (ISCM).",
                    app: "Организации с континуален security мониторинг.",
                    links: [{ text: "🏷️ SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" }]
                  },
                  {
                    name: "🏷️ SP 800-171",
                    desc: "Защита на контролирана некласифицирана информация (CUI) при изпълнители извън федералните системи.",
                    app: "Изпълнители на договори с Министерството на отбраната на САЩ.",
                    links: [
                      { text: "🏥 CMMC 2.0", url: "https://dodcio.defense.gov/CMMC/" },
                      { text: "🏷️ SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" }
                    ]
                  },
                  {
                    name: "🏷️ SP 800-172",
                    desc: "Допълнителни, усилени изисквания за защита срещу напреднали устойчиви заплахи (APT).",
                    app: "Изпълнители с високо чувствителна CUI информация.",
                    links: [{ text: "🏷️ SP 800-171", url: "https://doi.org/10.6028/NIST.SP.800-171r3" }]
                  },
                  {
                    name: "🏷️ SP 800-207 (Zero Trust)",
                    desc: "Архитектура на нулево доверие — принципи за достъп без подразбиращо се доверие.",
                    app: "Организации, модернизиращи мрежовата си архитектура.",
                    links: [{ text: "🏷️ NIST CSF", url: "https://doi.org/10.6028/NIST.CSWP.29" }]
                  },
                  {
                    name: "🏷️ SP 1800 Series",
                    desc: "Практически ръководства за внедряване на киберсигурност (NIST Cybersecurity Practice Guides).",
                    app: "Организации, търсещи готови референтни архитектури.",
                    links: [
                      { text: "🏷️ NIST CSF", url: "https://doi.org/10.6028/NIST.CSWP.29" },
                      { text: "🏷️ SP 800 серия", url: "https://csrc.nist.gov/publications/sp800" }
                    ]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. CIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛡️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              4. CIS (Center for Internet Security)
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🛡️ CIS Controls v8",
                    desc: "Приоритизиран набор от практически контроли за защита срещу най-честите кибератаки.",
                    app: "Организации от всякакъв размер, търсещи практическо ръководство.",
                    links: [
                      { text: "🏷️ NIST CSF", url: "https://doi.org/10.6028/NIST.CSWP.29" },
                      { text: "📘 ISO/IEC 27002", url: "https://www.iso.org/standard/75652.html" }
                    ]
                  },
                  {
                    name: "🛡️ CIS Benchmarks",
                    desc: "Конкретни конфигурационни насоки за защита на операционни системи, приложения и облачни платформи.",
                    app: "Системни администратори, DevOps/облачни екипи.",
                    links: [{ text: "🛡️ CIS Controls v8", url: "https://www.cisecurity.org/controls" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. OWASP */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🕸️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              5. OWASP
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🕸️ OWASP Top 10",
                    desc: "Списък на 10-те най-критични рискове за уеб приложения.",
                    app: "Разработчици и архитекти на уеб приложения.",
                    links: [
                      { text: "🕸️ ASVS", url: "https://owasp.org/www-project-application-security-verification-standard/" },
                      { text: "🧾 CWE", url: "https://cwe.mitre.org/" }
                    ]
                  },
                  {
                    name: "🕸️ API Security Top 10",
                    desc: "Топ рискове, специфични за API.",
                    app: "Екипи, разработващи/поддържащи API.",
                    links: [{ text: "🕸️ OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }]
                  },
                  {
                    name: "🕸️ ASVS",
                    desc: "Стандарт за проверка на сигурността на приложения — нива на изисквания.",
                    app: "QA/security екипи, извършващи верификация на приложения.",
                    links: [
                      { text: "🕸️ OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
                      { text: "📘 ISO/IEC 27034", url: "https://www.iso.org/committee/45306/x/catalogue/" }
                    ]
                  },
                  {
                    name: "🕸️ MASVS",
                    desc: "Стандарт за верификация на сигурността на мобилни приложения.",
                    app: "Разработчици на мобилни приложения.",
                    links: [{ text: "🕸️ ASVS", url: "https://owasp.org/www-project-application-security-verification-standard/" }]
                  },
                  {
                    name: "🕸️ SAMM",
                    desc: "Модел за оценка и подобряване на практиките за сигурен софтуер в организацията.",
                    app: "Организации, изграждащи secure SDLC.",
                    links: [{ text: "📘 ISO/IEC 27034", url: "https://www.iso.org/committee/45306/x/catalogue/" }]
                  },
                  {
                    name: "🕸️ Web Security Testing Guide (WSTG)",
                    desc: "Наручник с методология за тестване на сигурността на уеб приложения.",
                    app: "Penetration testers, QA екипи.",
                    links: [
                      { text: "🕸️ OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
                      { text: "🏷️ NIST SP 800-115", url: "https://doi.org/10.6028/NIST.SP.800-115" }
                    ]
                  },
                  {
                    name: "🕸️ Mobile Testing Guide (MSTG)",
                    desc: "Наручник за тестване на сигурността на мобилни приложения.",
                    app: "Penetration testers на мобилни платформи.",
                    links: [{ text: "🕸️ MASVS", url: "https://mas.owasp.org/MASVS/" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Audit & Threat Intel */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧾</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              6. Одит, съответствие и киберразузнаване
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🧾 SOC 1",
                    desc: "Одитен доклад за контроли, релевантни за финансово отчитане при доставчици на услуги.",
                    app: "Доставчици на услуги, засягащи финансово отчитане на клиенти.",
                    links: [
                      { text: "🧾 SOC 2", url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-service-organizations" },
                      { text: "🧾 SOC 3", url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-service-organizations" }
                    ]
                  },
                  {
                    name: "🧾 SOC 2",
                    desc: "Одитен доклад за контроли, свързани със сигурност, наличност, поверителност и цялост на данните.",
                    app: "SaaS и облачни доставчици на услуги.",
                    links: [
                      { text: "🧾 SOC 1", url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-service-organizations" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🧾 SOC 3",
                    desc: "Обобщена, публично разпространима версия на SOC 2 доклад.",
                    app: "Доставчици, желаещи публично доказателство за съответствие.",
                    links: [{ text: "🧾 SOC 2", url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-service-organizations" }]
                  },
                  {
                    name: "🧾 PCI DSS 4.0",
                    desc: "Стандарт за сигурност на данни при обработка на платежни карти.",
                    app: "Търговци и доставчици, обработващи данни за карти.",
                    links: [
                      { text: "🇪🇺 PSD2/PSD3", url: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/financial-legislation-under-development/payment-services_en" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🧾 HITRUST CSF",
                    desc: "Обща рамка за сигурност, съчетаваща изисквания от множество стандарти (HIPAA, ISO, NIST).",
                    app: "Организации в здравеопазването и свързани сектори.",
                    links: [
                      { text: "🏥 HIPAA", url: "https://www.hhs.gov/hipaa/index.html" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🧾 COBIT 2019",
                    desc: "Рамка за управление и ръководство на корпоративни ИТ.",
                    app: "ИТ ръководство и управление на корпоративно ниво.",
                    links: [
                      { text: "🧾 ITIL 4", url: "https://www.axelos.com/certifications/itil-service-management" },
                      { text: "📘 ISO/IEC 27001", url: "https://www.iso.org/standard/27001" }
                    ]
                  },
                  {
                    name: "🧾 ITIL 4",
                    desc: "Рамка за управление на ИТ услуги.",
                    app: "ИТ операции и сервизен мениджмънт.",
                    links: [{ text: "🧾 COBIT 2019", url: "https://www.isaca.org/resources/cobit" }]
                  },
                  {
                    name: "🧾 CSA CCM",
                    desc: "Матрица от контроли за сигурност, специфични за облачни доставчици.",
                    app: "Облачни доставчици и техните клиенти.",
                    links: [
                      { text: "📘 ISO/IEC 27017", url: "https://www.iso.org/committee/45306/x/catalogue/" },
                      { text: "🧾 CSA STAR", url: "https://cloudsecurityalliance.org/star" }
                    ]
                  },
                  {
                    name: "🧾 CSA STAR",
                    desc: "Програма за сертифициране и регистър на облачна сигурност, базирана на CCM.",
                    app: "Облачни доставчици, търсещи публично доказателство за съответствие.",
                    links: [{ text: "🧾 CSA CCM", url: "https://cloudsecurityalliance.org/research/cloud-controls-matrix" }]
                  },
                  {
                    name: "🧾 MITRE ATT&CK",
                    desc: "База от знания за тактики и техники на атакуващите.",
                    app: "SOC екипи, threat intelligence анализатори.",
                    links: [
                      { text: "🧾 MITRE D3FEND", url: "https://d3fend.mitre.org/" },
                      { text: "🧾 CAPEC", url: "https://capec.mitre.org/" }
                    ]
                  },
                  {
                    name: "🧾 MITRE D3FEND",
                    desc: "Рамка за защитни техники, съответстващи на ATT&CK тактиките.",
                    app: "Blue team и защитни екипи.",
                    links: [{ text: "🧾 MITRE ATT&CK", url: "https://attack.mitre.org/" }]
                  },
                  {
                    name: "🧾 MITRE CAPEC",
                    desc: "Каталог на модели за атака (по-абстрактно ниво от ATT&CK).",
                    app: "Анализатори на заплахи и разработчици на secure софтуер.",
                    links: [
                      { text: "🧾 MITRE ATT&CK", url: "https://attack.mitre.org/" },
                      { text: "🧾 CWE", url: "https://cwe.mitre.org/" }
                    ]
                  },
                  {
                    name: "🧾 CVE",
                    desc: "Стандартизирани идентификатори за публично известни уязвимости.",
                    app: "Всички, управляващи уязвимости в софтуер/системи.",
                    links: [
                      { text: "🧾 CWE", url: "https://cwe.mitre.org/" },
                      { text: "🧾 CVSS", url: "https://www.first.org/cvss/" }
                    ]
                  },
                  {
                    name: "🧾 CWE",
                    desc: "Класификация на типове слабости в софтуера, водещи до уязвимости.",
                    app: "Разработчици, security анализатори.",
                    links: [
                      { text: "🧾 CVE", url: "https://cve.org/" },
                      { text: "🕸️ OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }
                    ]
                  },
                  {
                    name: "🧾 CVSS",
                    desc: "Система за оценка на тежестта на уязвимостите.",
                    app: "Екипи за управление на уязвимости и патч мениджмънт.",
                    links: [{ text: "🧾 CVE", url: "https://cve.org/" }]
                  },
                  {
                    name: "🧾 STIX",
                    desc: "Стандартизиран език за описание на киберзаплахи.",
                    app: "Threat intelligence платформи и обмен на информация.",
                    links: [{ text: "🧾 TAXII", url: "https://oasis-open.github.io/cti-documentation/taxii/intro" }]
                  },
                  {
                    name: "🧾 TAXII",
                    desc: "Протокол за обмен на STIX данни между организации.",
                    app: "Организации, споделящи threat intelligence.",
                    links: [{ text: "🧾 STIX", url: "https://oasis-open.github.io/cti-documentation/stix/intro" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Sector Regulations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏥</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              7. Секторни регулации (предимно САЩ)
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🏥 HIPAA",
                    desc: "Защита на здравна информация на пациенти (PHI) в САЩ.",
                    app: "Здравни доставчици, застрахователи, техни партньори.",
                    links: [
                      { text: "🏥 HITECH", url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/hitech-act-enforcement-interim-final-rule/index.html" },
                      { text: "🧾 HITRUST CSF", url: "https://hitrustalliance.net/product-tool/hitrust-csf" }
                    ]
                  },
                  {
                    name: "🏥 HITECH",
                    desc: "Разширява HIPAA с изисквания за електронни здравни досиета и уведомяване при нарушения.",
                    app: "Здравни организации, използващи електронни здравни досиета.",
                    links: [{ text: "🏥 HIPAA", url: "https://www.hhs.gov/hipaa/index.html" }]
                  },
                  {
                    name: "🏥 FERPA",
                    desc: "Защита на образователни досиета на учениците в САЩ.",
                    app: "Учебени заведения, получаващи федерално финансиране в САЩ.",
                    links: []
                  },
                  {
                    name: "🏥 GLBA",
                    desc: "Защита на непублична лична финансова информация на клиенти.",
                    app: "Финансови институции в САЩ.",
                    links: [
                      { text: "🧾 PCI DSS", url: "https://www.pcisecuritystandards.org/standards/pci-dss/" },
                      { text: "🧾 SOC 2", url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-service-organizations" }
                    ]
                  },
                  {
                    name: "🏥 FISMA",
                    desc: "Изисква федерални агенции да прилагат програми за информационна сигурност.",
                    app: "Федерални агенции на САЩ и техни изпълнители.",
                    links: [
                      { text: "🏷️ NIST SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" },
                      { text: "🏥 FedRAMP", url: "https://www.fedramp.gov/" }
                    ]
                  },
                  {
                    name: "🏥 FedRAMP",
                    desc: "Стандартизиран подход за оценка на сигурността на облачни услуги за федералното правителство на САЩ.",
                    app: "Облачни доставчици, работещи с федерални агенции на САЩ.",
                    links: [
                      { text: "🏷️ NIST SP 800-53", url: "https://doi.org/10.6028/NIST.SP.800-53r5" },
                      { text: "🏥 FISMA", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/federal-information-security-modernization-act" }
                    ]
                  },
                  {
                    name: "🏥 CMMC 2.0",
                    desc: "Сертификационен модел за нивото на киберсигурност на изпълнители на Министерството на отбраната на САЩ.",
                    app: "Изпълнители по веригата на доставки на отбраната на САЩ.",
                    links: [{ text: "🏷️ NIST SP 800-171/172", url: "https://doi.org/10.6028/NIST.SP.800-171r3" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. National Frameworks */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
              8. Национални рамки
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/4">Документ</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-5/12">Описание</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Приложимост</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 w-1/6">Свързани документи</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {[
                  {
                    name: "🏛️ Закон за киберсигурност (България)",
                    desc: "Национален закон, транспониращ изискванията на NIS/NIS2 в българското законодателство.",
                    app: "Организации, попадащи в обхвата на NIS2 в България.",
                    links: [{ text: "🇪🇺 NIS2 Directive", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj" }]
                  }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition duration-150">
                    <td className="py-4 px-6 text-white font-bold">{row.name}</td>
                    <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed">{row.desc}</td>
                    <td className="py-4 px-6 text-gray-400 text-xs">{row.app}</td>
                    <td className="py-4 px-6 text-xs space-y-1">
                      {row.links.map((link, lIdx) => (
                        <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#0098b2] hover:underline">
                          {link.text}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3 italic">
            * Всяка държава членка на ЕС има собствен национален закон, транспониращ NIS2 — структурата е аналогична, но с локални особености (надзорни органи, санкции, срокове).
          </p>
        </section>

        {/* 9. Relation Mapping Summary */}
        <section className="mb-20 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-[#0098b2]/10 rounded-xl text-[#0098b2]">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              9. Обобщена карта на връзките (по теми)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {[
              { title: "Защита на лични данни", desc: "GDPR → ePrivacy Directive, eIDAS/eIDAS 2.0, Data Act, Data Governance Act, ISO/IEC 27701, ISO/IEC 27018" },
              { title: "Управление на риска в организацията", desc: "ISO 31000 → ISO/IEC 27005 → NIST SP 800-30/37/39 → NIST CSF 2.0 → CIS Controls v8" },
              { title: "Сигурност на веригата на доставки / трети страни", desc: "NIS2, DORA, ISO/IEC 27036, CMMC 2.0" },
              { title: "Сигурност на приложения", desc: "OWASP (Top 10, ASVS, MASVS, SAMM) ↔ ISO/IEC 27034 ↔ CWE/CVE/CVSS" },
              { title: "Облачна сигурност", desc: "ISO/IEC 27017/27018 ↔ CSA CCM/STAR ↔ SOC 2 ↔ FedRAMP" },
              { title: "Управление на инциденти и криминалистика", desc: "ISO/IEC 27035 ↔ NIST SP 800-61 ↔ ISO/IEC 27037-27043 ↔ MITRE ATT&CK/D3FEND ↔ STIX/TAXII" },
              { title: "Финансов сектор", desc: "DORA ↔ PSD2/PSD3/PSR ↔ PCI DSS 4.0 ↔ GLBA" },
              { title: "Изкуствен интелект", desc: "EU AI Act ↔ ISO/IEC 42001 ↔ NIST AI RMF" },
              { title: "Критична инфраструктура", desc: "NIS2 ↔ CER Directive ↔ Cyber Solidarity Act" },
              { title: "Управление на уязвимости", desc: "ISO/IEC 29147/30111 ↔ CVE ↔ CWE ↔ CVSS" }
            ].map((topic, tIdx) => (
              <div key={tIdx} className="bg-slate-900/40 border border-slate-700/40 p-5 rounded-xl">
                <h4 className="font-bold text-[#0098b2] mb-1.5">{topic.title}</h4>
                <p className="text-gray-300 text-xs font-semibold leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-2xl text-center border border-[#0098b2]/30 shadow-lg shadow-[#0098b2]/10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Имате ли нужда от одит за съответствие?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto text-sm">
            Нашите сертифицирани експерти по киберсигурност ще Ви помогнат да анализирате състоянието на Вашите системи и да покриете напълно изискванията на NIS2, DORA, GDPR и ISO 27001.
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#0098b2] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition duration-150">
              Свържете се с експерт
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

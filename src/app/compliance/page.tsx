import ComplianceBadge from "@/components/ComplianceBadge";
import RiskCalculator from "@/components/RiskCalculator";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Съответствие с EU Директиви - GDPR, NIS2, DORA, CRA, EU AI Act | DefComs",
  description: "Осигурете пълно съответствие с най-строгите европейски директиви и регламенти: NIS2, GDPR, DORA, CRA, ISO 27001, SOC 2 и EU AI Act с нашите решения.",
  keywords: "съответствие EU, NIS2 директива, GDPR защита, DORA регламент, Cyber Resilience Act, EU AI Act, ISO 27001",
};

export default function CompliancePage() {
  const complianceData = [
    {
      name: "GDPR",
      description: "Регламент ЕС 2016/679 - Защита на личните данни, псевдонимизация на IP адреси, криптиране в движение и съхранение на системните логове.",
      color: "bg-blue-600"
    },
    {
      name: "NIS2",
      description: "Директива ЕС 2022/2555 - Управление на риска за мрежова и информационна сигурност, задължително ранно известяване и докладване на инциденти.",
      color: "bg-green-600"
    },
    {
      name: "Cyber Resilience Act",
      description: "Сигурност при проектирането (Security by Design), управление на уязвимостите и непрекъснато обновяване.",
      color: "bg-purple-600"
    },
    {
      name: "DORA",
      description: "Регламент ЕС 2022/2554 - Оперативна устойчивост на цифровите технологии във финансовия сектор и строг контрол на доставчиците на услуги.",
      color: "bg-orange-600"
    },
    {
      name: "EU AI Act",
      description: "Регламент ЕС 2024/1689 - Управление на риска при използване на модели с изкуствен интелект (AI) за автоматизиран триаж на аларми.",
      color: "bg-pink-600"
    },
    {
      name: "ePrivacy",
      description: "Строги правила за използване на бисквитки, сесии на анализаторите и локално браузър съхранение.",
      color: "bg-teal-600"
    },
    {
      name: "ISO/IEC 27001:2022",
      description: "Международна рамка за изграждане и управление на Системи за управление на информационната сигурност (СУИС).",
      color: "bg-red-600"
    },
    {
      name: "SOC 2 Type II",
      description: "Независим одит на контролите за сигурност, наличност, конфиденциалност и интегритет на обработваната информация.",
      color: "bg-indigo-600"
    },
    {
      name: "ISO/IEC 42001:2023",
      description: "Международен стандарт за системи за управление на изкуствен интелект (AIMS) - управление на риска при AI системи.",
      color: "bg-yellow-600"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Съответствие с EU директиви
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Нашите платформи покриват всички ключови регулации и стандарти за киберсигурност в Европейския съюз
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {complianceData.map((item) => (
            <ComplianceBadge
              key={item.name}
              name={item.name}
              description={item.description}
              color={item.color}
            />
          ))}
        </div>

        {/* Interactive Risk Calculator Section */}
        <div className="my-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Проверете нивото си на риск
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Направете бърз 2-минутен тест, за да оцените готовността на вашата организация за съответствие с директивите NIS2 и GDPR.
          </p>
          <RiskCalculator />
        </div>

        <div className="mt-16 bg-slate-800 p-8 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Защо съответствието е важно?
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-[#0098b2]">Правна защита:</strong> Избягване на глоби и санкции до 4% от глобалния оборот съгласно европейските регулации.
            </p>
            <p>
              <strong className="text-[#0098b2]">Доверие на клиентите:</strong> Демонстрация на ангажираност към защита на поверителните и лични данни.
            </p>
            <p>
              <strong className="text-[#0098b2]">Конкурентно предимство:</strong> Сертифициране и непрекъснато съответствие по международни стандарти.
            </p>
            <p>
              <strong className="text-[#0098b2]">Оперативна устойчивост:</strong> Стандартизирани, автоматизирани процеси за реакция и смекчаване на уязвимости.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-10 rounded-2xl text-center border border-[#0098b2]/30 shadow-lg shadow-[#0098b2]/10">
          <h2 className="text-3xl font-black text-white mb-4">
            Имате ли нужда от съдействие за съответствие с NIS2 или GDPR?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-base">
            Нашите сертифицирани експерти по киберсигурност ще анализират вашите системи и ще изградят пълна стратегия за привеждане в съответствие с европейските регламенти.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="w-full sm:w-auto bg-[#f22020] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition duration-150 flex items-center justify-center gap-2 mx-auto">
                Заявете безплатна консултация
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/tools/bundle">
              <button className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-[#0098b2] text-white font-bold px-8 py-4 rounded-xl transition duration-150 mx-auto">
                Сглобете пакет услуги
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

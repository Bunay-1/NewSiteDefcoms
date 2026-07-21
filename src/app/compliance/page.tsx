import ComplianceBadge from "@/components/ComplianceBadge";

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Съответствие с EU директиви
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Нашите платформи покриват всички ключови регулации и стандарти за киберсигурност в Европейския съюз
        </p>
        
        <div className="grid grid-cols-3 gap-6">
          {complianceData.map((item) => (
            <ComplianceBadge
              key={item.name}
              name={item.name}
              description={item.description}
              color={item.color}
            />
          ))}
        </div>

        <div className="mt-16 bg-slate-800 p-8 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Защо съответствието е важно?
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-[#0098b2]">Правна защита:</strong> Избягване на глоби и санкции до 4% от глобалния оборот.
            </p>
            <p>
              <strong className="text-[#0098b2]">Доверие на клиентите:</strong> Демонстрация на ангажираност към защита на данните.
            </p>
            <p>
              <strong className="text-[#0098b2]">Конкурентно предимство:</strong> Сертифициране по международни стандарти.
            </p>
            <p>
              <strong className="text-[#0098b2]">Оперативна ефективност:</strong> Стандартизирани процеси и процедури.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

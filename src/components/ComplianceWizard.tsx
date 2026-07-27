"use client";

import { useState } from "react";
import { Shield, Check, ArrowRight, HelpCircle, AlertTriangle, CheckCircle, Info, RefreshCw, Send, Sparkles } from "lucide-react";
import Link from "next/link";

interface QuestionStep {
  title: string;
  description: string;
  options: {
    label: string;
    value: string;
    desc?: string;
  }[];
}

export default function ComplianceWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    employees: "",
    revenue: "",
    sector: "",
    financial: "",
  });
  const [showResults, setShowResults] = useState(false);

  const steps: QuestionStep[] = [
    {
      title: "Размер на организацията",
      description: "Броят на служителите е водещ фактор при определяне на задълженията по NIS2.",
      options: [
        { label: "Микро предприятие", value: "micro", desc: "Под 10 служители" },
        { label: "Малко предприятие", value: "small", desc: "10 - 49 служители" },
        { label: "Средно предприятие", value: "medium", desc: "50 - 249 служители" },
        { label: "Голямо предприятие", value: "large", desc: "250 или повече служители" },
      ],
    },
    {
      title: "Финансови показатели",
      description: "Годишният оборот или баланс на фирмата определя дали попадате в критериите на ЕС.",
      options: [
        { label: "До 2 милиона €", value: "low", desc: "Годишен оборот / баланс под 2 млн. €" },
        { label: "Над 2 млн. € до 10 млн. €", value: "mid-low", desc: "Годишен оборот / баланс между 2 млн. € и 10 млн. €" },
        { label: "Над 10 млн. € до 50 млн. €", value: "medium", desc: "Годишен оборот / баланс между 10 млн. € и 50 млн. €" },
        { label: "Над 50 милиона €", value: "high", desc: "Годишен оборот / баланс над 50 млн. €" },
      ],
    },
    {
      title: "Сектор на дейност",
      description: "Директивата NIS2 разделя секторите на 'високо критични' и 'други критични'.",
      options: [
        {
          label: "Силно критични сектори",
          value: "highly_critical",
          desc: "Енергетика, Транспорт, Банково дело, Здравеопазване, Водоснабдяване, Дигитална инфраструктура, Публична администрация, Космос"
        },
        {
          label: "Други критични сектори",
          value: "other_critical",
          desc: "Пощенски/куриерски услуги, Управление на отпадъци, Производство и дистрибуция на химикали, Храни, Производство (машини, електроника), Цифрови доставчици, Изследвания"
        },
        {
          label: "Не-критичен сектор / Други",
          value: "none",
          desc: "Всички останали бизнес сектори и индустрии"
        },
      ],
    },
    {
      title: "Дейност във финансовия сектор (DORA)",
      description: "Регламентът DORA въвежда строги изисквания за оперативна устойчивост на финансовите институции.",
      options: [
        {
          label: "Да",
          value: "yes",
          desc: "Банка, застрахователно дружество, финтех фирма, кредитна институция или ИТ доставчик за финансовия сектор"
        },
        {
          label: "Не",
          value: "no",
          desc: "Не оперираме във финансовия сектор и нямаме такива партньорства"
        },
      ],
    },
  ];

  const handleOptionSelect = (value: string) => {
    const key = currentStep === 0 ? "employees" : currentStep === 1 ? "revenue" : currentStep === 2 ? "sector" : "financial";
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({
      employees: "",
      revenue: "",
      sector: "",
      financial: "",
    });
    setCurrentStep(0);
    setShowResults(false);
  };

  const calculateCompliance = () => {
    const isMediumOrLarge = answers.employees === "medium" || answers.employees === "large" || answers.revenue === "medium" || answers.revenue === "high";
    const isHighlyCritical = answers.sector === "highly_critical";
    const isOtherCritical = answers.sector === "other_critical";
    const isFinancial = answers.financial === "yes";

    let nis2Status = "none"; // none, essential, important, supply_chain
    let doraStatus = false;

    if (isMediumOrLarge) {
      if (isHighlyCritical) {
        nis2Status = "essential";
      } else if (isOtherCritical) {
        nis2Status = "important";
      }
    } else {
      // Small or Micro, but in critical sector
      if (isHighlyCritical || isOtherCritical) {
        nis2Status = "supply_chain";
      }
    }

    if (isFinancial) {
      doraStatus = true;
    }

    return { nis2Status, doraStatus };
  };

  const getResultsUI = () => {
    const { nis2Status, doraStatus } = calculateCompliance();

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 bg-[#0098b2]/20 text-[#0098b2] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#0098b2]/30 animate-pulse">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Вашата оценка за съответствие</h2>
          <p className="text-gray-400 text-sm">На базата на въведените данни, ето регулаторните рамки на ЕС, които се отнасят за Вас:</p>
        </div>

        {/* Results cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* NIS2 Result */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
              NIS2
            </div>
            <h3 className="text-xl font-bold text-white mb-4">NIS2 Директива</h3>

            {nis2Status === "essential" && (
              <div className="space-y-4">
                <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#f22020] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#f22020] text-sm">Основен субект (Essential Entity)</h4>
                    <p className="text-xs text-gray-300 mt-1">Вие попадате под най-строгия режим на директивата NIS2. Санкциите при неспазване могат да достигнат до 10 млн. € или 2% от глобалния оборот.</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Задължителен денонощен (24/7) SOC мониторинг</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Управление на уязвимостите и непрекъснат одит</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Задължително ранно известяване за инциденти до 24 ч.</li>
                </ul>
              </div>
            )}

            {nis2Status === "important" && (
              <div className="space-y-4">
                <div className="p-3 bg-orange-950/30 border border-orange-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-400 text-sm">Важен субект (Important Entity)</h4>
                    <p className="text-xs text-gray-300 mt-1">Вие попадате в обхвата на NIS2 с облекчен надзорен режим, но мерките по киберсигурност са идентични. Санкциите могат да достигнат до 7 млн. €.</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Изграждане на политики за управление на кибер риска</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Сигурност на веригата за доставки</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> Систематично сканиране на външните активи</li>
                </ul>
              </div>
            )}

            {nis2Status === "supply_chain" && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-lg flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-400 text-sm">Изключение (Supply Chain Risk)</h4>
                    <p className="text-xs text-gray-300 mt-1">Като микро/малко предприятие не сте директно задължени по NIS2, но понеже сте в критичен сектор, вашите клиенти (големи партньори) ще изискват съответствие по силата на 'сигурност на веригата за доставки'.</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0098b2] flex-shrink-0" /> Внедряване на сигурна Endpoint и Network защита</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0098b2] flex-shrink-0" /> Обучения за фишинг на служителите</li>
                </ul>
              </div>
            )}

            {nis2Status === "none" && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Няма директно NIS2 задължение</h4>
                    <p className="text-xs text-gray-400 mt-1">Вашата дейност или размер на предприятието не попадат под директивата NIS2 на този етап.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DORA / GDPR Result */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded bg-purple-600/20 text-purple-400 border border-purple-500/30">
              DORA & GDPR
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Финансова и Лична Сигурност</h3>

            <div className="space-y-4">
              {doraStatus ? (
                <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-purple-400 text-sm">Задължително DORA съответствие</h4>
                    <p className="text-xs text-gray-300 mt-1">Организацията Ви трябва да отговаря на изискванията на Регламента DORA за финансова устойчивост. Задължително е извършването на периодични пентестове.</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Няма DORA задължение</h4>
                    <p className="text-xs text-gray-400 mt-1">Вашата дейност не изисква DORA съответствие (освен ако не сте ИТ партньор на банкова институция).</p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-teal-950/30 border border-teal-500/30 rounded-lg flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-400 text-sm">GDPR (Лични Данни)</h4>
                  <p className="text-xs text-gray-300 mt-1">Абсолютно задължително съответствие за всички субекти. Изисква псевдонимизация на логове, криптиране на бази данни и сигурно управление на сесии.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DefComs Recommended Products */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0098b2]" />
            Препоръчано решение от DefComs
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            Въз основа на Вашите регулаторни изисквания, нашите експерти препоръчват да разгледате и интегрирате следните продукти на DefComs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(nis2Status === "essential" || nis2Status === "important" || doraStatus) && (
              <>
                <Link href="/products/soc-platform" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-[#0098b2] transition">
                  <h4 className="font-bold text-white text-sm">SOC Platform</h4>
                  <p className="text-xs text-gray-400 mt-1">24/7 непрекъснат мониторинг на заплахи, триаж на аларми и съвместимост с NIS2.</p>
                </Link>
                <Link href="/products/siem" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-red-500 transition">
                  <h4 className="font-bold text-white text-sm">SIEM Solution</h4>
                  <p className="text-xs text-gray-400 mt-1">Интелигентна корелация на логове и събития за сигурност в реално време.</p>
                </Link>
                <Link href="/products/vulnerability-scanner" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-[#0098b2] transition">
                  <h4 className="font-bold text-white text-sm">Vulnerability Scanner</h4>
                  <p className="text-xs text-gray-400 mt-1">Автоматизирано засичане на CVE и софтуерни слабости в инфраструктурата.</p>
                </Link>
              </>
            )}

            {(nis2Status === "supply_chain" || nis2Status === "none") && (
              <>
                <Link href="/products/endpoint-protection" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-[#0098b2] transition">
                  <h4 className="font-bold text-white text-sm">Endpoint Protection</h4>
                  <p className="text-xs text-gray-400 mt-1">Защита на компютри, сървъри и мобилни устройства срещу Ransomware.</p>
                </Link>
                <Link href="/products/network-security" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-red-500 transition">
                  <h4 className="font-bold text-white text-sm">Network Security</h4>
                  <p className="text-xs text-gray-400 mt-1">Защита на мрежовия трафик, IDS/IPS сигурност и сегментиране.</p>
                </Link>
                <Link href="/tools/phishing-trainer" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-[#0098b2] transition">
                  <h4 className="font-bold text-white text-sm">Фишинг Обучение</h4>
                  <p className="text-xs text-gray-400 mt-1">Повишаване кибер културата на персонала чрез симулации.</p>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => {
              const { nis2Status, doraStatus } = calculateCompliance();
              const reportText = `
ОФИЦИАЛНА ОЦЕНКА ЗА NIS2 И DORA СЪОТВЕТСТВИЕ
==================================================
Издател: DefComs Cybersecurity Platform
Дата на одит: ${new Date().toLocaleDateString("bg-BG")}
--------------------------------------------------
РЕЗУЛТАТИ:
- Статус по Директива NIS2: ${
                nis2Status === "essential"
                  ? "ОСНОВЕН СУБЕКТ (Essential Entity) - Изключително строг режим!"
                  : nis2Status === "important"
                  ? "ВАЖЕН СУБЕКТ (Important Entity) - Задължителни контроли!"
                  : nis2Status === "supply_chain"
                  ? "РИСК ПО ВЕРИГАТА НА ДОСТАВКИ (Supply Chain Risk)!"
                  : "Няма директни NIS2 задължения."
              }
- Статус по Регламент DORA: ${
                doraStatus
                  ? "ЗАДЪЛЖИТЕЛНО СЪОТВЕТСТВИЕ (Финансов сектор и ИТ партньори)!"
                  : "Не се изисква DORA съответствие."
              }
--------------------------------------------------
ПРЕПОРЪЧИТЕЛНИ МЕРКИ ЗА СИГУРНОСТ:
- Внедрете 24/7 SOC мониторинг и SIEM корелация.
- Провеждайте регулярни симулации на фишинг атаки за служителите.
- Извършвайте автоматични сканирания за уязвимости (CVE) в инфраструктурата.
==================================================
Защитено изчисление съгласно европейските директиви.
              `.trim();

              const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `DefComs_Compliance_Report.txt`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              alert("📄 Официалният доклад за NIS2 & DORA съответствие бе генериран успешно!");
            }}
            className="bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 font-bold px-6 py-3 rounded-lg text-sm transition flex items-center justify-center gap-1.5"
          >
            Свали одитния доклад
          </button>
          <button
            onClick={handleReset}
            className="border-2 border-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Ново изчисление
          </button>
          <Link href="/contact" className="inline-block">
            <button className="w-full bg-[#f22020] hover:bg-red-700 text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Безплатен одит от експерт
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const step = steps[currentStep];
  const currentKey = currentStep === 0 ? "employees" : currentStep === 1 ? "revenue" : currentStep === 2 ? "sector" : "financial";
  const selectedValue = answers[currentKey];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      {showResults ? (
        getResultsUI()
      ) : (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold tracking-wider pb-4 border-b border-slate-800">
            <span>СТЪПКА {currentStep + 1} ОТ {steps.length}</span>
            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded transition-all duration-300 ${
                    idx === currentStep ? "bg-[#0098b2]" : idx < currentStep ? "bg-green-500" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">{step.title}</h2>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {step.options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`p-5 rounded-xl border cursor-pointer transition transform hover:scale-[1.01] flex flex-col justify-between ${
                  selectedValue === option.value
                    ? "bg-[#0098b2]/10 border-[#0098b2] text-white shadow-lg shadow-[#0098b2]/10"
                    : "bg-slate-950/60 border-slate-800 text-gray-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="font-bold text-sm mb-1">{option.label}</div>
                  {option.desc && <p className="text-xs text-gray-400 leading-relaxed">{option.desc}</p>}
                </div>
                {selectedValue === option.value && (
                  <div className="self-end mt-2 bg-[#0098b2] text-white p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Back / Next actions */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-800">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                currentStep === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Назад
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedValue}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                selectedValue
                  ? "bg-[#0098b2] hover:bg-cyan-600 text-white"
                  : "bg-slate-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentStep === steps.length - 1 ? "Резултати" : "Напред"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

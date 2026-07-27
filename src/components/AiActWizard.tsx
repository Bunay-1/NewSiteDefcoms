"use client";

import { useState } from "react";
import { ShieldAlert, Check, ArrowRight, HelpCircle, AlertTriangle, CheckCircle, Info, RefreshCw, Send, Sparkles, Brain } from "lucide-react";
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

export default function AiActWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    purpose: "",
    biometrics: "",
    userImpact: "",
    generative: "",
  });
  const [showResults, setShowResults] = useState(false);

  const steps: QuestionStep[] = [
    {
      title: "Цел и област на приложение на AI",
      description: "Каква е основната роля и предназначение на Вашата система с Изкуствен Интелект?",
      options: [
        {
          label: "Критична инфраструктура или медицински софтуер",
          value: "high_critical",
          desc: "Контрол на пътна мрежа, водоснабдяване, електроразпределение или диагностично оборудване"
        },
        {
          label: "Управление на персонал или образование",
          value: "hr_education",
          desc: "Автоматично сортиране на автобиографии, оценка на кандидати или оценяване на студенти"
        },
        {
          label: "Чатботове, генеративен AI или превод",
          value: "generative_general",
          desc: "Генериране на текстове, изображения, обслужване на клиенти (Чатбот) или AI Sentinel"
        },
        {
          label: "Социално оценяване или следене в реално време",
          value: "unacceptable_social",
          desc: "Оценка на благонадеждност от държавни органи или масово разпознаване на лица"
        },
      ],
    },
    {
      title: "Използване на биометрични данни",
      description: "Обработва ли Вашата AI система биометрични данни или данни за разпознаване на емоции?",
      options: [
        {
          label: "Да, за масова идентификация на обществени места",
          value: "unacceptable_biometrics",
          desc: "Дистанционно разпознаване на лица в реално време от разстояние"
        },
        {
          label: "Да, за локална оторизация или идентификация",
          value: "high_biometrics_local",
          desc: "Контрол на достъп през FaceID / Пръстов отпечатък на конкретно устройство"
        },
        {
          label: "Не, не обработваме биометрични данни",
          value: "no_biometrics",
          desc: "Няма заснемане или анализ на физиологични белези"
        },
      ],
    },
    {
      title: "Генеративен Изкуствен Интелект (LLM)",
      description: "Базирана ли е системата Ви на големи езикови модели (LLMs) за създаване на съдържание?",
      options: [
        {
          label: "Да, генерираме текстове, кодове или изображения на живо",
          value: "yes_generative",
          desc: "Създаване на съдържание, което може да влияе или да се ползва от крайни потребители"
        },
        {
          label: "Не, използваме само статични класификатори / аналитичен AI",
          value: "no_generative",
          desc: "Анализ на данни, прогнозиране на продажби или филтриране на спам"
        },
      ],
    },
  ];

  const handleOptionSelect = (value: string) => {
    const key = currentStep === 0 ? "purpose" : currentStep === 1 ? "biometrics" : "generative";
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
      purpose: "",
      biometrics: "",
      userImpact: "",
      generative: "",
    });
    setCurrentStep(0);
    setShowResults(false);
  };

  const calculateRiskCategory = () => {
    const isUnacceptable =
      answers.purpose === "unacceptable_social" ||
      answers.biometrics === "unacceptable_biometrics";

    const isHighRisk =
      answers.purpose === "high_critical" ||
      answers.purpose === "hr_education" ||
      answers.biometrics === "high_biometrics_local";

    const isLimitedRisk = answers.generative === "yes_generative" || answers.purpose === "generative_general";

    if (isUnacceptable) return "unacceptable";
    if (isHighRisk) return "high";
    if (isLimitedRisk) return "limited";
    return "minimal";
  };

  const getResultsUI = () => {
    const risk = calculateRiskCategory();

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 bg-[#0098b2]/20 text-[#0098b2] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#0098b2]/30 animate-pulse">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Вашият AI Act Рисков Профил</h2>
          <p className="text-gray-400 text-sm">Въз основа на регламента на Европейския съюз, Вашата система се класифицира като:</p>
        </div>

        {/* Results Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          {risk === "unacceptable" && (
            <div className="space-y-4">
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-[#f22020] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-[#f22020] text-lg">Неприемлив риск (Забранени AI системи)</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Тези системи са напълно забранени за внедряване в ЕС. Включват следене от държавни органи, оценяване на граждани и скрито влияние върху човешкото поведение. Всяко нарушение може да доведе до глоба до **35 млн. €** или **7% от годишния оборот**.
                  </p>
                </div>
              </div>
            </div>
          )}

          {risk === "high" && (
            <div className="space-y-4">
              <div className="p-4 bg-orange-950/40 border border-orange-500/30 rounded-xl flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-orange-400 text-lg">Висок риск (High-Risk AI Systems)</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Вашата система попада под строга регулация и изисква съответствие преди пускане на пазара. Нарушенията могат да доведат до глоби до **15 млн. €** или **3% от глобалния оборот**.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-sm">Задължителни стъпки и контроли:</h5>
                <ul className="text-xs text-gray-400 space-y-2 pl-2 border-l border-[#0098b2]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Внедряване на Система за управление на риска (КИ киберсигурност)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Високо качество на тренировъчните масиви (без дискриминация)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Изграждане на прозрачност и възможност за човешки надзор (Human Oversight)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Постоянен запис на логове за проследимост на решенията (Logging)</li>
                </ul>
              </div>
            </div>
          )}

          {risk === "limited" && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-start gap-4">
                <Info className="w-6 h-6 text-[#0098b2] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-[#0098b2] text-lg">Ограничен риск (Limited Risk)</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Вашата система има леки изисквания за прозрачност. Потребителите трябва изрично да знаят, че си взаимодействат с Изкуствен Интелект.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-sm">Задължителни мерки:</h5>
                <ul className="text-xs text-gray-400 space-y-2 pl-2 border-l border-teal-500">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Маркиране на съдържанието като AI генерирано (Watermarking)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /> Потребителско съгласие преди стартиране на чатбота</li>
                </ul>
              </div>
            </div>
          )}

          {risk === "minimal" && (
            <div className="space-y-4">
              <div className="p-4 bg-green-950/40 border border-green-500/30 rounded-xl flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-green-400 text-lg">Минимален риск (Minimal Risk)</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Системи като видеоигри или филтри за спам. Те не са обект на допълнителни правни ограничения по новия регламент. Препоръчва се доброволно спазване на добри практики.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DefComs Support */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0098b2]" />
            Решения от DefComs по AI Act & ISO 42001
          </h3>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Нашите експерти по сигурност на изкуствения интелект ще Ви помогнат да сертифицирате своите алгоритми по стандарта <strong>ISO 42001 (Artificial Intelligence Management System)</strong> и да изградите нужните логове за съвместимост с регулациите.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/contact" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-[#0098b2] transition">
              <h4 className="font-bold text-white text-sm">Консултация за ISO 42001</h4>
              <p className="text-xs text-gray-400 mt-1">Пълна подготовка за сертификационен одит на ИТ компанията Ви.</p>
            </Link>
            <Link href="/products/soc-platform" className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-red-500 transition">
              <h4 className="font-bold text-white text-sm">24/7 AI Мониторинг</h4>
              <p className="text-xs text-gray-400 mt-1">Следене на AI моделите за хакерски опити и инжектиране на промптове (Prompt Injection).</p>
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
              Консултация с експерт
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const step = steps[currentStep];
  const currentKey = currentStep === 0 ? "purpose" : currentStep === 1 ? "biometrics" : "generative";
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
                  className={`w-8 h-1.5 rounded transition-all duration-300 ${
                    idx === currentStep ? "bg-[#0098b2]" : idx < currentStep ? "bg-green-500" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">{step?.title}</h2>
            <p className="text-gray-400 text-sm">{step?.description}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {step?.options.map((option) => (
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

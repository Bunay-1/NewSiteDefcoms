"use client";

import { useState } from "react";
import { Mail, Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, RotateCcw, AlertCircle, HelpCircle, Trophy } from "lucide-react";
import Link from "next/link";

interface PhishingScenario {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  body: React.ReactNode;
  isPhishing: boolean;
  redFlags: string[];
  explanation: string;
}

export default function PhishingTrainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, boolean>>({}); // scenarioId -> isPhishing selected
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenarios: PhishingScenario[] = [
    {
      id: 1,
      sender: "Национална Агенция за Приходите (НАП)",
      senderEmail: "notifications@nap-gov-bg.com",
      subject: "Спешно: Неизплатени задължения и данъчна глоба",
      date: "Днес, 09:15 ч.",
      body: (
        <div className="space-y-3 font-sans text-sm text-slate-800">
          <p className="font-bold">Уважаеми данъкоплатец,</p>
          <p>
            При автоматична проверка на Вашето досие за изминалата финансова година бяха установени несъответствия на стойност <span className="font-bold text-red-600">345.20 лв</span>.
          </p>
          <p>
            Молим да изплатите дължимата сума в рамките на <span className="font-bold">24 часа</span> чрез прикачения портал, за да избегнете съдебно преследване и блокиране на банкови сметки.
          </p>
          <div className="my-4 text-center">
            <span className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer hover:bg-blue-700">
              Плати данъка сигурно онлайн
            </span>
          </div>
          <p className="text-xs text-gray-500">С уважение,<br />Екипът на НАП България</p>
        </div>
      ),
      isPhishing: true,
      redFlags: [
        "Грешен домейн на изпращача: 'nap-gov-bg.com' вместо официалния 'nap.bg'.",
        "Прекалена спешност и заплахи за съд в рамките на 24 часа.",
        "Бутон, водещ към директно плащане на данъци с банкова карта вместо банков превод към БНБ."
      ],
      explanation: "Държавни институции като НАП никога не изпращат спешни линкове за плащане с дебитна/кредитна карта и използват само официалните си домейни, завършващи на '.bg'."
    },
    {
      id: 2,
      sender: "Microsoft Security Team",
      senderEmail: "no-reply@microsoft.com",
      subject: "Microsoft account password reset confirmation",
      date: "Вчера, 14:32 ч.",
      body: (
        <div className="space-y-3 font-sans text-sm text-slate-800">
          <p>Hi user,</p>
          <p>
            The password for your Microsoft account <span className="font-bold">info@company.com</span> was successfully changed on <span className="font-semibold">10/11/2024 12:30 PM (UTC)</span>.
          </p>
          <p>
            If this was you, then you can safely ignore this email.
          </p>
          <p>
            If this wasn't you, your account might have been compromised. Please secure your account by reviewing your security activity.
          </p>
          <div className="my-4">
            <span className="text-blue-600 underline font-semibold cursor-pointer">
              Review recent activity
            </span>
          </div>
          <p className="text-xs text-gray-500">Thanks,<br />The Microsoft account team</p>
        </div>
      ),
      isPhishing: false,
      redFlags: [],
      explanation: "Това е напълно легитимен служебен имейл от Microsoft. Изпратен е от официалния сертифициран домейн 'microsoft.com' и съдържа стандартно уведомление без опити за събиране на пароли на нерегламентирани страници."
    },
    {
      id: 3,
      sender: "УниКредит Булбанк",
      senderEmail: "support-bulbank@cyber-sec-update.net",
      subject: "ВАЖНО: Обновяване на Вашето активно онлайн банкиране",
      date: "Днес, 11:02 ч.",
      body: (
        <div className="space-y-3 font-sans text-sm text-slate-800">
          <p className="font-semibold">Уважаеми клиенти,</p>
          <p>
            Във връзка с новите регулаторни изисквания за двуфакторна автентикация (PSD2) е необходимо незабавно да потвърдите телефонния си номер и парола.
          </p>
          <p>
            Ако не завършите процеса по верификация, достъпът до Вашите сметки ще бъде преустановен за неопределено време.
          </p>
          <div className="my-3 text-center">
            <span className="inline-block bg-green-700 text-white font-bold py-2 px-5 rounded cursor-pointer">
              Влез в Булбанк Онлайн и Потвърди
            </span>
          </div>
          <p className="text-xs text-gray-400">Това е автоматично съобщение. Моля не отговаряйте.</p>
        </div>
      ),
      isPhishing: true,
      redFlags: [
        "Фалшив имейл домейн: 'cyber-sec-update.net' вместо 'unicreditbulbank.bg'.",
        "Заплаха за блокиране на банкови сметки.",
        "Искане за въвеждане на чувствителни данни за достъп през линк в имейл."
      ],
      explanation: "Банките НИКОГА не ви изпращат имейли с линкове, изискващи да въведете пароли, ПИН кодове или данни за онлайн банкиране. Винаги достъпвайте банкирането си през официалното мобилно приложение или директно въвеждане на URL адреса."
    },
    {
      id: 4,
      sender: "Google Workspace Team",
      senderEmail: "workspace-noreply@google.com",
      subject: "Запълнено пространство за съхранение в Google Drive",
      date: "Преди 2 дни",
      body: (
        <div className="space-y-3 font-sans text-sm text-slate-800">
          <p>Здравейте,</p>
          <p>
            Вашият Google акаунт използва <span className="font-bold text-red-600">96% (14.4 GB от 15 GB)</span> от наличното си пространство за съхранение.
          </p>
          <p>
            Ако запълните лимита си, няма да можете да получавате нови имейли в Gmail, както и да качвате нови файлове в Drive.
          </p>
          <p>
            Можете да разгледате текущите си големи файлове или да освободите място по всяко време.
          </p>
          <div className="my-3">
            <span className="inline-block border border-slate-300 text-gray-700 hover:bg-gray-50 font-semibold py-1.5 px-4 rounded cursor-pointer text-xs">
              Управление на хранилището
            </span>
          </div>
          <p className="text-xs text-gray-400">Google Cloud Platform Services</p>
        </div>
      ),
      isPhishing: false,
      redFlags: [],
      explanation: "Това е легитимно предупреждение от Google за изчерпване на квотата ви. Имейлът идва от легитимния домейн 'google.com' и не съдържа агресивни фишинг индикатори."
    }
  ];

  const handleAnswer = (choice: boolean) => {
    const scenario = scenarios[currentStep];
    const isCorrect = choice === scenario.isPhishing;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [scenario.id]: choice
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const currentScenario = scenarios[currentStep];
  const userChoice = selectedAnswers[currentScenario.id];
  const isCorrectChoice = userChoice !== undefined && userChoice === currentScenario.isPhishing;

  // Final Assessment
  let feedbackTitle = "Новобранец в сигурността";
  let feedbackDesc = "Трябва да сте изключително внимателни. Изпуснахте важни уловки, които биха коствали сериозен пробив на Вашата фирма.";
  let badgeColor = "text-red-400 border-red-500/30 bg-red-500/10";

  if (score === 3) {
    feedbackTitle = "Бдителен служител";
    feedbackDesc = "Много добър резултат! Разпознахте повечето заплахи, но все пак има малки детайли, които можете да пренебрегнете под стрес.";
    badgeColor = "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
  } else if (score === 4) {
    feedbackTitle = "Кибер Шампион";
    feedbackDesc = "Перфектен резултат! Вие имате отлично око за фишинг уловки и подозрителни домейни. Вашата бдителност предпазва бизнеса.";
    badgeColor = "text-green-400 border-green-500/30 bg-green-500/10";
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-10 text-white max-w-5xl mx-auto">
      {!isFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left panel: Email Interface */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#0098b2] uppercase tracking-wider">
                Казус {currentStep + 1} от {scenarios.length}
              </span>
              <span className="text-xs text-gray-500">
                Точки: {score} / {scenarios.length}
              </span>
            </div>

            {/* Email Client Shell */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              {/* Header */}
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                <div className="bg-slate-300 p-2 rounded-full text-slate-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-slate-800 text-sm truncate">{currentScenario.sender}</span>
                    <span className="text-xs text-gray-500 font-mono truncate">&lt;{currentScenario.senderEmail}&gt;</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Относно: <span className="font-semibold text-slate-800">{currentScenario.subject}</span>
                  </div>
                </div>
              </div>

              {/* Meta details */}
              <div className="bg-slate-50 px-6 py-2 border-b border-slate-150 text-[11px] text-gray-500 flex justify-between">
                <span>До: Вашата пощенска кутия</span>
                <span>Изпратено на: {currentScenario.date}</span>
              </div>

              {/* Body */}
              <div className="p-8 min-h-[220px]">
                {currentScenario.body}
              </div>
            </div>
          </div>

          {/* Right panel: Game Interaction & Explanations */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0098b2]" />
                Вашата оценка?
              </h3>

              {!showExplanation ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    Внимателно анализирайте адреса на изпращача, връзките в текста и стила на изказ. Имейлът е фишинг или легитимен?
                  </p>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="w-full bg-red-600/90 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-lg shadow-red-600/10"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Това е ФИШИНГ!
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3.5 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Напълно безопасен е
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3">
                    {isCorrectChoice ? (
                      <div className="flex items-center gap-1.5 text-green-400 font-bold text-sm">
                        <CheckCircle className="w-5 h-5" />
                        Правилен отговор!
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
                        <XCircle className="w-5 h-5" />
                        Грешен отговор
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {currentScenario.explanation}
                  </p>

                  {currentScenario.redFlags.length > 0 && (
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-750 mt-3">
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Червени флагове в имейла:
                      </h4>
                      <ul className="space-y-2 text-[11px] text-gray-400">
                        {currentScenario.redFlags.map((flag, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-red-500 font-black mt-0.5">•</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    className="w-full bg-[#0098b2] hover:bg-cyan-600 text-white font-extrabold py-3 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2"
                  >
                    {currentStep < scenarios.length - 1 ? "Следващ имейл" : "Виж резултатите"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500 text-center">
              Фишинг симулациите повишават защитата на фирмата от вируси и рансъмуер с над 70%.
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6">
            <Trophy className="w-20 h-20 text-yellow-400 animate-bounce" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Приключихте обучението!</h3>
          <p className="text-sm text-gray-400 mb-6">
            Вашият резултат е <span className="text-white font-bold">{score} от {scenarios.length}</span> верни отговора.
          </p>

          <div className={`inline-block border px-6 py-2 rounded-full font-extrabold text-lg uppercase tracking-wider mb-6 ${badgeColor}`}>
            {feedbackTitle}
          </div>

          <p className="text-gray-300 mb-8 text-sm leading-relaxed">
            {feedbackDesc}
          </p>

          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/60 text-left mb-8 space-y-3">
            <h4 className="text-white font-bold text-base">Защо Phishing обученията са жизненоважни за Вашия бизнес?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Над 85% от успешните кибератаки в България започват с единичен фишинг имейл до нищо неподозиращ служител. Нашите корпоративни симулации и обучения учат Вашите служители на бдителност по забавен и практичен начин.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 border border-slate-600 hover:border-white text-gray-400 hover:text-white px-6 py-3 rounded-lg transition text-sm font-semibold focus:outline-none"
            >
              <RotateCcw className="w-4 h-4" />
              Стартирай отново
            </button>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-[#f22020] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20">
                Заявете корпоративно обучение
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, ArrowRight, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: { text: string; points: number }[];
}

export default function RiskCalculator() {
  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "В кой бизнес сектор оперира вашата организация?",
      options: [
        { text: "Критична инфраструктура (Енергетика, Транспорт, Здравеопазване, Водоснабдяване)", points: 5 },
        { text: "Финансови услуги, Банково дело, Застраховане (DORA обхват)", points: 4 },
        { text: "Публична администрация, Цифрови услуги, Производство", points: 3 },
        { text: "Търговия, Услуги, Маркетинг, Образование", points: 1 }
      ]
    },
    {
      id: 2,
      text: "Какъв е приблизителният брой служители във вашата фирма?",
      options: [
        { text: "Над 250 служители (Голямо предприятие - висок риск)", points: 4 },
        { text: "50 - 250 служители (Средно предприятие)", points: 3 },
        { text: "10 - 49 служители (Малко предприятие)", points: 2 },
        { text: "Под 10 служители (Микропредприятие)", points: 1 }
      ]
    },
    {
      id: 3,
      text: "Имате ли внедрена и тествана процедура за архивиране (Backup) на данните?",
      options: [
        { text: "Да, ежедневни автоматични архиви, криптирани и съхранявани офлайн/външно", points: 0 },
        { text: "Имаме архиви, но не се тестват редовно или са само локални", points: 2 },
        { text: "Не, нямаме редовна или надеждна процедура за архивиране", points: 4 }
      ]
    },
    {
      id: 4,
      text: "Провеждат ли се регулярни симулации за Phishing и обучения по киберсигурност на служителите?",
      options: [
        { text: "Да, провеждаме интерактивни обучения и симулации поне веднъж годишно", points: 0 },
        { text: "Обучаваме само нови служители при постъпване", points: 2 },
        { text: "Не сме провеждали обучения по киберсигурност досега", points: 4 }
      ]
    },
    {
      id: 5,
      text: "Имате ли система за денонощен (24/7) мониторинг на мрежата и сървърите за инциденти?",
      options: [
        { text: "Да, имаме вътрешен или външен SOC (Security Operations Center)", points: 0 },
        { text: "Имаме бавни антивирусни решения, които проверяваме ръчно", points: 2 },
        { text: "Нямаме никакъв активен мониторинг на сигурността в реално време", points: 4 }
      ]
    }
  ];

  const handleAnswerSelect = (points: number) => {
    const newAnswers = [...selectedAnswers, points];
    setSelectedAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetCalculator = () => {
    setStep(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const totalPoints = selectedAnswers.reduce((sum, current) => sum + current, 0);

  // Risk Classification
  let riskLevel = "Нисък";
  let riskColor = "text-green-400 border-green-500/30 bg-green-500/10";
  let riskDesc = "Вашата организация има задоволително ниво на киберзащита, но винаги има място за подобрения.";
  let recommendations = [
    "Провеждайте редовни одити и автоматизирано сканиране за уязвимости (Vulnerability Scanning).",
    "Уверете се, че вашите резервни копия са напълно защитени от Ransomware.",
    "Продължавайте обученията по сигурност на персонала."
  ];

  if (totalPoints >= 10 && totalPoints <= 15) {
    riskLevel = "Среден";
    riskColor = "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    riskDesc = "Налице са сериозни пропуски в защитата. Организацията ви е уязвима на Phishing и Ransomware атаки.";
    recommendations = [
      "Внедрете SIEM решение за централизирано събиране и анализ на мрежови събития.",
      "Въведете детайлни политики за сигурност и съответствие с GDPR/NIS2.",
      "Препоръчваме Endpoint Protection на всички работни станции."
    ];
  } else if (totalPoints > 15) {
    riskLevel = "Висок";
    riskColor = "text-red-400 border-red-500/30 bg-red-500/10";
    riskDesc = "Организацията ви е в критична опасност от кибератаки и не съответства на европейските директиви за киберсигурност.";
    recommendations = [
      "Спешно внедряване на 24/7 SOC Платформа за мониторинг и автоматизирана реакция.",
      "Провеждане на незабавен професионален пентестинг (Penetration Testing) за откриване на дупки в сигурността.",
      "Изготвяне на цялостен план за реакция при инциденти съгласно NIS2/DORA директивите."
    ];
  }

  const progressPercentage = ((step + 1) / questions.length) * 100;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-700">
        <div
          className="h-full bg-gradient-to-r from-[#0098b2] to-[#f22020] transition-all duration-300"
          style={{ width: `${showResult ? 100 : progressPercentage}%` }}
        ></div>
      </div>

      {!showResult ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-[#0098b2] tracking-wider uppercase">
              Калкулатор за оценка на риска
            </span>
            <span className="text-gray-400 text-sm">
              Въпрос {step + 1} от {questions.length}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-8 min-h-[64px] leading-snug">
            {questions[step].text}
          </h3>

          <div className="space-y-4">
            {questions[step].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(option.points)}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 text-gray-200 hover:text-white border border-slate-600 hover:border-[#0098b2] p-5 rounded-xl transition duration-200 flex items-center justify-between group focus:outline-none"
              >
                <span className="font-medium text-base pr-4">{option.text}</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0098b2] group-hover:translate-x-1 transition flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center mb-6">
            {riskLevel === "Висок" ? (
              <ShieldAlert className="w-20 h-20 text-red-500 animate-pulse" />
            ) : riskLevel === "Среден" ? (
              <AlertTriangle className="w-20 h-20 text-yellow-500 animate-pulse" />
            ) : (
              <ShieldCheck className="w-20 h-20 text-green-500" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Оценка на нивото на риск:</h3>
          <div className={`inline-block border px-6 py-2 rounded-full font-extrabold text-xl uppercase tracking-wider mb-6 ${riskColor}`}>
            {riskLevel} Риск
          </div>

          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            {riskDesc}
          </p>

          <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700 text-left max-w-xl mx-auto mb-8">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#0098b2]" />
              Нашите препоръки за вас:
            </h4>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#f22020] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={resetCalculator}
              className="flex items-center gap-2 border border-slate-600 hover:border-white text-gray-400 hover:text-white px-6 py-3 rounded-lg transition text-sm font-semibold focus:outline-none"
            >
              <RotateCcw className="w-4 h-4" />
              Повтори теста
            </button>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-[#f22020] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20">
                Заявете безплатна консултация
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

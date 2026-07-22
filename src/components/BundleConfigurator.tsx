"use client";

import { useState, useEffect } from "react";
import { Shield, Check, Info, ArrowRight, Server, Eye, Search, AlertCircle, FileText, Send, Sparkles } from "lucide-react";
import Link from "next/link";

interface SecurityModule {
  id: string;
  name: string;
  description: string;
  category: string;
  coveragePoints: number; // contribution to coverage percentage
  difficultyMultiplier: number; // how critical it is
  basePrice: number; // EUR per month
  icon: any;
}

export default function BundleConfigurator() {
  const [selectedModules, setSelectedModules] = useState<string[]>(["soc", "siem"]); // Default selected
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });

  const modules: SecurityModule[] = [
    {
      id: "soc",
      name: "Денонощен SOC (24/7 Monitoring)",
      description: "Непрекъснат мониторинг от нашия екип от анализатори за улавяне на заплахи в реално време.",
      category: "Мониторинг & Анализ",
      coveragePoints: 30,
      difficultyMultiplier: 1.5,
      basePrice: 750,
      icon: Eye
    },
    {
      id: "siem",
      name: "SIEM Платформа (Log Management)",
      description: "Централизирано събиране и корелация на логове и мрежови събития.",
      category: "Мониторинг & Анализ",
      coveragePoints: 20,
      difficultyMultiplier: 1.2,
      basePrice: 450,
      icon: Server
    },
    {
      id: "endpoint",
      name: "Endpoint Detection & Response (EDR)",
      description: "Защита от следващо поколение за всички работни станции и лаптопи.",
      category: "Endpoint Сигурност",
      coveragePoints: 15,
      difficultyMultiplier: 1.0,
      basePrice: 200,
      icon: Shield
    },
    {
      id: "vuln",
      name: "Сканиране за уязвимости (Vulnerability Scanner)",
      description: "Автоматизирано периодично сканиране за остарели софтуери и системни дупки.",
      category: "Оценка на риска",
      coveragePoints: 10,
      difficultyMultiplier: 0.8,
      basePrice: 150,
      icon: Search
    },
    {
      id: "pentest",
      name: "Професионален Пентест (Penetration Testing)",
      description: "Симулирана реална хакерска атака за оценка на защитните механизми (веднъж годишно).",
      category: "Оценка на риска",
      coveragePoints: 15,
      difficultyMultiplier: 1.3,
      basePrice: 300,
      icon: AlertCircle
    },
    {
      id: "awareness",
      name: "Фишинг обучения & Симулации (Security Awareness)",
      description: "Обучение на персонала за разпознаване на опасни имейли и социално инженерство.",
      category: "Човешки фактор",
      coveragePoints: 10,
      difficultyMultiplier: 0.9,
      basePrice: 120,
      icon: FileText
    }
  ];

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      // Don't allow empty bundle
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  // Calculations
  const activeModules = modules.filter(m => selectedModules.includes(m.id));

  // Coverage score = sum of coveragePoints of active modules
  const rawCoverage = activeModules.reduce((sum, m) => sum + m.coveragePoints, 0);
  const coverageScore = Math.min(100, rawCoverage);

  // Total price calculations (apply a discount factor if multiple modules are selected)
  const rawPrice = activeModules.reduce((sum, m) => sum + m.basePrice, 0);
  const discountRate = selectedModules.length >= 5 ? 0.20 : selectedModules.length >= 3 ? 0.10 : 0;
  const totalPrice = Math.round(rawPrice * (1 - discountRate));

  // Security Assessment Label
  let assessmentText = "Слаба защита";
  let assessmentColor = "text-red-400 border-red-500/30 bg-red-500/10";
  if (coverageScore >= 50 && coverageScore < 80) {
    assessmentText = "Добра базова защита";
    assessmentColor = "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
  } else if (coverageScore >= 80) {
    assessmentText = "Максимална киберустойчивост";
    assessmentColor = "text-green-400 border-green-500/30 bg-green-500/10";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-10 text-white max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Left column: Module Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0098b2]" />
              Изберете Вашите Защитни Модули
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Маркирайте желаните решения, за да сглобите напълно персонализиран пакет за сигурност.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => {
              const isSelected = selectedModules.includes(mod.id);
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`text-left p-5 rounded-2xl border transition duration-200 flex flex-col justify-between group focus:outline-none ${
                    isSelected
                      ? "bg-slate-800/80 border-[#0098b2] shadow-lg shadow-[#0098b2]/5"
                      : "bg-slate-800/20 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/40"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#0098b2]/20 text-[#0098b2]" : "bg-slate-700/40 text-gray-400 group-hover:text-white"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#0098b2] border-[#0098b2]" : "border-slate-600 group-hover:border-slate-500"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0098b2] uppercase tracking-wider block mb-1">
                      {mod.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#0098b2] transition-colors mb-2">
                      {mod.name}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {mod.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center w-full pt-3 border-t border-slate-700/50 text-xs">
                    <span className="text-green-400 font-semibold">+{mod.coveragePoints}% Защита</span>
                    <span className="text-white font-bold">{mod.basePrice} €/мес.</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Dynamic Pricing & Form */}
        <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 mb-5">
              Анализ на Конфигурацията
            </h3>

            {/* Coverage Meter */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-gray-300">Ниво на покритие (Coverage Score):</span>
                <span className="text-2xl font-black text-[#0098b2]">{coverageScore}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-[#0098b2] transition-all duration-300"
                  style={{ width: `${coverageScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Спрямо най-добрите EU кибер практики</span>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 border rounded-full ${assessmentColor}`}>
                  {assessmentText}
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 space-y-3 mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Калкулация на месечен абонамент</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Избрани модули ({activeModules.length} бр.):</span>
                <span className="font-semibold text-white">{rawPrice} €/мес.</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Обемна отстъпка ({(discountRate * 100)}%):</span>
                  <span>-{Math.round(rawPrice * discountRate)} €/мес.</span>
                </div>
              )}
              <div className="border-t border-slate-700 pt-3 flex justify-between items-end">
                <span className="text-sm font-bold text-white">Индикативна цена:</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-green-400">{totalPrice} €</span>
                  <span className="text-[10px] text-gray-400 block">/ месец</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead capture form */}
          <div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Изпратете ни избраната конфигурация
                </h4>
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Вашето име *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-[#0098b2]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Имейл адрес *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-[#0098b2]"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Телефонен номер"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-[#0098b2]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Фирма / Организация"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-[#0098b2]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0098b2] to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10"
                >
                  Изпрати пакет за одобрение
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl text-center">
                <Check className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">Успешно изпратена конфигурация!</h4>
                <p className="text-xs text-gray-400 mb-4">
                  Нашите архитекти по киберсигурност ще се свържат с Вас до 2 часа с официално ценово предложение.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#0098b2] hover:underline font-semibold"
                >
                  Коригирайте конфигурацията
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

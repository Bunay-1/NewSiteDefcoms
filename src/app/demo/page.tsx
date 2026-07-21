"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Terminal, Server, Shield, Database, WifiOff, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LogMessage {
  time: string;
  type: "info" | "warning" | "danger" | "success";
  text: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  steps: {
    delay: number;
    log: string;
    logType: "info" | "warning" | "danger" | "success";
    status: string;
    defenseProgress: number;
  }[];
}

export default function DemoPage() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [currentStatus, setCurrentStatus] = useState("В готовност");
  const [systemHealth, setSystemHealth] = useState(100);
  const [blockedThreatsCount, setBlockedThreatsCount] = useState(1480);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scenarios: Record<string, Scenario> = {
    ddos: {
      id: "ddos",
      name: "DDoS Атака",
      description: "Огромна вълна от фалшиви заявки към главния уеб сървър",
      steps: [
        { delay: 500, log: "Инициализиране на симулация: DDoS Атака...", logType: "info", status: "Стартиране", defenseProgress: 0 },
        { delay: 1500, log: "ВНИМАНИЕ: Необичайно висок трафик от 15,000+ уникални IP адреса от чужбина.", logType: "warning", status: "Анализ на трафик", defenseProgress: 10 },
        { delay: 3000, log: "КРИТИЧНО: Натоварването на CPU скача на 98%. Главният уеб сървър започва да забавя.", logType: "danger", status: "Претоварване", defenseProgress: 20 },
        { delay: 4500, log: "DefComs SOC засича DDoS модел чрез AI анализ на аномалиите.", logType: "success", status: "SOC Засичане", defenseProgress: 40 },
        { delay: 6000, log: "АКТИВИРАНЕ НА ЗАЩИТА: Автоматично филтриране и пренасочване на злонамерения трафик чрез Cloud scrubbing център.", logType: "info", status: "Филтриране", defenseProgress: 65 },
        { delay: 7500, log: "Ограничаване на скоростта (Rate Limiting) задействано за уязвими API крайни точки.", logType: "info", status: "Ограничаване", defenseProgress: 85 },
        { delay: 9000, log: "УСПЕХ: Всички злонамерени IP адреси (Botnet) са блокирани. Натоварването на сървъра се нормализира до 12%.", logType: "success", status: "Защитен", defenseProgress: 100 }
      ]
    },
    ransomware: {
      id: "ransomware",
      name: "Ransomware Инфекция",
      description: "Опит за стартиране на криптиращ зловреден софтуер на работно място",
      steps: [
        { delay: 500, log: "Инициализиране на симулация: Ransomware атака...", logType: "info", status: "Стартиране", defenseProgress: 0 },
        { delay: 1500, log: "ПОДОЗРИТЕЛНО: Служител от отдел Финанси отваря неизвестен прикачен файл 'invoice.exe'.", logType: "warning", status: "Изпълнение на файл", defenseProgress: 15 },
        { delay: 3000, log: "КРИТИЧНО: Стартира се криптиращ процес. Опит за модификация на важни системни файлове (Shadow Copies).", logType: "danger", status: "Криптиране в ход", defenseProgress: 30 },
        { delay: 4500, log: "DefComs Endpoint Protection блокира изпълнението на процеса въз основа на поведенчески анализ.", logType: "success", status: "EDR Блокиране", defenseProgress: 60 },
        { delay: 6000, log: "SOC Платформата автоматично ИЗОЛИРА инфектираната работна станция от локалната мрежа за предотвратяване на lateral movement.", logType: "success", status: "Изолиране на хост", defenseProgress: 80 },
        { delay: 7500, log: "Автоматично активиране на възстановяването от последен криптиран архив офлайн.", logType: "info", status: "Възстановяване", defenseProgress: 95 },
        { delay: 9000, log: "УСПЕХ: Ransomware софтуерът е напълно неутрализиран. Работната станция е почистена. Данните са възстановени.", logType: "success", status: "Защитен", defenseProgress: 100 }
      ]
    },
    phishing: {
      id: "phishing",
      name: "Phishing Кампания",
      description: "Масова фишинг кампания, насочена към кражба на пароли на администратори",
      steps: [
        { delay: 500, log: "Инициализиране на симулация: Фишинг кампания...", logType: "info", status: "Стартиране", defenseProgress: 0 },
        { delay: 1500, log: "ВНИМАНИЕ: Засечен масов имейл трафик с фалшив домейн, имитиращ Microsoft Office 365 login.", logType: "warning", status: "Засичане на имейли", defenseProgress: 20 },
        { delay: 3000, log: "КРИТИЧНО: 3-ма потребители са кликнали на линка и са въвели своите корпоративни данни.", logType: "danger", status: "Компрометиране", defenseProgress: 40 },
        { delay: 4500, log: "DefComs Email Gateway блокира достъпа до фишинг линка на мрежово ниво за останалите служители.", logType: "success", status: "Email Gateway Блокиране", defenseProgress: 70 },
        { delay: 6000, log: "Автоматична принудителна промяна на пароли и изискване за Мултифакторна автентикация (MFA) за засегнатите акаунти.", logType: "info", status: "Нулиране на сесии", defenseProgress: 90 },
        { delay: 7500, log: "УСПЕХ: Опитът за проникване е пресечен. Фишинг линкът е добавен в глобалния IOC черен списък на Threat Intelligence.", logType: "success", status: "Защитен", defenseProgress: 100 }
      ]
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const addLog = (text: string, type: "info" | "warning" | "danger" | "success") => {
    const timeString = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time: timeString, type, text }]);
  };

  const startSimulation = (scenarioId: string) => {
    if (isPlaying) return;

    setActiveScenario(scenarioId);
    setIsPlaying(true);
    setProgress(0);
    setLogs([]);
    setSystemHealth(100);

    const scenario = scenarios[scenarioId];
    addLog(`Стартиране на симулация за ${scenario.name}...`, "info");

    scenario.steps.forEach((step) => {
      setTimeout(() => {
        addLog(step.log, step.logType);
        setProgress(step.defenseProgress);
        setCurrentStatus(step.status);

        if (step.logType === "danger") {
          setSystemHealth(45);
        } else if (step.logType === "success" && step.defenseProgress > 50) {
          setSystemHealth(prev => Math.min(prev + 20, 100));
        }

        if (step.defenseProgress === 100) {
          setIsPlaying(false);
          setBlockedThreatsCount(prev => prev + 1);
        }
      }, step.delay);
    });
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "danger": return "text-red-400";
      case "warning": return "text-yellow-400";
      case "success": return "text-green-400";
      default: return "text-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 px-4 pb-20 font-mono">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0098b2]/30 bg-[#0098b2]/10 text-[#0098b2] mb-4 text-xs font-semibold uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#0098b2] rounded-full animate-ping"></span>
            SOC Интерактивно Демо
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight font-sans">
            Симулатор на Кибератаки & Защита
          </h1>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto text-base">
            Натиснете бутона „Изпълни“, за да тествате как автоматизираната SOC платформа на DefComs разпознава и блокира заплахите в реално време.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Controls & Scenarios */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 font-sans flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0098b2]" />
                Избор на сценарий
              </h2>

              <div className="space-y-4">
                {Object.values(scenarios).map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`border rounded-xl p-5 transition duration-200 ${
                      activeScenario === scenario.id
                        ? "border-[#0098b2] bg-[#0098b2]/5"
                        : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
                    }`}
                  >
                    <h3 className="text-white font-bold text-lg mb-2 font-sans">{scenario.name}</h3>
                    <p className="text-gray-400 text-xs mb-4 font-sans leading-relaxed">{scenario.description}</p>
                    <button
                      disabled={isPlaying}
                      onClick={() => startSimulation(scenario.id)}
                      className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 focus:outline-none ${
                        isPlaying
                          ? "bg-slate-800 text-gray-500 cursor-not-allowed"
                          : "bg-[#0098b2] hover:bg-[#005f7f] text-white"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Изпълни симулация
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <Server className="w-5 h-5 text-[#f22020]" />
                Статус на системите
              </h2>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2 text-gray-400">
                  <span>ЗДРАВЕ НА СЪРВЪРА</span>
                  <span className={systemHealth < 50 ? "text-red-400 font-bold" : "text-green-400"}>
                    {systemHealth}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      systemHealth < 50 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${systemHealth}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950 p-4 rounded-lg text-center border border-slate-800">
                  <span className="text-gray-400 text-[10px] block uppercase font-sans">Статус</span>
                  <span className="text-white font-bold text-sm block mt-1 font-sans">{currentStatus}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg text-center border border-slate-800">
                  <span className="text-gray-400 text-[10px] block uppercase font-sans">Блокирани атаки</span>
                  <span className="text-green-400 font-bold text-sm block mt-1 font-sans">{blockedThreatsCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive terminal and visualization */}
          <div className="lg:col-span-2 space-y-6">

            {/* Simulation visualization console */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  SOC Терминал & Действия на DefComs
                </h2>
                {isPlaying && (
                  <span className="flex items-center gap-2 text-xs text-[#0098b2] font-semibold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    АКТИВЕН АНАЛИЗ...
                  </span>
                )}
              </div>

              {/* Progress bar of automated defense */}
              <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Процес на защита от SOC платформата
                  </span>
                  <span className="text-xs font-extrabold text-[#0098b2]">{progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0098b2] via-[#005f7f] to-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Console Logs Terminal */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 h-80 overflow-y-auto font-mono text-xs space-y-3 shadow-inner">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-gray-500 space-y-2">
                    <Terminal className="w-8 h-8 opacity-40 text-gray-400" />
                    <span className="font-sans">Изберете сценарий от контролите вляво, за да започне симулацията.</span>
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="flex gap-3 leading-relaxed border-b border-slate-900 pb-1.5">
                      <span className="text-gray-500 flex-shrink-0 select-none">[{log.time}]</span>
                      <span className={`${getLogColor(log.type)}`}>{log.text}</span>
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Simulated DefComs Protection Dashboard Card */}
            <div className="bg-gradient-to-br from-[#0098b2]/10 via-slate-900 to-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 font-sans flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#0098b2]" />
                Как DefComs ви предпазва в реалност?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                В реални условия нашата обединена платформа следи за промени в поведението на потребителите, необичаен мрежов трафик, уязвимости в контейнерите и системните логове. Благодарение на AI моделите за автоматизиран триаж, фалшивите аларми се намаляват, а реалните заплахи се блокират в рамките на милисекунди.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full bg-[#f22020] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-xs transition flex items-center justify-center gap-2 font-sans shadow-lg shadow-red-600/20">
                    Свържете се за безплатно проучване
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <button className="w-full border border-slate-700 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-lg font-bold text-xs transition font-sans">
                    Разгледайте продуктите
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

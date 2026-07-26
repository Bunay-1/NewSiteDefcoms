"use client";

import { Shield, Lock, Globe, CheckCircle, ArrowRight, Activity, Clock, Zap, Terminal, Radio, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ThreatChart, IncidentChart, ResponseTimeChart } from "@/components/SecurityChart";
import { useState, useEffect } from "react";

const MOCK_SOC_EVENTS = [
  "Засечен опит за SQL инжекция срещу Web Server #12. Автоматично блокиран от DefComs WAF.",
  "Изолиран опасен процес (Trojan.Generic) на Работна станция WS-402 от Endpoint Protection.",
  "Засечено сканиране за уязвимости (Port Scan) от IP 45.142.120.9. Източникът е филтриран.",
  "Корелация на събития: Множествени неуспешни опити за вход (Brute Force). IP адресът е блокиран за 24 часа.",
  "Блокиран неоторизиран опит за достъп без втори фактор (MFA) от необичайна геолокация.",
  "Автоматичен пач на критична уязвимост в Apache сървър, открита от Vulnerability Scanner.",
  "Идентифициран и блокиран фишинг имейл кампания, насочена към финансовия отдел.",
  "Необичаен трафик (Data Exfiltration) към неизвестен сървър. Системата автоматично изолира мрежовия сегмент.",
  "Актуализиране на IOC дефинициите в SIEM от емисията на Threat Intelligence.",
  "Успешно криптиране на системни логове съгласно стандартите на GDPR и NIS2."
];

const EVENT_TYPES = ["WAF-ALERT", "EDR-DETECT", "IPS-BLOCK", "SIEM-CORR", "MFA-FAIL", "SCANNER", "MAIL-SHIELD", "DLP-PREVENT", "THREAT-FEED", "GDPR-AUDIT"];

export default function Home() {
  const [socEvents, setSocEvents] = useState<{ id: number; time: string; type: string; msg: string }[]>([]);
  const [threatScore, setThreatScore] = useState(74);

  useEffect(() => {
    // Generate initial logs
    const initialLogs = Array.from({ length: 4 }).map((_, idx) => {
      const time = new Date(Date.now() - (4 - idx) * 15000);
      return {
        id: idx,
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: EVENT_TYPES[idx % EVENT_TYPES.length],
        msg: MOCK_SOC_EVENTS[idx % MOCK_SOC_EVENTS.length]
      };
    });
    setSocEvents(initialLogs);

    // Dynamic stream
    let count = 4;
    const interval = setInterval(() => {
      const newTime = new Date();
      const randomType = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
      const randomMsg = MOCK_SOC_EVENTS[Math.floor(Math.random() * MOCK_SOC_EVENTS.length)];

      setSocEvents(prev => [
        ...prev.slice(1),
        {
          id: count++,
          time: newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: randomType,
          msg: randomMsg
        }
      ]);

      // Fluctuate threat score slightly
      setThreatScore(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next > 95 ? 95 : next < 60 ? 60 : next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,152,178,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Киберсигурност от
            <span className="text-[#0098b2]"> ново поколение</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Защита на вашите цифрови активи с най-модерните технологии, изкуствен интелект и пълно съответствие с ЕС директиви
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-block">
              <button className="w-full bg-[#0098b2] hover:bg-[#005f7f] text-white px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2">
                Стартирайте Демо
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/products" className="inline-block">
              <button className="w-full border-2 border-[#0098b2] text-[#0098b2] hover:bg-[#0098b2] hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
                Разгледайте продуктите
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-20 bg-slate-800/40 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Пълно съответствие с EU директиви
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Нашите платформи и услуги покриват всички ключови регулаторни рамки и стандарти на Европейския съюз
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
            {[
              { name: "GDPR", color: "bg-blue-600/20 text-blue-400 border-blue-500/30" },
              { name: "NIS2", color: "bg-green-600/20 text-green-400 border-green-500/30" },
              { name: "CRA", color: "bg-purple-600/20 text-purple-400 border-purple-500/30" },
              { name: "DORA", color: "bg-orange-600/20 text-orange-400 border-orange-500/30" },
              { name: "EU AI Act", color: "bg-pink-600/20 text-pink-400 border-pink-500/30" },
              { name: "ePrivacy", color: "bg-teal-600/20 text-teal-400 border-teal-500/30" },
              { name: "ISO 27001", color: "bg-red-600/20 text-red-400 border-red-500/30" },
              { name: "ISO 42001", color: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30" },
              { name: "SOC 2", color: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30" },
            ].map((badge) => (
              <div key={badge.name} className={`${badge.color} p-4 rounded-xl text-center border transform hover:scale-105 transition flex flex-col justify-center items-center h-28`}>
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="font-bold text-sm">{badge.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/compliance" className="text-[#0098b2] hover:underline inline-flex items-center gap-2">
              Детайли за регулациите
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Security Analytics & Charts */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Анализ на заплахите в реално време
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Интерактивна статистика, илюстрираща разпределението на векторите на атака, активността по месеци и времето за реакция на нашия SOC
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chart 1 */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-[#0098b2]" />
                <h3 className="text-xl font-bold text-white">Разпределение на заплахите</h3>
              </div>
              <ThreatChart />
            </div>

            {/* Chart 2 */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-[#f22020]" />
                <h3 className="text-xl font-bold text-white">Инциденти по месеци</h3>
              </div>
              <IncidentChart />
            </div>

            {/* Chart 3 */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Време за реакция (минути)</h3>
              </div>
              <ResponseTimeChart />
            </div>
          </div>
        </div>
      </section>

      {/* Live SOC Threat Radar & Log Stream */}
      <section className="py-20 px-4 bg-slate-950 border-t border-b border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,32,32,0.03),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <Radio className="w-4 h-4" />
              Мониторинг на живо (Live SOC)
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Глобален радар за заплахи на DefComs
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Нашите 24/7/365 Security Operations Center (SOC) системи анализират мрежовия поток в реално време, за да откриват и блокират атаки на ранен етап.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Live Indicator Gauge */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0098b2]/5 rounded-full blur-3xl"></div>
              <h3 className="text-lg font-bold text-white mb-6">Текущ индекс на активност</h3>

              {/* Glowing Circle Radar */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <div className="absolute inset-0 border border-slate-800 rounded-full"></div>
                <div className="absolute inset-4 border border-slate-800/60 rounded-full"></div>
                <div className="absolute inset-10 border border-slate-800/40 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-t-2 border-r-2 border-[#f22020] rounded-full animate-spin [animation-duration:8s]"></div>

                <div className="z-10 flex flex-col items-center">
                  <span className="text-5xl font-black text-white">{threatScore}%</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Activity Level</span>
                </div>
              </div>

              {/* Status Alert Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-red-950/30 border border-red-500/30 text-[#f22020] font-bold text-sm animate-pulse">
                <ShieldAlert className="w-4 h-4" />
                ВИСОКА КИБЕРАКТИВНОСТ (HIGH)
              </div>

              <div className="mt-6 text-xs text-gray-500 space-y-1">
                <p>● Последна глобална заплаха: XZ Utils Backdoor</p>
                <p>● Активни сензори в България: 1,420+</p>
              </div>
            </div>

            {/* Real-time Terminal Log Stream */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col h-[380px] justify-between shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold tracking-wider uppercase ml-2 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-gray-500" />
                    soc-live-stream.log
                  </span>
                </div>
                <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 animate-pulse">
                  ON AIR
                </span>
              </div>

              {/* Terminal Logs Window */}
              <div className="flex-1 overflow-y-auto space-y-3.5 my-4 px-2 font-mono text-xs text-gray-350 scrollbar-thin scrollbar-thumb-slate-800">
                {socEvents.map((event) => (
                  <div key={event.id} className="space-y-1 animate-fadeIn leading-relaxed">
                    <div className="flex flex-wrap items-center gap-x-2 text-[10px]">
                      <span className="text-gray-500">[{event.time}]</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        event.type.includes("ALERT") || event.type.includes("FAIL")
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-[#0098b2]/10 text-[#0098b2] border border-[#0098b2]/20"
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-300 pl-2 border-l border-slate-800">{event.msg}</p>
                  </div>
                ))}
              </div>

              {/* Terminal Footer Info */}
              <div className="pt-3 border-t border-slate-850/60 flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  <span>Връзка с DefComs SIEM: Успешна</span>
                </div>
                <span>SOC ОПЕРАЦИИ В БЪЛГАРИЯ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Нашите основни направления
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition group">
              <Shield className="w-12 h-12 text-[#0098b2] mb-4 group-hover:scale-110 transition duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Защита от кибер атаки</h3>
              <p className="text-gray-400">
                Проактивна защита срещу най-новите кибер заплахи с AI-базирано откриване и непрекъснато неутрализиране
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#f22020] transition group">
              <Lock className="w-12 h-12 text-[#f22020] mb-4 group-hover:scale-110 transition duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Криптиране на данни</h3>
              <p className="text-gray-400">
                Край-до-край криптиране на всички чувствителни данни според най-високите международни стандарти
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition group">
              <Globe className="w-12 h-12 text-[#0098b2] mb-4 group-hover:scale-110 transition duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Мрежова сигурност</h3>
              <p className="text-gray-400">
                Комплексна защита на мрежовата инфраструктура с интелигентен мониторинг в реално време
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-800/50 px-4 border-y border-slate-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-[#0098b2] mb-2">99.99%</div>
              <div className="text-gray-400 font-medium">Uptime гаранция</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#f22020] mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Мониторинг</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#0098b2] mb-2">&lt;1s</div>
              <div className="text-gray-400 font-medium">Откриване на заплахи</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#f22020] mb-2">500+</div>
              <div className="text-gray-400 font-medium">Защитени бизнеси</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(242,32,32,0.08),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Готови сте да защитите бизнеса си?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Свържете се с нас за безплатна консултация, демонстрация и цялостна оценка на вашата сигурност
          </p>
          <Link href="/contact">
            <button className="bg-[#f22020] hover:bg-red-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 duration-300 shadow-lg shadow-red-600/20">
              Свържете се с нас
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

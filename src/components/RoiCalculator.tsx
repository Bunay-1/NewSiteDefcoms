"use client";

import { useState } from "react";
import { Shield, ShieldCheck, AlertTriangle, ArrowRight, DollarSign, Users, Award, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function RoiCalculator() {
  // Inputs
  const [employees, setEmployees] = useState(50);
  const [revenue, setRevenue] = useState(2500000); // 2.5 Million BGN
  const [sector, setSector] = useState("services"); // services, finance, critical, retail, manufacturing
  const [downtimeHours, setDowntimeHours] = useState(24);
  const [hasBasicSecurity, setHasBasicSecurity] = useState(true);

  // Sector multipliers and base probability
  const sectorData: Record<string, { name: string; multiplier: number; prob: number; fineMultiplier: number }> = {
    critical: { name: "Критична инфраструктура", multiplier: 1.8, prob: 45, fineMultiplier: 1.5 },
    finance: { name: "Финанси и застраховане", multiplier: 2.0, prob: 40, fineMultiplier: 1.8 },
    manufacturing: { name: "Производство и Логистика", multiplier: 1.3, prob: 30, fineMultiplier: 1.0 },
    services: { name: "ИТ, Телеком и Услуги", multiplier: 1.5, prob: 35, fineMultiplier: 1.2 },
    retail: { name: "Търговия и е-комерс", multiplier: 1.0, prob: 25, fineMultiplier: 0.8 },
  };

  const currentSector = sectorData[sector] || sectorData.services;

  // 1. Downtime cost calculation
  // Average cost per employee hour of downtime = 35 BGN
  // Business hourly revenue lost = revenue / (365 * 8) => only active hours
  const businessHourlyRevenue = revenue / 2920;
  const laborLoss = employees * 35 * downtimeHours;
  const directRevenueLoss = businessHourlyRevenue * downtimeHours;
  const downtimeCost = Math.round(laborLoss + directRevenueLoss);

  // 2. Fines (GDPR up to 4% of revenue, NIS2 up to 10M EUR or 2% of turnover)
  // Base compliance fine risk
  const baseFineRate = 0.02 * currentSector.fineMultiplier; // around 1.6% - 3.6%
  const fineExposure = Math.round(revenue * baseFineRate);

  // 3. Reputational & Customer Churn Damage
  // Typically 1.5% to 5% of annual revenue based on size and sector
  const reputationalRate = 0.025 * currentSector.multiplier * (employees > 100 ? 1.2 : 0.9);
  const reputationCost = Math.round(revenue * reputationalRate);

  // Total Single Loss Expectancy (SLE)
  const totalBreachCost = Math.round(downtimeCost + fineExposure + reputationCost);

  // Probability adjustments
  let prob = currentSector.prob;
  if (!hasBasicSecurity) {
    prob += 20; // 20% higher chance without basic security
  } else {
    prob -= 5;
  }
  // Size adjustment
  if (employees > 150) prob += 10;
  if (employees < 15) prob -= 10;

  // Bound probability between 10% and 85%
  const breachProbability = Math.max(10, Math.min(85, prob));

  // Annualized Loss Exposure (ALE) = SLE * Probability (as fraction of year)
  const annualizedLossExposure = Math.round(totalBreachCost * (breachProbability / 100));

  // DefComs implementation pricing (approximate yearly subscription)
  // Dynamic based on size and sector risk
  const baseSubscription = 12000; // Minimal SIEM + Threat Detection
  const perUserCost = employees * 360; // 30 BGN per user per month => 360/year
  const defcomsCost = Math.round(baseSubscription + perUserCost);

  // Mitigated Risk: DefComs reduces risk probability by 95%
  const mitigatedALE = annualizedLossExposure * 0.05;
  const savedLoss = Math.round(annualizedLossExposure - mitigatedALE);
  const netSavings = Math.round(savedLoss - defcomsCost);
  const roiPercentage = Math.round((netSavings / defcomsCost) * 100);

  // Format currency helpers
  const formatBGN = (val: number) => {
    return new Intl.NumberFormat("bg-BG", { style: "currency", currency: "BGN", maximumFractionDigits: 0 }).format(val);
  };

  // Recharts Data
  const chartData = [
    {
      name: "Без DefComs (Годишен Риск)",
      "Риск от загуба (BGN)": annualizedLossExposure,
      "Разходи за защита (BGN)": 0,
    },
    {
      name: "С DefComs (Сигурност)",
      "Риск от загуба (BGN)": Math.round(annualizedLossExposure * 0.05),
      "Разходи за защита (BGN)": defcomsCost,
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-10 text-white max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Left Column - INPUTS */}
        <div className="lg:col-span-5 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/60 space-y-6">
          <h3 className="text-xl font-bold text-[#0098b2] border-b border-slate-700 pb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#f22020]" />
            Параметри на Вашата Организация
          </h3>

          {/* Employees Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Брой служители (персонал):</label>
              <span className="text-[#0098b2] font-bold text-sm">{employees} души</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0098b2]"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>5</span>
              <span>100</span>
              <span>250</span>
              <span>500+</span>
            </div>
          </div>

          {/* Revenue Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Годишен оборот (лв.):</label>
              <span className="text-[#0098b2] font-bold text-sm">{formatBGN(revenue)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="30000000"
              step="100000"
              value={revenue}
              onChange={(e) => setRevenue(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0098b2]"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>100 хил. лв.</span>
              <span>10 млн. лв.</span>
              <span>20 млн. лв.</span>
              <span>30 млн. лв.</span>
            </div>
          </div>

          {/* Sector Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Бизнес сектор / Индустрия:</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-slate-700/60 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#0098b2]"
            >
              <option value="critical">Критична инфраструктура (Енергетика, Здравеопазване)</option>
              <option value="finance">Финанси, Застраховане, Банково дело (DORA)</option>
              <option value="services">ИТ, Телеком, Дигитални и Професионални услуги</option>
              <option value="manufacturing">Производство, Логистика, Транспорт</option>
              <option value="retail">Търговия, Електронна търговия, Маркетинг</option>
            </select>
          </div>

          {/* Downtime Hours Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Очакван престой при тежка атака (часове):</label>
              <span className="text-red-400 font-bold text-sm">{downtimeHours} часа</span>
            </div>
            <input
              type="range"
              min="4"
              max="168"
              step="4"
              value={downtimeHours}
              onChange={(e) => setDowntimeHours(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>4 часа (Бързо възстановяване)</span>
              <span>72 часа (3 дни)</span>
              <span>168 часа (1 седмица)</span>
            </div>
          </div>

          {/* Basic Security Toggle */}
          <div className="flex items-center justify-between bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
            <div>
              <span className="block text-sm font-semibold text-white">Имате ли бавна традиционна защита?</span>
              <span className="text-xs text-gray-400">Обикновен антивирус, базов рутер без денонощен мониторинг</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasBasicSecurity}
                onChange={(e) => setHasBasicSecurity(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0098b2]"></div>
            </label>
          </div>
        </div>

        {/* Right Column - COMPUTED RESULTS */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#0098b2]" />
                Оценка на Финансовите Заплахи
              </h3>
              <div className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs px-2.5 py-1 rounded-full font-bold">
                Годишна вероятност от инцидент: {breachProbability}%
              </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Разходи при единичен пробив (SLE)</div>
                <div className="text-2xl font-black text-white">{formatBGN(totalBreachCost)}</div>
                <div className="text-[11px] text-gray-400 mt-1">Очаквана цена за възстановяване, глоби и репутация.</div>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-900/30 p-4 rounded-xl">
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">Очакван годишен риск (ALE)</div>
                <div className="text-2xl font-black text-white">{formatBGN(annualizedLossExposure)}</div>
                <div className="text-[11px] text-gray-400 mt-1">Усреднена годишна загуба на база математическа вероятност.</div>
              </div>
            </div>

            {/* Split Breakdown Details */}
            <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl space-y-3 mb-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Разбивка на единичния пробив (SLE)</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">1. Загуби от престой и прекъснат процес:</span>
                <span className="font-semibold text-gray-200">{formatBGN(downtimeCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">2. Глоби по регламенти (GDPR / NIS2):</span>
                <span className="font-semibold text-gray-200">{formatBGN(fineExposure)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">3. Репутационни щети и отлив на клиенти:</span>
                <span className="font-semibold text-gray-200">{formatBGN(reputationCost)}</span>
              </div>
            </div>

            {/* ROI Comparison Chart */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl h-[240px] mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">
                Годишни Загуби от Риск vs Годишна Защита с DefComs
              </h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={10} width={70} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(val: any) => formatBGN(val)}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
                  <Bar dataKey="Риск от загуба (BGN)" fill="#f22020" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Разходи за защита (BGN)" fill="#0098b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Final ROI Summary */}
            <div className="bg-gradient-to-r from-teal-950/30 to-slate-900/40 border border-teal-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#0098b2] font-extrabold text-sm uppercase tracking-wider mb-1">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Резултат от Вашата ROI Оценка
                </div>
                <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                  Защитата на DefComs намалява годишния ви риск с <span className="text-green-400 font-bold">95%</span>.
                  Инвестирайки в нашата сигурност, вие спестявате нетно <span className="text-white font-bold">{formatBGN(netSavings)}</span> годишно.
                </p>
              </div>
              <div className="text-center md:text-right flex-shrink-0 bg-slate-800/80 px-6 py-4 rounded-xl border border-teal-500/20 w-full md:w-auto">
                <div className="text-xs text-gray-400 font-bold uppercase">Възвръщаемост (ROI)</div>
                <div className="text-3xl lg:text-4xl font-black text-green-400">+{roiPercentage}%</div>
                <div className="text-[10px] text-gray-500 mt-1">Очаквана ефективност</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800">
            <Link href="/contact" className="flex-1">
              <button className="w-full bg-[#f22020] hover:bg-red-700 text-white font-extrabold text-base py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:-translate-y-0.5 transform duration-150">
                Заявете подробен одит и оферта
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/services" className="sm:w-auto">
              <button className="w-full border border-slate-700 hover:border-slate-500 text-gray-300 hover:text-white font-bold text-sm py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-1.5 hover:bg-slate-800/40">
                Разгледайте Услугите
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

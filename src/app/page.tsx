"use client";

import { Shield, Lock, Globe, CheckCircle, ArrowRight, Activity, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { ThreatChart, IncidentChart, ResponseTimeChart } from "@/components/SecurityChart";

export default function Home() {
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
            <Link href="/contact" className="inline-block">
              <button className="w-full bg-[#0098b2] hover:bg-[#005f7f] text-white px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2">
                Започнете сега
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

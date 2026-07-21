import { Shield, Lock, Globe, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Киберсигурност от
            <span className="text-[#0098b2]"> ново поколение</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Защита на вашите цифрови активи с най-модерните технологии и пълно съответствие с EU директиви
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0098b2] hover:bg-[#005f7f] text-white px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2">
              Започнете сега
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-[#0098b2] text-[#0098b2] hover:bg-[#0098b2] hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              Научете повече
            </button>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Пълно съответствие с EU директиви
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: "GDPR", color: "bg-blue-600" },
              { name: "NIS2", color: "bg-green-600" },
              { name: "CRA", color: "bg-purple-600" },
              { name: "DORA", color: "bg-orange-600" },
              { name: "EU AI Act", color: "bg-pink-600" },
              { name: "ePrivacy", color: "bg-teal-600" },
              { name: "ISO 27001", color: "bg-red-600" },
              { name: "ISO 42001", color: "bg-yellow-600" },
              { name: "SOC 2", color: "bg-indigo-600" },
            ].map((badge) => (
              <div key={badge.name} className={`${badge.color} p-6 rounded-xl text-center transform hover:scale-105 transition`}>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <span className="text-white font-bold">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Нашите решения
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition">
              <Shield className="w-12 h-12 text-[#0098b2] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Защита от кибер атаки</h3>
              <p className="text-gray-400">
                Проактивна защита срещу най-новите кибер заплахи с AI-базирано откриване и неутрализиране
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition">
              <Lock className="w-12 h-12 text-[#f22020] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Криптиране на данни</h3>
              <p className="text-gray-400">
                Край-до-край криптиране на всички чувствителни данни според най-високите стандарти
              </p>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition">
              <Globe className="w-12 h-12 text-[#0098b2] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Мрежова сигурност</h3>
              <p className="text-gray-400">
                Комплексна защита на мрежовата инфраструктура с мониторинг в реално време
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-800/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0098b2] mb-2">99.9%</div>
              <div className="text-gray-400">Uptime гаранция</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#f22020] mb-2">24/7</div>
              <div className="text-gray-400">Мониторинг</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0098b2] mb-2">&lt;1s</div>
              <div className="text-gray-400">Откриване на заплахи</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#f22020] mb-2">500+</div>
              <div className="text-gray-400">Клиенти</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Готови сте да защитите бизнеса си?
          </h2>
          <p className="text-gray-400 mb-8">
            Свържете се с нас за безплатна консултация и оценка на вашата киберсигурност
          </p>
          <Link href="/contact">
            <button className="bg-[#f22020] hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              Свържете се с нас
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

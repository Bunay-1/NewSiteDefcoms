import PhishingTrainer from "@/components/PhishingTrainer";
import { Mail, HelpCircle } from "lucide-react";

export default function PhishingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-4 h-4" />
            Мини-Игра и Тренажор
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Тренажор „Разпознай Фишинг Имейл“
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Изпробвайте своята бдителност в нашата симулационна пощенска кутия. Разпознайте истинските имейли от опасния фишинг, проектиран да открадне фирмените ви данни.
          </p>
        </div>

        {/* Game UI component */}
        <PhishingTrainer />

        {/* Explanatory notes below */}
        <div className="mt-16 bg-slate-900/40 p-8 border border-slate-800 rounded-2xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <h4 className="text-white font-bold mb-2">1. Проверете домейна</h4>
            <p className="text-xs leading-relaxed">
              Фишърите често използват подвеждащи домейни (напр. microsoft-security-alert.com). Винаги гледайте какво пише след символа @.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">2. Следете за спешност</h4>
            <p className="text-xs leading-relaxed">
              Заплахи с блокиране на карти, глоби от институции и крайни срокове в рамките на часове са класически манипулативен прийом.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">3. Пазете се от линкове</h4>
            <p className="text-xs leading-relaxed">
              Не натискайте директни линкове за плащане или въвеждане на банкови и служебни пароли в съмнително изглеждащи имейли.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

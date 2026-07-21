import RoiCalculator from "@/components/RoiCalculator";
import { ShieldCheck, TrendingUp, Info } from "lucide-react";

export default function RoiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            Инструмент за Оценка
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Калкулатор за възвръщаемост на инвестицията (ROI)
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Изчислете финансовия риск за вашата организация при кибератаки и вижте колко ще спестите с интелигентна киберзащита от ново поколение на DefComs.
          </p>
        </div>

        {/* The Calculator Component */}
        <RoiCalculator />

        {/* Methodology explanation section */}
        <div className="mt-16 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#0098b2]" />
            Методология на изчисленията
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed">
            <div className="space-y-4">
              <p>
                <strong className="text-white">SLE (Single Loss Expectancy)</strong> е стойността на загубата от единичен киберинцидент. Изчислява се като сума от преките разходи за труд при престой, пропуснати бизнес ползи за всеки час спиране на процесите, глоби от регулатори (GDPR/NIS2) и репутационна щета.
              </p>
              <p>
                <strong className="text-white">ALE (Annualized Loss Exposure)</strong> представлява очакваната средна годишна загуба, изчислена на база статистическата вероятност от успешна атака през годината спрямо вашия бизнес сектор, мащаб на организацията и актуално състояние на защитата ви.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <strong className="text-[#0098b2]">Намаляване на риска с DefComs:</strong> Внедряването на нашия денонощен Security Operations Center (SOC) и автоматизирани решения намалява вероятността за успешен пробив с над <strong className="text-green-400">95%</strong>, което рефлектира в спад на ALE.
              </p>
              <p>
                <strong className="text-white">Нетни спестявания (Net Savings):</strong> Стойността на спестените потенциални загуби за годината, от която се изважда общата годишна абонаментна цена за решенията на DefComs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

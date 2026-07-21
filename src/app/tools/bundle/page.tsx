import BundleConfigurator from "@/components/BundleConfigurator";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function BundlePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Интерактивен избор
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Конфигуратор „Създай своя защита“
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Сглобете идеалния пакет от услуги, изчислете индикативния си месечен абонамент и тествайте нивото на мрежовото си покритие.
          </p>
        </div>

        {/* The Configurator Component */}
        <BundleConfigurator />

        {/* Extra guarantee section */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#0098b2] font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            Нашият ангажиращ SLA договор
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Всички наши пакети идват с договор за гарантирано ниво на обслужване (SLA) до 99.9% наличност на SOC платформата и гарантирано време за реакция при критични инциденти под 15 минути.
          </p>
        </div>
      </div>
    </main>
  );
}

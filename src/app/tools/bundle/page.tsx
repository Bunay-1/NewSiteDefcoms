import BundleConfigurator from "@/components/BundleConfigurator";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Интерактивен Конфигуратор на Киберзащита | DefComs",
  description: "Сглобете идеалния пакет от услуги за киберсигурност за вашия бизнес, изчислете цената и проверете нивото на защита с нашия интерактивен конфигуратор.",
  keywords: "конфигуратор киберзащита, абонамент киберсигурност, пакет услуги сигурност, ценообразуване киберсигурност",
};

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

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 p-10 rounded-2xl text-center border border-[#0098b2]/30 shadow-lg shadow-[#0098b2]/5">
          <h2 className="text-2xl font-bold text-white mb-4">
            Харесвате конфигурацията си и искате официална оферта?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">
            Изпратете ни конфигурирания си списък или се свържете директно, за да получите официална ценова оферта с включена отстъпка и план за внедряване.
          </p>
          <Link href="/contact">
            <button className="bg-[#f22020] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition duration-150 flex items-center justify-center gap-2 mx-auto">
              Свържете се с нашия екип
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

import ThreatHub from "@/components/ThreatHub";
import { ShieldAlert, Terminal } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Център за Уязвимости и Киберзаплахи - CVE Анализ | DefComs",
  description: "Бъдете информирани за най-новите критични софтуерни уязвимости (CVE) и заплахи за сигурността. Анализи и препоръки от екипа на DefComs Security Intelligence.",
  keywords: "център за заплахи, уязвимости CVE, анализ на уязвимости, сигурност препоръки, най-новите CVE",
};

export default function ThreatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            Security Intelligence Feed
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Център за уязвимости и кибер заплахи
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Бъдете информирани за най-новите критични CVE уязвимости в софтуера от последната седмица и разгледайте препоръките за смекчаване от екипа на DefComs Security Intelligence.
          </p>
        </div>

        {/* The Threat Feed Component */}
        <ThreatHub />

        {/* Dynamic CTA at bottom */}
        <div className="mt-16 bg-gradient-to-r from-red-950/20 to-slate-900 border border-red-500/10 p-8 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <Terminal className="w-5 h-5 text-red-500" />
              Имате нужда от денонощен автоматизиран мониторинг?
            </h4>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
              Платформата DefComs интегрира в реално време информация за уязвимости от над 30 глобални източника и автоматично предотвратява пробиви с помощта на AI триаж на аларми.
            </p>
          </div>
          <Link href="/demo">
            <button className="bg-white hover:bg-gray-100 text-slate-950 font-black text-xs py-3 px-6 rounded-xl transition duration-150 shadow-md flex-shrink-0">
              Вижте SOC Демо Симулатора
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

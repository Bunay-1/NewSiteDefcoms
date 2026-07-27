import AiActWizard from "@/components/AiActWizard";
import { Brain, Sparkles, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Калкулатор за Съответствие | Регламент за Изкуствен Интелект | DefComs",
  description: "Оценете в кой клас на риск попада вашата AI система съгласно новия европейски закон EU AI Act. Попълнете интерактивния ни калкулатор за одит и ISO 42001 съвместимост.",
  keywords: "EU AI Act България, закон за изкуствен интелект, съответствие изкуствен интелект, класификация на риск AI, ISO 42001 одит софтуер",
  alternates: {
    canonical: "https://defcoms.eu/tools/ai-act-wizard",
  },
};

export default function AiActWizardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Brain className="w-4 h-4" />
            Регулаторен Инструмент
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Калкулатор за съответствие с EU AI Act
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Разберете дали Вашите системи с Изкуствен Интелект отговарят на новите европейски изисквания и в кой клас на риск попадат съгласно регламента.
          </p>
        </div>

        {/* Wizard */}
        <AiActWizard />

        {/* Information Section */}
        <div className="mt-16 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl max-w-5xl mx-auto text-gray-400 text-sm leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0098b2]" />
            За новия Регламент за Изкуствен Интелект (EU AI Act)
          </h2>
          <p>
            Законът за изкуствения интелект на ЕС е първата в света цялостна правна рамка за изкуствения интелект. Той цели да гарантира, че AI системите, използвани в ЕС, са безопасни, прозрачни, проследими, недискриминационни и щадящи околната среда.
          </p>
          <p>
            Въвежда се класификация на системите според нивото на риск, като за системите с **Висок риск** се въвеждат задължителни изисквания за сертифициране по стандарта <strong className="text-white">ISO 42001</strong> преди пускане на пазара. DefComs предлага цялостен технологичен съвет за постигане на съответствие.
          </p>
        </div>
      </div>
    </main>
  );
}

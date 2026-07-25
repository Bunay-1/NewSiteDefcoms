"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Shield,
  ArrowLeft,
  LogOut,
  CheckCircle,
  Clock,
  Award,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: number;
  status: string; // pending, completed
  category: string;
}

export default function SecurityHealthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Всички");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchRecommendations();
    }
  }, [status]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/portal/recommendations");
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на препоръки:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setUpdatingId(id);
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    try {
      const response = await fetch("/api/portal/recommendations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        // Локално обновяваме състоянието за светкавичен интерфейс
        setRecommendations(prev =>
          prev.map(rec => rec.id === id ? { ...rec, status: newStatus } : rec)
        );
      }
    } catch (error) {
      console.error("Грешка при промяна на статус:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // Изчисляване на резултата
  const totalImpact = recommendations.reduce((acc, r) => acc + r.impact, 0);
  const completedImpact = recommendations
    .filter(r => r.status === "completed")
    .reduce((acc, r) => acc + r.impact, 0);

  const healthScore = totalImpact > 0 ? Math.round((completedImpact / totalImpact) * 100) : 100;

  const categories = ["Всички", "Достъп", "Мрежа", "Съответствие", "Обучение"];

  const filteredRecs = activeTab === "Всички"
    ? recommendations
    : recommendations.filter(r => r.category === activeTab);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 border-green-500/30";
    if (score >= 50) return "text-yellow-400 border-yellow-500/30";
    return "text-red-400 border-red-500/30";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500/10 to-emerald-500/10 border-green-500/20";
    if (score >= 50) return "from-yellow-500/10 to-amber-500/10 border-yellow-500/20";
    return "from-red-500/10 to-rose-500/10 border-red-500/20";
  };

  const getStatusText = (score: number) => {
    if (score >= 90) return "Отличен статус";
    if (score >= 70) return "Добър статус";
    if (score >= 50) return "Умерен риск";
    return "Критичен риск";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Анализ на киберсигурността...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/portal/dashboard"
                className="p-2 hover:bg-slate-700/50 rounded-xl transition text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#0098b2]" />
                  Ниво на киберсигурност
                </h1>
                <p className="text-gray-400 text-sm">
                  Интерактивен одит и оценка на ИТ риска в реално време
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <LogOut className="w-5 h-5" />
              Изход
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Main Score and Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Circular Score display */}
          <div className={`lg:col-span-1 bg-gradient-to-br ${getScoreBg(healthScore)} border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl`}>
            <div className="relative w-44 h-44 flex items-center justify-center mb-4">
              {/* Circular track */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="12"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  className={`fill-none transition-all duration-1000 ${
                    healthScore >= 80 ? "stroke-green-500" : healthScore >= 50 ? "stroke-yellow-500" : "stroke-red-500"
                  }`}
                  strokeWidth="12"
                  strokeDasharray={464}
                  strokeDashoffset={464 - (464 * healthScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner score text */}
              <div className="text-center z-10">
                <p className="text-5xl font-black text-white">{healthScore}%</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Здравен статус</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              {getStatusText(healthScore)}
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Базира се на {recommendations.filter(r => r.status === "completed").length} успешно приложени мерки от {recommendations.length} общо.
            </p>
          </div>

          {/* Dynamic Explanations */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/80 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span>Какво означава този резултат?</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Здравният статус по сигурността се изчислява в реално време въз основа на европейските добри практики и регулаторни съответствия по директивите <strong>NIS2</strong>, <strong>GDPR</strong> и <strong>ISO 27001</strong>.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Всяка от препоръките по-долу има различна тежест (Impact точки) върху цялостния ви защитен щит. Можете да маркирате кои контроли са внедрени във Вашата организация, за да преизчислите резултата моментално. Нашите SOC анализатори валидират внедрените мерки периодично.
              </p>
            </div>

            <div className="mt-6 border-t border-slate-700/60 pt-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  Приложени ({recommendations.filter(r => r.status === "completed").length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
                  Чакащи ({recommendations.filter(r => r.status === "pending").length})
                </span>
              </div>
              <Link href="/portal/tickets/new">
                <button className="text-sm text-[#0098b2] hover:underline flex items-center gap-1 font-semibold">
                  Поискайте одит от анализатор →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-700/60 pb-4">
          <Sliders className="w-4 h-4 text-gray-500 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition ${
                activeTab === cat
                  ? "bg-[#0098b2] text-white shadow-lg shadow-[#0098b2]/20"
                  : "bg-slate-800 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Checklist Container */}
        <div className="bg-slate-800/20 border border-slate-700/80 rounded-2xl overflow-hidden">
          {filteredRecs.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              Няма препоръки в тази категория.
            </div>
          ) : (
            <div className="divide-y divide-slate-700/60">
              {filteredRecs.map((rec) => {
                const isCompleted = rec.status === "completed";
                return (
                  <div
                    key={rec.id}
                    className={`p-6 transition flex items-start gap-4 hover:bg-slate-800/30 ${
                      isCompleted ? "opacity-75" : ""
                    }`}
                  >
                    {/* Checkbox button */}
                    <button
                      onClick={() => handleToggleStatus(rec.id, rec.status)}
                      disabled={updatingId === rec.id}
                      className={`flex-shrink-0 mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-slate-600 hover:border-[#0098b2]"
                      }`}
                    >
                      {updatingId === rec.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-gray-400" />
                      ) : isCompleted ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      ) : null}
                    </button>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className={`text-base font-bold transition ${
                          isCompleted ? "text-gray-400 line-through" : "text-white"
                        }`}>
                          {rec.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-gray-300 font-bold tracking-wider">
                          {rec.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          rec.impact >= 20 ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                          +{rec.impact} Точки
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        isCompleted ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {rec.description}
                      </p>
                    </div>

                    {/* Status text badge */}
                    <div className="hidden sm:block flex-shrink-0">
                      {isCompleted ? (
                        <span className="text-xs font-bold text-green-400 flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/10">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Приложена
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                          <Clock className="w-3.5 h-3.5 text-gray-500" />
                          Очаква се
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

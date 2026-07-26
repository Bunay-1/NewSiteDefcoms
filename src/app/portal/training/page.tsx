"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PhishingTrainer from "@/components/PhishingTrainer";
import {
  GraduationCap,
  Trophy,
  History,
  Shield,
  Award,
  Calendar,
  CheckCircle,
  HelpCircle,
  Users
} from "lucide-react";

interface TrainingResult {
  id: string;
  score: number;
  total: number;
  badge: string;
  createdAt: string;
}

export default function TrainingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [results, setResults] = useState<TrainingResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchResults();
    }
  }, [status]);

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/portal/training");
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error("Грешка при зареждане на резултати:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrainingFinish = async (score: number, total: number, badge: string) => {
    try {
      const res = await fetch("/api/portal/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, total, badge })
      });

      if (res.ok) {
        fetchResults(); // Презареждаме историята
      }
    } catch (err) {
      console.error("Грешка при записване на резултат:", err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на Центъра за Обучения...</p>
        </div>
      </div>
    );
  }

  // Намираме най-добрия резултат
  const bestScore = results.length > 0 ? Math.max(...results.map((r) => r.score)) : 0;
  const attemptsCount = results.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[#0098b2]" />
            Център за Обучение и Сигурност
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Обучавайте екипа си за разпознаване на фишинг атаки и проверете нивото на кибербдителност в реално време
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Брой опити на екипа</p>
              <p className="text-3xl font-black text-white mt-1">{attemptsCount}</p>
            </div>
            <div className="w-12 h-12 bg-[#0098b2]/10 border border-[#0098b2]/20 rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-[#0098b2]" />
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Най-висок резултат</p>
              <p className="text-3xl font-black text-green-400 mt-1">{bestScore} / 4</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Глобален рейтинг</p>
              <p className="text-3xl font-black text-[#0098b2] mt-1">
                {bestScore === 4 ? "A+ Шампион" : bestScore >= 3 ? "B+ Добър" : "C- Среден"}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#0098b2]/10 border border-[#0098b2]/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-[#0098b2]" />
            </div>
          </div>
        </div>

        {/* Embedded Phishing Simulator Component */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0098b2]" />
            Интерактивна Фишинг Симулация
          </h2>
          <PhishingTrainer onFinish={handleTrainingFinish} />
        </div>

        {/* History of Attempts */}
        <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/30 flex items-center gap-2">
            <History className="w-5 h-5 text-[#0098b2]" />
            <h3 className="text-lg font-bold text-white">История на преминатите обучения</h3>
          </div>

          {results.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Award className="w-14 h-14 text-slate-700 mx-auto mb-3" />
              <p>Все още няма регистрирани опити. Започнете симулацията по-горе!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-700 text-gray-400 text-xs font-extrabold uppercase tracking-wider">
                    <th className="p-4">Служител / Опит</th>
                    <th className="p-4">Резултат</th>
                    <th className="p-4">Бадж / Звание</th>
                    <th className="p-4">Дата на завършване</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {results.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-slate-750/30 transition">
                      <td className="p-4 text-white font-semibold">
                        Опит #{results.length - idx}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          r.score === r.total
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : r.score >= 3
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {r.score} / {r.total} верни
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-slate-300 font-semibold">{r.badge}</span>
                      </td>
                      <td className="p-4 text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleString("bg-BG")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

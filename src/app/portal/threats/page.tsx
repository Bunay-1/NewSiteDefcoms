"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Clock,
  AlertTriangle,
  Lightbulb,
  Bell
} from "lucide-react";
import Link from "next/link";

interface ThreatAlert {
  id: string;
  title: string;
  description: string;
  severity: string; // critical, high, medium, low
  mitigation: string;
  publishedAt: string;
}

export default function ThreatIntelligencePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchThreats();
    }
  }, [status]);

  const fetchThreats = async () => {
    try {
      const response = await fetch("/api/portal/threats");
      if (response.ok) {
        const data = await response.json();
        setThreats(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на заплахи:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse font-extrabold";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30 font-bold";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-slate-700 text-gray-300 border-slate-600";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "Критична заплаха";
      case "high":
        return "Висок риск";
      case "medium":
        return "Среден риск";
      case "low":
        return "Нисък риск";
      default:
        return severity;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Извличане на Threat Intelligence емисия...</p>
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
                  <ShieldAlert className="w-6 h-6 text-[#0098b2]" />
                  Threat Intelligence Feed
                </h1>
                <p className="text-gray-400 text-sm">
                  Активни разузнавателни данни за глобални заплахи и уязвимости в реално време
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

        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0098b2]/20 to-blue-500/5 border border-[#0098b2]/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="p-3 bg-[#0098b2]/10 rounded-xl flex-shrink-0 text-[#0098b2]">
            <Bell className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Служба за ранно известяване за инциденти</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Тази емисия се обновява непрекъснато от глобалния ни център за сигурност (SOC) на DefComs и е напълно съобразена с изискванията на директивата <strong>NIS2</strong> за бързо известяване и реакция при заплахи.
            </p>
          </div>
        </div>

        {/* Threat Feed List */}
        {threats.length === 0 ? (
          <div className="text-center p-12 bg-slate-800/40 border border-slate-700 rounded-2xl text-gray-400">
            Няма регистрирани активни заплахи в момента. Системите са защитени.
          </div>
        ) : (
          <div className="space-y-6">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="bg-slate-800/40 border border-slate-700/80 hover:border-slate-600/80 rounded-2xl p-6 transition"
              >

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityBadge(threat.severity)}`}>
                      {getSeverityLabel(threat.severity)}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {threat.title}
                    </h3>
                  </div>

                  <span className="text-xs text-gray-500 flex items-center gap-1.5 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    Публикувано: {new Date(threat.publishedAt).toLocaleString("bg-BG")}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {threat.description}
                </p>

                {/* Mitigation & Recommendation box */}
                <div className="bg-slate-900/60 border-l-4 border-l-[#0098b2] rounded-r-xl p-5">
                  <div className="flex items-center gap-2 text-[#0098b2] font-bold text-sm mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Препоръчителни мерки (Mitigation):</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {threat.mitigation}
                  </p>
                </div>

                {/* Quick actions link */}
                <div className="mt-4 flex justify-end">
                  <Link href="/portal/tickets/new">
                    <button className="text-xs text-gray-400 hover:text-white transition flex items-center gap-1.5 font-semibold bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                      Имате съмнения за инцидент? Свържете се с SOC отдела ни →
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

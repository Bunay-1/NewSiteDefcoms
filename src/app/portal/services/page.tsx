"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowLeft,
  LogOut,
  MessageSquare,
  Activity,
  Award,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface UserService {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string;
  endDate: string | null;
  compliance: string | null;
  createdAt: string;
}

export default function ClientServicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchServices();
    }
  }, [status]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/portal/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на услуги:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "suspended":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case "expired":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "suspended":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "expired":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активна";
      case "suspended":
        return "Временно спряна";
      case "expired":
        return "Изтекла";
      default:
        return status;
    }
  };

  const getComplianceBadgeStyle = (badge: string) => {
    const b = badge.trim().toUpperCase();
    if (b.includes("GDPR")) return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    if (b.includes("NIS2")) return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    if (b.includes("DORA")) return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    if (b.includes("CRA")) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    return "bg-slate-700/50 text-gray-300 border-slate-600/50";
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на услуги...</p>
        </div>
      </div>
    );
  }

  const activeServicesCount = services.filter(s => s.status === "active").length;

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
                  Моите услуги
                </h1>
                <p className="text-gray-400 text-sm">
                  Преглед на активните Ви абонаменти за сигурност
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/15 rounded-xl">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Активни абонаменти</p>
                <p className="text-2xl font-extrabold text-white">{activeServicesCount} от {services.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#0098b2]/15 rounded-xl">
                <Award className="w-6 h-6 text-[#0098b2]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Съответствие на системите</p>
                <p className="text-2xl font-extrabold text-white">100% Защитеност</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        {services.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center max-w-xl mx-auto mt-12">
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Нямате активни услуги</h3>
            <p className="text-gray-400 mb-6">
              Вашият профил в момента няма назначени услуги за киберсигурност. Разгледайте предлаганите от нас решения.
            </p>
            <Link href="/services">
              <button className="bg-[#0098b2] hover:bg-[#007a91] text-white px-6 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2">
                Разгледай услугите
                <ExternalLink className="w-4 h-4" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-2xl p-6 transition flex flex-col justify-between"
              >
                <div>
                  {/* Title and Status */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#0098b2] transition">
                      {service.name}
                    </h3>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(service.status)}`}>
                      {getStatusIcon(service.status)}
                      <span>{getStatusLabel(service.status)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {service.description || "Липсва описание на покритието за тази услуга."}
                  </p>
                </div>

                <div>
                  {/* Compliance Badges */}
                  {service.compliance && (
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">
                        Осигурява съответствие с:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.compliance.split(",").map((badge, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded text-xs font-medium border ${getComplianceBadgeStyle(badge)}`}
                          >
                            {badge.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-slate-700/60 my-4" />

                  {/* Dates & CTAs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        Начало: {new Date(service.startDate).toLocaleDateString("bg-BG")}
                      </span>
                      {service.endDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          Край: {new Date(service.endDate).toLocaleDateString("bg-BG")}
                        </span>
                      )}
                    </div>

                    <Link href="/portal/tickets/new">
                      <button className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 hover:text-white text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-[#0098b2]" />
                        Заяви поддръжка
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informational footer */}
        <div className="mt-12 bg-[#0098b2]/10 border border-[#0098b2]/20 rounded-2xl p-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#0098b2] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-bold mb-1">Нуждаете се от промяна в абонаментния план?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                За активиране на нови услуги, промяна на съществуващи планове или въпроси относно съответствието с европейските регламенти NIS2, GDPR, CRA и DORA, моля, отворете съответен тикет за поддръжка или се свържете директно с Вашия акаунт мениджър.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

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
  ExternalLink,
  Plus,
  FileText,
  X,
  Sparkles
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

  // Модално състояние за поръчка на услуги
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    serviceName: "24/7 SOC Мониторинг & Лог Мениджмънт",
    requestType: "add", // add, modify
    details: ""
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

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

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError("");

    try {
      const response = await fetch("/api/portal/services/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalForm)
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        setModalForm({
          serviceName: "24/7 SOC Мониторинг & Лог Мениджмънт",
          requestType: "add",
          details: ""
        });

        // Пренасочваме директно към автоматично създадения тикет за по-голямо удобство
        router.push(`/portal/tickets/${data.ticketId}`);
      } else {
        setModalError(data.error || "Грешка при изпращане на заявката");
      }
    } catch (err) {
      setModalError("Възникна вътрешна грешка при изпращане");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0098b2] hover:bg-[#007a91] text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 text-sm shadow-lg shadow-[#0098b2]/10"
              >
                <Plus className="w-4 h-4" />
                Нова услуга / План
              </button>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-semibold ml-2"
              >
                <LogOut className="w-5 h-5" />
                Изход
              </button>
            </div>
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
                Вече можете бързо да заявите активиране на нови софтуерни планове или промяна на досегашните Ви абонаменти директно от бутона <strong>„Нова услуга / План“</strong> горе вдясно. Нашата система автоматично ще стартира одит и ще подготви оферта за съответствие.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Modern Glassmorphic Service Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#0098b2] animate-pulse" />
              <h3 className="text-xl font-bold text-white">Нова услуга / Смяна на план</h3>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Изберете сигурностна услуга или регламент. При потвърждение ще се създаде нов приоритетен тикет в портала, през който ще уточним детайлите и активацията с нашите специалисти.
            </p>

            {modalError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleServiceRequest} className="space-y-4">

              {/* Select Service */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Изберете Услуга / Пакет</label>
                <select
                  value={modalForm.serviceName}
                  onChange={(e) => setModalForm({ ...modalForm, serviceName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                  required
                >
                  <option value="24/7 SOC Мониторинг & Лог Мениджмънт">24/7 SOC Мониторинг & Лог Мениджмънт (NIS2 / ISO 27001)</option>
                  <option value="Пентестинг & Оценка на уязвимостите">Пентестинг & Оценка на уязвимостите (CRA / DORA)</option>
                  <option value="Автоматизиран Одит за GDPR съответствие">Автоматизиран Одит за GDPR съответствие (GDPR / ePrivacy)</option>
                  <option value="Обучение по киберсигурност & Фишинг Симулации">Обучение по киберсигурност & Фишинг Симулатор (Awareness Training)</option>
                  <option value="DORA & NIS2 Рамкова Подготовка">DORA & NIS2 Рамкова Консултация (Финансов / Държавен сектор)</option>
                </select>
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Тип на заявката</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-4 rounded-xl border-2 flex flex-col justify-between h-20 cursor-pointer transition ${
                    modalForm.requestType === "add"
                      ? "bg-[#0098b2]/10 border-[#0098b2] text-white"
                      : "bg-slate-950 border-slate-700 text-gray-400 hover:border-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="requestType"
                      value="add"
                      checked={modalForm.requestType === "add"}
                      onChange={() => setModalForm({ ...modalForm, requestType: "add" })}
                      className="sr-only"
                    />
                    <Plus className="w-5 h-5 text-[#0098b2]" />
                    <span className="text-xs font-bold">Нова Услуга</span>
                  </label>

                  <label className={`p-4 rounded-xl border-2 flex flex-col justify-between h-20 cursor-pointer transition ${
                    modalForm.requestType === "modify"
                      ? "bg-[#0098b2]/10 border-[#0098b2] text-white"
                      : "bg-slate-950 border-slate-700 text-gray-400 hover:border-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="requestType"
                      value="modify"
                      checked={modalForm.requestType === "modify"}
                      onChange={() => setModalForm({ ...modalForm, requestType: "modify" })}
                      className="sr-only"
                    />
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <span className="text-xs font-bold">Промяна на План</span>
                  </label>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Специфични изисквания / Въпроси</label>
                <textarea
                  value={modalForm.details}
                  onChange={(e) => setModalForm({ ...modalForm, details: e.target.value })}
                  placeholder="напр. Имаме нужда от допълнителни детайли относно NIS2 съответствието и броя лицензи за крайни потребители..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-gray-300 py-3 rounded-xl font-semibold transition"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="flex-1 bg-[#0098b2] hover:bg-[#007a91] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  {modalLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Изпращане...
                    </>
                  ) : (
                    <>
                      Изпрати заявка
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

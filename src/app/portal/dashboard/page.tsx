"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Ticket, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  LogOut,
  User,
  Building2,
  Shield,
  Activity,
  ShieldAlert,
  FileText,
  Lock,
  ChevronRight,
  UserCog
} from "lucide-react";
import Link from "next/link";

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  messages: any[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // Нови състояния за разширените статистики на портала
  const [servicesCount, setServicesCount] = useState(0);
  const [recs, setRecs] = useState<any[]>([]);
  const [threatsCount, setThreatsCount] = useState(0);
  const [docsCount, setDocsCount] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTickets();
      fetchDashboardStats();
    }
  }, [status]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/portal/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на тикети:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const [resServices, resRecs, resThreats, resDocs] = await Promise.all([
        fetch("/api/portal/services"),
        fetch("/api/portal/recommendations"),
        fetch("/api/portal/threats"),
        fetch("/api/portal/documents")
      ]);

      if (resServices.ok) {
        const servicesData = await resServices.json();
        setServicesCount(servicesData.filter((s: any) => s.status === "active").length);
      }
      if (resRecs.ok) {
        setRecs(await resRecs.json());
      }
      if (resThreats.ok) {
        const threatsData = await resThreats.json();
        // Броим активните критични и високи заплахи
        setThreatsCount(threatsData.filter((t: any) => t.severity === "critical" || t.severity === "high").length);
      }
      if (resDocs.ok) {
        const docsData = await resDocs.json();
        setDocsCount(docsData.length);
      }
    } catch (error) {
      console.error("Грешка при извличане на статистики:", error);
    }
  };

  // Пресмятане на Cybersecurity Score в реално време
  const completedImpact = recs.filter(r => r.status === "completed").reduce((acc, r) => acc + r.impact, 0);
  const totalImpact = recs.reduce((acc, r) => acc + r.impact, 0);
  const healthScore = totalImpact > 0 ? Math.round((completedImpact / totalImpact) * 100) : 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Отворен";
      case "in_progress":
        return "В процес";
      case "resolved":
        return "Решен";
      case "closed":
        return "Затворен";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-gray-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-orange-400";
      case "urgent":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "low":
        return "Нисък";
      case "medium":
        return "Среден";
      case "high":
        return "Висок";
      case "urgent":
        return "Спешен";
      default:
        return priority;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане...</p>
        </div>
      </div>
    );
  }

  const openTickets = tickets.filter(t => t.status === "open").length;
  const inProgressTickets = tickets.filter(t => t.status === "in_progress").length;
  const resolvedTickets = tickets.filter(t => t.status === "resolved").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0098b2]/10 rounded-xl flex items-center justify-center border border-[#0098b2]/20">
                <Shield className="w-5 h-5 text-[#0098b2]" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  Клиентски портал <span className="text-xs bg-[#0098b2]/20 text-[#0098b2] border border-[#0098b2]/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">DefComs</span>
                </h1>
                <p className="text-gray-400 text-xs font-semibold">
                  Добре дошли, {(session?.user as any)?.name || (session?.user as any)?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/portal/profile">
                <button className="text-gray-400 hover:text-white transition text-sm font-semibold flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl">
                  <UserCog className="w-4 h-4 text-[#0098b2]" />
                  Настройки на профила
                </button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Изход
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Cybersecurity Executive Overview Dashboard Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Security Score Banner Card */}
          <Link href="/portal/health" className="group block">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700 rounded-2xl p-6 hover:border-green-500/30 transition flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase font-extrabold tracking-wider mb-1">Здравен статус (Score)</p>
                <p className="text-3xl font-black text-white group-hover:text-green-400 transition">{healthScore}%</p>
                <p className="text-xs text-green-400 font-bold mt-1.5 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  Вижте препоръките →
                </p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black border ${
                healthScore >= 80 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              }`}>
                {healthScore}
              </div>
            </div>
          </Link>

          {/* Active Threats Banner Card */}
          <Link href="/portal/threats" className="group block">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700 rounded-2xl p-6 hover:border-red-500/30 transition flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase font-extrabold tracking-wider mb-1">Заплахи в реално време</p>
                <p className="text-3xl font-black text-white group-hover:text-red-400 transition">{threatsCount}</p>
                <p className="text-xs text-red-400 font-bold mt-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                  Активни критични заплахи →
                </p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black border ${
                threatsCount > 0 ? "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse" : "bg-slate-700/20 text-gray-400 border-slate-700"
              }`}>
                {threatsCount > 0 ? "!" : "✓"}
              </div>
            </div>
          </Link>

          {/* Safe Vault Banner Card */}
          <Link href="/portal/documents" className="group block">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-700 rounded-2xl p-6 hover:border-[#0098b2]/30 transition flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase font-extrabold tracking-wider mb-1">Одитни Доклади & Файлове</p>
                <p className="text-3xl font-black text-white group-hover:text-[#0098b2] transition">{docsCount}</p>
                <p className="text-xs text-[#0098b2] font-bold mt-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  Криптирано хранилище →
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black border bg-[#0098b2]/10 text-[#0098b2] border-[#0098b2]/20">
                {docsCount}
              </div>
            </div>
          </Link>

        </div>

        {/* Navigation / Actions Hub */}
        <div className="mb-8 bg-slate-800/30 border border-slate-700/60 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Навигация в портала</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            <Link href="/portal/tickets/new" className="bg-[#0098b2] hover:bg-[#007a91] text-white p-4 rounded-xl font-bold transition flex flex-col justify-between h-28 shadow-lg shadow-[#0098b2]/10">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Нов тикет</span>
            </Link>

            <Link href="/portal/services" className="bg-slate-800 hover:bg-slate-700 text-white p-4 border border-slate-700 hover:border-slate-600 rounded-xl font-bold transition flex flex-col justify-between h-28 shadow-md">
              <Shield className="w-6 h-6 text-[#0098b2]" />
              <span className="text-sm">Моите услуги</span>
            </Link>

            <Link href="/portal/health" className="bg-slate-800 hover:bg-slate-700 text-white p-4 border border-slate-700 hover:border-slate-600 rounded-xl font-bold transition flex flex-col justify-between h-28 shadow-md">
              <Activity className="w-6 h-6 text-green-400" />
              <span className="text-sm">Здравен статус</span>
            </Link>

            <Link href="/portal/threats" className="bg-slate-800 hover:bg-slate-700 text-white p-4 border border-slate-700 hover:border-slate-600 rounded-xl font-bold transition flex flex-col justify-between h-28 shadow-md">
              <ShieldAlert className="w-6 h-6 text-red-400" />
              <span className="text-sm">Threat Feed</span>
            </Link>

            <Link href="/portal/documents" className="bg-slate-800 hover:bg-slate-700 text-white p-4 border border-slate-700 hover:border-slate-600 rounded-xl font-bold transition flex flex-col justify-between h-28 shadow-md col-span-2 md:col-span-1">
              <FileText className="w-6 h-6 text-[#0098b2]" />
              <span className="text-sm">Документи</span>
            </Link>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Отворени тикети</p>
                <p className="text-3xl font-bold text-white">{openTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">В процес</p>
                <p className="text-3xl font-bold text-white">{inProgressTickets}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Решени</p>
                <p className="text-3xl font-bold text-white">{resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#0098b2]" />
              Моите тикети
            </h2>
          </div>

          {tickets.length === 0 ? (
            <div className="p-12 text-center">
              <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Нямате създадени тикети</p>
              <Link href="/portal/tickets/new">
                <button className="text-[#0098b2] hover:underline">
                  Създайте първия си тикет
                </button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/portal/tickets/${ticket.id}`}
                  className="block p-6 hover:bg-slate-700/30 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">
                        {ticket.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {ticket.messages.length} съобщения
                        </span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(ticket.createdAt).toLocaleDateString("bg-BG")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusLabel(ticket.status)}
                      </span>
                      <span
                        className={`text-xs font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {getPriorityLabel(ticket.priority)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
  Building2
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTickets();
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
            <div>
              <h1 className="text-2xl font-bold text-white">Клиентски портал</h1>
              <p className="text-gray-400 text-sm">
                {(session?.user as any)?.email}
              </p>
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

        {/* Create Ticket Button */}
        <div className="mb-6">
          <Link href="/portal/tickets/new">
            <button className="bg-[#0098b2] hover:bg-[#007a91] text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Нов тикет
            </button>
          </Link>
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

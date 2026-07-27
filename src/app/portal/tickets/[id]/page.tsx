"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  ArrowLeft, 
  Send, 
  Clock, 
  AlertTriangle,
  User,
  Shield,
  MessageSquare,
  X
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  messages: Message[];
  user: {
    name: string;
    email: string;
    company: string;
  };
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const isAdmin = (session?.user as any)?.role === "admin";

  useEffect(() => {
    fetchTicket();

    // Създаване на периодичен Long-Polling интервал за симулиране на SSE / Чат на живо в реално време
    const intervalId = setInterval(() => {
      fetchTicketSilently();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [params.id]);

  const fetchTicketSilently = async () => {
    try {
      const response = await fetch(`/api/portal/tickets/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTicket(data);
      }
    } catch (error) {
      console.error("Грешка при фоново опресняване:", error);
    }
  };

  const handleCloseTicket = async () => {
    if (!confirm("Наистина ли искате да затворите този поддържащ тикет?")) {
      return;
    }

    try {
      const response = await fetch(`/api/portal/tickets/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "closed" }),
      });

      if (response.ok) {
        fetchTicket();
      }
    } catch (error) {
      console.error("Грешка при затваряне на тикет:", error);
    }
  };

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/portal/tickets/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTicket(data);
      } else {
        router.push("/portal/dashboard");
      }
    } catch (error) {
      console.error("Грешка при извличане на тикет:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`/api/portal/tickets/${params.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      });

      if (response.ok) {
        setMessage("");
        fetchTicket();
      }
    } catch (error) {
      console.error("Грешка при изпращане на съобщение:", error);
    } finally {
      setSending(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p>Тикетът не е намерен</p>
          <Link href="/portal/dashboard" className="text-[#0098b2] hover:underline">
            Обратно към dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/portal/dashboard">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              Обратно към dashboard
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Ticket Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">
                {ticket.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(ticket.createdAt).toLocaleString("bg-BG")}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {ticket.user.name}
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
              {ticket.status !== "closed" && (
                <button
                  onClick={handleCloseTicket}
                  className="mt-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Затвори тикет
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 mt-4">
            <p className="text-gray-300">{ticket.description}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-b border-slate-700 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0098b2]" />
            <h2 className="text-lg font-semibold text-white">
              Съобщения ({ticket.messages.length})
            </h2>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {ticket.messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Няма съобщения</p>
              </div>
            ) : (
              ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.isAdmin ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-2xl rounded-xl p-4 ${
                      msg.isAdmin
                        ? "bg-slate-700/50 border border-slate-600"
                        : "bg-[#0098b2]/20 border border-[#0098b2]/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {msg.isAdmin ? (
                        <Shield className="w-4 h-4 text-[#0098b2]" />
                      ) : (
                        <User className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-white">
                        {msg.isAdmin ? "DefComs Support" : msg.user.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleString("bg-BG")}
                      </span>
                    </div>
                    <p className="text-gray-200">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Напишете съобщение..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white px-6 py-3 rounded-xl transition flex items-center gap-2"
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Изпрати
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

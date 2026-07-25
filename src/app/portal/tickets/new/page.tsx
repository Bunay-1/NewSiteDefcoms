"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Send, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function NewTicketPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/portal/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });

      if (response.ok) {
        const ticket = await response.json();
        setSuccess(true);
        setTimeout(() => {
          router.push(`/portal/tickets/${ticket.id}`);
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || "Грешка при създаване на тикет");
      }
    } catch (error) {
      setError("Възникна грешка при създаване на тикет");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/portal/dashboard">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              Обратно към dashboard
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Нов тикет</h1>
          <p className="text-gray-400">
            Създайте нов тикет за поддръжка или въпрос
          </p>
        </div>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Тикетът е създаден успешно!</p>
              <p className="text-sm">Пренасочване към тикета...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Заглавие *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Кратко описание на проблема"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Приоритет
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "low", label: "Нисък", color: "border-gray-500 hover:bg-gray-500/20" },
                  { value: "medium", label: "Среден", color: "border-yellow-500 hover:bg-yellow-500/20" },
                  { value: "high", label: "Висок", color: "border-orange-500 hover:bg-orange-500/20" },
                  { value: "urgent", label: "Спешен", color: "border-red-500 hover:bg-red-500/20" },
                ].map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`border-2 rounded-xl py-3 px-4 text-sm font-medium transition ${
                      priority === p.value
                        ? `${p.color} bg-opacity-20 text-white`
                        : "border-slate-700 text-gray-400 hover:border-slate-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Описание *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Подробно описание на проблема или въпроса..."
                rows={8}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white font-semibold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Създаване...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Създай тикет
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

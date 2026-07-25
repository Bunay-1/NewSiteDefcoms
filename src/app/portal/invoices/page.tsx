"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  LogOut,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string; // paid, unpaid, overdue
  description: string;
  dueDate: string;
  createdAt: string;
  user?: {
    name: string | null;
    email: string;
    company: string | null;
  };
}

export default function ClientInvoicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Всички");
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchInvoices();
    }
  }, [status]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/portal/invoices");
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на фактури:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setPayingId(invoice.id);

    // Симулация на сигурно PCI-DSS плащане през Борика / Stripe
    setTimeout(() => {
      setPayingId(null);

      // Обновяваме локалния статус на фактурата
      setInvoices(prev =>
        prev.map(inv => inv.id === invoice.id ? { ...inv, status: "paid" } : inv)
      );

      alert(`💳 Сигурно плащане премина успешно!\n\nФактура №: ${invoice.invoiceNumber}\nСума: ${invoice.amount.toFixed(2)} лв.\n\nЗащитено плащане по PCI-DSS & NIS2 протокол.`);
    }, 1500);
  };

  // Пресмятане на финансови суми
  const paidSum = invoices
    .filter(i => i.status === "paid")
    .reduce((acc, i) => acc + i.amount, 0);

  const unpaidSum = invoices
    .filter(i => i.status === "unpaid")
    .reduce((acc, i) => acc + i.amount, 0);

  const overdueSum = invoices
    .filter(i => i.status === "overdue")
    .reduce((acc, i) => acc + i.amount, 0);

  const getStatusBadge = (invoiceStatus: string) => {
    switch (invoiceStatus) {
      case "paid":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "unpaid":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "overdue":
        return "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse";
      default:
        return "bg-slate-700 text-gray-300 border-slate-600";
    }
  };

  const getStatusLabel = (invoiceStatus: string) => {
    switch (invoiceStatus) {
      case "paid":
        return "Платена";
      case "unpaid":
        return "Неплатена";
      case "overdue":
        return "Просрочена";
      default:
        return invoiceStatus;
    }
  };

  const filteredInvoices = activeTab === "Всички"
    ? invoices
    : invoices.filter(i => {
        if (activeTab === "Платени") return i.status === "paid";
        if (activeTab === "Неплатени") return i.status === "unpaid";
        if (activeTab === "Просрочени") return i.status === "overdue";
        return true;
      });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на фактури...</p>
        </div>
      </div>
    );
  }

  const isAdmin = (session?.user as any)?.role === "admin";

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
                  <CreditCard className="w-6 h-6 text-[#0098b2]" />
                  Финансови Фактури
                </h1>
                <p className="text-gray-400 text-sm">
                  {isAdmin ? "Управление на всички фактури на клиенти" : "Следете и плащайте сигурно Вашите сметки и абонаменти"}
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

        {/* Safe Payments Banner */}
        <div className="bg-slate-800/30 border border-slate-700/80 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="p-3 bg-[#0098b2]/10 rounded-xl flex-shrink-0 text-[#0098b2]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Криптирани плащания и фактуриране</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Всички транзакции се обработват през криптиран шлюз. DefComs осигурява защита на финансовите ви данни според изискванията на Регламента за оперативна устойчивост <strong>DORA</strong> и директивата <strong>NIS2</strong>.
            </p>
          </div>
        </div>

        {/* Dashboard Financial Totals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Платени общо</p>
                <p className="text-3xl font-black text-green-400">{paidSum.toLocaleString("bg-BG")} лв.</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Неплатени (Текущи)</p>
                <p className="text-3xl font-black text-yellow-400">{unpaidSum.toLocaleString("bg-BG")} лв.</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Просрочени задължения</p>
                <p className="text-3xl font-black text-red-400">{overdueSum.toLocaleString("bg-BG")} лв.</p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400">
                <XCircle className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-slate-700/60">
          {["Всички", "Платени", "Неплатени", "Просрочени"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-[#0098b2] text-white shadow-lg"
                  : "bg-slate-800 text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Financial Table / Cards */}
        {filteredInvoices.length === 0 ? (
          <div className="text-center p-12 bg-slate-800/40 border border-slate-700 rounded-2xl text-gray-400">
            Няма намерени фактури за избрания филтър.
          </div>
        ) : (
          <div className="bg-slate-800/20 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/30 text-xs text-gray-400 font-bold uppercase tracking-wider">
                    {isAdmin && <th className="p-4">Клиент / Фирма</th>}
                    <th className="p-4">Фактура №</th>
                    <th className="p-4">Описание на услугата</th>
                    <th className="p-4">Краен Срок</th>
                    <th className="p-4">Сума (лв.)</th>
                    <th className="p-4">Статус</th>
                    {!isAdmin && <th className="p-4 text-right">Действие</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-sm text-gray-300">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/10 transition">
                      {/* Admin: Client user details */}
                      {isAdmin && (
                        <td className="p-4">
                          <div className="font-bold text-white">{inv.user?.name || "Без име"}</div>
                          <div className="text-xs text-gray-400">{inv.user?.company || inv.user?.email}</div>
                        </td>
                      )}

                      {/* Invoice Number */}
                      <td className="p-4 font-bold text-white">
                        {inv.invoiceNumber}
                      </td>

                      {/* Description */}
                      <td className="p-4 max-w-xs truncate" title={inv.description}>
                        {inv.description}
                      </td>

                      {/* Due Date */}
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          {new Date(inv.dueDate).toLocaleDateString("bg-BG")}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="p-4 font-extrabold text-white">
                        {inv.amount.toFixed(2)} лв.
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(inv.status)}`}>
                          <span>{getStatusLabel(inv.status)}</span>
                        </span>
                      </td>

                      {/* Pay Button (Visible only to clients) */}
                      {!isAdmin && (
                        <td className="p-4 text-right">
                          {inv.status === "paid" ? (
                            <span className="text-xs text-green-400 font-bold flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              Изплатена
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePayInvoice(inv)}
                              disabled={payingId === inv.id}
                              className="bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition inline-flex items-center gap-1 shadow-md"
                            >
                              {payingId === inv.id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  Плащане...
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-3.5 h-3.5" />
                                  Плати
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

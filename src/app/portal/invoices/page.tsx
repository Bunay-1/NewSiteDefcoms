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
  ShieldCheck,
  Download
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

  // Нови състояния за картовото плащане
  const [activePaymentInvoice, setActivePaymentInvoice] = useState<Invoice | null>(null);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handlePayInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentInvoice) return;
    setPaymentError("");
    setPayingId(activePaymentInvoice.id);

    try {
      const res = await fetch("/api/portal/invoices/pay", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activePaymentInvoice.id,
          cardName,
          cardNumber,
          cardExpiry,
          cardCvc
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Обновяваме локалния статус
        setInvoices(prev =>
          prev.map(inv => inv.id === activePaymentInvoice.id ? { ...inv, status: "paid" } : inv)
        );
        alert(`💳 Сигурно плащане премина успешно!\n\nФактура №: ${activePaymentInvoice.invoiceNumber}\nСума: ${activePaymentInvoice.amount.toFixed(2)} €\n\nЗащитено плащане по PCI-DSS & NIS2 протокол.`);
        setActivePaymentInvoice(null);
        setCardName("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvc("");
      } else {
        setPaymentError(data.error || "Грешка при обработка на плащането.");
      }
    } catch (err) {
      setPaymentError("Мрежова грешка. Моля, опитайте отново.");
    } finally {
      setPayingId(null);
    }
  };

  const handleDownloadInvoice = (inv: Invoice) => {
    // Генерация на структурирана фактура като файл
    const invoiceContent = `
ФАКТУРА № ${inv.invoiceNumber}
==========================================
Издател: DefComs Cybersecurity Ltd.
ЕИК: 207452684
ДДС №: BG207452684
МОЛ: Димитър Петров
Адрес: гр. София, бул. България №10
------------------------------------------
Получател: ${inv.user?.name || "Клиент на DefComs"}
Фирма: ${inv.user?.company || "Физическо лице"}
Имейл: ${inv.user?.email || "Няма информация"}
------------------------------------------
Дата на издаване: ${new Date(inv.createdAt).toLocaleDateString("bg-BG")}
Падеж: ${new Date(inv.dueDate).toLocaleDateString("bg-BG")}
Статус: ${inv.status === "paid" ? "ПЛАТЕНА" : "НЕПЛАТЕНА"}
------------------------------------------
Описание на услугата:
${inv.description}

Сума за плащане: ${inv.amount.toFixed(2)} €
(Словом: ${inv.amount} евро)
==========================================
Благодарим Ви, че избрахте сигурността на DefComs!
    `.trim();

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Фактура_${inv.invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`📄 Фактура № ${inv.invoiceNumber} беше изтеглена успешно на Вашето устройство!`);
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
                <p className="text-3xl font-black text-green-400">{paidSum.toLocaleString("bg-BG")} €</p>
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
                <p className="text-3xl font-black text-yellow-400">{unpaidSum.toLocaleString("bg-BG")} €</p>
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
                <p className="text-3xl font-black text-red-400">{overdueSum.toLocaleString("bg-BG")} €</p>
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
                    <th className="p-4">Сума (€)</th>
                    <th className="p-4">Статус</th>
                    <th className="p-4 text-right">Действие</th>
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
                        {inv.amount.toFixed(2)} €
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(inv.status)}`}>
                          <span>{getStatusLabel(inv.status)}</span>
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleDownloadInvoice(inv)}
                            className="bg-slate-700 hover:bg-slate-600 text-gray-200 hover:text-white p-2 rounded-xl text-xs transition inline-flex items-center gap-1"
                            title="Свали фактура (PDF)"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {!isAdmin && (
                            inv.status === "paid" ? (
                              <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Изплатена
                              </span>
                            ) : (
                              <button
                                onClick={() => setActivePaymentInvoice(inv)}
                                className="bg-[#0098b2] hover:bg-[#007a91] text-white font-bold py-1.5 px-4 rounded-xl text-xs transition inline-flex items-center gap-1 shadow-md animate-pulse"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                Плати
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Terminal Payment Dialog */}
        {activePaymentInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-white">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0098b2]" />
                  Сигурно картово плащане (Stripe API)
                </h3>
                <button
                  onClick={() => { setActivePaymentInvoice(null); setPaymentError(""); }}
                  className="text-gray-400 hover:text-white transition"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePayInvoice} className="p-6 space-y-4">
                {paymentError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-semibold">
                    {paymentError}
                  </div>
                )}

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-gray-400">ФАКТУРА №</p>
                  <p className="text-sm font-bold text-white mb-2">{activePaymentInvoice.invoiceNumber}</p>
                  <p className="text-xs text-gray-400">ДЪЛЖИМА СУМА</p>
                  <p className="text-xl font-black text-[#0098b2]">{activePaymentInvoice.amount.toFixed(2)} €</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Име на картодържателя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="напр. Ivan Ivanov"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Номер на банковата карта *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="напр. 4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/[^\d\s]/g, ""))}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Валидност *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="ММ/ГГ"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      CVC / CVV код *
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setActivePaymentInvoice(null); setPaymentError(""); }}
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition"
                  >
                    Отказ
                  </button>
                  <button
                    type="submit"
                    disabled={payingId !== null}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-1.5"
                  >
                    {payingId !== null ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Изплати {activePaymentInvoice.amount.toFixed(2)} €
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

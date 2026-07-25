"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  LogOut,
  User,
  FileText,
  CreditCard,
  Upload,
  PlusCircle,
  Building2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface ClientUser {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
}

export default function AdminPortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Списък с клиенти за падащите менюта
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Форма 1: Качване на документ
  const [docForm, setDocForm] = useState({
    title: "",
    fileSize: "2.5 MB",
    fileType: "PDF",
    targetUserId: "",
  });

  // Форма 2: Издаване на фактура
  const [invForm, setInvForm] = useState({
    invoiceNumber: "",
    amount: "",
    description: "",
    status: "unpaid",
    dueDate: "",
    targetUserId: "",
  });

  const [docSuccess, setDocSuccess] = useState("");
  const [docError, setDocError] = useState("");

  const [invSuccess, setInvSuccess] = useState("");
  const [invError, setInvError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      if (u.role !== "admin") {
        // Забрана за достъп, ако потребителят не е администратор
        router.push("/portal/dashboard");
      } else {
        fetchClients();
      }
    }
  }, [session, router]);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/portal/admin/users");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на клиенти:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setDocSuccess("");
    setDocError("");

    if (!docForm.targetUserId) {
      setDocError("Моля, изберете клиент");
      return;
    }

    try {
      const response = await fetch("/api/portal/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docForm),
      });

      const data = await response.json();

      if (response.ok) {
        setDocSuccess(`✅ Документът "${data.title}" бе успешно качен и изпратен!`);
        setDocForm({
          title: "",
          fileSize: "2.5 MB",
          fileType: "PDF",
          targetUserId: "",
        });
      } else {
        setDocError(data.error || "Грешка при качване на документ");
      }
    } catch (err) {
      setDocError("Възникна вътрешна грешка");
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvSuccess("");
    setInvError("");

    if (!invForm.targetUserId) {
      setInvError("Моля, изберете клиент");
      return;
    }

    try {
      const response = await fetch("/api/portal/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invForm),
      });

      const data = await response.json();

      if (response.ok) {
        setInvSuccess(`✅ Фактура ${data.invoiceNumber} на стойност ${data.amount} лв. бе успешно издадена!`);
        setInvForm({
          invoiceNumber: "",
          amount: "",
          description: "",
          status: "unpaid",
          dueDate: "",
          targetUserId: "",
        });
      } else {
        setInvError(data.error || "Грешка при издаване на фактура");
      }
    } catch (err) {
      setInvError("Възникна вътрешна грешка");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на административен панел...</p>
        </div>
      </div>
    );
  }

  // Защитно състояние, ако ролята не е заредена напълно или е невалидна
  if ((session?.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center p-6 max-w-sm">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-black mb-2">Достъпът е забранен!</h1>
          <p className="text-gray-400 text-sm mb-4">Нямате необходимите права за преглед на тази страница.</p>
          <Link href="/portal/dashboard" className="text-[#0098b2] hover:underline">Обратно към таблото</Link>
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
                  Админ Панел DefComs
                </h1>
                <p className="text-gray-400 text-sm">
                  Прикачване на документи и издаване на финансови фактури към клиенти
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1: Upload document */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700/60 pb-3">
                <Upload className="w-5 h-5 text-[#0098b2]" />
                Качване на одит / доклад към клиент
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Файлът автоматично се шифрира и се изпраща директно в „Документи и доклади“ на съответния клиент.
              </p>

              {docSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{docSuccess}</span>
                </div>
              )}

              {docError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{docError}</span>
                </div>
              )}

              <form onSubmit={handleUploadDocument} className="space-y-4">

                {/* Select Client */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Изберете Клиент</label>
                  <select
                    value={docForm.targetUserId}
                    onChange={(e) => setDocForm({ ...docForm, targetUserId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                    required
                  >
                    <option value="">-- Изберете клиент от списъка --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name || "Без име"} ({c.company || "Няма фирма"}) | {c.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doc Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Име на документа / файла</label>
                  <input
                    type="text"
                    value={docForm.title}
                    onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                    placeholder="напр. Доклад от външен Пентестинг Q2 2024.pdf"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2]"
                    required
                  />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Размер на файла</label>
                    <input
                      type="text"
                      value={docForm.fileSize}
                      onChange={(e) => setDocForm({ ...docForm, fileSize: e.target.value })}
                      placeholder="напр. 2.4 MB"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Формат (Разширение)</label>
                    <select
                      value={docForm.fileType}
                      onChange={(e) => setDocForm({ ...docForm, fileType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                      required
                    >
                      <option value="PDF">PDF (Доклад / Одит)</option>
                      <option value="XLSX">Excel (Инвентаризация)</option>
                      <option value="ZIP">ZIP (Сорс кодове / Пакети)</option>
                      <option value="DOCX">Word (Договор / Рамка)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0098b2] hover:bg-[#007a91] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                >
                  <Upload className="w-5 h-5" />
                  Изпрати защитен документ
                </button>

              </form>
            </div>
          </div>

          {/* Card 2: Create invoice */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700/60 pb-3">
                <PlusCircle className="w-5 h-5 text-[#0098b2]" />
                Издаване на нова финансова фактура
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Фактурата моментално се отразява в сметките на клиента, преизчислявайки финансовите му показатели.
              </p>

              {invSuccess && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{invSuccess}</span>
                </div>
              )}

              {invError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{invError}</span>
                </div>
              )}

              <form onSubmit={handleCreateInvoice} className="space-y-4">

                {/* Select Client */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Изберете Клиент</label>
                  <select
                    value={invForm.targetUserId}
                    onChange={(e) => setInvForm({ ...invForm, targetUserId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                    required
                  >
                    <option value="">-- Изберете клиент от списъка --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name || "Без име"} ({c.company || "Няма фирма"}) | {c.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number & Amount Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Фактура №</label>
                    <input
                      type="text"
                      value={invForm.invoiceNumber}
                      onChange={(e) => setInvForm({ ...invForm, invoiceNumber: e.target.value })}
                      placeholder="напр. INV-2024-102"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Сума (лв.)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={invForm.amount}
                      onChange={(e) => setInvForm({ ...invForm, amount: e.target.value })}
                      placeholder="напр. 1500.00"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2]"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Описание на сметката / услугата</label>
                  <input
                    type="text"
                    value={invForm.description}
                    onChange={(e) => setInvForm({ ...invForm, description: e.target.value })}
                    placeholder="напр. Одиторски консултации за GDPR съответствие"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2]"
                    required
                  />
                </div>

                {/* Date & Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Краен срок (Падеж)</label>
                    <input
                      type="date"
                      value={invForm.dueDate}
                      onChange={(e) => setInvForm({ ...invForm, dueDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Статус по подразбиране</label>
                    <select
                      value={invForm.status}
                      onChange={(e) => setInvForm({ ...invForm, status: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                      required
                    >
                      <option value="unpaid">Неплатена</option>
                      <option value="paid">Платена</option>
                      <option value="overdue">Просрочена</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                >
                  <PlusCircle className="w-5 h-5" />
                  Издай и изпрати фактура
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

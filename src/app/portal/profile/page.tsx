"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  ArrowLeft,
  LogOut,
  Lock,
  Building2,
  Phone,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ClientProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setFormData(prev => ({
        ...prev,
        name: u.name || "",
        company: u.company || "",
        phone: u.phone || "",
      }));
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setErrorMsg("Новите пароли не съвпадат");
        setLoading(false);
        return;
      }
      if (formData.newPassword.length < 6) {
        setErrorMsg("Новата парола трябва да бъде поне 6 символа");
        setLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setErrorMsg("За смяна на парола е необходимо да въведете текущата парола");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          ...(formData.currentPassword && { currentPassword: formData.currentPassword }),
          ...(formData.newPassword && { newPassword: formData.newPassword }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || "Профилът бе обновен успешно");
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));

        // Обновяваме локалната NextAuth сесия, ако е възможно
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            company: formData.company,
            phone: formData.phone,
          }
        });
      } else {
        setErrorMsg(data.error || "Грешка при обновяване на профила");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Възникна вътрешна грешка");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на профил...</p>
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
                  <User className="w-6 h-6 text-[#0098b2]" />
                  Моят профил
                </h1>
                <p className="text-gray-400 text-sm">
                  Управлявайте Вашите лични данни и настройки на сигурността
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

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Alerts */}
        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-6">

          {/* General info */}
          <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[#0098b2]" />
              Основна информация
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Email (Disabled) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Имейл адрес (Непроменяем)
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full bg-slate-900/60 border border-slate-700/60 text-gray-500 rounded-xl py-3 px-4 cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Име
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Вашето име"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Телефонен номер
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+359 888 888 888"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Организация / Фирма
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Име на компанията"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Password Section */}
          <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#0098b2]" />
              Парола и Сигурност
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Текуща парола
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Нова парола
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Минимум 6 символа"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Потвърди нова парола
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                />
              </div>

            </div>
          </div>

          {/* Submit btn */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-[#0098b2]/10"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Запазване...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Запази промените
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

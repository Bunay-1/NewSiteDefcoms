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
  AlertCircle,
  ShieldAlert,
  Bell,
  Clock,
  Key,
  ShieldCheck,
  Smartphone,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Check,
  CheckCircle,
  Plus
} from "lucide-react";
import Link from "next/link";

interface AuditLog {
  id: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  createdAt: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

export default function ClientProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  // Основно състояние за табовете
  const [activeTab, setActiveTab] = useState("profile"); // profile, mfa, notifications, history, apikeys, webhooks

  // 1. Форма за Лична информация и Парола
  const [profileForm, setProfileForm] = useState({
    name: "",
    company: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2. Състояния за 2FA (MFA)
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaSecret, setMfaSecret] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaStep, setMfaStep] = useState(1); // 1: generate, 2: verify

  // 3. Състояния за Настройки на известия
  const [notifications, setNotifications] = useState({
    notifyThreats: true,
    notifyTickets: true,
    notifyInvoices: true,
  });

  // 4. Състояния за История на Сигурността и API Ключове
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");

  // 5. Състояния за Webhooks
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [globalSuccess, setGlobalSuccess] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setProfileForm(prev => ({
        ...prev,
        name: u.name || "",
        company: u.company || "",
        phone: u.phone || "",
      }));
      setMfaEnabled(u.mfaEnabled || false);
      setNotifications({
        notifyThreats: u.notifyThreats !== undefined ? u.notifyThreats : true,
        notifyTickets: u.notifyTickets !== undefined ? u.notifyTickets : true,
        notifyInvoices: u.notifyInvoices !== undefined ? u.notifyInvoices : true,
      });

      // Зареждаме логовете и ключовете
      fetchAuditLogs();
      fetchApiKeys();
      fetchWebhooks();
    }
  }, [session]);

  const fetchWebhooks = async () => {
    try {
      const res = await fetch("/api/portal/profile/webhooks");
      if (res.ok) {
        setWebhooks(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch("/api/portal/profile/logs");
      if (res.ok) {
        setAuditLogs(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApiKeys = async () => {
    try {
      const res = await fetch("/api/portal/profile/apikeys");
      if (res.ok) {
        setApiKeys(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Метод 1: Запазване на Лични Данни и Парола
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGlobalSuccess("");
    setGlobalError("");

    if (profileForm.newPassword || profileForm.confirmPassword) {
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setGlobalError("Новите пароли не съвпадат");
        setLoading(false);
        return;
      }
      if (profileForm.newPassword.length < 6) {
        setGlobalError("Новата парола трябва да бъде поне 6 символа");
        setLoading(false);
        return;
      }
      if (!profileForm.currentPassword) {
        setGlobalError("За смяна на парола е необходимо да въведете текущата парола");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/portal/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileForm.name,
          company: profileForm.company,
          phone: profileForm.phone,
          ...(profileForm.currentPassword && { currentPassword: profileForm.currentPassword }),
          ...(profileForm.newPassword && { newPassword: profileForm.newPassword }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGlobalSuccess(data.message || "Профилът бе обновен успешно");
        setProfileForm(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));

        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: profileForm.name,
            company: profileForm.company,
            phone: profileForm.phone,
          }
        });
        fetchAuditLogs();
      } else {
        setGlobalError(data.error || "Грешка при обновяване на профила");
      }
    } catch (err) {
      setGlobalError("Възникна вътрешна грешка");
    } finally {
      setLoading(false);
    }
  };

  // Метод 5: Управление на уебхукове
  const handleCreateWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhookUrl) return;
    setLoading(true);

    try {
      const res = await fetch("/api/portal/profile/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newWebhookUrl }),
      });

      if (res.ok) {
        setNewWebhookUrl("");
        setGlobalSuccess("Новият Webhook бе регистриран успешно!");
        fetchWebhooks();
        fetchAuditLogs();
      } else {
        const data = await res.json();
        setGlobalError(data.error || "Грешка при създаване на уебхук");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebhook = async (id: string) => {
    if (!confirm("Наистина ли искате да премахнете този Webhook адрес?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/portal/profile/webhooks?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGlobalSuccess("Webhook адресът бе премахнат успешно");
        fetchWebhooks();
        fetchAuditLogs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestWebhook = async (id: string) => {
    setTestingWebhookId(id);
    setGlobalSuccess("");
    setGlobalError("");

    try {
      const res = await fetch("/api/portal/profile/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGlobalSuccess(data.message || "Тестовото събитие бе изпратено успешно!");
      } else {
        setGlobalError(data.message || data.error || "Уебхукът върна грешка при тестване.");
      }
    } catch (err) {
      setGlobalError("Мрежова грешка при тестване на уебхук.");
    } finally {
      setTestingWebhookId(null);
    }
  };

  // Метод 2: Смяна на Настройки за Известия
  const handleUpdateNotifications = async (updated: typeof notifications) => {
    setLoading(true);
    setGlobalSuccess("");
    setGlobalError("");

    try {
      const res = await fetch("/api/portal/profile/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setGlobalSuccess("Предпочитанията за известяване бяха запазени успешно");
        setNotifications(updated);
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            ...updated,
          }
        });
        fetchAuditLogs();
      } else {
        setGlobalError("Грешка при обновяване на настройките за известия");
      }
    } catch (err) {
      setGlobalError("Възникна грешка");
    } finally {
      setLoading(false);
    }
  };

  // Метод 3: 2FA Активиране / Изключване
  const handleGenerateMfaSecret = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/profile/mfa", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setMfaSecret(data.secret);
        setMfaStep(2);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndEnableMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError("");

    if (mfaCode.length !== 6) {
      setGlobalError("Моля, въведете 6-цифрен код");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/portal/profile/mfa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true, code: mfaCode }),
      });

      if (res.ok) {
        setMfaEnabled(true);
        setMfaStep(1);
        setMfaCode("");
        setMfaSecret("");
        setGlobalSuccess("Двуфакторната защита (MFA) бе активирана успешно!");
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            mfaEnabled: true,
          }
        });
        fetchAuditLogs();
      } else {
        const data = await res.json();
        setGlobalError(data.error || "Грешка при активиране на 2FA");
      }
    } catch (err) {
      setGlobalError("Грешка при комуникация със сървъра.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMfa = async () => {
    if (!confirm("Сигурни ли сте, че искате да изключите 2FA защитата на Вашия профил?")) return;
    setLoading(true);

    try {
      const res = await fetch("/api/portal/profile/mfa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: false }),
      });

      if (res.ok) {
        setMfaEnabled(false);
        setGlobalSuccess("Двуфакторната защита (2FA) бе изключена");
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            mfaEnabled: false,
          }
        });
        fetchAuditLogs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Метод 4: Генериране и изтриване на API Ключове
  const handleGenerateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    setLoading(true);

    try {
      const res = await fetch("/api/portal/profile/apikeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });

      if (res.ok) {
        setNewKeyName("");
        setGlobalSuccess("Новият API ключ бе генериран успешно!");
        fetchApiKeys();
        fetchAuditLogs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да деактивирате този API ключ? Всички свързани SIEM системи ще загубят връзка.")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/portal/profile/apikeys?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGlobalSuccess("Ключът бе деактивиран и анулиран успешно");
        fetchApiKeys();
        fetchAuditLogs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKeyToClipboard = (id: string, keyVal: string) => {
    setCopiedKeyId(id);
    navigator.clipboard.writeText(keyVal).catch(() => {});
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на защитен профил...</p>
        </div>
      </div>
    );
  }

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
                  <User className="w-6 h-6 text-[#0098b2]" />
                  Моят профил & Сигурност
                </h1>
                <p className="text-gray-400 text-sm">
                  Настройки на акаунта, двуфакторна защита, одит лог и API ключове за разработчици
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Изход
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Alerts */}
        {globalSuccess && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{globalSuccess}</span>
          </div>
        )}

        {globalError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{globalError}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-700 pb-4">
          <button
            onClick={() => { setActiveTab("profile"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "profile" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            Профил & Парола
          </button>

          <button
            onClick={() => { setActiveTab("mfa"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "mfa" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Двуфакторна (2FA)
          </button>

          <button
            onClick={() => { setActiveTab("notifications"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "notifications" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            Известия & GDPR
          </button>

          <button
            onClick={() => { setActiveTab("history"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "history" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            Одит логове
          </button>

          <button
            onClick={() => { setActiveTab("apikeys"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "apikeys" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Key className="w-4 h-4" />
            API Ключове
          </button>

          <button
            onClick={() => { setActiveTab("webhooks"); setGlobalSuccess(""); setGlobalError(""); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "webhooks" ? "bg-[#0098b2] text-white" : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4 text-green-400" />
            Webhooks
          </button>
        </div>

        {/* Tab 1: Profile & Password info */}
        {activeTab === "profile" && (
          <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-4xl">

            {/* General info */}
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0098b2]" />
                Лична информация
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Имейл адрес (Защитен)</label>
                  <input
                    type="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="w-full bg-slate-900/60 border border-slate-700/60 text-gray-500 rounded-xl py-3 px-4 cursor-not-allowed"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Име</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Телефон за връзка</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Фирма / Организация</label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Password */}
            <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-700/60 pb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#0098b2]" />
                Парола и сигурност
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Текуща парола</label>
                  <input
                    type="password"
                    value={profileForm.currentPassword}
                    onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Нова парола</label>
                  <input
                    type="password"
                    value={profileForm.newPassword}
                    onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                    placeholder="Минимум 6 символа"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Потвърди нова парола</label>
                  <input
                    type="password"
                    value={profileForm.confirmPassword}
                    onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Запази личните данни
              </button>
            </div>

          </form>
        )}

        {/* Tab 2: 2FA MFA settings */}
        {activeTab === "mfa" && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-2xl">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-[#0098b2]" />
              Двуфакторна защита (2FA / MFA)
            </h3>

            {mfaEnabled ? (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-5 rounded-2xl flex items-start gap-4">
                  <ShieldCheck className="w-10 h-10 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">2FA защита е АКТИВНА!</h4>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      Вашият акаунт е напълно защитен. При всеки опит за вход ще се изисква въвеждане на динамичен еднократен код (OTP) от Вашия софтуерен аутентикатор.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleDisableMfa}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 px-6 py-2.5 rounded-xl text-sm font-bold transition"
                  >
                    Изключи 2FA защита
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">

                {mfaStep === 1 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Двуфакторната аутентификация (MFA) добавя допълнително ниво на сигурност за Вашия профил. При вход в системата, освен Вашата парола, ще се изисква въвеждане на краткотраен защитен код, генериран от приложение на Вашия мобилен телефон (напр. Google Authenticator или Microsoft Authenticator).
                    </p>

                    <button
                      onClick={handleGenerateMfaSecret}
                      className="bg-[#0098b2] hover:bg-[#007a91] text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 text-sm"
                    >
                      <Smartphone className="w-5 h-5" />
                      Активиране на 2FA защита
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyAndEnableMfa} className="space-y-6">

                    {/* Simulated QR Code Area */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">

                      {/* Visual QR Simulator */}
                      <div className="w-36 h-36 bg-white rounded-xl p-3 flex flex-col items-center justify-center relative shadow-inner">
                        <div className="w-full h-full border-4 border-slate-950 grid grid-cols-6 gap-0.5 opacity-85">
                          {/* Simulated black and white squares for a real-looking QR mock */}
                          {Array.from({ length: 36 }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-full h-full ${
                                (idx % 2 === 0 && idx % 3 !== 0) || idx < 6 || idx > 29 ? "bg-slate-950" : "bg-white"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldCheck className="w-8 h-8 text-[#0098b2] bg-white p-0.5 rounded-lg border border-gray-200" />
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <p className="text-sm font-bold text-white">Сканирайте QR кода</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Отворете Google Authenticator или друго приложение на Вашия мобилен телефон, сканирайте този QR код или въведете тайното си име ръчно:
                        </p>
                        <p className="font-mono text-xs text-yellow-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg select-all">
                          {mfaSecret}
                        </p>
                      </div>

                    </div>

                    {/* Code verification */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-300">
                        Въведете 6-цифрения код от приложението
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="напр. 123456"
                        className="w-full sm:w-64 bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-center font-mono text-2xl tracking-widest text-white focus:outline-none focus:border-[#0098b2]"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMfaStep(1)}
                        className="bg-slate-800 hover:bg-slate-750 text-gray-300 py-3 px-6 rounded-xl font-semibold transition text-sm"
                      >
                        Отказ
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-xl font-bold transition text-sm"
                      >
                        Потвърди и Свържи
                      </button>
                    </div>

                  </form>
                )}

              </div>
            )}
          </div>
        )}

        {/* Tab 6: Webhooks */}
        {activeTab === "webhooks" && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-4xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-400" />
              Webhooks за разработчици (Реално време)
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Конфигурирайте Webhook събития, за да получавате автоматично JSON нотификации при критични заплахи или нови одитни доклади във вашите вътрешни системи.
            </p>

            {/* Create Form */}
            <form onSubmit={handleCreateWebhook} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                placeholder="напр. https://mycompany.com/api/defcoms-webhook"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                required
              />
              <button
                type="submit"
                className="bg-[#0098b2] hover:bg-[#007a91] text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-sm"
              >
                <Plus className="w-4 h-4" />
                Добави Webhook
              </button>
            </form>

            {/* Webhook List */}
            {webhooks.length === 0 ? (
              <p className="text-center p-6 text-gray-500 text-sm">Няма регистрирани активни Webhooks.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Активни Webhooks</p>
                <div className="space-y-3">
                  {webhooks.map((wh) => (
                    <div
                      key={wh.id}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white mb-1 truncate">{wh.url}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Secret:</span>
                          <code className="font-mono text-xs text-yellow-400 bg-slate-900 px-2 py-0.5 rounded select-all truncate">
                            {wh.secret}
                          </code>
                        </div>
                        <span className="text-[10px] text-gray-500">Добавен на: {new Date(wh.createdAt).toLocaleDateString("bg-BG")}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          disabled={testingWebhookId !== null}
                          onClick={() => handleTestWebhook(wh.id)}
                          className="bg-slate-800 hover:bg-slate-700 text-[#0098b2] border border-[#0098b2]/20 font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center gap-1"
                        >
                          {testingWebhookId === wh.id ? (
                            <>
                              <div className="w-3 h-3 border-2 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin" />
                              Тестване...
                            </>
                          ) : (
                            "Тествай"
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteWebhook(wh.id)}
                          className="p-2.5 text-gray-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition"
                          title="Премахни"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Notifications Preferences */}
        {activeTab === "notifications" && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-2xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#0098b2]" />
              Предпочитания за известяване & GDPR
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Съгласно изискванията на регламента за лични данни <strong>GDPR</strong>, Вие имате пълен контрол върху това какви имейл комуникации и предупреждения искате да получавате от SOC центъра ни.
            </p>

            <div className="space-y-4">

              {/* Threats */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Критични заплахи и предупреждения</h4>
                  <p className="text-xs text-gray-400">Threat Intelligence ранни бюлетини за сигурност по NIS2.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.notifyThreats}
                  onChange={(e) => handleUpdateNotifications({ ...notifications, notifyThreats: e.target.checked })}
                  className="w-10 h-6 rounded-full bg-slate-800 border-slate-700 text-[#0098b2] focus:ring-[#0098b2] cursor-pointer"
                />
              </div>

              {/* Tickets */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Нови съобщения по тикети</h4>
                  <p className="text-xs text-gray-400">Известия по имейл при нов отговор от наш аналитик.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.notifyTickets}
                  onChange={(e) => handleUpdateNotifications({ ...notifications, notifyTickets: e.target.checked })}
                  className="w-10 h-6 rounded-full bg-slate-800 border-slate-700 text-[#0098b2] focus:ring-[#0098b2] cursor-pointer"
                />
              </div>

              {/* Invoices */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Издадени финансови сметки и фактури</h4>
                  <p className="text-xs text-gray-400">Уведомления за дължими суми, плащания и падежи по DORA.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.notifyInvoices}
                  onChange={(e) => handleUpdateNotifications({ ...notifications, notifyInvoices: e.target.checked })}
                  className="w-10 h-6 rounded-full bg-slate-800 border-slate-700 text-[#0098b2] focus:ring-[#0098b2] cursor-pointer"
                />
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Audit Security logs */}
        {activeTab === "history" && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="border-b border-slate-700 pb-3 flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0098b2]" />
                Security Audit Log (История на влизанията)
              </h3>
              <span className="text-xs text-gray-400">Изискване по NIS2 и ISO 27001</span>
            </div>

            {auditLogs.length === 0 ? (
              <p className="text-center p-6 text-gray-400">Липсват записи в одит лога в момента.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-800/20 text-xs text-gray-400 uppercase font-bold tracking-wider">
                      <th className="p-3">Действие / Събитие</th>
                      <th className="p-3">IP Адрес</th>
                      <th className="p-3">Устройство / Браузър</th>
                      <th className="p-3">Време на събитието</th>
                      <th className="p-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/10 transition">
                        <td className="p-3 font-bold text-white">{log.action}</td>
                        <td className="p-3 font-mono text-xs">{log.ipAddress}</td>
                        <td className="p-3 text-xs max-w-xs truncate" title={log.userAgent}>{log.userAgent}</td>
                        <td className="p-3 text-xs">{new Date(log.createdAt).toLocaleString("bg-BG")}</td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${
                            log.status === "success"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
                          }`}>
                            {log.status === "success" ? "Успешно" : "Блокирано"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Developer API Keys */}
        {activeTab === "apikeys" && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl max-w-4xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
              <Key className="w-5 h-5 text-[#0098b2]" />
              API Ключове за интеграция (SIEM / SOAR)
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Генерирайте частни токени за сигурност, за да свържете Вашата вътрешна ИТ инфраструктура (Splunk, Elastic, Sentinel) с денонощния SOC център на DefComs.
            </p>

            {/* Create form */}
            <form onSubmit={handleGenerateApiKey} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="напр. SIEM Интеграционен Ключ"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#0098b2]"
                required
              />
              <button
                type="submit"
                className="bg-[#0098b2] hover:bg-[#007a91] text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-sm"
              >
                <Plus className="w-4 h-4" />
                Генерирай нов ключ
              </button>
            </form>

            {/* List */}
            {apiKeys.length === 0 ? (
              <p className="text-center p-6 text-gray-500 text-sm">Няма намерени активни API ключове.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Активни ключове</p>
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white mb-1 truncate">{key.name}</h4>
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs text-gray-400 bg-slate-900 px-2 py-1 rounded select-all truncate">
                            {key.key}
                          </code>
                          <button
                            onClick={() => handleCopyKeyToClipboard(key.id, key.key)}
                            className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-slate-800 transition flex-shrink-0"
                            title="Копирай ключа"
                          >
                            {copiedKeyId === key.id ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <span className="text-[10px] text-gray-500">Генериран на: {new Date(key.createdAt).toLocaleDateString("bg-BG")}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteApiKey(key.id)}
                        className="p-2.5 text-gray-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition flex-shrink-0"
                        title="Деактивирай"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

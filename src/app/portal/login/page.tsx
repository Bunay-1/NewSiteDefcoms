"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Shield, Smartphone } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Състояния за 2FA Verification Step
  const [showMfaStep, setShowMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const handleMfaVerifyAndLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Проверяваме въведения 2FA код през нашия API ендпойнт
      const verifyRes = await fetch("/api/portal/profile/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: mfaCode }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setError(verifyData.error || "Невалиден или изтекъл код за сигурност");
        setLoading(false);
        return;
      }

      // 2. При успешен 2FA код, довършваме стандартния Credentials вход
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Грешка при финализиране на сесията");
      } else {
        router.push("/portal/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Възникна системна грешка при 2FA верификация");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Първо правим предварителен лек прочит дали потребителят съществува и дали 2FA е активно за него.
      // За тази цел ще направим сигурна бърза заявка за проверка.
      const preCheckRes = await fetch("/api/portal/profile/mfa/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const preCheckData = await preCheckRes.json();

      if (!preCheckRes.ok) {
        setError(preCheckData.error || "Грешен имейл или парола");
        setLoading(false);
        return;
      }

      if (preCheckData.mfaEnabled) {
        // Потребителят е въвел правилна парола и има АКТИВНО 2FA, показваме стъпката за OTP код
        setShowMfaStep(true);
        setLoading(false);
      } else {
        // Потребителят няма активно 2FA, направо го вписваме в портала
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Грешен имейл или парола");
        } else {
          router.push("/portal/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      setError("Възникна грешка при влизане");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#0098b2]/15 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#0098b2]" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Клиентски портал
            </h1>
            <p className="text-gray-400 text-sm">
              {showMfaStep ? "Двуфакторна автентификация" : "Влезте в акаунта си за достъп до тикети и услуги"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* 2FA OTP Step */}
          {showMfaStep ? (
            <form onSubmit={handleMfaVerifyAndLogin} className="space-y-5">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300 text-center">
                  Въведете еднократния код от Google Authenticator
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="напр. 123456"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-center font-mono text-xl tracking-widest text-white focus:outline-none focus:border-[#0098b2]"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Верифициране...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    Потвърди и Влез
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMfaStep(false);
                  setMfaCode("");
                  setError("");
                }}
                className="w-full text-center text-sm text-gray-400 hover:text-white transition mt-2"
              >
                Отказ
              </button>
            </form>
          ) : (
            /* Standard Login Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Имейл
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Парола
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Влизане...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Влезте в акаунта
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#0098b2] text-sm transition inline-flex items-center gap-1"
            >
              ← Обратно към началната страница
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          За регистрация, моля свържете се с екипа на DefComs
        </p>
      </div>
    </div>
  );
}

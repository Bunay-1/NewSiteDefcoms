"use client";

import React, { useState } from "react";
import { Mail, Check, ShieldAlert } from "lucide-react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Моля, въведете валиден имейл адрес.");
      return;
    }

    if (!consent) {
      setStatus("error");
      setErrorMessage("Трябва да се съгласите с получаването на маркетингови съобщения.");
      return;
    }

    setStatus("loading");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setConsent(false);
    }, 800);
  };

  return (
    <section className="bg-slate-900/80 border-t border-slate-800 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/90 to-slate-900 border border-[#0098b2]/20 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,152,178,0.05),transparent_50%)]"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0098b2]/15 text-[#0098b2] rounded-xl mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Абонирайте се за Бюлетин
          </h2>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            Получавайте най-новите анализи на уязвимости (CVE), новини по киберсигурност, регулации на ЕС (NIS2, DORA) и изключителни оферти директно в пощата си.
          </p>

          {status === "success" ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <p className="font-semibold text-white">Благодарим ви!</p>
              <p className="text-xs text-gray-300 text-center">
                Успешно се абонирахте за нашия информационен бюлетин и маркетингови съобщения.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs text-[#0098b2] hover:underline"
              >
                Абониране на друг имейл
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Въведете вашия бизнес имейл"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#0098b2] transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#f22020] hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-3.5 px-8 rounded-xl transition duration-150 flex items-center justify-center gap-2 text-sm flex-shrink-0"
                >
                  {status === "loading" ? "Абониране..." : "Абонирай се"}
                </button>
              </div>

              {/* GDPR and Marketing Consent Checkbox */}
              <div className="flex items-start gap-3 text-left">
                <input
                  type="checkbox"
                  id="marketing-consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (status === "error") setStatus("idle");
                  }}
                  className="w-4 h-4 mt-1 accent-[#0098b2] rounded bg-slate-950 border-slate-700 text-[#0098b2] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="marketing-consent" className="text-xs text-gray-400 leading-normal cursor-pointer select-none">
                  Съгласявам се да получавам седмични анализи на киберсигурността, бюлетини за нови уязвимости и персонализирани маркетингови съобщения/оферти от DefComs, в съответствие с нашата <a href="/privacy" className="text-[#0098b2] hover:underline" target="_blank">Политика за поверителност</a>. Мога да се отпиша по всяко време.
                </label>
              </div>

              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2 text-left">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

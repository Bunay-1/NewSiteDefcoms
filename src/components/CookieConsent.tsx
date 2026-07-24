"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentType, setConsentType] = useState<string | null>(null);

  useEffect(() => {
    // Check if consent has already been given
    const savedConsent = localStorage.getItem("defcoms_cookie_consent");
    if (!savedConsent) {
      // Delay presentation slightly for optimal UX and entry effects
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setConsentType(savedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("defcoms_cookie_consent", "all");
    setConsentType("all");
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("defcoms_cookie_consent", "essential");
    setConsentType("essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-slate-900/95 backdrop-blur-md border border-[#0098b2]/40 rounded-2xl p-6 shadow-[0_10px_50px_rgba(0,152,178,0.15)] z-[9999] animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#0098b2]/10 rounded-xl border border-[#0098b2]/20 flex-shrink-0 text-[#0098b2]">
          <Cookie className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-bold text-base flex items-center gap-1.5">
              Използване на бисквитки (Cookies)
            </h4>
            <button
              onClick={handleAcceptEssential}
              className="text-gray-500 hover:text-white transition duration-200"
              aria-label="Затвори"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Ние използваме бисквитки, за да гарантираме най-добрата функционалност на нашия уебсайт за киберсигурност, да анализираме мрежовия трафик и да оптимизираме защитата в реално време. Прочетете повече в нашата{" "}
            <Link
              href="/privacy"
              className="text-[#0098b2] font-semibold hover:underline"
            >
              Политика за поверителност
            </Link>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleAcceptEssential}
              className="flex-1 text-xs font-semibold text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 py-2.5 px-4 rounded-xl transition duration-200"
            >
              Само необходими
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 text-xs font-black text-white bg-gradient-to-r from-[#0098b2] to-cyan-500 hover:opacity-90 py-2.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-1 shadow-md shadow-[#0098b2]/10"
            >
              <Check className="w-3.5 h-3.5" /> Приемам всички
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

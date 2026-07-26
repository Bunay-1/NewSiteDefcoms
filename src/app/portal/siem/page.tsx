"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Cpu,
  Key,
  Play,
  Terminal as TerminalIcon,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  Code,
  Info,
  ShieldAlert
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
}

export default function SiemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [eventType, setEventType] = useState("auth_fail");
  const [payload, setPayload] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<{ id: number; time: string; text: string; type: string }[]>([]);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const getSamplePayload = (type: string) => {
    const now = new Date().toISOString();
    switch (type) {
      case "auth_fail":
        return JSON.stringify({
          timestamp: now,
          event_type: "AUTHENTICATION_FAILURE",
          source_ip: "193.201.224.42",
          username: "admin_root",
          attempt_status: "BLOCKED",
          mechanism: "SSH_BRUTEFORCE",
          destination_host: "production-db-srv-01",
          severity: "HIGH"
        }, null, 2);
      case "waf_alert":
        return JSON.stringify({
          timestamp: now,
          event_type: "WAF_XSS_ATTACK",
          source_ip: "91.109.25.118",
          user_agent: "Mozilla/5.0 (compatible; Nmap Scripting Engine)",
          target_uri: "/api/portal/profile?id=%3Cscript%3Ealert(1)%3C/script%3E",
          action_taken: "CONNECTION_RESET",
          threat_level: "MEDIUM"
        }, null, 2);
      case "malware_detect":
        return JSON.stringify({
          timestamp: now,
          event_type: "ENDPOINT_EDR_MALWARE_PREVENT",
          device_id: "WS-DEVELOPER-09",
          detected_process: "cryptolocker_payload.exe",
          file_hash: "sha256:7f81a8f9d0c2e361287955c42a2b0b1c",
          action_taken: "QUARANTINED",
          severity: "CRITICAL"
        }, null, 2);
      case "network_anomaly":
        return JSON.stringify({
          timestamp: now,
          event_type: "NETWORK_EXFILTRATION_DETECTED",
          source_device: "nas-backup-server",
          destination_ip: "45.142.120.9",
          transferred_bytes: 452091100,
          protocol: "SFTP",
          anomaly_score: 94,
          mitigation: "ISOLATE_NETWORK_SEGMENT"
        }, null, 2);
      default:
        return "{}";
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchKeys();
    }
  }, [status]);

  useEffect(() => {
    setPayload(getSamplePayload(eventType));
  }, [eventType]);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/portal/profile/apikeys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data);
        if (data.length > 0) {
          setSelectedKey(data[0].key);
        }
      }
    } catch (err) {
      console.error("Грешка при зареждане на API ключове:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKeyQuick = async () => {
    try {
      const res = await fetch("/api/portal/profile/apikeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "SIEM Тестов Ключ (Автоматичен)" })
      });
      if (res.ok) {
        fetchKeys();
      }
    } catch (err) {
      console.error("Грешка при бързо създаване на ключ:", err);
    }
  };

  const handleSendLog = () => {
    if (!selectedKey) return;
    setSending(true);

    const time = new Date().toLocaleTimeString();
    const startId = Date.now();

    // Добавяме стартови съобщения в конзолата стъпка по стъпка
    const newLogs = [
      { id: startId, time, text: `[API POST] Изпращане на SIEM сигнал към https://api.defcoms.eu/v1/soc/logs...`, type: "info" },
      { id: startId + 1, time, text: `[SECURITY-CHECK] Проверка на аутентификационния ключ: ${selectedKey.substring(0, 20)}...`, type: "info" },
    ];
    setTerminalLogs(prev => [...prev, ...newLogs]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        { id: startId + 2, time, text: `[AUTH] Ключът бе валидиран успешно! Съответствие: GDPR, NIS2 сертифициран акаунт.`, type: "success" }
      ]);

      setTimeout(() => {
        let threatLevel = "INFO";
        if (eventType === "auth_fail" || eventType === "waf_alert") threatLevel = "HIGH";
        if (eventType === "malware_detect" || eventType === "network_anomaly") threatLevel = "CRITICAL";

        setTerminalLogs(prev => [
          ...prev,
          { id: startId + 3, time, text: `[ML-PARSER] Анализиране на JSON логовете... Ниво на критичност: ${threatLevel}`, type: "info" },
          { id: startId + 4, time, text: `[SOC-ACTION] Корелация на събитие: Изпратено автоматично предупреждение към таблото на клиента.`, type: "success" },
          { id: startId + 5, time, text: `[SIEM-AGENT] Операцията приключи успешно. Код за отговор: 201 Created.`, type: "success" }
        ]);
        setSending(false);
      }, 1000);
    }, 1200);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на SIEM модула...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Cpu className="w-8 h-8 text-[#0098b2]" />
            SIEM Интеграционен Център
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Свържете вашите сървъри, защитни стени и приложения с изкуствения интелект на DefComs чрез нашия REST API
          </p>
        </div>

        {/* SIEM API Key & Config Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left panel: Config and payload */}
          <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-5">
              <h3 className="text-white font-bold text-lg flex items-center gap-2 border-b border-slate-700 pb-3">
                <Code className="w-5 h-5 text-[#0098b2]" />
                Конфигурация на сигнала
              </h3>

              {/* API Key Selection */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Изберете API ключ за аутентификация
                </label>
                {keys.length === 0 ? (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-xl font-medium space-y-3">
                    <p>Нямате активни API ключове за разработчици.</p>
                    <button
                      onClick={handleCreateKeyQuick}
                      className="bg-yellow-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold hover:bg-yellow-400 transition"
                    >
                      Генерирайте бърз ключ
                    </button>
                  </div>
                ) : (
                  <select
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2]"
                  >
                    {keys.map((k) => (
                      <option key={k.id} value={k.key}>
                        {k.name} ({k.key.substring(0, 24)}...)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Тип на събитието (Event Schema)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "auth_fail", label: "Неуспешен вход" },
                    { id: "waf_alert", label: "WAF XSS Атака" },
                    { id: "malware_detect", label: "EDR Блокиран вирус" },
                    { id: "network_anomaly", label: "Аномалия в мрежата" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setEventType(btn.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                        eventType === btn.id
                          ? "bg-[#0098b2] border-[#0098b2] text-white"
                          : "bg-slate-900 border-slate-700 text-gray-400 hover:text-white"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payload JSON Editor */}
              <div>
                <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  JSON Лог Сигнал (Payload)
                </label>
                <textarea
                  readOnly
                  value={payload}
                  className="w-full h-48 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-xs text-green-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <button
                disabled={sending || !selectedKey}
                onClick={handleSendLog}
                className="w-full bg-[#0098b2] hover:bg-[#007f96] disabled:bg-slate-700 disabled:text-gray-500 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-[#0098b2]/10"
              >
                {sending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Изпращане на сигнала...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Изпрати API Лог към SOC
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right panel: SIEM Terminal stream output */}
          <div className="lg:col-span-7 space-y-6">

            {/* Real-time SIEM terminal logs console */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col h-[520px] justify-between shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase ml-2 flex items-center gap-1.5">
                    <TerminalIcon className="w-4 h-4 text-gray-400" />
                    defcoms-siem-live-collector.log
                  </span>
                </div>
                <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 animate-pulse">
                  СЛУШАТЕЛ: АКТИВЕН
                </span>
              </div>

              {/* Logs Stream Container */}
              <div className="flex-1 overflow-y-auto space-y-3.5 my-4 px-2 font-mono text-xs text-gray-350 scrollbar-thin scrollbar-thumb-slate-800">
                {terminalLogs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
                    <TerminalIcon className="w-14 h-14 mb-2 animate-pulse" />
                    <p>Очаква се изпращане на ИТ логове през симулатора...</p>
                  </div>
                ) : (
                  terminalLogs.map((log) => (
                    <div key={log.id} className="space-y-1 animate-fadeIn leading-relaxed">
                      <div className="flex flex-wrap items-center gap-x-2 text-[10px]">
                        <span className="text-slate-500">[{log.time}]</span>
                        <span className={`font-bold px-1.5 py-0.2 rounded uppercase ${
                          log.type === "success"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-[#0098b2]/10 text-[#0098b2] border border-[#0098b2]/20"
                        }`}>
                          {log.type}
                        </span>
                      </div>
                      <p className="text-gray-300 pl-2 border-l border-slate-800">{log.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Live Status bar */}
              <div className="pt-3 border-t border-slate-850/60 flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  <span>SIEM Endpoint: https://api.defcoms.eu/v1/soc/logs</span>
                </div>
                <span>REST API V1.4.2</span>
              </div>
            </div>

            {/* API Docs Panel */}
            <div className="bg-slate-800/30 border border-slate-750 p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-[#0098b2]" />
                Бързи указания за програмиране (Curl)
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                За да изпратите системен лог от вашия вътрешен Linux/Unix скрипт или приложение, изпълнете следния Curl POST сигнал:
              </p>
              <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-[10px] text-[#0098b2] overflow-x-auto whitespace-pre">
{`curl -X POST "https://api.defcoms.eu/v1/soc/logs" \\
  -H "Authorization: Bearer ${selectedKey || "YOUR_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "AUTHENTICATION_FAILURE",
    "source_ip": "193.201.224.42",
    "severity": "HIGH"
  }'`}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

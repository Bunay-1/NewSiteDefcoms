"use client";

import { useState, useEffect } from "react";
import { AlertOctagon, Filter, ShieldAlert, BookOpen, Clock, RefreshCw, Search, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ThreatAdvisory {
  id: string;
  cveId: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  score: number;
  software: string;
  title: string;
  publishedDate: string;
  description: string;
  defcomsAction: string;
  mitigationSteps: string[];
}

export default function ThreatHub() {
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAdvisory, setSelectedAdvisory] = useState<ThreatAdvisory | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Преди 1 минута");

  // Mock static live-simulated CVE advisory feeds
  const initialAdvisories: ThreatAdvisory[] = [
    {
      id: "adv-1",
      cveId: "CVE-2024-43400",
      severity: "CRITICAL",
      score: 9.8,
      software: "Windows Server / Active Directory",
      title: "Отдалечено изпълнение на произволен код (RCE) в Active Directory Domain Services",
      publishedDate: "Днес, 08:30 ч.",
      description: "Критична уязвимост в Active Directory позволява на неавтентифициран нападател в локалната мрежа да изпрати специално изработена LDAP заявка и да получи пълен контрол (Domain Admin) над цялата корпоративна мрежа.",
      defcomsAction: "Нашите SOC сензори автоматично засичат и блокират нестандартни LDAP заявки в реално време на ниво вътрешен трафик. Всички клиенти с активна SIEM корелация са защитени.",
      mitigationSteps: [
        "Инсталирайте спешно кумулативния ъпдейт за сигурност от Microsoft KB5034100.",
        "Ограничете достъпа до LDAP (порт 389 и 636) само до доверени IP адреси.",
        "Активирайте LDAP signing и LDAP channel binding политики."
      ]
    },
    {
      id: "adv-2",
      cveId: "CVE-2024-30012",
      severity: "HIGH",
      score: 8.8,
      software: "VMware vSphere & ESXi",
      title: "Препълване на буфера (Heap Buffer Overflow) в ESXi USB контролера",
      publishedDate: "Вчера, 16:45 ч.",
      description: "Открита е сериозна уязвимост в VMware ESXi, позволяваща на нападател с локални привилегии над дадена виртуална машина да ескалира правата си и да получи достъп до физическия хост и други виртуални машини в мрежата.",
      defcomsAction: "Нашият Vulnerability Scanner автоматично инвентаризира засегнатите ESXi хостове и изпраща предупреждение с най-висок приоритет до Вашия ИТ екип.",
      mitigationSteps: [
        "Обновете виртуалните хостове до VMware ESXi 8.0 Update 3 или по-нов.",
        "Деактивирайте USB контролера в настройките на виртуалните машини, ако не е абсолютно необходим.",
        "Прегледайте системните логове за неочаквани рестартирания на виртуалните машини."
      ]
    },
    {
      id: "adv-3",
      cveId: "CVE-2024-51299",
      severity: "CRITICAL",
      score: 9.6,
      software: "OpenSSL / Linux Web Servers",
      title: "Критично разкриване на памет при обработка на TLS сертификати в OpenSSL",
      publishedDate: "Преди 2 дни",
      description: "Уязвимост от тип 'Memory Leak' позволява на отдалечен клиент да прочете секретни сесийни ключове от паметта на уеб сървъра по време на TLS ръкостискане.",
      defcomsAction: "Екипът на DefComs Security Intelligence извърши сканиране на външните уеб сървъри за всички наши клиенти и подпомогна замяната на уязвимите OpenSSL библиотеки.",
      mitigationSteps: [
        "Актуализирайте OpenSSL до версия 3.2.1 или по-нова на всички Linux сървъри.",
        "Рестартирайте Nginx / Apache уеб сървърите след обновяване на библиотеките.",
        "Регенерирайте частните ключове на TLS сертификатите при съмнение за теч."
      ]
    },
    {
      id: "adv-4",
      cveId: "CVE-2024-21893",
      severity: "HIGH",
      score: 8.2,
      software: "Ivanti Connect Secure / VPN",
      title: "Заобикаляне на удостоверяването (SAML Auth Bypass) в VPN шлюзове",
      publishedDate: "Преди 4 дни",
      description: "Заобикаляне на автентикацията в Ivanti VPN портали дава достъп на външни лица до вътрешни корпоративни ресурси без нужда от валидно потребителско име и парола.",
      defcomsAction: "Нашите EDR агенти наблюдават поведението на сървърите и блокират опити за качване на 'web shells' след неразрешено заобикаляне на VPN защитата.",
      mitigationSteps: [
        "Внедрете спешните пачове или официалния XML скрипт за смекчаване (mitigation) от Ivanti.",
        "Прегледайте списъка с активни сесии за необичайни IP адреси от чужди държави.",
        "Временно преминаване към резервен VPN шлюз или филтрация по IP за администратори."
      ]
    },
    {
      id: "adv-5",
      cveId: "CVE-2024-12345",
      severity: "MEDIUM",
      score: 6.5,
      software: "Google Chrome",
      title: "Тип смесване (Type Confusion) в V8 JavaScript енджина",
      publishedDate: "Преди 5 дни",
      description: "Локална уязвимост в браузъра позволява на злонамерени уебсайтове да изпълнят код в контекста на потребителската сесия. Наблюдава се експлоатация в реалната среда.",
      defcomsAction: "Нашият Endpoint Protection модул редовно проверява версията на браузърите на потребителите и алармира за остарели софтуери.",
      mitigationSteps: [
        "Осигурете автоматично обновяване на браузъра Google Chrome до последна версия на всички фирмени машини.",
        "Активирайте функцията Google Safe Browsing в настройките на браузъра."
      ]
    }
  ];

  const [advisories, setAdvisories] = useState<ThreatAdvisory[]>(initialAdvisories);

  useEffect(() => {
    // Select the first one by default if desktop
    if (advisories.length > 0 && !selectedAdvisory) {
      setSelectedAdvisory(advisories[0]);
    }
  }, [advisories, selectedAdvisory]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("Току-що");
    }, 1200);
  };

  const filteredAdvisories = advisories.filter((adv) => {
    const matchesSeverity = filterSeverity === "ALL" || adv.severity === filterSeverity;
    const matchesSearch =
      adv.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adv.software.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "HIGH":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-10 text-white max-w-7xl mx-auto">

      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-slate-800 pb-6 mb-8">

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Търсене по CVE номер, софтуер или заглавие..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2]"
          />
        </div>

        {/* Severity filter and Refresh */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800 border border-slate-750 rounded-xl px-3 py-1 text-sm text-gray-400">
            <Filter className="w-4 h-4 mr-2" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-transparent text-white border-none focus:outline-none text-xs font-bold cursor-pointer"
            >
              <option value="ALL">Всички нива</option>
              <option value="CRITICAL">Critical (9.0+)</option>
              <option value="HIGH">High (7.0 - 8.9)</option>
              <option value="MEDIUM">Medium (4.0 - 6.9)</option>
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="bg-slate-800 border border-slate-750 text-gray-400 hover:text-white p-2.5 rounded-xl transition duration-150 flex items-center justify-center gap-2 text-xs font-semibold"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#0098b2]" : ""}`} />
            <span className="hidden sm:inline">Обнови фийда</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Advisories List */}
        <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2 px-1">
            <span>Намерени бюлетини: {filteredAdvisories.length}</span>
            <span>Последна синхронизация: {lastUpdated}</span>
          </div>

          {filteredAdvisories.length > 0 ? (
            filteredAdvisories.map((adv) => {
              const isSelected = selectedAdvisory?.id === adv.id;
              return (
                <button
                  key={adv.id}
                  onClick={() => setSelectedAdvisory(adv)}
                  className={`w-full text-left p-5 rounded-2xl border transition duration-200 flex flex-col justify-between group focus:outline-none ${
                    isSelected
                      ? "bg-slate-850 border-[#0098b2] shadow-lg shadow-[#0098b2]/5"
                      : "bg-slate-800/30 border-slate-750 hover:border-slate-700 hover:bg-slate-800/50"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2.5">
                      <span className="font-mono font-bold text-xs text-[#0098b2] tracking-wider">
                        {adv.cveId}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-full ${getSeverityBadgeColor(adv.severity)}`}>
                        {adv.severity} ({adv.score})
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#0098b2] transition-colors line-clamp-2 leading-snug mb-2">
                      {adv.title}
                    </h4>
                    <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                      Софтуер: <span className="text-gray-300">{adv.software}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {adv.publishedDate}
                    </span>
                    <span className="text-[#0098b2] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Детайли <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-850 rounded-2xl border border-slate-750 text-gray-400">
              <AlertOctagon className="w-10 h-10 mx-auto text-yellow-500 mb-3 animate-pulse" />
              <p className="text-sm font-semibold mb-1">Няма открити бюлетини</p>
              <p className="text-xs text-gray-500">Опитайте друго търсене или променете филтрите за сериозност.</p>
            </div>
          )}
        </div>

        {/* Right Side: Advisory Detail View */}
        <div className="lg:col-span-7 bg-slate-850/40 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          {selectedAdvisory ? (
            <div className="space-y-6">
              {/* Header Details */}
              <div className="border-b border-slate-700 pb-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-mono font-bold px-3 py-1 rounded-lg">
                    {selectedAdvisory.cveId}
                  </span>
                  <span className={`text-xs font-black px-3 py-1 border rounded-full ${getSeverityBadgeColor(selectedAdvisory.severity)}`}>
                    {selectedAdvisory.severity} Риск (Базова оценка {selectedAdvisory.score})
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">
                  {selectedAdvisory.title}
                </h3>
                <div className="text-xs text-gray-400 mt-2 flex items-center gap-4">
                  <span>Засегнат софтуер: <strong className="text-white font-semibold">{selectedAdvisory.software}</strong></span>
                  <span>|</span>
                  <span>Публикувано: <strong className="text-gray-300 font-semibold">{selectedAdvisory.publishedDate}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#0098b2]" />
                  Описание на уязвимостта:
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-800">
                  {selectedAdvisory.description}
                </p>
              </div>

              {/* Mitigation Steps */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertOctagon className="w-4 h-4 text-yellow-500" />
                  Спешни мерки за защита (Ремидиация):
                </h4>
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800">
                  <ul className="space-y-3">
                    {selectedAdvisory.mitigationSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-gray-300 leading-normal">
                        <span className="bg-yellow-500/20 text-yellow-400 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DefComs Active Action */}
              <div className="bg-gradient-to-r from-emerald-950/20 to-teal-950/10 border border-emerald-500/20 rounded-xl p-5">
                <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Как ви предпазва DefComs Platform?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedAdvisory.defcomsAction}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <ShieldAlert className="w-12 h-12 mx-auto text-gray-500 mb-4" />
              <p className="text-sm">Изберете бюлетин от списъка вляво, за да прочетете пълните детайли за уязвимостта и стъпките за защита.</p>
            </div>
          )}

          {/* Prompt CTA */}
          <div className="border-t border-slate-850 mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-400 text-center sm:text-left">
              Притеснявате ли се за сигурността на вашите критични сървъри?
            </span>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-[#f22020] hover:bg-red-700 text-white font-bold text-xs py-2.5 px-5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-md shadow-red-600/10">
                Заявете спешен Vulnerability Scan
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

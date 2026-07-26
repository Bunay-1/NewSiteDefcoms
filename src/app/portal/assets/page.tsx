"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Server,
  Globe,
  Monitor,
  Cloud,
  Network,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle2,
  X,
  PlusCircle
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  ipAddress: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function AssetsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  // Форма за добавяне
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("Сървър");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Симулация на сканиране
  const [scanningAssetId, setScanningAssetId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAssets();
    }
  }, [status]);

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/portal/assets");
      if (res.ok) {
        const data = await res.json();
        setAssets(data);
      }
    } catch (err) {
      console.error("Грешка при зареждане на активи:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ipAddress) {
      setErrorMsg("Моля, попълнете всички задължителни полета.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/portal/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ipAddress, type }),
      });

      if (res.ok) {
        setName("");
        setIpAddress("");
        setType("Сървър");
        setIsModalOpen(false);
        fetchAssets();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Грешка при създаване на актив.");
      }
    } catch (err) {
      setErrorMsg("Възникна мрежова грешка.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!confirm("Наистина ли искате да изтриете този актив?")) return;

    try {
      const res = await fetch(`/api/portal/assets?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAssets(assets.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error("Грешка при изтриване на актив:", err);
    }
  };

  const handleScanAsset = (id: string) => {
    setScanningAssetId(id);
    // Симулираме сканиране за 2.5 секунди
    setTimeout(async () => {
      try {
        const potentialStatuses = ["scanned", "scanned", "scanned", "vulnerable"];
        const randomStatus = potentialStatuses[Math.floor(Math.random() * potentialStatuses.length)];

        const res = await fetch("/api/portal/assets", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: randomStatus }),
        });

        if (res.ok) {
          fetchAssets();
        }
      } catch (err) {
        console.error("Грешка при промяна на статус след сканиране:", err);
      } finally {
        setScanningAssetId(null);
      }
    }, 2500);
  };

  const getAssetIcon = (assetType: string) => {
    switch (assetType) {
      case "Сървър":
        return <Server className="w-5 h-5 text-[#0098b2]" />;
      case "Домейн / Уебсайт":
        return <Globe className="w-5 h-5 text-blue-400" />;
      case "Работна Станция":
        return <Monitor className="w-5 h-5 text-green-400" />;
      case "Облачен Ресурс":
        return <Cloud className="w-5 h-5 text-purple-400" />;
      case "Мрежово устройство":
        return <Network className="w-5 h-5 text-yellow-400" />;
      default:
        return <Server className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (assetStatus: string) => {
    switch (assetStatus) {
      case "scanned":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Защитен
          </span>
        );
      case "vulnerable":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            Уязвим (CVE)
          </span>
        );
      case "monitoring":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#0098b2]/10 text-[#0098b2] border border-[#0098b2]/20 rounded-full text-xs font-bold">
            <Activity className="w-3.5 h-3.5" />
            Под наблюдение
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full text-xs font-bold">
            Несканиран
          </span>
        );
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на активи...</p>
        </div>
      </div>
    );
  }

  const totalCount = assets.length;
  const protectedCount = assets.filter((a) => a.status === "scanned").length;
  const vulnerableCount = assets.filter((a) => a.status === "vulnerable").length;
  const monitoringCount = assets.filter((a) => a.status === "monitoring").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              <Server className="w-8 h-8 text-[#0098b2]" />
              Моите ИТ активи (CMDB Inventory)
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Управлявайте и сканирайте сървъри, уебсайтове и работни станции в реално време през DefComs SOC
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0098b2] hover:bg-[#007f96] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0098b2]/10 transition"
          >
            <Plus className="w-5 h-5" />
            Добави актив
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl">
            <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Общо активи</p>
            <p className="text-3xl font-black text-white mt-1">{totalCount}</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl border-l-4 border-l-green-500">
            <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Защитени</p>
            <p className="text-3xl font-black text-green-400 mt-1">{protectedCount}</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl border-l-4 border-l-red-500">
            <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Уязвими</p>
            <p className="text-3xl font-black text-red-400 mt-1">{vulnerableCount}</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl border-l-4 border-l-[#0098b2]">
            <p className="text-gray-400 text-xs font-extrabold uppercase tracking-wider">Мониторинг</p>
            <p className="text-3xl font-black text-[#0098b2] mt-1">{monitoringCount}</p>
          </div>
        </div>

        {/* Assets List */}
        <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
          {assets.length === 0 ? (
            <div className="p-16 text-center">
              <Server className="w-20 h-20 text-slate-700 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg">Няма регистрирани активи</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto mt-2 mb-6">
                Свържете вашата инфраструктура със SOC платформата на DefComs, като добавите първия си ИТ актив за денонощна защита.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-[#0098b2] border border-[#0098b2]/40 px-5 py-2.5 rounded-xl font-bold transition inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-5 h-5" />
                Регистрирайте първи актив
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-700 text-gray-400 text-xs font-extrabold uppercase tracking-wider">
                    <th className="p-5">Тип</th>
                    <th className="p-5">Име</th>
                    <th className="p-5">IP адрес / Домейн</th>
                    <th className="p-5">Статус на сигурност</th>
                    <th className="p-5">Дата на регистриране</th>
                    <th className="p-5 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-750/30 transition text-sm">
                      <td className="p-5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center">
                          {getAssetIcon(asset.type)}
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">{asset.type}</span>
                      </td>
                      <td className="p-5 font-bold text-white">{asset.name}</td>
                      <td className="p-5 font-mono text-gray-300">{asset.ipAddress}</td>
                      <td className="p-5">{getStatusBadge(asset.status)}</td>
                      <td className="p-5 text-xs text-gray-400">
                        {new Date(asset.createdAt).toLocaleDateString("bg-BG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </td>
                      <td className="p-5 text-right space-x-2">
                        <button
                          disabled={scanningAssetId !== null}
                          onClick={() => handleScanAsset(asset.id)}
                          className={`p-2 bg-slate-850 hover:bg-slate-700 text-green-400 rounded-xl border border-slate-700 hover:border-green-500/20 transition ${
                            scanningAssetId === asset.id ? "animate-spin" : ""
                          }`}
                          title="Сканирай актива веднага"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
                          className="p-2 bg-slate-850 hover:bg-red-950/20 text-red-400 rounded-xl border border-slate-700 hover:border-red-500/20 transition"
                          title="Изтриване на актив"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-slate-800/30 border border-slate-700 p-6 rounded-2xl flex items-start gap-4">
          <Shield className="w-8 h-8 text-[#0098b2] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-bold mb-1">Автоматизиран Vulnerability Scan</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Всеки добавен ИТ актив се подлага на ежедневни автоматични сканирания за отворени портове, SSL грешки, конфигурационни пропуски и актуални CVE уязвимости съгласно регламентите <strong className="text-white">NIS2</strong> и <strong className="text-white">CRA</strong>. Натиснете бутона за опресняване, за да стартирате незабавно ръчно сканиране на актива.
            </p>
          </div>
        </div>

        {/* Modal Dialog */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#0098b2]" />
                  Добавяне на нов ИТ актив
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAsset} className="p-6 space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Име на актива *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="напр. Основен Web Сървър"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    IP адрес или Домейн *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="напр. 185.43.120.45 или app.mycompany.com"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                    Тип на ИТ актива
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0098b2] transition"
                  >
                    <option value="Сървър">Сървър (Linux / Windows)</option>
                    <option value="Домейн / Уебсайт">Домейн / Уебсайт</option>
                    <option value="Работна Станция">Работна Станция</option>
                    <option value="Облачен Ресурс">Облачен Ресурс (AWS / Azure)</option>
                    <option value="Мрежово устройство">Мрежово устройство (Firewall / Switch)</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition"
                  >
                    Отказ
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#0098b2] hover:bg-[#007f96] disabled:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm"
                  >
                    {submitting ? "Добавяне..." : "Добави актив"}
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

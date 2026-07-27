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
  AlertCircle,
  Users,
  Settings,
  Shield,
  Trash2,
  Edit2,
  Plus,
  Briefcase,
  Key,
  DollarSign,
  Calendar,
  X,
  FileCode,
  Ticket,
  MessageSquare,
  Activity,
  HeartPulse,
  Server
} from "lucide-react";
import Link from "next/link";

interface UserService {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string;
  endDate: string | null;
  compliance: string | null;
  userId: string;
}

interface ClientUser {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  address: string | null;
  iban: string | null;
  eik: string | null;
  vat: string | null;
  mol: string | null;
  role: string;
  services: UserService[];
  invoices: any[];
  tickets: any[];
}

export default function AdminPortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [clients, setClients] = useState<ClientUser[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"clients" | "services" | "tickets" | "docs_billing" | "threats_recs">("clients");

  // Модални състояния за Клиенти
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientModalMode, setClientModalFormMode] = useState<"create" | "edit">("create");
  const [clientForm, setClientForm] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
    address: "",
    iban: "",
    eik: "",
    vat: "",
    mol: "",
    role: "client"
  });
  const [clientSuccess, setClientSuccess] = useState("");
  const [clientError, setClientError] = useState("");

  // Модални състояния за Услуги
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalMode, setServiceModalMode] = useState<"create" | "edit">("create");
  const [serviceForm, setServiceForm] = useState({
    id: "",
    name: "24/7 SOC Мониторинг & Лог Мениджмънт",
    description: "",
    status: "active",
    startDate: "",
    endDate: "",
    compliance: "",
    userId: ""
  });
  const [serviceSuccess, setServiceSuccess] = useState("");
  const [serviceError, setServiceError] = useState("");

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

  const [selectedFileForInvoice, setSelectedFileForInvoice] = useState<string>("");

  // Нова форма 3: Публикуване на глобална заплаха
  const [threatForm, setThreatForm] = useState({
    title: "",
    description: "",
    severity: "high",
    mitigation: ""
  });

  // Нова форма 4: Създаване на препоръка за клиент
  const [recForm, setRecForm] = useState({
    title: "",
    description: "",
    impact: "10",
    category: "Мрежа",
    targetUserId: ""
  });

  const [docSuccess, setDocSuccess] = useState("");
  const [docError, setDocError] = useState("");
  const [invSuccess, setInvSuccess] = useState("");
  const [invError, setInvError] = useState("");
  const [threatSuccess, setThreatSuccess] = useState("");
  const [threatError, setThreatError] = useState("");
  const [recSuccess, setRecSuccess] = useState("");
  const [recError, setRecError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      if (u.role !== "admin" && u.role !== "operator") {
        router.push("/portal/dashboard");
      } else {
        fetchClients();
        fetchTickets();
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

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/portal/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на тикети:", error);
    }
  };

  const handleCloseTicket = async (ticketId: string) => {
    if (!confirm("Наистина ли искате да затворите този поддържащ тикет?")) {
      return;
    }

    try {
      const res = await fetch(`/api/portal/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" })
      });

      if (res.ok) {
        fetchTickets();
        fetchClients();
      } else {
        alert("Грешка при затваряне на тикета");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Client CRUD
  const handleOpenCreateClient = () => {
    setClientForm({
      id: "",
      email: "",
      password: "",
      name: "",
      phone: "",
      company: "",
      address: "",
      iban: "",
      eik: "",
      vat: "",
      mol: "",
      role: "client"
    });
    setClientModalFormMode("create");
    setClientSuccess("");
    setClientError("");
    setIsClientModalOpen(true);
  };

  const handleOpenEditClient = (client: ClientUser) => {
    setClientForm({
      id: client.id,
      email: client.email,
      password: "",
      name: client.name || "",
      phone: client.phone || "",
      company: client.company || "",
      address: client.address || "",
      iban: client.iban || "",
      eik: client.eik || "",
      vat: client.vat || "",
      mol: client.mol || "",
      role: client.role || "client"
    });
    setClientModalFormMode("edit");
    setClientSuccess("");
    setClientError("");
    setIsClientModalOpen(true);
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientSuccess("");
    setClientError("");

    const method = clientModalMode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch("/api/portal/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm)
      });

      const data = await res.json();

      if (res.ok) {
        setClientSuccess(`✅ Клиентът беше успешно записан!`);
        fetchClients();
        setTimeout(() => setIsClientModalOpen(false), 1200);
      } else {
        setClientError(data.error || "Грешка при съхраняване на данните");
      }
    } catch (err) {
      setClientError("Възникна вътрешна грешка на сървъра");
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Наистина ли искате да изтриете този клиент и всички негови услуги, тикети, фактури и логове?")) {
      return;
    }

    try {
      const res = await fetch(`/api/portal/admin/users?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchClients();
      } else {
        alert("Грешка при изтриване на потребителя");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Service CRUD
  const handleOpenCreateService = (clientId: string) => {
    setServiceForm({
      id: "",
      name: "24/7 SOC Мониторинг & Лог Мениджмънт",
      description: "Денонощно наблюдение на периметъра, анализ на събития в реално време, детекция на аномалии и реагиране при инциденти.",
      status: "active",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      compliance: "NIS2, ISO 27001, SOC 2",
      userId: clientId
    });
    setServiceModalMode("create");
    setServiceSuccess("");
    setServiceError("");
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service: UserService) => {
    setServiceForm({
      id: service.id,
      name: service.name,
      description: service.description || "",
      status: service.status,
      startDate: service.startDate ? new Date(service.startDate).toISOString().split("T")[0] : "",
      endDate: service.endDate ? new Date(service.endDate).toISOString().split("T")[0] : "",
      compliance: service.compliance || "",
      userId: service.userId
    });
    setServiceModalMode("edit");
    setServiceSuccess("");
    setServiceError("");
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceSuccess("");
    setServiceError("");

    const method = serviceModalMode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch("/api/portal/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm)
      });

      const data = await res.json();

      if (res.ok) {
        setServiceSuccess(`✅ Абонаментът беше успешно съхранен!`);
        fetchClients();
        setTimeout(() => setIsServiceModalOpen(false), 1200);
      } else {
        setServiceError(data.error || "Грешка при съхраняване на услугата");
      }
    } catch (err) {
      setServiceError("Възникна вътрешна грешка на сървъра");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Наистина ли искате да прекратите/изтриете този абонамент?")) {
      return;
    }

    try {
      const res = await fetch(`/api/portal/services?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchClients();
      } else {
        alert("Грешка при изтриване на абонамента");
      }
    } catch (err) {
      console.error(err);
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
        body: JSON.stringify({
          ...invForm,
          fileUrl: selectedFileForInvoice || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setInvSuccess(`✅ Фактура ${data.invoiceNumber} на стойност ${data.amount} € бе успешно издадена!`);
        setInvForm({
          invoiceNumber: "",
          amount: "",
          description: "",
          status: "unpaid",
          dueDate: "",
          targetUserId: "",
        });
        setSelectedFileForInvoice("");
      } else {
        setInvError(data.error || "Грешка при издаване на фактура");
      }
    } catch (err) {
      setInvError("Възникна вътрешна грешка");
    }
  };

  // Публикуване на заплаха
  const handlePublishThreat = async (e: React.FormEvent) => {
    e.preventDefault();
    setThreatSuccess("");
    setThreatError("");

    try {
      const response = await fetch("/api/portal/threats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(threatForm)
      });

      const data = await response.json();

      if (response.ok) {
        setThreatSuccess(`✅ Заплахата "${data.title}" бе успешно публикувана в глобалната емисия!`);
        setThreatForm({
          title: "",
          description: "",
          severity: "high",
          mitigation: ""
        });
      } else {
        setThreatError(data.error || "Грешка при публикуване на заплаха");
      }
    } catch (err) {
      setThreatError("Възникна мрежова грешка");
    }
  };

  // Издаване на препоръка
  const handleCreateRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecSuccess("");
    setRecError("");

    if (!recForm.targetUserId) {
      setRecError("Моля, изберете клиент за препоръката");
      return;
    }

    try {
      const response = await fetch("/api/portal/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: recForm.title,
          description: recForm.description,
          impact: parseInt(recForm.impact),
          category: recForm.category,
          userId: recForm.targetUserId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRecSuccess(`✅ Препоръката "${data.title}" е успешно прикачена. Здравният статус на клиента е променен!`);
        setRecForm({
          title: "",
          description: "",
          impact: "10",
          category: "Мрежа",
          targetUserId: ""
        });
        fetchClients(); // Опресняваме списъка
      } else {
        setRecError(data.error || "Грешка при създаване на препоръка");
      }
    } catch (err) {
      setRecError("Възникна мрежова грешка");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
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
                  <ShieldAlert className="w-6 h-6 text-[#0098b2]" />
                  Админ Панел DefComs
                </h1>
                <p className="text-gray-400 text-sm">
                  Контролен център за управление на клиенти, фирмени детайли, активни услуги и финансови документи
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Изход
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-700/60 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "clients"
                ? "bg-[#0098b2] text-white"
                : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Клиенти ({clients.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "services"
                ? "bg-[#0098b2] text-white"
                : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            Абонаменти
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "tickets"
                ? "bg-[#0098b2] text-white"
                : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <Ticket className="w-4 h-4" />
            Тикети ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab("docs_billing")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "docs_billing"
                ? "bg-[#0098b2] text-white"
                : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Документи & Фактури
          </button>
          <button
            onClick={() => setActiveTab("threats_recs")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === "threats_recs"
                ? "bg-[#0098b2] text-white"
                : "bg-slate-800 text-gray-400 hover:text-white"
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            Заплахи & Препоръки
          </button>
        </div>

        {/* Tab 1: Clients List & Creation */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0098b2]" />
                База данни на Юридически лица и Клиенти
              </h2>
              <button
                onClick={handleOpenCreateClient}
                className="bg-[#0098b2] hover:bg-[#007a91] text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 text-sm"
              >
                <Plus className="w-4 h-4" />
                Ново юридическо лице (Клиент)
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {clients.map((client) => (
                <div key={client.id} className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-md hover:border-slate-600 transition">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Primary info */}
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-400" />
                          {client.name || "Без име"}
                        </h3>
                        {client.company && (
                          <span className="bg-slate-700 text-gray-300 border border-slate-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-[#0098b2]" />
                            {client.company}
                          </span>
                        )}
                      </div>

                      {/* Corporate Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 text-sm bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
                        <p><strong className="text-[#0098b2]">Имейл:</strong> {client.email}</p>
                        <p><strong className="text-[#0098b2]">Роля:</strong> <span className={`font-bold ${client.role === "admin" ? "text-red-400" : client.role === "operator" ? "text-yellow-400" : "text-gray-300"}`}>{client.role === "admin" ? "Администратор" : client.role === "operator" ? "Оператор" : "Клиент"}</span></p>
                        <p><strong className="text-[#0098b2]">Телефон:</strong> {client.phone || "Няма"}</p>
                        <p><strong className="text-[#0098b2]">МОЛ:</strong> {client.mol || "Няма"}</p>
                        <p><strong className="text-[#0098b2]">ЕИК:</strong> {client.eik || "Няма"}</p>
                        <p><strong className="text-[#0098b2]">ДДС №:</strong> {client.vat || "Няма"}</p>
                        <p><strong className="text-[#0098b2]">IBAN:</strong> {client.iban || "Няма"}</p>
                        <p className="md:col-span-2 lg:col-span-3"><strong className="text-[#0098b2]">Адрес:</strong> {client.address || "Няма"}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 text-xs">
                        <span className="text-gray-400"><strong>Абонаменти:</strong> {client.services.length}</span>
                        <span className="text-gray-400"><strong>Фактури:</strong> {client.invoices.length}</span>
                        <span className="text-gray-400"><strong>Тикети:</strong> {client.tickets.length}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap lg:flex-col gap-2.5 justify-end">
                      <button
                        onClick={() => handleOpenEditClient(client)}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Редакция на профил
                      </button>
                      <button
                        onClick={() => handleOpenCreateService(client.id)}
                        className="bg-[#0098b2]/10 hover:bg-[#0098b2]/20 text-[#0098b2] border border-[#0098b2]/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Нов абонамент
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Изтриване
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Services Management */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0098b2]" />
              Активни договори и софтуерни планове
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {clients.map((client) => (
                <div key={client.id} className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <span>
                      Услуги на <span className="text-[#0098b2]">{client.name || client.email}</span> ({client.company || "Няма фирма"})
                    </span>
                    <button
                      onClick={() => handleOpenCreateService(client.id)}
                      className="bg-slate-700 hover:bg-slate-650 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Добави услуга
                    </button>
                  </h3>

                  {client.services.length === 0 ? (
                    <p className="text-sm text-gray-500 italic p-2">Няма назначени услуги за този клиент.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {client.services.map((service) => (
                        <div key={service.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="font-bold text-white text-sm">{service.name}</h4>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                service.status === "active" ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"
                              }`}>
                                {service.status === "active" ? "Активна" : service.status === "suspended" ? "Спряна" : "Изтекла"}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3 leading-relaxed truncate">{service.description}</p>
                            {service.compliance && (
                              <p className="text-[10px] text-gray-500 mb-2"><strong>Съответствие:</strong> {service.compliance}</p>
                            )}
                          </div>
                          <div className="border-t border-slate-800/80 pt-3 mt-3 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Старт: {new Date(service.startDate).toLocaleDateString("bg-BG")}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenEditService(service)}
                                className="text-xs text-[#0098b2] hover:underline flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                Редактирай
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="text-xs text-red-400 hover:underline flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Прекрати
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Support Tickets Management */}
        {activeTab === "tickets" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#0098b2]" />
                Контрол и затваряне на активни запитвания за поддръжка
              </h2>
            </div>

            {tickets.length === 0 ? (
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center">
                <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Няма регистрирани тикети в системата.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {tickets.map((t) => (
                  <div key={t.id} className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-md hover:border-slate-600 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-bold text-white">{t.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          t.status === "open" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                          t.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                          t.status === "resolved" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                          "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}>
                          {t.status === "open" ? "Отворен" : t.status === "in_progress" ? "В процес" : t.status === "resolved" ? "Решен" : "Затворен"}
                        </span>
                        <span className={`text-xs font-semibold ${
                          t.priority === "urgent" ? "text-red-400" :
                          t.priority === "high" ? "text-orange-400" :
                          t.priority === "medium" ? "text-yellow-400" : "text-gray-400"
                        }`}>
                          Приоритет: {t.priority === "urgent" ? "Спешен" : t.priority === "high" ? "Висок" : t.priority === "medium" ? "Среден" : "Нисък"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{t.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span><strong>Клиент:</strong> {t.user?.name || "Потребител"} ({t.user?.email})</span>
                        {t.user?.company && <span><strong>Фирма:</strong> {t.user.company}</span>}
                        <span><strong>Създаден на:</strong> {new Date(t.createdAt).toLocaleDateString("bg-BG")}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-end w-full md:w-auto">
                      <Link href={`/portal/tickets/${t.id}`}>
                        <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Чат & Преглед
                        </button>
                      </Link>
                      {t.status !== "closed" && (
                        <button
                          onClick={() => handleCloseTicket(t.id)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          Затвори тикета
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Legacy Documents & Invoices */}
        {activeTab === "docs_billing" && (
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
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Сума (€)</label>
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

                  {/* Прикачване на файл към фактурата */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-[#0098b2]" />
                      Прикачи файл на фактурата (Симулация на файл)
                    </label>
                    <input
                      type="text"
                      value={selectedFileForInvoice}
                      onChange={(e) => setSelectedFileForInvoice(e.target.value)}
                      placeholder="напр. invoice_inv-2024-102.pdf"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0098b2]"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      * Позволява прикачване на реално име на PDF файла или URL на фактурата за лесно сваляне от страна на клиента.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Издай и изпрати фактура с прикачен файл
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Global Threats & Recommendations */}
        {activeTab === "threats_recs" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Threat publication form */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700/60 pb-3">
                  <ShieldAlert className="w-5 h-5 text-[#f22020] animate-pulse" />
                  Публикуване на глобално предупреждение (Threat Feed)
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Тази заплаха ще се отрази веднага на стената за заплахи на всички клиенти в реално време.
                </p>

                {threatSuccess && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{threatSuccess}</span>
                  </div>
                )}

                {threatError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{threatError}</span>
                  </div>
                )}

                <form onSubmit={handlePublishThreat} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Заглавие на заплахата / CVE код</label>
                    <input
                      type="text"
                      value={threatForm.title}
                      onChange={(e) => setThreatForm({ ...threatForm, title: e.target.value })}
                      placeholder="напр. CVE-2024-3094: XZ Utils Backdoor"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#f22020]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Ниво на опасност (Severity)</label>
                    <select
                      value={threatForm.severity}
                      onChange={(e) => setThreatForm({ ...threatForm, severity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#f22020]"
                      required
                    >
                      <option value="critical">Критична (Critical)</option>
                      <option value="high">Висока (High)</option>
                      <option value="medium">Средна (Medium)</option>
                      <option value="low">Ниска (Low)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Описание на уязвимостта</label>
                    <textarea
                      value={threatForm.description}
                      onChange={(e) => setThreatForm({ ...threatForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#f22020] resize-none"
                      placeholder="напр. Открита е злонамерена задна вратичка в компресионния инструмент xz-utils..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Мерки за неутрализиране (Mitigation)</label>
                    <textarea
                      value={threatForm.mitigation}
                      onChange={(e) => setThreatForm({ ...threatForm, mitigation: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#f22020] resize-none"
                      placeholder="напр. Свалете версията до xz v5.4.6 или актуализирайте незабавно..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f22020] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                  >
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                    Публикувай заплаха
                  </button>
                </form>
              </div>
            </div>

            {/* Recommendation creation form */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 border-b border-slate-700/60 pb-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  Добавяне на препоръка / Оценка на защитата (Health Check)
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Задайте конкретна сигурностна мярка към избрания клиент. Тя ще се отрази директно в неговия спидометър (Health Score).
                </p>

                {recSuccess && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{recSuccess}</span>
                  </div>
                )}

                {recError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{recError}</span>
                  </div>
                )}

                <form onSubmit={handleCreateRecommendation} className="space-y-4">
                  {/* Select Client */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Изберете Клиент</label>
                    <select
                      value={recForm.targetUserId}
                      onChange={(e) => setRecForm({ ...recForm, targetUserId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500"
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Име на задачата / изискването</label>
                    <input
                      type="text"
                      value={recForm.title}
                      onChange={(e) => setRecForm({ ...recForm, title: e.target.value })}
                      placeholder="напр. Конфигуриране на WAF филтрация"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Категория</label>
                    <select
                      value={recForm.category}
                      onChange={(e) => setRecForm({ ...recForm, category: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500"
                      required
                    >
                      <option value="Достъп">Контрол на достъпа (Access)</option>
                      <option value="Мрежа">Мрежова сигурност (Network)</option>
                      <option value="Съответствие">Регулаторно съответствие (Compliance)</option>
                      <option value="Обучение">Обучение на персонала (Training)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Тежест на мярката (Impact точки)</label>
                      <select
                        value={recForm.impact}
                        onChange={(e) => setRecForm({ ...recForm, impact: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500"
                        required
                      >
                        <option value="10">10 точки (Ниско влияние)</option>
                        <option value="15">15 точки (Средно влияние)</option>
                        <option value="20">20 точки (Високо влияние)</option>
                        <option value="25">25 точки (Критично влияние)</option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[10px] text-gray-500 leading-relaxed p-1">
                        * Колкото по-висок е impact-ът на препоръката, толкова по-голям дял от общия здравен статус на клиента заема тя.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Описание и указания за изпълнение</label>
                    <textarea
                      value={recForm.description}
                      onChange={(e) => setRecForm({ ...recForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-green-500 resize-none"
                      placeholder="Опишете стъпките за изпълнение на мярката от ИТ отдела на клиента..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Добави препоръка
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Modern Dialog Modal: Client Create/Edit */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => setIsClientModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <Building2 className="w-6 h-6 text-[#0098b2]" />
              <h3 className="text-xl font-bold text-white">
                {clientModalMode === "create" ? "Ново юридическо лице" : "Редакция на Юридическо Лице"}
              </h3>
            </div>

            {clientSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl mb-4 text-xs font-semibold">
                {clientSuccess}
              </div>
            )}

            {clientError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-xs font-semibold">
                {clientError}
              </div>
            )}

            <form onSubmit={handleSaveClient} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Имейл адрес (Вход)</label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    required
                  />
                </div>

                {/* Role (Само за Администратори) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Потребителска Роля</label>
                  <select
                    value={clientForm.role}
                    onChange={(e) => setClientForm({ ...clientForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2] disabled:opacity-50"
                    disabled={(session?.user as any)?.role !== "admin"}
                  >
                    <option value="client">Клиент (Client)</option>
                    <option value="operator">Оператор (Operator)</option>
                    <option value="admin">Администратор (Admin)</option>
                  </select>
                  {(session?.user as any)?.role !== "admin" && (
                    <p className="text-[10px] text-yellow-400/80 mt-1">Само основният администратор може да променя нивата на достъп.</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">
                    {clientModalMode === "create" ? "Парола за достъп" : "Смяна на парола (Остави празна за запазване)"}
                  </label>
                  <input
                    type="password"
                    value={clientForm.password}
                    onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    required={clientModalMode === "create"}
                  />
                </div>

                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Имена на клиента</label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. Иван Иванов"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Телефон за връзка</label>
                  <input
                    type="text"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. +359888888888"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Наименование на фирма</label>
                  <input
                    type="text"
                    value={clientForm.company}
                    onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. Кибер Секюрити ООД"
                  />
                </div>

                {/* MOL */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">МОЛ (Материално отговорно лице)</label>
                  <input
                    type="text"
                    value={clientForm.mol}
                    onChange={(e) => setClientForm({ ...clientForm, mol: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. Димитър Петров"
                  />
                </div>

                {/* EIK */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">ЕИК / БУЛСТАТ</label>
                  <input
                    type="text"
                    value={clientForm.eik}
                    onChange={(e) => setClientForm({ ...clientForm, eik: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. 207452684"
                  />
                </div>

                {/* VAT */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">ДДС Номер</label>
                  <input
                    type="text"
                    value={clientForm.vat}
                    onChange={(e) => setClientForm({ ...clientForm, vat: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. BG207452684"
                  />
                </div>

                {/* IBAN */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Банков IBAN</label>
                  <input
                    type="text"
                    value={clientForm.iban}
                    onChange={(e) => setClientForm({ ...clientForm, iban: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. BG80UNCR962110..."
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Седалище и адрес на управление</label>
                  <input
                    type="text"
                    value={clientForm.address}
                    onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    placeholder="напр. гр. София, бул. България №10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="flex-1 bg-slate-850 hover:bg-slate-800 text-gray-300 py-3 rounded-xl font-semibold transition"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0098b2] hover:bg-[#007a91] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  Запази клиентските данни
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Dialog Modal: Service Create/Edit */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
              <Shield className="w-6 h-6 text-[#0098b2]" />
              <h3 className="text-xl font-bold text-white">
                {serviceModalMode === "create" ? "Добавяне на нов абонамент" : "Редакция на абонаментен план"}
              </h3>
            </div>

            {serviceSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl mb-4 text-xs font-semibold">
                {serviceSuccess}
              </div>
            )}

            {serviceError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-xs font-semibold">
                {serviceError}
              </div>
            )}

            <form onSubmit={handleSaveService} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Услуга / Продукт</label>
                <select
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                  required
                >
                  <option value="24/7 SOC Мониторинг & Лог Мениджмънт">24/7 SOC Мониторинг & Лог Мениджмънт (NIS2 / ISO 27001)</option>
                  <option value="Пентестинг & Оценка на уязвимостите">Пентестинг & Оценка на уязвимостите (CRA / DORA)</option>
                  <option value="Автоматизиран Одит за GDPR съответствие">Автоматизиран Одит за GDPR съответствие (GDPR / ePrivacy)</option>
                  <option value="Обучение по киберсигурност & Фишинг Симулации">Обучение по киберсигурност & Фишинг Симулатор (Awareness Training)</option>
                  <option value="DORA & NIS2 Рамкова Подготовка">DORA & NIS2 Рамкова Консултация (Финансов / Държавен сектор)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Описание на покритието</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2] resize-none"
                  placeholder="Въведете подробно покритие..."
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Статус на договора</label>
                <select
                  value={serviceForm.status}
                  onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                  required
                >
                  <option value="active">Активна</option>
                  <option value="suspended">Временно спряна</option>
                  <option value="expired">Изтекла</option>
                </select>
              </div>

              {/* Compliance */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Директиви и Баджове за съответствие (разделени със запетая)</label>
                <input
                  type="text"
                  value={serviceForm.compliance}
                  onChange={(e) => setServiceForm({ ...serviceForm, compliance: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                  placeholder="напр. NIS2, GDPR, ISO 27001"
                />
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Начална дата</label>
                  <input
                    type="date"
                    value={serviceForm.startDate}
                    onChange={(e) => setServiceForm({ ...serviceForm, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Крайна дата (Ако има)</label>
                  <input
                    type="date"
                    value={serviceForm.endDate}
                    onChange={(e) => setServiceForm({ ...serviceForm, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-[#0098b2]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="flex-1 bg-slate-850 hover:bg-slate-800 text-gray-300 py-3 rounded-xl font-semibold transition"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0098b2] hover:bg-[#007a91] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  Запази абонамента
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

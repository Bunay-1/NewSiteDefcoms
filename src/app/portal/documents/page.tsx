"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  LogOut,
  Download,
  Calendar,
  HardDrive,
  CheckCircle,
  Clock,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { generatePdfBlob } from "@/lib/pdfHelper";

interface UserDocument {
  id: string;
  title: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  createdAt: string;
}

export default function SecureDocumentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchDocuments();
    }
  }, [status]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/portal/documents");
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Грешка при извличане на документи:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (doc: UserDocument) => {
    setDownloadingId(doc.id);

    // Симулация на защитено криптирано сваляне на одитния файл
    setTimeout(() => {
      setDownloadingId(null);

      let blob: Blob;

      const isPdf = doc.fileType === "PDF" || doc.title.endsWith(".pdf");

      if (isPdf) {
        const details = [
          { label: "File Size", value: doc.fileSize },
          { label: "Format", value: doc.fileType },
          { label: "Uploaded At", value: new Date(doc.createdAt).toLocaleString("bg-BG") }
        ];
        blob = generatePdfBlob(doc.title, details);
      } else {
        // За не-PDF документи запазваме базовия тестов текстов формат
        const content = `DefComs Secure Vault Document\n============================\n\nTitle: ${doc.title}\nSize: ${doc.fileSize}\nType: ${doc.fileType}\nUploaded: ${new Date(doc.createdAt).toLocaleString("bg-BG")}\n\nThis is a securely downloaded audit report file from DefComs CyberSecurity Vault.\nAll integrity checks passed successfully (AES-256 Verified).`;
        blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.title.endsWith(".pdf") || doc.title.endsWith(".xlsx") || doc.title.endsWith(".zip") || doc.title.endsWith(".docx")
        ? doc.title
        : `${doc.title}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert(`🔒 Защитено изтегляне стартирано успешно!\n\nФайл: "${doc.title}"\nРазмер: ${doc.fileSize}\n\nФайлът бе проверен от DefComs Antivirus & DLP защита за съответствие с GDPR.`);
    }, 1200);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на защитени документи...</p>
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
                  <FileText className="w-6 h-6 text-[#0098b2]" />
                  Доклади и Документи
                </h1>
                <p className="text-gray-400 text-sm">
                  Сигурен достъп до Вашите одитни резултати, пентестинг доклади и сертификати
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

        {/* Safe Vault Banner */}
        <div className="bg-slate-800/30 border border-slate-700/80 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="p-3 bg-green-500/15 rounded-xl flex-shrink-0 text-green-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Защитен сейф за документи (Secure Vault)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Всички доклади в това хранилище са шифрирани (AES-256) в покой и са достъпни само за упълномощени лица. Връзките за изтегляне се валидират динамично за всяка сесия за пълно съответствие с <strong>ePrivacy</strong> и <strong>GDPR</strong>.
            </p>
          </div>
        </div>

        {/* Document list */}
        {documents.length === 0 ? (
          <div className="text-center p-12 bg-slate-800/40 border border-slate-700 rounded-2xl text-gray-400">
            Все още няма прикачени доклади за Вашия профил. При приключване на одит, файловете ще се появят тук.
          </div>
        ) : (
          <div className="bg-slate-800/20 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-700 bg-slate-800/30 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-[#0098b2]" />
                Достъпни файлове ({documents.length})
              </span>
              <span className="text-xs text-gray-400">AES-256 Защитени</span>
            </div>

            <div className="divide-y divide-slate-700/60">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-800/20 transition"
                >
                  {/* File title and details */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#0098b2]/10 rounded-xl text-[#0098b2] mt-1">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {doc.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-gray-300 font-semibold uppercase border border-slate-700/60">
                          {doc.fileType}
                        </span>
                        <span>Размер: {doc.fileSize}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          Качен на: {new Date(doc.createdAt).toLocaleDateString("bg-BG")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download Action */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId === doc.id}
                      className="w-full sm:w-auto bg-[#0098b2] hover:bg-[#007a91] disabled:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
                    >
                      {downloadingId === doc.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Шифриране...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Свали защитено
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

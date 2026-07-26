"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Shield,
  Activity,
  ShieldAlert,
  FileText,
  CreditCard,
  User,
  LogOut,
  Lock,
  Menu,
  X,
  Server,
  Cpu,
  GraduationCap
} from "lucide-react";

function PortalNavbar({ session, pathname }: { session: any; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Табло", href: "/portal/dashboard", icon: LayoutDashboard },
    { name: "Услуги", href: "/portal/services", icon: Shield },
    { name: "Активи", href: "/portal/assets", icon: Server },
    { name: "SIEM", href: "/portal/siem", icon: Cpu },
    { name: "Обучения", href: "/portal/training", icon: GraduationCap },
    { name: "Здравен статус", href: "/portal/health", icon: Activity },
    { name: "Заплахи", href: "/portal/threats", icon: ShieldAlert },
    { name: "Документи", href: "/portal/documents", icon: FileText },
    { name: "Фактури", href: "/portal/invoices", icon: CreditCard },
    { name: "Профил", href: "/portal/profile", icon: User },
  ];

  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/portal/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0098b2]/10 rounded-lg flex items-center justify-center border border-[#0098b2]/20">
                <Shield className="w-4 h-4 text-[#0098b2]" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-wider">DefComs</span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? "bg-[#0098b2] text-white shadow-lg shadow-[#0098b2]/25"
                      : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/portal/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition ${
                  pathname === "/portal/admin"
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                    : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                }`}
              >
                <Lock className="w-4 h-4" />
                Админ
              </Link>
            )}
          </div>

          {/* Right section: Profile & Logout */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-xs text-gray-400 font-semibold bg-slate-800/50 border border-slate-800 px-3 py-1.5 rounded-xl">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-gray-400 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              Изход
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#0098b2] text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/portal/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                pathname === "/portal/admin"
                  ? "bg-red-500 text-white"
                  : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
              }`}
            >
              <Lock className="w-5 h-5" />
              Админ Панел
            </Link>
          )}

          <div className="border-t border-slate-800/80 pt-3 mt-3 flex items-center justify-between px-4">
            <span className="text-xs text-gray-500 truncate max-w-[180px]">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-400 hover:text-red-300 transition flex items-center gap-1.5 text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              Изход
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function PortalLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Не показваме менюто на страниците за вход и регистрация
  const isAuthPage = pathname === "/portal/login" || pathname === "/portal/register";

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-[#0098b2]/30 border-t-[#0098b2] rounded-full animate-spin mx-auto mb-4" />
          <p>Зареждане на портала...</p>
        </div>
      </div>
    );
  }

  const showNav = session && !isAuthPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {showNav && <PortalNavbar session={session} pathname={pathname} />}
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <PortalLayoutContent>{children}</PortalLayoutContent>
    </SessionProvider>
  );
}

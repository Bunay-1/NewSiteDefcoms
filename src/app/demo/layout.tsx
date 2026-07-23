import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Интерактивно SOC Демо и Симулатор на Кибератаки | DefComs",
  description: "Изпробвайте нашия интерактивен симулатор на кибератаки и вижте как автоматизираната SOC платформа на DefComs засича и блокира DDoS, Ransomware и Phishing заплахи в реално време.",
  keywords: "симулатор кибератаки, SOC демо, киберсигурност симулация, DDoS защита, Ransomware защита",
  openGraph: {
    title: "Интерактивно SOC Демо и Симулатор на Кибератаки | DefComs",
    description: "Тествайте как DefComs защитава вашите системи срещу DDoS, Ransomware и Phishing в реално време.",
    url: "https://defcoms.eu/demo",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  }
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

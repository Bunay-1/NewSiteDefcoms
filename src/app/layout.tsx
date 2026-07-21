import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DefComs - Киберсигурност и Защита от Кибер Атаки",
  description: "DefComs предлага цялостни решения за киберсигурност, съответствие с EU директиви (GDPR, NIS2, CRA, DORA, EU AI Act) и защита от кибер атаки.",
  keywords: "киберсигурност, GDPR, NIS2, CRA, DORA, EU AI Act, SOC 2, ISO 27001, ISO 42001, защита от кибер атаки, мрежова сигурност",
  authors: [{ name: "DefComs" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "DefComs - Киберсигурност и Защита от Кибер Атаки",
    description: "Водещи решения за киберсигурност и съответствие с EU директиви",
    url: "https://defcoms.eu",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

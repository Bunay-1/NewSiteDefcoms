import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти и Спешна Помощ при Кибератаки | DefComs",
  description: "Свържете се с DefComs за денонощна помощ при киберинциденти, консултации за GDPR/NIS2 съответствие или запитване за нашите SOC и SIEM решения.",
  keywords: "контакти киберсигурност, спешна помощ кибератаки, DefComs телефон, съответствие NIS2 консултации",
  openGraph: {
    title: "Контакти и Спешна Помощ при Кибератаки | DefComs",
    description: "Денонощна поддръжка при киберинциденти и консултации за сигурност.",
    url: "https://defcoms.eu/contact",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

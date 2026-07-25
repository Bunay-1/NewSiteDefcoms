import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия за Ползване и Договор за SLA | DefComs",
  description: "Условия за ползване на уебсайта и платформите на DefComs в България. Детайли относно SLA гаранциите, плащанията, правилата за сигурност и съответствието с европейските регламенти.",
  keywords: "условия за ползване, SLA гаранции, правила за сигурност, договор киберсигурност, юридически условия, договор SLA България",
  alternates: {
    canonical: "https://defcoms.eu/terms",
  },
  openGraph: {
    title: "Условия за Ползване и Договор за SLA | DefComs",
    description: "Условия за ползване на уебсайта и платформите на DefComs в България. Детайли относно SLA гаранциите, плащанията, правилата за сигурност и съответствието с европейските регламенти.",
    url: "https://defcoms.eu/terms",
    siteName: "DefComs",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Условия за Ползване и Договор за SLA | DefComs",
    description: "Условия за ползване на уебсайта и платформите на DefComs в България. Детайли относно SLA гаранциите, плащанията, правилата за сигурност и съответствието с европейските регламенти.",
  },
};

export default function TermsOfService() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Начало",
        "item": "https://defcoms.eu"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Условия за ползване",
        "item": "https://defcoms.eu/terms"
      }
    ]
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Условия за Ползване и Договор за SLA | DefComs",
    "description": "Условия за ползване на уебсайта и платформите на DefComs в България.",
    "url": "https://defcoms.eu/terms"
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">
          Условия за ползване
        </h1>
        <p className="text-gray-400 mb-12">
          Последна актуализация: Юли 2024
        </p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Приемане на условията</h2>
            <p>
              Чрез използването на уебсайта и услугите на DefComs ("Услугите"), вие се съгласявате да спазвате тези условия за ползване ("Условията"). Ако не съгласни с тези Условия, моля не използвайте нашите Услуги.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Описание на услугите</h2>
            <p className="mb-4">
              DefComs предоставя следните услуги за киберсигурност:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SOC Platform - платформа за мониторинг на сигурността</li>
              <li>SIEM решения - управление на събитията за сигурност</li>
              <li>Endpoint Protection - защита на крайни точки</li>
              <li>Network Security - мрежова сигурност</li>
              <li>Консултации и одити за киберсигурност</li>
              <li>Пентестинг услуги</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Регистрация и акаунти</h2>
            <p className="mb-4">
              За използване на някои от нашите услуги е необходимо да създадете акаунт. При регистрацията вие се съгласявате да:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Предоставите верна, точна и пълна информация</li>
              <li>Поддържате актуална информация за вашия акаунт</li>
              <li>Пазите паролата си в тайна и не я споделяте</li>
              <li>Носите отговорност за всички дейности от вашия акаунт</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Права и задължения на потребителите</h2>
            <p className="mb-4">Вие се съгласявате да:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Използвате Услугите само за законни цели</li>
              <li>Не нарушавате правата на трети страни</li>
              <li>Не се опитвате да нарушите сигурността на нашите системи</li>
              <li>Не разпространявате зловреден софтуер или вируси</li>
              <li>Не използвате автоматизирани инструменти за достъп без разрешение</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Забранени дейности</h2>
            <p className="mb-4">Следните дейности са строго забранени:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Хакерски атаки или опити за проникване</li>
              <li>Разпространение на зловреден софтуер</li>
              <li>Фишинг или социално инженерство</li>
              <li>Нарушаване на интелектуална собственост</li>
              <li>Измами или незаконни дейности</li>
              <li>Прекомерно натоварване на нашите системи</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Интелектуална собственост</h2>
            <p>
              Цялото съдържание на нашия уебсайт, включително текст, графика, лога, софтуер и дизайн, е интелектуална собственост на DefComs и е защитено от закони за авторско право и други приложими закони. Не е позволено копирането, модифицирането или разпространяването без нашето изрично писмено съгласие.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Платежи и фактуриране</h2>
            <p className="mb-4">
              Платежите за нашите услуги се извършват според избраните планове и условия:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Всички цени са в EUR и включват ДДС</li>
              <li>Платежите се извършват месечно или годишно</li>
              <li>Неплатените сметки могат да доведат до прекратяване на услугите</li>
              <li>Възстановявания се обработват според нашата политика за възстановяване</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Отказ от отговорност</h2>
            <p>
              Услугите се предоставят "както са" без никакви гаранции, изрични или подразбиращи се. DefComs не гарантира непрекъсваемост, сигурност или безгрешност на услугите. Ние не носим отговорност за загуби на данни или преки, косвени или последващи щети.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Ограничение на отговорността</h2>
            <p>
              В максималната степен, разрешена от закона, нашата обща отговорност е ограничена до сумата, платена от вас за услугите през последните 12 месеца. Не носим отговорност за загуби на печалба, данни или други косвени щети.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Прекратяване</h2>
            <p className="mb-4">
              Ние си запазваме правото да прекратим или спрем достъпа ви до Услугите в следните случаи:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Нарушаване на тези Условия</li>
              <li>Неплащане на дължими суми</li>
              <li>Подозрение за незаконна дейност</li>
              <li>Технически причини или поддръжка</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Съответствие с регулации</h2>
            <p>
              Нашите услуги са съобразени с приложимите EU директиви и стандарти, включително GDPR, NIS2, CRA, DORA, EU AI Act, ePrivacy, ISO/IEC 27001:2022, ISO/IEC 42001:2023 и SOC 2 Type II.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Изменения на условията</h2>
            <p>
              Може да променяме тези Условия по всяко време. Ще ви уведомим за съществени промени чрез email или чрез уведомление на нашия уебсайт. Продължаването на използването на Услугите след промените означава приемане на новите Условия.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Приложимо право</h2>
            <p>
              Тези Условия се регулират от законите на Република България и Европейския съюз. Всички спорове ще бъдат разглеждани от компетентните съдилища в София, България.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Контакт</h2>
            <p className="mb-4">
              Ако имате въпроси относно тези Условия, моля свържете се с нас:
            </p>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:info@defcoms.eu" className="text-[#0098b2] hover:underline">info@defcoms.eu</a></li>
              <li>Телефон: <a href="tel:+359886088668" className="text-[#0098b2] hover:underline">+359 886 088 668</a></li>
              <li>Адрес: София, България</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

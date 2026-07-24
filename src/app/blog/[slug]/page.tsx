import { ArrowLeft, Calendar, Clock, User, Shield, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { articles } from "../articles";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Блог DefComs`,
    description: article.excerpt,
    keywords: `киберсигурност, ${article.category.toLowerCase()}, ${article.author}, defcoms блог`,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": `https://defcoms.eu${article.image}`,
    "datePublished": "2024-07-01",
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "DefComs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://defcoms.eu/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://defcoms.eu/blog/${article.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 pt-24 px-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0098b2] hover:text-white transition duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Обратно към блога
        </Link>

        <article className="bg-slate-800/50 rounded-2xl border border-slate-800 p-6 md:p-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pb-8 border-b border-slate-700/50 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0098b2]/20 flex items-center justify-center text-[#0098b2] font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="text-white font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              {article.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              {article.readTime}
            </div>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-950 mb-10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover opacity-90"
              priority
            />
          </div>

          {/* Dynamic Article Content */}
          <div className="text-gray-300 leading-relaxed text-base md:text-lg space-y-6">
            <p className="text-white font-semibold text-lg leading-relaxed">
              {article.excerpt}
            </p>

            {article.slug === "nis2-compliance-bulgaria" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Кои организации попадат под регулацията на NIS2?</h3>
                <p>
                  Директивата NIS2 разширява значително обхвата на предходните изисквания, разделяйки субектите на две основни категории: „съществени“ (Essential) и „важни“ (Important) субекти. Това включва не само енергетика, транспорт и банково дело, но и доставчици на цифрови услуги, управление на отпадъци, пощенски услуги и производство на критични стоки.
                </p>
                <p>
                  Ако вашата компания има над 50 служители или годишен оборот над 10 милиона евро и развива дейност в някой от засегнатите сектори, вие сте длъжни да приведете системите си в съответствие до крайния срок.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Ключови изисквания и мерки</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Управление на инциденти:</strong> Задължително ранно известяване за пробиви в рамките на 24 часа.</li>
                  <li><strong>Сигурност на веригата за доставки:</strong> Оценка на уязвимостите на вашите партньори и доставчици.</li>
                  <li><strong>Криптиране и MFA:</strong> Използване на многофакторно удостоверяване и съвременни методи за шифриране.</li>
                  <li><strong>Обучения по киберхигиена:</strong> Редовни симулации за персонала.</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">Как DefComs може да ви помогне?</h3>
                <p>
                  Нашият екип предлага пълна подготовка за съответствие с NIS2: от първоначален одит на сигурността, през интеграция на SOC мониторинг в реално време, до разработване на планове за възстановяване при инциденти (Disaster Recovery).
                </p>
              </>
            )}

            {article.slug === "how-to-spot-phishing-emails" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Модерният фишинг в ерата на изкуствения интелект (AI)</h3>
                <p>
                  В миналото фишинг имейлите се разпознаваха лесно по лошия правопис и граматика. Днес, с помощта на генеративен изкуствен интелект като ChatGPT, хакерите създават перфектно структурирани, граматически правилни и силно персонализирани съобщения на български език, които имитират реални бизнес партньори.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Червените флагове, за които да следите</h3>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-3">
                  <p><strong>1. Несъответствие в имейл адреса на подателя:</strong> Името може да изглежда вярно (напр. „Управител DefComs“), но реалният адрес зад него да е безсмислен (напр. <code>support@com-secure-update.net</code>).</p>
                  <p><strong>2. Извънредна спешност:</strong> Съобщения, които изискват незабавно действие, заплашвайки с блокиране на сметка или съдебни действия, ако не кликнете веднага.</p>
                  <p><strong>3. Съмнителни прикачени файлове:</strong> Файлове с двойни разширения от типа на <code>faktura.pdf.exe</code> или архивни файлове, изискващи пароли.</p>
                </div>

                <h3 className="text-xl font-bold text-white pt-4">Стъпки за незабавна реакция</h3>
                <p>
                  Ако подозирате, че сте получили фишинг съобщение, никога не кликвайте върху линкове в него. Свържете се директно с подателя по сигурен, алтернативен канал (напр. по телефон), или изпратете имейла за анализ към вашия вътрешен ИТ отдел или външен SOC партньор.
                </p>
              </>
            )}

            {article.slug === "benefits-of-24-7-soc" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Защо традиционният 8-часов работен ден не е достатъчен?</h3>
                <p>
                  Злонамерените актьори не спят и не почиват по празници. Всъщност, над 70% от сериозните кибератаки (като разпространение на рансъмуер) се стартират в петък вечер или през почивните дни, когато ИТ екипите на организациите не са на разположение.
                </p>
                <p>
                  Без непрекъснат мониторинг, една атака може да остане незабелязана в продължение на часове или дни, което позволява на хакерите да ексфилтрират чувствителни данни и да криптират критични сървъри.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Ключовите предимства на денонощния SOC център</h3>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Засичане в реално време (Real-time Detection):</strong> Непрекъснат анализ на мрежовия трафик и логове за мигновена реакция при аномалии.</li>
                  <li><strong>AI триаж на аларми:</strong> Изкуственият интелект филтрира фалшивите позитиви, позволявайки на анализаторите да се фокусират единствено върху реалните заплахи.</li>
                  <li><strong>Минимизиране на времето за реакция (MTTR):</strong> Намаляване на времето от засичане до неутрализиране на заплахата до броени минути.</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">Заключение</h3>
                <p>
                  Интегрирането на денонощен SOC мониторинг не е просто лукс за големи корпорации, а задължителен елемент от защитата на всеки модерен бизнес, който цени сигурността на клиентите си и непрекъсваемостта на своите процеси.
                </p>
              </>
            )}

            {article.slug === "dora-regulations-financial-sector" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Какво представлява Регламентът DORA?</h3>
                <p>
                  Регламентът DORA (Digital Operational Resilience Act) е ключов законодателен акт на Европейския съюз, който влиза в сила с цел да укрепи цифровата оперативна устойчивост на финансовия сектор. За разлика от досегашните регулации, които се фокусираха главно върху финансовата стабилност, DORA изисква от финансовите институции да гарантират, че могат да издържат, да реагират и да се възстановят от всякакви ИКТ (информационни и комуникационни технологии) смущения и заплахи.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Ключови стълбове на DORA</h3>
                <p>
                  Регламентът е изграден около пет основни стълба, които всяка засегната организация трябва да внедри в своите процеси:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Управление на ИКТ риска:</strong> Създаване на стабилна рамка за управление на риска, сертифицирана от ръководството.</li>
                  <li><strong>Докладване на ИКТ инциденти:</strong> Хармонизиране и ускоряване на процеса по класификация и докладване на големи инциденти към регулаторните органи.</li>
                  <li><strong>Тестване на цифровата устойчивост:</strong> Редовно тестване на системите, включително провеждане на съвременни проникващи тестове, водени от заплахи (Threat-Led Penetration Testing - TLPT).</li>
                  <li><strong>Управление на риска от трети страни:</strong> Строг контрол и мониторинг на външни ИКТ доставчици (напр. cloud услуги, SOC партньори).</li>
                  <li><strong>Обмен на информация:</strong> Насърчаване на доброволния обмен на разузнавателни данни за заплахи (Threat Intelligence) между институциите.</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">Кои организации попадат в обхвата?</h3>
                <p>
                  Обхватът на DORA е изключително широк. Той засяга не само традиционни финансови институции като банки, кредитни институции и застрахователни компании, но и инвестиционни посредници, доставчици на услуги за криптоактиви, платформи за групово финансиране, както и техните критични ИКТ доставчици от трети страни (включително доставчици на облачни услуги и анализи за сигурност).
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Решението на DefComs</h3>
                <p>
                  DefComs помага на финансовите организации да изпълнят строгите изисквания на DORA чрез предоставяне на услуги по симулация на атаки (Penetration Testing / TLPT), непрекъснат одит на трети страни и внедряване на денонощна SOC платформа за автоматизирано засичане и бърза реакция при инциденти.
                </p>
              </>
            )}

            {article.slug === "gdpr-data-protection-in-soc" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Конфликтът между мониторинга на сигурността и поверителността</h3>
                <p>
                  Работата на един център за сигурност (SOC) по дефиниция изисква събирането и анализа на огромно количество системни логове, мрежов трафик и потребителска активност с цел откриване на кибератаки. Много често обаче тези данни съдържат лична информация - IP адреси, потребителски имена, имейл адреси или метаданни за комуникация. Това поставя предизвикателството за съвместимост с Общия регламент за защита на данните (GDPR).
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Технически мерки за защита в съвременния SOC</h3>
                <p>
                  За да се гарантира съответствие с GDPR, без да се прави компромис с качеството на киберзащитата, нашата платформа внедрява следните напреднали контроли:
                </p>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-3">
                  <p><strong>Псевдонимизация на IP адреси:</strong> IP адресите и потребителските данни се маскират или кодират при първоначалния прием на данни. Пълната информация се разкрива само при реално доказан инцидент от оторизиран анализатор.</p>
                  <p><strong>Криптиране в покой и движение:</strong> Всички събрани логове се шифроват по време на трансфер (TLS 1.3) и при съхранение (AES-256) в базите данни на SIEM системата.</p>
                  <p><strong>Строг ролев контрол (RBAC):</strong> Достъпът до сурови логове е силно ограничен само до анализаторите, които имат пряка роля в разследването на даден инцидент.</p>
                  <p><strong>Ограничено време на съхранение (Data Retention):</strong> Автоматизирани политики за изтриване на данни след изтичане на легитимния период на съхранение за нуждите на сигурността.</p>
                </div>

                <h3 className="text-xl font-bold text-white pt-4">Известяване при пробиви</h3>
                <p>
                  Едно от основните изисквания на GDPR е уведомяването на регулаторния орган в рамките на 72 часа от установяване на нарушение на сигурността на личните данни. Чрез автоматизирания триаж и 24/7 мониторинг в платформата на DefComs, времето за засичане и оценка на пробива се съкращава до минути, осигурявайки ви нужното време за реакция и пълна съвместимост с регулациите.
                </p>
              </>
            )}

            {article.slug === "vulnerability-scanning-proactive-defense" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Какво представлява управлението на уязвимостите?</h3>
                <p>
                  Управлението на уязвимостите (Vulnerability Management) е непрекъснат процес на идентифициране, класифициране, приоритизиране и отстраняване на софтуерни слабости в системите. В свят, в който всеки ден се откриват десетки нови CVE (Common Vulnerabilities and Exposures), реактивната защита (изчакването на атака) вече не работи. Проактивното откриване на уязвимости е единственият начин да изпреварите хакерите.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Предимствата на автоматизираното сканиране</h3>
                <p>
                  Редовното ръчно сканиране на инфраструктурата е трудоемко и бързо остарява. Използването на автоматизиран Vulnerability Scanner носи ключови ползи:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Консистентност:</strong> Сканирането се извършва по разписание (ежедневно или ежеседмично) и обхваща всички нови устройства в мрежата.</li>
                  <li><strong>Интелигентно приоритизиране:</strong> Вместо да преглеждате хиляди аларми, платформата автоматично филтрира кои уязвимости са наистина критични и достъпни от външния свят.</li>
                  <li><strong>Минимизиране на човешкия фактор:</strong> Автоматично генериране на стъпки за отстраняване (remediation) и препоръчителни пачове за ИТ администраторите.</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">DevSecOps и непрекъсната сигурност</h3>
                <p>
                  За съвременните компании, разработващи софтуер, сигурността трябва да бъде част от самия процес на разработка. Интеграцията на нашия скенер за уязвимости директно в CI/CD пайплайните (DevSecOps) гарантира, че нито един код с известни критични слабости няма да достигне до продукционната среда.
                </p>
              </>
            )}

            {article.slug === "edr-endpoint-protection-ransomware" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Ограниченията на традиционните антивируси</h3>
                <p>
                  Традиционните антивирусни програми разчитат почти изцяло на сигнатурен анализ - те сравняват файловете на компютъра с база данни от известни вируси. Проблемът е, че съвременните хакери лесно заобикалят тези защити чрез използване на уникални zero-day заплахи, полиморфен малуер или безфайлови атаки (fileless attacks), които използват легитимни системни инструменти като PowerShell за своите злонамерени цели.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Какво прави EDR технологията различна?</h3>
                <p>
                  EDR (Endpoint Detection and Response) системите представляват следващото поколение киберзащита за крайни точки (работни станции, лаптопи и сървъри). Вместо да сканира само за статични файлове, EDR непрекъснато наблюдава и анализира поведението на всички процеси в реално време.
                </p>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-3">
                  <p><strong>Поведенчески анализ:</strong> Ако даден легитимен процес внезапно се опита да прочете пароли от паметта или да криптира голям брой файлове едновременно, EDR разпознава това като злонамерено поведение.</p>
                  <p><strong>Автоматична изолация:</strong> При засичане на рансъмуер, уязвимата работна станция се изолира автоматично от локалната мрежа за милисекунди, предотвратявайки разпространението на инфекцията.</p>
                  <p><strong>Възстановяване (Rollback):</strong> При успешен опит за криптиране, EDR може автоматично да възстанови променените файлове от защитени сенчести копия.</p>
                </div>

                <h3 className="text-xl font-bold text-white pt-4">Заключение</h3>
                <p>
                  Внедряването на EDR решение е критична стъпка за предпазване на бизнеса от опустошителни ransomware атаки. Чрез платформата Persevs на DefComs, вие получавате пълна видимост на състоянието на вашите крайни точки и денонощна автоматизирана реакция при заплахи.
                </p>
              </>
            )}

            {article.slug === "guide-ransomware-incident-response" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Какво да правим при засичане на рансъмуер атака?</h3>
                <p>
                  Рансъмуерът (криптиращият малуер) е една от най-опасните заплахи за бизнеса. Нападателите криптират важни корпоративни файлове и изискват огромни суми в криптовалута за предоставяне на декриптиращ ключ. Наличието на ясен Incident Response Playbook прави разликата между бързото възстановяване и пълната бизнес катастрофа.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Фази на реакция: Стъпка по стъпка</h3>
                <p>
                  Следвайте тези четири ключови стъпки веднага след засичане на подозрителна активност:
                </p>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-4">
                  <div>
                    <strong className="text-white text-base">1. Изолация (Containment)</strong>
                    <p className="text-sm text-gray-300 mt-1">
                      Изключете веднага компрометираните компютри от локалната мрежа и Wi-Fi. Не рестартирайте машините - това може да изтрие важна информация от оперативната памет (RAM), необходима за разследването на атаката. Изолирайте и мрежовите сегменти на сървърите, за да предотвратите хоризонтално разпространение (lateral movement).
                    </p>
                  </div>
                  <div>
                    <strong className="text-white text-base">2. Идентифициране и анализ (Identification)</strong>
                    <p className="text-sm text-gray-300 mt-1">
                      Определете типа на рансъмуера чрез разглеждане на файловите разширения и бележката с искане за откуп (ransom note). Свържете се с вашия SOC екип или външни експерти, за да се определят засегнатите акаунти и входната точка на заплахата.
                    </p>
                  </div>
                  <div>
                    <strong className="text-white text-base">3. Изкореняване на заплахата (Eradication)</strong>
                    <p className="text-sm text-gray-300 mt-1">
                      Премахнете злонамерения софтуер от системите. Преинсталирайте компрометираните сървъри и работни станции „начисто“ от сигурни и проверени източници. Променете паролите на всички администраторски акаунти и системни сесии в Active Directory.
                    </p>
                  </div>
                  <div>
                    <strong className="text-white text-base">4. Възстановяване на системи (Recovery)</strong>
                    <p className="text-sm text-gray-300 mt-1">
                      Възстановете данните от вашите офлайн бекъпи. Преди връщането на системите в продукция, се уверете, че те са напълно сканирани и защитени с активни EDR агенти.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white pt-4">Плащане на откупа - ДА или НЕ?</h3>
                <p>
                  Официалната препоръка на всички CERT организации и експерти по сигурност е <strong>никога да не се плаща откуп</strong>. Плащането не гарантира получаването на работещ декриптор, финансира бъдещи престъпления и превръща компанията ви в лесна мишена за следващи атаки.
                </p>
              </>
            )}

            {article.slug === "guide-corporate-wifi-security" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Защо домашният Wi-Fi не е сигурен за бизнеса?</h3>
                <p>
                  Използването на обикновена парола (WPA2 Personal) за корпоративен Wi-Fi е сериозен риск. Ако един служител напусне или паролата бъде компрометирана, цялата мрежа става уязвима. Хакерите в близост до вашия офис могат лесно да прихванат трафика или да проведат атаки от тип „Man-in-the-Middle“ (MitM).
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Основни стъпки за сигурен корпоративен Wi-Fi</h3>
                <p>
                  Внедрете следните стандарти за гарантиране на високо ниво на защита на безжичния достъп:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Преминаване към WPA3 Enterprise:</strong> Този стандарт осигурява индивидуално криптиране за всяка сесия и защита срещу офлайн речникови атаки за разбиване на пароли.</li>
                  <li><strong>802.1X удостоверяване:</strong> Служителите трябва да се свързват към мрежата чрез своите индивидуални Active Directory / LDAP акаунти или лични цифрови сертификати, а не чрез обща парола.</li>
                  <li><strong>Строга мрежова сегментация:</strong> Разделете физически безжичния достъп на три отделни VLAN мрежи:
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li><strong>VLAN Corporate:</strong> Само за одобрени фирмени устройства с пълен достъп до вътрешни сървъри.</li>
                      <li><strong>VLAN Guest:</strong> Само интернет достъп за гости и външни посетители, без връзка към вътрешни ресурси.</li>
                      <li><strong>VLAN IoT:</strong> Изолирана мрежа за принтери, умни устройства и камери.</li>
                    </ul>
                  </li>
                  <li><strong>Деактивиране на WPS и засичане на Rogue APs:</strong> Изключете функцията Wi-Fi Protected Setup (WPS) и редовно сканирайте за неоторизирани безжични предаватели (Rogue Access Points) в офиса.</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">Заключение</h3>
                <p>
                  Сигурната безжична мрежа изисква централизирано управление и непрекъснат мониторинг на трафика. Чрез решенията на DefComs за мрежова сегментация и IDS/IPS засичане, вашите Wi-Fi комуникации остават напълно защитени.
                </p>
              </>
            )}

            {article.slug === "guide-mfa-password-policy" && (
              <>
                <h3 className="text-xl font-bold text-white pt-4">Краят на класическата парола</h3>
                <p>
                  Над 80% от успешните хакерски атаки и пробиви на данни се дължат на компрометирани, слаби или лесни за налучкване потребителски пароли. Традиционните изисквания за смяна на паролата на всеки 90 дни днес се считат за неефективни, тъй като потребителите просто сменят една цифра или символ, правейки новата парола лесно предвидима за автоматизирани хакерски инструменти.
                </p>

                <h3 className="text-xl font-bold text-white pt-4">Новият стандарт за пароли (NIST насоки)</h3>
                <p>
                  Според съвременните препоръки на NIST (National Institute of Standards and Technology), добрата политика за пароли трябва да набляга на:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Дължина пред сложност:</strong> Използване на дълги фрази (passphrases) от 4-5 случайни думи (напр. <code>sinio-nebo-gora-pat-shuma</code>). Те се запомнят лесно от хората, но изискват векове за разбиване с brute-force.</li>
                  <li><strong>Без принудителна ротация:</strong> Смяна на паролата само при реално съмнение за пробив на сигурността.</li>
                  <li><strong>Автоматична проверка за компрометирани пароли:</strong> Спиране на потребителите да използват пароли, които вече присъстват в глобални бази данни за изтекли данни (напр. HaveIBeenPwned).</li>
                </ul>

                <h3 className="text-xl font-bold text-white pt-4">Мултифакторно удостоверяване (MFA) - Вашият щит</h3>
                <p>
                  Внедряването на MFA (Multi-Factor Authentication) е най-ефективната единична стъпка за защита на вашите корпоративни акаунти. Дори хакерът да научи паролата ви, той няма да може да влезе в акаунта без втория потвърдителен фактор.
                </p>
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-3">
                  <p><strong>SMS кодовете НЕ са сигурни:</strong> Избягвайте използването на SMS за MFA. Те могат лесно да бъдат прихванати чрез SIM-swapping или мрежови уязвимости.</p>
                  <p><strong>Използвайте Authenticator приложения:</strong> Приложения като Google/Microsoft Authenticator генерират сигурни времеви кодове (TOTP) изцяло локално на вашето устройство.</p>
                  <p><strong>Хардуерни ключове (FIDO2 / YubiKey):</strong> Това е „златният стандарт“ за сигурност, осигуряващ пълна защита срещу модерни фишинг атаки с пренасочване (session hijacking).</p>
                </div>
              </>
            )}
          </div>

          {/* Social share and CTA */}
          <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-[#0098b2]" />
              Защитено и верифицирано от DefComs
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition duration-200">
              <Share2 className="w-3.5 h-3.5" /> Сподели статията
            </button>
          </div>
        </article>

        <div className="mt-12 bg-[#0098b2]/10 border border-[#0098b2]/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Имате съмнения за сигурността на вашите системи?</h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto mb-6">
            Нашите експерти са на разположение за безплатна първоначална консултация и анализ на текущото състояние на вашата киберзащита.
          </p>
          <Link href="/contact">
            <button className="bg-[#f22020] hover:bg-red-700 text-white font-bold text-sm py-3 px-8 rounded-xl transition duration-150">
              Заявете безплатен одит
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

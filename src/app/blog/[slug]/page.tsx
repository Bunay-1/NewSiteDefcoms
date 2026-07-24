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

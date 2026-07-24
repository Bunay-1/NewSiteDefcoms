import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Блог по Киберсигурност и Защита | Статии и Новини | DefComs",
  description: "Прочетете най-новите статии, анализи и ръководства по киберсигурност, съответствие с NIS2/GDPR, защита от фишинг и най-добрите SOC практики от нашите експерти.",
  keywords: "киберсигурност блог, NIS2 статии, GDPR ръководства, сигурност анализи, DefComs блог",
};

export default function BlogPage() {
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "DefComs Cybersecurity Blog",
    "description": "Полезни статии, анализи и ръководства за киберсигурност, съответствие с NIS2/GDPR и най-добрите SOC практики.",
    "publisher": {
      "@type": "Organization",
      "name": "DefComs",
      "url": "https://defcoms.eu"
    },
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "alternativeHeadline": article.excerpt,
      "image": `https://defcoms.eu${article.image}`,
      "datePublished": "2024-07-01",
      "author": {
        "@type": "Person",
        "name": article.author
      }
    }))
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0098b2]/10 border border-[#0098b2]/30 text-[#0098b2] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            Блог & Анализи
          </div>
          <h1 className="text-5xl font-black text-white mb-6">Блог на DefComs</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Експертни статии, анализи на заплахи, ръководства за съответствие с NIS2/GDPR и най-добрите съвети от нашите специалисти по киберсигурност.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-[#0098b2]/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image header */}
                <div className="aspect-video relative bg-slate-900">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover opacity-90"
                  />
                  <span className="absolute top-4 left-4 bg-[#0098b2] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-[#0098b2] transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author and Read More */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-700/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0098b2]/20 flex items-center justify-center text-[#0098b2] font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{article.author}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-bold text-[#0098b2] hover:text-white flex items-center gap-1 transition-colors"
                >
                  Прочетете още <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#0098b2]/20 to-slate-900 p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              Искате най-новите статии директно на имейла си?
            </h3>
            <p className="text-xs text-gray-400">
              Абонирайте се за нашия бюлетин по киберсигурност и получавайте анализи в реално време.
            </p>
          </div>
          <Link href="/contact">
            <button className="bg-[#f22020] hover:bg-red-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition duration-150">
              Свържете се за безплатен одит
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

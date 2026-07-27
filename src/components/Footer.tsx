import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Facebook, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 260 300" fill="none">
                <path className="fill-[#005f7f]" d="M260,75.8v148.4l-64.63,37.1-64.63,37.1v-73.71l32.53-18.67,32.53-18.67v-74.69l64.2-36.85h0ZM1.48,75.8l64.2,36.85h0s32.53-18.67,32.53-18.67l32.53-18.67V1.6l-64.63,37.1L1.48,75.8Z"/>
                <polygon className="fill-[#0098b2]" points="130.74 298.4 66.11 261.3 1.48 224.2 1.48 150 1.48 75.8 65.68 112.65 65.68 150 65.68 187.35 98.21 206.02 130.74 224.69 130.74 298.4"/>
                <polygon className="fill-[#f22020]" points="130.74 75.31 130.74 150 260 75.8 194.94 38.45 130.74 75.31"/>
              </svg>
              <span className="text-xl font-bold text-white">DefComs</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-sm leading-relaxed">
              Водещи решения за киберсигурност, 24/7 Security Operations Center (SOC) и гарантирано съответствие с най-новите европейски директиви.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Def-Coms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/people/DefComs/61590374520528/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/defcoms/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://discord.com/channels/1513933406260695091/1513933664663113918" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" title="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Инструменти</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/tools/roi" className="hover:text-white transition">ROI Калкулатор за киберсигурност</Link></li>
              <li><Link href="/tools/compliance-wizard" className="hover:text-white transition">Интерактивен калкулатор NIS2 & DORA</Link></li>
              <li><Link href="/tools/ai-act-wizard" className="hover:text-white transition">EU AI Act съответствие и калкулатор</Link></li>
              <li><Link href="/tools/bundle" className="hover:text-white transition">Гъвкав конфигуратор на бизнес услуги</Link></li>
              <li><Link href="/tools/phishing-trainer" className="hover:text-white transition">Фишинг тренажор за обучение на екипи</Link></li>
              <li><Link href="/threat-advisories" className="hover:text-white transition">Център за актуални глобални заплахи</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition">Тест за оценка на дигиталния риск</Link></li>
              <li><Link href="/technologies" className="hover:text-white transition">Използвани технологии и платформи</Link></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Решения</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/products" className="hover:text-white transition">Иновативни продукти за сигурност и защита</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Комплексни услуги по киберсигурност за бизнеса</Link></li>
              <li><Link href="/standards" className="hover:text-white transition text-[#0098b2] font-semibold">Стандарти за сигурност и съответствие</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Блог, експертни анализи и образователни статии</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">SOC демо симулатор на живо в реално време</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Контакти</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#0098b2]" />
                <span>София, България</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0098b2]" />
                <a href="mailto:info@defcoms.eu" className="hover:text-white transition">info@defcoms.eu</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0098b2]" />
                <a href="tel:+359886088668" className="hover:text-white transition">+359 886 088 668</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 DefComs. Всички права запазени.
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Политика за поверителност</Link>
            <Link href="/terms" className="hover:text-white transition">Условия за ползване</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
              <a href="https://github.com/Def-Coms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/people/DefComs/61590374520528/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/defcoms/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Инструменти</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/tools/roi" className="hover:text-white transition">ROI Калкулатор</Link></li>
              <li><Link href="/tools/bundle" className="hover:text-white transition">Конфигуратор на услуги</Link></li>
              <li><Link href="/tools/phishing-trainer" className="hover:text-white transition">Фишинг Тренажор</Link></li>
              <li><Link href="/threat-advisories" className="hover:text-white transition">Център за заплахи</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition">Тест за оценка на риска</Link></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Решения</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/products" className="hover:text-white transition">Продукти за защита</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Услуги по киберсигурност</Link></li>
              <li><Link href="/technologies" className="hover:text-white transition">Използвани технологии</Link></li>
              <li><Link href="/blog" className="hover:text-white transition text-[#0098b2] font-semibold">Блог и Статии</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">SOC Демо Симулатор</Link></li>
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

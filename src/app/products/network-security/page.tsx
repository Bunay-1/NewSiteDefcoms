import { Network, CheckCircle, ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Security - Сигурност на Мрежовата Инфраструктура | DefComs",
  description: "Цялостна защита на корпоративни мрежи с IDS/IPS системи, управление на защитни стени (firewall), сегментиране на мрежата и SOAR интеграция за автоматична реакция.",
  keywords: "Network Security, IDS/IPS, мрежова сигурност, мрежова сегментация, защита от мрежови атаки",
};

export default function NetworkSecurityPage() {
  const faqs = [
    {
      question: "Какво е Network Security?",
      answer: "Network Security е нашето цялостно решение за защита на мрежовата инфраструктура. Предоставя видимост на целия мрежов трафик, откриване на аномалии и автоматизиран отговор на заплахи в реално време."
    },
    {
      question: "Какви са основните функции?",
      answer: "Основните функции включват: мрежов мониторинг, откриване на инвазии (IDS), превенция на инвазии (IPS), firewall управление, анализ на мрежов трафик, IoT протокол анализ и автоматизирано откриване на заплахи."
    },
    {
      question: "Как се интегрира със съществуващи мрежи?",
      answer: "Решението поддържа интеграции с водещи мрежови устройства (Cisco, Juniper, Fortinet), SDN платформи, cloud мрежи и IoT устройства чрез стандартни протоколи и API."
    },
    {
      question: "Какви са изискванията за внедряване?",
      answer: "Минималните изисквания включват: мрежов апарат с 4GB RAM, 50GB дисково пространство и достъп до мрежовия трафик (SPAN port или TAP). Предлагаме и cloud-based решение."
    },
    {
      question: "Как се осигурява съответствие с регулации?",
      answer: "Решението поддържа NIS2 съответствие чрез непрекъснат мониторинг, детайлни логове за одити, автоматизирани отчети и функции за бързо известяване на инциденти."
    }
  ];

  const galleryImages = [
    { title: "Network Topology", description: "Визуализация на мрежовата топология", src: "/LANProject/network_topology.webp" },
    { title: "IP Dossier", description: "Анализ на IP адреси", src: "/LANProject/02_ip_dossier.webp" },
    { title: "IoT Protocols", description: "Анализ на IoT протоколи", src: "/LANProject/02iot_protocols_panel.webp" },
    { title: "Threat Hunting", description: "Търсене на заплахи", src: "/LANProject/03_threat-hunting.webp" },
    { title: "Test Data Generator", description: "Генератор на тестови данни", src: "/LANProject/04_test_data_generator.webp" },
    { title: "SOAR Rules", description: "Конфигуриране на SOAR правила", src: "/LANProject/05-soar-rule-form.webp" },
    { title: "Playbooks", description: "Автоматизирани playbooks", src: "/LANProject/05_playbooks.webp" },
    { title: "Config Audit", description: "Одит на конфигурации", src: "/LANProject/06-config-audit-panel.webp" },
    { title: "Network Reports", description: "Мрежови отчети", src: "/LANProject/06_reports_network.webp" },
    { title: "Automation Detection", description: "Автоматизирано откриване", src: "/LANProject/automation_detection.webp" },
    { title: "Network Security", description: "Мрежова сигурност", src: "/LANProject/network_security.webp" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-[#0098b2] hover:underline">
            ← Назад към продуктите
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0098b2] rounded-2xl mb-6">
            <Network className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Network Security</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Цялостно решение за защита на мрежовата инфраструктура с видимост на трафика и автоматизиран отговор на заплахи
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Мрежов Мониторинг", desc: "Непрекъснато наблюдение на трафика" },
            { title: "IDS/IPS", desc: "Откриване и превенция на инвазии" },
            { title: "IoT Анализ", desc: "Специализиран анализ на IoT протоколи" },
            { title: "SOAR Интеграция", desc: "Автоматизиран отговор на инциденти" }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <CheckCircle className="w-8 h-8 text-[#0098b2] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Галерия</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="aspect-video relative">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                  <p className="text-gray-400 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Често задавани въпроси</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold text-[#0098b2] mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Готови сте да защитите мрежата си?
          </h2>
          <p className="text-white/80 mb-6">
            Свържете се с нас за демо или безплатна консултация
          </p>
          <button className="bg-white text-[#0098b2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
            Свържете се с нас
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}

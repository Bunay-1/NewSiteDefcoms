import { Shield, Lock, Globe, AlertTriangle, Eye, Cpu, Database, Network } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      id: "soc-platform",
      name: "SOC Platform",
      description: "Централизирана платформа за мониторинг и управление на инциденти в реално време",
      icon: Shield,
      color: "bg-[#0098b2]",
      features: ["24/7 мониторинг", "AI-базирано откриване", "Автоматизиран отговор", "Интеграция с SIEM"]
    },
    {
      id: "siem",
      name: "SIEM Solution",
      description: "Система за управление на информация и събития за сигурността",
      icon: Eye,
      color: "bg-[#f22020]",
      features: ["Събиране на логове", "Корелация на събития", "Откриване на аномалии", "Отчети и анализи"]
    },
    {
      id: "endpoint-protection",
      name: "Endpoint Protection",
      description: "Защита на крайни точки срещу малуер и ransomware",
      icon: Lock,
      color: "bg-[#0098b2]",
      features: ["Анти-вирус", "Anti-ransomware", "Firewall", "Device control"]
    },
    {
      id: "network-security",
      name: "Network Security",
      description: "Комплексна защита на мрежовата инфраструктура",
      icon: Network,
      color: "bg-[#f22020]",
      features: ["NGFW", "IDS/IPS", "VPN", "Network segmentation"]
    },
    {
      id: "vulnerability-scanner",
      name: "Vulnerability Scanner",
      description: "Автоматично сканиране и откриване на уязвимости",
      icon: AlertTriangle,
      color: "bg-[#0098b2]",
      features: ["Автоматично сканиране", "Приоритизиране", "Интеграция с CI/CD", "Отчети"]
    },
    {
      id: "threat-intelligence",
      name: "Threat Intelligence",
      description: "Разузнаване за заплахи и прогнозиране на атаки",
      icon: Globe,
      color: "bg-[#f22020]",
      features: ["Real-time feeds", "IOC matching", "Risk scoring", "Custom integrations"]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Нашите продукти
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Комплексни решения за киберсигурност, разработени да защитят вашия бизнес от най-съвременните заплахи
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition transform hover:scale-105 cursor-pointer">
                  <div className={`${product.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
                  <p className="text-gray-400 mb-6">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-[#0098b2] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

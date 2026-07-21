import { Shield, Search, FileText, Users, Cpu, Lock, Globe, AlertTriangle } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Search,
      title: "Пентестинг",
      description: "Комплексно тестване за уязвимости на вашите системи и приложения",
      details: [
        "Black-box и white-box тестване",
        "Web application penetration testing",
        "Network penetration testing",
        "Mobile application security testing",
        "Social engineering assessments"
      ]
    },
    {
      icon: FileText,
      title: "Консултации",
      description: "Експертни консултации за стратегия и политика по киберсигурност",
      details: [
        "GDPR съответствие",
        "NIS2 и DORA подготовка",
        "ISO 27001 сертификация",
        "Security strategy development",
        "Risk assessment and management"
      ]
    },
    {
      icon: Shield,
      title: "Одити за сигурност",
      description: "Детайлни одити на инфраструктурата и процесите за сигурност",
      details: [
        "Infrastructure security audits",
        "Application security reviews",
        "Compliance audits",
        "Configuration reviews",
        "Security posture assessment"
      ]
    },
    {
      icon: Users,
      title: "SOC услуги",
      description: "24/7 мониторинг и управление на инциденти от нашия SOC екип",
      details: [
        "24/7 monitoring and response",
        "Incident management",
        "Threat hunting",
        "Security operations",
        "Emergency response"
      ]
    },
    {
      icon: Cpu,
      title: "Инцидент мениджмънт",
      description: "Бърза реакция и възстановяване при кибер инциденти",
      details: [
        "Incident response planning",
        "Digital forensics",
        "Malware analysis",
        "Post-incident recovery",
        "Lessons learned documentation"
      ]
    },
    {
      icon: Lock,
      title: "Криптиране и DLP",
      description: "Защита на чувствителни данни чрез криптиране и DLP решения",
      details: [
        "Data encryption solutions",
        "DLP implementation",
        "Key management",
        "Data classification",
        "Secure data transfer"
      ]
    },
    {
      icon: Globe,
      title: "Мрежова сигурност",
      description: "Проектиране и внедряване на мрежови решения за сигурност",
      details: [
        "Network segmentation",
        "Firewall management",
        "IDS/IPS deployment",
        "VPN solutions",
        "Zero Trust architecture"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Training и Awareness",
      description: "Обучение на персонала по киберсигурност и phishing симулации",
      details: [
        "Security awareness training",
        "Phishing simulations",
        "Executive briefings",
        "Custom training programs",
        "Security culture development"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Нашите услуги
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Комплексни услуги за киберсигурност, разработени да защитят вашия бизнес и да осигурят съответствие с EU директиви
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-[#0098b2] p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-[#f22020] rounded-full mr-3"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Нашият процес
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Оценка", desc: "Анализираме текущото състояние и рискове" },
              { step: "02", title: "Стратегия", desc: "Разработваме персонализиран план" },
              { step: "03", title: "Внедряване", desc: "Прилагаме решенията и контролите" },
              { step: "04", title: "Поддръжка", desc: "Осигуряваме непрекъсната защита" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#0098b2] mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Готови сте да защитите бизнеса си?
          </h2>
          <p className="text-white/80 mb-6">
            Свържете се с нас за безплатна консултация и оценка на вашата киберсигурност
          </p>
          <button className="bg-white text-[#0098b2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Свържете се с нас
          </button>
        </div>
      </div>
    </main>
  );
}

import { Cpu, Cloud, Database, Shield, Brain, Globe, Code, Server, Lock, HardDrive, CpuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoCarousel from "@/components/LogoCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Използвани Технологии за Киберсигурност | DefComs",
  description: "Запознайте се с нашия технологичен стек от последно поколение: облачни платформи AWS/Azure, AI и ML библиотеки, DevOps технологии, бази данни и системи за сигурност.",
  keywords: "технологичен стек, AWS, Azure, Next.js, Python, Kubernetes, Docker, изкуствен интелект в сигурността",
};

export default function TechnologiesPage() {
  const categories = [
    {
      name: "Cloud Platforms",
      icon: Cloud,
      color: "bg-blue-600",
      technologies: [
        { name: "AWS", logo: "/Logos/aws.svg" },
        { name: "Azure", logo: "/Logos/azure.svg" },
        { name: "Google Cloud", logo: "/Logos/googlecloud.svg" },
        { name: "DigitalOcean", logo: "/Logos/digitalocean.svg" }
      ]
    },
    {
      name: "Backend Development",
      icon: Server,
      color: "bg-green-600",
      technologies: [
        { name: "Python", logo: "/Logos/python.svg" },
        { name: "Node.js", logo: "/Logos/nodejs.svg" },
        { name: "Go", logo: "/Logos/go.svg" },
        { name: "Java", logo: "/Logos/java.svg" },
        { name: "Rust", logo: "/Logos/rust.svg" },
        { name: "C++", logo: "/Logos/cplusplus.svg" },
        { name: "TypeScript", logo: "/Logos/typescript.svg" },
        { name: "JavaScript", logo: "/Logos/javascript.svg" }
      ]
    },
    {
      name: "Frontend Development",
      icon: Code,
      color: "bg-purple-600",
      technologies: [
        { name: "React", logo: "/Logos/react.svg" },
        { name: "Next.js", logo: "/Logos/nextjs.svg" },
        { name: "TailwindCSS", logo: "/Logos/tailwindcss.svg" },
        { name: "shadcn/ui", logo: "/Logos/shadcnui.svg" }
      ]
    },
    {
      name: "Databases",
      icon: Database,
      color: "bg-orange-600",
      technologies: [
        { name: "PostgreSQL", logo: "/Logos/postgresql.svg" },
        { name: "MongoDB", logo: "/Logos/mongodb.svg" },
        { name: "Redis", logo: "/Logos/redis.svg" },
        { name: "ClickHouse", logo: "/Logos/clickhouse.svg" },
        { name: "TimescaleDB", logo: "/Logos/timescaledb.svg" }
      ]
    },
    {
      name: "DevOps & Infrastructure",
      icon: Cpu,
      color: "bg-teal-600",
      technologies: [
        { name: "Docker", logo: "/Logos/docker.svg" },
        { name: "Kubernetes", logo: "/Logos/kubernetes.svg" },
        { name: "Helm", logo: "/Logos/helm.svg" },
        { name: "Istio", logo: "/Logos/istio.svg" },
        { name: "Vault", logo: "/Logos/vault.svg" },
        { name: "Fluent Bit", logo: "/Logos/fluentbit.svg" }
      ]
    },
    {
      name: "Monitoring & Observability",
      icon: Globe,
      color: "bg-pink-600",
      technologies: [
        { name: "Grafana", logo: "/Logos/grafana.svg" },
        { name: "Prometheus", logo: "/Logos/prometheus.svg" },
        { name: "Loki", logo: "/Logos/loki.svg" },
        { name: "Jaeger", logo: "/Logos/jaeger.svg" }
      ]
    },
    {
      name: "AI & Machine Learning",
      icon: Brain,
      color: "bg-red-600",
      technologies: [
        { name: "TensorFlow", logo: "/Logos/tensorflow.svg" },
        { name: "PyTorch", logo: "/Logos/pytorch.svg" },
        { name: "OpenAI", logo: "/Logos/openai.svg" },
        { name: "OpenCV", logo: "/Logos/opencv.svg" },
        { name: "Scikit-learn", logo: "/Logos/scikitlearn.svg" },
        { name: "MLflow", logo: "/Logos/mlflow.svg" },
        { name: "Kubeflow", logo: "/Logos/kubeflow.svg" }
      ]
    },
    {
      name: "Security",
      icon: Shield,
      color: "bg-indigo-600",
      technologies: [
        { name: "Falco", logo: "/Logos/falco.svg" },
        { name: "Trivy", logo: "/Logos/trivy.svg" },
        { name: "Wireshark", logo: "/Logos/wireshark.svg" }
      ]
    },
    {
      name: "IoT & Edge Computing",
      icon: Lock,
      color: "bg-yellow-600",
      technologies: [
        { name: "IoT", logo: "/Logos/iot.svg" },
        { name: "Raspberry Pi", logo: "/Logos/raspberrypi.svg" },
        { name: "Ethereum", logo: "/Logos/ethereum.svg" },
        { name: "Solidity", logo: "/Logos/solidity.svg" }
      ]
    },
    {
      name: "Streaming & Messaging",
      icon: Server,
      color: "bg-cyan-600",
      technologies: [
        { name: "Apache Kafka", logo: "/Logos/apachekafka.svg" },
        { name: "RabbitMQ", logo: "/Logos/rabbitmq.svg" },
        { name: "Socket.io", logo: "/Logos/socketio.svg" }
      ]
    },
    {
      name: "Network & Enterprise",
      icon: Globe,
      color: "bg-slate-600",
      technologies: [
        { name: "Cisco", logo: "/Logos/cisco.svg" },
        { name: "Mikrotik", logo: "/Logos/mikrotik.svg" },
        { name: "SAP", logo: "/Logos/sap.svg" }
      ]
    }
  ];

  // Flat list of technologies for the infinite logo carousel
  const carouselTechs = categories.flatMap(cat => cat.technologies);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Технологии
        </h1>
        <p className="text-xl text-gray-300 text-center mb-10 max-w-3xl mx-auto">
          Използваме най-модерните технологии и инструменти за изграждане на сигурни и мащабируеми решения
        </p>

        {/* Infinite Logo Carousel */}
        <div className="mb-16">
          <LogoCarousel technologies={carouselTechs} />
        </div>

        {/* Hardware Specifications Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-[#0098b2]/30 rounded-2xl p-8 mb-16 shadow-[0_4px_30px_rgba(0,152,178,0.05)]">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-[#0098b2]/10 rounded-xl border border-[#0098b2]/20 text-[#0098b2]">
              <Server className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-wide">
                Препоръчителен хардуер, който ползваме
              </h2>
              <p className="text-sm text-gray-400">
                Оптимизирани хардуерни спецификации за максимална производителност и устойчивост на нашите платформи
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-850 border-b border-slate-700/60">
                  <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider text-gray-400 w-1/3">
                    Компонент
                  </th>
                  <th className="py-4 px-6 text-sm font-bold uppercase tracking-wider text-[#0098b2]">
                    Препоръчително ниво
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                <tr className="hover:bg-slate-800/30 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                    <Server className="w-4 h-4 text-cyan-500" />
                    Операционна система (ОС)
                  </td>
                  <td className="py-4 px-6 text-gray-300 font-mono text-sm">
                    Ubuntu Server 24.04 LTS
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-cyan-500" />
                    Процесор (CPU)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    16–32 ядра
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                    <Database className="w-4 h-4 text-cyan-500" />
                    Оперативна памет (RAM)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    64–128 GB ECC
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                    <HardDrive className="w-4 h-4 text-cyan-500" />
                    Дисково пространство (Storage)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    2 × 960 GB NVMe (RAID 1) + 4 × 3.84 TB NVMe (RAID 10)
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition duration-150">
                  <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                    <Globe className="w-4 h-4 text-cyan-500" />
                    Мрежов интерфейс (Мрежа)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    2 × 10 GbE
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="bg-slate-700 p-4 rounded-lg flex items-center gap-3 hover:bg-slate-600 transition">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Искате да научите повече за нашето технологично решение?
          </h2>
          <p className="text-white/80 mb-6">
            Свържете се с нас за безплатна консултация
          </p>
          <Link href="/contact">
            <button className="bg-white text-[#0098b2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Свържете се с нас
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

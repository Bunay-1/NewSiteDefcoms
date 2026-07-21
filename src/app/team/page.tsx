import { Linkedin, Mail, Shield, Cpu, Globe, Lock } from "lucide-react";
import Image from "next/image";

export default function TeamPage() {
  const team = [
    {
      name: "Александър Петров",
      role: "CEO & Founder",
      bio: "20+ години опит в киберсигурността. Бивш CISO на Fortune 500 компании.",
      icon: Shield,
      color: "bg-[#0098b2]",
      image: "/testimonials/men (1).webp"
    },
    {
      name: "Мария Иванова",
      role: "CTO",
      bio: "Експерт в облачната сигурност и DevSecOps. Бивш архитект на сигурността в Microsoft.",
      icon: Cpu,
      color: "bg-[#f22020]",
      image: "/testimonials/woman (1).webp"
    },
    {
      name: "Димитър Димитров",
      role: "Head of Security Operations",
      bio: "15+ години в SOC операциите. Сертифициран CISSP, CEH, OSCP.",
      icon: Globe,
      color: "bg-[#0098b2]",
      image: "/testimonials/men (2).webp"
    },
    {
      name: "Елена Георгиева",
      role: "Head of Compliance",
      bio: "Експерт по GDPR, NIS2 и ISO 27001. Бивш одитор на Big 4.",
      icon: Lock,
      color: "bg-[#f22020]",
      image: "/testimonials/woman (2).webp"
    },
    {
      name: "Николай Николов",
      role: "Senior Security Consultant",
      bio: "Специалист по пентестинг и red team operations. OSCP, OSWE сертифициран.",
      icon: Shield,
      color: "bg-[#0098b2]",
      image: "/testimonials/men (3).webp"
    },
    {
      name: "Анна Ангелова",
      role: "Lead Developer",
      bio: "Експерт в разработката на security solutions. Full-stack developer с фокус върху сигурността.",
      icon: Cpu,
      color: "bg-[#f22020]",
      image: "/testimonials/woman (3).webp"
    }
  ];

  const certifications = [
    "CISSP",
    "CEH",
    "OSCP",
    "CISA",
    "CISM",
    "ISO 27001 Lead Auditor",
    "GDPR Practitioner",
    "AWS Security Specialty",
    "DigComp 2.1 - Level 5",
    "DigComp 2.1 - Level 6",
    "DigComp 2.1 - Level 7",
    "DigComp 2.1 - Level 8",
    "Lean Fundamentals Certified",
    "LeanPM - Yellow Belt Professional",
    "Hexagon IoT/IIoT",
    "Google Developer Program"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Нашият екип
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Опитни професионалисти с доказан опит в киберсигурността и съответствието
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <div key={index} className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-[#0098b2] transition text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[#0098b2] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-400 mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                    <Linkedin className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                    <Mail className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Сертификации на нашия екип
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <span key={index} className="bg-[#0098b2] text-white px-4 py-2 rounded-lg font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Нашите ценности
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Експертиза", desc: "Дълбоки познания и практически опит в киберсигурността" },
              { title: "Интегритет", desc: "Прозрачност и честност във всички наши отношения" },
              { title: "Иновации", desc: "Винаги в челните редици на технологичните новости" }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#f22020] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us */}
        <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Искате да се присъедините към нашия екип?
          </h2>
          <p className="text-white/80 mb-6">
            Винаги търсим талантливи професионалисти, споделящи нашата мисия
          </p>
          <button className="bg-white text-[#0098b2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Вижте отворени позиции
          </button>
        </div>
      </div>
    </main>
  );
}

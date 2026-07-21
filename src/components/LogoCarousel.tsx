"use client";

import Image from "next/image";

interface Technology {
  name: string;
  logo: string;
}

interface LogoCarouselProps {
  technologies: Technology[];
}

export default function LogoCarousel({ technologies }: LogoCarouselProps) {
  // We duplicate the technologies list to achieve a seamless loop effect
  const doubleTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="w-full bg-slate-850 py-10 overflow-hidden relative border-y border-slate-800">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

      <div className="flex select-none">
        <div className="flex gap-16 animate-infinite-scroll whitespace-nowrap min-w-full justify-around items-center">
          {doubleTechs.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-slate-800/80 px-6 py-3 rounded-xl border border-slate-700/50 hover:border-[#0098b2]/40 transition duration-300 min-w-[180px] justify-center"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-semibold text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 45s linear infinite;
        }
      `}</style>
    </div>
  );
}

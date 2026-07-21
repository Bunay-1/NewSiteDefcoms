"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FAQItem[];
  colorTheme?: "blue" | "red";
}

export default function FaqAccordion({ items, colorTheme = "blue" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeColorClass = colorTheme === "red" ? "text-[#f22020]" : "text-[#0098b2]";
  const hoverBorderClass = colorTheme === "red" ? "hover:border-[#f22020]" : "hover:border-[#0098b2]";
  const borderLeftClass = colorTheme === "red" ? "border-l-4 border-l-[#f22020]" : "border-l-4 border-l-[#0098b2]";

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`bg-slate-800 rounded-xl border border-slate-700 transition duration-300 overflow-hidden ${hoverBorderClass} ${isOpen ? borderLeftClass : ""}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-semibold focus:outline-none"
            >
              <span className={`text-lg md:text-xl transition-colors duration-300 ${isOpen ? activeColorClass : "text-white"}`}>
                {item.question}
              </span>
              <div>
                {isOpen ? (
                  <ChevronUp className={`w-6 h-6 ${activeColorClass}`} />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] border-t border-slate-700/50" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="px-6 py-5 text-gray-300 leading-relaxed text-base">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

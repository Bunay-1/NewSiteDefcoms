"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Начало", href: "/" },
    { name: "Продукти", href: "/products" },
    { name: "Услуги", href: "/services" },
    { name: "Технологии", href: "/technologies" },
    { name: "Екип", href: "/team" },
    { name: "Съответствие", href: "/compliance" },
    { name: "Демо", href: "/demo" },
    { name: "Контакти", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-10 h-10" viewBox="0 0 260 300" fill="none">
              <path className="fill-[#005f7f]" d="M260,75.8v148.4l-64.63,37.1-64.63,37.1v-73.71l32.53-18.67,32.53-18.67v-74.69l64.2-36.85h0ZM1.48,75.8l64.2,36.85h0s32.53-18.67,32.53-18.67l32.53-18.67V1.6l-64.63,37.1L1.48,75.8Z"/>
              <polygon className="fill-[#0098b2]" points="130.74 298.4 66.11 261.3 1.48 224.2 1.48 150 1.48 75.8 65.68 112.65 65.68 150 65.68 187.35 98.21 206.02 130.74 224.69 130.74 298.4"/>
              <polygon className="fill-[#f22020]" points="130.74 75.31 130.74 150 260 75.8 194.94 38.45 130.74 75.31"/>
            </svg>
            <span className="text-2xl font-bold text-white">DefComs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact">
              <button className="bg-[#f22020] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium">
                Свържете се
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact">
              <button className="w-full mt-2 bg-[#f22020] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium">
                Свържете се
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

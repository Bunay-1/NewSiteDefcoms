"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Shield, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Името е задължително.";

    if (!formData.email.trim()) {
      tempErrors.email = "Имейлът е задължителен.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Невалиден формат на имейл.";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Телефонът е задължителен.";
    }

    if (!formData.subject) {
      tempErrors.subject = "Моля, изберете тема.";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Съобщението е задължително.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/public/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setIsSubmitted(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
        } else {
          const data = await res.json();
          setErrors(prev => ({ ...prev, submit: data.error || "Грешка при изпращане." }));
        }
      } catch (err) {
        setErrors(prev => ({ ...prev, submit: "Възникна мрежова грешка." }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Свържете се с нас
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Готови сте да подобрите киберсигурността на вашия бизнес? Свържете се с нас за консултация.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Данни за контакт</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0098b2] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Адрес</h3>
                    <p className="text-gray-400">София, България</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f22020] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:info@defcoms.eu" className="text-[#0098b2] hover:text-white transition">
                      info@defcoms.eu
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0098b2] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Телефон</h3>
                    <a href="tel:+359886088668" className="text-[#0098b2] hover:text-white transition">
                      +359 886 088 668
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f22020] p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Работно време</h3>
                    <p className="text-gray-400">Пон - Пет: 09:00 - 18:00</p>
                    <p className="text-gray-400">24/7 за инциденти</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Изпратете съобщение</h2>
            
            {isSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-xl text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Благодарим ви!</h3>
                <p className="text-gray-300 max-w-sm">
                  Вашето съобщение беше изпратено успешно. Наш експерт ще се свърже с вас в най-кратък срок.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-[#0098b2] hover:underline font-semibold"
                >
                  Изпратете друго съобщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Име</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-slate-700 border ${errors.name ? "border-red-500" : "border-slate-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0098b2] transition`}
                      placeholder="Вашето име"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-700 border ${errors.email ? "border-red-500" : "border-slate-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0098b2] transition`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-slate-700 border ${errors.phone ? "border-red-500" : "border-slate-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0098b2] transition`}
                      placeholder="+359 888 888 888"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Тема</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-slate-700 border ${errors.subject ? "border-red-500" : "border-slate-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0098b2] transition`}
                    >
                      <option value="">Изберете тема</option>
                      <option value="consultation">Консултация</option>
                      <option value="demo">Демо</option>
                      <option value="support">Поддръжка</option>
                      <option value="partnership">Партньорство</option>
                      <option value="other">Друго</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Съобщение</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-slate-700 border ${errors.message ? "border-red-500" : "border-slate-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0098b2] transition resize-none`}
                      placeholder="Вашето съобщение..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {errors.submit && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm font-semibold">
                      {errors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f22020] hover:bg-red-700 disabled:bg-red-700/50 text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Изпращане..." : "Изпрати съобщение"}
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-gradient-to-r from-[#f22020] to-red-700 p-8 rounded-xl text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white">Спешен случай?</h2>
          </div>
          <p className="text-white/80 mb-4">
            За спешни инциденти, свържете се с нас директно по телефона
          </p>
          <a href="tel:+359886088668" className="text-white text-2xl font-bold hover:underline">
            +359 886 088 668
          </a>
        </div>
      </div>
    </main>
  );
}

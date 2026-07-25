"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, PhoneCall, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Здравейте! Аз съм DefComs AI Sentinel – вашият виртуален съветник по киберсигурност и европейски регулации (NIS2, DORA, GDPR). Как мога да Ви помогна днес?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "Засяга ли ме NIS2?", label: "NIS2 Обхват" },
    { text: "Колко струва защитата?", label: "Ценообразуване" },
    { text: "Защитени ли са данните ми (GDPR)?", label: "GDPR съответствие" },
    { text: "Какво предлага DefComs?", label: "За нас & Услуги" }
  ];

  const keywordAnswers: { keywords: string[]; answer: string }[] = [
    {
      keywords: ["фактур", "плащ", "дължим", "неплатен", "invoice", "инвойс", "пари"],
      answer: "В раздела 'Фактури & Плащания' (/portal/invoices) можете да проследите всички Ваши финансови документи (платени, неплатени и просрочени фактури). Вградили сме защитен PCI-DSS симулатор на плащания, с който можете да извършите плащане с банкова карта и да маркирате фактурата като платена в реално време!"
    },
    {
      keywords: ["план", "услуг", "абонамент", "моите услуги", "активни", "plan"],
      answer: "В секцията 'Моите услуги' (/portal/services) имате пълен преглед на Вашите активни планове и абонаменти за сигурност (напр. 24/7 SOC, Пентест, GDPR). Чрез бутона 'Нова услуга / План' горе вдясно можете бързо да заявите нов софтуерен лиценз или промяна на план, което автоматично ще генерира приоритетен поддържащ тикет."
    },
    {
      keywords: ["анализ", "оценк", "здравен статус", "здраве", "health", "score", "риск", "препорък"],
      answer: "В раздела 'Ниво на защита' (/portal/health) ще намерите Вашия интелигентен Cybersecurity Health Score. Препоръките за сигурност са разпределени по категории (Достъп, Мрежа, Съответствие, Обучение). Можете директно да отбелязвате кои контроли са внедрени, за да преизчислите Вашата сигурност в реално време!"
    },
    {
      keywords: ["табло", "табла", "дашборд", "dashboard", "информац", "преглед"],
      answer: "Вашето 'Изпълнително табло' (/portal/dashboard) предлага 360-градусов контрол над сигурността. От него следите Вашия здравен статус в реално време, активните критични заплахи от Threat Feed, броя защитени одитни доклади в сейфа и статистиката за Вашите тикети."
    },
    {
      keywords: ["тикет", "тикети", "поддръжк", "чат", "проблем", "съобщени", "ticket"],
      answer: "При технически въпрос или нужда от съдействие от нашите сертифицирани SOC анализатори, можете да създадете нов поддържащ тикет от страницата /portal/tickets/new. Всеки тикет съдържа интегриран чат в реално време за бърза връзка с експерт."
    },
    {
      keywords: ["документ", "документи", "сейф", "vault", "доклад", "одит", "файл", "pdf"],
      answer: "В 'Сейфа за документи' (/portal/documents) съхраняваме Вашите официални одитни доклади, пентестинг резултати и ISO сертификати. Всички файлове в сейфа са криптирани с AES-256 стандарт и се изтеглят защитено само след активна оторизация на Вашата сесия."
    },
    {
      keywords: ["nis2", "нис2", "нис 2", "директива"],
      answer: "Директивата NIS2 засяга средни и големи предприятия (над 50 служители или над 10 млн. € оборот) в критични сектори (енергетика, транспорт, банково дело, здравеопазване, цифрова инфраструктура и др.). Тя изисква денонощен мониторинг, план за реакция при инциденти и бързо докладване. Нашата SOC Платформа покрива напълно изискванията на NIS2!"
    },
    {
      keywords: ["dora", "дора", "финанс"],
      answer: "Регламентът DORA (Digital Operational Resilience Act) се отнася до всички финансови субекти в ЕС (банки, застрахователи, инвестиционни посредници, финтех фирми) и техните ИТ партньори. Изисква строг контрол на рисковете, тестване за проникване (Pentesting) и мониторинг на доставчиците. DefComs предлага цялостни услуги за DORA съответствие."
    },
    {
      keywords: ["цена", "цени", "колко струва", "абонамент", "евро"],
      answer: "Всички наши лицензи и услуги са прецизирани в Евро (€). Базовият ни пакет за Endpoint защита започва от 280 €/месец, а цялостното ни SIEM решение и денонощен SOC мониторинг започват от 1680 €/месец. Можете да сглобите точния си пакет в нашия интерактивен Конфигуратор на адрес: /tools/bundle !"
    },
    {
      keywords: ["ransomware", "рансъмуер", "криптиране", "вирус"],
      answer: "За защита от Ransomware ви трябват три неща: 1) Надеждни и тествани офлайн архиви (Backup); 2) Endpoint Detection & Response (EDR) защита на всички компютри; 3) Фишинг обучения на персонала, за да не отварят опасни файлове. Можете да тествате бдителността на екипа си с нашето Фишинг обучение: /tools/phishing-trainer !"
    },
    {
      keywords: ["сок", "soc", "мониторинг", "24/7"],
      answer: "Нашият денонощен Security Operations Center (24/7 SOC) извършва непрекъснат анализ на мрежовия трафик и логовете за сигурност. При засичане на аномалия, AI алгоритмите реагират незабавно, а нашите сертифицирани анализатори изолират заплахата за броени минути. Можете да видите симулация на живо на страницата ни /demo !"
    },
    {
      keywords: ["пентест", "pentest", "тест", "проникване"],
      answer: "Професионалният пентест (Penetration Testing) е симулирана атака, която разкрива слабостите във вашите уеб сайтове, приложения и вътрешна мрежа преди истинските хакери да ги открият. Изключително препоръчително за NIS2 и задължително за DORA. Свържете се с нас от страницата ни /contact за оферта."
    },
    {
      keywords: ["gdpr", "гдпр", "лични данни", "съответствие"],
      answer: "DefComs помага на организациите да отговорят на строгите изисквания на Регламента за защита на личните данни (GDPR). Ние предлагаме инкриптиране на бази данни, предотвратяване на течове на данни (DLP), одити на сигурността и обучение на персонала. Нашата мисия е да сведем риска от глоби до нула!"
    },
    {
      keywords: ["фишинг", "обучение", "обучения", "phishing", "треньор"],
      answer: "Над 90% от успешните кибератаки започват с фишинг имейл. С нашия иновативен Фишинг Треньор (/tools/phishing-trainer) можете да стартирате симулирани атаки и да обучите персонала си да разпознава измамни съобщения бързо и сигурно."
    },
    {
      keywords: ["сканиране", "уязвимост", "сканер", "scanner", "vuln"],
      answer: "Сканирането за уязвимости е автоматизиран процес, който периодично проверява ИТ инфраструктурата ви за известни софтуерни слабости, грешни конфигурации и остарели пакети. Предлагаме го като част от нашия пакет за сигурност в Конфигуратора: /tools/bundle !"
    },
    {
      keywords: ["екип", "кои сте", "експерти", "специалисти", "defcoms"],
      answer: "DefComs е водеща европейска компания по киберсигурност, съставена от сертифицирани специалисти (CISSP, CEH, OSCP). Нашата цел е да осигурим достъпна и безкомпромисна киберзащита от ново поколение за малки, средни и големи предприятия. Научете повече за нашия екип на: /team !"
    },
    {
      keywords: ["контакт", "връзка", "телефон", "одит", "консултация", "безплатен"],
      answer: "Можете да се свържете с нас за безплатен първоначален одит и консултация директно чрез нашата уеб страница '/contact' или като попълните конфигурацията в Конфигуратора на адрес: /tools/bundle. Наш експерт ще се свърже с вас до броени часове!"
    }
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const normalizedInput = textToSend.toLowerCase();
      let foundAnswer = "";

      for (const item of keywordAnswers) {
        if (item.keywords.some(keyword => normalizedInput.includes(keyword))) {
          foundAnswer = item.answer;
          break;
        }
      }

      if (!foundAnswer) {
        foundAnswer = "Благодаря за въпроса! Като интелигентен асистент на DefComs, силно Ви препоръчвам да се свържете с нашите реални експерти за безплатна професионална консултация на страницата ни '/contact' или да разгледате интерактивния ни ROI Калкулатор на адрес: /tools/roi, за да оцените финансовите си рискове.";
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: foundAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Closed State Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#0098b2] to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 flex items-center justify-center relative group focus:outline-none"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-900 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
          <Bot className="w-6 h-6" />
          <span className="absolute right-14 bg-slate-900 text-white text-xs py-1 px-3 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:inline">
            Имате ли въпроси? Пишете ми!
          </span>
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0098b2] to-[#005f7f] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">DefComs AI Sentinel</h4>
                <span className="text-[10px] text-teal-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  На линия за съдействие
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="p-1.5 rounded-lg bg-slate-800 text-[#0098b2] h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className="max-w-[75%] space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#0098b2] text-white rounded-tr-none"
                      : "bg-slate-800 text-gray-200 rounded-tl-none border border-slate-700/50"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 block text-right px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="p-1.5 rounded-lg bg-slate-800 text-[#0098b2] h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800 text-gray-400 border border-slate-700/50 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0098b2]" />
                  <span className="text-[10px]">Анализиране на въпроса...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Container */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-slate-950/20 border-t border-slate-800 space-y-1.5">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Бързи въпроси:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="text-[10px] bg-slate-800 hover:bg-slate-750 text-gray-300 border border-slate-700 hover:border-[#0098b2] rounded-lg px-2.5 py-1.5 font-medium transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer (Link to contact) */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
            <span className="text-[10px] text-gray-500">Имате нужда от детайлен одит?</span>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="text-[10px] text-[#0098b2] hover:text-cyan-400 font-bold flex items-center gap-1">
                <PhoneCall className="w-3 h-3" />
                Свържете се с експерт
              </button>
            </Link>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Напишете въпрос..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputText);
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0098b2]"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className="bg-[#0098b2] hover:bg-cyan-600 text-white p-2 rounded-xl transition flex items-center justify-center flex-shrink-0 focus:outline-none"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
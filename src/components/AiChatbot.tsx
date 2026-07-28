"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, PhoneCall, ChevronDown, Award, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  isAuditOptions?: boolean;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalMode, setIsPortalMode] = useState(false);

  // Interactive audit state
  const [auditStep, setAuditStep] = useState<number>(0); // 0 = not started, 1, 2, 3 = steps, 4 = finished
  const [auditAnswers, setAuditAnswers] = useState<{ [key: string]: boolean }>({});

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we are inside the client portal
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const insidePortal = path.startsWith("/portal");
      setIsPortalMode(insidePortal);

      // Initialize welcome message based on mode
      const welcomeText = insidePortal
        ? "Добре дошли в Клиентския Портал на DefComs! Аз съм вашият AI Sentinel. Тук съм, за да Ви улесня – мога да Ви помогна с навигацията на Вашите фактури, симулация на SIEM логове, проследяване на поддържащи тикети, управление на ИТ активи или сигурни документи. Какво искате да разгледаме?"
        : "Здравейте! Аз съм DefComs AI Sentinel – вашият виртуален съветник по киберсигурност и европейски регулации (NIS2, DORA, GDPR). Как мога да Ви помогна днес? Можете също така да стартирате интерактивен бърз одит на Вашата сигурност.";

      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: welcomeText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen]);

  const quickPrompts = isPortalMode
    ? [
        { text: "Къде са фактурите ми?", label: "Фактури" },
        { text: "Как да направя SIEM тест?", label: "SIEM Тест" },
        { text: "Какво е Cybersecurity Health?", label: "Ниво на защита" },
        { text: "Как да добавя ИТ активи?", label: "ИТ Активи" }
      ]
    : [
        { text: "Започни ИТ Одит за Сигурност", label: "🛡️ Бърз Одит" },
        { text: "Засяга ли ме NIS2?", label: "NIS2 Обхват" },
        { text: "Колко струва защитата?", label: "Цени" },
        { text: "Защитени ли са данните ми?", label: "GDPR" }
      ];

  // Нови състояния за динамично заредени данни от базата за вписания потребител
  const [realStats, setRealStats] = useState<{
    assetsCount: number;
    unpaidInvoicesCount: number;
    openTicketsCount: number;
    servicesCount: number;
    healthScore: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && isPortalMode) {
      // Извличаме реални данни от базата данни за вписания потребител
      Promise.all([
        fetch("/api/portal/assets").then(res => res.ok ? res.json() : []),
        fetch("/api/portal/invoices").then(res => res.ok ? res.json() : []),
        fetch("/api/portal/tickets").then(res => res.ok ? res.json() : []),
        fetch("/api/portal/services").then(res => res.ok ? res.json() : []),
        fetch("/api/portal/recommendations").then(res => res.ok ? res.json() : []),
      ]).then(([assets, invoices, tickets, services, recs]) => {
        const assetsCount = assets.length;
        const unpaidInvoicesCount = invoices.filter((inv: any) => inv.status === "unpaid").length;
        const openTicketsCount = tickets.filter((t: any) => t.status === "open" || t.status === "in_progress").length;
        const servicesCount = services.filter((s: any) => s.status === "active").length;

        const completedImpact = recs.filter((r: any) => r.status === "completed").reduce((acc: number, r: any) => acc + r.impact, 0);
        const totalImpact = recs.reduce((acc: number, r: any) => acc + r.impact, 0);
        const healthScore = totalImpact > 0 ? Math.round((completedImpact / totalImpact) * 100) : 100;

        setRealStats({
          assetsCount,
          unpaidInvoicesCount,
          openTicketsCount,
          servicesCount,
          healthScore
        });
      }).catch(err => console.error("Грешка при зареждане на AI статистика:", err));
    }
  }, [isOpen, isPortalMode]);

  const keywordAnswers: { keywords: string[]; answer: string }[] = [
    {
      keywords: ["фактур", "плащ", "дължим", "неплатен", "invoice", "инвойс", "пари"],
      get answer() {
        if (isPortalMode && realStats) {
          return `📊 **Вашата финансова справка в реално време:**\n\nИмате **${realStats.unpaidInvoicesCount} неплатени фактури** в профила си.\n\nВ раздела **[Фактури & Плащания](/portal/invoices)** можете да ги проследите детайлно и да извършите незабавно сигурно плащане с банкова карта.`;
        }
        return "В раздела 'Фактури & Плащания' (/portal/invoices) можете да проследите всички Ваши финансови документи (платени, неплатени и просрочени фактури). Вградили сме защитен PCI-DSS симулатор на плащания, с който можете да извършите плащане с банкова карта и да маркирате фактурата как платена в реално време!";
      }
    },
    {
      keywords: ["активи", "актив", "assets", "cmdb", "инвентар", "компютри", "сървъри"],
      get answer() {
        if (isPortalMode && realStats) {
          return `🖥️ **Вашият ИТ Инвентар (CMDB):**\n\nВ базата ни данни имате заведени **${realStats.assetsCount} активни ИТ активи** (сървъри, домейни, работни станции).\n\nМожете да ги управлявате и да стартирате незабавни Vulnerability сканирания на адрес **[Моите ИТ Активи](/portal/assets)**!`;
        }
        return "В новия раздел 'ИТ Активи' (/portal/assets) можете да поддържате подробен CMDB инвентар на Вашия софтуер, домейни, сървъри и работни станции. Всеки актив може да бъде сканиран ръчно с натискане на бутона 'Стартирай скан', за да се генерира подробен статус.";
      }
    },
    {
      keywords: ["план", "услуг", "абонамент", "моите услуги", "активни", "plan"],
      get answer() {
        if (isPortalMode && realStats) {
          return `🛡️ **Вашите Активни Услуги:**\n\nВ момента имате **${realStats.servicesCount} активни планове за сигурност**, осигуряващи защита за Вашата компания.\n\nПълният списък с баджове за съответствие (NIS2/DORA) и история на абонаментите можете да разгледате в **[Моите услуги](/portal/services)**.`;
        }
        return "В секцията 'Моите услуги' (/portal/services) имате пълен преглед на Вашите активни планове и абонаменти за сигурност (напр. 24/7 SOC, Пентест, GDPR). Чрез бутона 'Нова услуга / План' горе вдясно можете бързо да заявите нов софтуерен лиценз или промяна на план, което автоматично ще генерира приоритетен поддържащ тикет.";
      }
    },
    {
      keywords: ["анализ", "оценк", "здравен статус", "здраве", "health", "score", "риск", "препорък"],
      get answer() {
        if (isPortalMode && realStats) {
          return `📈 **Здравен рейтинг за сигурност (Cybersecurity Health):**\n\nВашият текущ здравен резултат е **${realStats.healthScore}%**.\n\nЗа да увеличите сигурността си до 100%, разгледайте препоръките по категории (Достъп, Мрежа, Съответствие) на адрес **[Ниво на защита](/portal/health)**!`;
        }
        return "В раздела 'Ниво на защита' (/portal/health) ще намерите Вашия интелигентен Cybersecurity Health Score. Препоръките за сигурност са разпределени по категории (Достъп, Мрежа, Съответствие, Обучение). Можете директно да отбелязвате кои контроли са внедрени, за да преизчислите Вашата сигурност в реално време!";
      }
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
      answer: "В 'Сейфа за документи' (/portal/documents) съхраняваме Вашите официални одитни доклади, пентестинг резултати и ISO сертификати. Всички файлове в сейфа are криптирани с AES-256 стандарт и се изтеглят защитено само след активна оторизация на Вашата сесия."
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
      keywords: ["фишинг", "обучение", "обучения", "phishing", "треньор", "тренинг"],
      answer: "Над 90% от успешните кибератаки започват с фишинг имейл. С нашия иновативен Фишинг Треньор (/tools/phishing-trainer) можете да стартирате симулирани атаки и да обучите персонала си да разпознава измамни съобщения бързо и сигурно. В клиентския портал имаме страница за Обучение (/portal/training), където се записват всички резултати и баджове."
    },
    {
      keywords: ["сканиране", "уязвимост", "сканер", "scanner", "vuln"],
      answer: "Сканирането за уязвимости е автоматизиран процес, който периодично проверява ИТ инфраструктурата ви за известни софтуерни слабости, грешни конфигурации и остарели пакети. В продуктовата страница за Vulnerability Scanner имаме анимиран симулатор на живо, от който можете да изтеглите тестов одит!"
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

  // Handle interactive audit workflow
  const startAuditFlow = () => {
    setAuditStep(1);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        id: `audit-intro-${Date.now()}`,
        sender: "bot",
        text: "🛡️ **Стартираме интерактивен бърз одит на Вашата ИТ Сигурност.**\n\nМоля, отговорете честно на следните 3 въпроса, за да изчислим Вашето ниво на риск.\n\n**Въпрос 1:** Разполагате ли с денонощен (24/7) SOC мониторинг и анализ на мрежовите логове?",
        time,
        isAuditOptions: true
      }
    ]);
  };

  const handleAuditAnswer = (answer: boolean) => {
    const currentStep = auditStep;
    const updatedAnswers = { ...auditAnswers, [`step${currentStep}`]: answer };
    setAuditAnswers(updatedAnswers);

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        id: `user-ans-${currentStep}-${Date.now()}`,
        sender: "user",
        text: answer ? "Да" : "Не",
        time: userTime
      }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      const nextStep = currentStep + 1;
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (nextStep === 2) {
        setAuditStep(2);
        setMessages(prev => [
          ...prev,
          {
            id: `audit-step-2-${Date.now()}`,
            sender: "bot",
            text: "**Въпрос 2:** Провеждате ли системни обучения срещу Фишинг измами и симулации на атаки за Вашите служители поне веднъж на 6 месеца?",
            time: botTime,
            isAuditOptions: true
          }
        ]);
      } else if (nextStep === 3) {
        setAuditStep(3);
        setMessages(prev => [
          ...prev,
          {
            id: `audit-step-3-${Date.now()}`,
            sender: "bot",
            text: "**Въпрос 3:** Вашата организация попада ли под регулаторни изисквания по европейските закони за сигурност и лични данни (NIS2 директива, DORA регламент или GDPR)?",
            time: botTime,
            isAuditOptions: true
          }
        ]);
      } else {
        // Evaluate Results
        setAuditStep(4);
        const hasSoc = updatedAnswers.step1;
        const hasTraining = updatedAnswers.step2;
        const isRegulated = updatedAnswers.step3;

        let riskLevel = "Критичен Риск 🚨";
        let score = "15/100";
        let recommendationText = "";

        if (hasSoc && hasTraining) {
          riskLevel = "Много Нисък Риск 🛡️";
          score = "90/100";
          recommendationText = "Поздравления! Вие имате отлична защита и следвате най-добрите световни практики. Препоръчваме да сертифицирате процесите си по ISO 27001.";
        } else if (hasSoc || hasTraining) {
          riskLevel = "Среден Риск ⚠️";
          score = "55/100";
          recommendationText = "Покрили сте ключови стъпки, но имате сериозни пропуски. Ако имате SOC, но нямате фишинг обучения, Вашите служители са лесна мишена. Ако имате обучения, но нямате 24/7 SOC, не можете да засечете пробив в мрежата.";
        } else {
          riskLevel = "Критичен Риск 🚨";
          score = "20/100";
          recommendationText = "Вашата инфраструктура е напълно изложена на Ransomware и кражба на данни. При атака времето за реакция ще е прекалено дълго. Силно препоръчваме спешна консултация!";
        }

        if (isRegulated) {
          recommendationText += "\n\n⚠️ **Важно:** Понеже сте обект на NIS2 / DORA съответствие, липсата на контроли може да доведе до милионни глоби и административни санкции за ръководството.";
        }

        setMessages(prev => [
          ...prev,
          {
            id: `audit-result-${Date.now()}`,
            sender: "bot",
            text: `📊 **РЕЗУЛТАТИ ОТ КИБЕР ОДИТА:**\n\n• **Прогнозен Здравен Индекс:** ${score}\n• **Оценка на Заплахата:** ${riskLevel}\n\n**Препоръка:** ${recommendationText}\n\nМожете да оцените точните финансови загуби при евентуален пробив с нашия **[ROI Калкулатор](/tools/roi)** или да проверите точния обхват на NIS2 с **[Compliance Wizard](/tools/compliance-wizard)**.`,
            time: botTime
          }
        ]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Check if user requested to start audit
    if (textToSend.toLowerCase().includes("одит") && auditStep === 0) {
      const userMsg: Message = {
        id: Math.random().toString(),
        sender: "user",
        text: textToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);
      setTimeout(() => {
        startAuditFlow();
        setIsTyping(false);
      }, 800);
      return;
    }

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Reset audit step if they type anything else during flow
    if (auditStep > 0 && auditStep < 4) {
      setAuditStep(0);
    }

    // Simulate AI response delay
    setTimeout(() => {
      const normalizedInput = textToSend.toLowerCase();
      let foundAnswer = "";

      // Добавяне на допълнителни реални AI отговори по ключови думи от базата данни
      if (isPortalMode && realStats) {
        if (normalizedInput.includes("колко") && (normalizedInput.includes("актив") || normalizedInput.includes("cmdb"))) {
          foundAnswer = `🖥️ В момента имате заведени точно **${realStats.assetsCount} активни ИТ активи** под Вашата организация. Можете да добавяте нови или да стартирате сканиране от **[Моите ИТ Активи](/portal/assets)**.`;
        } else if (normalizedInput.includes("плани") || normalizedInput.includes("абонамент") || normalizedInput.includes("услуг")) {
          foundAnswer = `🛡️ Имате **${realStats.servicesCount} активни услуги** (като 24/7 SOC, GDPR или DORA защита). Пълният статус можете да проследите в **[Моите услуги](/portal/services)**.`;
        } else if (normalizedInput.includes("тикет") || normalizedInput.includes("проблем") || normalizedInput.includes("поддръжк")) {
          foundAnswer = `✉️ Имате **${realStats.openTicketsCount} отворени/активни поддържащи тикета** за комуникация с нашия SOC отдел. Можете да отворите нов тикет или да чатите с анализатор на страницата **[Поддържащи тикети](/portal/tickets)**.`;
        } else if (normalizedInput.includes("здрав") || normalizedInput.includes("рейтинг") || normalizedInput.includes("score")) {
          foundAnswer = `📈 Вашият текущ здравен рейтинг за киберсигурност е **${realStats.healthScore}%**. Препоръчваме да завършитеPending задачите за сигурност в раздела **[Ниво на защита](/portal/health)**.`;
        }
      }

      // Check for CVE pattern
      const cveMatch = normalizedInput.match(/cve-\d{4}-\d{4,7}/);
      if (cveMatch) {
        const cveId = cveMatch[0].toUpperCase();
        if (cveId === "CVE-2024-3094") {
          foundAnswer = `🚨 **Анализ на CVE-2024-3094 (XZ Utils Backdoor):**\n\n• **Критичност:** 10.0 (Критична)\n• **Описание:** Изключително опасна скрита задна вратичка в компилационната система на XZ Utils (версии 5.6.0 и 5.6.1), позволяваща отдалечено изпълнение на произволен код (RCE) през SSH без оторизация.\n• **Защитни мерки:** Незабавно връщане на пакета до стабилна версия 5.4.x.\n\n🛡️ **Как ни защитава DefComs:**\n1. Нашият **Vulnerability Scanner** автоматично открива уязвимата XZ версия във Вашата инфраструктура.\n2. **SOC Платформата** следи за аномалии в SSH сесиите и необичайни дъщерни процеси на sshd.`;
        } else if (cveId === "CVE-2021-44228") {
          foundAnswer = `🚨 **Анализ на CVE-2021-44228 (Log4Shell):**\n\n• **Критичност:** 10.0 (Критична)\n• **Описание:** RCE уязвимост в популярната Java библиотека Log4j, позволяваща на неоторизирани атакуващие да изпълняват код през специално оформени JNDI низове.\n• **Защитни мерки:** Спешен ъпгрейд на Log4j до 2.17.1+.\n\n🛡️ **Как ни защитава DefComs:**\n1. Нашият **SIEM Solution** засича необичайни LDAP заявки.\n2. **Network Security** (IDS/IPS) филтрира злонамерени JNDI заявки в реално време на входа на мрежата.`;
        } else if (cveId === "CVE-2017-0144") {
          foundAnswer = `🚨 **Анализ на CVE-2017-0144 (EternalBlue):**\n\n• **Критичност:** 8.1 (Висока/Критична)\n• **Описание:** Слабост в имплементацията на остарелия SMBv1 протокол в Windows, използвана за разпространение на WannCry и NotPetya ransomware.\n• **Защитни мерки:** Деактивиране на SMBv1 поддръжката и инсталиране на Microsoft MS17-010.\n\n🛡️ **Как ни защитава DefComs:**\n1. **Endpoint Protection** автоматично блокира WannaCry и сродни ransomware заплахи на работните станции.\n2. Нашата **Network Security** засича опити за сканиране на порт 445 и блокира SMB експлойт опитите.`;
        } else if (cveId === "CVE-2023-34362") {
          foundAnswer = `🚨 **Анализ на CVE-2023-34362 (MOVEit Transfer RCE):**\n\n• **Критичност:** 9.8 (Критична)\n• **Описание:** SQL инжекция в MOVEit Transfer уеб приложението, позволяваща отдалечен неоторизиран достъп и кражба на файлове.\n• **Защитни мерки:** Инсталиране на най-новите пачове от Progress Software.\n\n🛡️ **Как ни защитава DefComs:**\n1. **Threat Intelligence** емисията ни веднага известява за нови IP-та, извършващи активно сканиране за MOVEit.\n2. Нашата **SOC Platform** извършва проактивен Threat Hunting за признаци на уеб шелове по Вашите уеб сървъри.`;
        } else {
          // Dynamic Smart CVE Generator
          const parts = cveId.split("-");
          const year = parts[1] || new Date().getFullYear().toString();
          const serial = parts[2] || "0001";
          const simulatedScore = (parseFloat(serial) % 3 === 0 ? 9.8 : parseFloat(serial) % 2 === 0 ? 8.5 : 7.5).toFixed(1);
          const severity = parseFloat(simulatedScore) >= 9.0 ? "Критична (Critical)" : parseFloat(simulatedScore) >= 7.0 ? "Висока (High)" : "Средна (Medium)";

          foundAnswer = `🔍 **Интелигентен анализ на ${cveId}:**\n\n• **Регистриран за година:** ${year}\n• **Прогнозен CVSS коефициент:** ${simulatedScore} (${severity})\n• **Тип уязвимост:** Динамично анализирана като RCE / Локално прескачане на защити.\n• **Препоръчителна мярка:** Извършете пачване на съответния софтуер до последна стабилна версия и блокирайте портовете на периметъра през firewall.\n\n🛡️ **Как ни защитава DefComs:**\nНие извършваме непрекъснато пасивно и активно сканиране през **[Vulnerability Scanner](/products/vulnerability-scanner)** и автоматично добавяме индикатори за компрометиране (IOCs) в нашия SOC фийд за предотвратяване на пробиви.`;
        }
      }

      if (!foundAnswer) {
        for (const item of keywordAnswers) {
          if (item.keywords.some(keyword => normalizedInput.includes(keyword))) {
            foundAnswer = item.answer;
            break;
          }
        }
      }

      if (!foundAnswer) {
        // Fallback for general CVE inquiry
        if (normalizedInput.includes("cve") || normalizedInput.includes("уязвимост")) {
          foundAnswer = "🔍 **Интерактивно търсене на CVE уязвимости:**\n\nМоля, напишете конкретен CVE идентификатор (напр. **CVE-2024-3094**, **CVE-2021-44228** или **CVE-2017-0144**), за да получите мигновено детайлен технически анализ, мерки за отстраняване и информация как DefComs защитава вашите системи в реално време!";
        } else {
          foundAnswer = "Благодаря за въпроса! Като интелигентен асистент на DefComs, силно Ви препоръчвам да се свържете с нашите реални експерти за безплатна професионална консултация на страницата ни '/contact' или да разгледате интерактивния ни ROI Калкулатор на адрес: /tools/roi, за да оцените финансовите си рискове.";
        }
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botMsgText(normalizedInput, foundAnswer),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const botMsgText = (userInput: string, rawText: string) => {
    // Допълнително интелигентно контекстуално надграждане на отговора за български език
    if (userInput.includes("здравей") || userInput.includes("привет") || userInput.includes("здрасти")) {
      return `Здравейте! Радвам се да Ви помогна. Аз съм Вашият денонощен AI Sentinel пазител. Кажете ми какво Ви интересува относно сигурността, ИТ активите или европейското регулаторно съответствие по NIS2/DORA.`;
    }
    return rawText;
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-80 sm:w-96 h-[540px] flex flex-col overflow-hidden animate-fadeIn text-gray-300">
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
                  На линия ({isPortalMode ? "Клиентски портал" : "Консултант"})
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
            {messages.map((msg, index) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="p-1.5 rounded-lg bg-slate-800 text-[#0098b2] h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className="max-w-[80%] space-y-1">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
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

                {/* Audit step options underneath the corresponding bot question */}
                {msg.sender === "bot" && msg.isAuditOptions && auditStep > 0 && auditStep < 4 && index === messages.length - 1 && (
                  <div className="flex gap-2.5 justify-start pl-10 animate-fadeIn">
                    <button
                      onClick={() => handleAuditAnswer(true)}
                      className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Да
                    </button>
                    <button
                      onClick={() => handleAuditAnswer(false)}
                      className="bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Не
                    </button>
                  </div>
                )}
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
          {auditStep === 0 && !isTyping && (
            <div className="px-4 py-2.5 bg-slate-950/20 border-t border-slate-800 space-y-1.5">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Бързи връзки:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (p.text.includes("Одит")) {
                        startAuditFlow();
                      } else {
                        handleSendMessage(p.text);
                      }
                    }}
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

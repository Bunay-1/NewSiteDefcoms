export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const articles: Article[] = [
  {
    slug: "nis2-compliance-bulgaria",
    title: "NIS2 Директивата: Какво трябва да знае всеки бизнес в България",
    excerpt: "Новата европейска директива NIS2 налага строги изисквания за киберсигурност. Разберете дали вашата компания попада в обхвата и какви са санкциите при неспазване.",
    category: "Регулации",
    author: "Елена Георгиева",
    date: "15 Юли 2024",
    readTime: "6 мин.",
    image: "/SocNoc/alert_enrichment.webp"
  },
  {
    slug: "how-to-spot-phishing-emails",
    title: "Как да разпознаем фишинг атака: Практическо ръководство",
    excerpt: "Фишинг имейлите стават все по-усъвършенствани благодарение на AI. Представяме ви ключовите признаци, по които да разпознаете измамата и да предпазите данните си.",
    category: "Обучение",
    author: "Николай Николов",
    date: "10 Юли 2024",
    readTime: "5 мин.",
    image: "/Persevs/perservs.webp"
  },
  {
    slug: "benefits-of-24-7-soc",
    title: "Предимствата на денонощния SOC (Security Operations Center)",
    excerpt: "Защо стандартното работно време не е достатъчно за киберзащита? Научете как денонощният мониторинг и AI триажът на аларми предотвратяват щети за милиони.",
    category: "SOC Платформи",
    author: "Димитър Димитров",
    date: "05 Юли 2024",
    readTime: "7 мин.",
    image: "/SocNoc/Dashboard.webp"
  },
  {
    slug: "dora-regulations-financial-sector",
    title: "DORA Регламентът: Дигитална оперативна устойчивост във финансовия сектор",
    excerpt: "Как новите изисквания на ЕС за цифрова устойчивост променят правилата за банки, застрахователи и техните ИТ доставчици. Подгответе се навреме за съответствие.",
    category: "Регулации",
    author: "Михаил Петров",
    date: "28 Юни 2024",
    readTime: "8 мин.",
    image: "/SocNoc/UNIFIED OPERATIONS CENTER.webp"
  },
  {
    slug: "gdpr-data-protection-in-soc",
    title: "Как съвременният SOC защитава личните данни в съответствие с GDPR",
    excerpt: "Научете как съхранението на логове, псевдонимизацията на IP адреси и криптирането гарантират пълно съответствие с Регламента при денонощен мониторинг.",
    category: "GDPR",
    author: "Елена Георгиева",
    date: "20 Юни 2024",
    readTime: "6 мин.",
    image: "/SocNoc/indicator.webp"
  },
  {
    slug: "vulnerability-scanning-proactive-defense",
    title: "Управление на уязвимостите: Проактивна защита срещу zero-day заплахи",
    excerpt: "Защо редовното автоматизирано сканиране за уязвимости (CVE) и DevSecOps интеграцията са критични за оцеляването на всяка съвременна мрежа и уеб приложение.",
    category: "Технологии",
    author: "Николай Николов",
    date: "12 Юни 2024",
    readTime: "5 мин.",
    image: "/Pen_test_platform/Modular_Security_Testing_Platform_Architecture.webp"
  },
  {
    slug: "edr-endpoint-protection-ransomware",
    title: "EDR системи: Как да защитим крайните точки от криптиращ малуер",
    excerpt: "Традиционните антивирусни програми вече не са достатъчни. Разберете как EDR и поведенческият анализ спират ransomware атаки преди критичното криптиране на данни.",
    category: "Продукти",
    author: "Димитър Димитров",
    date: "01 Юни 2024",
    readTime: "7 мин.",
    image: "/Persevs/04_Reports_Page_Persevs.webp"
  }
];

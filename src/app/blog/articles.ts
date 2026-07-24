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
  }
];

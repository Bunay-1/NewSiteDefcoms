# DefComs Website

Модерен уебсайт за киберсигурност, изграден с Next.js 14, TypeScript и TailwindCSS.

## Технологичен стек

- **Next.js 14** - React framework с App Router
- **TypeScript** - Type-safe разработка
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Икони
- **Recharts** - Диаграми и чартове
- **Framer Motion** - Анимации

## Инсталация

1. Инсталирайте зависимостите:
```bash
npm install
```

2. Стартирайте development сървъра:
```bash
npm run dev
```

3. Отворете [http://localhost:3000](http://localhost:3000) в браузъра си.

## Структура на проекта

```
src/
├── app/
│   ├── compliance/          # Страница за съответствие с EU директиви
│   ├── products/            # Продукти
│   │   ├── soc-platform/   # SOC Platform страница
│   │   └── siem/           # SIEM страница
│   ├── services/           # Услуги
│   ├── team/               # Екип
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Начална страница
│   ├── globals.css         # Global styles
│   ├── robots.txt          # SEO - Robots.txt
│   └── sitemap.ts          # SEO - Sitemap
└── components/
    ├── ComplianceBadge.tsx # Компонент за баджове
    └── SecurityChart.tsx   # Компонент за чартове
```

## Функционалности

- ✅ Модерен, responsive дизайн
- ✅ Пълно съответствие с EU директиви (GDPR, NIS2, CRA, DORA, EU AI Act, ePrivacy, ISO 27001, SOC 2)
- ✅ SEO оптимизация за AI ботове и агенти
- ✅ Интерактивни чартове и диаграми
- ✅ Продуктови страници с галерии
- ✅ FAQ секции за всеки продукт
- ✅ Страница за екипа
- ✅ Страница за услуги
- ✅ Мобилно навигация

## SEO Оптимизация

Сайтът е оптимизиран за AI обхождане с:
- Structured data (Schema.org)
- Sitemap.xml
- Robots.txt
- Open Graph мета тагове
- Semantic HTML
- Optimized metadata

## Build за production

```bash
npm run build
npm start
```

## Лиценз

© 2024 DefComs. Всички права запазени.

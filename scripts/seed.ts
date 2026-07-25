import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@defcoms.eu" },
    update: {},
    create: {
      email: "test@defcoms.eu",
      name: "Test User",
      password: hashedPassword,
      role: "client",
      company: "Test Company",
      phone: "+359888888888",
    },
  });

  console.log("Test user created:", user);

  // Изчистване на стари услуги, за да избегнем дублиране при всяко стартиране на seed
  await prisma.userService.deleteMany({
    where: { userId: user.id }
  });

  const now = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(now.getFullYear() + 1);

  const service1 = await prisma.userService.create({
    data: {
      name: "24/7 SOC Мониторинг & Лог Мениджмънт",
      description: "Денонощно наблюдение на периметъра, анализ на събития в реално време, детекция на аномалии и реагиране при инциденти.",
      status: "active",
      startDate: now,
      endDate: oneYearLater,
      compliance: "NIS2, ISO 27001, SOC 2",
      userId: user.id,
    }
  });

  const service2 = await prisma.userService.create({
    data: {
      name: "Пентестинг & Оценка на уязвимостите",
      description: "Редовно автоматизирано и ръчно сканиране на външната и вътрешната ИТ инфраструктура за слаби места и уязвимости.",
      status: "active",
      startDate: now,
      endDate: oneYearLater,
      compliance: "CRA, DORA, ISO 27001",
      userId: user.id,
    }
  });

  const service3 = await prisma.userService.create({
    data: {
      name: "Автоматизиран Одит за GDPR съответствие",
      description: "Непрекъснат мониторинг на защитата на личните данни, криптиране в движение и съхранение на системните логове.",
      status: "expired",
      startDate: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
      endDate: now,
      compliance: "GDPR, ePrivacy",
      userId: user.id,
    }
  });

  console.log("Test services created:", [service1, service2, service3]);

  // Изчистване на стари препоръки и документи
  await prisma.recommendation.deleteMany({ where: { userId: user.id } });
  await prisma.document.deleteMany({ where: { userId: user.id } });
  await prisma.threatAlert.deleteMany({}); // Глобален списък

  // Създаване на препоръки (за Cybersecurity Health Score)
  const rec1 = await prisma.recommendation.create({
    data: {
      title: "Активирайте Многофакторна Аутентификация (MFA)",
      description: "Изисквайте допълнително потвърждение през мобилно приложение при всеки опит за вход в административните конзоли и пощенските кутии.",
      impact: 20,
      status: "completed",
      category: "Достъп",
      userId: user.id,
    }
  });

  const rec2 = await prisma.recommendation.create({
    data: {
      title: "Провеждане на симулирана фишинг кампания",
      description: "Тествайте устойчивостта на служителите Ви чрез планирана симулация на фишинг атака от DefComs Phishing Trainer.",
      impact: 15,
      status: "pending",
      category: "Обучение",
      userId: user.id,
    }
  });

  const rec3 = await prisma.recommendation.create({
    data: {
      title: "Затваряне на неизползвани отворени портове на защитната стена",
      description: "Ограничете външния достъп до критични вътрешни сървъри през неоторизирани портове (напр. SSH 22, RDP 3389).",
      impact: 25,
      status: "pending",
      category: "Мрежа",
      userId: user.id,
    }
  });

  const rec4 = await prisma.recommendation.create({
    data: {
      title: "Криптиране на архивите с данни (Backups)",
      description: "Уверете се, че всички резервни копия се съхраняват в криптиран вид извън основната мрежа за защита срещу Ransomware.",
      impact: 15,
      status: "completed",
      category: "Съответствие",
      userId: user.id,
    }
  });

  const rec5 = await prisma.recommendation.create({
    data: {
      title: "Имплементиране на политики за силни пароли",
      description: "Въведете изискване за минимум 12 символа, съдържащи специални знаци и цифри, с периодична проверка за изтекли пароли.",
      impact: 10,
      status: "completed",
      category: "Достъп",
      userId: user.id,
    }
  });

  const rec6 = await prisma.recommendation.create({
    data: {
      title: "Одит на софтуерните уязвимости и пачове (Patch Management)",
      description: "Обновете операционните системи на всички сървъри до най-новите версии с цел предотвратяване на известни експлойти.",
      impact: 15,
      status: "pending",
      category: "Съответствие",
      userId: user.id,
    }
  });

  // Създаване на одитни доклади (Документи)
  const doc1 = await prisma.document.create({
    data: {
      title: "Доклад от одит за NIS2 съответствие - DefComs Q2 2024.pdf",
      fileSize: "3.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
      userId: user.id,
    }
  });

  const doc2 = await prisma.document.create({
    data: {
      title: "Доклад от външен Пентестинг (Penetration Test Report) - DefComs 2024.pdf",
      fileSize: "4.8 MB",
      fileType: "PDF",
      downloadUrl: "#",
      userId: user.id,
    }
  });

  const doc3 = await prisma.document.create({
    data: {
      title: "Сертификат за съответствие с ISO 27001:2022.pdf",
      fileSize: "1.1 MB",
      fileType: "PDF",
      downloadUrl: "#",
      userId: user.id,
    }
  });

  // Създаване на глобални заплахи (Threat Intelligence alerts)
  const alert1 = await prisma.threatAlert.create({
    data: {
      title: "Критична 0-day уязвимост в Microsoft Outlook (CVE-2024-30078)",
      description: "Открита е критична уязвимост в Microsoft Outlook, която позволява отдалечено изпълнение на произволен код (RCE) при отваряне на специално форматиран имейл. Засегнати са всички версии.",
      severity: "critical",
      mitigation: "Незабавно инсталирайте последния пакет за сигурност от Microsoft чрез Windows Update.",
      publishedAt: new Date(),
    }
  });

  const alert2 = await prisma.threatAlert.create({
    data: {
      title: "Активна таргетирана фишинг вълна срещу български финансови институции",
      description: "Наблюдава се масирана спам и фишинг кампания с фалшиви писма от името на водещи български банки, изискващи 'актуализация на данните за онлайн банкиране'. Писмата водят към копирани сайтове.",
      severity: "high",
      mitigation: "Предупредете всички служители да не въвеждат данни и да докладват съмнителни писма на СЦО (SOC) отдела.",
      publishedAt: new Date(Date.now() - 3600000 * 2), // преди 2 часа
    }
  });

  const alert3 = await prisma.threatAlert.create({
    data: {
      title: "DDoS атаки към уеб ресурси в публичния сектор на ЕС",
      description: "Групировки за кибер престъпления провеждат разпределени атаки за отказ на услуга (DDoS) към критична уеб инфраструктура на правителствени портали в страни от Източна Европа.",
      severity: "medium",
      mitigation: "Уверете се, че Cloudflare/WAF защитата е настроена на режим 'Under Attack' при завишен трафик.",
      publishedAt: new Date(Date.now() - 3600000 * 24), // вчера
    }
  });

  console.log("Recommendations, documents, and threat alerts successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

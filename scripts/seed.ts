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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

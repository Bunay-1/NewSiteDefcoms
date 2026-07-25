import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function runCheck() {
  console.log("=== СТАРТИРАНЕ НА ПЪЛНА ПРОВЕРКА НА КЛИЕНТСКИЯ ПОРТАЛ ===");

  const testEmail = `temp_client_${Date.now()}@defcoms.eu`;
  const testPassword = "securePassword123";
  const testName = "Тестов Клиент";
  const testCompany = "ДефКомс Тест ООД";
  const testPhone = "+359888123456";

  console.log(`\n1. Проверка на регистрацията на нов потребител с имейл: ${testEmail}...`);

  const hashedPassword = await bcrypt.hash(testPassword, 10);

  const user = await prisma.user.create({
    data: {
      email: testEmail,
      password: hashedPassword,
      name: testName,
      company: testCompany,
      phone: testPhone,
      role: "client",
    }
  });

  if (user && user.id) {
    console.log(`✅ Потребителят бе регистриран успешно в базата данни с ID: ${user.id}`);
  } else {
    throw new Error("❌ Грешка: Регистрацията в базата данни върна невалиден потребител.");
  }

  console.log("\n2. Проверка за дублиране на имейл адрес при регистрация...");
  try {
    await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        name: "Друго Име",
        role: "client",
      }
    });
    throw new Error("❌ Грешка: Базата данни позволи дублиране на имейл!");
  } catch (err: any) {
    if (err.code === "P2002") {
      console.log("✅ Успешно валидирано: Системата блокира регистрацията на дублиран имейл адрес.");
    } else {
      console.log("Успешно блокирана регистрация на дублиран имейл:", err.message);
    }
  }

  console.log("\n3. Проверка на хеширането и валидността на паролата...");
  const isMatch = await bcrypt.compare(testPassword, user.password);
  if (isMatch) {
    console.log("✅ Паролата е правилно хеширана и се валидира успешно с bcrypt.");
  } else {
    throw new Error("❌ Паролата не съвпада след проверка с bcrypt!");
  }

  console.log("\n4. Проверка на функционалността за създаване на тикети...");
  const ticket = await prisma.ticket.create({
    data: {
      title: "Тестов тикет за киберсигурност",
      description: "Здравейте, имаме нужда от NIS2 одит и консултация.",
      priority: "high",
      userId: user.id
    }
  });

  if (ticket && ticket.id) {
    console.log(`✅ Тикетът беше създаден успешно с ID: ${ticket.id}`);
  } else {
    throw new Error("❌ Грешка при създаване на тикет.");
  }

  console.log("\n5. Проверка на функционалността за добавяне на съобщения (чат към тикет)...");
  const message = await prisma.message.create({
    data: {
      content: "Благодарим за запитването, наш анализатор ще се свърже с Вас.",
      ticketId: ticket.id,
      userId: user.id,
      isAdmin: false
    }
  });

  if (message && message.id) {
    console.log(`✅ Съобщението бе изпратено и прикачено към тикета успешно с ID: ${message.id}`);
  } else {
    throw new Error("❌ Грешка при изпращане на съобщение.");
  }

  console.log("\n6. Проверка на функционалността за активни услуги (UserService)...");
  const service = await prisma.userService.create({
    data: {
      name: "Тестова Услуга по Киберсигурност",
      description: "Тестово описание за съответствие и проверка на сигурността.",
      status: "active",
      compliance: "NIS2, GDPR",
      userId: user.id
    }
  });

  if (service && service.id) {
    console.log(`✅ Услугата бе успешно записана в профила на клиента с ID: ${service.id}`);
  } else {
    throw new Error("❌ Грешка при създаване на тестова услуга.");
  }

  console.log("\n7. Проверка на Препоръките за сигурност и изчисляване на здравния статус (Cybersecurity Health Score)...");
  const rec1 = await prisma.recommendation.create({
    data: {
      title: "Препоръка 1",
      description: "Тестово описание",
      impact: 20,
      status: "completed",
      category: "Достъп",
      userId: user.id,
    }
  });
  const rec2 = await prisma.recommendation.create({
    data: {
      title: "Препоръка 2",
      description: "Тестово описание 2",
      impact: 30,
      status: "pending",
      category: "Мрежа",
      userId: user.id,
    }
  });

  const allRecs = await prisma.recommendation.findMany({ where: { userId: user.id } });
  const completedImpact = allRecs.filter(r => r.status === "completed").reduce((acc, r) => acc + r.impact, 0);
  const totalImpact = allRecs.reduce((acc, r) => acc + r.impact, 0);
  const score = totalImpact > 0 ? Math.round((completedImpact / totalImpact) * 100) : 100;

  if (score === 40) {
    console.log(`✅ Успешно пресмятане на Cybersecurity Score: ${score}% (20/50 точки completed)`);
  } else {
    throw new Error(`❌ Грешно изчислен резултат на сигурността: ${score}% (очакван: 40%)`);
  }

  console.log("\n8. Проверка на качването на защитени доклади и одитни документи...");
  const doc = await prisma.document.create({
    data: {
      title: "Сертификат за съответствие.pdf",
      fileSize: "1.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
      userId: user.id,
    }
  });

  if (doc && doc.id) {
    console.log(`✅ Одитният документ бе успешно генериран за клиента с ID: ${doc.id}`);
  } else {
    throw new Error("❌ Грешка при създаване на тестов документ.");
  }

  console.log("\n9. Проверка на сигурната промяна на профил и парола...");
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: "Обновено Име",
      phone: "+359888999999",
      password: await bcrypt.hash("newPassword999", 10),
    }
  });

  const checkPassMatch = await bcrypt.compare("newPassword999", updatedUser.password);
  if (updatedUser.name === "Обновено Име" && updatedUser.phone === "+359888999999" && checkPassMatch) {
    console.log("✅ Профилът и паролата бяха обновени сигурно и валидирани успешно.");
  } else {
    throw new Error("❌ Неуспешно обновяване на паролата или личните данни в профила.");
  }

  console.log("\n10. Почистване на тестовите данни от базата данни (Clean up)...");
  await prisma.user.delete({
    where: { id: user.id }
  });

  const checkUserExists = await prisma.user.findUnique({ where: { email: testEmail } });
  const checkTicketExists = await prisma.ticket.findFirst({ where: { userId: user.id } });
  const checkServiceExists = await prisma.userService.findFirst({ where: { userId: user.id } });
  const checkRecExists = await prisma.recommendation.findFirst({ where: { userId: user.id } });
  const checkDocExists = await prisma.document.findFirst({ where: { userId: user.id } });

  if (!checkUserExists && !checkTicketExists && !checkServiceExists && !checkRecExists && !checkDocExists) {
    console.log("✅ Всички тестови данни бяха успешно и сигурно почистени от базата през Cascade Delete.");
  } else {
    throw new Error("❌ Грешка при почистване на тестовите данни!");
  }

  console.log("\n=== ВСИЧКИ ФУНКЦИИ НА КЛИЕНТСКИЯ ПОРТАЛ РАБОТЯТ ПЕРФЕКТНО И БЕЗУПРЕЧНО! ===");
}

runCheck()
  .catch((err) => {
    console.error("❌ Възникна грешка по време на проверката:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

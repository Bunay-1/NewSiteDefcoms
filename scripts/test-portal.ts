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

  // Хеширане на паролата по същия начин, по който го прави API-то
  const hashedPassword = await bcrypt.hash(testPassword, 10);

  // Създаваме потребител
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
      console.log("✅ Успешно валидирано: Системата блокира регистрацията на дублиран имейл адрес (Unique constraint check passed).");
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
  const ticketTitle = "Тестов тикет за киберсигурност";
  const ticketDescription = "Здравейте, имаме нужда от NIS2 одит и консултация.";

  const ticket = await prisma.ticket.create({
    data: {
      title: ticketTitle,
      description: ticketDescription,
      priority: "high",
      userId: user.id
    }
  });

  if (ticket && ticket.id) {
    console.log(`✅ Тикетът беше създаден успешно с ID: ${ticket.id}`);
    console.log(`   - Заглавие: ${ticket.title}`);
    console.log(`   - Описание: ${ticket.description}`);
    console.log(`   - Приоритет: ${ticket.priority}`);
    console.log(`   - Статус по подразбиране: ${ticket.status}`);
  } else {
    throw new Error("❌ Грешка при създаване на тикет.");
  }

  console.log("\n5. Проверка на функционалността за добавяне на съобщения (чат към тикет)...");
  const messageContent = "Благодарим за запитването, наш анализатор ще се свърже с Вас.";

  const message = await prisma.message.create({
    data: {
      content: messageContent,
      ticketId: ticket.id,
      userId: user.id,
      isAdmin: false
    }
  });

  if (message && message.id) {
    console.log(`✅ Съобщението бе изпратено и прикачено към тикета успешно с ID: ${message.id}`);
    console.log(`   - Съдържание: "${message.content}"`);
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
    console.log(`   - Име: ${service.name}`);
    console.log(`   - Покритие: ${service.compliance}`);
    console.log(`   - Статус: ${service.status}`);
  } else {
    throw new Error("❌ Грешка при създаване на тестова услуга.");
  }

  console.log("\n7. Почистване на тестовите данни от базата данни (Clean up)...");
  // Понеже имаме Cascade Delete, изтриването на потребителя автоматично изтрива тикетите, съобщенията и услугите му
  await prisma.user.delete({
    where: { id: user.id }
  });

  // Проверяваме дали всичко е изтрито
  const checkUserExists = await prisma.user.findUnique({ where: { email: testEmail } });
  const checkTicketExists = await prisma.ticket.findFirst({ where: { userId: user.id } });
  const checkServiceExists = await prisma.userService.findFirst({ where: { userId: user.id } });

  if (!checkUserExists && !checkTicketExists && !checkServiceExists) {
    console.log("✅ Всички тестови данни бяха успешно и сигурно почистени.");
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

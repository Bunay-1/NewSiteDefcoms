import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Заявка за нова услуга или промяна на съществуващ план
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { serviceName, requestType, details } = body;

    if (!serviceName || !requestType) {
      return NextResponse.json(
        { error: "Името на услугата и типът на заявката са задължителни" },
        { status: 400 }
      );
    }

    const requestTypeLabel = requestType === "add" ? "Добавяне на нова услуга" : "Промяна на съществуващ план";

    // 1. Автоматично създаваме приоритетен тикет за поддръжка
    const ticketTitle = `[ЗАЯВКА ЗА УСЛУГА] - ${serviceName}`;
    const ticketDescription = `Автоматично генериран тикет за обработка на заявка за услуга.\n\n` +
      `Тип заявка: ${requestTypeLabel}\n` +
      `Услуга: ${serviceName}\n` +
      `Допълнителни изисквания: ${details || "Не са посочени"}`;

    const ticket = await prisma.ticket.create({
      data: {
        title: ticketTitle,
        description: ticketDescription,
        priority: "high",
        userId,
      },
    });

    // 2. Създаваме автоматично първо съобщение в чата от системата на DefComs
    await prisma.message.create({
      data: {
        content: `Здравейте! Благодарим Ви за изпратената заявка за "${serviceName}" (${requestTypeLabel}).\n\n` +
          `Наш сертифициран акаунт мениджър и архитект по сигурността беше уведомен моментално. ` +
          `Ще се свържем с Вас в рамките на 1 работен час в тази чат стая или по телефон, за да финализираме техническите и правни изисквания за активация.\n\n` +
          `Поздрави,\nЕкипът на DefComs.eu`,
        ticketId: ticket.id,
        userId,
        isAdmin: true, // Симулираме отговор от администратор за по-голяма бързина
      },
    });

    return NextResponse.json({
      message: "Заявката бе изпратена успешно",
      ticketId: ticket.id,
    }, { status: 201 });
  } catch (error) {
    console.error("Грешка при заявка на услуга:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

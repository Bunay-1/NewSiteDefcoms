import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmailNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

// POST - Добавяне на ново съобщение към тикет
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;
    const ticketId = params.id;
    const body = await req.json();

    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Съдържанието е задължително" },
        { status: 400 }
      );
    }

    // Проверка дали тикетът съществува и принадлежи на потребителя (ако не е админ)
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        ...(userRole !== "admin" && { userId }),
      },
      include: {
        user: true,
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Тикетът не е намерен" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        ticketId,
        userId,
        isAdmin: userRole === "admin",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Автоматично известие по имейл при нов отговор по тикета
    const isAdminResponse = userRole === "admin";
    const recipientEmail = isAdminResponse ? ticket.user.email : "info@defcoms.eu";
    const subject = isAdminResponse
      ? `Ново съобщение по Вашия тикет: "${ticket.title}"`
      : `Ново клиентско съобщение по тикет: "${ticket.title}"`;

    await sendEmailNotification(
      recipientEmail,
      subject,
      `Получено е ново съобщение от ${session.user.name || session.user.email}:\n\n"${content}"\n\nМожете да го прегледате в портала.`,
      {
        id: ticket.user.id,
        name: ticket.user.name,
        email: ticket.user.email,
        company: ticket.user.company,
      }
    );

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на съобщение:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

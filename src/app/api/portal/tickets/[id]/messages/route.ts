import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    // Проверка дали тикетът принадлежи на потребителя
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId, userId },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Тикетът не е намерен" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        ticketId,
        userId,
        isAdmin: false,
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

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на съобщение:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

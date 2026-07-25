import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на конкретен тикет
export async function GET(
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

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Тикетът не е намерен" }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Грешка при извличане на тикет:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Обновяване на тикет
export async function PATCH(
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

    const { status, priority } = body;

    // Проверка дали тикетът принадлежи на потребителя
    const existingTicket = await prisma.ticket.findFirst({
      where: { id: ticketId, userId },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: "Тикетът не е намерен" }, { status: 404 });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
      },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("Грешка при обновяване на тикет:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

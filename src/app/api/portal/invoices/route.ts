import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на фактури (филтрирани по потребител за клиенти, или всички за администратори)
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;

    if (u.role === "admin") {
      // Администраторите виждат всички фактури в системата, заедно с детайли за потребителя
      const invoices = await prisma.invoice.findMany({
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
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(invoices);
    } else {
      // Клиентите виждат само собствените си фактури
      const invoices = await prisma.invoice.findMany({
        where: { userId: u.id },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(invoices);
    }
  } catch (error) {
    console.error("Грешка при извличане на фактури:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на нова фактура за конкретен клиент (Само за Администратори)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;

    if (u.role !== "admin") {
      return NextResponse.json({ error: "Нямате администраторски права" }, { status: 403 });
    }

    const body = await req.json();
    const { invoiceNumber, amount, status, description, dueDate, targetUserId } = body;

    if (!invoiceNumber || !amount || !description || !dueDate || !targetUserId) {
      return NextResponse.json(
        { error: "Всички полета са задължителни" },
        { status: 400 }
      );
    }

    // Проверяваме дали целевият потребител съществува
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Избраният клиент не съществува" },
        { status: 404 }
      );
    }

    const { fileUrl } = body;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        amount: parseFloat(amount),
        status: status || "unpaid",
        description,
        fileUrl: fileUrl || null,
        dueDate: new Date(dueDate),
        userId: targetUserId,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Грешка при издаване на фактура:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

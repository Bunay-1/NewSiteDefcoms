import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на всички препоръки за сигурност за влезлия клиент
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const recommendations = await prisma.recommendation.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Грешка при извличане на препоръки:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на нова препоръка за клиент (Само за Администратори)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;

    if (u.role !== "admin" && u.role !== "operator") {
      return NextResponse.json({ error: "Нямате администраторски права" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, impact, category, userId } = body;

    if (!title || !description || !impact || !category || !userId) {
      return NextResponse.json(
        { error: "Всички полета (заглавие, описание, тежест/impact, категория, клиент) са задължителни" },
        { status: 400 }
      );
    }

    const recommendation = await prisma.recommendation.create({
      data: {
        title,
        description,
        impact: parseInt(impact),
        category,
        userId,
        status: "pending",
      },
    });

    return NextResponse.json(recommendation, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на препоръка от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Промяна на статуса на препоръка (pending/completed)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Идентификаторът и статусът са задължителни" },
        { status: 400 }
      );
    }

    // Уверяваме се, че препоръката принадлежи на потребителя
    const existingRec = await prisma.recommendation.findFirst({
      where: { id, userId },
    });

    if (!existingRec) {
      return NextResponse.json(
        { error: "Препоръката не е намерена" },
        { status: 404 }
      );
    }

    const updatedRec = await prisma.recommendation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedRec);
  } catch (error) {
    console.error("Грешка при обновяване на препоръка:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

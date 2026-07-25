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

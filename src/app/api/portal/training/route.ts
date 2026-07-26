import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на резултати от обучения
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;
    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    if (u.role === "admin") {
      // Админът може да види всички резултати или тези на конкретен потребител
      const results = await prisma.trainingResult.findMany({
        where: targetUserId ? { userId: targetUserId } : {},
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              company: true
            }
          }
        }
      });
      return NextResponse.json(results);
    } else {
      // Клиентът вижда само своите резултати
      const userId = u.id;
      const results = await prisma.trainingResult.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error("Грешка при извличане на резултати от обучения:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Записване на нов резултат от обучение
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;
    const body = await req.json();
    const { score, total, badge } = body;

    if (score === undefined || total === undefined || !badge) {
      return NextResponse.json(
        { error: "Резултат, общ брой точки и бадж са задължителни" },
        { status: 400 }
      );
    }

    const userId = u.id;

    const result = await prisma.trainingResult.create({
      data: {
        score: parseInt(score),
        total: parseInt(total),
        badge,
        userId,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Грешка при записване на резултат от обучение:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const threats = await prisma.threatAlert.findMany({
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json(threats);
  } catch (error) {
    console.error("Грешка при извличане на заплахи:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на глобално предупреждение за заплаха (Само за Администратори)
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
    const { title, description, severity, mitigation } = body;

    if (!title || !description || !severity || !mitigation) {
      return NextResponse.json(
        { error: "Всички полета (заглавие, описание, критичност, мерки) са задължителни" },
        { status: 400 }
      );
    }

    const threat = await prisma.threatAlert.create({
      data: {
        title,
        description,
        severity,
        mitigation,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json(threat, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на заплаха от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

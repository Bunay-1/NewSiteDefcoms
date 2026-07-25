import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на всички клиенти (Само за Администратори)
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;

    if (u.role !== "admin") {
      return NextResponse.json({ error: "Нямате администраторски права" }, { status: 403 });
    }

    const clients = await prisma.user.findMany({
      where: { role: "client" },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Грешка при извличане на клиенти:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

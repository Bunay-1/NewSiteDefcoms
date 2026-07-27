import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Качване/Прикачване на нов документ към клиент (Само за Администратори)
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
    const { title, fileSize, fileType, targetUserId } = body;

    if (!title || !fileSize || !fileType || !targetUserId) {
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

    const document = await prisma.document.create({
      data: {
        title,
        fileSize,
        fileType,
        downloadUrl: "#", // В реална среда тук се запазва път към S3 / съхранение
        userId: targetUserId,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Грешка при прикачване на документ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

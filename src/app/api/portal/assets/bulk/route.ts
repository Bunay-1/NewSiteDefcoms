import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Масово регистриране (Bulk Import) на ИТ активи от CSV или JSON списъци
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { assets } = body;

    if (!assets || !Array.isArray(assets) || assets.length === 0) {
      return NextResponse.json({ error: "Форматът трябва да бъде непразен списък от активи" }, { status: 400 });
    }

    const createdAssets = [];
    const skippedAssets = [];

    for (const rawAsset of assets) {
      const { name, ipAddress, type } = rawAsset;

      // Прост валидатор и изчистване
      if (!name || !ipAddress) {
        skippedAssets.push(rawAsset);
        continue;
      }

      const cleanType = type || "Сървър";

      // Спестяване на повторно добавяне на един и същ IP за дадения клиент
      const existing = await prisma.asset.findFirst({
        where: { userId, ipAddress: ipAddress.trim() }
      });

      if (existing) {
        skippedAssets.push(rawAsset);
        continue;
      }

      const created = await prisma.asset.create({
        data: {
          name: name.trim(),
          ipAddress: ipAddress.trim(),
          type: cleanType,
          status: "scanned",
          userId,
        }
      });
      createdAssets.push(created);
    }

    // Запис в одит логовете на профила
    if (createdAssets.length > 0) {
      await prisma.auditLog.create({
        data: {
          action: `Масов импорт на ИТ активи (Успешни: ${createdAssets.length}, Пропуснати: ${skippedAssets.length})`,
          ipAddress: "127.0.0.1",
          userAgent: "Системен модул за инвентаризация",
          status: "success",
          userId,
        }
      });
    }

    return NextResponse.json({
      message: "Импортът приключи успешно!",
      importedCount: createdAssets.length,
      skippedCount: skippedAssets.length
    }, { status: 201 });

  } catch (error) {
    console.error("Грешка при масов импорт на активи:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

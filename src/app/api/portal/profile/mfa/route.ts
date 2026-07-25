import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Генериране на симулиран 2FA секрет
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const simulatedSecret = "defcoms_mfa_secret_key_" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: simulatedSecret },
      select: { mfaSecret: true },
    });

    return NextResponse.json({ secret: user.mfaSecret });
  } catch (error) {
    console.error("Грешка при генериране на 2FA:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Промяна на състоянието на 2FA (Активиране/Деактивиране)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { enabled } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        mfaEnabled: enabled,
        ...(!enabled && { mfaSecret: null }), // изчистваме секрета, ако се спира
      },
    });

    // Ако потребителят активира 2FA, маркираме съответната препоръка за сигурност като Completed!
    if (enabled) {
      const rec = await prisma.recommendation.findFirst({
        where: {
          userId,
          title: { contains: "Многофакторна" }
        }
      });
      if (rec) {
        await prisma.recommendation.update({
          where: { id: rec.id },
          data: { status: "completed" },
        });
      }
    } else {
      // Ако деактивира, я връщаме обратно в pending
      const rec = await prisma.recommendation.findFirst({
        where: {
          userId,
          title: { contains: "Многофакторна" }
        }
      });
      if (rec) {
        await prisma.recommendation.update({
          where: { id: rec.id },
          data: { status: "pending" },
        });
      }
    }

    // Записваме одит лог
    await prisma.auditLog.create({
      data: {
        action: enabled ? "Активиране на Двуфакторна Защита (MFA)" : "Деактивиране на Двуфакторна Защита (MFA)",
        ipAddress: "127.0.0.1",
        userAgent: "Системен модул за защита",
        status: "success",
        userId,
      }
    });

    return NextResponse.json({
      message: enabled ? "2FA бе активиран успешно" : "2FA бе деактивиран",
      mfaEnabled: user.mfaEnabled
    });
  } catch (error) {
    console.error("Грешка при промяна на 2FA статус:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

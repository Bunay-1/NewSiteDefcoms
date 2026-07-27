import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateMfaSecret, verifyTOTP } from "@/lib/totp";

export const dynamic = "force-dynamic";

// POST - Генериране на реален 2FA секрет (Base32)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const realSecret = generateMfaSecret();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: realSecret },
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

// PATCH - Промяна на състоянието на 2FA (Активиране/Деактивиране с реална TOTP проверка)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { enabled, code } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Потребителят не е намерен" }, { status: 404 });
    }

    // Ако се активира, задължително изискваме и проверяваме въведения 2FA код
    if (enabled) {
      if (!code) {
        return NextResponse.json({ error: "Моля, въведете 6-цифрен код от приложението за верификация" }, { status: 400 });
      }
      if (!existingUser.mfaSecret) {
        return NextResponse.json({ error: "Първо генерирайте 2FA секрет" }, { status: 400 });
      }

      const isValid = verifyTOTP(code, existingUser.mfaSecret);
      if (!isValid) {
        return NextResponse.json({ error: "Въведеният код е невалиден или е изтекъл. Опитайте отново!" }, { status: 400 });
      }
    }

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

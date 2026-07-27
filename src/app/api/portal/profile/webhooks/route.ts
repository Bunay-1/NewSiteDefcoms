import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// GET - Извличане на всички регистрирани уебхукове за текущия потребител
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const webhooks = await prisma.webhook.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(webhooks);
  } catch (error) {
    console.error("Грешка при извличане на уебхукове:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Регистриране на нов уебхук
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL адресът е задължителен" }, { status: 400 });
    }

    // Генерираме защитена тайна за подпис на уебхука (Signing Secret)
    const secret = "whsec_" + crypto.randomBytes(16).toString("hex");

    const webhook = await prisma.webhook.create({
      data: {
        url,
        secret,
        userId,
      },
    });

    // Записваме одит лог
    await prisma.auditLog.create({
      data: {
        action: `Добавяне на нов Webhook: ${url}`,
        ipAddress: "127.0.0.1",
        userAgent: "Системен модул за интеграция",
        status: "success",
        userId,
      }
    });

    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на уебхук:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// DELETE - Изтриване/Премахване на уебхук
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID на уебхука е задължително" }, { status: 400 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      return NextResponse.json({ error: "Уебхукът не е намерен" }, { status: 404 });
    }

    // Защита: Само собственикът или админът може да го изтрие
    if (u.role !== "admin" && webhook.userId !== u.id) {
      return NextResponse.json({ error: "Нямате права да изтривате този уебхук" }, { status: 403 });
    }

    await prisma.webhook.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Уебхукът бе изтрит успешно" });
  } catch (error) {
    console.error("Грешка при изтриване на уебхук:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

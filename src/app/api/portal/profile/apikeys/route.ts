import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Списък с API ключове за влезлия клиент
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const keys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(keys);
  } catch (error) {
    console.error("Грешка при извличане на ключове:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на нов API Ключ
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Името на ключа е задължително" }, { status: 400 });
    }

    // Генерираме сигурен произволен ключ
    const randomHex = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const keyString = `defcoms_live_sk_${randomHex}`;

    const newKey = await prisma.apiKey.create({
      data: {
        name,
        key: keyString,
        userId,
      },
    });

    // Одит лог
    await prisma.auditLog.create({
      data: {
        action: `Генериране на нов API ключ: "${name}"`,
        ipAddress: "127.0.0.1",
        userAgent: "Системен модул за защита",
        status: "success",
        userId,
      }
    });

    return NextResponse.json(newKey, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на API ключ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// DELETE - Анулиране / Изтриване на API Ключ
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Идентификаторът на ключа е задължителен" }, { status: 400 });
    }

    const keyToDel = await prisma.apiKey.findFirst({
      where: { id, userId },
    });

    if (!keyToDel) {
      return NextResponse.json({ error: "Ключът не е намерен" }, { status: 404 });
    }

    await prisma.apiKey.delete({
      where: { id },
    });

    // Одит лог
    await prisma.auditLog.create({
      data: {
        action: `Изтриване / Анулиране на API ключ: "${keyToDel.name}"`,
        ipAddress: "127.0.0.1",
        userAgent: "Системен модул за защита",
        status: "success",
        userId,
      }
    });

    return NextResponse.json({ message: "Ключът бе анулиран успешно" });
  } catch (error) {
    console.error("Грешка при изтриване на API ключ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

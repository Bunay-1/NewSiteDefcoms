import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на ИТ активи
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
      // Админ вижда или активите на определен клиент, или всички активи
      const assets = await prisma.asset.findMany({
        where: targetUserId ? { userId: targetUserId } : {},
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(assets);
    } else {
      // Клиентът вижда само своите активи
      const userId = u.id;
      const assets = await prisma.asset.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(assets);
    }
  } catch (error) {
    console.error("Грешка при извличане на активи:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на нов актив
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;
    const body = await req.json();
    const { name, ipAddress, type, status, userId } = body;

    if (!name || !ipAddress || !type) {
      return NextResponse.json(
        { error: "Име, IP адрес/домейн и тип са задължителни" },
        { status: 400 }
      );
    }

    // Определяме за кого се създава активът
    let targetUserId = u.id;
    if (u.role === "admin" && userId) {
      targetUserId = userId;
    }

    const asset = await prisma.asset.create({
      data: {
        name,
        ipAddress,
        type,
        status: status || "scanned",
        userId: targetUserId,
      },
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на актив:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Редактиране/Обновяване на актив
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;
    const body = await req.json();
    const { id, name, ipAddress, type, status } = body;

    if (!id) {
      return NextResponse.json({ error: "ID на актива е задължително" }, { status: 400 });
    }

    const existingAsset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      return NextResponse.json({ error: "Активът не е намерен" }, { status: 404 });
    }

    // Защита: клиентът може да редактира само собствени активи
    if (u.role !== "admin" && existingAsset.userId !== u.id) {
      return NextResponse.json({ error: "Нямате права да променяте този актив" }, { status: 403 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (ipAddress !== undefined) updateData.ipAddress = ipAddress;
    if (type !== undefined) updateData.type = type;
    if (status !== undefined) updateData.status = status;

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedAsset);
  } catch (error) {
    console.error("Грешка при обновяване на актив:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// DELETE - Изтриване на актив
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
      return NextResponse.json({ error: "ID на актива е задължително" }, { status: 400 });
    }

    const existingAsset = await prisma.asset.findUnique({
      where: { id }
    });

    if (!existingAsset) {
      return NextResponse.json({ error: "Активът не е намерен" }, { status: 404 });
    }

    // Защита: клиентът може да изтрива само собствени активи
    if (u.role !== "admin" && existingAsset.userId !== u.id) {
      return NextResponse.json({ error: "Нямате права да изтривате този актив" }, { status: 403 });
    }

    await prisma.asset.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Активът бе изтрит успешно" });
  } catch (error) {
    console.error("Грешка при изтриване на актив:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

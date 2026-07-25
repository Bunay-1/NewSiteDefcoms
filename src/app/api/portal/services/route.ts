import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Извличане на услуги (Клиенти виждат своите, Админи виждат всички или по потребител)
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
      // Админ вижда или услугите за определен клиент, или абсолютно всички
      const services = await prisma.userService.findMany({
        where: targetUserId ? { userId: targetUserId } : {},
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(services);
    } else {
      // Нормален клиент вижда само собствените си услуги
      const userId = u.id;
      const services = await prisma.userService.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(services);
    }
  } catch (error) {
    console.error("Грешка при извличане на услуги:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// POST - Създаване на нова услуга за клиент (Само за Администратори)
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
    const { name, description, status, startDate, endDate, compliance, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Името на услугата и ID на клиента са задължителни" },
        { status: 400 }
      );
    }

    const service = await prisma.userService.create({
      data: {
        name,
        description: description || null,
        status: status || "active",
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        compliance: compliance || null,
        userId,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на услуга от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Обновяване на услуга (Само за Администратори)
export async function PATCH(req: NextRequest) {
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
    const { id, name, description, status, startDate, endDate, compliance } = body;

    if (!id) {
      return NextResponse.json({ error: "ID на услугата е задължително" }, { status: 400 });
    }

    const existingService = await prisma.userService.findUnique({
      where: { id }
    });

    if (!existingService) {
      return NextResponse.json({ error: "Услугата не е намерена" }, { status: 404 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : new Date();
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
    if (compliance !== undefined) updateData.compliance = compliance;

    const updatedService = await prisma.userService.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Грешка при обновяване на услуга от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// DELETE - Изтриване на услуга (Само за Администратори)
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const u = session.user as any;

    if (u.role !== "admin") {
      return NextResponse.json({ error: "Нямате администраторски права" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID на услугата е задължително" }, { status: 400 });
    }

    await prisma.userService.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Услугата е изтрита успешно" });
  } catch (error) {
    console.error("Грешка при изтриване на услуга от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

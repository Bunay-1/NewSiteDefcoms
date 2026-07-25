import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// GET - Извличане на всички клиенти с пълни детайли (Само за Администратори)
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
      include: {
        services: true,
        invoices: true,
        tickets: true,
      },
      orderBy: { createdAt: "desc" },
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

// POST - Създаване на нов клиент от Администратор
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
    const { email, password, name, phone, company, address, iban, eik, vat, mol } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Имейлът и паролата са задължителни" },
        { status: 400 }
      );
    }

    // Проверка за дублиране на имейл
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Потребител с този имейл вече съществува" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        phone: phone || null,
        company: company || null,
        address: address || null,
        iban: iban || null,
        eik: eik || null,
        vat: vat || null,
        mol: mol || null,
        role: "client"
      }
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Грешка при създаване на клиент от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// PATCH - Обновяване на съществуващ клиент от Администратор
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
    const { id, email, password, name, phone, company, address, iban, eik, vat, mol } = body;

    if (!id) {
      return NextResponse.json({ error: "ID на потребителя е задължително" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Потребителят не е намерен" }, { status: 404 });
    }

    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (address !== undefined) updateData.address = address;
    if (iban !== undefined) updateData.iban = iban;
    if (eik !== undefined) updateData.eik = eik;
    if (vat !== undefined) updateData.vat = vat;
    if (mol !== undefined) updateData.mol = mol;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Грешка при обновяване на клиент от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

// DELETE - Изтриване на клиент от Администратор
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
      return NextResponse.json({ error: "ID на потребителя е задължително" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Потребителят беше изтрит успешно" });
  } catch (error) {
    console.error("Грешка при изтриване на клиент от админ:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

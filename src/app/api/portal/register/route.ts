import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, company, phone } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Имейлът и паролата са задължителни" },
        { status: 400 }
      );
    }

    // Проверка дали потребителят вече съществува
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Потребител с този имейл вече съществува" },
        { status: 400 }
      );
    }

    // Хеширане на паролата
    const hashedPassword = await bcrypt.hash(password, 10);

    // Създаване на потребителя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        company: company || null,
        phone: phone || null,
        role: "client",
      },
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Потребителят е създаден успешно", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Грешка при регистрация:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

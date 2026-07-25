import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendDefComsNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();

    const { name, phone, company, currentPassword, newPassword } = body;

    // Взимаме потребителя от базата данни
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Потребителят не е намерен" }, { status: 404 });
    }

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;

    // Смяна на парола, ако се изисква
    if (currentPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Текущата парола е невалидна" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Новата парола трябва да бъде поне 6 символа" },
          { status: 400 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        phone: true,
        role: true,
      },
    });

    // Изпращане на имейл известие до официалния имейл на DefComs
    try {
      const changesList: string[] = [];
      if (name !== undefined) changesList.push(`• Промяна на име: "${name}"`);
      if (phone !== undefined) changesList.push(`• Промяна на телефон: "${phone}"`);
      if (company !== undefined) changesList.push(`• Промяна на фирма: "${company}"`);
      if (currentPassword && newPassword) changesList.push(`• Успешна смяна на сигурностната парола`);

      await sendDefComsNotification(
        "Обновяване на клиентски профил",
        `Клиентът успешно обнови данните за своя профил в платформата.\n\nНаправени промени:\n${changesList.join("\n") || "• Обновяване без видима промяна на основни текстови полета."}`,
        {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          company: updatedUser.company,
          phone: updatedUser.phone,
        }
      );
    } catch (emailErr) {
      console.error("Грешка при изпращане на имейл известие за профил:", emailErr);
    }

    return NextResponse.json({
      message: "Профилът бе обновен успешно",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Грешка при обновяване на профил:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

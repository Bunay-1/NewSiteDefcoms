import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PATCH - Промяна на предпочитанията за известия (GDPR compliance)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { notifyThreats, notifyTickets, notifyInvoices } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(notifyThreats !== undefined && { notifyThreats }),
        ...(notifyTickets !== undefined && { notifyTickets }),
        ...(notifyInvoices !== undefined && { notifyInvoices }),
      },
    });

    // Одит лог
    await prisma.auditLog.create({
      data: {
        action: "Промяна на предпочитанията за известия",
        ipAddress: "127.0.0.1",
        userAgent: "Системен модул за защита",
        status: "success",
        userId,
      }
    });

    return NextResponse.json({
      message: "Предпочитанията бяха запазени успешно",
      user: {
        notifyThreats: user.notifyThreats,
        notifyTickets: user.notifyTickets,
        notifyInvoices: user.notifyInvoices,
      }
    });
  } catch (error) {
    console.error("Грешка при обновяване на известия:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

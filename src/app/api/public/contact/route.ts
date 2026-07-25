import { NextRequest, NextResponse } from "next/server";
import { sendDefComsNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Името, имейлът и съобщението са задължителни." },
        { status: 400 }
      );
    }

    // Изпращане на имейл известие до официалния имейл на DefComs
    await sendDefComsNotification(
      `Форма за контакт: ${subject || "Запитване"}`,
      `Получено е ново запитване през публичната контактна форма на уебсайта.\n\n` +
        `• Тема: ${subject || "Не е избрана"}\n\n` +
        `Съобщение:\n"${message}"`,
      {
        name,
        email,
        phone: phone || null,
        company: "Публичен потребител",
      }
    );

    return NextResponse.json({ success: true, message: "Съобщението е получено успешно." });
  } catch (error) {
    console.error("Грешка при обработка на контактна форма:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sendDefComsNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Невалиден имейл адрес." },
        { status: 400 }
      );
    }

    // Изпращане на имейл известие до официалния имейл на DefComs
    await sendDefComsNotification(
      "Нов абонат за бюлетина",
      `Потребителят се абонира успешно за седмичните анализи на заплахи и ЕС директиви (NIS2, DORA, GDPR).`,
      {
        email,
        name: "Абонат за Бюлетин",
        company: "Публичен уебсайт",
      }
    );

    return NextResponse.json({ success: true, message: "Абонирането е успешно." });
  } catch (error) {
    console.error("Грешка при абониране за бюлетин:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

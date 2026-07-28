import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Приемане на реални SIEM събития/логове
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Невалиден или липсващ API ключ (Authorization: Bearer <key>)" },
        { status: 401 }
      );
    }

    const apiKeyVal = authHeader.replace("Bearer ", "").trim();

    // Намираме съответния потребител през API ключа
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKeyVal },
      include: { user: true }
    });

    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: "Невалиден или деактивиран API ключ" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Създаваме одит лог запис за изпратения SIEM сигнал в профила на клиента
    await prisma.auditLog.create({
      data: {
        action: `SIEM сигнал: ${body.event_type || "Идентификация на аномалия"}`,
        ipAddress: body.source_ip || "127.0.0.1",
        userAgent: body.detected_process || body.user_agent || "Интегриран SIEM агент",
        status: "success",
        userId: apiKeyRecord.userId,
      }
    });

    return NextResponse.json({
      success: true,
      message: "SIEM логът бе анализиран и приет успешно от SOC ценъра",
      event_type: body.event_type,
      severity: body.severity || body.threat_level || "INFO"
    }, { status: 201 });
  } catch (error) {
    console.error("Грешка в SIEM лог колектора:", error);
    return NextResponse.json(
      { error: "Невалиден JSON формат или вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// POST - Задействане на симулирано Webhook събитие (тест)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Неавторизиран" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { webhookId } = body;

    if (!webhookId) {
      return NextResponse.json({ error: "ID на уебхука е задължително" }, { status: 400 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId }
    });

    if (!webhook || webhook.userId !== userId) {
      return NextResponse.json({ error: "Уебхукът не е намерен" }, { status: 404 });
    }

    // Симулационно изпращане на тестово Webhook събитие
    const testPayload = JSON.stringify({
      event: "test.ping",
      timestamp: Math.floor(Date.now() / 1000),
      data: {
        message: "Това е тестово събитие от DefComs Cybersecurity Platform!",
        status: "success",
        securityScore: 85
      }
    });

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHmac("sha256", webhook.secret)
      .update(`${timestamp}.${testPayload}`)
      .digest("hex");

    let fetchSuccess = false;
    let errorDetail = "";

    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-DefComs-Signature": signature,
          "X-DefComs-Timestamp": timestamp.toString(),
        },
        body: testPayload,
      });
      fetchSuccess = response.ok;
      if (!response.ok) {
        errorDetail = `Статус код: ${response.status}`;
      }
    } catch (err: any) {
      errorDetail = err.message || "Грешка в мрежата";
    }

    return NextResponse.json({
      success: fetchSuccess,
      message: fetchSuccess ? "Уебхукът бе задействан и отговори успешно!" : "Уебхукът бе задействан, но отсрещната страна върна грешка.",
      detail: errorDetail
    });
  } catch (error) {
    console.error("Грешка при тестване на уебхук:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

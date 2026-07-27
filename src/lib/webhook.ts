import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Помощна функция за разпращане на реално Webhook събитие към всички уебхукове на определен потребител
export async function triggerWebhook(userId: string, eventType: string, payload: any) {
  try {
    const webhooks = await prisma.webhook.findMany({
      where: { userId }
    });

    if (webhooks.length === 0) return;

    const timestamp = Math.floor(Date.now() / 1000);
    const body = JSON.stringify({
      event: eventType,
      timestamp,
      data: payload
    });

    for (const wh of webhooks) {
      try {
        // Подписване на Webhook събитието с HMAC-SHA256 за гарантиране на сигурност и интегритет
        const signature = crypto
          .createHmac("sha256", wh.secret)
          .update(`${timestamp}.${body}`)
          .digest("hex");

        // Реално разпращане в бекграунда
        fetch(wh.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-DefComs-Signature": signature,
            "X-DefComs-Timestamp": timestamp.toString(),
          },
          body,
        }).catch(err => console.warn(`Проблем с Webhook fetch за URL ${wh.url}:`, err));
      } catch (err) {
        console.error(`Грешка при подготовка на уебхук за ${wh.url}:`, err);
      }
    }
  } catch (error) {
    console.error("Грешка в triggerWebhook:", error);
  }
}

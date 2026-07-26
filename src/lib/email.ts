import nodemailer from "nodemailer";

/**
 * DefComs Email Notification Service
 *
 * Изпраща автоматични имейл известия до официалния имейл на DefComs (info@defcoms.eu)
 * при промяна на клиентски профили, нови заявки за планове/услуги, тикети, или всякакви
 * други промени по данните в реално време през SMTP сървър.
 */

export interface ClientNotificationData {
  id?: string;
  name?: string | null;
  email?: string;
  company?: string | null;
  phone?: string | null;
}

export async function sendDefComsNotification(
  subject: string,
  body: string,
  client: ClientNotificationData
) {
  const officialDefComsEmail = "info@defcoms.eu";

  // Форматиране на съдържанието на имейла за изпращане
  const emailSubject = `[DefComs Известие] - ${subject}`;
  const formattedBody = `
========================================================================
НОВО СИСТЕМНО ИЗВЕСТИЕ ОТ КЛИЕНТСКИЯ ПОРТАЛ
========================================================================
До: ${officialDefComsEmail}
Относно: ${subject}
Дата/Час: ${new Date().toLocaleString("bg-BG")}

ДАННИ ЗА КЛИЕНТА:
------------------------------------------------------------------------
• Име на клиента: ${client.name || "Не е посочено"}
• Имейл адрес: ${client.email || "Не е посочен"}
• Организация/Фирма: ${client.company || "Не е посочена"}
• Телефон за контакт: ${client.phone || "Не е посочен"}
• Клиентско ID: ${client.id || "Не е посочено"}

СЪДЪРЖАНИЕ НА ИЗВЕСТИЕТО:
------------------------------------------------------------------------
${body}

------------------------------------------------------------------------
Автоматично изпратено от Системата за сигурност на DefComs.eu
========================================================================
`;

  // Отпечатваме пълен лог в конзолата за архивиране и бърз преглед
  console.log(`\x1b[36m${formattedBody}\x1b[0m`);

  // Извличане на SMTP настройки от средата за реално изпращане
  const smtpHost = process.env.SMTP_HOST || "localhost";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";

  // Проверка за наличие на реални настройки.
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          // Игнориране на невалидни SSL сертификати за гъвкавост
          rejectUnauthorized: false
        }
      });

      await transporter.sendMail({
        from: `"${client.name || 'DefComs Portal'}" <${smtpUser}>`,
        to: officialDefComsEmail,
        replyTo: client.email || undefined,
        subject: emailSubject,
        text: formattedBody,
      });

      console.log(`📬 Имейлът бе успешно изпратен до ${officialDefComsEmail} през SMTP (${smtpHost})!`);
    } catch (smtpError) {
      console.error("❌ Грешка при изпращане на имейл през реална SMTP услуга:", smtpError);
    }
  } else {
    console.log("ℹ️ Симулационен режим: За реално изпращане до info@defcoms.eu, моля конфигурирайте SMTP_HOST, SMTP_PORT, SMTP_USER и SMTP_PASS в своя .env файл.");
  }

  return {
    success: true,
    recipient: officialDefComsEmail,
    sentAt: new Date().toISOString()
  };
}

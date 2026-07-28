import nodemailer from "nodemailer";

/**
 * DefComs Email Notification Service
 *
 * Изпраща автоматични имейл известия до официалния имейл на DefComs (info@defcoms.eu)
 * или директно до клиентите на платформата през реална SMTP услуга.
 */

export interface ClientNotificationData {
  id?: string;
  name?: string | null;
  email?: string;
  company?: string | null;
  phone?: string | null;
}

export async function sendEmailNotification(
  to: string,
  subject: string,
  body: string,
  client?: ClientNotificationData
) {
  const officialDefComsEmail = "info@defcoms.eu";
  const finalSubject = `[DefComs] - ${subject}`;

  // Форматиране на съдържанието на имейла за изпращане
  let formattedBody = `
========================================================================
НОВО СИСТЕМНО ИЗВЕСТИЕ ОТ КЛИЕНТСКИЯ ПОРТАЛ
========================================================================
Относно: ${subject}
Дата/Час: ${new Date().toLocaleString("bg-BG")}

`;

  if (client) {
    formattedBody += `ДАННИ ЗА КЛИЕНТА:
------------------------------------------------------------------------
• Име: ${client.name || "Не е посочено"}
• Имейл: ${client.email || "Не е посочен"}
• Организация/Фирма: ${client.company || "Не е посочена"}
• Телефон за контакт: ${client.phone || "Не е посочен"}
• Клиентско ID: ${client.id || "Не е посочено"}

`;
  }

  formattedBody += `СЪДЪРЖАНИЕ НА ИЗВЕСТИЕТО:
------------------------------------------------------------------------
${body}

------------------------------------------------------------------------
Автоматично изпратено от Системата за сигурност на DefComs.eu
========================================================================
`;

  // Отпечатваме лог в конзолата за архив
  console.log(`\x1b[36m${formattedBody}\x1b[0m`);

  // Извличане на SMTP настройки от средата
  const smtpHost = process.env.SMTP_HOST || "";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";
  const smtpFrom = process.env.SMTP_FROM || `DefComs Portal <${smtpUser}>`;

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
          rejectUnauthorized: false
        }
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: to,
        replyTo: client?.email || undefined,
        subject: finalSubject,
        text: formattedBody,
      });

      console.log(`📬 Имейлът бе успешно изпратен до ${to} през SMTP (${smtpHost})!`);
    } catch (smtpError) {
      console.error("❌ Грешка при изпращане на имейл през реална SMTP услуга:", smtpError);
    }
  } else {
    console.log(`ℹ️ Симулационен режим: За реално изпращане до ${to}, моля конфигурирайте SMTP_HOST, SMTP_PORT, SMTP_USER и SMTP_PASS в своя .env файл.`);
  }

  return {
    success: true,
    recipient: to,
    sentAt: new Date().toISOString()
  };
}

// За запазване на съвместимост със стария метод в целия проект
export async function sendDefComsNotification(
  subject: string,
  body: string,
  client: ClientNotificationData
) {
  return sendEmailNotification("info@defcoms.eu", subject, body, client);
}

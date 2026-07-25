/**
 * DefComs Email Notification Service
 *
 * Изпраща автоматични имейл известия до официалния имейл на DefComs (info@defcoms.eu)
 * при промяна на клиентски профили, нови заявки за планове/услуги, тикети, или всякакви
 * други промени по данните в реално време.
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

  // В реална среда тук се интегрира Nodemailer или външно API (SendGrid, Mailgun)
  // За целите на платформата, одит сигурността и симулация, отпечатваме пълен лог
  console.log(`\x1b[36m${formattedBody}\x1b[0m`);

  return {
    success: true,
    recipient: officialDefComsEmail,
    sentAt: new Date().toISOString()
  };
}

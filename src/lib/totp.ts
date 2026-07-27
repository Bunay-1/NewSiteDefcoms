import crypto from "crypto";

// Декодиране на Base32 за съвместимост със стандартни TOTP тайни
function base32Decode(base32: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleaned = base32.toUpperCase().replace(/=+$/, "");
  const length = cleaned.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  const buffer = Buffer.alloc(Math.floor((length * 5) / 8));

  for (let i = 0; i < length; i++) {
    const val = alphabet.indexOf(cleaned[i]);
    if (val === -1) continue;
    value = (value << 5) | val;
    bits += 5;
    if (bits >= 8) {
      buffer[index++] = (value >> (bits - 8)) & 255;
      bits -= 8;
    }
  }
  return buffer.slice(0, index);
}

// Генериране на TOTP код на базата на тайна и времеви брояч
export function generateTOTP(secret: string, counter: number): string {
  const key = base32Decode(secret);

  // Преобразуване на брояча в 8-байтов буфер
  const buffer = Buffer.alloc(8);
  let tmp = counter;
  for (let i = 7; i >= 0; i--) {
    buffer[i] = tmp & 0xff;
    tmp = Math.floor(tmp / 256);
  }

  // HMAC-SHA1
  const hmac = crypto.createHmac("sha1", key);
  hmac.update(buffer);
  const hmacResult = hmac.digest();

  // Динамично отрязване (Dynamic Truncation)
  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  const code =
    ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);

  const otp = code % 1000000;
  return otp.toString().padStart(6, "0");
}

// Проверка на TOTP токен с толеранс (прозорец) за мрежово отклонение от +/- 1 стъпка (30 секунди)
export function verifyTOTP(token: string, secret: string, window = 1): boolean {
  if (!token || !secret) return false;

  const epoch = Math.floor(Date.now() / 1000);
  const currentStep = Math.floor(epoch / 30);

  for (let i = -window; i <= window; i++) {
    const calculated = generateTOTP(secret, currentStep + i);
    if (calculated === token) {
      return true;
    }
  }
  return false;
}

// Генератор на напълно случайна 16-символна Base32 тайна (80 бита ентропия)
export function generateMfaSecret(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  const bytes = crypto.randomBytes(10);
  for (let i = 0; i < bytes.length; i++) {
    secret += alphabet[bytes[i] % 32];
  }
  return secret;
}

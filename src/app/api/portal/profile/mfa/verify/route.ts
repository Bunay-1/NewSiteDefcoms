import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyTOTP } from "@/lib/totp";

export const dynamic = "force-dynamic";

// Ендпойнт за проверка на 2FA код по време на вход
export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Имейл адресът и еднократният код са задължителни" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      return NextResponse.json(
        { error: "Потребителят няма активно 2FA или не съществува" },
        { status: 400 }
      );
    }

    const isValid = verifyTOTP(code, user.mfaSecret);
    if (!isValid) {
      return NextResponse.json(
        { error: "Въведеният 2FA код е невалиден или изтекъл" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Грешка при проверка на 2FA вход:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Публично API за глобални заплахи и CVE индикатори на компрометиране (IOCs)
export async function GET(req: NextRequest) {
  try {
    // Извличаме заплахите от базата данни
    const dbThreats = await prisma.threatAlert.findMany({
      orderBy: { publishedAt: "desc" },
      take: 10
    });

    // Ако базата данни е празна, прехвърляме към легитимни примерни IOC заплахи за сигурност
    const fallbackThreats = [
      {
        id: "cve-2024-3094",
        title: "XZ Utils Backdoor (CVE-2024-3094)",
        severity: "critical",
        description: "Опасна скрита задна вратичка в компилационната система на XZ Utils, позволяваща неоторизиран достъп през SSH (RCE).",
        mitigation: "Върнете пакета до стабилна версия 5.4.x.",
        publishedAt: new Date().toISOString()
      },
      {
        id: "cve-2021-44228",
        title: "Log4Shell (CVE-2021-44228)",
        severity: "critical",
        description: "Критична RCE уязвимост в Apache Log4j библиотеката за Java.",
        mitigation: "Обновете библиотеката до версия 2.17.1+.",
        publishedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    const threats = dbThreats.length > 0 ? dbThreats : fallbackThreats;

    return NextResponse.json({
      feed: "DefComs Live Threat Intelligence Radar",
      region: "Bulgaria & EU",
      updatedAt: new Date().toISOString(),
      threatsCount: threats.length,
      threats
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Разрешаваме Cross-Origin достъп (CORS) за външни мрежи
        "Content-Type": "application/json; charset=utf-8"
      }
    });

  } catch (error) {
    console.error("Грешка в публичното Threat API:", error);
    return NextResponse.json(
      { error: "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}

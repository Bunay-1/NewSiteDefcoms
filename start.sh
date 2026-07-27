#!/bin/bash

# ==============================================================================
#  DefComs - Скрипт за автоматично бързо стартиране под Linux
# ==============================================================================

# Цветове за конзолата
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

clear
echo -e "${BLUE}======================================================================"
echo -e "         DefComs Cybersecurity Platform & Portal - Бърз Старт         "
echo -e "======================================================================${NC}"
echo ""

# 1. Проверка за инсталиран Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[Грешка] Node.js не е инсталиран във Вашата система!${NC}"
    echo -e "Моля, инсталирайте Node.js (v18 или v20) и опитайте отново."
    exit 1
fi

NODE_VER=$(node -v)
echo -e "  • Намерен Node.js версия: ${GREEN}${NODE_VER}${NC}"

# 2. Проверка за съществуващ .env файл
if [ ! -f .env ]; then
    echo -e "${YELLOW}  • Липсва .env файл. Генерирам автоматично примерен конфигурационен файл...${NC}"
    cat <<EOF > .env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="defcoms_secret_dev_$(openssl rand -hex 16 2>/dev/null || echo 'default_secret_key_12345')"
EOF
    echo -e "${GREEN}    [Успех] Създаден е нов .env файл с генериран AUTH_SECRET.${NC}"
fi

# 3. Инсталиране на зависимости (npm install)
echo -e "${BLUE}  • Инсталиране на софтуерни пакети (зависимости)...${NC}"
if [ -d node_modules ]; then
    echo -e "    - Папката node_modules вече съществува. Пропускане на дългото инсталиране..."
else
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[Грешка] Възникна проблем при инсталирането на npm пакетите.${NC}"
        exit 1
    fi
    echo -e "${GREEN}    [Успех] Всички пакети са инсталирани.${NC}"
fi

# 4. Настройка на базата данни (Prisma db push)
echo -e "${BLUE}  • Синхронизиране на SQLite базата данни чрез Prisma...${NC}"
npx prisma db push --accept-data-loss
if [ $? -ne 0 ]; then
    echo -e "${RED}[Грешка] Неуспешно свързване или изграждане на базата данни.${NC}"
    exit 1
fi
echo -e "${GREEN}    [Успех] Схемата на базата данни е приложена успешно.${NC}"

# 5. Зареждане на демо/начални данни (Seeding)
echo -e "${BLUE}  • Зареждане на готови администраторски и клиентски профили (Seed)...${NC}"
npx tsx scripts/seed.ts
if [ $? -ne 0 ]; then
    echo -e "${RED}[Грешка] Грешка при попълване на базата с готови данни.${NC}"
    exit 1
fi
echo -e "${GREEN}    [Успех] Демо профилите са готови за използване.${NC}"

# 6. Компилация на проекта (npm run build)
echo -e "${BLUE}  • Изграждане на оптимизирана производствена версия на проекта...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}[Грешка] Компилацията на проекта се провали.${NC}"
    exit 1
fi
echo -e "${GREEN}    [Успех] Next.js проектът е компилиран безупречно.${NC}"

echo ""
echo -e "${GREEN}======================================================================"
echo -e "           DefComs е готов за стартиране на Вашата Linux машина!       "
echo -e "======================================================================${NC}"
echo ""
echo -e "  🔑 ${YELLOW}Тестови акаунти за достъп:${NC}"
echo -e "     - ${GREEN}Клиент:${NC} test@defcoms.eu    | Парола: password123"
echo -e "     - ${GREEN}Админ:${NC}  admin@defcoms.eu   | Парола: admin123"
echo ""

# Четене на избор за стартиране
echo -e "Изберете режим за стартиране:"
echo -e "  ${YELLOW}[1]${NC} Стартиране в Режим за Разработка (Development Mode - бърза диагностика)"
echo -e "  ${YELLOW}[2]${NC} Стартиране в Режим за Производство (Production Mode - препоръчително)"
echo -e "  ${YELLOW}[3]${NC} Изход (Само инсталация)"
read -p "Изберете опция (1, 2 или 3): " OPTION

case $OPTION in
    1)
        echo -e "${BLUE}Стартиране на dev сървър на http://localhost:3000 ...${NC}"
        npm run dev
        ;;
    2)
        echo -e "${BLUE}Стартиране на производствения уеб сървър на порт 3000...${NC}"
        npm start
        ;;
    *)
        echo -e "${GREEN}Успешна инсталация! За да стартирате платформата по-късно, изпълнете: npm start${NC}"
        exit 0
        ;;
esac

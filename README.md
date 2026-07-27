# DefComs Cybersecurity Platform & Portal

Модерен, изключително сигурен, интерактивен и оптимизиран уебсайт за киберсигурност, изграден с Next.js 14 (App Router), TypeScript, TailwindCSS, Prisma и SQLite.

Платформата съдържа публичен уебсайт и пълнофункционален клиентски портал, съобразен с изискванията на европейските регулации по киберсигурност и поверителност (**GDPR**, **NIS2**, **DORA** и **CRA**).

Всички цени в платформата и клиентските профили са деноминирани в **Евро (€)** за пълна съвместимост с международните и европейските счетоводни стандарти.

---

## 🚀 Технологичен стек

- **Next.js 14 (App Router)** - React рамка с поддръжка на Server & Client Components.
- **TypeScript** - Type-safe разработка и строга сигурност на интерфейсите.
- **Prisma ORM** - Обектно-релационно картографиране (ORM) за сигурни DB заявки.
- **SQLite** - Бърза, надеждна локална релационна база данни (`prisma/dev.db`).
- **NextAuth.js (v5 / Auth.js)** - Модерна аутентификация с JWT сесии и бисквитки.
- **Bcrypt.js** - Криптографско хеширане на паролите с висока ентропия.
- **Nodemailer** - SMTP интеграция за реално изпращане на известия.
- **TailwindCSS & Framer Motion** - Utility-first CSS с плавни и модерни анимации.
- **Lucide React** - Пакет от икони.

---

## 🛡️ Модули на клиентския портал (Client Portal)

Клиентският портал на DefComs осигурява 360-градусово управление на сигурността на клиентите.

### 1. Изпълнително табло (Overview Dashboard)
- **Показатели в реално време:** Динамични показатели, извличани директно от базата данни:
  - *Здравен статус на сигурността (Score)* в проценти.
  - *Брой активни критични заплахи* в емисията (с предупредителна пулсация).
  - *Брой налични одитни доклади* в сейфа.
  - *Статистика на тикетите:* Отворени, В процес, Решени тикети.
- **Хъб за бърза навигация:** Стилизирана мрежа с бутони за незабавен достъп до всички секции.

### 2. Управление на услугите („Моите услуги“)
- **Списък с активни планове:** Име, описание, дати на валидност (начало/край) и статус на услугите (Активна, Спряна, Изтекла).
- **Баджове за съответствие:** Интеграция на специфични баджове според покриваните регулации (**GDPR**, **NIS2**, **DORA**, **CRA**, **ISO 27001**, **SOC 2**).
- **Поръчка & Смяна на планове:** Модерен гласморфичен модел, през който клиентът може да заяви нова услуга или промяна на досегашен план. Системата автоматично генерира приоритетен тикет в базата данни и пренасочва потребителя към чата с акаунт мениджър.

### 3. Оценка на нивото на защита (Security Health Score)
- **Checklist с филтри:** Възможност за филтриране на мерките по категории (*Достъп, Мрежа, Съответствие, Обучение*). Кликването върху задача моментално променя състоянието ѝ в базата данни и преизчислява оценката на сигурността.

### 4. Инвентаризация на активите (CMDB & Asset Management)
- **Управление на ИТ активи:** Клиентите могат да описват своите сървъри, облачни инстанции, контейнери и крайни устройства с детайли като IP адреси, ОС, критичност и статус на защита.
- **Симулиран скенер на уязвимости:** Интерактивен бутон "Сканирай", който симулира пенетрейшън тест и разкрива потенциални CVE уязвимости директно в интерфейса.
- **Пълна интеграция:** Администраторите могат директно да преглеждат инвентара на активите на всеки клиент.

### 5. SIEM терминал в реално време (SIEM Terminal Stream)
- **Централизиран мониторинг на събития:** Интерактивна конзола, показваща потоци от логове за сигурност (достъп, опити за проникване, мрежови аномалии).
- **Интеграция чрез API Ключ:** За валидиране на достъпа до потока от събития се използва сигурен API ключ, генериран от настройките на потребителския профил.

### 6. Симулатор на фишинг атаки (Phishing Trainer)
- **Интерактивно обучение:** Платформа за симулиране на реални фишинг кампании, където служителите се обучават да разпознават злонамерени писма.
- **Запис на резултати и баджове:** Системата записва резултатите от преминатите тестове в базата данни и награждава потребителите със сертифицирани баджове според постигнатия успех.

### 7. Емисия за заплахи (Threat Intelligence Feed)
- **Ранно известяване (NIS2):** Непрекъснат поток от актуални новини за открити уязвимости (CVE) и фишинг кампании с детайлни нива на опасност (*Критична, Висока, Средна, Ниска*).
- **Мерки за ограничаване (Mitigation):** Специфични инструкции за ИТ екипите на клиентите за защита на системите им.

### 8. Сейф за документи (Secure Vault)
- **Защитено хранилище:** Таблица с наличните одитни PDF доклади, пентестинг резултати и ISO сертификати.
- **Сигурно изтегляне:** Симулирано криптирано изтегляне на файловете след сесийна оторизация, съвместимо с **GDPR** и **ePrivacy**.

### 9. Финансови фактури & Плащания
- **Анализ на разходите в евро (€):** Сумарни показатели за изплатени, неплатени и просрочени задължения.
- **Сигурно плащане:** Симулатор на картови плащания по PCI-DSS стандарт за неплатени и просрочени фактури. При успех фактурата моментално се маркира как платена в базата данни.

### 10. Терминал за профил & Сигурност
- **Профил & 2FA:** Сигурно управление на лични данни, смяна на парола с проверка през `bcrypt` и интерактивен симулатор на Двуфакторна защита (MFA) с QR код и уникален секретен ключ.
- **GDPR Настройки за известяване:** Управление на съгласието за получаване на имейл известия за заплахи, тикети и фактури.
- **Audit Log (История на влизанията):** Пълен списък на последната активност в профила (Действие, IP адрес, ОС и браузър, дата и статус на операцията - Успешно/Блокирано).
- **API Ключове за интеграция:** Генератор на защитени токени за разработчици с цел интеграция на клиентската инфраструктура със SOC платформата на DefComs.

### 11. Администраторски панел (`/portal/admin`)
- Достъпен само за потребители с роля `admin` (напр. `admin@defcoms.eu`).
- **Качване на доклади:** Прикачване на нови доклади, PDF одити или инвентаризации към избрани клиенти.
- **Издаване на фактури:** Динамично създаване и изпращане на фактури в евро (€) към избрани клиенти през базата данни.
- **Заплахи & Препоръки:** Създаване на глобални предупреждения за киберсигурност и препоръки към избрани клиенти с автоматично отражение върху здравния им рейтинг.
- **Поддържащи тикети:** Преглед на всички отворени тикети на платформата с възможност за директно отговаряне и затваряне.

---

## ⚡ Бързо и автоматично стартиране (само за Linux)

За улеснение на разработчиците и администраторите сме създали интерактивен Bash скрипт, който автоматично проверява средата, инсталира нужните софтуерни пакети, създава базата данни, попълва я с готови демо данни, компилира уебсайта и Ви пита в какъв режим искате да го стартирате.

> ⚠️ **ВАЖНО:** Винаги когато се правят функционални или конфигурационни промени по проекта, задължително трябва да се преглежда и при нужда да се редактира автоматичният скрипт `start.sh` за синхронизация на стъпките за стартиране и компилиране на средата!

За да стартирате всичко с една лесна команда:
```bash
# Даване на права за изпълнение и стартиране на скрипта
chmod +x start.sh
./start.sh
```

---

## 💻 Ръководство за инсталация и стартиране на Linux платформи

Това ръководство обхваща ръчния процес на внедряване и управление на DefComs под Linux дистрибуции (като **Debian, Ubuntu, CentOS, RHEL и Arch Linux**).

### 1. Подготовка на средата (Инсталиране на Node.js и SQLite)

#### На Debian / Ubuntu:
```bash
# 1. Обновяване на пакетния мениджър
sudo apt update && sudo apt upgrade -y

# 2. Инсталиране на SQLite3 и компилационни инструменти
sudo apt install -y sqlite3 build-essential curl git

# 3. Инсталиране на Node.js (препоръчителна версия 18 или 20 през NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### На CentOS / RHEL / Fedora:
```bash
# 1. Обновяване и инсталиране на SQLite3
sudo dnf update -y
sudo dnf install -y sqlite curl git gcc-c++ make

# 2. Инсталиране на Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
```

#### На Arch Linux:
```bash
sudo pacman -Syu --needed nodejs npm sqlite git base-devel
```

### 2. Клониране на проекта и инсталация на зависимостите
```bash
cd /var/www
sudo git clone <REPOSITIORY_URL> defcoms
sudo chown -R $USER:$USER /var/www/defcoms
cd defcoms

# Инсталирайте npm пакетите
npm install
```

### 3. Конфигуриране на променливите на средата (Environment Variables)
Създайте конфигурационен файл `.env` в корена на проекта:
```bash
touch .env
```
Добавете следните системни настройки:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="Вашият_Генериран_Супер_Сигурен_Секрет_Тук"
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="notifications@defcoms.eu"
SMTP_PASS="Вашата_Сигурна_Парола_За_SMTP"
SMTP_FROM="DefComs <notifications@defcoms.eu>"
```

### 4. Инициализация на базата данни и Seeding
```bash
# 1. Създаване на SQLite база данни и генериране на Prisma Client
npx prisma db push

# 2. Попълване на базата с готови административни и клиентски данни
npx tsx scripts/seed.ts
```

### 5. Управление на процеса в бекграунд под Linux

#### Метод А: Настройка на Systemd Сервиз (Препоръчително)
Създайте нов systemd сервизен файл:
```bash
sudo nano /etc/systemd/system/defcoms.service
```
Поставете следната конфигурация:
```ini
[Unit]
Description=DefComs Next.js Production Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/defcoms
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
```
Запишете файла, обновете системния демон и стартирайте услугата:
```bash
sudo systemctl daemon-reload
sudo systemctl enable defcoms.service
sudo systemctl start defcoms.service
sudo systemctl status defcoms.service
```

#### Метод Б: Управление чрез PM2 (Алтернативно)
```bash
sudo npm install -g pm2
npm run build
pm2 start npm --name "defcoms" -- start --port 3000
pm2 startup
pm2 save
```

### 6. Настройка на Nginx Reverse Proxy и SSL (HTTPS)
```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/defcoms
```
Въведете следния блок:
```nginx
server {
    listen 80;
    server_name portal.defcoms.eu www.portal.defcoms.eu;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Активирайте конфигурацията и рестартирайте Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/defcoms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Подсигуряване на SSL Сертификат с Let's Encrypt / Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d portal.defcoms.eu -d www.portal.defcoms.eu
```

### 7. Конфигуриране на Linux Защитна Стена (UFW)
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### 8. Автоматизирано архивиране на SQLite базата данни (Backup)
Добавете скрипт `~/backup_db.sh` в `crontab -e`:
```bash
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DB_PATH="/var/www/defcoms/prisma/dev.db"
DATE=$(date +"%Y-%m-%d_%H%M%S")
cp $DB_PATH "$BACKUP_DIR/defcoms_backup_$DATE.db"
find $BACKUP_DIR -type f -name "*.db" -mtime +30 -delete
```

---

## 🪟 Ръководство за инсталация и стартиране на Windows платформи

Това ръководство описва детайлно инсталацията, пускането и поддръжката на DefComs върху **Windows Server** или **Windows 10/11** десктоп среда за разработка или хостинг.

### 1. Подготовка на средата (Node.js, Git и SQLite)

1. **Инсталиране на Node.js**:
   - Свалете препоръчителния **Node.js LTS** инсталатор (.msi) от официалния уебсайт [https://nodejs.org](https://nodejs.org).
   - Изпълнете го и се уверете, че е маркирана опцията *“Add to PATH”*.
2. **Инсталиране на Git**:
   - Свалете и инсталиране Git за Windows от [https://git-scm.com](https://git-scm.com).
3. **SQLite**:
   - За самата работа на платформата не е нужно да инсталирате отделен софтуер за SQLite – Prisma работи локално с него.
   - *Препоръчително за преглед:* За визуален преглед на базата данни можете да свалите **DB Browser for SQLite** от [https://sqlitebrowser.org/](https://sqlitebrowser.org/).

---

### 2. Клониране и инсталация на зависимостите

Отворете **PowerShell** (или Command Prompt) като администратор и изпълнете:
```powershell
# Преминаване в папка, където ще се хоства проектът (например C:\inetpub или C:\projects)
mkdir C:\projects
cd C:\projects

# Клониране на хранилището
git clone <REPOSITIORY_URL> defcoms
cd defcoms

# Инсталиране на npm пакетите
npm install
```

---

### 3. Конфигуриране на променливите на средата (Environment Variables)

Създайте `.env` файл в корена на папка `defcoms`:
```powershell
New-Item .env -ItemType File
```
Отворете го с Notepad или VS Code и въведете настройките:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="Генериран_Супер_Сигурен_Случаен_Стринг_Тук_64_Символа"
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="notifications@defcoms.eu"
SMTP_PASS="Вашата_Сигурна_Парола_За_SMTP"
SMTP_FROM="DefComs <notifications@defcoms.eu>"
```

---

### 4. Инициализация на базата данни и Seeding под Windows

В отворения PowerShell в папка `defcoms` стартирайте:
```powershell
# 1. Прилагане на релациите и генериране на Prisma Client
npx prisma db push

# 2. Попълване на базата с готови тестови клиенти и системни данни
npx tsx scripts/seed.ts
```

---

### 5. Управление на процеса в бекграунд под Windows (Windows Service)

За денонощна и автономна работа на уеб портала без необходимост от постоянно отворен PowerShell прозорец, конфигурирайте фонова услуга (Windows Service).

#### Метод А: Използване на NSSM (Non-Sucking Service Manager) – Препоръчително
NSSM е лек и надежден инструмент за регистриране на Node.js приложения като стандартни системни услуги в Windows.

1. Свалете най-новата версия на NSSM от [https://nssm.cc/download](https://nssm.cc/download).
2. Разархивирайте `nssm.exe` (вземете 64-битовата версия от папка `win64`) в удобна за вас папка (например `C:\nssm\`).
3. Отворете PowerShell като **Администратор** и изпълнете:
   ```powershell
   C:\nssm\nssm.exe install DefComs
   ```
4. В отворилия се графичен интерфейс на NSSM конфигурирайте следните полета:
   - **Path:** `C:\Program Files\nodejs\node.exe` (или проверете къде е инсталиран вашият Node с команда `where.exe node`)
   - **Startup directory:** `C:\projects\defcoms`
   - **Arguments:** `C:\projects\defcoms\node_modules\next\dist\bin\next start --port 3000`
   - **Environment tab:** Добавете на нов ред: `NODE_ENV=production`
5. Кликнете върху **Install service**.
6. Стартирайте новата служба:
   ```powershell
   Start-Service DefComs
   ```
   Услугата вече ще се стартира автоматично при всяко включване на Windows сървъра.

---

#### Метод Б: Управление чрез PM2 за Windows (Алтернативно)
За управление на Node процеси можете да използвате PM2 съвместно с модул за стартиране като Windows Service.

```powershell
# 1. Изграждане на оптимизиран Next.js проект
npm run build

# 2. Инсталиране на PM2 глобално
npm install -g pm2

# 3. Инсталиране на пакета за интеграция с Windows Services
npm install -g pm2-windows-service

# 4. Стартиране на приложението
pm2 start npm --name "defcoms" -- start --port 3000

# 5. Запазване на конфигурацията
pm2 save
```

---

### 6. Настройка на IIS (Internet Information Services) като Reverse Proxy

За да обслужвате трафика през стандартни портове **80 (HTTP)** и **443 (HTTPS)** с SSL сертификати, конфигурирайте Microsoft IIS уеб сървър.

#### Стъпка 1: Инсталиране на IIS и необходимите модули
1. Отворете *Server Manager* в Windows Server.
2. Изберете *Add Roles and Features* и добавете **Web Server (IIS)**.
3. Инсталирайте двата критични разширителни модула от Microsoft:
   - **Application Request Routing (ARR 3.0)**
   - **URL Rewrite 2.1**
   *(Свалете ги през Microsoft Web Platform Installer или директно от официалния сайт на Microsoft).*

#### Стъпка 2: Конфигуриране на ARR
1. Отворете *IIS Manager*.
2. Кликнете върху името на сървъра в лявото дърво и отворете функцията **Application Request Routing Cache**.
3. В десния панел изберете **Server Settings**.
4. Маркирайте опцията **Enable proxy** и кликнете **Apply** (Приложи).

#### Стъпка 3: Създаване на уебсайт и конфигуриране на `web.config`
1. В IIS Manager щракнете с десен бутон върху *Sites* -> *Add Website*.
2. Въведете име `DefComs`, задайте физическия път до проекта (`C:\projects\defcoms`) и въведете вашия домейн (напр. `portal.defcoms.eu`).
3. В корена на папката на проекта (`C:\projects\defcoms`) създайте или редактирайте файла `web.config`, за да пренасочва трафика към порт 3000:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="DefComs Reverse Proxy" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{CACHE_URL}" pattern="^(https?://)" />
          </conditions>
          <action type="Rewrite" url="http://127.0.0.1:3000/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <httpErrors errorMode="Detailed" />
  </system.webServer>
</configuration>
```

---

### 7. Конфигуриране на Windows Defender Firewall (Защитна стена)

За да позволите външен уеб достъп до портала, разрешете портовете в защитната стена на Windows през PowerShell:

```powershell
# Разрешаване на HTTP (порт 80)
New-NetFirewallRule -DisplayName "Allow HTTP Port 80" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# Разрешаване на HTTPS (порт 443)
New-NetFirewallRule -DisplayName "Allow HTTPS Port 443" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

---

### 8. Автоматизирано архивиране на SQLite базата данни (Backup) под Windows

Архивирането на SQLite базата данни под Windows се осъществява чрез елементарен PowerShell скрипт, автоматизиран през **Windows Task Scheduler**.

1. Създайте папка за архивите, например `C:\db_backups\`.
2. Създайте PowerShell скрипт с име `backup_sqlite.ps1` в папка `C:\projects\defcoms\scripts\`:
```powershell
$source = "C:\projects\defcoms\prisma\dev.db"
$destinationFolder = "C:\db_backups\"
$date = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupPath = Join-Path $destinationFolder "defcoms_backup_$date.db"

# Копиране на текущата база данни
Copy-Item -Path $source -Destination $backupPath -Force

# Автоматично изтриване на архиви, по-стари от 30 дни
Get-ChildItem -Path $destinationFolder -Filter "*.db" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | Remove-Item -Force
```

3. **Настройка на Task Scheduler (Планировчик на задачи)**:
   - Отворете *Task Scheduler* под Windows.
   - Изберете *Create Basic Task* (Създаване на основна задача) с име `DefComs DB Backup`.
   - Задайте периодичност: *Daily* (Ежедневно) в 02:00 часа.
   - Изберете действие: *Start a program* (Стартиране на програма).
   - В полето **Program/script** въведете `powershell.exe`.
   - В полето **Add arguments** въведете `-File "C:\projects\defcoms\scripts\backup_sqlite.ps1"`.
   - Маркирайте опцията *“Run whether user is logged on or not”* с високи привилегии (Run with highest privileges) за сигурно денонощно архивиране.

---

## 🔑 Тестови акаунти за достъп (и за двете платформи):

*   **Клиентски акаунт:**
    *   **Имейл:** `test@defcoms.eu`
    *   **Парола:** `password123`
*   **Администраторски акаунт:**
    *   **Имейл:** `admin@defcoms.eu`
    *   **Парола:** `admin123`

---

## 🧪 Интеграционни тестове

За проверка на пълната функционалност на платформата, стартирайте вградения автоматичен тест, състоящ се от **13 фази на сигурност и бизнес проверки**:

```bash
npx tsx scripts/test-portal.ts
```

Тестът автоматично валидира потребителска регистрация, криптиране на пароли, Cybersecurity Health Score калкулации, фактуриране, плащания, сигурни API ключове, ИТ инвентаризация на активите, тренировъчни фишинг резултати и пълно автоматично каскадно изчистване на симулираните данни.

---

## 📄 Лиценз

© 2026 DefComs. Всички права запазени. Разработено спрямо най-високите съвременни ИТ изисквания за европейска киберсигурност за Windows и Linux среди.

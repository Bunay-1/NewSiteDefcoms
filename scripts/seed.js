const { PrismaClient } = require('../src/generated/prisma/client.js');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@defcoms.eu' },
    update: {},
    create: {
      email: 'test@defcoms.eu',
      name: 'Test User',
      password: hashedPassword,
      role: 'client',
      company: 'Test Company',
      phone: '+359888888888',
    },
  });

  console.log('Test user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

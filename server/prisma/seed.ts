import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial message
  await prisma.message.create({
    data: {
      name: 'Toha',
      text: 'Hey there! Welcome to the chat!',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    return prisma.$disconnect();
  });

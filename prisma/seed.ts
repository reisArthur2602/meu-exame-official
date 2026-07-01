import "dotenv/config";

import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

const DEFAULT_PASSWORD = "masterccm02";

const seedUsers = [
  { username: "admin", name: "Admin", isAdmin: true },
  { username: "life", name: "Life", isAdmin: false },
  { username: "roma", name: "Roma", isAdmin: false },
  { username: "galeao", name: "Galeão", isAdmin: false },
];

const main = async () => {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        username: user.username,
        name: user.name,
        passwordHash,
        isAdmin: user.isAdmin,
      },
    });

    console.log(`Usuário "${user.username}" criado/verificado.`);
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

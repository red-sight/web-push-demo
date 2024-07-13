import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const roleName = "root";
    const permissionName = "ROOT";
    await tx.role.create({
      data: {
        name: roleName
      }
    });
    await tx.permission.create({
      data: {
        name: permissionName,
        roleName: roleName
      }
    });
    await tx.user.create({
      data: {
        email: "dm112@tadbox.com",
        roleName: roleName
      }
    });
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

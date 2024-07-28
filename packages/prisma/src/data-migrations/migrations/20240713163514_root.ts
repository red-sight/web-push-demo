import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const roleName = "root";
    const permissionName = "ROOT";
    await tx.role.createMany({
      data: [{ name: "root" }, { name: "admin" }, { name: "customer" }]
    });
    await tx.permission.create({
      data: {
        name: permissionName,
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

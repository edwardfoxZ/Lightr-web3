const { PrismaClient } = reuire("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  prisma,
};

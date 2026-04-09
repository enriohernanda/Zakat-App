import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("DB connected! Users count:", users.length);
  } catch (e) {
    console.error("DB Error:", e);
  }
}
main();

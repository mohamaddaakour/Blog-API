import { PrismaClient } from "@prisma/client";

// we create a prisma client instance
const prisma = new PrismaClient({
  // to show me all Prisma events in the console
  log: ["query", "info", "warn", "error"]
});

export default prisma;
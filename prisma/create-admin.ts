import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

// Akun admin yang akan dibuat
const NAME = "salfain";
const EMAIL = "salfain@portofolio.local";
const PASSWORD = "Alfin231100.";

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 12);

  const user = await db.user.upsert({
    where: { email: EMAIL },
    update: { name: NAME, passwordHash, role: "admin" },
    create: { name: NAME, email: EMAIL, passwordHash, role: "admin" },
  });

  console.log("✅ Admin siap dipakai");
  console.log("   Email    :", user.email);
  console.log("   Password :", PASSWORD);
}

main()
  .catch((e) => {
    console.error("❌ Gagal membuat admin:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const projectCategories = [
  { name: "Web Development", slug: "web-development", sortOrder: 1 },
  { name: "IT Support", slug: "it-support", sortOrder: 2 },
  { name: "Network", slug: "network", sortOrder: 3 },
  { name: "Server", slug: "server", sortOrder: 4 },
  { name: "Database", slug: "database", sortOrder: 5 },
  { name: "Documentation", slug: "documentation", sortOrder: 6 },
  { name: "Cybersecurity Basic", slug: "cybersecurity-basic", sortOrder: 7 },
];

const skillCategories = [
  { name: "Frontend Development", slug: "frontend", sortOrder: 1 },
  { name: "Backend & Database", slug: "backend-database", sortOrder: 2 },
  { name: "IT Support", slug: "it-support-skill", sortOrder: 3 },
  { name: "Network & Server", slug: "network-server", sortOrder: 4 },
  { name: "Tools & Documentation", slug: "tools-documentation", sortOrder: 5 },
];

async function main() {
  console.log("🌱 Seeding categories...");

  for (const cat of projectCategories) {
    await db.projectCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
  }
  console.log(`✅ ${projectCategories.length} project categories siap`);

  for (const cat of skillCategories) {
    await db.skillCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
  }
  console.log(`✅ ${skillCategories.length} skill categories siap`);

  console.log("🎉 Selesai! Dropdown kategori sekarang terisi.");
}

main()
  .catch((e) => {
    console.error("❌ Gagal:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.book.create({
    data: {
      title: "Red Rising",
      author: "Pierce Brown",
      image:
        "https://ia600505.us.archive.org/view_archive.php?archive=/25/items/m_covers_0010/m_covers_0010_63.zip&file=0010630467-M.jpg",
      genre: "Science fiction",
      userId: user.id,
    },
  });

  await prisma.book.create({
    data: {
      title: "Morning Star",
      author: "Pierce Brown",
      image:
        "https://ia600502.us.archive.org/view_archive.php?archive=/16/items/s_covers_0012/s_covers_0012_40.zip&file=0012401168-S.jpg",
      genre: "Science fiction",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

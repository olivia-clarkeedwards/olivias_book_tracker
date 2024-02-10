import type { User, Book } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBook({
  id,
  userId,
}: Pick<Book, "id"> & {
  userId: User["id"];
}) {
  return prisma.book.findFirst({
    select: { id: true, title: true, author: true, image: true, genre: true },
    where: { id, userId },
  });
}

export function getBookListItems({ userId }: { userId: User["id"] }) {
  return prisma.book.findMany({
    where: { userId },
    select: { id: true, title: true, author: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createBook({
  title,
  author,
  image,
  genre,
  userId,
}: Pick<Book, "id" | "title" | "author" | "image" | "genre" | "userId"> & {
  userId: User["id"];
}) {
  return prisma.book.create({
    data: {
      title,
      author,
      image,
      genre,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteBook({
  id,
  userId,
}: Pick<Book, "id"> & { userId: User["id"] }) {
  return prisma.book.deleteMany({
    where: { id, userId },
  });
}

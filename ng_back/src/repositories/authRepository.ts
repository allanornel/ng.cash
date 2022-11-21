import { prisma } from "../database.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id">;

export async function findByUsername(username: string) {
  const result = await prisma.user.findUnique({ where: { username } });
  return result;
}

export async function insert(userData: CreateUserData) {
  await prisma.user.create({ data: userData });
}

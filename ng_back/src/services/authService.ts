import { CreateUserData, insert, findByUsername } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as accountRepository from "./../repositories/accountRepository.js";
import { conflictError, unauthorizedError } from "../utils/errorUtils.js";
import { prisma } from "../database.js";
import { Prisma } from "@prisma/client";
dotenv.config();

export async function signUpService(userData: CreateUserData) {
  userData.username = userData.username.toLowerCase();
  const { password, username } = userData;
  const checkUsername = await findByUsername(username);
  if (checkUsername) throw conflictError("Username must be unique");
  const salt = 10;
  userData.password = await bcrypt.hash(password, salt);
  await prisma.$transaction(async () => {
    const account = await accountRepository.insert(new Prisma.Decimal(100));
    userData.accountId = account.id;
    await insert(userData);
  });
}

export async function signInService(userData: CreateUserData) {
  const { username, password } = userData;
  const user = await findByUsername(username);
  if (!user) throw unauthorizedError("Wrong email/password");
  if (!(await bcrypt.compare(password, user.password))) throw unauthorizedError("Wrong email/password");
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
  return { token };
}

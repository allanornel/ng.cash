import { prisma } from "../database.js";
import { Account, Prisma, Transaction } from "@prisma/client";

export type CreateAccountData = Omit<Account, "id">;

export async function insert(balance: Prisma.Decimal) {
  return await prisma.account.create({ data: { balance } });
}

export async function findAccountByUserId(userId: number) {
  const result = await prisma.account.findFirst({ where: { User: { id: userId } } });
  return result;
}

export async function findAccountByUsername(username: string) {
  const result = await prisma.account.findFirst({ where: { User: { username } } });
  return result;
}

export async function makeTransaction(accountCashOut: Account, accountCashIn: Account, ammount: number) {
  await prisma.$transaction([
    prisma.account.update({ where: { id: accountCashIn.id }, data: { balance: accountCashIn.balance.toNumber() + Number(ammount) } }),
    prisma.account.update({ where: { id: accountCashOut.id }, data: { balance: accountCashOut.balance.toNumber() - Number(ammount) } }),
    prisma.transaction.create({
      data: {
        value: ammount,
        creditedAccountId: accountCashIn.id,
        debitedAccountId: accountCashOut.id,
        createdAt: new Date(),
      },
    }),
  ]);
}

export async function findTransactions(userId: number) {
  const result = await prisma.transaction.findMany({
    where: { OR: [{ creditedAccountId: userId }, { debitedAccountId: userId }] },
    include: {
      creditedAccount: { select: { User: { select: { username: true } } } },
      debitedAccount: { select: { User: { select: { username: true } } } },
    },
  });
  return result;
}

export async function findTransactionsByType(userId: number, type: string) {
  let result: Transaction[];
  if (type == "cashin")
    result = await prisma.transaction.findMany({
      where: { creditedAccountId: userId },
      include: {
        creditedAccount: { select: { User: { select: { username: true } } } },
        debitedAccount: { select: { User: { select: { username: true } } } },
      },
    });
  if (type == "cashout")
    result = await prisma.transaction.findMany({
      where: { debitedAccountId: userId },
      include: {
        creditedAccount: { select: { User: { select: { username: true } } } },
        debitedAccount: { select: { User: { select: { username: true } } } },
      },
    });
  return result;
}

export async function findTransactionsByTypeAndDate(userId: number, type: string, date: string) {
  let result: Transaction[];
  let arrDate = date.split("/");
  let dateGte = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
  let dateLt = `${arrDate[2]}-${arrDate[1]}-${parseInt(arrDate[0]) + 1}`;
  if (type == "cashin") {
    result = await prisma.transaction.findMany({
      where: {
        AND: [{ creditedAccountId: userId }, { createdAt: { gte: new Date(dateGte), lt: new Date(dateLt) } }],
      },
      include: {
        creditedAccount: { select: { User: { select: { username: true } } } },
        debitedAccount: { select: { User: { select: { username: true } } } },
      },
    });
  }
  if (type == "cashout") {
    result = await prisma.transaction.findMany({
      where: {
        AND: [{ debitedAccountId: userId }, { createdAt: { gte: new Date(dateGte), lt: new Date(dateLt) } }],
      },
      include: {
        creditedAccount: { select: { User: { select: { username: true } } } },
        debitedAccount: { select: { User: { select: { username: true } } } },
      },
    });
  }
  return result;
}

export async function findTransactionsByDate(userId: number, date: string) {
  let arrDate = date.split("/");
  let dateGte = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
  let dateLt = `${arrDate[2]}-${arrDate[1]}-${parseInt(arrDate[0]) + 1}`;

  const result = await prisma.transaction.findMany({
    where: {
      AND: [{ createdAt: { gte: new Date(dateGte), lt: new Date(dateLt) } }, { OR: [{ creditedAccountId: userId }, { debitedAccountId: userId }] }],
    },
    include: {
      creditedAccount: { select: { User: { select: { username: true } } } },
      debitedAccount: { select: { User: { select: { username: true } } } },
    },
  });
  return result;
}

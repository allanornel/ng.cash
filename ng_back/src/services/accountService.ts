import { Transaction } from "@prisma/client";
import {
  findAccountByUserId,
  findAccountByUsername,
  makeTransaction,
  findTransactions,
  findTransactionsByType,
  findTransactionsByDate,
  findTransactionsByTypeAndDate,
} from "../repositories/accountRepository.js";
import { conflictError, unauthorizedError, wrongSchemaError } from "../utils/errorUtils.js";

export async function getBalance(id: number) {
  const account = await findAccountByUserId(id);
  return account.balance;
}

export async function postTransaction(userId: number, usernameCashIn: string, ammount: number) {
  const accountCashOut = await findAccountByUserId(userId);
  const accountCashIn = await findAccountByUsername(usernameCashIn);
  if (accountCashOut.id === accountCashIn.id) throw conflictError("You cannot transact to your own account.");
  if (ammount > accountCashOut.balance.toNumber()) throw unauthorizedError("Unable to process transaction: low account balance");
  await makeTransaction(accountCashOut, accountCashIn, ammount);
}

export async function getTransactions(userId: number, type, date) {
  let transactions: Transaction[];
  if (!type && !date) return (transactions = await findTransactions(userId));

  if (type && date) {
    if (type == "cashout" || type == "cashin") return (transactions = await findTransactionsByTypeAndDate(userId, type, date));
    else throw wrongSchemaError("Wrong type in the query.");
  }
  if (date) return (transactions = await findTransactionsByDate(userId, date));
  if (type && (type == "cashout" || type == "cashin")) return (transactions = await findTransactionsByType(userId, type));
  else throw wrongSchemaError("Wrong type in the query.");
}

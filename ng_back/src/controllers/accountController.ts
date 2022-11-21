import { Request, Response } from "express";
import * as accountService from "./../services/accountService.js";

export async function getBalance(req: Request, res: Response) {
  const { user } = res.locals;
  const balance = await accountService.getBalance(user.id);
  res.send(balance);
}

export async function postTransaction(req: Request, res: Response) {
  const { user } = res.locals;
  const { ammount } = req.body;
  const { username } = req.params;
  await accountService.postTransaction(user.id, username, ammount);
  res.sendStatus(201);
}

export async function getTransactions(req: Request, res: Response) {
  const { user } = res.locals;
  const { type, date } = req.query;
  const transactions = await accountService.getTransactions(user.id, type, date);
  res.send(transactions);
}

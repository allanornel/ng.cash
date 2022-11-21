import { Router } from "express";
import { getBalance, getTransactions, postTransaction } from "../controllers/accountController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/accountSchema.js";

const accountRouter = Router();

accountRouter.get("/balance", validateToken, getBalance);
accountRouter.post("/transaction/:username", validateToken, validateSchema(transactionSchema), postTransaction);
accountRouter.get("/transaction", validateToken, getTransactions);

export default accountRouter;

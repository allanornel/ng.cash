import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;

import joi from "joi";
import { CreateUserData } from "../repositories/authRepository.js";

export const signUpSchema = joi.object<CreateUserData>({
  username: joi.string().required(),
  password: joi
    .string()
    .required()
    .min(3)
    .regex(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
});

export const signInSchema = joi.object<CreateUserData>({
  username: joi.string().required(),
  password: joi
    .string()
    .required()
    .min(3)
    .regex(/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/),
});

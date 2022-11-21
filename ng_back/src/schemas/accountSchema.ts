import joi from "joi";

export const transactionSchema = joi.object({
  ammount: joi.number().required().min(0),
});

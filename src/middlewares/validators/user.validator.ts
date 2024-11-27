import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      password: Joi.string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
          )
        )
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });
    const payload = req.body;
    const { error } = schema.validate(payload);
    console.log(error);

    if (!error) {
      next();
    } else {
      const errorMessages = [];
      for (const err of error.details) {
        errorMessages.push(err.message);
      }
      throw new Error(errorMessages.join(","));
    }
  } catch (error) {
    next(error);
  }
};

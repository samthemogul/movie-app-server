import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(
        new RegExp(
          /^(?=(?:.[A-Z]){2})(?=(?:.[a-z]){3})(?=(?:.\d){2})(?=(?:.[!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\-]){1}).{8,}$/
        )
      ),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
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

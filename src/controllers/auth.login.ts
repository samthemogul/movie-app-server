import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("No user");
    }
    const existingUser = await User.findOne({
      email: email,
    });

    bcrypt
      .compare(password, existingUser.password)
      .then(function (result) {
        if (result) {
          const reqUser = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          };
          req["user"] = reqUser;
          next();
        } else {
          res.status(400).json("Email or password incorrect");
        }
      });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required!");
    }

    const saltRounds = 10;

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(
        password,
        saltRounds,
        function (err: any, hash: string) {
          if (err) {
            reject(err);
          }
          if (!hash) {
            reject(new Error("Hash not created"));
          }
          resolve(hash);
        }
      );
    });
    if (!hash) {
      throw new Error("Password could not be hashed");
    } else {
      const newUser = await User.create({
        name,
        password: hash,
        email,
      });

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
      if (!newUser) {
        throw new Error("User could not be created");
      }
    }
  } catch (error) {
    next(error);
  }
};

export default registerUser;

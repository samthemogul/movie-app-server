import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    
  }
};

export const grantToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req["user"];
    if (!user) {
      throw new Error("User doesn't exist");
    }
    var token = jwt.sign(
      { data: user },
      process.env.JWT_PRIVATESECRETKEY,
      { expiresIn: "1h" }
    );
    if (!token) {
      throw new Error("Could not create authentication token");
    }
    res.header("Authorization", `Bearer ${token}`);
    next()
  } catch (error) {
    next(error);
  }
};

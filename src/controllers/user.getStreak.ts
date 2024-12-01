import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const getUserStreak = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
    const currentDate = Date.now()
    if(( - currentDate) > (24 * 60 * 60 * 1000))
  } catch (error) {

  }
};

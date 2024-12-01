import { Request, Response, NextFunction } from "express";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
  } catch (error) {}
};

import { NextFunction, Request, Response } from "express";
import Movie from "../models/movie.model";
import History from "../models/history.model";

export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const history = await History.findOne({
      userId: userId,
    });
    const historyMovies = await Movie.find({
      history: history._id,
    });
    res.status(200).json({ historyMovies });
  } catch (error) {
    next(error);
  }
};

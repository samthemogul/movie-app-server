import { NextFunction, Request, Response } from "express";
import Watchlist from "../models/watchlist.model";
import Movie from "../models/movie.model";

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tmdbId, title, description, genres, year } = req.body;
    const { userId } = req.params;
    const watchlist = await Watchlist.findOne({
      userId: userId,
    });
    await Movie.create({
      tmdbId,
      title,
      description,
      genres,
      year,
      watchlist: watchlist._id,
    });
    const watchlistMovies = await Movie.find({
      watchlist: watchlist._id,
    });
    res.status(200).json({ watchlistMovies });
  } catch (error) {
    next(error);
  }
};
